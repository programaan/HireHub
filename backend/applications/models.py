from django.db import models

from jobs.models import Job
from profiles.models import CandidateProfile


class Application(models.Model):

    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="applications",
    )

    candidate = models.ForeignKey(
        CandidateProfile,
        on_delete=models.CASCADE,
        related_name="applications",
    )

    cover_letter = models.TextField(
        blank=True,
    )

    resume = models.FileField(
        upload_to="applications/resumes/",
        blank=True,
        null=True,
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending",
    )

    applied_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    class Meta:
        unique_together = (
            "job",
            "candidate",
        )

    def __str__(self):
        return f"{self.candidate.user.email} -> {self.job.title}"