from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .models import CandidateProfile
from .serializers import CandidateProfileSerializer, RecruiterProfileSerializer

from applications.permissions import IsCandidate
from jobs.permissions import IsRecruiter


class CandidateProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = CandidateProfileSerializer

    permission_classes = [IsAuthenticated, IsCandidate]

    def get_object(self):

        return self.request.user.candidate_profile


class RecruiterProfileView(generics.RetrieveUpdateAPIView):

    serializer_class = RecruiterProfileSerializer

    permission_classes = [IsAuthenticated, IsRecruiter]

    def get_object(self):

        return self.request.user.recruiter_profile