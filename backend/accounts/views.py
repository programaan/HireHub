from rest_framework import status, generics

from .models import User

from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken

from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str

from rest_framework.views import APIView

from .tokens import email_verification_token

from .serializers import ( RegisterSerializer, LoginSerializer, UserSerializer )
from .services import send_account_verification

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

class MeView(generics.RetrieveAPIView):

    serializer_class = UserSerializer

    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user