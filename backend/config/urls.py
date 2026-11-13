from django.contrib import admin
from django.http import JsonResponse
from django.urls import include, path

from rest_framework.routers import DefaultRouter

from apps.careers.views import JobOpeningViewSet
from apps.funding.views import (
    FundingInvestorViewSet,
    FundingRoundViewSet,
)
from apps.investors.views import InvestorViewSet
from apps.sources.views import SourceArticleViewSet
from apps.startups.views import StartupViewSet


def health_check(request):
    return JsonResponse({
        "status": "ok",
        "service": "ai-startup-tracker-api",
    })


router = DefaultRouter()

router.register(
    "startups",
    StartupViewSet,
    basename="startup",
)

router.register(
    "investors",
    InvestorViewSet,
    basename="investor",
)

router.register(
    "funding-rounds",
    FundingRoundViewSet,
    basename="funding-round",
)

router.register(
    "funding-investors",
    FundingInvestorViewSet,
    basename="funding-investor",
)

router.register(
    "source-articles",
    SourceArticleViewSet,
    basename="source-article",
)

router.register(
    "job-openings",
    JobOpeningViewSet,
    basename="job-opening",
)


urlpatterns = [
    path("admin/", admin.site.urls),

    path(
        "api/v1/health/",
        health_check,
    ),

    path(
        "api/v1/",
        include(router.urls),
    ),
]