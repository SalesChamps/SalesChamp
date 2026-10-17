from rest_framework import serializers
from .models import Proposal
from apps.leads.serializers import LeadSerializer

class ProposalSerializer(serializers.ModelSerializer):
    lead_details = LeadSerializer(source='lead', read_only=True)

    class Meta:
        model = Proposal
        fields = '__all__'
