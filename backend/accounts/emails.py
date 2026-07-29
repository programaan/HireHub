from mailjet_rest import Client

from django.conf import settings
from django.template.loader import render_to_string

import logging

logger = logging.getLogger(__name__)

mailjet = Client(
    auth=(
        settings.MAILJET_API_KEY,
        settings.MAILJET_API_SECRET,
    ),
    version="v3.1",
)


def _send_email(subject, html, email):

    data = {
        "Messages": [
            {
                "From": {
                    "Email": settings.DEFAULT_FROM_EMAIL,
                    "Name": "HireHub",
                },
                "To": [
                    {
                        "Email": email,
                    }
                ],
                "Subject": subject,
                "HTMLPart": html,
            }
        ]
    }

    result = mailjet.send.create(data=data)

    print("STATUS:", result.status_code)
    print("RESPONSE:", result.json())

    if result.status_code not in (200, 201):
        raise Exception("Mailjet failed.")


def send_verification_email(email, verify_link):

    html = render_to_string(
        "emails/verify_email.html",
        {
            "verify_link": verify_link,
        },
    )

    _send_email(
        "Verify your HireHub account",
        html,
        email,
    )


def send_password_reset_email(email, reset_link):

    html = render_to_string(
        "emails/reset_password.html",
        {
            "reset_link": reset_link,
        },
    )

    _send_email(
        "Reset your HireHub password",
        html,
        email,
    )