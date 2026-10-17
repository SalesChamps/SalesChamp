from django.db import models
from apps.common.models import BaseModel
from apps.leads.models import Lead

class AgentDefinition(BaseModel):
    STATUS_CHOICES = [
        ('ACTIVE', 'Active / Ready'),
        ('RUNNING', 'Executing Task'),
        ('PAUSED', 'Paused'),
        ('DEGRADED', 'Degraded Latency'),
    ]

    agent_id = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=150)
    description = models.TextField(blank=True, default='')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='ACTIVE')
    latency_ms = models.IntegerField(default=120)
    tokens_processed = models.IntegerField(default=45000)
    success_rate = models.FloatField(default=99.2)
    current_task = models.CharField(max_length=255, blank=True, default='Standing by for trigger')

    class Meta:
        ordering = ['agent_id']

    def __str__(self):
        return f"{self.name} ({self.agent_id}) - {self.status}"


class WorkflowExecution(BaseModel):
    STATUS_CHOICES = [
        ('PENDING', 'Pending Orchestration'),
        ('RUNNING', 'Pipeline In Execution'),
        ('WAITING_APPROVAL', 'Paused for Human-in-the-Loop Review'),
        ('COMPLETED', 'Successfully Completed'),
        ('FAILED', 'Failed with Exception'),
    ]

    lead = models.ForeignKey(Lead, on_delete=models.SET_NULL, null=True, blank=True, related_name='executions')
    workflow_name = models.CharField(max_length=200, default='End-to-End Enterprise Sales Pipeline')
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='RUNNING')
    current_step = models.IntegerField(default=1)
    total_steps = models.IntegerField(default=8)
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    log_traces = models.JSONField(default=list, blank=True)

    class Meta:
        ordering = ['-started_at']

    def __str__(self):
        return f"Workflow {self.id} [{self.status}] Step {self.current_step}/{self.total_steps}"


class AgentExecutionStep(BaseModel):
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('RUNNING', 'Running'),
        ('SUCCESS', 'Success'),
        ('WARNING', 'Warning / Notice'),
        ('FAILED', 'Failed'),
    ]

    execution = models.ForeignKey(WorkflowExecution, on_delete=models.CASCADE, related_name='steps')
    step_number = models.IntegerField()
    agent_id = models.CharField(max_length=50)
    agent_name = models.CharField(max_length=100)
    action_title = models.CharField(max_length=255)
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default='PENDING')
    input_payload = models.JSONField(default=dict, blank=True)
    output_payload = models.JSONField(default=dict, blank=True)
    duration_ms = models.IntegerField(default=0)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['step_number']

    def __str__(self):
        return f"Step {self.step_number}: {self.agent_name} -> {self.action_title} [{self.status}]"
