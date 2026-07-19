from django.db import models
from accounts.models import User


class CandidateProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="candidate_profile",
    )

    bio = models.TextField(blank=True)

    phone = models.CharField(
        max_length=20,
        blank=True,
    )

    location = models.CharField(
        max_length=100,
        blank=True,
    )

    skills = models.TextField(
        blank=True,
    )

    education = models.TextField(
        blank=True,
    )

    experience = models.TextField(
        blank=True,
    )

    resume = models.FileField(
        upload_to="resumes/",
        blank=True,
        null=True,
    )

    profile_picture = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True,
    )

    linkedin = models.URLField(
        blank=True,
    )

    github = models.URLField(
        blank=True,
    )

    portfolio = models.URLField(
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.user.email

class RecruiterProfile(models.Model):

    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="recruiter_profile",
    )

    company_name = models.CharField(
        max_length=150,
        blank=True,
    )

    company_description = models.TextField(
        blank=True,
    )

    company_website = models.URLField(
        blank=True,
    )

    company_logo = models.ImageField(
        upload_to="companies/",
        blank=True,
        null=True,
    )

    location = models.CharField(
        max_length=100,
        blank=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.company_name