from rest_framework import serializers
from .models import CRMRecord, DeduplicationConflict
from apps.leads.serializers import LeadSerializer

class DeduplicationConflictSerializer(serializers.ModelSerializer):
    lead_name = serializers.CharField(source='crm_record.lead.company_name', read_only=True)

    class Meta:
        model = DeduplicationConflict
        fields = '__all__'


class CRMRecordSerializer(serializers.ModelSerializer):
    lead_details = LeadSerializer(source='lead', read_only=True)
    conflicts = DeduplicationConflictSerializer(many=True, read_only=True)

    class Meta:
        model = CRMRecord
        fields = '__all__'
