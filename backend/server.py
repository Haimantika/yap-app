from fastapi import FastAPI
from groq import Groq
import json
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()



origins = ["*"]

api_key = os.environ["GROQ_API_KEY"]

client = Groq(api_key=api_key)


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.post("/generate_yap")
async def generateYap(text_str: str):
    completion = client.chat.completions.create(
    model="llama3-8b-8192",
    messages=[
        {
            "role": "system",
            "content": "You're a GenZ yapper user will give you text and you have to convert every sentence into a Genz sentence with slangs and everything\n\nrespond it with this format JSON\n\n{\n\"message\": \"\" \n}"
        },
        {
            "role": "user",
            "content": text_str
        }
    ],
    temperature=1,
    max_tokens=1024,
    top_p=1,
    stream=False,
    response_format={"type": "json_object"},
    stop=None,)
    return json.loads(completion.choices[0].message.content)