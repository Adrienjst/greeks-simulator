# 📚 PROJECT NAVIGATION & INDEX

## 🎯 START HERE

### For First-Time Users
1. **[QUICKSTART.md](QUICKSTART.md)** ← Start here! (5 minutes)
2. **[README.md](README.md)** - Complete documentation
3. **Run setup scripts** and start the app

### For Developers
1. **[ARCHITECTURE.md](ARCHITECTURE.md)** - Understand the system
2. **[backend/app/main.py](backend/app/main.py)** - Backend entry
3. **[frontend/src/App.tsx](frontend/src/App.tsx)** - Frontend entry

### For Deployment
1. **[DEPLOYMENT.md](DEPLOYMENT.md)** - Production setup
2. **[vercel.json](vercel.json)** - Frontend config
3. **[docker-compose.yml](docker-compose.yml)** - Database setup

---

## 📖 Documentation Files

| File | Purpose | Read Time |
|------|---------|-----------|
| **[QUICKSTART.md](QUICKSTART.md)** | 5-minute setup guide | 5 min |
| **[README.md](README.md)** | Complete project guide | 15 min |
| **[DEPLOYMENT.md](DEPLOYMENT.md)** | Production deployment | 10 min |
| **[ARCHITECTURE.md](ARCHITECTURE.md)** | System architecture | 10 min |
| **[SETUP_SUMMARY.md](SETUP_SUMMARY.md)** | Setup overview | 5 min |
| **[PROJECT_COMPLETE.md](PROJECT_COMPLETE.md)** | Final summary | 5 min |
| **[VERIFICATION_CHECKLIST.md](VERIFICATION_CHECKLIST.md)** | Quality check | 5 min |

---

## 🏗️ PROJECT STRUCTURE

### Backend (FastAPI)
```
backend/
├── requirements.txt           # Python dependencies
├── app/
│   ├── main.py               # FastAPI application
│   ├── database.py           # Database configuration
│   ├── schemas.py            # Pydantic schemas (18 types)
│   ├── models/
│   │   └── database_models.py # SQLAlchemy ORM models
│   ├── services/
│   │   ├── greeks_calculator.py      # Black-Scholes
│   │   ├── scenario_engine.py        # Scenario analysis
│   │   ├── portfolio_aggregator.py   # Portfolio Greeks
│   │   └── backtester.py             # Strategy backtest
│   └── routers/
│       ├── calculator.py     # Greeks endpoints
│       ├── portfolio.py      # Portfolio endpoints
│       └── backtest.py       # Backtest endpoints
```

**Key Files by Feature:**
- Greeks Calculator: `backend/app/services/greeks_calculator.py`
- Scenarios: `backend/app/services/scenario_engine.py`
- Portfolio: `backend/app/services/portfolio_aggregator.py`
- Backtester: `backend/app/services/backtester.py`

### Frontend (React)
```
frontend/
├── package.json              # NPM dependencies
├── vite.config.ts           # Vite build config
├── tailwind.config.js       # Tailwind CSS
├── src/
│   ├── App.tsx              # Root component
│   ├── main.tsx             # Entry point
│   ├── index.css            # Global styles
│   ├── components/
│   │   ├── GreeksInputForm.tsx      # Input form
│   │   ├── GreeksDisplay.tsx        # Greeks display
│   │   ├── PnLSurfaceChart.tsx      # 3D chart
│   │   ├── ScenarioAnalysis.tsx     # Scenarios
│   │   ├── PortfolioGreeksDisplay.tsx # Portfolio
│   │   └── Header.tsx               # Navigation
│   ├── pages/
│   │   ├── CalculatorPage.tsx       # Main page
│   │   ├── PortfolioPage.tsx        # Portfolio page
│   │   └── BacktestPage.tsx         # Backtest page
│   ├── services/
│   │   └── api.ts           # API client
│   └── store/
│       └── useStore.ts      # State management
```

