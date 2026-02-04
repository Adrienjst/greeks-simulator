# Greeks Simulator

A professional options trading tool for real-time Greeks calculation and volatility surface analysis.

## Overview

Greeks Simulator provides institutional-grade options analytics through an intuitive web interface. Built for traders and quantitative analysts who need accurate, real-time derivatives pricing and risk metrics.

## Features

- Black-Scholes options pricing model implementation
- Real-time calculation of all Greeks (Delta, Gamma, Theta, Vega, Rho)
- Interactive 3D volatility surface visualization
- RESTful API for programmatic access
- Responsive web interface

## Quick Start

```bash
git clone https://github.com/Adrienjst/greeks-simulator.git
cd greeks-simulator
./start.sh

The application will be available at http://localhost:3000

Technology Stack
Backend

FastAPI (Python)

NumPy & SciPy for quantitative calculations

PostgreSQL database

SQLAlchemy ORM

Frontend

React with Vite

TailwindCSS

Modern JavaScript (ES6+)

API Documentation
Interactive API documentation is available at http://localhost:8000/docs when the backend server is running.

Manual Installation
If you prefer manual setup over the automated script:

Backend

bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
Frontend

bash
cd frontend
npm install
npm run dev
License
MIT

Author
Adrien Juste - GitHub
