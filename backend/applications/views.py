from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Application
from .serializers import (
    ApplicationSerializer,
    RecruiterApplicationSerializer,
    ApplicationStatusSerializer,
)
from .permissions import IsCandidate
from jobs.permissions import IsRecruiter


class ApplicationListCreateView(generics.ListCreateAPIView):

    serializer_class = ApplicationSerializer

    permission_classes = [
        IsAuthenticated,
        IsCandidate,
    ]

    def get_queryset(self):

        return Application.objects.filter(
            candidate=self.request.user.candidate_profile
        ).order_by("-applied_at")

    def perform_create(self, serializer):

        serializer.save(
            candidate=self.request.user.candidate_profile
        )

class JobApplicationsView(generics.ListAPIView):

    serializer_class = RecruiterApplicationSerializer

    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def get_queryset(self):

        job_id = self.kwargs["job_id"]

        return Application.objects.filter(
            job__id=job_id,
            job__company=self.request.user.recruiter_profile,
        ).order_by("-applied_at")
    
class ApplicationStatusUpdateView(generics.UpdateAPIView):

    serializer_class = ApplicationStatusSerializer

    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def get_queryset(self):

        return Application.objects.filter(
            job__company=self.request.user.recruiter_profile
        )