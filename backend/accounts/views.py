from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import APIView

from .models import User

from django.conf import settings

from django.contrib.auth import get_user_model
from django.contrib.auth.tokens import default_token_generator

from django.utils.http import ( urlsafe_base64_encode, urlsafe_base64_decode )
from django.utils.encoding import ( force_bytes, force_str )

from .tokens import email_verification_token
from .serializers import ( RegisterSerializer, LoginSerializer, UserSerializer, ResetPasswordSerializer )
from .services import send_account_verification, send_reset_email

class RegisterView(generics.CreateAPIView):

    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.save()

        send_account_verification(user)

        return Response(
            {
                "message": (
                    "Account created successfully. "
                    "Please verify your email."
                )
            },
            status=status.HTTP_201_CREATED,
        )
    
class LoginView(generics.GenericAPIView):

    serializer_class = LoginSerializer

    def post(self, request):

        serializer = self.get_serializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        user = serializer.validated_data["user"]

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
            },
            status=status.HTTP_200_OK,
        )

class VerifyEmailView(APIView):

    def get(self, request, uid, token):

        try:
            user_id = force_str(
                urlsafe_base64_decode(uid)
            )

            user = User.objects.get(pk=user_id)

        except Exception:
            return Response(
                {
                    "detail": "Invalid verification link."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not email_verification_token.check_token(
            user,
            token,
        ):
            return Response(
                {
                    "detail": "Invalid or expired token."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not user.is_verified:
            user.is_verified = True
            user.save()

        return Response(
            {
                "detail": "Email verified successfully."
            }
        )

class ForgotPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request):

        email = request.data.get("email")

        User = get_user_model()

        user = User.objects.filter(email=email).first()

        if not user:

            return Response(
                {
                    "detail":
                    "If an account exists, a reset email has been sent."
                },
                status=status.HTTP_200_OK,
            )

        uid = urlsafe_base64_encode(
            force_bytes(user.pk)
        )

        token = default_token_generator.make_token(user)

        reset_link = (
            f"{settings.FRONTEND_URL}"
            f"/reset-password/{uid}/{token}"
        )

        send_reset_email(
            user.email,
            reset_link,
        )

        return Response(
            {
                "detail":
                "Password reset email sent."
            },
            status=status.HTTP_200_OK,
        )

class ResetPasswordView(APIView):

    permission_classes = [AllowAny]

    def post(self, request, uidb64, token):

        serializer = ResetPasswordSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        User = get_user_model()

        try:

            uid = force_str(
                urlsafe_base64_decode(uidb64)
            )

            user = User.objects.get(pk=uid)

        except Exception:

            return Response(
                {
                    "detail":
                    "Invalid reset link."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        if not default_token_generator.check_token(
            user,
            token,
        ):

            return Response(
                {
                    "detail":
                    "Reset link has expired."
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(
            serializer.validated_data["password"]
        )

        user.save()

        return Response(
            {
                "detail":
                "Password reset successfully."
            }
        )
        

class MeView(generics.RetrieveAPIView):

    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user