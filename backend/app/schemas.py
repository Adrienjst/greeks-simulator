from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List
from enum import Enum

class OptionType(str, Enum):
    CALL = "call"
    PUT = "put"

# Greeks Calculator Schemas
class GreeksRequest(BaseModel):
    underlying_price: float
    strike_price: float
    time_to_expiration: float  # in years
    risk_free_rate: float
    volatility: float
    option_type: OptionType
    dividend_yield: float = 0.0

class GreeksResponse(BaseModel):
    delta: float
    gamma: float
    vega: float
    rho: float
    theta: float
    price: float

class ScenarioRequest(BaseModel):
    underlying_price: float
    strike_price: float
    time_to_expiration: float
    risk_free_rate: float
    volatility: float
    option_type: OptionType
    price_shocks: List[float]  # e.g., [-0.05, -0.02, 0, 0.02, 0.05]
    iv_shocks: List[float]     # e.g., [-0.10, -0.05, 0, 0.05, 0.10]
    days_forward: int = 1

class PnLSurface(BaseModel):
    underlying_prices: List[float]
    iv_levels: List[float]
    pnl_surface: List[List[float]]

# Portfolio Schemas
class PortfolioPosition(BaseModel):
    ticker: str
    strike: float
    option_type: OptionType
    quantity: int
    underlying_price: float
    risk_free_rate: float
    volatility: float
    time_to_expiration: float

class PortfolioGreeks(BaseModel):
    total_delta: float
    total_gamma: float
    total_vega: float
    total_rho: float
    total_theta: float
    positions: List[dict]

# Backtest Schemas
class BacktestRequest(BaseModel):
    strategy_type: str  # "call_spread", "put_spread", "straddle", etc.
    ticker: str
    start_date: datetime
    end_date: datetime
    initial_capital: float
    parameters: dict

class BacktestResult(BaseModel):
    total_return: float
    max_drawdown: float
    sharpe_ratio: float
    win_rate: float
    trades: List[dict]
    equity_curve: List[dict]
