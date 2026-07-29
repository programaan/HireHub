from django.urls import path

from .views import (
    JobListCreateView,
    JobDetailView,
    RecruiterJobsView,
    ToggleSaveJobView,
    SavedJobsView,
)

urlpatterns = [
    path("", JobListCreateView.as_view()),
    path("my-jobs/", RecruiterJobsView.as_view()),
    path("saved/", SavedJobsView.as_view()),
    path("<int:pk>/save/", ToggleSaveJobView.as_view()),
    path("<int:pk>/", JobDetailView.as_view()),
]