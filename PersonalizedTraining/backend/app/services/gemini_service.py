import google.generativeai as genai
from app.config import settings
from app.models.sports import SportTrainingRequest
from app.models.workouts import WorkoutPlanRequest

# Configure the Gemini API
genai.configure(api_key=settings.GOOGLE_API_KEY)

# Get a reference to the model
model = genai.GenerativeModel('gemini-1.5-pro')

async def generate_sport_training_plan(request: SportTrainingRequest) -> str:
    prompt = f"""
    Create a detailed training plan for a {request.sport} athlete.
    Weekly training hours: {request.hours_per_week} hours
    
    Additional information:
    Age: {request.age if request.age else 'Not specified'}
    Experience level: {request.experience_level if request.experience_level else 'Not specified'}
    Focus areas: {request.focus_areas if request.focus_areas else 'General training'}
    
    The training plan should include:
    1. Weekly schedule breakdown
    2. Specific drills and exercises
    3. Recommended intensity levels
    4. Rest and recovery periods
    5. Performance metrics to track progress
    
    Format the response in Markdown with clear sections and bullet points.
    """
    
    response = await model.generate_content_async(prompt)
    return response.text

async def generate_workout_plan(request: WorkoutPlanRequest) -> str:
    prompt = f"""
    Create a detailed workout plan with the following specifications:
    
    Age: {request.age}
    Gender: {request.gender}
    Fitness level: {request.fitness_level}
    Target muscle group: {request.target_muscle_group.replace('_', ' ')}
    Workout duration: {request.workout_duration} minutes per session
    
    Additional information:
    Goals: {request.goals if request.goals else 'General fitness'}
    Limitations: {request.limitations if request.limitations else 'None specified'}
    
    The workout plan should include:
    1. Warm-up routine
    2. Main exercises with sets, reps, and rest periods
    3. Cool-down and stretching
    4. Weekly progression plan
    5. Equipment needed
    
    Format the response in Markdown with clear sections and bullet points.
    """
    
    response = await model.generate_content_async(prompt)
    return response.text