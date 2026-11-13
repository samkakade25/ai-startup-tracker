from rest_framework import serializers

from .models import SourceArticle


class SourceArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SourceArticle
        fields = [
            "id",
            "title",
            "url",
            "source_name",
            "author",
            "published_at",
            "fetched_at",
            "content",
            "summary",
            "processing_status",
            "content_hash",
            "error_message",
            "ai_processed_at",
            "created_at",
            "updated_at",
        ]