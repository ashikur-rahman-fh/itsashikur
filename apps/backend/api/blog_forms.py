from django import forms
from rest_framework.exceptions import ValidationError as DRFValidationError

from .admin.blog_post_serializers import _validate_publish_requirements
from .blog_constants import BLOG_STATUS_PUBLISHED
from .models import BlogPost


class BlogPostAdminForm(forms.ModelForm):
    class Meta:
        model = BlogPost
        fields = "__all__"

    def clean(self):
        cleaned = super().clean()
        if cleaned.get("status") == BLOG_STATUS_PUBLISHED:
            attrs = {
                "status": BLOG_STATUS_PUBLISHED,
                "title": cleaned.get("title", ""),
                "slug": cleaned.get("slug", ""),
                "excerpt": cleaned.get("excerpt", ""),
                "contentMarkdown": cleaned.get("content_markdown", ""),
                "category": cleaned.get("category", ""),
                "coverImageUrl": cleaned.get("cover_image_url", ""),
                "coverImageAlt": cleaned.get("cover_image_alt", ""),
            }
            try:
                _validate_publish_requirements(attrs, instance=self.instance)
            except DRFValidationError as exc:
                raise forms.ValidationError(exc.detail) from exc
        return cleaned
