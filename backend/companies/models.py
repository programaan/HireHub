from django.db import models


class Company(models.Model):

    name = models.CharField(
        max_length=150,
        unique=True,
    )

    description = models.TextField(
        blank=True,
    )

    website = models.URLField(
        blank=True,
    )

    logo = models.ImageField(
        upload_to="companies/",
        blank=True,
        null=True,
    )

    location = models.CharField(
        max_length=100,
        blank=True,
    )

    industry = models.CharField(
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
        return self.name