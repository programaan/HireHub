from rest_framework import serializers

from .models import Application


class ApplicationSerializer(serializers.ModelSerializer):

    company_name = serializers.CharField(
        source="job.recruiter.company_name",
        read_only=True,
    )

    candidate_name = serializers.CharField(
        source="candidate.user.full_name",
        read_only=True,
    )

    candidate_email = serializers.CharField(
        source="candidate.user.email",
        read_only=True,
    )

    job_title = serializers.CharField(
        source="job.title",
        read_only=True,
    )

    class Meta:
        model = Application

        fields = [
            "id",
            "job",
            "job_title",
            "company_name",
            "candidate",
            "candidate_name",
            "candidate_email",
            "cover_letter",
            "resume",
            "status",
            "applied_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "candidate",
            "candidate_name",
            "candidate_email",
            "status",
            "applied_at",
            "updated_at",
        ]

class RecruiterApplicationSerializer(serializers.ModelSerializer):

    candidate_name = serializers.CharField(
        source="candidate.user.full_name",
        read_only=True,
    )

    candidate_email = serializers.CharField(
        source="candidate.user.email",
        read_only=True,
    )

    class Meta:
        model = Application

        fields = [
            "id",
            "candidate_name",
            "candidate_email",
            "cover_letter",
            "resume",
            "status",
            "applied_at",
        ]

class ApplicationStatusSerializer(serializers.ModelSerializer):

    class Meta:
        model = Application

        fields = [
            "status",
        ]