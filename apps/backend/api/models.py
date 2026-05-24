import hashlib
import uuid

from django.db import models


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
