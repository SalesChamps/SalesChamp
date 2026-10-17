from django.utils import timezone
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Proposal
from .serializers import ProposalSerializer
from apps.leads.models import Lead
from apps.agents.proposal_agent import ProposalAgent

class ProposalViewSet(viewsets.ModelViewSet):
    queryset = Proposal.objects.all()
    serializer_class = ProposalSerializer

    @action(detail=False, methods=['post'])
    def generate(self, request):
        """Generate a personalized proposal via RAG and ProposalAgent."""
        lead_id = request.data.get('lead_id')
        if not lead_id:
            return Response({'error': 'lead_id is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            lead = Lead.objects.get(id=lead_id)
        except Lead.DoesNotExist:
            return Response({'error': 'Lead not found'}, status=status.HTTP_404_NOT_FOUND)

        agent = ProposalAgent()
        proposal_data = agent.draft_proposal(lead)

        proposal = Proposal.objects.create(
            lead=lead,
            title=proposal_data['title'],
            total_amount=proposal_data['total_amount'],
            currency='USD',
            status='UNDER_REVIEW',
            executive_summary=proposal_data['executive_summary'],
            scope_of_work=proposal_data['scope_of_work'],
            deliverables=proposal_data['deliverables'],
            pricing_breakdown=proposal_data['pricing_breakdown'],
            rag_sources=proposal_data['rag_sources'],
        )
        lead.status = 'PROPOSAL_GENERATED'
        lead.save()

        return Response(self.get_serializer(proposal).data, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        """Human-in-the-Loop Approval for Proposal."""
        proposal = self.get_object()
        proposal.status = 'APPROVED'
        proposal.reviewed_at = timezone.now()
        proposal.reviewer_notes = request.data.get('reviewer_notes', 'Approved by RevOps Director for delivery.')
        proposal.save()

        # Update lead to qualified
        proposal.lead.status = 'QUALIFIED'
        proposal.lead.save()

        return Response({
            'status': 'success',
            'message': 'Proposal approved under HITL governance. Ready for multi-CRM sync and outbound delivery.',
            'proposal': self.get_serializer(proposal).data
        })

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        """Human-in-the-Loop Rejection / Revision Request."""
        proposal = self.get_object()
        proposal.status = 'REJECTED'
        proposal.reviewed_at = timezone.now()
        proposal.reviewer_notes = request.data.get('reviewer_notes', 'Requested pricing realignment.')
        proposal.save()
        return Response(self.get_serializer(proposal).data)
