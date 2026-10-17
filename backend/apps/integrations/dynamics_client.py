import uuid
import random

class Dynamics365Client:
    """Microsoft Dynamics 365 Sales Web API & Microsoft Dataverse Sandbox Emulator."""

    def __init__(self, tenant_id: str = None, client_id: str = None):
        self.tenant_id = tenant_id or f"tenant_{uuid.uuid4().hex[:8]}"
        self.endpoint_url = "https://org928a.crm4.dynamics.com/api/data/v9.2"

    def test_connection(self):
        return {
            'status': 'CONNECTED',
            'api_version': 'v9.2',
            'tenant_name': 'Acme Global EMEA (Microsoft 365 E5)',
            'latency_ms': random.randint(110, 160),
            'copilot_status': 'ENABLED'
        }

    def upsert_opportunity(self, opp_data: dict):
        dyn_id = opp_data.get('dyn_id') or f"dyn-opp-{uuid.uuid4().hex[:8]}"
        return {
            'success': True,
            'opportunity_id': dyn_id,
            'pipeline_stage': 'Proposal/Price Quote',
            'estimated_close': '2026-11-30'
        }
