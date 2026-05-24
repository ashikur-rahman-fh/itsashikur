from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
    throttle_classes,
)
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.throttling import ScopedRateThrottle

from .contact_serializers import CONTACT_SUCCESS_MESSAGE, ContactMessageSubmitSerializer


class ContactSubmitThrottle(ScopedRateThrottle):
    scope = "contact_submit"


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
@throttle_classes([ContactSubmitThrottle])
def public_contact_submit(request):
    serializer = ContactMessageSubmitSerializer(data=request.data, context={"request": request})
    website = ""
    if isinstance(request.data, dict):
        website = (request.data.get("website") or "").strip()
    if website:
        return Response({"success": True, "message": CONTACT_SUCCESS_MESSAGE})

    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({"success": True, "message": CONTACT_SUCCESS_MESSAGE})
