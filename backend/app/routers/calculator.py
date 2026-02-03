from fastapi import APIRouter, HTTPException
from app.schemas import GreeksRequest, GreeksResponse, ScenarioRequest, PnLSurface
from app.services.greeks_calculator import BlackScholesCalculator
from app.services.scenario_engine import ScenarioEngine

router = APIRouter()

@router.post("/greeks", response_model=GreeksResponse)
async def calculate_greeks(request: GreeksRequest):
    """Calculate option Greeks using Black-Scholes model"""
    try:
        greeks = BlackScholesCalculator.calculate_greeks(
            S=request.underlying_price,
            K=request.strike_price,
            T=request.time_to_expiration,
            r=request.risk_free_rate,
            sigma=request.volatility,
            option_type=request.option_type.value,
            q=request.dividend_yield
        )
        return GreeksResponse(**greeks)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/pnl-surface")
async def calculate_pnl_surface(request: GreeksRequest):
    """Calculate P&L surface for 3D visualization"""
    try:
        surface = BlackScholesCalculator.calculate_pnl_surface(
            S=request.underlying_price,
            K=request.strike_price,
            T=request.time_to_expiration,
            r=request.risk_free_rate,
            sigma=request.volatility,
            option_type=request.option_type.value,
        )
        return surface
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/scenario-analysis")
async def analyze_scenarios(request: ScenarioRequest):
    """Analyze option P&L under various market scenarios"""
    try:
        scenarios = ScenarioEngine.generate_scenarios(
            S=request.underlying_price,
            K=request.strike_price,
            T=request.time_to_expiration,
            r=request.risk_free_rate,
            sigma=request.volatility,
            option_type=request.option_type.value,
            price_shocks=request.price_shocks,
            iv_shocks=request.iv_shocks,
            days_forward=request.days_forward
        )
        return scenarios
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.post("/theta-decay")
async def theta_decay(request: GreeksRequest):
    """Analyze theta decay over time"""
    try:
        decay = ScenarioEngine.theta_decay_analysis(
            S=request.underlying_price,
            K=request.strike_price,
            T=request.time_to_expiration,
            r=request.risk_free_rate,
            sigma=request.volatility,
            option_type=request.option_type.value,
        )
        return decay
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
