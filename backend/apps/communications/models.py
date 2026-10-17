from django.db import models
from apps.common.models import BaseModel
from apps.leads.models import Lead

class VoiceCallLog(BaseModel):
    STATUS_CHOICES = [
        ('SCHEDULED', 'Scheduled'),
        ('IN_PROGRESS', 'Live Call Connected'),
        ('COMPLETED', 'Call Finished & Analyzed'),
        ('FAILED', 'Call Dropped / Unanswered'),
    ]

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='voice_calls')
    agent_name = models.CharField(max_length=100, default='Nova Voice-SDR')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='COMPLETED')
    duration_seconds = models.IntegerField(default=148)
    sentiment_score = models.IntegerField(default=84, help_text="Prospect sentiment 0-100")
    sentiment_label = models.CharField(max_length=50, default='High Buying Intent')
    key_takeaway = models.TextField(blank=True, default='')
    transcript_turns = models.JSONField(default=list, blank=True)
    audio_sample_url = models.CharField(max_length=255, blank=True, default='')
    crm_logged = models.BooleanField(default=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Call with {self.lead.company_name} - {self.duration_seconds}s ({self.sentiment_label})"


class EmailFollowUp(BaseModel):
    CHANNEL_CHOICES = [
        ('EMAIL', 'Executive Email Sequence'),
        ('WHATSAPP', 'WhatsApp Business API'),
        ('LINKEDIN', 'LinkedIn InMail'),
    ]

    lead = models.ForeignKey(Lead, on_delete=models.CASCADE, related_name='follow_ups')
    channel = models.CharField(max_length=50, choices=CHANNEL_CHOICES, default='EMAIL')
    subject = models.CharField(max_length=255)
    body = models.TextField()
    is_sent = models.BooleanField(default=True)
    sent_at = models.DateTimeField(auto_now_add=True)
    open_status = models.CharField(max_length=50, default='OPENED')
    reply_status = models.CharField(max_length=50, default='REPLIED_POSITIVE')

    class Meta:
        ordering = ['-sent_at']

    def __str__(self):
        return f"{self.channel} -> {self.lead.company_name}: {self.subject}"
