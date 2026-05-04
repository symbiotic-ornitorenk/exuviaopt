from django.db import models


class Digimon(models.Model):
    name = models.CharField(max_length=100, unique=True)
    attribute = models.CharField(max_length=50)
    element = models.CharField(max_length=50)
    form = models.CharField(max_length=50)
    hatch = models.CharField(max_length=10, default=5)  # Örn: "5"
    rank = models.CharField(max_length=10, null=True, blank=True)  # Örn: "SS+"[cite: 3]
    digi_class = models.CharField(max_length=10, null=True, blank=True)  # Örn: "SK"[cite: 3]
    image = models.ImageField(upload_to='digimons/', null=True, blank=True)
    families = models.JSONField(default=list, null=True, blank=True)
    is_reborn = models.CharField(max_length=10, default="False")  # JSON'daki gibi string tutuyoruz[cite: 3]
    size = models.CharField(max_length=10, default=140.0)  # "140%"[cite: 3]

    # Evrim İlişkileri[cite: 3]
    evo_from = models.JSONField(default=list, null=True, blank=True)
    evo_to = models.JSONField(default=list, null=True, blank=True)

    # İstatistikler[cite: 3]
    stats = models.JSONField(default=dict, null=True, blank=True)

    def __str__(self):
        return self.nameNo
