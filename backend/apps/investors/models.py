from django.db import models


class Investor(models.Model):
    class InvestorType(models.TextChoices):
        VC = "vc", "Venture Capital"
        ANGEL = "angel", "Angel"
        CORPORATE = "corporate", "Corporate"
        ACCELERATOR = "accelerator", "Accelerator"
        PRIVATE_EQUITY = "private_equity", "Private Equity"
        FAMILY_OFFICE = "family_office", "Family Office"
        OTHER = "other", "Other"

    name = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True)

    investor_type = models.CharField(
        max_length=30,
        choices=InvestorType.choices,
        default=InvestorType.OTHER,
    )

    description = models.TextField(blank=True)

    website = models.URLField(blank=True)

    headquarters_city = models.CharField(max_length=100, blank=True)
    headquarters_country = models.CharField(max_length=100, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        indexes = [
            models.Index(fields=["investor_type"]),
            models.Index(fields=["headquarters_country"]),
        ]

    def __str__(self):
        return self.name