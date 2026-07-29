from django.urls import path

from .views import RecruiterDashboardView, CandidateDashboardView

urlpatterns = [
    path("recruiter/", RecruiterDashboardView.as_view(), name="recruiter-dashboard"),
    path("candidate/", CandidateDashboardView.as_view(), name="candidate-dashboard"),
]