import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer

class AgentExecutionConsumer(AsyncWebsocketConsumer):
    """
    WebSocket consumer streaming live multi-agent execution telemetry and pipeline events.
    """

    async def connect(self):
        await self.accept()
        # Send initial connection handshake and agent fleet status
        await self.send(text_data=json.dumps({
            'type': 'CONNECTION_ESTABLISHED',
            'fleet_status': 'ONLINE',
            'active_agents': 8,
            'message': 'Connected to SalesChamp Autonomous Multi-Agent Telemetry Stream.'
        }))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        event_type = data.get('event')

        if event_type == 'PING':
            await self.send(text_data=json.dumps({'type': 'PONG', 'timestamp': data.get('timestamp')}))

        elif event_type == 'START_WORKFLOW':
            company = data.get('company_name', 'Novartis BioLogix EMEA')
            # Stream simulated execution progression in real-time
            agent_steps = [
                {'step': 1, 'agent': 'Lead Discovery Agent', 'action': f'Discovering {company}...', 'latency': '420ms'},
                {'step': 2, 'agent': 'Research Agent', 'action': 'Extracting tech stack & pain points...', 'latency': '680ms'},
                {'step': 3, 'agent': 'Proposal Agent (RAG)', 'action': 'Synthesizing pricing & drafting proposal...', 'latency': '890ms'},
                {'step': 4, 'agent': 'Manager Orchestrator', 'action': 'Human-in-the-Loop review passed.', 'latency': '120ms'},
                {'step': 5, 'agent': 'Multi-CRM Agent', 'action': 'Bi-directional sync (SFDC + Dyn 365) completed.', 'latency': '310ms'},
                {'step': 6, 'agent': 'Communication Agent', 'action': 'Voice outreach call completed with 92% buying intent.', 'latency': '540ms'},
                {'step': 7, 'agent': 'SAP ERP Agent', 'action': 'Inventory checked, SAP Order & Invoice created.', 'latency': '480ms'},
                {'step': 8, 'agent': 'Analytics Agent', 'action': 'Pipeline metrics refreshed.', 'latency': '160ms'},
            ]

            for s in agent_steps:
                await self.send(text_data=json.dumps({
                    'type': 'STEP_PROGRESS',
                    'data': s
                }))
                await asyncio.sleep(0.4)

            await self.send(text_data=json.dumps({
                'type': 'WORKFLOW_COMPLETED',
                'company': company,
                'status': 'SUCCESS'
            }))


class VoiceStreamConsumer(AsyncWebsocketConsumer):
    """
    WebSocket consumer streaming live audio waveforms and conversational transcript turns.
    """

    async def connect(self):
        await self.accept()
        await self.send(text_data=json.dumps({
            'type': 'VOICE_READY',
            'agent': 'Nova Voice-SDR',
            'audio_codec': 'pcm_16khz'
        }))

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        if data.get('event') == 'START_CALL':
            turns = [
                {'speaker': 'Nova Voice-SDR', 'text': 'Hello, am I speaking with the Procurement Director?'},
                {'speaker': 'Prospect', 'text': 'Yes, speaking. How can I help you today?'},
                {'speaker': 'Nova Voice-SDR', 'text': 'This is Nova from SalesChamp. I noticed your team manages complex quotes across Salesforce and SAP.'},
                {'speaker': 'Prospect', 'text': 'Yes, data sync delay is indeed our biggest pain point right now.'},
                {'speaker': 'Nova Voice-SDR', 'text': 'SalesChamp unifies them autonomously. May I send over our technical proposal?'},
                {'speaker': 'Prospect', 'text': 'Please send it directly to my inbox. I will review it today.'}
            ]
            for t in turns:
                await self.send(text_data=json.dumps({
                    'type': 'TRANSCRIPT_TURN',
                    'turn': t
                }))
                await asyncio.sleep(0.8)

            await self.send(text_data=json.dumps({
                'type': 'CALL_ENDED',
                'sentiment': 'High Buying Intent',
                'score': 94
            }))
