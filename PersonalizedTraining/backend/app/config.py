import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    # API settings
    APP_NAME: str = "Athletic Training Planner"
    API_PREFIX: str = "/api"
    
    # Google AI API
    GOOGLE_API_KEY: str = os.getenv("GOOGLE_API_KEY", "")
    
    class Config:
        env_file = ".env"

settings = Settings()