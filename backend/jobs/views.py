from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import Job
from .serializers import JobSerializer
from .permissions import IsRecruiter

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from rest_framework.views import APIView
from rest_framework.response import Response

from profiles.models import CandidateProfile
from applications.permissions import IsCandidate


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

    def get_permissions(self):

        if self.request.method in ["PUT", "PATCH", "DELETE"]:

            return [
                IsAuthenticated(),
                IsRecruiter(),
            ]

        return []

    def perform_update(self, serializer):

        serializer.save(
            company=self.request.user.recruiter_profile
        )

class RecruiterJobsView(generics.ListAPIView):

    serializer_class = JobSerializer
    permission_classes = [
        IsAuthenticated,
        IsRecruiter,
    ]

    def get_queryset(self):
        return Job.objects.filter(
            company=self.request.user.recruiter_profile
        ).order_by("-created_at")


class ToggleSaveJobView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate,
    ]

    def post(self, request, pk):

        job = Job.objects.get(pk=pk)

        candidate = request.user.candidate_profile

        if job.saved_by.filter(id=candidate.id).exists():

            job.saved_by.remove(candidate)

            return Response({

                "saved": False,

                "message": "Job removed from saved jobs."

            })

        job.saved_by.add(candidate)

        return Response({

            "saved": True,

            "message": "Job saved successfully."

        })


class SavedJobsView(APIView):

    permission_classes = [
        IsAuthenticated,
        IsCandidate,
    ]

    def get(self, request):

        jobs = request.user.candidate_profile.saved_jobs.all()

        serializer = JobSerializer(
            jobs,
            many=True,
        )

        return Response(serializer.data)