from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import sports, workouts

app = FastAPI(
    title="Athletic Training Planner API",
    description="API for generating personalized training plans for athletes",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(sports.router, prefix="/api")
app.include_router(workouts.router, prefix="/api")

@app.get("/")
async def root():
    return {"message": "Welcome to the Athletic Training Planner API"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)