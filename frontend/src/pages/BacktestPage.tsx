import React, { useState } from 'react';
import { backtestService } from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const BacktestPage: React.FC = () => {
  const [backtestParams, setBacktestParams] = useState({
    strategy_type: 'call',
    ticker: 'SPY',
    start_date: '2023-01-01',
    end_date: '2024-01-01',
    initial_capital: 10000,
  });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [strategies, setStrategies] = useState<string[]>([]);

  React.useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await backtestService.listStrategies();
        setStrategies(response.data.strategies);
      } catch (error) {
        console.error('Failed to fetch strategies:', error);
      }
    };
    fetchStrategies();
  }, []);

  const handleBacktest = async () => {
    setLoading(true);
    try {
      const response = await backtestService.backtestStrategy({
        ...backtestParams,
        parameters: {
          strike: 400,
          expiration: backtestParams.end_date,
        },
      });
      setResult(response.data);
    } catch (error) {
      console.error('Failed to backtest:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Strategy Backtester</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Backtest Parameters</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium mb-1">Strategy</label>
              <select
                value={backtestParams.strategy_type}
                onChange={(e) => setBacktestParams({ ...backtestParams, strategy_type: e.target.value })}
                className="input-field"
              >
                {strategies.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Ticker</label>
              <input
                type="text"
                value={backtestParams.ticker}
                onChange={(e) => setBacktestParams({ ...backtestParams, ticker: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Start Date</label>
              <input
                type="date"
                value={backtestParams.start_date}
                onChange={(e) => setBacktestParams({ ...backtestParams, start_date: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">End Date</label>
              <input
                type="date"
                value={backtestParams.end_date}
                onChange={(e) => setBacktestParams({ ...backtestParams, end_date: e.target.value })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Initial Capital</label>
              <input
                type="number"
                value={backtestParams.initial_capital}
                onChange={(e) => setBacktestParams({ ...backtestParams, initial_capital: parseFloat(e.target.value) })}
                className="input-field"
              />
            </div>
            <button
              onClick={handleBacktest}
              disabled={loading}
              className="btn-primary w-full disabled:opacity-50"
            >
              {loading ? 'Backtesting...' : 'Run Backtest'}
            </button>
          </div>
        </div>

        {result && (
          <div className="lg:col-span-2 card">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 p-3 rounded">
                <p className="text-slate-400 text-sm">Total Return</p>
                <p className="text-2xl font-bold">{(result.total_return * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <p className="text-slate-400 text-sm">Max Drawdown</p>
                <p className="text-2xl font-bold">{(result.max_drawdown * 100).toFixed(2)}%</p>
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <p className="text-slate-400 text-sm">Sharpe Ratio</p>
                <p className="text-2xl font-bold">{result.sharpe_ratio.toFixed(2)}</p>
              </div>
              <div className="bg-slate-800 p-3 rounded">
                <p className="text-slate-400 text-sm">Final Equity</p>
                <p className="text-2xl font-bold">${result.final_equity.toFixed(0)}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {result && result.equity_curve && (
        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Equity Curve</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={result.equity_curve.map((v: number, i: number) => ({ day: i, value: v }))}>
              <CartesianGrid stroke="#475569" />
              <XAxis dataKey="day" stroke="#94a3b8" />
              <YAxis stroke="#94a3b8" />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
