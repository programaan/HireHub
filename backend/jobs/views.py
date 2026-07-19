from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Job
from .serializers import JobSerializer
from .permissions import IsRecruiter

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter


class JobListCreateView(generics.ListCreateAPIView):

    queryset = Job.objects.filter(
        is_active=True
    ).order_by("-created_at")

    serializer_class = JobSerializer

    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]

    filterset_fields = [
        "location",
        "job_type",
        "experience",
    ]

    search_fields = [
        "title",
        "description",
        "skills",
    ]

    ordering_fields = [
        "created_at",
        "deadline",
    ]

    def get_permissions(self):

        if self.request.method == "POST":
            return [
                IsAuthenticated(),
                IsRecruiter(),
            ]

        return []

    def perform_create(self, serializer):

        serializer.save(
            company=self.request.user.recruiter_profile
        )

class JobDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Job.objects.all()

    serializer_class = JobSerializer

    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def perform_update(self, serializer):

        serializer.save(
            company=self.request.user.recruiter_profile
        )