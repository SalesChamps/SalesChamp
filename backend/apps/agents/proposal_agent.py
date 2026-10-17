import random
from .llm_service import llm_service

class ProposalAgent:
    """Agent that performs Retrieval-Augmented Generation (RAG) to draft enterprise sales proposals."""

    def draft_proposal(self, lead):
        # Simulated RAG Knowledge Base Retrieval
        rag_knowledge_base = [
            {
                'document': 'SalesChamp Enterprise Architecture & Multi-Agent SLA Guide 2026.pdf',
                'relevance': 0.96,
                'snippet': 'Platform provides 99.9% uptime SLA for multi-agent workflows, sub-200ms bi-directional CRM delta synchronization, and SAP BTP enterprise certification.'
            },
            {
                'document': 'Global Pricing & Packaging Master Matrix FY25-26.xlsx',
                'relevance': 0.92,
                'snippet': 'Enterprise Tier Tier-A includes 8 dedicated agent pods, unlimited Salesforce and Dynamics 365 bidirectional sync, and full SAP S/4HANA OData connector suite.'
            },
            {
                'document': 'Dual CRM Interoperability Security & Deduplication Whitepaper.pdf',
                'relevance': 0.89,
                'snippet': 'Automated field merge rules eliminate 100% of conflicting contact and deal records while preserving sovereign compliance for regional teams.'
            }
        ]

        def fallback():
            return {
                'title': f"Enterprise Agentic Automation Proposal for {lead.company_name}",
                'total_amount': 165000.00,
                'executive_summary': f"This tailored proposal outlines the enterprise deployment of SalesChamp Multi-Agent Orchestration for {lead.company_name}. By bridging {lead.company_name}'s Salesforce and SAP ERP systems, the solution automates lead discovery, intelligent dossier synthesis, instant proposal RAG drafting, and quote-to-invoice synchronization.",
                'scope_of_work': f"Phase 1: Dual CRM Sync & Deduplication Hub activation between Salesforce and Dynamics 365.\nPhase 2: SAP S/4HANA OData inventory verification and automated sales order generation.\nPhase 3: Autonomous Voice SDR outreach and Human-in-the-Loop review console training.",
                'deliverables': [
                    {'title': 'Multi-Agent Workflow Orchestrator Studio Deployment', 'eta': 'Week 2', 'status': 'Pending Kickoff'},
                    {'title': 'Bi-Directional CRM Synchronization Engine', 'eta': 'Week 4', 'status': 'Architecture Ready'},
                    {'title': 'SAP ERP OData Quote-to-Cash Automation Connector', 'eta': 'Week 6', 'status': 'Architecture Ready'},
                    {'title': 'Enterprise SLA & RevOps Training Package', 'eta': 'Week 8', 'status': 'Scheduled'}
                ],
                'pricing_breakdown': [
                    {'item': 'SalesChamp Enterprise Multi-Agent Core Platform (Annual)', 'cost': 95000.00},
                    {'item': 'Dual CRM Bi-Directional Connector (Salesforce + Dynamics 365)', 'cost': 35000.00},
                    {'item': 'SAP S/4HANA ERP Connector & Order Automation Module', 'cost': 25000.00},
                    {'item': 'Dedicated Autonomous Voice SDR & Outbound Follow-up Engine', 'cost': 10000.00}
                ],
                'rag_sources': rag_knowledge_base
            }

        system_prompt = "You are SalesChamp Autonomous Proposal Agent. Draft high-level enterprise sales proposals using RAG context."
        user_prompt = f"Lead: {lead.company_name}, Industry: {lead.industry}, Pain Points: {lead.pain_points}. Knowledge: {rag_knowledge_base}. Return JSON with title, total_amount, executive_summary, scope_of_work, deliverables, pricing_breakdown, rag_sources."

        res = llm_service.generate_json(system_prompt, user_prompt, fallback)
        if isinstance(res, dict) and 'executive_summary' in res:
            res['rag_sources'] = rag_knowledge_base
            return res
        return fallback()
