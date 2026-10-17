from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import CRMRecord, DeduplicationConflict
from .serializers import CRMRecordSerializer, DeduplicationConflictSerializer
from apps.agents.crm_agent import CRMAgent

class CRMRecordViewSet(viewsets.ModelViewSet):
    queryset = CRMRecord.objects.all()
    serializer_class = CRMRecordSerializer

    @action(detail=False, methods=['post'])
    def sync_all(self, request):
        """Trigger global bi-directional delta synchronization between Salesforce and Dynamics 365."""
        agent = CRMAgent()
        result = agent.synchronize_all()
        return Response({
            'status': 'success',
            'message': 'Dual-CRM Bi-directional delta synchronization completed.',
            'synced_records': result['synced_records'],
            'conflicts_detected': result['conflicts_detected'],
            'avg_latency_ms': result['avg_latency_ms']
        })

    @action(detail=True, methods=['post'])
    def sync_record(self, request, pk=None):
        """Force sync single lead record between Salesforce and Dynamics 365."""
        record = self.get_object()
        agent = CRMAgent()
        updated_record = agent.sync_single_record(record)
        return Response(self.get_serializer(updated_record).data)


class DeduplicationConflictViewSet(viewsets.ModelViewSet):
    queryset = DeduplicationConflict.objects.all()
    serializer_class = DeduplicationConflictSerializer

    @action(detail=True, methods=['post'])
    def resolve(self, request, pk=None):
        """Resolve a conflict by choosing the winning value (SALESFORCE or DYNAMICS_365) or custom input."""
        conflict = self.get_object()
        winner = request.data.get('winner', conflict.ai_recommended_winner)
        custom_value = request.data.get('custom_value')

        conflict.resolved_winner = winner
        conflict.resolution_status = 'RESOLVED'
        conflict.resolved_at = timezone.now()
        conflict.save()

        # Update CRM record status
        crm_record = conflict.crm_record
        if not crm_record.conflicts.filter(resolution_status='UNRESOLVED').exists():
            crm_record.sync_status = 'IN_SYNC'
            crm_record.save()

        return Response({
            'status': 'success',
            'message': f"Conflict for field '{conflict.field_name}' resolved using {winner}.",
            'conflict': self.get_serializer(conflict).data
        })
