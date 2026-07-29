from django.urls import path

from .views import CandidateProfileView, RecruiterProfileView

urlpatterns = [
    path("candidate/", CandidateProfileView.as_view(), name="candidate-profile"),
    path("recruiter/", RecruiterProfileView.as_view(), name="recruiter-profile"),
]