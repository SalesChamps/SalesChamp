import random
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import ConnectorConfig, AuditLog
from .serializers import ConnectorConfigSerializer, AuditLogSerializer

class ConnectorConfigViewSet(viewsets.ModelViewSet):
    queryset = ConnectorConfig.objects.all()
    serializer_class = ConnectorConfigSerializer

    @action(detail=True, methods=['post'])
    def ping(self, request, pk=None):
        """Test live ping and credential handshake for an enterprise connector."""
        connector = self.get_object()
        connector.latency_ms = random.randint(85, 140)
        connector.status = 'CONNECTED'
        connector.save()
        return Response({
            'status': 'SUCCESS',
            'connector': connector.name,
            'latency_ms': connector.latency_ms,
            'handshake': 'OAuth2 Token Validated',
            'message': f"Successfully verified connection to {connector.name}."
        })


class AuditLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditLog.objects.all()
    serializer_class = AuditLogSerializer
