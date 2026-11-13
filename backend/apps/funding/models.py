from django.db import models

from apps.investors.models import Investor
from apps.sources.models import SourceArticle
from apps.startups.models import Startup


class FundingRound(models.Model):
    class RoundType(models.TextChoices):
        PRE_SEED = "pre_seed", "Pre-seed"
        SEED = "seed", "Seed"
        SERIES_A = "series_a", "Series A"
        SERIES_B = "series_b", "Series B"
        SERIES_C = "series_c", "Series C"
        SERIES_D = "series_d", "Series D"
        SERIES_E_PLUS = "series_e_plus", "Series E+"
        DEBT = "debt", "Debt"
        GRANT = "grant", "Grant"
        OTHER = "other", "Other"

    startup = models.ForeignKey(
        Startup,
        on_delete=models.CASCADE,
        related_name="funding_rounds",
    )

    round_type = models.CharField(
        max_length=30,
        choices=RoundType.choices,
    )

    announced_date = models.DateField()

    amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
    )

    currency = models.CharField(
        max_length=3,
        default="USD",
    )

    amount_usd = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        null=True,
        blank=True,
    )

    post_money_valuation = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        null=True,
        blank=True,
    )

    source_article = models.ForeignKey(
        SourceArticle,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="funding_rounds",
    )

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-announced_date"]
        indexes = [
            models.Index(fields=["announced_date"]),
            models.Index(fields=["round_type"]),
            models.Index(fields=["currency"]),
        ]

    def __str__(self):
        return f"{self.startup.name} - {self.round_type}"


class FundingInvestor(models.Model):
    class Role(models.TextChoices):
        LEAD = "lead", "Lead"
        PARTICIPANT = "participant", "Participant"
        UNKNOWN = "unknown", "Unknown"

    funding_round = models.ForeignKey(
        FundingRound,
        on_delete=models.CASCADE,
        related_name="investments",
    )

    investor = models.ForeignKey(
        Investor,
        on_delete=models.CASCADE,
        related_name="funding_rounds",
    )

    role = models.CharField(
        max_length=20,
        choices=Role.choices,
        default=Role.UNKNOWN,
    )

    investment_amount = models.DecimalField(
        max_digits=18,
        decimal_places=2,
        null=True,
        blank=True,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["funding_round", "investor"],
                name="unique_funding_round_investor",
            ),
        ]

    def __str__(self):
        return f"{self.investor.name} → {self.funding_round}"