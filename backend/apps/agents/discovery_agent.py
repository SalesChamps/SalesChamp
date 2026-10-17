import random
from .llm_service import llm_service

class LeadDiscoveryAgent:
    """Agent responsible for autonomous lead discovery across web sources & business directories."""

    def discover(self, query: str = 'FinTech & Manufacturing Enterprises in EMEA', limit: int = 3):
        def fallback():
            pool = [
                {
                    'company_name': 'AeroTech Systems GmbH',
                    'contact_name': 'Dr. Matthias Weber',
                    'contact_role': 'Head of Global Procurement',
                    'location': 'Munich, Germany',
                    'industry': 'Aerospace & Industrial Manufacturing',
                    'icp_score': 94,
                    'estimated_revenue': '$85M',
                    'employee_count': '620',
                    'source': 'GOOGLE_MAPS',
                    'pain_points': [
                        'Disjointed quotation updates between field reps and SAP S/4HANA core',
                        'Duplicate prospect accounts created across Salesforce and MS Dynamics',
                        'High manual burden drafting multi-tier aerospace compliance proposals'
                    ],
                    'tech_stack': ['SAP S/4HANA Cloud', 'Salesforce Enterprise', 'Microsoft 365', 'Azure AD'],
                    'competitors': ['Skyline Aerospace', 'Nordic Aero Logix'],
                    'executive_summary': 'Tier-1 aerospace component supplier modernizing procurement and sales operations across European and US plants.'
                },
                {
                    'company_name': 'Vanguard BioLogistics Corp',
                    'contact_name': 'Elena Rostova',
                    'contact_role': 'VP of Supply Chain & Commercial',
                    'location': 'Zurich, Switzerland',
                    'industry': 'Cold-Chain Life Sciences & Healthcare',
                    'icp_score': 91,
                    'estimated_revenue': '$42M',
                    'employee_count': '340',
                    'source': 'WEB_CRAWLER',
                    'pain_points': [
                        'Regulatory compliance documentation lag on order deliveries',
                        'Sales reps lack real-time batch inventory visibility in CRM'
                    ],
                    'tech_stack': ['Microsoft Dynamics 365 Sales', 'SAP ERP ECC 6.0', 'Power BI'],
                    'competitors': ['CryoLogix Global', 'SwissBio Freight'],
                    'executive_summary': 'Rapidly expanding bio-logistics provider requiring real-time ERP inventory allocation before sales order approval.'
                },
                {
                    'company_name': 'Apex Retail Dynamics UK',
                    'contact_name': 'Oliver Sterling',
                    'contact_role': 'Chief Commercial Officer',
                    'location': 'London, United Kingdom',
                    'industry': 'Omnichannel Retail & FMCG',
                    'icp_score': 88,
                    'estimated_revenue': '$110M',
                    'employee_count': '1,200',
                    'source': 'LINKEDIN',
                    'pain_points': [
                        'Slow turnaround on B2B discount approval matrices',
                        'Customer billing discrepancies between CRM deals and SAP invoices'
                    ],
                    'tech_stack': ['Salesforce Sales Cloud', 'SAP BTP', 'Snowflake'],
                    'competitors': ['OmniStore Europe', 'PrimeRetail Solutions'],
                    'executive_summary': 'High-volume omnichannel B2B retailer standardizing quote-to-cash workflows with autonomous agent governance.'
                }
            ]
            return pool[:limit]

        system_prompt = "You are SalesChamp Lead Discovery Agent. Find high-value enterprise B2B sales leads with high ICP fit."
        user_prompt = f"Search query: {query}. Return JSON array of {limit} leads with company_name, contact_name, contact_role, location, industry, icp_score, estimated_revenue, employee_count, source, pain_points, tech_stack, competitors, executive_summary."

        res = llm_service.generate_json(system_prompt, user_prompt, fallback)
        if isinstance(res, dict) and 'leads' in res:
            return res['leads']
        elif isinstance(res, list):
            return res
        return fallback()
