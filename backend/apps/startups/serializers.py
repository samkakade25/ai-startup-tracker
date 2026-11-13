from rest_framework import serializers

from .models import Startup


class StartupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Startup
        fields = [
            "id",
            "name",
            "slug",
            "description",
            "website",
            "headquarters_city",
            "headquarters_country",
            "founded_year",
            "employee_count",
            "sector",
            "stage",
            "status",
            "is_ai_company",
            "created_at",
            "updated_at",
        ]