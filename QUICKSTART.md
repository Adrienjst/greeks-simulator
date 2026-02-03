# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 18+
- Python 3.9+
- PostgreSQL 12+ (or Docker)

### Step 1: Setup Database

**Option A: Using Docker (Recommended)**
```bash
chmod +x start-db.sh
./start-db.sh
# Or on Windows: docker-compose up -d postgres
```

**Option B: Local PostgreSQL**
```bash
# Create database
createdb -U postgres greeks_simulator

# Update .env
cp .env.example .env
# Edit .env with your credentials
```

### Step 2: Backend Setup

```bash
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --reload
```

✅ Backend running at: http://localhost:8000

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

✅ Frontend running at: http://localhost:3000

### Step 4: Test the App

1. Open http://localhost:3000 in your browser
2. Go to Calculator page
3. Enter parameters and click "Calculate Greeks"
4. You should see option Greeks and P&L surface

## 🎮 Using the App

### Greeks Calculator
1. Enter option parameters
2. Choose Call or Put
3. View instant Greeks and visualizations
4. Explore 3D P&L surface and scenarios

### Portfolio Analysis
1. Add multiple option positions
2. Click "Calculate Portfolio Greeks"
3. See aggregated Delta, Gamma, Vega, Rho, Theta
4. Calculate hedge ratios

### Backtester
1. Choose a strategy
2. Set date range and initial capital
3. Run backtest
4. Review equity curve and performance metrics

## 📚 API Documentation

Visit http://localhost:8000/docs for interactive API documentation

### Key Endpoints

```bash
# Calculate Greeks
curl -X POST http://localhost:8000/api/calculator/greeks \
  -H "Content-Type: application/json" \
  -d '{
    "underlying_price": 100,
    "strike_price": 100,
    "time_to_expiration": 0.25,
    "risk_free_rate": 0.05,
    "volatility": 0.25,
    "option_type": "call"
  }'

# Scenario Analysis
curl -X POST http://localhost:8000/api/calculator/scenario-analysis \
  -H "Content-Type: application/json" \
  -d '{
    "underlying_price": 100,
    "strike_price": 100,
    "time_to_expiration": 0.25,
    "risk_free_rate": 0.05,
    "volatility": 0.25,
    "option_type": "call",
    "price_shocks": [-0.05, 0, 0.05],
    "iv_shocks": [-0.10, 0, 0.10]
  }'
```

## 🐛 Troubleshooting

### "Connection refused" on backend startup
- Check PostgreSQL is running: `pg_isready`
- Verify DATABASE_URL in .env

### Frontend shows "API error"
- Check backend is running at http://localhost:8000
- Open browser console (F12) for error details
- Verify REACT_APP_API_URL is correct

### "Module not found" errors
- Frontend: `cd frontend && npm install`
- Backend: `cd backend && pip install -r requirements.txt`

### Port already in use
- Frontend: `npm run dev -- --port 3001`
- Backend: `uvicorn app.main:app --reload --port 8001`

## 📖 Next Steps

1. **Explore the Code**
   - Frontend components in `frontend/src/components/`
   - Backend services in `backend/app/services/`

2. **Customize**
   - Add new strategies in `backtester.py`
   - Modify UI colors in `frontend/src/index.css`
   - Extend Greeks calculations

3. **Deploy**
   - See [DEPLOYMENT.md](DEPLOYMENT.md) for production setup
   - Deploy frontend to Vercel: `npm i -g vercel && vercel`
   - Deploy backend to Railway/Render

## 💡 Tips

- Use the Swagger UI at `/docs` to test API endpoints
- Check browser DevTools for frontend issues
- Use `uvicorn app.main:app --reload --log-level debug` for verbose logs
- Create `.env.local` in frontend for local overrides
- Add custom strategies by extending `StrategyBacktester` class

## 🎓 Learning Resources

- **Options Trading**: [Investopedia Greeks Guide](https://www.investopedia.com/terms/g/the-greeks.asp)
- **Black-Scholes**: [Wikipedia](https://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model)
- **React**: [Official Docs](https://react.dev/)
- **FastAPI**: [Official Docs](https://fastapi.tiangolo.com/)
- **Plotly.js**: [Documentation](https://plotly.com/javascript/)

## ❓ FAQ

**Q: Can I use real market data?**
A: Yes! Extend the backtest endpoint to accept real historical data feeds.

**Q: How do I add authentication?**
A: Use FastAPI's built-in security features and add JWT tokens.

**Q: Can I deploy for free?**
A: Yes! Frontend on Vercel (free), backend on Railway free tier with $5/month credit.

**Q: How do I add more Greeks?**
A: They're already calculated (Delta, Gamma, Vega, Rho, Theta). Customize display in components.

---

**Questions?** Check README.md and DEPLOYMENT.md for more details!
