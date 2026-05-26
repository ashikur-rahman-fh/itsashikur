import re

from django.utils.text import slugify

from .blog_constants import SLUG_MAX_LENGTH, SLUG_PATTERN, TAG_MAX_COUNT, TAG_MAX_LENGTH
from .models import BlogPost


def normalize_tags(raw) -> list[str]:
    if raw is None:
        return []
    if not isinstance(raw, list):
        return []
    seen: set[str] = set()
    result: list[str] = []
    for item in raw:
        if not isinstance(item, str):
            continue
        tag = re.sub(r"\s+", " ", item.strip().lower())
        if not tag or len(tag) > TAG_MAX_LENGTH:
            continue
        if tag in seen:
            continue
        seen.add(tag)
        result.append(tag)
        if len(result) >= TAG_MAX_COUNT:
            break
    return result


def normalize_slug(value: str) -> str:
    cleaned = slugify(value, allow_unicode=False)
    return cleaned[:SLUG_MAX_LENGTH] if cleaned else ""


def validate_slug_format(slug: str) -> bool:
    return bool(slug and SLUG_PATTERN.match(slug))


def validate_http_url(url: str) -> bool:
    """Allow only http(s) URLs for user-supplied links (covers, canonical)."""
    if not url:
        return True
    lower = url.strip().lower()
    return lower.startswith("http://") or lower.startswith("https://")


def ensure_unique_slug(base_slug: str, *, exclude_id=None) -> str:
    slug = base_slug
    counter = 2
    while BlogPost.objects.filter(slug=slug).exclude(pk=exclude_id).exists():
        suffix = f"-{counter}"
        slug = f"{base_slug[: SLUG_MAX_LENGTH - len(suffix)]}{suffix}"
        counter += 1
    return slug
