from enum import Enum
from sqlalchemy import Column, String, Float, DateTime, Integer, Enum as SQLEnum
from sqlalchemy.dialects.postgresql import JSON
from app.database import Base
from datetime import datetime

class OptionType(str, Enum):
    CALL = "call"
    PUT = "put"

class HistoricalData(Base):
    __tablename__ = "historical_data"
    
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String, index=True)
    date = Column(DateTime, index=True)
    open = Column(Float)
    high = Column(Float)
    low = Column(Float)
    close = Column(Float)
    volume = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

class OptionChain(Base):
    __tablename__ = "option_chains"
    
    id = Column(Integer, primary_key=True, index=True)
    ticker = Column(String, index=True)
    expiration = Column(DateTime)
    strike = Column(Float)
    option_type = Column(SQLEnum(OptionType))
    bid = Column(Float)
    ask = Column(Float)
    last_price = Column(Float)
    volume = Column(Float)
    open_interest = Column(Float)
    iv = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

class PortfolioPosition(Base):
    __tablename__ = "portfolio_positions"
    
    id = Column(Integer, primary_key=True, index=True)
    portfolio_id = Column(String, index=True)
    ticker = Column(String)
    strike = Column(Float)
    option_type = Column(SQLEnum(OptionType))
    quantity = Column(Integer)
    entry_price = Column(Float)
    expiration = Column(DateTime)
    greeks = Column(JSON)  # Store Delta, Gamma, Vega, Rho, Theta
    created_at = Column(DateTime, default=datetime.utcnow)

class BacktestResult(Base):
    __tablename__ = "backtest_results"
    
    id = Column(Integer, primary_key=True, index=True)
    strategy_name = Column(String)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    initial_capital = Column(Float)
    final_value = Column(Float)
    total_return = Column(Float)
    max_drawdown = Column(Float)
    sharpe_ratio = Column(Float)
    trades = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)
