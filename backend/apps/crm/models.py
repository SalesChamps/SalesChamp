from django.db import models
from apps.common.models import BaseModel
from apps.leads.models import Lead

class CRMRecord(BaseModel):
    SYNC_STATUS_CHOICES = [
        ('IN_SYNC', 'Synchronized'),
        ('SYNCING', 'Delta Sync In Progress'),
        ('CONFLICT', 'Field Discrepancy Conflict'),
        ('PENDING_RESOLVE', 'Pending Human Resolve'),
    ]

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='crm_records')
    sfdc_id = models.CharField(max_length=100, blank=True, default='')
    dyn_id = models.CharField(max_length=100, blank=True, default='')
    sfdc_status = models.CharField(max_length=50, default='Qualified Lead')
    dyn_status = models.CharField(max_length=50, default='Active Opportunity')
    sync_status = models.CharField(max_length=50, choices=SYNC_STATUS_CHOICES, default='IN_SYNC')
    sync_latency_ms = models.IntegerField(default=142)
    last_synced_at = models.DateTimeField(auto_now=True)
    last_payload = models.JSONField(default=dict, blank=True)

    class Meta:
        ordering = ['-updated_at']

    def __str__(self):
        return f"CRM [{self.lead.company_name}] SFDC:{self.sfdc_id or 'none'} | DYN:{self.dyn_id or 'none'}"


class DeduplicationConflict(BaseModel):
    STATUS_CHOICES = [
        ('UNRESOLVED', 'Awaiting Resolution'),
        ('RESOLVED', 'Resolved & Synced'),
        ('DISMISSED', 'Dismissed / False Positive'),
    ]

    crm_record = models.ForeignKey(CRMRecord, on_delete=models.CASCADE, related_name='conflicts')
    field_name = models.CharField(max_length=100)
    sfdc_value = models.CharField(max_length=255)
    dyn_value = models.CharField(max_length=255)
    ai_recommended_winner = models.CharField(max_length=50, default='SALESFORCE')
    ai_confidence_score = models.IntegerField(default=96)
    ai_reasoning = models.TextField(default='Salesforce activity logged 12m ago with verifiable verified email signature.')
    resolution_status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='UNRESOLVED')
    resolved_winner = models.CharField(max_length=50, blank=True, default='')
    resolved_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"Conflict on {self.field_name} for {self.crm_record.lead.company_name}"
