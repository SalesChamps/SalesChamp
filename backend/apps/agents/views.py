from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import AgentDefinition, WorkflowExecution, AgentExecutionStep
from .serializers import AgentDefinitionSerializer, WorkflowExecutionSerializer, AgentExecutionStepSerializer
from .orchestrator import ManagerAgentOrchestrator

class AgentDefinitionViewSet(viewsets.ModelViewSet):
    queryset = AgentDefinition.objects.all()
    serializer_class = AgentDefinitionSerializer

    @action(detail=False, methods=['post'])
    def toggle_fleet(self, request):
        """Pause or activate all 8 agents in the fleet."""
        action_type = request.data.get('action', 'RESUME') # 'PAUSE' or 'RESUME'
        new_status = 'PAUSED' if action_type == 'PAUSE' else 'ACTIVE'
        AgentDefinition.objects.all().update(status=new_status)
        return Response({
            'status': 'success',
            'fleet_status': new_status,
            'message': f"All 8 specialized agents set to {new_status}."
        })


class WorkflowExecutionViewSet(viewsets.ModelViewSet):
    queryset = WorkflowExecution.objects.all()
    serializer_class = WorkflowExecutionSerializer

    @action(detail=False, methods=['post'])
    def trigger_pipeline(self, request):
        """Trigger an autonomous end-to-end multi-agent execution pipeline."""
        company_name = request.data.get('company_name', 'Siemens Energy EMEA')
        industry = request.data.get('industry', 'Industrial Automation & Power')
        
        orchestrator = ManagerAgentOrchestrator()
        execution = orchestrator.run_full_pipeline(target_company=company_name, industry=industry)

        return Response(self.get_serializer(execution).data, status=status.HTTP_201_CREATED)
