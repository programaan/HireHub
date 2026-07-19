from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes

from django.conf import settings

from .tokens import email_verification_token
from .emails import send_verification_email


def send_account_verification(user):

    uid = urlsafe_base64_encode(
        force_bytes(user.pk)
    )

    token = email_verification_token.make_token(user)

    verify_link = (
        f"{settings.FRONTEND_URL}"
        f"/verify-email/{uid}/{token}"
    )

    send_verification_email(
        user.email,
        verify_link,
    )