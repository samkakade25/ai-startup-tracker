from django.contrib import admin

from .models import SourceArticle


@admin.register(SourceArticle)
class SourceArticleAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "source_name",
        "published_at",
        "processing_status",
    )
    list_filter = (
        "processing_status",
        "source_name",
    )
    search_fields = (
        "title",
        "source_name",
        "author",
    )