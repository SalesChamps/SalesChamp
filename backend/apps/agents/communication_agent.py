import random
from .llm_service import llm_service

class CommunicationAgent:
    """Agent that oversees AI voice outbound calls and omnichannel communications."""

    def simulate_voice_call(self, lead):
        def fallback():
            transcript = [
                {
                    'speaker': 'Nova Voice-SDR',
                    'timestamp': '00:03',
                    'text': f"Hello, am I speaking with {lead.contact_name or 'the Procurement Director'} at {lead.company_name}?"
                },
                {
                    'speaker': 'Prospect',
                    'timestamp': '00:08',
                    'text': "Yes, this is they. Who is calling?"
                },
                {
                    'speaker': 'Nova Voice-SDR',
                    'timestamp': '00:14',
                    'text': f"This is Nova calling from SalesChamp. I noticed {lead.company_name} is scaling your operations and managing complex quoting across Salesforce and SAP. Our enterprise orchestrator cuts quotation turnaround by 78% with full human-in-the-loop review."
                },
                {
                    'speaker': 'Prospect',
                    'timestamp': '00:26',
                    'text': "Interesting timing. Our team has actually been complaining about data drifting between Salesforce deals and SAP sales orders. How fast can you deploy?"
                },
                {
                    'speaker': 'Nova Voice-SDR',
                    'timestamp': '00:37',
                    'text': "We provide production sandbox integration in under 72 hours, with automated deduplication so no records are lost. May I send our RevOps director's calendar link along with our technical proposal?"
                },
                {
                    'speaker': 'Prospect',
                    'timestamp': '00:48',
                    'text': "Yes, send it over to my direct inbox. I'll review it with our VP of IT tomorrow morning."
                },
                {
                    'speaker': 'Nova Voice-SDR',
                    'timestamp': '00:54',
                    'text': f"Excellent! I've logged our discussion, verified your preferred contact email, and dispatched the proposal summary. Have a wonderful day!"
                }
            ]
            return {
                'duration_seconds': 142,
                'sentiment_score': 92,
                'sentiment_label': 'High Buying Intent',
                'key_takeaway': f"Prospect confirmed severe friction between Salesforce deals and SAP order fulfillment. Requested immediate calendar link and technical architecture proposal.",
                'transcript_turns': transcript
            }

        return fallback()
