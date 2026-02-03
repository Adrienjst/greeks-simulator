from fastapi import APIRouter, HTTPException
from typing import List
from app.schemas import PortfolioPosition, PortfolioGreeks
from app.services.portfolio_aggregator import PortfolioAggregator

router = APIRouter()

@router.post("/aggregate-greeks")
async def aggregate_portfolio_greeks(positions: List[PortfolioPosition]):
    """Calculate aggregated Greeks for a portfolio of options"""
    try:
        position_dicts = [pos.model_dump() for pos in positions]
        greeks = PortfolioAggregator.calculate_portfolio_greeks(position_dicts)
        return greeks
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/hedge-ratio")
async def calculate_hedge_ratio(positions: List[PortfolioPosition], target_greek: str = "delta"):
    """Calculate hedge ratios to neutralize a specific Greek"""
    try:
        position_dicts = [pos.model_dump() for pos in positions]
        portfolio_greeks = PortfolioAggregator.calculate_portfolio_greeks(position_dicts)
        
        if target_greek not in ["delta", "gamma", "vega", "rho", "theta"]:
            raise ValueError(f"Invalid Greek: {target_greek}")
        
        hedge = PortfolioAggregator.calculate_hedge_ratio(portfolio_greeks, target_greek)
        return hedge
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
