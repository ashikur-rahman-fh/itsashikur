import math

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    throttle_classes,
)
from rest_framework.exceptions import NotFound
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from api.models import BlogPost
from api.pagination import parse_positive_int, truncate_search
from api.public.blog_querysets import filter_published_posts, published_posts_queryset
from api.public.blog_serializers import (
    serialize_blog_post_public_detail,
    serialize_blog_post_public_list_item,
)

DEFAULT_PAGE_SIZE = 12
MAX_PAGE_SIZE = 50


class BlogPublicThrottle(ScopedRateThrottle):
    scope = "blog_public"


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([BlogPublicThrottle])
def public_blog_posts_list(request):
    page = parse_positive_int(request.query_params.get("page"), 1)
    page_size = parse_positive_int(
        request.query_params.get("pageSize"),
        DEFAULT_PAGE_SIZE,
        maximum=MAX_PAGE_SIZE,
    )
    q = truncate_search(request.query_params.get("q") or "")
    category = request.query_params.get("category") or ""
    tag = request.query_params.get("tag") or ""
    featured = (request.query_params.get("featured") or "").strip().lower() in {
        "1",
        "true",
        "yes",
    }

    queryset = filter_published_posts(
        published_posts_queryset(),
        q=q,
        category=category,
        tag=tag,
        featured=featured,
    )
    count = queryset.count()
    total_pages = max(1, math.ceil(count / page_size)) if count else 1
    if page > total_pages and count > 0:
        page = total_pages

    offset = (page - 1) * page_size
    posts = queryset[offset : offset + page_size]

    return Response(
        {
            "results": [serialize_blog_post_public_list_item(p) for p in posts],
            "count": count,
            "page": page,
            "pageSize": page_size,
            "totalPages": total_pages if count else 0,
        }
    )


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([BlogPublicThrottle])
def public_blog_post_detail(request, slug: str):
    try:
        post = published_posts_queryset().get(slug=slug)
    except BlogPost.DoesNotExist:
        raise NotFound() from None

    return Response(serialize_blog_post_public_detail(post))


@api_view(["GET"])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([BlogPublicThrottle])
def public_blog_sitemap_entries(request):
    """Lightweight slug + updatedAt list for sitemap generation."""
    posts = published_posts_queryset().order_by("-published_at")
    return Response(
        {
            "entries": [{"slug": p.slug, "updatedAt": p.updated_at.isoformat()} for p in posts],
        }
    )
