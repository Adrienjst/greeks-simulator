# Derivatives Greeks Simulator & Backtester

A comprehensive real-time options trading analysis platform featuring Greeks calculation, scenario simulation, portfolio aggregation, and strategy backtesting.

## 🎯 Features

### Greeks Calculator
- **Black-Scholes Pricing**: Accurate option pricing and Greeks calculation
- **Greeks Metrics**: Delta, Gamma, Vega, Rho, Theta
- **3D P&L Surface**: Visualize option P&L across underlying prices and IV levels
- **Scenario Analysis**: Test option P&L under various market conditions
- **Theta Decay**: Monitor daily time decay effects

### Portfolio Analysis
- **Aggregated Greeks**: Calculate combined Greeks across multiple positions
- **Hedge Ratios**: Determine optimal hedge positions for portfolio neutrality
- **Real-time Updates**: Live Greeks recalculation

### Strategy Backtester
- **Multiple Strategies**: Call, Put, Spreads, Straddles, Strangles, Iron Condors, Butterflies
- **Historical Backtesting**: Test strategies over historical price data
- **Performance Metrics**: Total return, max drawdown, Sharpe ratio, win rate
- **Equity Curve Visualization**: Track portfolio growth over time

### Interactive Visualizations
- 3D P&L surfaces using Plotly
- Scenario heatmaps
- Equity curves and trade history
- Greeks change tracking

## 🏗️ Tech Stack

### Frontend
- **React 18** + TypeScript
- **Vite** - Lightning-fast build tool
- **Plotly.js** - 3D visualizations
- **Recharts** - 2D charts and graphs
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Axios** - API client

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - ORM
- **PostgreSQL** - Data persistence
- **NumPy/SciPy** - Numerical computations
- **QuantLib** - Advanced derivatives pricing (optional)

### Deployment
- **Vercel** - Frontend hosting (free tier)
- **Railway/Render** - Backend hosting
- **PostgreSQL** - Database hosting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 12+

### Local Development

1. **Clone and setup:**
```bash
cd New\ Project

# Create .env file
cp .env.example .env

# Update .env with your PostgreSQL credentials
```

2. **Backend Setup:**
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn app.main:app --reload
# Server runs at http://localhost:8000
```

3. **Frontend Setup:**
```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
# App runs at http://localhost:3000
```

4. **Database Setup:**
```bash
# Option A: Using Docker
docker-compose up -d

# Option B: Manual PostgreSQL setup
# Create database manually and update DATABASE_URL in .env
```

5. **Access the application:**
- Open http://localhost:3000 in your browser
- API docs available at http://localhost:8000/docs

## 📊 API Endpoints

### Greeks Calculator
- `POST /api/calculator/greeks` - Calculate option Greeks
- `POST /api/calculator/pnl-surface` - Generate 3D P&L surface
- `POST /api/calculator/scenario-analysis` - Analyze scenarios
- `POST /api/calculator/theta-decay` - Analyze time decay

### Portfolio
- `POST /api/portfolio/aggregate-greeks` - Calculate portfolio Greeks
- `POST /api/portfolio/hedge-ratio` - Calculate hedge positions

### Backtester
- `POST /api/backtest/strategy` - Run strategy backtest
- `GET /api/backtest/strategies` - List available strategies

## 🌐 Deployment

### Deploy Frontend to Vercel

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Deploy with Vercel:**
```bash
npm install -g vercel
vercel
```

3. **Configure environment:**
   - Set `REACT_APP_API_URL` to your backend URL

### Deploy Backend

**Option A: Railway.app**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway init
railway up
```

**Option B: Render.com**
- Connect GitHub repo
- Set environment variables
- Deploy with Gunicorn: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

### Database Setup

- **Railway**: PostgreSQL add-on with built-in backups
- **Render**: Managed PostgreSQL database
- Update `DATABASE_URL` with connection string from provider

## 🧮 Supported Option Strategies

1. **Single Options**: Call, Put
2. **Spreads**: Call Spread, Put Spread, Iron Condor
3. **Combination Strategies**: Straddle, Strangle, Butterfly

## 📈 Greeks Explained

- **Delta**: Rate of option price change vs underlying price
- **Gamma**: Rate of delta change (convexity)
- **Vega**: Sensitivity to implied volatility changes
- **Rho**: Sensitivity to interest rate changes
- **Theta**: Daily time decay (short theta decay is favorable for sellers)

## 🔧 Configuration

### Environment Variables

```
# Backend
DATABASE_URL=postgresql://user:password@localhost:5432/greeks_simulator
BACKEND_URL=http://localhost:8000

# Frontend
REACT_APP_API_URL=http://localhost:8000

# PostgreSQL
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=greeks_simulator
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```

## 🤝 Contributing

Improvements welcome! Consider:
- Adding more option strategies
- Implementing volatility smile/skew models
- Adding historical volatility calculations
- Integrating with real market data APIs
- Performance optimizations for large portfolios

## 📝 Project Structure

```
New Project/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   ├── store/         # State management
│   │   └── App.tsx
│   ├── package.json
│   ├── vite.config.ts
│   └── index.html
├── backend/
│   ├── app/
│   │   ├── models/        # Database models
│   │   ├── routers/       # API endpoints
│   │   ├── services/      # Business logic
│   │   ├── database.py
│   │   ├── schemas.py
│   │   └── main.py
│   ├── requirements.txt
│   └── run.py
├── vercel.json
├── docker-compose.yml
└── .env.example
```

## 🚨 Important Notes

- **Paper Trading**: This tool is for educational and analysis purposes
- **Data Accuracy**: Use real-time market data for production trading
- **Risk Management**: Always implement proper risk controls
- **Backtesting Limitations**: Past performance doesn't guarantee future results
- **Volatility Models**: Current implementation uses constant volatility; consider local/stochastic models for production

## 📚 Resources

- [Black-Scholes Formula](https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model)
- [The Greeks](https://www.investopedia.com/terms/g/the-greeks.asp)
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [React Documentation](https://react.dev/)
- [QuantLib Documentation](https://www.quantlib.org/)

## 📄 License

MIT License - feel free to use for personal and educational projects.

## 🆘 Support

For issues or questions:
1. Check existing documentation
2. Review API documentation at `/api/docs`
3. Check browser console for frontend errors
4. Check backend logs for API errors

---

**Built with ❤️ for options traders and derivatives analysts**
