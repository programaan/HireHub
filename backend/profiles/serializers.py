from rest_framework import serializers

from .models import CandidateProfile, RecruiterProfile


class CandidateProfileSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(source="user.full_name", read_only=True)

    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:

        model = CandidateProfile

        fields = [
            "full_name",
            "email",
            "bio",
            "phone",
            "location",
            "skills",
            "education",
            "experience",
            "resume",
            "profile_picture",
            "linkedin",
            "github",
            "portfolio",
        ]

class RecruiterProfileSerializer(serializers.ModelSerializer):

    full_name = serializers.CharField(source="user.full_name", read_only=True)

    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:

        model = RecruiterProfile

        fields = [

            "full_name",
            "email",

            "company_name",
            "company_description",
            "company_website",
            "company_logo",
            "location",

        ]