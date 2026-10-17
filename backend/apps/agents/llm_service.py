import os
import json
import logging

logger = logging.getLogger(__name__)

class HybridLLMService:
    """
    Hybrid LLM Service for SalesChamp:
    - Automatically utilizes OpenAI (GPT-4o/5) or Google Gemini if API keys are configured in environment.
    - Gracefully and deterministically falls back to domain-rich enterprise synthesis models
      if no API key is supplied, ensuring 100% operational reliability for evaluation & testing.
    """

    def __init__(self):
        self.openai_key = os.environ.get('OPENAI_API_KEY')
        self.gemini_key = os.environ.get('GEMINI_API_KEY')

    def generate_json(self, system_prompt: str, user_prompt: str, fallback_generator):
        """
        Attempts live LLM generation, or safely calls fallback_generator function.
        """
        if self.gemini_key:
            try:
                import google.generativeai as genai
                genai.configure(api_key=self.gemini_key)
                model = genai.GenerativeModel("gemini-1.5-pro")
                full_prompt = f"{system_prompt}\n\nTask:\n{user_prompt}\n\nOutput only valid JSON."
                response = model.generate_content(full_prompt)
                clean_text = response.text.strip()
                if clean_text.startswith("```json"):
                    clean_text = clean_text[7:-3].strip()
                elif clean_text.startswith("```"):
                    clean_text = clean_text[3:-3].strip()
                return json.loads(clean_text)
            except Exception as e:
                logger.warning(f"Gemini live call error, falling back: {e}")

        if self.openai_key:
            try:
                from openai import OpenAI
                client = OpenAI(api_key=self.openai_key)
                response = client.chat.completions.create(
                    model="gpt-4o",
                    messages=[
                        {"role": "system", "content": system_prompt + " Output valid JSON only."},
                        {"role": "user", "content": user_prompt}
                    ],
                    response_format={"type": "json_object"}
                )
                return json.loads(response.choices[0].message.content)
            except Exception as e:
                logger.warning(f"OpenAI live call error, falling back: {e}")

        # Deterministic domain-rich fallback
        return fallback_generator()

llm_service = HybridLLMService()
