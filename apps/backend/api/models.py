import hashlib
import re
import uuid

from django.db import models
from django.utils import timezone
from django.utils.text import slugify

from .blog_constants import (
    AUTHOR_NAME_MAX_LENGTH,
    BLOG_CATEGORY_CHOICES,
    BLOG_STATUS_CHOICES,
    BLOG_STATUS_DRAFT,
    BLOG_STATUS_PUBLISHED,
    CONTENT_MARKDOWN_MAX_LENGTH,
    COVER_IMAGE_ALT_MAX_LENGTH,
    DEFAULT_AUTHOR_NAME,
    EXCERPT_MAX_LENGTH,
    META_DESCRIPTION_MAX_LENGTH,
    META_TITLE_MAX_LENGTH,
    SLUG_MAX_LENGTH,
    TITLE_MAX_LENGTH,
    WORDS_PER_MINUTE,
)


class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    full_name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    ip_hash = models.CharField(max_length=64, blank=True)
    user_agent = models.CharField(max_length=256, blank=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["is_read", "created_at"]),
        ]

    def __str__(self) -> str:
        return f"{self.full_name} <{self.email}>"

    @staticmethod
    def hash_ip(ip_address: str) -> str:
        return hashlib.sha256(ip_address.encode("utf-8")).hexdigest()


class BlogPost(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=TITLE_MAX_LENGTH)
    slug = models.SlugField(max_length=SLUG_MAX_LENGTH, unique=True)
    excerpt = models.TextField(max_length=EXCERPT_MAX_LENGTH, blank=True, default="")
    content_markdown = models.TextField(
        max_length=CONTENT_MARKDOWN_MAX_LENGTH, blank=True, default=""
    )
    cover_image_url = models.URLField(max_length=500, blank=True, default="")
    cover_image_alt = models.CharField(
        max_length=COVER_IMAGE_ALT_MAX_LENGTH, blank=True, default=""
    )
    category = models.CharField(
        max_length=80, choices=BLOG_CATEGORY_CHOICES, blank=True, default=""
    )
    tags = models.JSONField(default=list, blank=True)
    status = models.CharField(
        max_length=20,
        choices=BLOG_STATUS_CHOICES,
        default=BLOG_STATUS_DRAFT,
        db_index=True,
    )
    meta_title = models.CharField(max_length=META_TITLE_MAX_LENGTH, blank=True, default="")
    meta_description = models.CharField(
        max_length=META_DESCRIPTION_MAX_LENGTH, blank=True, default=""
    )
    canonical_url = models.URLField(max_length=500, blank=True, default="")
    author_name = models.CharField(max_length=AUTHOR_NAME_MAX_LENGTH, default=DEFAULT_AUTHOR_NAME)
    is_featured = models.BooleanField(default=False)
    reading_time_minutes = models.PositiveSmallIntegerField(default=1)
    published_at = models.DateTimeField(null=True, blank=True, db_index=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        indexes = [
            models.Index(fields=["status", "published_at"]),
            models.Index(fields=["category"]),
            models.Index(fields=["is_featured", "status"]),
        ]

    def __str__(self) -> str:
        return self.title

    @staticmethod
    def generate_slug_from_title(title: str) -> str:
        base = slugify(title, allow_unicode=False)
        return base[:SLUG_MAX_LENGTH] if base else "post"

    @staticmethod
    def compute_reading_time_minutes(markdown: str) -> int:
        text = re.sub(r"```[\s\S]*?```", " ", markdown)
        text = re.sub(r"`[^`]+`", " ", text)
        text = re.sub(r"[#*_>\[\]()!|-]", " ", text)
        words = [w for w in text.split() if w.strip()]
        if not words:
            return 1
        return max(1, round(len(words) / WORDS_PER_MINUTE))

    def save(self, *args, **kwargs):
        self.reading_time_minutes = self.compute_reading_time_minutes(self.content_markdown or "")
        if self.status == BLOG_STATUS_PUBLISHED and self.published_at is None:
            self.published_at = timezone.now()
        super().save(*args, **kwargs)
