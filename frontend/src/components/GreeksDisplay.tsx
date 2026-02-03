import React from 'react';

interface GreeksDisplayProps {
  greeks: {
    delta: number;
    gamma: number;
    vega: number;
    rho: number;
    theta: number;
    price: number;
  } | null;
  loading: boolean;
}

export const GreeksDisplay: React.FC<GreeksDisplayProps> = ({ greeks, loading }: GreeksDisplayProps) => {
  if (loading) {
    return <div className="card">Loading Greeks...</div>;
  }

  if (!greeks) {
    return <div className="card">Enter parameters to calculate Greeks</div>;
  }

  const greekItems = [
    { label: 'Delta', value: greeks.delta, description: 'Price sensitivity' },
    { label: 'Gamma', value: greeks.gamma, description: 'Delta acceleration' },
    { label: 'Vega', value: greeks.vega, description: 'IV sensitivity' },
    { label: 'Rho', value: greeks.rho, description: 'Rate sensitivity' },
    { label: 'Theta', value: greeks.theta, description: 'Time decay (daily)' },
    { label: 'Price', value: greeks.price, description: 'Option price' },
  ];

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Option Greeks</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {greekItems.map((item) => (
          <div key={item.label} className="bg-slate-800 p-4 rounded">
            <p className="text-slate-400 text-sm">{item.description}</p>
            <p className="text-2xl font-bold">{item.value.toFixed(4)}</p>
            <p className="text-slate-300">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
