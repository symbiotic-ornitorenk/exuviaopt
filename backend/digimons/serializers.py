import json
from rest_framework import serializers
from .models import Digimon


class DigimonSerializer(serializers.ModelSerializer):
    # Bu alanları serializer'ın otomatik kontrolünden tamamen çıkarıyoruz.
    # Artık DRF 'geçersiz string' veya 'geçersiz JSON' hatası veremez.
    families = serializers.ReadOnlyField()
    evo_from = serializers.ReadOnlyField()
    evo_to = serializers.ReadOnlyField()
    stats = serializers.ReadOnlyField()

    class Meta:
        model = Digimon
        fields = '__all__'

    def to_internal_value(self, data):
        # FormData objesinin kopyasını alarak üzerinde işlem yapıyoruz.
        resource_data = data.copy()

        json_fields = ['families', 'evo_from', 'evo_to', 'stats']

        for field in json_fields:
            value = resource_data.get(field)

            if isinstance(value, str):
                try:
                    # 'undefined' veya boş string kontrolü yaparak parse ediyoruz[cite: 5].
                    if value.strip() == "" or value == "undefined" or value == "null":
                        resource_data[field] = [] if field != 'stats' else {}
                    else:
                        resource_data[field] = json.loads(value)
                except (ValueError, TypeError):
                    resource_data[field] = [] if field != 'stats' else {}
            elif value is None:
                resource_data[field] = [] if field != 'stats' else {}

        # Temizlenmiş veriyi doğrudan ModelSerializer'ın ana metoduna gönderiyoruz.
        # Bu aşamada resource_data içindeki JSON alanları artık birer Python objesidir.
        return super().to_internal_value(resource_data)