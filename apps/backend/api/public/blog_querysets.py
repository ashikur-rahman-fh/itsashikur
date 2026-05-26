from django.db.models import Q, QuerySet
from django.utils import timezone

from api.blog_constants import BLOG_STATUS_PUBLISHED
from api.models import BlogPost
from api.pagination import truncate_search


def published_posts_queryset() -> QuerySet[BlogPost]:
    """Posts visible on the public site and in sitemap/RSS."""
    now = timezone.now()
    return BlogPost.objects.filter(
        status=BLOG_STATUS_PUBLISHED,
        published_at__isnull=False,
        published_at__lte=now,
    )


def filter_published_posts(
    queryset: QuerySet[BlogPost],
    *,
    q: str = "",
    category: str = "",
    tag: str = "",
    featured: bool = False,
) -> QuerySet[BlogPost]:
    if featured:
        queryset = queryset.filter(is_featured=True)

    search = truncate_search(q)
    if search:
        queryset = queryset.filter(
            Q(title__icontains=search)
            | Q(excerpt__icontains=search)
            | Q(category__icontains=search)
            | Q(tags__contains=[search.lower()])
        )

    if category.strip():
        queryset = queryset.filter(category=category.strip())

    tag_clean = tag.strip().lower()
    if tag_clean:
        queryset = queryset.filter(tags__contains=[tag_clean])

    return queryset.order_by("-published_at", "-created_at")
