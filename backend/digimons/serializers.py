import json
from rest_framework import serializers
from .models import Digimon


class DigimonSerializer(serializers.ModelSerializer):
    # CRITICAL: ReadOnlyField tanımlarını kaldırdık.
    # Artık bu alanlar hem okunabilir hem yazılabilir (writable) durumdadır.

    class Meta:
        model = Digimon
        fields = '__all__'

    def to_internal_value(self, data):
        # 1. Standart alanları (rank, hatch, size vb.) işle
        internal_value = super().to_internal_value(data)

        # 2. JSON alanlarını (string -> Python objesi) dönüştür
        json_fields = ['stats', 'families', 'evo_from', 'evo_to']

        for field in json_fields:
            value = data.get(field)
            if value and isinstance(value, str):
                try:
                    # Gelen string'i Python listesine veya sözlüğüne çeviriyoruz[cite: 3]
                    internal_value[field] = json.loads(value)
                except json.JSONDecodeError:
                    # Hata durumunda modeldeki default değerleri koruyoruz[cite: 4]
                    if field == 'stats':
                        internal_value[field] = {}
                    else:
                        internal_value[field] = []

        print(internal_value)
        return internal_value


class DigimonDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Digimon
        fields = [
            'id', 'name', 'image', 'form', 'attribute', 'element', 'families',
            'rank', 'hatch', 'size', 'digi_class', 'is_reborn', 'stats',
            'evo_from', 'evo_to'
        ]