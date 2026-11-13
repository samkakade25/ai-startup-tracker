from rest_framework import serializers

from .models import Investor


class InvestorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investor
        fields = [
            "id",
            "name",
            "slug",
            "investor_type",
            "description",
            "website",
            "headquarters_city",
            "headquarters_country",
            "created_at",
            "updated_at",
        ]