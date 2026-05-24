import pytest
from django.contrib.auth import get_user_model

from api.models import ContactMessage
from tests.test_admin_auth import _authenticated_get, _create_superuser, _fetch_csrf, _login
from tests.test_api import assert_error_envelope

User = get_user_model()

pytestmark = pytest.mark.django_db

PUBLIC_CONTACT_URL = "/api/public/contact/"
ADMIN_LIST_URL = "/api/admin/contact-messages/"


def _contact_payload(**overrides):
    data = {
        "name": "Your full name",
        "email": "jane@example.com",
        "message": "Hello Ashikur, I would like to discuss a software engineering opportunity.",
    }
    data.update(overrides)
    return data


def _create_message(**kwargs):
    defaults = {
        "full_name": "Stored User",
        "email": "stored@example.com",
        "message": "This is a stored contact message with enough length.",
        "is_read": False,
    }
    defaults.update(kwargs)
    return ContactMessage.objects.create(**defaults)


def test_public_contact_submit_success(api_client):
    response = api_client.post(PUBLIC_CONTACT_URL, _contact_payload(), format="json")
    assert response.status_code == 200
    body = response.json()
    assert body["success"] is True
    assert "message" in body
    assert ContactMessage.objects.count() == 1
    msg = ContactMessage.objects.get()
    assert msg.full_name == "Your full name"
    assert msg.email == "jane@example.com"
    assert msg.is_read is False


def test_public_contact_required_fields(api_client):
    response = api_client.post(PUBLIC_CONTACT_URL, {}, format="json")
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")
    details = response.json()["error"]["details"]
    assert "name" in details
    assert "email" in details
    assert "message" in details


def test_public_contact_invalid_email(api_client):
    response = api_client.post(
        PUBLIC_CONTACT_URL,
        _contact_payload(email="not-an-email"),
        format="json",
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")
    assert "email" in response.json()["error"]["details"]


def test_public_contact_message_too_short(api_client):
    response = api_client.post(
        PUBLIC_CONTACT_URL,
        _contact_payload(message="Too short"),
        format="json",
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")
    assert "message" in response.json()["error"]["details"]


def test_public_contact_message_too_long(api_client):
    response = api_client.post(
        PUBLIC_CONTACT_URL,
        _contact_payload(message="x" * 5001),
        format="json",
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")
    assert "message" in response.json()["error"]["details"]


def test_public_contact_honeypot_silent_success(api_client):
    response = api_client.post(
        PUBLIC_CONTACT_URL,
        {**_contact_payload(), "website": "https://spam.example"},
        format="json",
    )
    assert response.status_code == 200
    assert response.json()["success"] is True
    assert ContactMessage.objects.count() == 0


def test_admin_list_requires_auth(api_client):
    response = api_client.get(ADMIN_LIST_URL)
    assert_error_envelope(response, status_code=401, code="UNAUTHORIZED")


def test_admin_list_rejects_non_superuser(api_client):
    user = User.objects.create_user(
        username="staffuser",
        password="staffpass123",
        email="staff@example.com",
        is_staff=True,
        is_superuser=False,
    )
    api_client.force_login(user)
    response = _authenticated_get(api_client, ADMIN_LIST_URL)
    assert_error_envelope(response, status_code=403, code="ADMIN_FORBIDDEN")


def test_admin_list_superuser(api_client):
    _create_superuser()
    _login(api_client, username_or_email="admin", password="adminpass123", with_csrf=True)
    _create_message(full_name="Alice")
    response = _authenticated_get(api_client, ADMIN_LIST_URL)
    assert response.status_code == 200
    body = response.json()
    assert body["count"] == 1
    assert len(body["results"]) == 1
    assert body["results"][0]["fullName"] == "Alice"
    assert body["results"][0]["isRead"] is False


def test_admin_detail_and_mark_read(api_client):
    msg = _create_message()
    _create_superuser()
    _login(api_client, username_or_email="admin", password="adminpass123", with_csrf=True)
    detail_url = f"{ADMIN_LIST_URL}{msg.id}/"

    response = _authenticated_get(api_client, detail_url)
    assert response.status_code == 200
    assert response.json()["message"] == msg.message

    token = _fetch_csrf(api_client)
    patch_response = api_client.patch(
        detail_url,
        {"isRead": True},
        format="json",
        HTTP_X_CSRFTOKEN=token,
    )
    assert patch_response.status_code == 200
    assert patch_response.json()["isRead"] is True
    msg.refresh_from_db()
    assert msg.is_read is True


def test_admin_detail_not_found(api_client):
    _create_superuser()
    _login(api_client, username_or_email="admin", password="adminpass123", with_csrf=True)
    response = _authenticated_get(
        api_client,
        f"{ADMIN_LIST_URL}00000000-0000-0000-0000-000000000099/",
    )
    assert_error_envelope(response, status_code=404, code="NOT_FOUND")


def test_admin_list_filter_unread(api_client):
    _create_message(full_name="Unread One", is_read=False)
    _create_message(full_name="Read One", is_read=True)
    _create_superuser()
    _login(api_client, username_or_email="admin", password="adminpass123", with_csrf=True)
    response = _authenticated_get(api_client, f"{ADMIN_LIST_URL}?status=unread")
    assert response.status_code == 200
    assert response.json()["count"] == 1
    assert response.json()["results"][0]["fullName"] == "Unread One"


def test_admin_list_search(api_client):
    _create_message(full_name="Unique Search Name")
    _create_message(full_name="Other Person")
    _create_superuser()
    _login(api_client, username_or_email="admin", password="adminpass123", with_csrf=True)
    response = _authenticated_get(api_client, f"{ADMIN_LIST_URL}?q=Unique+Search")
    assert response.status_code == 200
    assert response.json()["count"] == 1


def test_admin_list_pagination(api_client):
    for i in range(3):
        _create_message(full_name=f"Person {i}")
    _create_superuser()
    _login(api_client, username_or_email="admin", password="adminpass123", with_csrf=True)
    response = _authenticated_get(api_client, f"{ADMIN_LIST_URL}?page=1&pageSize=2")
    assert response.status_code == 200
    body = response.json()
    assert body["count"] == 3
    assert len(body["results"]) == 2
    assert body["totalPages"] == 2
