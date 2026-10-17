from rest_framework import serializers
from .models import AgentDefinition, WorkflowExecution, AgentExecutionStep

class AgentDefinitionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentDefinition
        fields = '__all__'


class AgentExecutionStepSerializer(serializers.ModelSerializer):
    class Meta:
        model = AgentExecutionStep
        fields = '__all__'


class WorkflowExecutionSerializer(serializers.ModelSerializer):
    steps = AgentExecutionStepSerializer(many=True, read_only=True)

    class Meta:
        model = WorkflowExecution
        fields = '__all__'
