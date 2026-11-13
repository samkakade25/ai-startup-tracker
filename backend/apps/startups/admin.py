from django.contrib import admin

from .models import Startup


@admin.register(Startup)
class StartupAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "headquarters_country",
        "sector",
        "stage",
        "status",
        "created_at",
    )
    list_filter = (
        "stage",
        "status",
        "headquarters_country",
        "is_ai_company",
    )
    search_fields = (
        "name",
        "sector",
        "headquarters_city",
        "headquarters_country",
    )
    prepopulated_fields = {
        "slug": ("name",),
    }