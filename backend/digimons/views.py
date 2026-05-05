from rest_framework import viewsets, filters, generics
from .models import Digimon
from .serializers import DigimonSerializer, DigimonDetailSerializer


class DigimonViewSet(viewsets.ModelViewSet):
    queryset = Digimon.objects.all()
    serializer_class = DigimonSerializer
    filter_backends = [filters.SearchFilter]  # Bu satır kritik
    search_fields = ['name']

class DigimonDetailView(generics.RetrieveAPIView):
    queryset = Digimon.objects.all()
    serializer_class = DigimonDetailSerializer
    lookup_field = 'id' # Varsa 'slug' ile de değiştirebiliriz