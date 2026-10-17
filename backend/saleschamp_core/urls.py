"""
URL Configuration for SalesChamp Enterprise Platform.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter

from apps.leads.views import LeadViewSet
from apps.proposals.views import ProposalViewSet
from apps.crm.views import CRMRecordViewSet, DeduplicationConflictViewSet
from apps.erp.views import SAPProductViewSet, SAPSalesOrderViewSet, SAPInvoiceViewSet
from apps.communications.views import VoiceCallLogViewSet, EmailFollowUpViewSet
from apps.analytics.views import AnalyticsViewSet
from apps.agents.views import AgentDefinitionViewSet, WorkflowExecutionViewSet
from apps.governance.views import ConnectorConfigViewSet, AuditLogViewSet

router = DefaultRouter()
router.register(r'leads', LeadViewSet, basename='lead')
router.register(r'proposals', ProposalViewSet, basename='proposal')
router.register(r'crm/records', CRMRecordViewSet, basename='crm-record')
router.register(r'crm/conflicts', DeduplicationConflictViewSet, basename='crm-conflict')
router.register(r'erp/products', SAPProductViewSet, basename='sap-product')
router.register(r'erp/orders', SAPSalesOrderViewSet, basename='sap-order')
router.register(r'erp/invoices', SAPInvoiceViewSet, basename='sap-invoice')
router.register(r'communications/calls', VoiceCallLogViewSet, basename='voice-call')
router.register(r'communications/followups', EmailFollowUpViewSet, basename='email-followup')
router.register(r'analytics/metrics', AnalyticsViewSet, basename='analytics-metric')
router.register(r'agents/fleet', AgentDefinitionViewSet, basename='agent-fleet')
router.register(r'agents/workflows', WorkflowExecutionViewSet, basename='workflow-execution')
router.register(r'governance/connectors', ConnectorConfigViewSet, basename='governance-connector')
router.register(r'governance/audit-logs', AuditLogViewSet, basename='governance-audit-log')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
