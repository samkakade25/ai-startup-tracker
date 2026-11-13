from django.db import models


class SourceArticle(models.Model):
    class ProcessingStatus(models.TextChoices):
        COLLECTED = "collected", "Collected"
        PROCESSING = "processing", "Processing"
        PROCESSED = "processed", "Processed"
        REVIEW = "review", "Review"
        FAILED = "failed", "Failed"

    title = models.CharField(max_length=500)

    url = models.URLField(unique=True)

    source_name = models.CharField(max_length=255)
    author = models.CharField(max_length=255, blank=True)

    published_at = models.DateTimeField(null=True, blank=True)
    fetched_at = models.DateTimeField(auto_now_add=True)

    content = models.TextField(blank=True)
    summary = models.TextField(blank=True)

    processing_status = models.CharField(
        max_length=20,
        choices=ProcessingStatus.choices,
        default=ProcessingStatus.COLLECTED,
    )

    content_hash = models.CharField(
        max_length=128,
        unique=True,
        null=True,
        blank=True,
    )

    error_message = models.TextField(blank=True)

    ai_processed_at = models.DateTimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-published_at", "-created_at"]
        indexes = [
            models.Index(fields=["published_at"]),
            models.Index(fields=["processing_status"]),
            models.Index(fields=["source_name"]),
        ]

    def __str__(self):
        return self.title