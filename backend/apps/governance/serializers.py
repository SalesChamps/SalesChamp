from rest_framework import serializers
from .models import ConnectorConfig, AuditLog

class ConnectorConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectorConfig
        fields = '__all__'


class AuditLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditLog
        fields = '__all__'
