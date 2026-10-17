from rest_framework import serializers
from .models import VoiceCallLog, EmailFollowUp
from apps.leads.serializers import LeadSerializer

class VoiceCallLogSerializer(serializers.ModelSerializer):
    lead_details = LeadSerializer(source='lead', read_only=True)

    class Meta:
        model = VoiceCallLog
        fields = '__all__'


class EmailFollowUpSerializer(serializers.ModelSerializer):
    lead_details = LeadSerializer(source='lead', read_only=True)

    class Meta:
        model = EmailFollowUp
        fields = '__all__'
