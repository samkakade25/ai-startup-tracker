from django.contrib import admin

from .models import JobOpening


@admin.register(JobOpening)
class JobOpeningAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "startup",
        "location",
        "employment_type",
        "is_active",
        "published_at",
    )
    list_filter = (
        "is_active",
        "employment_type",
    )
    search_fields = (
        "title",
        "location",
        "startup__name",
    )