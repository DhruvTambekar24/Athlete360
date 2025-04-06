from fastapi import APIRouter, HTTPException
from app.models.workouts import WorkoutPlanRequest, WorkoutPlanResponse
from app.services.gemini_service import generate_workout_plan

router = APIRouter(
    prefix="/workouts",
    tags=["Workout Plans"],
    responses={404: {"description": "Not found"}},
)

@router.post("/plan", response_model=WorkoutPlanResponse)
async def create_workout_plan(request: WorkoutPlanRequest):
    try:
        workout_plan = await generate_workout_plan(request)
        
        return WorkoutPlanResponse(
            workout_plan=workout_plan,
            target_muscle_group=request.target_muscle_group.replace("_", " "),
            duration=request.workout_duration
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate workout plan: {str(e)}")