**Key Files by Feature:**
- Greeks Form: `frontend/src/components/GreeksInputForm.tsx`
- 3D Chart: `frontend/src/components/PnLSurfaceChart.tsx`
- Scenarios: `frontend/src/components/ScenarioAnalysis.tsx`
- Portfolio: `frontend/src/pages/PortfolioPage.tsx`
- Backtester: `frontend/src/pages/BacktestPage.tsx`

### Configuration
```
Root Files:
├── .env.example              # Environment template
├── .gitignore                # Git configuration
├── vercel.json              # Vercel deployment
├── docker-compose.yml       # PostgreSQL setup
├── setup.sh / setup.bat     # Setup scripts
├── start-db.sh              # Database startup
└── .github/
    └── copilot-instructions.md # AI guidelines
```

---

## 🎯 Feature Map

### Greeks Calculator
**Files:**
- Input: [GreeksInputForm.tsx](frontend/src/components/GreeksInputForm.tsx)
- Logic: [greeks_calculator.py](backend/app/services/greeks_calculator.py)
- Display: [GreeksDisplay.tsx](frontend/src/components/GreeksDisplay.tsx)
- API: [calculator.py](backend/app/routers/calculator.py)

**How It Works:**
1. User enters parameters in GreeksInputForm
2. Form sends POST to `/api/calculator/greeks`
3. Backend calculates Greeks using Black-Scholes
4. Results displayed in GreeksDisplay component
5. API also generates 3D P&L surface

### 3D P&L Visualization
**File:** [PnLSurfaceChart.tsx](frontend/src/components/PnLSurfaceChart.tsx)
**Backend:** [greeks_calculator.py](backend/app/services/greeks_calculator.py) → `calculate_pnl_surface()`

**Shows:**
- P&L surface across underlying prices and IV levels
- Interactive 3D rotation and zoom
- Color gradient for P&L values

### Scenario Analysis
**File:** [ScenarioAnalysis.tsx](frontend/src/components/ScenarioAnalysis.tsx)
**Backend:** [scenario_engine.py](backend/app/services/scenario_engine.py)

**Tests:**
- Price shocks (±5%, ±2%, 0%, +2%, +5%)
- IV shocks (±10%, ±5%, 0%, +5%, +10%)
- Theta decay effects

### Portfolio Analysis
**File:** [PortfolioPage.tsx](frontend/src/pages/PortfolioPage.tsx)
**Backend:** [portfolio_aggregator.py](backend/app/services/portfolio_aggregator.py)

**Calculates:**
- Aggregate Delta, Gamma, Vega, Rho, Theta
- Hedge ratios for neutrality
- Position-level Greeks

### Strategy Backtester
**File:** [BacktestPage.tsx](frontend/src/pages/BacktestPage.tsx)
**Backend:** [backtester.py](backend/app/services/backtester.py)

**Metrics:**
- Total return, max drawdown
- Sharpe ratio, win rate
- Equity curve visualization

---

## 🚀 Quick Command Reference

### Setup
```bash
# Copy environment
cp .env.example .env

# Start database
./start-db.sh

# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

### Testing
```bash
# Backend API tests
# Visit: http://localhost:8000/docs

# Frontend tests
# Open: http://localhost:3000
```

### Deployment
```bash
# Frontend to Vercel
vercel

