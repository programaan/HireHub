from django.urls import path

from .views import ( RegisterView, LoginView, MeView, VerifyEmailView, ForgotPasswordView, ResetPasswordView )

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    path("verify-email/<uid>/<token>/", VerifyEmailView.as_view()),
    path("forgot-password/", ForgotPasswordView.as_view()),
    path("reset-password/<uidb64>/<token>/", ResetPasswordView.as_view())
]