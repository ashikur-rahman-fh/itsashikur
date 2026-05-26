import math

from django.db.models import Q
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.models import ContactMessage
from api.pagination import parse_positive_int

from .auth_views import SESSION_AUTH, _require_authorized_admin
from .contact_message_serializers import (
    ContactMessageReadStatusSerializer,
    serialize_contact_message_detail,
    serialize_contact_message_list_item,
)

DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 50


def _contact_message_queryset(*, status: str, q: str, sort: str):
    queryset = ContactMessage.objects.all()
    if status == "unread":
        queryset = queryset.filter(is_read=False)
    elif status == "read":
        queryset = queryset.filter(is_read=True)

    search = q.strip()
    if search:
        queryset = queryset.filter(
            Q(full_name__icontains=search)
            | Q(email__icontains=search)
            | Q(message__icontains=search)
        )

    if sort == "oldest":
        return queryset.order_by("created_at")
    return queryset.order_by("-created_at")


@api_view(["GET"])
@authentication_classes(SESSION_AUTH)
@permission_classes([AllowAny])
def admin_contact_messages_list(request):
    _require_authorized_admin(request)

    page = parse_positive_int(request.query_params.get("page"), 1)
    page_size = parse_positive_int(
        request.query_params.get("pageSize"),
        DEFAULT_PAGE_SIZE,
        maximum=MAX_PAGE_SIZE,
    )
    status = (request.query_params.get("status") or "all").strip().lower()
    if status not in {"all", "unread", "read"}:
        status = "all"
    q = request.query_params.get("q") or ""
    sort = (request.query_params.get("sort") or "newest").strip().lower()
    if sort not in {"newest", "oldest"}:
        sort = "newest"

    queryset = _contact_message_queryset(status=status, q=q, sort=sort)
    count = queryset.count()
    total_pages = max(1, math.ceil(count / page_size)) if count else 1
    if page > total_pages and count > 0:
        page = total_pages

    offset = (page - 1) * page_size
    messages = queryset[offset : offset + page_size]

    return Response(
        {
            "results": [serialize_contact_message_list_item(m) for m in messages],
            "count": count,
            "page": page,
            "pageSize": page_size,
            "totalPages": total_pages if count else 0,
        }
    )


@api_view(["GET", "PATCH"])
@authentication_classes(SESSION_AUTH)
@permission_classes([AllowAny])
def admin_contact_message_detail(request, message_id):
    _require_authorized_admin(request)

    try:
        message = ContactMessage.objects.get(pk=message_id)
    except (ContactMessage.DoesNotExist, ValueError):
        raise NotFound() from None

    if request.method == "GET":
        return Response(serialize_contact_message_detail(message))

    serializer = ContactMessageReadStatusSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    message.is_read = serializer.validated_data["isRead"]
    message.save(update_fields=["is_read", "updated_at"])
    return Response(serialize_contact_message_detail(message))