# Backend to Railway
railway up
```

---

## 🔍 Key Files by Use Case

### "I want to understand the math"
1. [backend/app/services/greeks_calculator.py](backend/app/services/greeks_calculator.py) - Black-Scholes formulas
2. [ARCHITECTURE.md](ARCHITECTURE.md#🧮-mathematical-foundation) - Mathematical foundation section

### "I want to add a new strategy"
1. [backend/app/services/backtester.py](backend/app/services/backtester.py) - Extend `StrategyBacktester` class
2. [backend/app/routers/backtest.py](backend/app/routers/backtest.py) - Add endpoint
3. [frontend/src/pages/BacktestPage.tsx](frontend/src/pages/BacktestPage.tsx) - Add UI

### "I want to customize the UI"
1. [frontend/src/index.css](frontend/src/index.css) - Global styles
2. [frontend/tailwind.config.js](frontend/tailwind.config.js) - Tailwind configuration
3. Component files in [frontend/src/components/](frontend/src/components/)

### "I want to deploy"
1. [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
2. [vercel.json](vercel.json) - Frontend configuration
3. [docker-compose.yml](docker-compose.yml) - Database setup

### "I want to add database features"
1. [backend/app/models/database_models.py](backend/app/models/database_models.py) - ORM models
2. [backend/app/database.py](backend/app/database.py) - Database configuration
3. [backend/app/schemas.py](backend/app/schemas.py) - Data validation

---

## 📊 API Endpoint Reference

### Greeks Calculator
- `POST /api/calculator/greeks` - Calculate Greeks
- `POST /api/calculator/pnl-surface` - Generate P&L surface
- `POST /api/calculator/scenario-analysis` - Scenario analysis
- `POST /api/calculator/theta-decay` - Theta decay analysis

### Portfolio Management
- `POST /api/portfolio/aggregate-greeks` - Portfolio Greeks
- `POST /api/portfolio/hedge-ratio` - Hedge calculations

### Backtester
- `POST /api/backtest/strategy` - Run strategy backtest
- `GET /api/backtest/strategies` - List available strategies

### Health
- `GET /health` - Health check

**Full docs:** http://localhost:8000/docs

---

## 🧪 Testing Guide

### Manual Testing
1. **Greeks Calculator**
   - Enter: S=100, K=100, T=0.25, r=0.05, σ=0.25
   - Verify: Delta ≈ 0.6368, Gamma ≈ 0.0186
   
2. **Scenario Analysis**
   - Run scenarios with ±5% price moves
   - Check P&L changes match Greeks

3. **Portfolio**
   - Add 2-3 positions
   - Verify Greeks are summed correctly

4. **Backtester**
   - Run call strategy for 1 year
   - Check equity curve is reasonable

### Unit Testing
```bash
# Add tests in backend/tests/
pytest backend/tests/
```

---

## 📚 Learning Path

**Beginner (1-2 hours)**
1. Read QUICKSTART.md
2. Run the setup
3. Play with Greeks Calculator

**Intermediate (4-6 hours)**
1. Read ARCHITECTURE.md
2. Explore 3D P&L surface
3. Test portfolio aggregation
4. Run backtest

**Advanced (8+ hours)**
1. Review source code
2. Understand Black-Scholes math
3. Extend with new features
4. Deploy to production

---

## 🆘 Troubleshooting

**Backend won't start:**
- Check: `pg_isready` (PostgreSQL running?)
- Check: DATABASE_URL in .env correct?
- Check: Port 8000 not in use?

**Frontend won't start:**
- Check: `npm install` completed?
- Check: Node modules not corrupted?
- Check: Port 3000 not in use?

**API errors:**
- Check: http://localhost:8000/docs for API spec
- Check: Browser console (F12) for detailed errors
- Check: Backend logs for stack trace

**Charts not showing:**
- Check: Data loaded (network tab)?
- Check: Browser console for JavaScript errors?
- Check: Plotly working (http://localhost:3000)?

---

## 🎓 Resources

- **Trading**: [Investopedia Greeks](https://www.investopedia.com/terms/g/the-greeks.asp)
- **Math**: [Black-Scholes Wikipedia](https://en.wikipedia.org/wiki/Black–Scholes_model)
- **React**: [React Docs](https://react.dev/)
- **FastAPI**: [FastAPI Docs](https://fastapi.tiangolo.com/)
- **Plotly**: [Plotly.js Docs](https://plotly.com/javascript/)

---

## ✅ Project Checklist

- [x] Backend API complete
- [x] Frontend UI complete
- [x] Database models ready
- [x] Deployment configured
- [x] Documentation written
- [x] All features implemented
- [x] Ready for production

---

**Last Updated:** February 3, 2026
**Status:** ✅ PRODUCTION READY

**Ready to start? → Read [QUICKSTART.md](QUICKSTART.md)**
