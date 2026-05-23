import pytest
from django.core.cache import cache

pytestmark = pytest.mark.django_db


def test_redis_cache_backend_configured():
    cache.set("ashikur-portfolio:test", "value", timeout=5)
    assert cache.get("ashikur-portfolio:test") == "value"
