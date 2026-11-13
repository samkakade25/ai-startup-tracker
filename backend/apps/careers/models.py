from django.db import models

from apps.startups.models import Startup


class JobOpening(models.Model):
    startup = models.ForeignKey(
        Startup,
        on_delete=models.CASCADE,
        related_name="job_openings",
        null=True,
        blank=True,
    )

    title = models.CharField(max_length=255)

    location = models.CharField(
        max_length=255,
        blank=True,
    )

    employment_type = models.CharField(
        max_length=100,
        blank=True,
    )

    url = models.URLField(unique=True)

    source_name = models.CharField(
        max_length=255,
        blank=True,
    )

    published_at = models.DateTimeField(
        null=True,
        blank=True,
    )

    description = models.TextField(
        blank=True,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        indexes = [
            models.Index(fields=["is_active"]),
            models.Index(fields=["published_at"]),
            models.Index(fields=["location"]),
        ]

    def __str__(self):
        return self.title