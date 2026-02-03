import numpy as np
import numpy as np
from math import sqrt, exp, log, erf

def norm_cdf(x):
    """Standard normal cumulative distribution function"""
    return 0.5 * (1.0 + erf(x / sqrt(2.0)))

def norm_pdf(x):
    """Standard normal probability density function"""
    return exp(-0.5 * x * x) / sqrt(2.0 * np.pi)

from typing import Dict

class BlackScholesCalculator:
    """Calculate option Greeks using Black-Scholes model"""
    
    @staticmethod
    def calculate_greeks(
        S: float,  # underlying price
        K: float,  # strike price
        T: float,  # time to expiration (years)
        r: float,  # risk-free rate
        sigma: float,  # volatility
        option_type: str,  # 'call' or 'put'
        q: float = 0.0  # dividend yield
    ) -> Dict[str, float]:
        """Calculate Greeks: Delta, Gamma, Vega, Rho, Theta, Price"""
        
        d1 = (np.log(S / K) + (r - q + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
        d2 = d1 - sigma * np.sqrt(T)
        
        if option_type.lower() == 'call':
            delta = np.exp(-q * T) * norm.cdf(d1)
            price = S * np.exp(-q * T) * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
        else:  # put
            delta = np.exp(-q * T) * (norm.cdf(d1) - 1)
            price = K * np.exp(-r * T) * norm.cdf(-d2) - S * np.exp(-q * T) * norm.cdf(-d1)
        
        # Gamma (same for call and put)
        gamma = np.exp(-q * T) * norm.pdf(d1) / (S * sigma * np.sqrt(T))
        
        # Vega (same for call and put, per 1% change in volatility)
        vega = S * np.exp(-q * T) * norm.pdf(d1) * np.sqrt(T) / 100
        
        # Rho
        if option_type.lower() == 'call':
            rho = K * T * np.exp(-r * T) * norm.cdf(d2) / 100
        else:
            rho = -K * T * np.exp(-r * T) * norm.cdf(-d2) / 100
        
        # Theta (per day, so divide by 365)
        if option_type.lower() == 'call':
            theta = (-S * np.exp(-q * T) * norm.pdf(d1) * sigma / (2 * np.sqrt(T)) 
                     - r * K * np.exp(-r * T) * norm.cdf(d2) 
                     + q * S * np.exp(-q * T) * norm.cdf(d1)) / 365
        else:
            theta = (-S * np.exp(-q * T) * norm.pdf(d1) * sigma / (2 * np.sqrt(T))
                     + r * K * np.exp(-r * T) * norm.cdf(-d2)
                     - q * S * np.exp(-q * T) * norm.cdf(-d1)) / 365
        
        return {
            "delta": float(delta),
            "gamma": float(gamma),
            "vega": float(vega),
            "rho": float(rho),
            "theta": float(theta),
            "price": float(price),
        }
    
    @staticmethod
    def calculate_pnl_surface(
        S: float,
        K: float,
        T: float,
        r: float,
        sigma: float,
        option_type: str,
        underlying_range: tuple = (-0.20, 0.20),
        iv_range: tuple = (-0.30, 0.30),
        steps: int = 25
    ) -> Dict:
        """Generate P&L surface for 3D visualization"""
        
        # Generate price shocks
        price_multipliers = np.linspace(1 + underlying_range[0], 1 + underlying_range[1], steps)
        iv_multipliers = np.linspace(1 + iv_range[0], 1 + iv_range[1], steps)
        
        underlying_prices = S * price_multipliers
        iv_levels = sigma * iv_multipliers
        
        # Calculate initial price
        initial_greeks = BlackScholesCalculator.calculate_greeks(
            S, K, T, r, sigma, option_type
        )
        initial_price = initial_greeks["price"]
        initial_delta = initial_greeks["delta"]
        
        # Create surface
        pnl_surface = np.zeros((len(iv_levels), len(underlying_prices)))
        
        for i, iv in enumerate(iv_levels):
            for j, price in enumerate(underlying_prices):
                greeks = BlackScholesCalculator.calculate_greeks(
                    price, K, T, r, iv, option_type
                )
                # Simplified P&L: new price - initial price
                pnl_surface[i, j] = greeks["price"] - initial_price
        
        return {
            "underlying_prices": underlying_prices.tolist(),
            "iv_levels": iv_levels.tolist(),
            "pnl_surface": pnl_surface.tolist(),
            "initial_price": initial_price,
            "initial_delta": initial_delta,
        }
