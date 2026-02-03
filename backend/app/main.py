from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import calculator, backtest, portfolio
from app.database import engine, Base
import os

# Create database tables
# Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Derivatives Greeks Simulator & Backtester",
    description="Real-time option Greeks calculation and backtesting engine",
    version="1.0.0"
)

# CORS middleware
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:8000",
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Temporaire - autorise tout
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(calculator.router, prefix="/api/calculator", tags=["Calculator"])
app.include_router(backtest.router, prefix="/api/backtest", tags=["Backtest"])
app.include_router(portfolio.router, prefix="/api/portfolio", tags=["Portfolio"])

@app.get("/health")
async def health_check():
    return {"status": "ok"}
