from rest_framework import serializers
from .models import User
from django.contrib.auth import authenticate

from profiles.models import CandidateProfile, RecruiterProfile


class RegisterSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    class Meta:
        model = User
        fields = (
            "full_name",
            "email",
            "password",
            "role",
        )

    def create(self, validated_data):

        return User.objects.create_user(
            email=validated_data["email"],
            full_name=validated_data["full_name"],
            password=validated_data["password"],
            role=validated_data["role"],
            is_active=True,
            is_verified=False,
        )

class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):

        email = attrs.get("email")
        password = attrs.get("password")

        user = User.objects.filter(email=email).first()

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        if not user.is_verified:
            raise serializers.ValidationError(
                "Please verify your email first."
            )

        if not user.is_active:
            raise serializers.ValidationError(
                "This account is inactive."
            )

        user = authenticate(
            username=email,
            password=password,
        )

        if not user:
            raise serializers.ValidationError(
                "Invalid email or password."
            )

        attrs["user"] = user

        return attrs


class UserSerializer(serializers.ModelSerializer):

    profile_picture = serializers.SerializerMethodField()

    company_logo = serializers.SerializerMethodField()

    class Meta:

        model = User

        fields = (

            "id",
            "full_name",
            "email",
            "role",

            "profile_picture",
            "company_logo",

        )

    def get_profile_picture(self, obj):

        if obj.role == "candidate":

            profile = getattr(obj, "candidate_profile", None)

            if profile and profile.profile_picture:

                return profile.profile_picture.url

        return None

    def get_company_logo(self, obj):

        if obj.role == "recruiter":

            profile = getattr(obj, "recruiter_profile", None)

            if profile and profile.company_logo:

                return profile.company_logo.url

        return None

class ResetPasswordSerializer(serializers.Serializer):

    password = serializers.CharField(
        min_length=8,
        write_only=True,
    )

    confirm_password = serializers.CharField(
        write_only=True,
    )

    def validate(self, attrs):

        if attrs["password"] != attrs["confirm_password"]:
            raise serializers.ValidationError(
                "Passwords do not match."
            )

        return attrs