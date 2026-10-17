from django.db import models
from apps.common.models import BaseModel

class ConnectorConfig(BaseModel):
    CATEGORY_CHOICES = [
        ('CRM', 'Customer Relationship Management'),
        ('ERP', 'Enterprise Resource Planning'),
        ('AI_MODEL', 'Large Language Model Provider'),
        ('COMM', 'Voice & Omnichannel Communication'),
    ]

    STATUS_CHOICES = [
        ('CONNECTED', 'Connected & Healthy'),
        ('DEGRADED', 'High Latency / Warning'),
        ('DISCONNECTED', 'Disconnected / Credentials Required'),
    ]

    name = models.CharField(max_length=150)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='CRM')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='CONNECTED')
    endpoint_url = models.CharField(max_length=255, blank=True, default='')
    auth_type = models.CharField(max_length=50, default='OAuth 2.0 PKCE')
    latency_ms = models.IntegerField(default=115)
    last_health_check = models.DateTimeField(auto_now=True)
    credentials_masked = models.CharField(max_length=100, default='sk-live-••••••••••••4f29')
    sync_frequency = models.CharField(max_length=50, default='Real-time Webhook + 5m Polling')

    class Meta:
        ordering = ['name']

    def __str__(self):
        return f"{self.name} [{self.category}] - {self.status}"


class AuditLog(BaseModel):
    action = models.CharField(max_length=255)
    actor_name = models.CharField(max_length=150, default='AI Orchestrator (Manager Pod)')
    actor_role = models.CharField(max_length=100, default='System Autonomous Agent')
    target_resource = models.CharField(max_length=255)
    ip_address = models.CharField(max_length=50, default='10.240.0.12 (Internal VPC)')
    outcome = models.CharField(max_length=50, default='SUCCESS')
    details = models.JSONField(default=dict, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"[{self.outcome}] {self.action} by {self.actor_name} on {self.target_resource}"
