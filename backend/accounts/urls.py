from django.urls import path

from .views import RegisterView, LoginView, MeView, VerifyEmailView

urlpatterns = [

    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),
    path("me/", MeView.as_view()),
    path("verify-email/<uid>/<token>/", VerifyEmailView.as_view()),

]