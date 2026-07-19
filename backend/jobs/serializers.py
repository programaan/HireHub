from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):

    company = serializers.PrimaryKeyRelatedField(
        read_only=True,
    )

    company_name = serializers.CharField(
        source="company.company_name",
        read_only=True,
    )

    class Meta:
        model = Job

        fields = [
            "id",
            "title",
            "company",
            "company_name",
            "description",
            "location",
            "salary",
            "job_type",
            "experience",
            "skills",
            "deadline",
            "is_active",
            "created_at",
            "updated_at",
        ]

        read_only_fields = [
            "id",
            "company",
            "company_name",
            "created_at",
            "updated_at",
        ]