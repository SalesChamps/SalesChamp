from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Lead
from .serializers import LeadSerializer
from apps.agents.discovery_agent import LeadDiscoveryAgent
from apps.agents.research_agent import ResearchAgent

class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    @action(detail=False, methods=['post'])
    def discover(self, request):
        """Trigger autonomous lead discovery via AI agent."""
        query = request.data.get('query', 'FinTech & Manufacturing Enterprises in EMEA')
        limit = int(request.data.get('limit', 3))
        agent = LeadDiscoveryAgent()
        discovered_leads = agent.discover(query=query, limit=limit)
        
        created_instances = []
        for item in discovered_leads:
            lead = Lead.objects.create(
                company_name=item.get('company_name'),
                contact_name=item.get('contact_name', 'Executive Lead'),
                contact_role=item.get('contact_role', 'VP of Operations'),
                email=item.get('email', f"contact@{item.get('company_name', 'domain').lower().replace(' ', '')}.com"),
                phone=item.get('phone', '+1 (555) 019-2834'),
                location=item.get('location', 'Global'),
                industry=item.get('industry', 'Enterprise Technology'),
                website=item.get('website', f"https://www.{item.get('company_name', 'domain').lower().replace(' ', '')}.com"),
                source=item.get('source', 'WEB_CRAWLER'),
                status='DISCOVERED',
                icp_score=item.get('icp_score', 88),
                estimated_revenue=item.get('estimated_revenue', '$40M'),
                employee_count=item.get('employee_count', '300'),
                pain_points=item.get('pain_points', []),
                tech_stack=item.get('tech_stack', []),
                competitors=item.get('competitors', []),
                executive_summary=item.get('executive_summary', ''),
            )
            created_instances.append(lead)
            
        serializer = self.get_serializer(created_instances, many=True)
        return Response({
            'status': 'success',
            'count': len(created_instances),
            'leads': serializer.data
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['post'])
    def research(self, request, pk=None):
        """Enrich a lead using the Research Agent."""
        lead = self.get_object()
        agent = ResearchAgent()
        enrichment = agent.research_company(lead.company_name, lead.industry)
        
        lead.tech_stack = enrichment.get('tech_stack', lead.tech_stack)
        lead.pain_points = enrichment.get('pain_points', lead.pain_points)
        lead.competitors = enrichment.get('competitors', lead.competitors)
        lead.executive_summary = enrichment.get('executive_summary', lead.executive_summary)
        lead.status = 'RESEARCHED'
        lead.save()
        
        return Response(self.get_serializer(lead).data)
