# 🎨 Project Architecture & Features Overview

## 📐 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         USER BROWSER                         │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ HTTP/REST
                              │
         ┌────────────────────┴────────────────────┐
         │                                         │
┌────────▼────────────┐              ┌────────────▼─────────────┐
│  REACT FRONTEND     │              │   FASTAPI BACKEND       │
│  (Vercel Deployed)  │              │ (Railway/Render Deploy) │
│                     │              │                        │
│ - React 18          │              │ - Python/FastAPI       │
│ - TypeScript         │              │ - SQLAlchemy ORM       │
│ - Vite Build        │              │ - Pydantic Schemas     │
│ - Plotly Charts     │              │ - NumPy/SciPy          │
│ - Zustand Store     │              │                        │
│ - Tailwind CSS      │◄────────────►│ - Black-Scholes Math  │
└─────────────────────┘              │ - Greeks Calculation   │
                                    │ - Scenario Engine      │
                                    │ - Backtester          │
                                    │ - Portfolio Aggregator │
                                    └────────────┬───────────┘
                                                │
                                                │ SQL
                                                │
                                    ┌──────────▼────────┐
                                    │   PostgreSQL      │
                                    │   Database        │
                                    │                   │
                                    │ - Option Chains   │
                                    │ - Historical Data │
                                    │ - Positions       │
                                    │ - Backtest Results│
                                    └───────────────────┘
```

## 🎯 Feature Map

### Greeks Calculator
```
User Input Parameters
    ↓
Black-Scholes Model
    ├── d1 calculation
    ├── d2 calculation
    └── Greek formulas
        ├── Delta (price sensitivity)
        ├── Gamma (delta acceleration)
        ├── Vega (IV sensitivity)
        ├── Rho (rate sensitivity)
        ├── Theta (time decay)
        └── Price
    ↓
Visualizations
    ├── Greeks Display
    ├── 3D P&L Surface
    └── Scenario Analysis
```

### Portfolio Analysis
```
Multiple Positions
    ├── Strike 100 Call x 10
    ├── Strike 110 Call x 5
    └── Strike 95 Put x 3
    ↓
Aggregate Greeks
    ├── Sum all Deltas
    ├── Sum all Gammas
    ├── Sum all Vegas
    ├── Sum all Rhos
    └── Sum all Thetas
    ↓
Hedge Calculation
    ├── Delta-hedge shares
    ├── Gamma hedge
    └── Vega hedge
```

### Strategy Backtester
```
Strategy Parameters
    └── Type (call, spread, straddle, etc.)
Historical Price Data
    └── Generate mock/real prices
Entry Signals
    └── Calculate option prices
Position Management
    └── Track P&L over time
Exit Signals
    └── Upon expiration
Performance Metrics
    ├── Total Return
    ├── Max Drawdown
    ├── Sharpe Ratio
    ├── Win Rate
    └── Equity Curve
```

## 📊 Data Flow

### Greeks Calculation Flow
```
Frontend Form Input
    ↓
API Call: POST /api/calculator/greeks
    ↓
Backend Receives JSON
    ├── Validate with Pydantic
    └── Extract parameters
    ↓
BlackScholesCalculator.calculate_greeks()
    ├── Calculate d1, d2
    ├── Use norm.cdf() for probabilities
    ├── Compute each Greek
    └── Return as JSON
    ↓
Frontend Receives Response
    ├── Update UI with numbers
    ├── Call 3D surface endpoint
    └── Display visualizations
```

### Portfolio Aggregation Flow
```
User Adds Positions
    ├── Strike, Option Type, Qty
    └── Stored in Zustand
    ↓
User Clicks "Calculate"
    ↓
API Call: POST /api/portfolio/aggregate-greeks
    └── Send all positions as JSON
    ↓
Backend PortfolioAggregator
    ├── For each position:
    │   └── Calculate individual Greeks
    ├── Multiply by quantity
    └── Sum all values
    ↓
Return aggregated Greeks
    ↓
Frontend Displays
    ├── Total Greeks
    ├── Position list
    └── Hedge recommendations
```

## 🧮 Mathematical Foundation

### Black-Scholes Greeks Formulas

```
d1 = [ln(S/K) + (r - q + σ²/2)T] / (σ√T)
d2 = d1 - σ√T

CALL PRICE = S*e^(-qT)*N(d1) - K*e^(-rT)*N(d2)
PUT PRICE = K*e^(-rT)*N(-d2) - S*e^(-qT)*N(-d1)

DELTA (Call) = e^(-qT)*N(d1)
GAMMA = e^(-qT)*n(d1) / (S*σ*√T)
VEGA = S*e^(-qT)*n(d1)*√T / 100
RHO (Call) = K*T*e^(-rT)*N(d2) / 100
THETA = [Complex formula involving d1, d2]

Where:
- N() = cumulative normal distribution
- n() = standard normal PDF
- S = stock price
- K = strike price
- T = time to expiration (years)
- r = risk-free rate
- σ = volatility
- q = dividend yield
```

## 🎮 User Interface Flows

### Main Calculator Flow
```
Landing Page
    ├── Greeks Input Form (left)
    ├── Greeks Display (right)
    └── Browse existing calcs
    ↓
