"""Shared query pagination helpers for API list views."""

from api.blog_constants import SEARCH_QUERY_MAX_LENGTH


def parse_positive_int(value, default: int, *, maximum: int | None = None) -> int:
    try:
        parsed = int(value)
    except (TypeError, ValueError):
        return default
    if parsed < 1:
        return default
    if maximum is not None and parsed > maximum:
        return maximum
    return parsed


def truncate_search(q: str, *, max_length: int = SEARCH_QUERY_MAX_LENGTH) -> str:
    return q.strip()[:max_length]
