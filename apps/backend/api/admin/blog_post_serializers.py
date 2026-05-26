# Markdown is stored raw; HTML sanitization happens at render time in the frontend (BlogMarkdown).
from typing import TypedDict

from django.db import IntegrityError
from rest_framework import serializers

from api.blog_constants import (
    AUTHOR_NAME_MAX_LENGTH,
    BLOG_CATEGORIES,
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
)
from api.blog_utils import (
    ensure_unique_slug,
    normalize_slug,
    normalize_tags,
    validate_http_url,
    validate_slug_format,
)
from api.models import BlogPost


class BlogPostListItem(TypedDict):
    id: str
    title: str
    slug: str
    excerpt: str
    category: str
    tags: list[str]
    status: str
    isFeatured: bool
    readingTimeMinutes: int
    authorName: str
    publishedAt: str | None
    createdAt: str
    updatedAt: str


class BlogPostAdminDetail(TypedDict):
    id: str
    title: str
    slug: str
    excerpt: str
    contentMarkdown: str
    coverImageUrl: str
    coverImageAlt: str
    category: str
    tags: list[str]
    status: str
    metaTitle: str
    metaDescription: str
    canonicalUrl: str
    authorName: str
    isFeatured: bool
    readingTimeMinutes: int
    publishedAt: str | None
    createdAt: str
    updatedAt: str


def serialize_blog_post_list_item(post: BlogPost) -> BlogPostListItem:
    return {
        "id": str(post.id),
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "category": post.category,
        "tags": post.tags or [],
        "status": post.status,
        "isFeatured": post.is_featured,
        "readingTimeMinutes": post.reading_time_minutes,
        "authorName": post.author_name,
        "publishedAt": post.published_at.isoformat() if post.published_at else None,
        "createdAt": post.created_at.isoformat(),
        "updatedAt": post.updated_at.isoformat(),
    }


def serialize_blog_post_admin_detail(post: BlogPost) -> BlogPostAdminDetail:
    return {
        "id": str(post.id),
        "title": post.title,
        "slug": post.slug,
        "excerpt": post.excerpt,
        "contentMarkdown": post.content_markdown,
        "coverImageUrl": post.cover_image_url,
        "coverImageAlt": post.cover_image_alt,
        "category": post.category,
        "tags": post.tags or [],
        "status": post.status,
        "metaTitle": post.meta_title,
        "metaDescription": post.meta_description,
        "canonicalUrl": post.canonical_url,
        "authorName": post.author_name,
        "isFeatured": post.is_featured,
        "readingTimeMinutes": post.reading_time_minutes,
        "publishedAt": post.published_at.isoformat() if post.published_at else None,
        "createdAt": post.created_at.isoformat(),
        "updatedAt": post.updated_at.isoformat(),
    }


def _validate_publish_requirements(attrs: dict, *, instance: BlogPost | None = None) -> None:
    status = attrs.get("status")
    if status is None and instance is not None:
        status = instance.status
    if status != BLOG_STATUS_PUBLISHED:
        return

    title = attrs.get("title") or (instance.title if instance else "")
    slug = attrs.get("slug") or (instance.slug if instance else "")
    excerpt = attrs.get("excerpt") if "excerpt" in attrs else (instance.excerpt if instance else "")
    content = (
        attrs.get("contentMarkdown")
        if "contentMarkdown" in attrs
        else (instance.content_markdown if instance else "")
    )
    category = (
        attrs.get("category") if "category" in attrs else (instance.category if instance else "")
    )
    cover_url = (
        attrs.get("coverImageUrl")
        if "coverImageUrl" in attrs
        else (instance.cover_image_url if instance else "")
    )
    cover_alt = (
        attrs.get("coverImageAlt")
        if "coverImageAlt" in attrs
        else (instance.cover_image_alt if instance else "")
    )

    errors: dict[str, list[str]] = {}
    if not str(title).strip():
        errors["title"] = ["Title is required to publish."]
    if not str(slug).strip() or not validate_slug_format(str(slug)):
        errors["slug"] = ["A valid slug is required to publish."]
    if not str(excerpt).strip():
        errors["excerpt"] = ["Excerpt is required to publish."]
    if not str(content).strip():
        errors["contentMarkdown"] = ["Content is required to publish."]
    if not str(category).strip():
        errors["category"] = ["Category is required to publish."]
    if str(cover_url).strip() and not str(cover_alt).strip():
        errors["coverImageAlt"] = ["Cover image alt text is required when a cover image is set."]
    if errors:
        raise serializers.ValidationError(errors)


