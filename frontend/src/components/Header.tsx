import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
            📈 Greeks Simulator
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="text-slate-300 hover:text-white transition">Calculator</Link>
            <Link to="/portfolio" className="text-slate-300 hover:text-white transition">Portfolio</Link>
            <Link to="/backtest" className="text-slate-300 hover:text-white transition">Backtest</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
