from rest_framework import viewsets

from .models import JobOpening
from .serializers import JobOpeningSerializer


class JobOpeningViewSet(viewsets.ModelViewSet):
    queryset = JobOpening.objects.select_related("startup")
    serializer_class = JobOpeningSerializer

    filterset_fields = [
        "startup",
        "is_active",
        "location",
        "employment_type",
    ]

    search_fields = [
        "title",
        "location",
        "description",
        "startup__name",
    ]

    ordering_fields = [
        "published_at",
        "created_at",
    ]

    ordering = ["-published_at"]