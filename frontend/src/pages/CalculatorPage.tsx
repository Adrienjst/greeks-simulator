import React, { useState } from 'react';
import { GreeksInputForm } from '../components/GreeksInputForm';
import { GreeksDisplay } from '../components/GreeksDisplay';
import { PnLSurfaceChart } from '../components/PnLSurfaceChart';
import { ScenarioAnalysis } from '../components/ScenarioAnalysis';
import { calculatorService } from '../services/api';

export const CalculatorPage: React.FC = () => {
  const [greeks, setGreeks] = useState<any>(null);
  const [params, setParams] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCalculate = async (formParams: any) => {
    setLoading(true);
    setParams(formParams);
    try {
      const response = await calculatorService.calculateGreeks(formParams);
      setGreeks(response.data);
    } catch (error) {
      console.error('Failed to calculate Greeks:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Derivatives Greeks Calculator</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <GreeksInputForm onSubmit={handleCalculate} loading={loading} />
        <GreeksDisplay greeks={greeks} loading={loading} />
      </div>

      {params && (
        <div className="space-y-6">
          <PnLSurfaceChart params={params} />
          <ScenarioAnalysis params={params} />
        </div>
      )}
    </div>
  );
};
