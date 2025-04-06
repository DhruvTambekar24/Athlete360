from pydantic import BaseModel, Field
from typing import Literal, Optional

class SportTrainingRequest(BaseModel):
    sport: Literal[
        "cricket", "football", "hockey", "kabaddi", "tennis", 
        "wrestling", "volleyball", "kho kho", "archery", 
        "swimming", "badminton", "basketball", "athletics"
    ]
    hours_per_week: int = Field(..., gt=0, le=40, description="Training hours per week")
    age: Optional[int] = Field(None, gt=0, le=100)
    experience_level: Optional[Literal["beginner", "intermediate", "advanced", "professional"]] = None
    focus_areas: Optional[str] = None

class SportTrainingResponse(BaseModel):
    sport: str
    training_plan: str
    hours_per_week: int