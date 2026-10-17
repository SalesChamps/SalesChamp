import uuid
import random

class SalesforceClient:
    """Salesforce REST API and Apex Webhook Client / Enterprise Sandbox Emulator."""

    def __init__(self, instance_url: str = 'https://na134.salesforce.com', access_token: str = None):
        self.instance_url = instance_url
        self.access_token = access_token or f"sfdc_token_{uuid.uuid4().hex[:16]}"

    def test_connection(self):
        return {
            'status': 'CONNECTED',
            'api_version': 'v59.0',
            'org_id': '00D5g000004kL89EAE',
            'latency_ms': random.randint(90, 140),
            'org_edition': 'Enterprise Edition'
        }

    def upsert_lead(self, lead_data: dict):
        sfdc_id = lead_data.get('sfdc_id') or f"00Q5g0000{uuid.uuid4().hex[:8]}"
        return {
            'success': True,
            'id': sfdc_id,
            'action': 'UPDATED' if lead_data.get('sfdc_id') else 'CREATED',
            'errors': []
        }
