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
          title: {
            text: 'Option P&L Surface: Price vs Volatility Impact',
            font: { size: 18, color: '#f3f4f6', family: 'Inter, system-ui, sans-serif' }
          },
          scene: {
            xaxis: { 
              title: {
                text: 'Underlying Price ($)',
                font: { size: 14, color: '#e5e7eb' }
              },
              gridcolor: '#374151',
              showbackground: true,
              backgroundcolor: 'rgba(30, 41, 59, 0.3)'
            },
            yaxis: { 
              title: {
                text: 'Implied Volatility (σ)',
                font: { size: 14, color: '#e5e7eb' }
              },
              gridcolor: '#374151',
              showbackground: true,
              backgroundcolor: 'rgba(30, 41, 59, 0.3)'
            },
            zaxis: { 
              title: {
                text: 'Profit & Loss ($)',
                font: { size: 14, color: '#e5e7eb' }
              },
              gridcolor: '#374151',
              showbackground: true,
              backgroundcolor: 'rgba(30, 41, 59, 0.3)'
            },
            bgcolor: 'rgba(30, 41, 59, 0.5)',
            camera: {
              eye: { x: 1.5, y: 1.5, z: 1.3 }
            }
          },
          paper_bgcolor: 'rgba(30, 41, 59, 0)',
          plot_bgcolor: 'rgba(30, 41, 59, 0)',
          font: { color: '#f3f4f6', family: 'Inter, system-ui, sans-serif' },
          height: 600,
          margin: { l: 0, r: 0, b: 0, t: 50 }
        }}
        config={{
          displayModeBar: true,
          displaylogo: false,
          modeBarButtonsToRemove: ['toImage']
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
};
