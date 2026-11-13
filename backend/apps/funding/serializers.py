from rest_framework import serializers

from apps.investors.models import Investor
from apps.startups.models import Startup

from .models import FundingInvestor, FundingRound


class FundingInvestorSerializer(serializers.ModelSerializer):
    investor = serializers.SlugRelatedField(
        slug_field="slug",
        queryset=Investor.objects.all(),
    )

    class Meta:
        model = FundingInvestor
        fields = [
            "id",
            "funding_round",
            "investor",
            "role",
            "investment_amount",
        ]


class FundingRoundSerializer(serializers.ModelSerializer):
    startup = serializers.SlugRelatedField(
        slug_field="slug",
        queryset=Startup.objects.all(),
    )

    investments = FundingInvestorSerializer(
        many=True,
        read_only=True,
    )

    class Meta:
        model = FundingRound
        fields = [
            "id",
            "startup",
            "round_type",
            "announced_date",
            "amount",
            "currency",
            "amount_usd",
            "post_money_valuation",
            "source_article",
            "investments",
            "created_at",
            "updated_at",
        ]