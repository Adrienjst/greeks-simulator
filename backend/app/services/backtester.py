import numpy as np
from datetime import datetime, timedelta
from typing import Dict, List
import pandas as pd
from .greeks_calculator import BlackScholesCalculator

class StrategyBacktester:
    """Backtest option strategies over historical data"""
    
    @staticmethod
    def backtest_strategy(
        price_data: List[float],
        dates: List[datetime],
        strike: float,
        expiration: datetime,
        strategy_type: str,
        initial_capital: float,
        r: float,
        sigma_model: str = "constant"
    ) -> Dict:
        """
        Backtest a strategy over historical price data
        
        strategy_type: 'call', 'put', 'call_spread', 'put_spread', 'straddle', etc.
        """
        
        trades = []
        equity_curve = [initial_capital]
        positions = {}
        
        for i, (date, S) in enumerate(zip(dates, price_data)):
            T = (expiration - date).days / 365.0
            
            if T <= 0:
                # Strategy expired
                if "short" in strategy_type:
                    position = positions.get(strategy_type, 0)
                    pnl = -position
                else:
                    position = positions.get(strategy_type, 0)
                    pnl = position
                
                equity_curve.append(equity_curve[-1] + pnl)
                break
            
            # Calculate option prices
            greeks_call = BlackScholesCalculator.calculate_greeks(
                S, strike, T, r, 0.25, 'call'
            )
            greeks_put = BlackScholesCalculator.calculate_greeks(
                S, strike, T, r, 0.25, 'put'
            )
            
            # Simple strategy: buy call if undervalued relative to historical vol
            if strategy_type == 'call' and i == 0:
                cost = greeks_call["price"]
                positions[strategy_type] = -cost  # Cost is negative
                trades.append({
                    "date": date,
                    "action": "BUY_CALL",
                    "price": S,
                    "cost": cost,
                    "time_to_exp": T
                })
            
            # Update equity with current P&L
            if strategy_type in positions:
                current_pnl = 0
                if strategy_type == 'call':
                    current_pnl = greeks_call["price"] - (abs(positions[strategy_type]))
                
                equity_curve.append(initial_capital + current_pnl)
        
        # Calculate metrics
        equity_array = np.array(equity_curve)
        returns = np.diff(equity_array) / equity_array[:-1]
        
        max_drawdown = StrategyBacktester._calculate_max_drawdown(equity_array)
        sharpe_ratio = StrategyBacktester._calculate_sharpe(returns)
        
        total_return = (equity_curve[-1] - initial_capital) / initial_capital
        
        return {
            "total_return": total_return,
            "max_drawdown": max_drawdown,
            "sharpe_ratio": sharpe_ratio,
            "final_equity": equity_curve[-1],
            "trades": trades,
            "equity_curve": equity_curve,
            "win_rate": len([t for t in trades if t.get("pnl", 0) > 0]) / max(1, len(trades)),
        }
    
    @staticmethod
    def _calculate_max_drawdown(equity_curve: np.ndarray) -> float:
        """Calculate maximum drawdown from equity curve"""
        running_max = np.maximum.accumulate(equity_curve)
        drawdown = (equity_curve - running_max) / running_max
        return float(np.min(drawdown))
    
    @staticmethod
    def _calculate_sharpe(returns: np.ndarray, rf_rate: float = 0.02) -> float:
        """Calculate Sharpe ratio"""
        if len(returns) == 0:
            return 0
        excess_returns = returns - (rf_rate / 252)
        return float(np.mean(excess_returns) / (np.std(excess_returns) + 1e-10) * np.sqrt(252))
