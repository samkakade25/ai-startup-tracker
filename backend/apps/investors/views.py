from rest_framework import viewsets

from .models import Investor
from .serializers import InvestorSerializer


class InvestorViewSet(viewsets.ModelViewSet):
    queryset = Investor.objects.all()
    serializer_class = InvestorSerializer

    filterset_fields = [
        "investor_type",
        "headquarters_country",
    ]

    search_fields = [
        "name",
        "description",
        "headquarters_city",
        "headquarters_country",
    ]

    ordering_fields = [
        "name",
        "created_at",
    ]

    ordering = ["name"]