from fastapi import APIRouter, HTTPException
from datetime import datetime
from typing import List
from app.schemas import BacktestRequest, BacktestResult
from app.services.backtester import StrategyBacktester

router = APIRouter()

@router.post("/strategy")
async def backtest_strategy(request: BacktestRequest):
    """Backtest an option strategy over historical data"""
    try:
        # Mock historical data - in production, fetch from database
        days = (request.end_date - request.start_date).days
        dates = [request.start_date + __import__('datetime').timedelta(days=i) for i in range(days)]
        
        # Generate mock price data with realistic movement
        price_data = []
        current_price = 100
        for _ in range(len(dates)):
            random_return = __import__('numpy').random.normal(0.0005, 0.02)
            current_price *= (1 + random_return)
            price_data.append(current_price)
        
        result = StrategyBacktester.backtest_strategy(
            price_data=price_data,
            dates=dates,
            strike=request.parameters.get("strike", 100),
            expiration=request.parameters.get("expiration", request.end_date),
            strategy_type=request.strategy_type,
            initial_capital=request.initial_capital,
            r=0.05,
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/strategies")
async def list_strategies():
    """List available backtesting strategies"""
    return {
        "strategies": [
            "call",
            "put",
            "call_spread",
            "put_spread",
            "straddle",
            "strangle",
            "iron_condor",
            "butterfly",
        ]
    }
