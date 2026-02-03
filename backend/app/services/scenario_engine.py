import numpy as np
from typing import Dict, List
from .greeks_calculator import BlackScholesCalculator

class ScenarioEngine:
    """Analyze option P&L under various market scenarios"""
    
    @staticmethod
    def generate_scenarios(
        S: float,
        K: float,
        T: float,
        r: float,
        sigma: float,
        option_type: str,
        price_shocks: List[float],
        iv_shocks: List[float],
        days_forward: int = 1
    ) -> Dict:
        """Generate scenario analysis with price and IV shocks"""
        
        # Adjust time to expiration
        T_new = max(T - (days_forward / 365), 0.001)  # Prevent T from becoming 0
        
        initial_greeks = BlackScholesCalculator.calculate_greeks(
            S, K, T, r, sigma, option_type
        )
        initial_price = initial_greeks["price"]
        
        scenarios = []
        
        for price_shock in price_shocks:
            for iv_shock in iv_shocks:
                shocked_price = S * (1 + price_shock)
                shocked_iv = sigma * (1 + iv_shock)
                
                # Ensure IV doesn't go negative
                shocked_iv = max(shocked_iv, 0.01)
                
                # Calculate greeks under shock scenario
                shocked_greeks = BlackScholesCalculator.calculate_greeks(
                    shocked_price, K, T_new, r, shocked_iv, option_type
                )
                
                pnl = shocked_greeks["price"] - initial_price
                pnl_pct = (pnl / initial_price * 100) if initial_price != 0 else 0
                
                scenarios.append({
                    "price_shock": price_shock * 100,
                    "iv_shock": iv_shock * 100,
                    "shocked_underlying": shocked_price,
                    "shocked_iv": shocked_iv,
                    "new_price": shocked_greeks["price"],
                    "pnl": pnl,
                    "pnl_pct": pnl_pct,
                    "new_delta": shocked_greeks["delta"],
                    "new_gamma": shocked_greeks["gamma"],
                    "new_vega": shocked_greeks["vega"],
                })
        
        return {
            "initial_price": initial_price,
            "initial_greeks": initial_greeks,
            "scenarios": scenarios,
        }
    
    @staticmethod
    def theta_decay_analysis(
        S: float,
        K: float,
        T: float,
        r: float,
        sigma: float,
        option_type: str,
        days: int = 30
    ) -> Dict:
        """Analyze theta decay over time"""
        
        decay_schedule = []
        
        for day in range(days + 1):
            T_new = max(T - (day / 365), 0.001)
            greeks = BlackScholesCalculator.calculate_greeks(
                S, K, T_new, r, sigma, option_type
            )
            
            decay_schedule.append({
                "day": day,
                "price": greeks["price"],
                "delta": greeks["delta"],
                "gamma": greeks["gamma"],
                "vega": greeks["vega"],
                "theta": greeks["theta"],
                "time_to_expiration": T_new,
            })
        
        return {
            "decay_schedule": decay_schedule,
        }
