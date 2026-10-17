from django.test import TestCase
from apps.agents.models import AgentDefinition, WorkflowExecution
from apps.agents.orchestrator import ManagerAgentOrchestrator
from apps.leads.models import Lead
from apps.crm.models import CRMRecord
from apps.erp.models import SAPSalesOrder

class SalesChampBackendTest(TestCase):
    def setUp(self):
        AgentDefinition.objects.create(
            agent_id='agent-manager',
            name='Manager Orchestrator',
            role='Master Pipeline Supervisor',
            status='ACTIVE'
        )

    def test_pipeline_execution(self):
        orchestrator = ManagerAgentOrchestrator()
        execution = orchestrator.run_full_pipeline(
            target_company='Test Aerospace Ltd',
            industry='Industrial Manufacturing'
        )
        self.assertEqual(execution.status, 'COMPLETED')
        self.assertEqual(execution.steps.count(), 8)
        self.assertTrue(Lead.objects.filter(company_name='Test Aerospace Ltd').exists())
