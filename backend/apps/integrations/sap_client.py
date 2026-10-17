import uuid
import random

class SAPClient:
    """SAP Business Technology Platform (BTP) & S/4HANA OData API Sandbox Emulator."""

    def __init__(self, system_id: str = 'S4H', client_number: str = '100'):
        self.system_id = system_id
        self.client_number = client_number
        self.odata_base_url = "https://s4hana.enterprise.internal:44300/sap/opu/odata/sap"

    def test_connection(self):
        return {
            'status': 'ACTIVE',
            'system': 'SAP S/4HANA 2023 FPS02',
            'btp_integration_suite': 'ONLINE',
            'latency_ms': random.randint(80, 130),
            'active_destinations': ['API_SALES_ORDER_SRV', 'API_BUSINESS_PARTNER', 'API_PRODUCT_SRV']
        }

    def check_material_availability(self, material_id: str, plant: str = '1010'):
        return {
            'material': material_id,
            'plant': plant,
            'available_qty': random.randint(80, 240),
            'unit': 'EA',
            'is_available': True
        }
