from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import VoiceCallLog, EmailFollowUp
from .serializers import VoiceCallLogSerializer, EmailFollowUpSerializer
from apps.leads.models import Lead
from apps.agents.communication_agent import CommunicationAgent

class VoiceCallLogViewSet(viewsets.ModelViewSet):
    queryset = VoiceCallLog.objects.all()
    serializer_class = VoiceCallLogSerializer

    @action(detail=False, methods=['post'])
    def initiate_call(self, request):
        """Initiate or simulate an AI voice outbound conversation with a prospect."""
        lead_id = request.data.get('lead_id')
        if not lead_id:
            return Response({'error': 'lead_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            lead = Lead.objects.get(id=lead_id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found'}, status=status.HTTP_404_NOT_FOUND)

        agent = CommunicationAgent()
        call_result = agent.simulate_voice_call(lead)

        call_log = VoiceCallLog.objects.create(
            lead=lead,
            agent_name='Nova Voice-SDR',
            status='COMPLETED',
            duration_seconds=call_result['duration_seconds'],
            sentiment_score=call_result['sentiment_score'],
            sentiment_label=call_result['sentiment_label'],
            key_takeaway=call_result['key_takeaway'],
            transcript_turns=call_result['transcript_turns'],
            crm_logged=True
        )

        return Response(self.get_serializer(call_log).data, status=status.HTTP_201_CREATED)


class EmailFollowUpViewSet(viewsets.ModelViewSet):
    queryset = EmailFollowUp.objects.all()
    serializer_class = EmailFollowUpSerializer

    @action(detail=False, methods=['post'])
    def send_followup(self, request):
        """Trigger an omnichannel follow-up sequence."""
        lead_id = request.data.get('lead_id')
        channel = request.data.get('channel', 'EMAIL')
        lead = Lead.objects.get(id=lead_id)

        follow_up = EmailFollowUp.objects.create(
            lead=lead,
            channel=channel,
            subject=f"Accelerating {lead.company_name}'s Enterprise Pipeline with SalesChamp",
            body=f"Hi {lead.contact_name},\n\nFollowing up on our recent enterprise alignment regarding your ERP/CRM integration priorities. We've prepared a customized architecture blueprint that eliminates manual entry between your systems.\n\nBest regards,\nSalesChamp AI Revenue Team",
            is_sent=True,
            open_status='OPENED',
            reply_status='PENDING'
        )
        return Response(self.get_serializer(follow_up).data, status=status.HTTP_201_CREATED)
