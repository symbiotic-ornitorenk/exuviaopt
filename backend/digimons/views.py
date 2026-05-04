from rest_framework import viewsets, filters
from .models import Digimon
from .serializers import DigimonSerializer

class DigimonViewSet(viewsets.ModelViewSet):
    queryset = Digimon.objects.all()
    serializer_class = DigimonSerializer
    filter_backends = [filters.SearchFilter]  # Bu satır kritik
    search_fields = ['name']