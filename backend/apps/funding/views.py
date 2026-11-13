from rest_framework import viewsets

from .models import FundingInvestor, FundingRound
from .serializers import (
    FundingInvestorSerializer,
    FundingRoundSerializer,
)


class FundingRoundViewSet(viewsets.ModelViewSet):
    queryset = FundingRound.objects.select_related(
        "startup",
        "source_article",
    ).prefetch_related(
        "investments__investor",
    )

    serializer_class = FundingRoundSerializer

    filterset_fields = [
        "round_type",
        "currency",
        "startup",
    ]

    search_fields = [
        "startup__name",
    ]

    ordering_fields = [
        "announced_date",
        "amount",
        "amount_usd",
    ]

    ordering = ["-announced_date"]


class FundingInvestorViewSet(viewsets.ModelViewSet):
    queryset = FundingInvestor.objects.select_related(
        "funding_round",
        "investor",
    )

    serializer_class = FundingInvestorSerializer

    filterset_fields = [
        "role",
        "investor",
    ]

    search_fields = [
        "investor__name",
        "funding_round__startup__name",
    ]