#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Greeks Simulator Setup${NC}"
echo -e "${BLUE}================================${NC}\n"

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v python3 &> /dev/null; then
    echo "Python 3 is required but not installed."
    exit 1
fi

if ! command -v node &> /dev/null; then
    echo "Node.js is required but not installed."
    exit 1
fi

if ! command -v psql &> /dev/null; then
    echo -e "${YELLOW}PostgreSQL client not found. Make sure PostgreSQL is installed.${NC}"
fi

echo -e "${GREEN}✓ Prerequisites check complete${NC}\n"

# Backend setup
echo -e "${YELLOW}Setting up backend...${NC}"
cd backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
    echo -e "${GREEN}✓ Virtual environment created${NC}"
fi

source venv/bin/activate
pip install -r requirements.txt
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

cd ..

# Frontend setup
echo -e "${YELLOW}Setting up frontend...${NC}"
cd frontend
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
cd ..

# Environment setup
echo -e "${YELLOW}Setting up environment...${NC}"
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo -e "${GREEN}✓ .env file created${NC}"
    echo -e "${YELLOW}⚠️  Please update .env with your PostgreSQL credentials${NC}"
fi

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}================================${NC}\n"

echo -e "${BLUE}Next steps:${NC}"
echo "1. Update .env with your PostgreSQL credentials"
echo "2. Start PostgreSQL (local or Docker)"
echo "3. Run backend: cd backend && source venv/bin/activate && uvicorn app.main:app --reload"
echo "4. Run frontend: cd frontend && npm run dev"
echo "5. Open http://localhost:3000"
