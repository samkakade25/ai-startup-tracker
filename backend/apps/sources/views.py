from rest_framework import viewsets

from .models import SourceArticle
from .serializers import SourceArticleSerializer


class SourceArticleViewSet(viewsets.ModelViewSet):
    queryset = SourceArticle.objects.all()
    serializer_class = SourceArticleSerializer

    filterset_fields = [
        "source_name",
        "processing_status",
    ]

    search_fields = [
        "title",
        "source_name",
        "author",
        "summary",
    ]

    ordering_fields = [
        "published_at",
        "created_at",
    ]

    ordering = ["-published_at"]