from django.db import models
from apps.common.models import BaseModel

class AnalyticsMetric(BaseModel):
    metric_key = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=255)
    value_display = models.CharField(max_length=100)
    change_percentage = models.CharField(max_length=50, default='+18.4%')
    trend_direction = models.CharField(max_length=20, default='up') # 'up', 'down', 'stable'
    period = models.CharField(max_length=50, default='Q3 FY25')
    breakdown = models.JSONField(default=dict, blank=True)
    historical_points = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ['metric_key']

    def __str__(self):
        return f"{self.title}: {self.value_display} ({self.change_percentage})"
