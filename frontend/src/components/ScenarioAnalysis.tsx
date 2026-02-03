import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { calculatorService } from '../services/api';

interface ScenarioAnalysisProps {
  params: {
    underlying_price: number;
    strike_price: number;
    time_to_expiration: number;
    risk_free_rate: number;
    volatility: number;
    option_type: string;
  };
}

export const ScenarioAnalysis: React.FC<ScenarioAnalysisProps> = ({ params }) => {
  const [scenarios, setScenarios] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchScenarios = async () => {
      setLoading(true);
      try {
        const response = await calculatorService.analyzeScenarios({
          ...params,
          price_shocks: [-0.05, -0.02, 0, 0.02, 0.05],
          iv_shocks: [-0.10, -0.05, 0, 0.05, 0.10],
          days_forward: 1,
        });
        setScenarios(response.data);
      } catch (error) {
        console.error('Failed to analyze scenarios:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchScenarios();
  }, [params]);

  if (loading) {
    return <div className="card">Loading scenarios...</div>;
  }

  if (!scenarios) {
    return <div className="card">Scenario data unavailable</div>;
  }

  // Organize scenarios for visualization
  const scenarioData = scenarios.scenarios
    .filter((s: any) => Math.abs(s.iv_shock) < 0.001)  // Show base IV scenarios
    .map((s: any) => ({
      price_shock: s.price_shock,
      pnl: s.pnl,
      pnl_pct: s.pnl_pct,
    }));

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Scenario Analysis</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={scenarioData}>
          <CartesianGrid stroke="#475569" />
          <XAxis dataKey="price_shock" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}
            labelStyle={{ color: '#94a3b8' }}
          />
          <Legend />
          <Line type="monotone" dataKey="pnl_pct" stroke="#3b82f6" dot={{ fill: '#3b82f6' }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-2">
        {scenarioData.map((scenario: any, idx: number) => (
          <div key={idx} className="bg-slate-800 p-2 rounded text-center">
            <p className="text-xs text-slate-400">{scenario.price_shock.toFixed(1)}%</p>
            <p className="text-lg font-bold">{scenario.pnl_pct.toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};
