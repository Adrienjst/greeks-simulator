import axios from 'axios';

const API_URL = "http://localhost:8000";

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const calculatorService = {
  calculateGreeks: (data: any) => apiClient.post('/api/calculator/greeks', data),
  calculatePnLSurface: (data: any) => apiClient.post('/api/calculator/pnl-surface', data),
  analyzeScenarios: (data: any) => apiClient.post('/api/calculator/scenario-analysis', data),
  thetaDecay: (data: any) => apiClient.post('/api/calculator/theta-decay', data),
};


export const portfolioService = {
  aggregateGreeks: (positions: any[]) => apiClient.post('/portfolio/aggregate-greeks', positions),
  calculateHedgeRatio: (positions: any[], targetGreek: string) => 
    apiClient.post(`/portfolio/hedge-ratio?target_greek=${targetGreek}`, positions),
};

export const backtestService = {
  backtestStrategy: (data: any) => apiClient.post('/backtest/strategy', data),
  listStrategies: () => apiClient.get('/backtest/strategies'),
};

export default apiClient;
