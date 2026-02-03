import React, { useState } from 'react';
import { usePortfolioStore } from '../store/useStore';
import { PortfolioGreeksDisplay } from '../components/PortfolioGreeksDisplay';
import { portfolioService } from '../services/api';

export const PortfolioPage: React.FC = () => {
  const positions = usePortfolioStore((state) => state.positions);
  const addPosition = usePortfolioStore((state) => state.addPosition);
  const [greeks, setGreeks] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    ticker: 'SPY',
    strike: 400,
    option_type: 'call',
    quantity: 1,
    underlying_price: 400,
    risk_free_rate: 0.05,
    volatility: 0.25,
    time_to_expiration: 0.25,
  });

  const handleAddPosition = () => {
    addPosition(formData);
    setFormData({ ...formData, strike: formData.strike + 5 });
  };

  const handleCalculatePortfolioGreeks = async () => {
    setLoading(true);
    try {
      const response = await portfolioService.aggregateGreeks(
        positions.map(p => ({
          ticker: p.ticker,
          strike: p.strike,
          option_type: p.option_type,
          quantity: p.quantity,
          underlying_price: p.underlying_price,
          risk_free_rate: p.risk_free_rate,
          volatility: p.volatility,
          time_to_expiration: p.time_to_expiration,
        }))
      );
      setGreeks(response.data);
    } catch (error) {
      console.error('Failed to calculate portfolio Greeks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Portfolio Greeks</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Add Position</h2>
          <div className="space-y-3">
            {Object.entries(formData).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium mb-1">{key}</label>
                <input
                  type={key === 'quantity' ? 'number' : 'text'}
                  value={value}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  className="input-field text-sm"
                />
              </div>
            ))}
            <button onClick={handleAddPosition} className="btn-primary w-full">
              Add Position
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <PortfolioGreeksDisplay greeks={greeks} />
        </div>
      </div>

      <div className="card">
        <button
          onClick={handleCalculatePortfolioGreeks}
          disabled={loading || positions.length === 0}
          className="btn-primary disabled:opacity-50"
        >
          {loading ? 'Calculating...' : 'Calculate Portfolio Greeks'}
        </button>
      </div>
    </div>
  );
};
