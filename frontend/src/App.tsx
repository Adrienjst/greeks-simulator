import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import { Header } from './components/Header';
import { CalculatorPage } from './pages/CalculatorPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { BacktestPage } from './pages/BacktestPage';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<CalculatorPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/backtest" element={<BacktestPage />} />
      </Routes>
    </Router>
  );
}

export default App;
