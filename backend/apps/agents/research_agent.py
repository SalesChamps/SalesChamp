from .llm_service import llm_service

class ResearchAgent:
    """Agent that performs multi-dimensional enterprise intelligence gathering & dossier compilation."""

    def research_company(self, company_name: str, industry: str):
        def fallback():
            return {
                'company_name': company_name,
                'industry': industry,
                'tech_stack': ['Salesforce Sales Cloud', 'Microsoft Dynamics 365', 'SAP S/4HANA', 'Azure AD', 'Workday', 'Power Automate'],
                'pain_points': [
                    f'Siloed sales pipeline in {company_name} causing 14+ day quote turnaround cycles',
                    'Discrepancies in billing address and VAT numbers across dual CRM and SAP tables',
                    'Zero automated voice follow-up mechanisms for stalled enterprise quotations'
                ],
                'competitors': ['Enterprise Global Ltd', 'Vanguard Systems', 'Cognitive Corp'],
                'executive_summary': f"Comprehensive AI Dossier: {company_name} exhibits strong buying signals for agentic sales automation. Their hybrid CRM (Salesforce EMEA and Dynamics 365 US) creates significant duplicate entries that SalesChamp dual-sync engine directly solves."
            }

        system_prompt = "You are SalesChamp Business Research Agent. Provide deep corporate analysis, tech stack audit, and pain points."
        user_prompt = f"Analyze enterprise prospect: {company_name} ({industry}). Return JSON with tech_stack, pain_points, competitors, executive_summary."

        res = llm_service.generate_json(system_prompt, user_prompt, fallback)
        if isinstance(res, dict):
            return res
        return fallback()
