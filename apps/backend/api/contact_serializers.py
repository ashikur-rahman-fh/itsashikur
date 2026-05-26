import re

from rest_framework import serializers

from .models import ContactMessage

NAME_MAX_LENGTH = 120
EMAIL_MAX_LENGTH = 254
MESSAGE_MIN_LENGTH = 20
MESSAGE_MAX_LENGTH = 5000

CONTACT_SUCCESS_MESSAGE = "Thanks—your message was sent successfully. I'll get back to you soon."


class ContactMessageSubmitSerializer(serializers.Serializer):
    name = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        max_length=NAME_MAX_LENGTH,
        error_messages={
            "required": "Please enter your name so I know who is reaching out.",
            "blank": "Please enter your name so I know who is reaching out.",
            "max_length": "Your name can be at most 120 characters.",
        },
    )
    email = serializers.EmailField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        max_length=EMAIL_MAX_LENGTH,
        error_messages={
            "required": "Please enter your email address so I can reply to you.",
            "blank": "Please enter your email address so I can reply to you.",
            "invalid": "Please enter a valid email address, like name@example.com.",
        },
    )
    message = serializers.CharField(
        required=True,
        allow_blank=False,
        trim_whitespace=True,
        min_length=MESSAGE_MIN_LENGTH,
        max_length=MESSAGE_MAX_LENGTH,
        error_messages={
            "required": "Please write your message before sending.",
            "blank": "Please write your message before sending.",
            "min_length": (f"Add a bit more detail (at least {MESSAGE_MIN_LENGTH} characters)."),
            "max_length": (
                f"Your message is too long. Please shorten it to {MESSAGE_MAX_LENGTH} "
                "characters or less."
            ),
        },
    )
    website = serializers.CharField(
        required=False,
        allow_blank=True,
        default="",
        write_only=True,
    )
    captchaToken = serializers.CharField(
        required=False,
        allow_blank=True,
        default="",
        write_only=True,
    )

    def validate_name(self, value: str) -> str:
        cleaned = re.sub(r"\s+", " ", value.strip())
        if not cleaned:
            raise serializers.ValidationError(
                "Please enter your name so I know who is reaching out."
            )
        return cleaned

    def validate_email(self, value: str) -> str:
        return value.strip().lower()

    def validate_message(self, value: str) -> str:
        cleaned = value.strip()
        if len(cleaned) < MESSAGE_MIN_LENGTH:
            raise serializers.ValidationError(
                f"Add a bit more detail (at least {MESSAGE_MIN_LENGTH} characters)."
            )
        return cleaned

    def create(self, validated_data: dict) -> ContactMessage:
        validated_data.pop("website", None)
        validated_data.pop("captchaToken", None)
        request = self.context.get("request")
        ip_hash = ""
        user_agent = ""
        if request is not None:
            ip = request.META.get("HTTP_X_FORWARDED_FOR", "").split(",")[0].strip()
            if not ip:
                ip = request.META.get("REMOTE_ADDR", "")
            if ip:
                ip_hash = ContactMessage.hash_ip(ip)
            raw_ua = request.META.get("HTTP_USER_AGENT", "")
            user_agent = raw_ua[:256] if raw_ua else ""

        return ContactMessage.objects.create(
            full_name=validated_data["name"],
            email=validated_data["email"],
            message=validated_data["message"],
            ip_hash=ip_hash,
            user_agent=user_agent,
        )
