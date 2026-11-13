from django.db import models


class Startup(models.Model):
    class Stage(models.TextChoices):
        PRE_SEED = "pre_seed", "Pre-seed"
        SEED = "seed", "Seed"
        SERIES_A = "series_a", "Series A"
        SERIES_B = "series_b", "Series B"
        SERIES_C_PLUS = "series_c_plus", "Series C+"
        GROWTH = "growth", "Growth"
        UNKNOWN = "unknown", "Unknown"

    class Status(models.TextChoices):
        ACTIVE = "active", "Active"
        ACQUIRED = "acquired", "Acquired"
        CLOSED = "closed", "Closed"
        UNKNOWN = "unknown", "Unknown"

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    description = models.TextField(blank=True)

    website = models.URLField(blank=True)

    headquarters_city = models.CharField(max_length=100, blank=True)
    headquarters_country = models.CharField(max_length=100, blank=True)

    founded_year = models.PositiveIntegerField(null=True, blank=True)
    employee_count = models.PositiveIntegerField(null=True, blank=True)

    sector = models.CharField(max_length=150, blank=True)

    stage = models.CharField(
        max_length=30,
        choices=Stage.choices,
        default=Stage.UNKNOWN,
    )

    status = models.CharField(
        max_length=20,
        choices=Status.choices,
        default=Status.ACTIVE,
    )

    is_ai_company = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]
        indexes = [
            models.Index(fields=["stage"]),
            models.Index(fields=["headquarters_country"]),
            models.Index(fields=["sector"]),
        ]

    def __str__(self):
        return self.name