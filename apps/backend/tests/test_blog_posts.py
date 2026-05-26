import pytest
from django.contrib.auth import get_user_model
from django.utils import timezone

from api.blog_constants import (
    BLOG_STATUS_ARCHIVED,
    BLOG_STATUS_DRAFT,
    BLOG_STATUS_PUBLISHED,
    SEARCH_QUERY_MAX_LENGTH,
)
from api.models import BlogPost
from tests.test_admin_auth import (
    _authenticated_delete,
    _authenticated_get,
    _authenticated_patch,
    _authenticated_post,
    _create_superuser,
    _fetch_csrf,
    _login,
)
from tests.test_api import assert_error_envelope

User = get_user_model()

pytestmark = pytest.mark.django_db

ADMIN_LIST_URL = "/api/admin/blog-posts/"
PUBLIC_LIST_URL = "/api/public/blog/posts/"


def _login_admin(client):
    return _login(client, username_or_email="admin", password="adminpass123")


def _admin_detail_url(post_id):
    return f"/api/admin/blog-posts/{post_id}/"


def _public_detail_url(slug: str):
    return f"/api/public/blog/posts/{slug}/"


def _draft_payload(**overrides):
    data = {
        "title": "How I Built My Portfolio",
        "slug": "how-i-built-my-portfolio",
        "excerpt": (
            "A walkthrough of building a production-grade portfolio with Django and Next.js."
        ),
        "contentMarkdown": (
            "## Introduction\n\nThis post explains the architecture.\n\n"
            "```python\nprint('hello')\n```"
        ),
        "category": "Software Engineering",
        "tags": ["nextjs", "django"],
        "status": BLOG_STATUS_DRAFT,
    }
    data.update(overrides)
    return data


def _publish_payload(**overrides):
    return _draft_payload(status=BLOG_STATUS_PUBLISHED, **overrides)


def _create_post(**kwargs):
    defaults = {
        "title": "Stored Post",
        "slug": "stored-post",
        "excerpt": "An excerpt with enough detail for readers and recruiters alike.",
        "content_markdown": "## Hello\n\nWorld.",
        "category": "Backend Engineering",
        "tags": ["python"],
        "status": BLOG_STATUS_DRAFT,
    }
    defaults.update(kwargs)
    return BlogPost.objects.create(**defaults)


