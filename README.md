
# Greeks Simulator

## Quickstart
```bash
git clone https://github.com/Adrienjst/greeks-simulator
cd greeks-simulator

# Backend
cd backend && python3 -m venv venv && source venv/bin/activate && pip install -r requirements.txt && uvicorn app.main:app --reload --port 8000

# Frontend (new terminal)
cd frontend && npm i && npm run dev

🚀 http://localhost:3000
