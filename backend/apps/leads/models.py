from django.db import models
from apps.common.models import BaseModel

class Lead(BaseModel):
    STATUS_CHOICES = [
        ('DISCOVERED', 'Discovered'),
        ('RESEARCHED', 'Researched'),
        ('PROPOSAL_GENERATED', 'Proposal Generated'),
        ('QUALIFIED', 'Qualified'),
        ('OPPORTUNITY', 'Opportunity Created'),
        ('CONVERTED', 'Converted to Customer'),
        ('ARCHIVED', 'Archived'),
    ]

    SOURCE_CHOICES = [
        ('GOOGLE_MAPS', 'Google Maps API'),
        ('LINKEDIN', 'LinkedIn Enterprise'),
        ('DIRECTORY', 'Public Business Directory'),
        ('WEB_CRAWLER', 'Autonomous Web Crawler'),
    ]

    company_name = models.CharField(max_length=255)
    contact_name = models.CharField(max_length=255, blank=True, default='')
    contact_role = models.CharField(max_length=150, blank=True, default='Director of Procurement')
    email = models.EmailField(blank=True, default='')
    phone = models.CharField(max_length=50, blank=True, default='')
    location = models.CharField(max_length=255, blank=True, default='')
    industry = models.CharField(max_length=150, blank=True, default='Enterprise Software')
    website = models.URLField(blank=True, default='')
    source = models.CharField(max_length=50, choices=SOURCE_CHOICES, default='WEB_CRAWLER')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='DISCOVERED')
    icp_score = models.IntegerField(default=85, help_text="Ideal Customer Profile fit score (0-100)")
    estimated_revenue = models.CharField(max_length=100, blank=True, default='$25M - $50M')
    employee_count = models.CharField(max_length=100, blank=True, default='250 - 500')
    target_crm = models.CharField(max_length=50, default='DUAL_SYNC', help_text="SALESFORCE, DYNAMICS, or DUAL_SYNC")
    
    # AI Enrichment Dossier data
    pain_points = models.JSONField(default=list, blank=True)
    tech_stack = models.JSONField(default=list, blank=True)
    competitors = models.JSONField(default=list, blank=True)
    executive_summary = models.TextField(blank=True, default='')
    notes = models.TextField(blank=True, default='')
    last_contacted_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.company_name} ({self.contact_name or 'N/A'}) - {self.icp_score}% ICP"