class BlogPostWriteSerializer(serializers.Serializer):
    title = serializers.CharField(required=False, allow_blank=True, max_length=TITLE_MAX_LENGTH)
    slug = serializers.CharField(required=False, allow_blank=True, max_length=SLUG_MAX_LENGTH)
    excerpt = serializers.CharField(required=False, allow_blank=True, max_length=EXCERPT_MAX_LENGTH)
    contentMarkdown = serializers.CharField(
        required=False,
        allow_blank=True,
        max_length=CONTENT_MARKDOWN_MAX_LENGTH,
    )
    coverImageUrl = serializers.URLField(required=False, allow_blank=True, default="")
    coverImageAlt = serializers.CharField(
        required=False, allow_blank=True, max_length=COVER_IMAGE_ALT_MAX_LENGTH
    )
    category = serializers.CharField(required=False, allow_blank=True, max_length=80)
    tags = serializers.ListField(
        child=serializers.CharField(max_length=50),
        required=False,
        allow_empty=True,
    )
    status = serializers.ChoiceField(
        choices=[c[0] for c in BLOG_STATUS_CHOICES],
        required=False,
    )
    metaTitle = serializers.CharField(
        required=False, allow_blank=True, max_length=META_TITLE_MAX_LENGTH
    )
    metaDescription = serializers.CharField(
        required=False, allow_blank=True, max_length=META_DESCRIPTION_MAX_LENGTH
    )
    canonicalUrl = serializers.URLField(required=False, allow_blank=True, default="")
    authorName = serializers.CharField(
        required=False, allow_blank=True, max_length=AUTHOR_NAME_MAX_LENGTH
    )
    isFeatured = serializers.BooleanField(required=False)

    def validate_category(self, value: str) -> str:
        if not value:
            return ""
        if value not in BLOG_CATEGORIES:
            raise serializers.ValidationError("Please choose a valid category.")
        return value

    def validate_slug(self, value: str) -> str:
        if not value:
            return ""
        normalized = normalize_slug(value)
        if not normalized or not validate_slug_format(normalized):
            raise serializers.ValidationError(
                "Slug must use lowercase letters, numbers, and hyphens only."
            )
        return normalized

    def validate_tags(self, value) -> list[str]:
        return normalize_tags(value)

    def validate_coverImageUrl(self, value: str) -> str:
        if value and not validate_http_url(value):
            raise serializers.ValidationError(
                "Cover image URL must start with http:// or https://."
            )
        return value

    def validate_canonicalUrl(self, value: str) -> str:
        if value and not validate_http_url(value):
            raise serializers.ValidationError("Canonical URL must start with http:// or https://.")
        return value

    def validate(self, attrs):
        instance: BlogPost | None = self.instance
        slug = attrs.get("slug")
        if slug:
            exclude_id = instance.pk if instance else None
            if BlogPost.objects.filter(slug=slug).exclude(pk=exclude_id).exists():
                raise serializers.ValidationError(
                    {"slug": ["This slug is already in use. Please choose another."]}
                )
        _validate_publish_requirements(attrs, instance=instance)
        return attrs

    def _save_post(self, post: BlogPost) -> BlogPost:
        try:
            post.save()
        except IntegrityError as exc:
            if "slug" in str(exc).lower() or "unique" in str(exc).lower():
                post.slug = ensure_unique_slug(post.slug, exclude_id=post.pk)
                post.save()
            else:
                raise
        return post

    def create(self, validated_data: dict) -> BlogPost:
        title = validated_data.get("title", "").strip() or "Untitled draft"
        slug = validated_data.get("slug", "").strip()
        if not slug:
            slug = ensure_unique_slug(BlogPost.generate_slug_from_title(title))
        else:
            slug = ensure_unique_slug(slug)

        post = BlogPost(
            title=title,
            slug=slug,
            excerpt=validated_data.get("excerpt", ""),
            content_markdown=validated_data.get("contentMarkdown", ""),
            cover_image_url=validated_data.get("coverImageUrl", ""),
            cover_image_alt=validated_data.get("coverImageAlt", ""),
            category=validated_data.get("category", ""),
            tags=validated_data.get("tags", []),
            status=validated_data.get("status", BLOG_STATUS_DRAFT),
            meta_title=validated_data.get("metaTitle", ""),
            meta_description=validated_data.get("metaDescription", ""),
            canonical_url=validated_data.get("canonicalUrl", ""),
            author_name=validated_data.get("authorName", "").strip() or DEFAULT_AUTHOR_NAME,
            is_featured=validated_data.get("isFeatured", False),
        )
        return self._save_post(post)

    def update(self, instance: BlogPost, validated_data: dict) -> BlogPost:
        field_map = {
            "title": "title",
            "slug": "slug",
            "excerpt": "excerpt",
            "contentMarkdown": "content_markdown",
            "coverImageUrl": "cover_image_url",
            "coverImageAlt": "cover_image_alt",
            "category": "category",
            "tags": "tags",
            "status": "status",
            "metaTitle": "meta_title",
            "metaDescription": "meta_description",
            "canonicalUrl": "canonical_url",
            "authorName": "author_name",
            "isFeatured": "is_featured",
        }
        for api_field, model_field in field_map.items():
            if api_field in validated_data:
                value = validated_data[api_field]
                if api_field == "title" and isinstance(value, str):
                    value = value.strip() or instance.title
                if api_field == "authorName" and isinstance(value, str):
                    value = value.strip() or instance.author_name
                if api_field == "slug" and isinstance(value, str):
                    value = value.strip() or instance.slug
                    value = ensure_unique_slug(value, exclude_id=instance.pk)
                setattr(instance, model_field, value)

        return self._save_post(instance)
