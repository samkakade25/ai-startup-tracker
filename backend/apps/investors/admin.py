from django.contrib import admin

from .models import Investor


@admin.register(Investor)
class InvestorAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "investor_type",
        "headquarters_country",
    )
    list_filter = (
        "investor_type",
        "headquarters_country",
    )
    search_fields = (
        "name",
        "headquarters_city",
        "headquarters_country",
    )
    prepopulated_fields = {
        "slug": ("name",),
    }