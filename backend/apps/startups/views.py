from rest_framework import viewsets

from .models import Startup
from .serializers import StartupSerializer


class StartupViewSet(viewsets.ModelViewSet):
    queryset = Startup.objects.all()
    serializer_class = StartupSerializer

    filterset_fields = [
        "stage",
        "status",
        "headquarters_country",
        "is_ai_company",
    ]

    search_fields = [
        "name",
        "sector",
        "description",
        "headquarters_city",
        "headquarters_country",
    ]

    ordering_fields = [
        "name",
        "founded_year",
        "employee_count",
        "created_at",
    ]

    ordering = ["name"]