from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AnalyticsMetric
from .serializers import AnalyticsMetricSerializer
from apps.agents.analytics_agent import AnalyticsAgent

class AnalyticsViewSet(viewsets.ModelViewSet):
    queryset = AnalyticsMetric.objects.all()
    serializer_class = AnalyticsMetricSerializer

    @action(detail=False, methods=['get'])
    def overview(self, request):
        """Get consolidated executive dashboard KPIs and charts."""
        metrics = AnalyticsMetric.objects.all()
        serializer = self.get_serializer(metrics, many=True)
        return Response({
            'kpis': serializer.data,
            'pipeline_funnel': [
                {'stage': 'AI Discovered', 'count': 48, 'value': '$14.2M', 'pct': '100%'},
                {'stage': 'Researched & Dossier', 'count': 36, 'value': '$11.8M', 'pct': '75%'},
                {'stage': 'Proposal Under Review', 'count': 22, 'value': '$7.9M', 'pct': '46%'},
                {'stage': 'Dual CRM Synced', 'count': 18, 'value': '$6.4M', 'pct': '38%'},
                {'stage': 'SAP ERP Invoiced', 'count': 12, 'value': '$4.1M', 'pct': '25%'},
            ],
            'territory_distribution': [
                {'region': 'North America Enterprise', 'share': '48%', 'value': '$5.95M', 'sfdc_share': '62%'},
                {'region': 'EMEA Strategic', 'share': '34%', 'value': '$4.21M', 'sfdc_share': '51%'},
                {'region': 'APAC & Emerging', 'share': '18%', 'value': '$2.24M', 'sfdc_share': '44%'},
            ],
            'sync_telemetry': {
                'salesforce_status': 'CONNECTED',
                'dynamics_status': 'CONNECTED',
                'sap_status': 'ACTIVE',
                'average_latency_ms': 134,
                'total_events_synced_today': 1892
            }
        })

    @action(detail=False, methods=['post'])
    def query(self, request):
        """Natural Language Question answering on Sales Analytics."""
        prompt = request.data.get('prompt', 'Summarize deal velocity for Tier-1 accounts')
        agent = AnalyticsAgent()
        answer = agent.answer_nl_query(prompt)
        return Response({
            'prompt': prompt,
            'response': answer['response'],
            'metrics_referenced': answer.get('metrics', []),
            'suggested_actions': answer.get('actions', [])
        })
