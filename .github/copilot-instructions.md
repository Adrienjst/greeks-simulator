## Derivatives Greeks Simulator & Backtester

### Project Overview
Full-stack options trading analysis platform with React frontend, FastAPI backend, and PostgreSQL database. Provides real-time Greeks calculation, scenario analysis, portfolio aggregation, and strategy backtesting.

### Architecture
- **Frontend**: React 18 + TypeScript + Vite + Plotly.js/Recharts
- **Backend**: FastAPI + SQLAlchemy + PostgreSQL
- **Deployment**: Vercel (frontend) + Railway/Render (backend)

### Key Features Implemented
1. **Greeks Calculator**: Black-Scholes Greeks (Delta, Gamma, Vega, Rho, Theta)
2. **Scenario Engine**: What-if analysis with price/IV shocks and theta decay
3. **Portfolio Analysis**: Aggregated Greeks across multiple options
4. **Backtester**: Strategy testing over historical data
5. **3D Visualizations**: P&L surfaces using Plotly

### Development Guidelines
- Use TypeScript for type safety in frontend
- Keep FastAPI routes RESTful and well-documented
- Maintain separation of concerns (models/services/routers)
- Use environment variables for configuration
- Always include error handling and validation

### Important Files
- Frontend entry: `frontend/src/main.tsx`
- Backend entry: `backend/app/main.py`
- API schemas: `backend/app/schemas.py`
- Business logic: `backend/app/services/`
- React components: `frontend/src/components/`
- Database: PostgreSQL with SQLAlchemy models

### Common Tasks

#### Add New Greeks Calculator Feature
1. Add schema in `backend/app/schemas.py`
2. Create service method in `backend/app/services/greeks_calculator.py`
3. Add endpoint in `backend/app/routers/calculator.py`
4. Create React component in `frontend/src/components/`
5. Add API call in `frontend/src/services/api.ts`

#### Add New Strategy to Backtester
1. Implement logic in `backend/app/services/backtester.py`
2. Add strategy to `StrategyBacktester.backtest_strategy()`
3. Update strategy list in `backend/app/routers/backtest.py`
4. Add UI controls in `frontend/src/pages/BacktestPage.tsx`

#### Deploy Changes
1. Commit code to GitHub
2. Frontend: Vercel auto-deploys from main branch
3. Backend: Railway/Render redeploys on GitHub push

### Environment Variables
```
DATABASE_URL=postgresql://...
REACT_APP_API_URL=http://localhost:8000
BACKEND_URL=http://localhost:8000
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin123
POSTGRES_DB=greeks_simulator
```

### Testing Workflow
1. Backend: `pytest` for unit tests (create `backend/tests/` directory)
2. Frontend: `npm test` for React component tests
3. API: Swagger UI at `http://localhost:8000/docs`

### Performance Considerations
- Cache Greeks calculations for frequently used strikes/expirations
- Use database indexes for option chain lookups
- Implement pagination for backtest results
- Lazy-load 3D surfaces to prevent UI blocking

### Known Limitations & Future Enhancements
- Currently uses constant volatility (add local/stochastic models)
- Mock historical data in backtest (integrate real data feeds)
- No user authentication (add JWT tokens)
- No rate limiting (add for production)
- Manual portfolio management (add CSV import)

### Code Style
- Backend: PEP 8, type hints required
- Frontend: ESLint config provided, Prettier formatting
- Comments for complex algorithms (Greeks calculations)
- Descriptive variable names over comments where possible

### Resources
- Black-Scholes: https://en.wikipedia.org/wiki/Black–Scholes_model
- FastAPI: https://fastapi.tiangolo.com/
- React: https://react.dev/
- QuantLib: https://www.quantlib.org/ (for advanced models)
