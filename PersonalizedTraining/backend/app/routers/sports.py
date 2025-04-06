from fastapi import APIRouter, HTTPException
from app.models.sports import SportTrainingRequest, SportTrainingResponse
from app.services.gemini_service import generate_sport_training_plan

router = APIRouter(
    prefix="/sports",
    tags=["Sports Training Plans"],
    responses={404: {"description": "Not found"}},
)

@router.post("/training-plan", response_model=SportTrainingResponse)
async def create_sport_training_plan(request: SportTrainingRequest):
    try:
        training_plan = await generate_sport_training_plan(request)
        
        return SportTrainingResponse(
            sport=request.sport,
            training_plan=training_plan,
            hours_per_week=request.hours_per_week
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate training plan: {str(e)}")