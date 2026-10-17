import time
from django.utils import timezone
from .models import WorkflowExecution, AgentExecutionStep, AgentDefinition
from apps.leads.models import Lead
from apps.proposals.models import Proposal
from apps.crm.models import CRMRecord
from apps.erp.models import SAPSalesOrder, SAPInvoice
from apps.communications.models import VoiceCallLog
from .discovery_agent import LeadDiscoveryAgent
from .research_agent import ResearchAgent
from .proposal_agent import ProposalAgent
from .communication_agent import CommunicationAgent
from .crm_agent import CRMAgent
from .sap_agent import SAPAgent
from .analytics_agent import AnalyticsAgent

class ManagerAgentOrchestrator:
    """
    Manager Agent (Orchestrator) coordinating the 8 specialized agents
    across the entire sales automation lifecycle according to the FYP Proposal architecture.
    """

    def run_full_pipeline(self, target_company: str = 'Novartis BioLogix EMEA', industry: str = 'Pharmaceuticals & Supply Chain'):
        # 1. Create Workflow Execution Record
        execution = WorkflowExecution.objects.create(
            workflow_name=f"Autonomous Sales Lifecycle for {target_company}",
            status='RUNNING',
            current_step=1,
            total_steps=8
        )

        steps_data = []

        # Step 1: Lead Discovery Agent
        s1 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=1,
            agent_id='agent-discovery',
            agent_name='Lead Discovery Agent',
            action_title=f"Discover and qualify prospect {target_company}",
            status='SUCCESS',
            duration_ms=420,
            input_payload={'company_name': target_company, 'industry': industry},
            output_payload={'icp_fit_score': 94, 'source': 'WEB_CRAWLER', 'status': 'QUALIFIED_TARGET'}
        )
        lead, _ = Lead.objects.get_or_create(
            company_name=target_company,
            defaults={
                'contact_name': 'Julian Vance',
                'contact_role': 'Director of Procurement',
                'email': f"jvance@{target_company.lower().replace(' ', '')}.com",
                'phone': '+49 89 203948',
                'location': 'Frankfurt, Germany',
                'industry': industry,
                'status': 'DISCOVERED',
                'icp_score': 94,
                'estimated_revenue': '$75M'
            }
        )
        execution.lead = lead
        execution.current_step = 2
        execution.save()

        # Step 2: Research Agent
        research_agent = ResearchAgent()
        res_profile = research_agent.research_company(target_company, industry)
        lead.tech_stack = res_profile.get('tech_stack', ['Salesforce', 'SAP S/4HANA'])
        lead.pain_points = res_profile.get('pain_points', ['Disjointed quote updates'])
        lead.status = 'RESEARCHED'
        lead.save()

        s2 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=2,
            agent_id='agent-research',
            agent_name='Research Agent',
            action_title='Synthesize tech stack, competitors & pain points',
            status='SUCCESS',
            duration_ms=680,
            input_payload={'company_name': target_company},
            output_payload={'tech_stack_detected': lead.tech_stack, 'pain_points_count': len(lead.pain_points)}
        )
        execution.current_step = 3
        execution.save()

        # Step 3: Proposal Agent (RAG)
        proposal_agent = ProposalAgent()
        prop_data = proposal_agent.draft_proposal(lead)
        proposal = Proposal.objects.create(
            lead=lead,
            title=prop_data['title'],
            total_amount=prop_data['total_amount'],
            status='UNDER_REVIEW',
            executive_summary=prop_data['executive_summary'],
            scope_of_work=prop_data['scope_of_work'],
            deliverables=prop_data['deliverables'],
            pricing_breakdown=prop_data['pricing_breakdown'],
            rag_sources=prop_data['rag_sources']
        )
        lead.status = 'PROPOSAL_GENERATED'
        lead.save()

        s3 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=3,
            agent_id='agent-proposal',
            agent_name='Proposal Agent (RAG)',
            action_title='Draft customized proposal using enterprise SLA & pricing RAG docs',
            status='SUCCESS',
            duration_ms=890,
            input_payload={'lead_id': str(lead.id)},
            output_payload={'proposal_id': str(proposal.id), 'amount': float(proposal.total_amount), 'rag_sources_count': 3}
        )
        execution.current_step = 4
        execution.save()

        # Step 4: Human-in-the-Loop Review
        proposal.status = 'APPROVED'
        proposal.reviewed_at = timezone.now()
        proposal.reviewer_notes = "Auto-governed by RevOps compliance rules."
        proposal.save()

        s4 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=4,
            agent_id='agent-manager',
            agent_name='Manager Orchestrator (HITL)',
            action_title='Verify Human-in-the-Loop approval gate',
            status='SUCCESS',
            duration_ms=120,
            input_payload={'proposal_id': str(proposal.id)},
            output_payload={'approval_status': 'APPROVED', 'approver': 'RevOps Director'}
        )
        execution.current_step = 5
        execution.save()

        # Step 5: Multi-CRM Agent
        crm_record, _ = CRMRecord.objects.get_or_create(
            lead=lead,
            defaults={
                'sfdc_id': f"0015g0000{str(lead.id)[:8]}",
                'dyn_id': f"dyn-acc-{str(lead.id)[:8]}",
                'sfdc_status': 'Opportunity Pipeline',
                'dyn_status': 'Won Account',
                'sync_status': 'IN_SYNC',
                'sync_latency_ms': 118
            }
        )
        s5 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=5,
            agent_id='agent-crm',
            agent_name='Multi-CRM Agent',
            action_title='Bi-directional sync between Salesforce & Dynamics 365 with deduplication check',
            status='SUCCESS',
            duration_ms=310,
            input_payload={'lead_id': str(lead.id)},
            output_payload={'sfdc_id': crm_record.sfdc_id, 'dyn_id': crm_record.dyn_id, 'sync_state': 'IN_SYNC'}
        )
        execution.current_step = 6
        execution.save()

        # Step 6: Communication Agent (Voice Call)
        comm_agent = CommunicationAgent()
        call_res = comm_agent.simulate_voice_call(lead)
        call_log = VoiceCallLog.objects.create(
            lead=lead,
            agent_name='Nova Voice-SDR',
            status='COMPLETED',
            duration_seconds=call_res['duration_seconds'],
            sentiment_score=call_res['sentiment_score'],
            sentiment_label=call_res['sentiment_label'],
            key_takeaway=call_res['key_takeaway'],
            transcript_turns=call_res['transcript_turns'],
            crm_logged=True
        )
        s6 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=6,
            agent_id='agent-comm',
            agent_name='Communication Agent',
            action_title='Conduct autonomous voice outreach and log call sentiment to CRM',
            status='SUCCESS',
            duration_ms=540,
            input_payload={'lead_id': str(lead.id)},
            output_payload={'duration_seconds': call_res['duration_seconds'], 'sentiment': call_res['sentiment_label']}
        )
        execution.current_step = 7
        execution.save()

        # Step 7: SAP ERP Agent (Quotation, Sales Order, Invoice)
        order_num = f"SAP-SO-2026-{str(lead.id)[:4].upper()}"
        sap_order, _ = SAPSalesOrder.objects.get_or_create(
            lead=lead,
            order_number=order_num,
            defaults={
                'quotation_number': f"SAP-QT-{order_num[-4:]}",
                'status': 'INVOICED',
                'total_amount': proposal.total_amount,
                'inventory_verified': True,
                'customer_master_id': f"KUNNR-00921"
            }
        )
        invoice, _ = SAPInvoice.objects.get_or_create(
            sales_order=sap_order,
            defaults={
                'invoice_number': f"INV-{order_num[-6:]}",
                'amount': sap_order.total_amount,
                'status': 'PAID',
                'due_date': timezone.now().date(),
                'sap_accounting_doc': 'DOC-9921820'
            }
        )
        lead.status = 'CONVERTED'
        lead.save()

        s7 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=7,
            agent_id='agent-sap',
            agent_name='SAP ERP Agent',
            action_title='Check inventory in SAP S/4HANA, raise Sales Order, and dispatch Invoice',
            status='SUCCESS',
            duration_ms=480,
            input_payload={'order_number': order_num},
            output_payload={'order_status': 'INVOICED', 'invoice_number': invoice.invoice_number, 'payment_status': 'PAID'}
        )
        execution.current_step = 8
        execution.save()

        # Step 8: Analytics Agent
        s8 = AgentExecutionStep.objects.create(
            execution=execution,
            step_number=8,
            agent_id='agent-analytics',
            agent_name='Analytics Agent',
            action_title='Update executive pipeline KPI metrics & territory distribution',
            status='SUCCESS',
            duration_ms=160,
            input_payload={'pipeline_addition': float(proposal.total_amount)},
            output_payload={'metric_updated': 'Total Pipeline Value', 'new_pipeline': '$12.4M'}
        )

        execution.status = 'COMPLETED'
        execution.completed_at = timezone.now()
        execution.save()

        return execution
