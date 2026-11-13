from django.contrib import admin

from .models import FundingRound, FundingInvestor


@admin.register(FundingRound)
class FundingRoundAdmin(admin.ModelAdmin):
    list_display = (
        "startup",
        "round_type",
        "amount",
        "currency",
        "announced_date",
    )
    list_filter = (
        "round_type",
        "currency",
    )
    search_fields = (
        "startup__name",
    )


@admin.register(FundingInvestor)
class FundingInvestorAdmin(admin.ModelAdmin):
    list_display = (
        "funding_round",
        "investor",
        "role",
        "investment_amount",
    )
    list_filter = (
        "role",
    )
    search_fields = (
        "investor__name",
        "funding_round__startup__name",
    )