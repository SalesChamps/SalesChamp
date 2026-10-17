"""WebSocket URL routing for SalesChamp."""
from django.urls import re_path
from apps.agents import consumers

websocket_urlpatterns = [
    re_path(r'ws/agents/telemetry/$', consumers.AgentExecutionConsumer.as_asgi()),
    re_path(r'ws/voice/stream/$', consumers.VoiceStreamConsumer.as_asgi()),
]
