import numpy as np
from typing import Dict, List
from .greeks_calculator import BlackScholesCalculator

class PortfolioAggregator:
    """Calculate aggregated Greeks for a portfolio of options"""
    
    @staticmethod
    def calculate_portfolio_greeks(positions: List[Dict]) -> Dict:
        """
        Calculate aggregated Greeks for a portfolio
        
        positions: List of dicts with keys:
            - ticker, strike, option_type, quantity, underlying_price, 
            - risk_free_rate, volatility, time_to_expiration
        """
        
        total_delta = 0
        total_gamma = 0
        total_vega = 0
        total_rho = 0
        total_theta = 0
        
        position_details = []
        
        for position in positions:
            greeks = BlackScholesCalculator.calculate_greeks(
                S=position["underlying_price"],
                K=position["strike"],
                T=position["time_to_expiration"],
                r=position["risk_free_rate"],
                sigma=position["volatility"],
                option_type=position["option_type"]
            )
            
            # Multiply by quantity
            qty = position.get("quantity", 1)
            pos_delta = greeks["delta"] * qty
            pos_gamma = greeks["gamma"] * qty
            pos_vega = greeks["vega"] * qty
            pos_rho = greeks["rho"] * qty
            pos_theta = greeks["theta"] * qty
            
            total_delta += pos_delta
            total_gamma += pos_gamma
            total_vega += pos_vega
            total_rho += pos_rho
            total_theta += pos_theta
            
            position_details.append({
                "position": position,
                "greeks": {
                    "delta": pos_delta,
                    "gamma": pos_gamma,
                    "vega": pos_vega,
                    "rho": pos_rho,
                    "theta": pos_theta,
                    "price": greeks["price"] * qty,
                }
            })
        
        return {
            "total_delta": total_delta,
            "total_gamma": total_gamma,
            "total_vega": total_vega,
            "total_rho": total_rho,
            "total_theta": total_theta,
            "position_count": len(positions),
            "positions": position_details,
        }
    
    @staticmethod
    def calculate_hedge_ratio(portfolio_greeks: Dict, target_greek: str = "delta") -> Dict:
        """Calculate hedge ratios to neutralize a specific Greek"""
        
        portfolio_value = portfolio_greeks.get(f"total_{target_greek}", 0)
        
        return {
            "target_greek": target_greek,
            "current_value": portfolio_value,
            "hedge_shares_needed": -portfolio_value,
            "hedge_cost_approx": -portfolio_value * 100,  # Assuming $100 stock price
        }
