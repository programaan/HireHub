from django.db import models
from profiles.models import RecruiterProfile


class Job(models.Model):

    JOB_TYPES = (
        ("full-time", "Full Time"),
        ("part-time", "Part Time"),
        ("internship", "Internship"),
        ("contract", "Contract"),
        ("remote", "Remote"),
    )

    title = models.CharField(
        max_length=200,
    )

    company = models.ForeignKey(
        RecruiterProfile,
        on_delete=models.CASCADE,
        related_name="jobs",
    )

    description = models.TextField()

    location = models.CharField(
        max_length=150,
    )

    salary = models.CharField(
        max_length=100,
        blank=True,
    )

    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPES,
    )

    experience = models.CharField(
        max_length=100,
        blank=True,
    )

    skills = models.TextField(
        blank=True,
    )

    deadline = models.DateField()

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return self.title