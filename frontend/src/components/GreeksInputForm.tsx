import React, { useState } from 'react';
import { useGreeksStore } from '../store/useStore';

interface GreeksInputFormProps {
  onSubmit: (params: any) => void;
  loading: boolean;
}

export const GreeksInputForm: React.FC<GreeksInputFormProps> = ({ onSubmit, loading }: GreeksInputFormProps) => {
  const store = useGreeksStore();
  const [localParams, setLocalParams] = useState({
    underlying_price: store.underlyingPrice,
    strike_price: store.strikePrice,
    time_to_expiration: store.timeToExpiration,
    risk_free_rate: store.riskFreeRate,
    volatility: store.volatility,
    option_type: store.optionType,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setLocalParams((prev: any) => ({
      ...prev,
      [name]: name === 'option_type' ? value : parseFloat(value) || value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(localParams);
  };

  const inputFields = [
    { label: 'Underlying Price', name: 'underlying_price', value: localParams.underlying_price },
    { label: 'Strike Price', name: 'strike_price', value: localParams.strike_price },
    { label: 'Time to Expiration (years)', name: 'time_to_expiration', value: localParams.time_to_expiration },
    { label: 'Risk-Free Rate', name: 'risk_free_rate', value: localParams.risk_free_rate },
    { label: 'Volatility', name: 'volatility', value: localParams.volatility },
  ];

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2 className="text-2xl font-bold mb-4">Greeks Calculator</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputFields.map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium mb-2">{field.label}</label>
            <input
              type="number"
              step="0.01"
              name={field.name}
              value={field.value}
              onChange={handleChange}
              className="input-field"
            />
          </div>
        ))}
        <div>
          <label className="block text-sm font-medium mb-2">Option Type</label>
          <select
            name="option_type"
            value={localParams.option_type}
            onChange={handleChange}
            className="input-field"
          >
            <option value="call">Call</option>
            <option value="put">Put</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-6 w-full md:w-auto disabled:opacity-50"
      >
        {loading ? 'Calculating...' : 'Calculate Greeks'}
      </button>
    </form>
  );
};
