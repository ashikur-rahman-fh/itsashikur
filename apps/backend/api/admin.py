from django.contrib import admin

from .blog_forms import BlogPostAdminForm
from .models import BlogPost, ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "is_read", "created_at")
    list_filter = ("is_read", "created_at")
    search_fields = ("full_name", "email", "message")
    readonly_fields = (
        "id",
        "full_name",
        "email",
        "message",
        "ip_hash",
        "user_agent",
        "created_at",
        "updated_at",
    )
    ordering = ("-created_at",)


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    form = BlogPostAdminForm
    prepopulated_fields = {"slug": ("title",)}
    list_display = (
        "title",
        "slug",
        "status",
        "category",
        "is_featured",
        "published_at",
        "updated_at",
    )
    list_filter = ("status", "category", "is_featured")
    search_fields = ("title", "slug", "excerpt")
    readonly_fields = ("id", "reading_time_minutes", "created_at", "updated_at")
    ordering = ("-updated_at",)
