from typing import TypedDict

from rest_framework import serializers

from api.models import ContactMessage

MESSAGE_PREVIEW_LENGTH = 120


class ContactMessageListItem(TypedDict):
    id: str
    fullName: str
    email: str
    messagePreview: str
    isRead: bool
    createdAt: str


class ContactMessageDetail(TypedDict):
    id: str
    fullName: str
    email: str
    message: str
    isRead: bool
    createdAt: str
    updatedAt: str


def _message_preview(message: str) -> str:
    text = message.strip()
    if len(text) <= MESSAGE_PREVIEW_LENGTH:
        return text
    return text[: MESSAGE_PREVIEW_LENGTH - 1].rstrip() + "…"


def serialize_contact_message_list_item(msg: ContactMessage) -> ContactMessageListItem:
    return {
        "id": str(msg.id),
        "fullName": msg.full_name,
        "email": msg.email,
        "messagePreview": _message_preview(msg.message),
        "isRead": msg.is_read,
        "createdAt": msg.created_at.isoformat(),
    }


def serialize_contact_message_detail(msg: ContactMessage) -> ContactMessageDetail:
    return {
        "id": str(msg.id),
        "fullName": msg.full_name,
        "email": msg.email,
        "message": msg.message,
        "isRead": msg.is_read,
        "createdAt": msg.created_at.isoformat(),
        "updatedAt": msg.updated_at.isoformat(),
    }


class ContactMessageReadStatusSerializer(serializers.Serializer):
    isRead = serializers.BooleanField(required=True)
