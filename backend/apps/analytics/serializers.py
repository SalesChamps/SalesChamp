from rest_framework import serializers
from .models import AnalyticsMetric

class AnalyticsMetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalyticsMetric
        fields = '__all__'
