from groq import Groq
from app.config import settings
import json

class GroqService:
    def __init__(self):
        self.client = Groq(api_key=settings.groq_api_key)

    async def generate_yap(self, text_str: str) -> dict:
        try:
            completion = self.client.chat.completions.create(
                model="llama3-8b-8192",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You're a GenZ yapper. The user will give you text, "
                            "and you have to convert every sentence into a GenZ sentence "
                            "with slangs and everything.\n\nRespond in this JSON format:\n\n"
                            "{\n\"message\": \"\" \n}"
                        ),
                    },
                    {"role": "user", "content": text_str},
                ],
                temperature=1,
                max_tokens=1024,
                top_p=1,
                stream=False,
                response_format={"type": "json_object"},
                stop=None,
            )
            return json.loads(completion.choices[0].message.content)
        except Exception as e:
            raise RuntimeError(f"Error generating yap: {str(e)}")
