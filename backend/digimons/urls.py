from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DigimonViewSet, DigimonDetailView

router = DefaultRouter()
router.register(r'', DigimonViewSet)  # /api/digimons/ altında çalışacak

urlpatterns = [
    path('', include(router.urls)),
    path('<int:id>/', DigimonDetailView.as_view(), name='digimon_detail'),
]