User Enters Parameters
    ├── Underlying: 100
    ├── Strike: 100
    ├── Time: 3 months (0.25)
    ├── Rate: 5%
    ├── Volatility: 25%
    └── Type: Call
    ↓
Click "Calculate"
    ├── Form validates
    └── API call sent
    ↓
Results Display
    ├── Greeks numbers appear
    ├── 3D chart loads
    └── Scenario table visible
    ↓
Interactive Exploration
    ├── Adjust parameters
    ├── See real-time updates
    ├── Rotate 3D surface
    └── View scenario tables
```

### Portfolio Management Flow
```
Portfolio Page
    ├── Position form (left)
    └── Aggregated Greeks (right)
    ↓
Add Position
    ├── Fill in strike, qty
    ├── Default parameters
    └── Click "Add"
    ↓
Position Added
    ├── Appears in list
    ├── Can add more
    └── Remove with button
    ↓
Calculate Portfolio
    ├── Click button
    ├── API processes
    └── Results display
    ↓
View Results
    ├── Total Greeks
    ├── Position breakdown
    └── Hedge recommendations
```

### Backtester Flow
```
Backtest Page
    ├── Parameters form (left)
    └── Results panel (right)
    ↓
Configure Strategy
    ├── Select strategy type
    ├── Set ticker (SPY, QQQ, etc)
    ├── Date range
    ├── Initial capital
    └── Strategy parameters
    ↓
Run Backtest
    ├── Click button
    ├── Backend processes
    └── Shows progress
    ↓
Results Display
    ├── Metrics grid
    │   ├── Total return %
    │   ├── Max drawdown %
    │   ├── Sharpe ratio
    │   └── Final equity
    └── Equity curve chart
    ↓
Analysis
    ├── Inspect equity curve
    ├── Identify drawdowns
    ├── Calculate win rate
    └── Compare strategies
```

## 🔌 API Specification

### Request/Response Example

**Request**
```json
{
  "underlying_price": 100,
  "strike_price": 100,
  "time_to_expiration": 0.25,
  "risk_free_rate": 0.05,
  "volatility": 0.25,
  "option_type": "call",
  "dividend_yield": 0.0
}
```

**Response**
```json
{
  "delta": 0.6368,
  "gamma": 0.0186,
  "vega": 19.8,
  "rho": 19.6,
  "theta": -0.0307,
  "price": 10.45
}
```

## 🗂️ Component Hierarchy

```
App.tsx
├── Header
│   ├── Home Link
│   ├── Portfolio Link
│   └── Backtest Link
│
├── CalculatorPage
│   ├── GreeksInputForm
│   ├── GreeksDisplay
│   ├── PnLSurfaceChart
│   └── ScenarioAnalysis
│
├── PortfolioPage
│   ├── Portfolio Form
│   ├── PortfolioGreeksDisplay
│   └── Position List
│
└── BacktestPage
    ├── Backtest Form
    ├── Results Metrics
    └── Equity Curve Chart
```

## 📱 Responsive Design

```
Desktop (1920px+)
├── Sidebar (optional)
└── Main content (3-column layout)

Tablet (768px - 1024px)
├── 2-column layout
└── Stacked components

Mobile (< 768px)
├── Full-width single column
├── Collapsed navigation
└── Simplified charts
```

## 🔄 State Management (Zustand)

```
greeksStore
├── underlyingPrice
├── strikePrice
├── timeToExpiration
├── riskFreeRate
├── volatility
├── optionType
└── setters for each

portfolioStore
├── positions: []
├── addPosition()
├── removePosition()
└── updatePosition()
```

## ⚡ Performance Optimizations

```
Frontend
├── Lazy load 3D surfaces
├── Memoize expensive computations
├── Cache API responses
├── Minimize re-renders
└── Code splitting with Vite

Backend
├── Cache Greeks calculations
├── Database indexes
├── Connection pooling
├── Query optimization
└── Response compression
```

## 🚀 Deployment Pipeline

```
GitHub (main branch)
    ↓
┌───────────────────────────────────────┐
│ Continuous Deployment                 │
├───────────────┬───────────────────────┤
│               │                       │
▼               ▼                       ▼
Vercel      Railway/Render         Docker Registry
(Frontend)   (Backend)             (Backup)
    │           │
    │           ├── PostgreSQL Add-on
    │           └── Auto-scaling
    │
    └── Custom Domain
        └── SSL Certificate
```

## 📈 Performance Metrics

```
Frontend
├── Lighthouse Score: 90+ (target)
├── First Contentful Paint: < 1s
├── Time to Interactive: < 2s
└── Bundle Size: < 500KB

Backend
├── API Response Time: < 100ms
├── 3D Surface Calc: < 500ms
├── Backtest Run: < 5s (for 1 year)
└── Database Query: < 10ms
```

---

**This architecture ensures:**
- ✅ Scalability across frontend and backend
- ✅ Clean separation of concerns
- ✅ Easy to extend and maintain
- ✅ Production-ready deployment
- ✅ Real-time Greeks calculations
- ✅ Interactive visualizations
