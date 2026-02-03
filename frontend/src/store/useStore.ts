import { create } from 'zustand';

interface GreeksState {
  underlyingPrice: number;
  strikePrice: number;
  timeToExpiration: number;
  riskFreeRate: number;
  volatility: number;
  optionType: 'call' | 'put';
  setUnderlyingPrice: (price: number) => void;
  setStrikePrice: (price: number) => void;
  setTimeToExpiration: (time: number) => void;
  setRiskFreeRate: (rate: number) => void;
  setVolatility: (vol: number) => void;
  setOptionType: (type: 'call' | 'put') => void;
}

export const useGreeksStore = create<GreeksState>((set: any) => ({
  underlyingPrice: 100,
  strikePrice: 100,
  timeToExpiration: 0.25,
  riskFreeRate: 0.05,
  volatility: 0.25,
  optionType: 'call',
  setUnderlyingPrice: (price: number) => set({ underlyingPrice: price }),
  setStrikePrice: (price: number) => set({ strikePrice: price }),
  setTimeToExpiration: (time: number) => set({ timeToExpiration: time }),
  setRiskFreeRate: (rate: number) => set({ riskFreeRate: rate }),
  setVolatility: (vol: number) => set({ volatility: vol }),
  setOptionType: (type: 'call' | 'put') => set({ optionType: type }),
}));

interface PortfolioState {
  positions: any[];
  addPosition: (position: any) => void;
  removePosition: (index: number) => void;
  updatePosition: (index: number, position: any) => void;
}

export const usePortfolioStore = create<PortfolioState>((set: any) => ({
  positions: [],
  addPosition: (position: any) => set((state: any) => ({ positions: [...state.positions, position] })),
  removePosition: (index: number) => set((state: any) => ({
    positions: state.positions.filter((_: any, i: number) => i !== index)
  })),
  updatePosition: (index: number, position: any) => set((state: any) => ({
    positions: state.positions.map((p: any, i: number) => (i === index ? position : p))
  })),
}));