def test_admin_create_draft(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    response = _authenticated_post(csrf_client, ADMIN_LIST_URL, _draft_payload())
    assert response.status_code == 201
    body = response.json()
    assert body["title"] == "How I Built My Portfolio"
    assert body["slug"] == "how-i-built-my-portfolio"
    assert body["status"] == BLOG_STATUS_DRAFT
    assert body["contentMarkdown"].startswith("## Introduction")


def test_admin_slug_auto_generated(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    payload = _draft_payload()
    del payload["slug"]
    response = _authenticated_post(csrf_client, ADMIN_LIST_URL, payload)
    assert response.status_code == 201
    assert response.json()["slug"] == "how-i-built-my-portfolio"


def test_admin_slug_uniqueness(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    _create_post(slug="duplicate-slug")
    response = _authenticated_post(
        csrf_client,
        ADMIN_LIST_URL,
        _draft_payload(slug="duplicate-slug"),
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")
    assert "slug" in response.json()["error"]["details"]


def test_admin_edit_draft(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post()
    response = _authenticated_patch(
        csrf_client,
        _admin_detail_url(post.id),
        {"title": "Updated Title", "excerpt": "Updated excerpt with enough characters."},
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Updated Title"
    post.refresh_from_db()
    assert post.title == "Updated Title"


def test_admin_publish_post(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post()
    response = _authenticated_patch(
        csrf_client,
        _admin_detail_url(post.id),
        {"status": BLOG_STATUS_PUBLISHED},
    )
    assert response.status_code == 200
    assert response.json()["status"] == BLOG_STATUS_PUBLISHED
    assert response.json()["publishedAt"] is not None
    post.refresh_from_db()
    assert post.status == BLOG_STATUS_PUBLISHED
    assert post.published_at is not None


def test_admin_publish_requires_fields(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post(excerpt="", content_markdown="", category="")
    response = _authenticated_patch(
        csrf_client,
        _admin_detail_url(post.id),
        {"status": BLOG_STATUS_PUBLISHED},
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")
    details = response.json()["error"]["details"]
    assert "excerpt" in details
    assert "contentMarkdown" in details
    assert "category" in details


def test_admin_unpublish_post(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
    )
    response = _authenticated_patch(
        csrf_client,
        _admin_detail_url(post.id),
        {"status": BLOG_STATUS_DRAFT},
    )
    assert response.status_code == 200
    assert response.json()["status"] == BLOG_STATUS_DRAFT
    post.refresh_from_db()
    assert post.status == BLOG_STATUS_DRAFT
    assert post.published_at is not None


def test_admin_archive_post(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post(status=BLOG_STATUS_PUBLISHED, published_at=timezone.now())
    response = _authenticated_patch(
        csrf_client,
        _admin_detail_url(post.id),
        {"status": BLOG_STATUS_ARCHIVED},
    )
    assert response.status_code == 200
    assert response.json()["status"] == BLOG_STATUS_ARCHIVED


def test_admin_delete_post(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post()
    response = _authenticated_delete(csrf_client, _admin_detail_url(post.id))
    assert response.status_code == 204
    assert not BlogPost.objects.filter(pk=post.id).exists()


def test_reading_time_computed_on_save():
    post = _create_post(
        content_markdown="word " * 400,
    )
    assert post.reading_time_minutes >= 2


def test_public_list_only_published(api_client):
    _create_post(status=BLOG_STATUS_PUBLISHED, published_at=timezone.now(), slug="published-one")
    _create_post(status=BLOG_STATUS_DRAFT, slug="draft-one")
    _create_post(status=BLOG_STATUS_ARCHIVED, slug="archived-one")

    response = api_client.get(PUBLIC_LIST_URL)
    assert response.status_code == 200
    body = response.json()
    slugs = [item["slug"] for item in body["results"]]
    assert "published-one" in slugs
    assert "draft-one" not in slugs
    assert "archived-one" not in slugs


def test_public_detail_published(api_client):
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="public-slug",
        title="Public Title",
    )
    response = api_client.get(_public_detail_url("public-slug"))
    assert response.status_code == 200
    assert response.json()["title"] == "Public Title"
    assert "contentMarkdown" in response.json()


def test_public_detail_draft_404(api_client):
    _create_post(status=BLOG_STATUS_DRAFT, slug="secret-draft")
    response = api_client.get(_public_detail_url("secret-draft"))
    assert response.status_code == 404


def test_public_detail_archived_404(api_client):
    _create_post(status=BLOG_STATUS_ARCHIVED, slug="old-archived")
    response = api_client.get(_public_detail_url("old-archived"))
    assert response.status_code == 404


def test_public_sitemap_excludes_drafts(api_client):
    _create_post(status=BLOG_STATUS_PUBLISHED, published_at=timezone.now(), slug="sitemap-pub")
    _create_post(status=BLOG_STATUS_DRAFT, slug="sitemap-draft")

    response = api_client.get("/api/public/blog/sitemap-entries/")
    assert response.status_code == 200
    slugs = [e["slug"] for e in response.json()["entries"]]
    assert "sitemap-pub" in slugs
    assert "sitemap-draft" not in slugs


def test_admin_list_requires_auth(api_client):
    response = api_client.get(ADMIN_LIST_URL)
    assert_error_envelope(response, status_code=401, code="UNAUTHORIZED")


def test_admin_post_requires_auth(api_client):
    response = api_client.post(ADMIN_LIST_URL, _draft_payload(), format="json")
    assert_error_envelope(response, status_code=401, code="UNAUTHORIZED")


def test_admin_list_rejects_non_superuser(api_client):
    user = User.objects.create_user(
        username="staffblog",
        password="staffpass123",
        email="staff@example.com",
        is_staff=True,
        is_superuser=False,
        is_active=True,
    )
    api_client.force_login(user)
    response = _authenticated_get(api_client, ADMIN_LIST_URL)
    assert_error_envelope(response, status_code=403, code="ADMIN_FORBIDDEN")


def test_admin_patch_rejects_non_superuser(api_client):
    post = _create_post()
    user = User.objects.create_user(
        username="staffpatch",
        password="staffpass123",
        email="staff@example.com",
        is_staff=True,
        is_superuser=False,
        is_active=True,
    )
    api_client.force_login(user)
    response = _authenticated_patch(
        api_client,
        _admin_detail_url(post.id),
        {"title": "Hacked"},
    )
    assert_error_envelope(response, status_code=403, code="ADMIN_FORBIDDEN")


def test_admin_delete_requires_auth(api_client):
    post = _create_post()
    response = api_client.delete(_admin_detail_url(post.id))
    assert_error_envelope(response, status_code=401, code="UNAUTHORIZED")


def test_admin_get_detail_requires_auth(api_client):
    post = _create_post()
    response = api_client.get(_admin_detail_url(post.id))
    assert_error_envelope(response, status_code=401, code="UNAUTHORIZED")


def test_admin_get_detail_superuser(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post(title="Detail Post")
    response = _authenticated_get(csrf_client, _admin_detail_url(post.id))
    assert response.status_code == 200
    assert response.json()["title"] == "Detail Post"


def test_public_future_published_not_visible(api_client):
    future = timezone.now() + timezone.timedelta(days=7)
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=future,
        slug="future-post",
    )
    response = api_client.get(_public_detail_url("future-post"))
    assert response.status_code == 404
    list_response = api_client.get(PUBLIC_LIST_URL)
    slugs = [r["slug"] for r in list_response.json()["results"]]
    assert "future-post" not in slugs


def test_admin_create_and_publish_one_shot(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    response = _authenticated_post(
        csrf_client,
        ADMIN_LIST_URL,
        _publish_payload(slug="one-shot-publish"),
    )
    assert response.status_code == 201
    assert response.json()["status"] == BLOG_STATUS_PUBLISHED


def test_admin_update_slug_conflict(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    _create_post(slug="taken-slug")
    post = _create_post(slug="other-post")
    response = _authenticated_patch(
        csrf_client,
        _admin_detail_url(post.id),
        {"slug": "taken-slug"},
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")


def test_admin_patch_empty_slug_keeps_existing(csrf_client, api_client):
    _create_superuser()
    _login_admin(csrf_client)
    post = _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="keep-me",
    )
    response = _authenticated_patch(
        csrf_client,
        _admin_detail_url(post.id),
        {"slug": ""},
    )
    assert response.status_code == 200
    assert response.json()["slug"] == "keep-me"
    assert BlogPost.objects.get(pk=post.id).slug == "keep-me"
    public_response = api_client.get(_public_detail_url("keep-me"))
    assert public_response.status_code == 200


def test_admin_filter_by_status(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    _create_post(status=BLOG_STATUS_DRAFT, slug="filter-draft")
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="filter-published",
    )

    response = _authenticated_get(csrf_client, f"{ADMIN_LIST_URL}?status=draft")
    assert response.status_code == 200
    slugs = [r["slug"] for r in response.json()["results"]]
    assert "filter-draft" in slugs
    assert "filter-published" not in slugs


def test_admin_list_pagination(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    for i in range(3):
        _create_post(slug=f"page-post-{i}", title=f"Page Post {i}")
    response = _authenticated_get(csrf_client, f"{ADMIN_LIST_URL}?page=1&pageSize=2")
    assert response.status_code == 200
    body = response.json()
    assert body["count"] == 3
    assert len(body["results"]) == 2
    assert body["totalPages"] == 2


def test_public_list_pagination(api_client):
    for i in range(3):
        _create_post(
            status=BLOG_STATUS_PUBLISHED,
            published_at=timezone.now(),
            slug=f"pub-page-{i}",
            title=f"Pub {i}",
        )
    response = api_client.get(f"{PUBLIC_LIST_URL}?page=1&pageSize=2")
    assert response.status_code == 200
    body = response.json()
    assert body["count"] == 3
    assert len(body["results"]) == 2
    assert body["totalPages"] == 2


def test_public_filter_category(api_client):
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="cat-a",
        category="Backend Engineering",
    )
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="cat-b",
        category="Frontend Engineering",
    )
    response = api_client.get(f"{PUBLIC_LIST_URL}?category=Backend+Engineering")
    slugs = [r["slug"] for r in response.json()["results"]]
    assert "cat-a" in slugs
    assert "cat-b" not in slugs


def test_public_filter_featured(api_client):
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="feat-yes",
        is_featured=True,
    )
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="feat-no",
        is_featured=False,
    )
    response = api_client.get(f"{PUBLIC_LIST_URL}?featured=true")
    slugs = [r["slug"] for r in response.json()["results"]]
    assert "feat-yes" in slugs
    assert "feat-no" not in slugs


def test_public_filter_tag(api_client):
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="tagged-post",
        tags=["django"],
    )
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="other-tag",
        tags=["react"],
    )
    response = api_client.get(f"{PUBLIC_LIST_URL}?tag=django")
    slugs = [r["slug"] for r in response.json()["results"]]
    assert "tagged-post" in slugs
    assert "other-tag" not in slugs


def test_public_search_q_truncation(api_client):
    # icontains matches the full (truncated) query string — excerpt must contain it.
    token = "x" * SEARCH_QUERY_MAX_LENGTH
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="search-target",
        title="Search truncation post",
        excerpt=token,
    )
    long_q = token + ("y" * 50)
    assert len(long_q) > SEARCH_QUERY_MAX_LENGTH
    response = api_client.get(PUBLIC_LIST_URL, {"q": long_q})
    assert response.status_code == 200
    slugs = [r["slug"] for r in response.json()["results"]]
    assert "search-target" in slugs


def test_admin_search_q_truncation(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    token = "y" * SEARCH_QUERY_MAX_LENGTH
    _create_post(
        slug="admin-search",
        title="Admin search truncation",
        excerpt=token,
    )
    long_q = token + ("z" * 50)
    assert len(long_q) > SEARCH_QUERY_MAX_LENGTH
    csrf_token = _fetch_csrf(csrf_client)
    response = csrf_client.get(
        ADMIN_LIST_URL,
        {"q": long_q},
        HTTP_X_CSRFTOKEN=csrf_token,
    )
    assert response.status_code == 200
    slugs = [r["slug"] for r in response.json()["results"]]
    assert "admin-search" in slugs


def test_public_sitemap_excludes_future_published(api_client):
    future = timezone.now() + timezone.timedelta(days=3)
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=future,
        slug="future-sitemap",
    )
    _create_post(
        status=BLOG_STATUS_PUBLISHED,
        published_at=timezone.now(),
        slug="now-sitemap",
    )
    response = api_client.get("/api/public/blog/sitemap-entries/")
    slugs = [e["slug"] for e in response.json()["entries"]]
    assert "now-sitemap" in slugs
    assert "future-sitemap" not in slugs


def test_admin_invalid_slug_format(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    response = _authenticated_post(
        csrf_client,
        ADMIN_LIST_URL,
        _draft_payload(slug="!!!"),
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")


def test_admin_invalid_category(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    response = _authenticated_post(
        csrf_client,
        ADMIN_LIST_URL,
        _draft_payload(category="Not A Real Category"),
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")


def test_admin_invalid_cover_url_scheme(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    response = _authenticated_post(
        csrf_client,
        ADMIN_LIST_URL,
        _draft_payload(coverImageUrl="javascript:alert(1)"),
    )
    assert_error_envelope(response, status_code=400, code="VALIDATION_ERROR")


def test_public_returns_raw_markdown(csrf_client, api_client):
    _create_superuser()
    _login_admin(csrf_client)
    payload = _publish_payload(
        slug="xss-storage-test",
        contentMarkdown="## Safe\n\n<script>alert(1)</script>",
    )
    _authenticated_post(csrf_client, ADMIN_LIST_URL, payload)
    response = api_client.get(_public_detail_url("xss-storage-test"))
    assert response.status_code == 200
    assert "<script>" in response.json()["contentMarkdown"]


def test_admin_tags_normalized_max_count(csrf_client):
    _create_superuser()
    _login_admin(csrf_client)
    tags = [f"tag{i}" for i in range(25)]
    response = _authenticated_post(
        csrf_client,
        ADMIN_LIST_URL,
        _draft_payload(tags=tags),
    )
    assert response.status_code == 201
    assert len(response.json()["tags"]) == 20
