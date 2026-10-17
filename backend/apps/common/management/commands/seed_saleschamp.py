from datetime import date, timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from apps.agents.models import AgentDefinition, WorkflowExecution, AgentExecutionStep
from apps.leads.models import Lead
from apps.proposals.models import Proposal
from apps.crm.models import CRMRecord, DeduplicationConflict
from apps.erp.models import SAPProduct, SAPSalesOrder, SAPInvoice
from apps.communications.models import VoiceCallLog, EmailFollowUp
from apps.analytics.models import AnalyticsMetric
from apps.governance.models import ConnectorConfig, AuditLog

class Command(BaseCommand):
    help = 'Seeds SalesChamp with rich multi-enterprise demo data matching the UI prototypes'

    def handle(self, *args, **options):
        self.stdout.write(self.style.NOTICE("Seeding SalesChamp Enterprise Demo Data..."))

        # 1. Seed Agent Fleet (8 Specialized Agents + Manager Orchestrator)
        AgentDefinition.objects.all().delete()
        agents_data = [
            {
                'agent_id': 'agent-manager',
                'name': 'Manager Orchestrator Agent',
                'role': 'Master Pipeline Supervisor & HITL Policy Dispatcher',
                'description': 'Receives tasks, schedules agent handoffs, evaluates thresholds, and routes sensitive quotations for human sign-off.',
                'status': 'ACTIVE',
                'latency_ms': 118,
                'tokens_processed': 142000,
                'success_rate': 99.8,
                'current_task': 'Monitoring active enterprise pipelines'
            },
            {
                'agent_id': 'agent-discovery',
                'name': 'Lead Discovery Agent',
                'role': 'Autonomous B2B Prospecting & ICP Scoring Engine',
                'description': 'Identifies high-propensity accounts across Google Maps, LinkedIn, and corporate directories.',
                'status': 'ACTIVE',
                'latency_ms': 340,
                'tokens_processed': 98500,
                'success_rate': 98.4,
                'current_task': 'Scanning Tier-1 EMEA BioTech firms'
            },
            {
                'agent_id': 'agent-research',
                'name': 'Business Research Agent',
                'role': 'Deep Corporate Profiler & Pain-Point Extractor',
                'description': 'Synthesizes digital footprint, tech stack audit, competitor positioning, and organizational challenges.',
                'status': 'ACTIVE',
                'latency_ms': 620,
                'tokens_processed': 214000,
                'success_rate': 99.1,
                'current_task': 'Auditing ERP version topologies'
            },
            {
                'agent_id': 'agent-proposal',
                'name': 'Autonomous Proposal Agent',
                'role': 'RAG Knowledge Synthesis & SOW Generator',
                'description': 'Constructs customized proposals with deliverables, pricing matrices, and SLA citations from knowledge vaults.',
                'status': 'ACTIVE',
                'latency_ms': 780,
                'tokens_processed': 389000,
                'success_rate': 97.9,
                'current_task': 'Drafting SOW for AeroTech Systems'
            },
            {
                'agent_id': 'agent-comm',
                'name': 'Communication Agent',
                'role': 'Autonomous Voice SDR & Omnichannel Dispatcher',
                'description': 'Places synthetic conversational phone calls, gauges buyer sentiment, and coordinates follow-up cadence.',
                'status': 'ACTIVE',
                'latency_ms': 450,
                'tokens_processed': 167000,
                'success_rate': 98.6,
                'current_task': 'Voice queue monitoring active'
            },
            {
                'agent_id': 'agent-crm',
                'name': 'Multi-CRM Interoperability Agent',
                'role': 'Salesforce & Dynamics 365 Bi-Directional Sync & Dedup',
                'description': 'Reconciles pipeline deltas, resolves duplicate contact cards, and standardizes multi-cloud field topologies.',
                'status': 'ACTIVE',
                'latency_ms': 134,
                'tokens_processed': 312000,
                'success_rate': 99.9,
                'current_task': 'Listening to Salesforce CDC webhooks'
            },
            {
                'agent_id': 'agent-sap',
                'name': 'SAP ERP Fulfillment Agent',
                'role': 'S/4HANA OData Order, Inventory & Invoice Desk',
                'description': 'Verifies warehouse stock, creates SAP customer masters, generates formal quotations, and raises invoices.',
                'status': 'ACTIVE',
                'latency_ms': 195,
                'tokens_processed': 184000,
                'success_rate': 99.5,
                'current_task': 'Checking plant inventory allocations'
            },
            {
                'agent_id': 'agent-analytics',
                'name': 'Executive Analytics Agent',
                'role': 'Revenue Forecasting & Natural Language Query Copilot',
                'description': 'Continuously updates executive boards, computes win-rates, and answers leadership revenue inquiries.',
                'status': 'ACTIVE',
                'latency_ms': 110,
                'tokens_processed': 122000,
                'success_rate': 100.0,
                'current_task': 'Aggregating Q3 FY25 forecast velocity'
            }
        ]
        for a in agents_data:
            AgentDefinition.objects.create(**a)

        # 2. Seed Leads with Enriched Dossiers
        Lead.objects.all().delete()
        leads_data = [
            {
                'company_name': 'AeroTech Systems GmbH',
                'contact_name': 'Dr. Matthias Weber',
                'contact_role': 'Head of Global Procurement',
                'email': 'm.weber@aerotech-systems.de',
                'phone': '+49 89 450912',
                'location': 'Munich, Germany',
                'industry': 'Aerospace & Industrial Manufacturing',
                'website': 'https://www.aerotech-systems.de',
                'source': 'GOOGLE_MAPS',
                'status': 'PROPOSAL_GENERATED',
                'icp_score': 96,
                'estimated_revenue': '$85M - $120M',
                'employee_count': '620',
                'target_crm': 'DUAL_SYNC',
                'pain_points': [
                    'Quotation turnaround takes 16 days due to manual checks in SAP ERP',
                    'Sales reps maintain duplicate contact spreadsheets outside of Salesforce',
                    'Aerospace compliance specs require complex custom proposal appendices'
                ],
                'tech_stack': ['SAP S/4HANA Cloud', 'Salesforce Sales Cloud Enterprise', 'Microsoft 365', 'Azure AD'],
                'competitors': ['Skyline Aerospace', 'Nordic Aero Logix', 'Eurasia Machining'],
                'executive_summary': 'Tier-1 European aerospace precision component supplier looking to eliminate quoting latency between regional sales offices and central SAP manufacturing plants.'
            },
            {
                'company_name': 'Vanguard BioLogistics Corp',
                'contact_name': 'Elena Rostova',
                'contact_role': 'VP of Supply Chain & Commercial',
                'email': 'e.rostova@vanguardbio.ch',
                'phone': '+41 44 892 1044',
                'location': 'Zurich, Switzerland',
                'industry': 'Cold-Chain Life Sciences & Healthcare',
                'website': 'https://www.vanguardbio.ch',
                'source': 'WEB_CRAWLER',
                'status': 'QUALIFIED',
                'icp_score': 92,
                'estimated_revenue': '$45M - $60M',
                'employee_count': '340',
                'target_crm': 'DUAL_SYNC',
                'pain_points': [
                    'Strict cold-chain temperature SLA validation before booking sales orders',
                    'Sales pipeline tracked in Dynamics 365 while ERP orders execute in SAP'
                ],
                'tech_stack': ['Microsoft Dynamics 365 Sales', 'SAP ERP ECC 6.0', 'Power BI'],
                'competitors': ['CryoLogix Global', 'SwissBio Freight'],
                'executive_summary': 'Fast-growing clinical logistics provider needing automated inventory validation before sales contracts are signed.'
            },
            {
                'company_name': 'Apex Retail Dynamics UK',
                'contact_name': 'Oliver Sterling',
                'contact_role': 'Chief Commercial Officer',
                'email': 'oliver.sterling@apexretail.co.uk',
                'phone': '+44 20 7946 0192',
                'location': 'London, United Kingdom',
                'industry': 'Omnichannel Retail & FMCG',
                'website': 'https://www.apexretail.co.uk',
                'source': 'LINKEDIN',
                'status': 'CONVERTED',
                'icp_score': 89,
                'estimated_revenue': '$110M - $150M',
                'employee_count': '1,200',
                'target_crm': 'DUAL_SYNC',
                'pain_points': [
                    'Discounts applied in Salesforce do not match price schedules in SAP BTP',
                    'Lack of follow-up on quiet quotes over $50k value'
                ],
                'tech_stack': ['Salesforce Enterprise', 'SAP BTP', 'Snowflake', 'Workday'],
                'competitors': ['OmniStore Europe', 'PrimeRetail Solutions'],
                'executive_summary': 'Omnichannel consumer goods distributor standardizing multi-cloud revenue operations and automated voice follow-ups.'
            },
            {
                'company_name': 'Helios Power Grid Solutions',
                'contact_name': 'Marcus Vance',
                'contact_role': 'Managing Director',
                'email': 'm.vance@heliosgrid.com',
                'phone': '+1 (415) 890-2104',
                'location': 'San Francisco, CA, USA',
                'industry': 'Renewable Energy & Smart Grids',
                'website': 'https://www.heliosgrid.com',
                'source': 'DIRECTORY',
                'status': 'DISCOVERED',
                'icp_score': 87,
                'estimated_revenue': '$65M',
                'employee_count': '480',
                'target_crm': 'SALESFORCE',
                'pain_points': [
                    'Complex grid equipment quotes require multi-engineer signoffs',
                    'Zero AI scoring on inbound tender inquiries'
                ],
                'tech_stack': ['Salesforce Sales Cloud', 'Oracle NetSuite', 'Jira Service Desk'],
                'competitors': ['NextEra Technologies', 'VoltEdge Smart Energy'],
                'executive_summary': 'High-growth renewable grid infrastructure firm upgrading outbound sales automation.'
            }
        ]

        created_leads = []
        for ld in leads_data:
            l = Lead.objects.create(**ld)
            created_leads.append(l)

        # 3. Seed Proposals
        Proposal.objects.all().delete()
        lead_aero = created_leads[0]
        lead_vanguard = created_leads[1]
        lead_apex = created_leads[2]

        p1 = Proposal.objects.create(
            lead=lead_aero,
            title=f"Enterprise Multi-Agent Sales & ERP Orchestration Blueprint for {lead_aero.company_name}",
            status='UNDER_REVIEW',
            total_amount=165000.00,
            currency='USD',
            version='v1.2',
            executive_summary=f"SalesChamp proposes deploying a dedicated 8-agent swarm to integrate {lead_aero.company_name}'s Salesforce instance directly with SAP S/4HANA. The solution eliminates manual quote creation, validates material stock automatically, and slashes average cycle time from 16 days to 3.8 days.",
            scope_of_work="1. Bi-directional CRM sync between Salesforce and Dynamics 365.\n2. SAP S/4HANA OData connector setup for automated quotation and invoice generation.\n3. Autonomous Voice SDR configuration with customized conversational scripts.",
            deliverables=[
                {'title': 'Multi-Agent Workflow Orchestrator Studio Deployment', 'eta': 'Week 2', 'status': 'Pending Approval'},
                {'title': 'SAP S/4HANA Quote-to-Invoice Automated Connector', 'eta': 'Week 4', 'status': 'Architecture Ready'},
                {'title': 'Dual CRM Interoperability & Deduplication Rules Engine', 'eta': 'Week 6', 'status': 'Architecture Ready'},
                {'title': 'Enterprise SLA & RevOps Training Package', 'eta': 'Week 8', 'status': 'Scheduled'}
            ],
            pricing_breakdown=[
                {'item': 'SalesChamp Enterprise Multi-Agent Core Platform (Annual)', 'cost': 95000.00},
                {'item': 'Dual CRM Bi-Directional Connector (Salesforce + Dynamics 365)', 'cost': 35000.00},
                {'item': 'SAP S/4HANA ERP Connector & Order Automation Module', 'cost': 25000.00},
                {'item': 'Dedicated Autonomous Voice SDR & Outbound Follow-up Engine', 'cost': 10000.00}
            ],
            rag_sources=[
                {'document': 'SalesChamp Enterprise Architecture & Multi-Agent SLA Guide 2026.pdf', 'relevance': 0.96, 'snippet': 'Sub-200ms delta sync, 99.9% uptime SLA, SAP BTP certified.'},
                {'document': 'Global Pricing & Packaging Master Matrix FY25-26.xlsx', 'relevance': 0.92, 'snippet': 'Enterprise Tier Tier-A includes 8 dedicated agent pods.'},
                {'document': 'Dual CRM Interoperability Security & Deduplication Whitepaper.pdf', 'relevance': 0.89, 'snippet': 'Automated field merge rules eliminate 100% of conflicting contact cards.'}
            ],
            reviewed_by='E. Vance (RevOps Dir)',
            reviewer_notes='Requires quick confirmation on European data sovereignty before final dispatch.'
        )

        p2 = Proposal.objects.create(
            lead=lead_vanguard,
            title=f"Automated Cold-Chain Quote & Order Fulfillment for {lead_vanguard.company_name}",
            status='APPROVED',
            total_amount=120000.00,
            currency='USD',
            version='v1.0',
            executive_summary=f"Automates quote-to-order pipeline for {lead_vanguard.company_name}. Integrates Dynamics 365 deals directly with SAP S/4HANA cold storage inventory checks.",
            scope_of_work="End-to-end integration of Dynamics 365 opportunity close triggers with SAP material batch allocation.",
            deliverables=[
                {'title': 'Dynamics 365 - SAP S/4HANA Bridge', 'eta': 'Week 3', 'status': 'Delivered'},
                {'title': 'Autonomous Voice Follow-up Pod', 'eta': 'Week 5', 'status': 'Active'}
            ],
            pricing_breakdown=[
                {'item': 'SalesChamp Platform License', 'cost': 80000.00},
                {'item': 'SAP Inventory Sync Connector', 'cost': 25000.00},
                {'item': 'Omnichannel Communications Pack', 'cost': 15000.00}
            ],
            rag_sources=[
                {'document': 'Life Sciences Cold-Chain SLA Standards.pdf', 'relevance': 0.94, 'snippet': 'Batch verification required prior to PO issuance.'}
            ],
            reviewed_by='E. Vance (RevOps Dir)',
            reviewer_notes='Approved under fast-track enterprise governance.',
            reviewed_at=timezone.now() - timedelta(days=2)
        )

        # 4. Seed CRM Records & Deduplication Conflicts
        CRMRecord.objects.all().delete()
        DeduplicationConflict.objects.all().delete()

        crm1 = CRMRecord.objects.create(
            lead=lead_aero,
            sfdc_id='0015g00003kL49AEAE',
            dyn_id='dyn-acc-8921-aero',
            sfdc_status='Proposal/Price Quote',
            dyn_status='Strategic Opportunity (Stage 3)',
            sync_status='CONFLICT',
            sync_latency_ms=138
        )

        DeduplicationConflict.objects.create(
            crm_record=crm1,
            field_name='Annual Revenue Estimate',
            sfdc_value='$85,000,000',
            dyn_value='$120,000,000',
            ai_recommended_winner='SALESFORCE',
            ai_confidence_score=94,
            ai_reasoning='Salesforce record refreshed 14m ago from audited European corporate registry filing.',
            resolution_status='UNRESOLVED'
        )

        DeduplicationConflict.objects.create(
            crm_record=crm1,
            field_name='Primary Billing Country',
            sfdc_value='Germany (DE)',
            dyn_value='Federal Republic of Germany',
            ai_recommended_winner='DYNAMICS_365',
            ai_confidence_score=98,
            ai_reasoning='Dynamics 365 conforms to ISO-3166 ERP naming standard for SAP tax calculation.',
            resolution_status='UNRESOLVED'
        )

        crm2 = CRMRecord.objects.create(
            lead=lead_vanguard,
            sfdc_id='0015g00008xP12AEAE',
            dyn_id='dyn-acc-4412-vanguard',
            sfdc_status='Negotiation / Review',
            dyn_status='Closing Soon',
            sync_status='IN_SYNC',
            sync_latency_ms=112
        )

        crm3 = CRMRecord.objects.create(
            lead=lead_apex,
            sfdc_id='0015g00009mN55AEAE',
            dyn_id='dyn-acc-9921-apex',
            sfdc_status='Closed Won',
            dyn_status='Active Customer',
            sync_status='IN_SYNC',
            sync_latency_ms=98
        )

        # 5. Seed SAP ERP Products, Orders & Invoices
        SAPProduct.objects.all().delete()
        SAPSalesOrder.objects.all().delete()
        SAPInvoice.objects.all().delete()

        products_data = [
            {'sku': 'SAP-MAT-1001', 'name': 'SalesChamp Enterprise Multi-Agent Suite', 'unit_price': 95000.00, 'stock_quantity': 500, 'allocated_quantity': 18, 'category': 'Cloud Software Core'},
            {'sku': 'SAP-MAT-2002', 'name': 'Dual CRM Interoperability Connector Module', 'unit_price': 35000.00, 'stock_quantity': 250, 'allocated_quantity': 12, 'category': 'Integration Middleware'},
            {'sku': 'SAP-MAT-3003', 'name': 'SAP S/4HANA OData Fulfillment Bridge', 'unit_price': 25000.00, 'stock_quantity': 100, 'allocated_quantity': 8, 'category': 'ERP Connector'},
            {'sku': 'SAP-MAT-4004', 'name': 'Autonomous Voice SDR Telecom Voice Pack', 'unit_price': 10000.00, 'stock_quantity': 1000, 'allocated_quantity': 45, 'category': 'Voice Services'},
        ]
        for p in products_data:
            SAPProduct.objects.create(**p)

        order1 = SAPSalesOrder.objects.create(
            lead=lead_aero,
            order_number='SAP-SO-90218',
            quotation_number='SAP-QT-4421',
            status='INVENTORY_CHECKED',
            total_amount=165000.00,
            currency='USD',
            inventory_verified=True,
            customer_master_id='KUNNR-00892',
            delivery_date=date.today() + timedelta(days=14),
            items=[
                {'sku': 'SAP-MAT-1001', 'name': 'SalesChamp Enterprise Core', 'qty': 1, 'unit_price': 95000.00},
                {'sku': 'SAP-MAT-2002', 'name': 'Dual CRM Connector', 'qty': 1, 'unit_price': 35000.00},
                {'sku': 'SAP-MAT-3003', 'name': 'SAP S/4HANA Bridge', 'qty': 1, 'unit_price': 25000.00},
                {'sku': 'SAP-MAT-4004', 'name': 'Autonomous Voice SDR', 'qty': 1, 'unit_price': 10000.00}
            ]
        )

        order2 = SAPSalesOrder.objects.create(
            lead=lead_apex,
            order_number='SAP-SO-81042',
            quotation_number='SAP-QT-3810',
            status='PAYMENT_CONFIRMED',
            total_amount=145000.00,
            currency='USD',
            inventory_verified=True,
            customer_master_id='KUNNR-00511',
            delivery_date=date.today() - timedelta(days=5),
            items=[
                {'sku': 'SAP-MAT-1001', 'name': 'SalesChamp Enterprise Core', 'qty': 1, 'unit_price': 95000.00},
                {'sku': 'SAP-MAT-2002', 'name': 'Dual CRM Connector', 'qty': 1, 'unit_price': 35000.00},
                {'sku': 'SAP-MAT-4004', 'name': 'Autonomous Voice SDR', 'qty': 1, 'unit_price': 15000.00}
            ]
        )

        SAPInvoice.objects.create(
            sales_order=order2,
            invoice_number='SAP-INV-2026-081042',
            amount=145000.00,
            currency='USD',
            status='PAID',
            due_date=date.today() + timedelta(days=25),
            paid_at=timezone.now() - timedelta(days=1),
            sap_accounting_doc='SAP-ACC-DOC-992144'
        )

        # 6. Seed Voice Calls & Follow-ups
        VoiceCallLog.objects.all().delete()
        EmailFollowUp.objects.all().delete()

        VoiceCallLog.objects.create(
            lead=lead_aero,
            agent_name='Nova Voice-SDR',
            status='COMPLETED',
            duration_seconds=142,
            sentiment_score=92,
            sentiment_label='High Buying Intent',
            key_takeaway='Prospect confirmed quoting friction in SAP and requested immediate technical proposal sent to European IT steering committee.',
            crm_logged=True,
            transcript_turns=[
                {'speaker': 'Nova Voice-SDR', 'timestamp': '00:03', 'text': 'Hello, am I speaking with Dr. Matthias Weber at AeroTech Systems?'},
                {'speaker': 'Dr. Matthias Weber', 'timestamp': '00:07', 'text': 'Yes, speaking. How can I assist you?'},
                {'speaker': 'Nova Voice-SDR', 'timestamp': '00:12', 'text': 'I am calling from SalesChamp regarding your dual Salesforce and SAP ERP integration roadmap. Our agentic platform automates quoting and syncs records seamlessly.'},
                {'speaker': 'Dr. Matthias Weber', 'timestamp': '00:24', 'text': 'That is actually our number one priority this quarter. Can you send through the technical architecture specifications?'},
                {'speaker': 'Nova Voice-SDR', 'timestamp': '00:35', 'text': 'Absolutely. I will dispatch our verified enterprise proposal directly to your inbox now.'}
            ]
        )

        EmailFollowUp.objects.create(
            lead=lead_aero,
            channel='EMAIL',
            subject='AeroTech Systems - SalesChamp Architecture Blueprint & Proposal',
            body='Dr. Weber, thank you for speaking with our Voice SDR today. Attached please find the customized architecture proposal.',
            is_sent=True,
            open_status='OPENED',
            reply_status='REPLIED_POSITIVE'
        )

        # 7. Seed Analytics Metrics (Matching Prototype KPI Cards)
        AnalyticsMetric.objects.all().delete()
        AnalyticsMetric.objects.create(
            metric_key='total_pipeline_value',
            title='Total Pipeline Value',
            value_display='$12.4M',
            change_percentage='+18.4%',
            trend_direction='up',
            period='Q3 FY25',
            breakdown={'sfdc_value': '$7.1M', 'dynamics_value': '$5.3M', 'sfdc_pct': '57.2%', 'dyn_pct': '42.8%'}
        )
        AnalyticsMetric.objects.create(
            metric_key='lead_velocity',
            title='Autonomous Lead Velocity',
            value_display='4.2 days',
            change_percentage='-32.1%',
            trend_direction='down',
            period='Q3 FY25',
            breakdown={'discovery_to_proposal': '1.2 days', 'proposal_to_close': '3.0 days'}
        )
        AnalyticsMetric.objects.create(
            metric_key='win_rate',
            title='Win Rate (Agent-Assisted)',
            value_display='68.5%',
            change_percentage='+14.2%',
            trend_direction='up',
            period='Q3 FY25',
            breakdown={'ai_assisted': '68.5%', 'manual_baseline': '44.0%'}
        )
        AnalyticsMetric.objects.create(
            metric_key='sync_health',
            title='Dual-CRM Delta Sync Health',
            value_display='99.98%',
            change_percentage='134ms',
            trend_direction='up',
            period='Real-time',
            breakdown={'salesforce_health': '100%', 'dynamics_health': '100%', 'sap_health': '100%'}
        )

        # 8. Seed Governance Connectors & Audit Logs
        ConnectorConfig.objects.all().delete()
        AuditLog.objects.all().delete()

        connectors = [
            {'name': 'Salesforce Sales Cloud Enterprise', 'category': 'CRM', 'status': 'CONNECTED', 'endpoint_url': 'https://na134.salesforce.com/services/data/v59.0', 'latency_ms': 118},
            {'name': 'Microsoft Dynamics 365 Sales', 'category': 'CRM', 'status': 'CONNECTED', 'endpoint_url': 'https://org928a.crm4.dynamics.com/api/data/v9.2', 'latency_ms': 136},
            {'name': 'SAP S/4HANA 2023 / BTP', 'category': 'ERP', 'status': 'CONNECTED', 'endpoint_url': 'https://s4hana.enterprise.internal/sap/opu/odata/sap', 'latency_ms': 105},
            {'name': 'Google Gemini 1.5 Pro Engine', 'category': 'AI_MODEL', 'status': 'CONNECTED', 'endpoint_url': 'https://generativelanguage.googleapis.com', 'latency_ms': 220},
            {'name': 'OpenAI GPT-4o Agent Engine', 'category': 'AI_MODEL', 'status': 'CONNECTED', 'endpoint_url': 'https://api.openai.com/v1', 'latency_ms': 280},
        ]
        for c in connectors:
            ConnectorConfig.objects.create(**c)

        AuditLog.objects.create(
            action='PROPOSAL_APPROVED_HITL',
            actor_name='E. Vance',
            actor_role='RevOps Director',
            target_resource='Proposal: Vanguard BioLogistics Corp ($120k)',
            outcome='SUCCESS',
            details={'governance_check': 'PASSED', 'compliance_rule': 'SLA-101'}
        )
        AuditLog.objects.create(
            action='CRM_DEDUPLICATION_AUTORESOLVE',
            actor_name='Multi-CRM Agent Pod 3',
            actor_role='Autonomous Agent',
            target_resource='Lead: AeroTech Systems GmbH',
            outcome='SUCCESS',
            details={'field': 'Tax ID', 'winner': 'SAP Standard'}
        )

        self.stdout.write(self.style.SUCCESS("SalesChamp Enterprise Demo Data Successfully Seeded!"))
