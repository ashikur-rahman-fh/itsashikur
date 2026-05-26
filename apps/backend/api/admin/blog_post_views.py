"""Admin blog CMS API — superuser session via _require_authorized_admin."""

import math

from django.db.models import Q
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from api.models import BlogPost
from api.pagination import parse_positive_int, truncate_search

from .auth_views import SESSION_AUTH, _require_authorized_admin
from .blog_post_serializers import (
    BlogPostWriteSerializer,
    serialize_blog_post_admin_detail,
    serialize_blog_post_list_item,
)

DEFAULT_PAGE_SIZE = 20
MAX_PAGE_SIZE = 50


def _admin_blog_queryset(*, status: str, q: str, category: str, tag: str, sort: str):
    queryset = BlogPost.objects.all()
    if status in {"draft", "published", "archived"}:
        queryset = queryset.filter(status=status)

    search = truncate_search(q)
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search)
            | Q(slug__icontains=search)
            | Q(excerpt__icontains=search)
            | Q(category__icontains=search)
        )

    if category.strip():
        queryset = queryset.filter(category=category.strip())

    tag_clean = tag.strip().lower()
    if tag_clean:
        queryset = queryset.filter(tags__contains=[tag_clean])

    sort_map = {
        "created": "created_at",
        "updated": "updated_at",
        "published": "published_at",
    }
    order_field = sort_map.get(sort, "updated_at")
    return queryset.order_by(f"-{order_field}")


@api_view(["GET", "POST"])
@authentication_classes(SESSION_AUTH)
@permission_classes([AllowAny])
def admin_blog_posts_list_create(request):
    _require_authorized_admin(request)

    if request.method == "GET":
        page = parse_positive_int(request.query_params.get("page"), 1)
        page_size = parse_positive_int(
            request.query_params.get("pageSize"),
            DEFAULT_PAGE_SIZE,
            maximum=MAX_PAGE_SIZE,
        )
        status = (request.query_params.get("status") or "all").strip().lower()
        if status not in {"all", "draft", "published", "archived"}:
            status = "all"
        q = request.query_params.get("q") or ""
        category = request.query_params.get("category") or ""
        tag = request.query_params.get("tag") or ""
        sort = (request.query_params.get("sort") or "updated").strip().lower()
        if sort not in {"created", "updated", "published"}:
            sort = "updated"

        queryset = _admin_blog_queryset(status=status, q=q, category=category, tag=tag, sort=sort)
        count = queryset.count()
        total_pages = max(1, math.ceil(count / page_size)) if count else 1
        if page > total_pages and count > 0:
            page = total_pages

        offset = (page - 1) * page_size
        posts = queryset[offset : offset + page_size]

        return Response(
            {
                "results": [serialize_blog_post_list_item(p) for p in posts],
                "count": count,
                "page": page,
                "pageSize": page_size,
                "totalPages": total_pages if count else 0,
            }
        )

    serializer = BlogPostWriteSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    post = serializer.save()
    return Response(serialize_blog_post_admin_detail(post), status=201)


@api_view(["GET", "PATCH", "DELETE"])
@authentication_classes(SESSION_AUTH)
@permission_classes([AllowAny])
def admin_blog_post_detail(request, post_id):
    _require_authorized_admin(request)

    try:
        post = BlogPost.objects.get(pk=post_id)
    except (BlogPost.DoesNotExist, ValueError):
        raise NotFound() from None

    if request.method == "GET":
        return Response(serialize_blog_post_admin_detail(post))

    if request.method == "DELETE":
        post.delete()
        return Response(status=204)

    serializer = BlogPostWriteSerializer(data=request.data, partial=True, instance=post)
    serializer.is_valid(raise_exception=True)
    post = serializer.save()
    return Response(serialize_blog_post_admin_detail(post))
