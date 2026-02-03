import React, { useState, useEffect } from 'react';
// @ts-ignore
import Plot from 'react-plotly.js';
import { calculatorService } from '../services/api';

interface PnLSurfaceChartProps {
  params: {
    underlying_price: number;
    strike_price: number;
    time_to_expiration: number;
    risk_free_rate: number;
    volatility: number;
    option_type: string;
  };
}

export const PnLSurfaceChart: React.FC<PnLSurfaceChartProps> = ({ params }) => {
  const [surfaceData, setSurfaceData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSurface = async () => {
      setLoading(true);
      try {
        const response = await calculatorService.calculatePnLSurface(params);
        setSurfaceData(response.data);
      } catch (error) {
        console.error('Failed to calculate P&L surface:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurface();
  }, [params]);

  if (loading) {
    return <div className="card">Loading 3D P&L Surface...</div>;
  }

  if (!surfaceData) {
    return <div className="card">P&L Surface data unavailable</div>;
  }

  const plotData = [
    {
      type: 'surface',
      x: surfaceData.underlying_prices,
      y: surfaceData.iv_levels,
      z: surfaceData.pnl_surface,
      colorscale: 'Viridis',
    },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">3D P&L Surface</h2>
      <Plot
        data={plotData}
        layout={{
          title: 'Option P&L: Underlying Price vs Implied Volatility',
          scene: {
            xaxis: { title: 'Underlying Price' },
            yaxis: { title: 'Implied Volatility' },
            zaxis: { title: 'P&L' },
            bgcolor: 'rgba(30, 41, 59, 0.5)',
          },
          paper_bgcolor: 'rgba(30, 41, 59, 0)',
          plot_bgcolor: 'rgba(30, 41, 59, 0)',
          font: { color: 'white' },
          height: 600,
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
};
