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

    company_description = serializers.CharField(
        source="company.company_description",
        read_only=True,
    )

    company_website = serializers.CharField(
        source="company.company_website",
        read_only=True,
    )

    company_logo = serializers.ImageField(
        source="company.company_logo",
        read_only=True,
    )

    company_location = serializers.CharField(
        source="company.location",
        read_only=True,
    )

    class Meta:

        model = Job

        fields = [
            "id",
            "title",

            "company",
            "company_name",
            "company_description",
            "company_website",
            "company_logo",
            "company_location",

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
            "company_description",
            "company_website",
            "company_logo",
            "company_location",
            "created_at",
            "updated_at",
        ]