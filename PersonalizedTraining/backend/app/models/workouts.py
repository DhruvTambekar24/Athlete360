from pydantic import BaseModel, Field
from typing import Literal, Optional

class WorkoutPlanRequest(BaseModel):
    age: int = Field(..., gt=0, le=100)
    gender: Literal["male", "female", "other"]
    fitness_level: Literal["beginner", "intermediate", "advanced", "athlete"]
    target_muscle_group: Literal[
        "full_body", "upper_body", "lower_body", "core", 
        "chest", "back", "shoulders", "legs", "arms"
    ]
    workout_duration: int = Field(..., gt=0, le=180, description="Workout duration in minutes")
    goals: Optional[str] = None
    limitations: Optional[str] = None

class WorkoutPlanResponse(BaseModel):
    workout_plan: str
    target_muscle_group: str
    duration: int