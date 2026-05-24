from django.contrib import admin

from .models import ContactMessage


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
