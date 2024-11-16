import os

class Settings:
    # Access environment variables using os.environ
    groq_api_key: str = os.environ.get("GROQ_API_KEY", "")
    cors_origins: list = os.environ.get("CORS_ORIGINS", "*").split(",")  # Default to allow all origins

settings = Settings()
