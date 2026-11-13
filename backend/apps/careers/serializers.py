from rest_framework import serializers

from .models import JobOpening


class JobOpeningSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobOpening
        fields = [
            "id",
            "startup",
            "title",
            "location",
            "employment_type",
            "url",
            "source_name",
            "published_at",
            "description",
            "is_active",
            "created_at",
            "updated_at",
        ]