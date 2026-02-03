import React from 'react';
import { usePortfolioStore } from '../store/useStore';

interface PortfolioGreeksDisplayProps {
  greeks: any | null;
}

export const PortfolioGreeksDisplay: React.FC<PortfolioGreeksDisplayProps> = ({ greeks }) => {
  const positions = usePortfolioStore((state) => state.positions);

  if (!greeks) {
    return <div className="card">Add positions to see aggregated Greeks</div>;
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Portfolio Greeks</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        {[
          { label: 'Total Delta', value: greeks.total_delta },
          { label: 'Total Gamma', value: greeks.total_gamma },
          { label: 'Total Vega', value: greeks.total_vega },
          { label: 'Total Rho', value: greeks.total_rho },
          { label: 'Total Theta', value: greeks.total_theta },
        ].map((greek) => (
          <div key={greek.label} className="bg-slate-800 p-4 rounded">
            <p className="text-slate-400 text-sm">{greek.label}</p>
            <p className="text-2xl font-bold">{greek.value.toFixed(4)}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-bold mb-3">Positions ({positions.length})</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {positions.length === 0 ? (
            <p className="text-slate-400">No positions added</p>
          ) : (
            positions.map((pos, idx) => (
              <div key={idx} className="bg-slate-800 p-3 rounded text-sm">
                <p className="font-semibold">
                  {pos.option_type.toUpperCase()} Strike: ${pos.strike}
                </p>
                <p className="text-slate-400">Qty: {pos.quantity}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
