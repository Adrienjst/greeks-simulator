#!/bin/bash

echo "🚀 Starting Greeks Simulator..."

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

# Backend setup
echo -e "${BLUE}[1/4] Setting up backend...${NC}"
cd backend
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi
source venv/bin/activate
pip install -q -r requirements.txt
echo -e "${GREEN}✓ Backend ready${NC}"

# Frontend setup
echo -e "${BLUE}[2/4] Setting up frontend...${NC}"
cd ../frontend
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install --silent
fi
echo -e "${GREEN}✓ Frontend ready${NC}"

# Start backend in background
echo -e "${BLUE}[3/4] Starting backend server...${NC}"
cd ../backend
source venv/bin/activate
uvicorn app.main:app --reload --port 8000 > /dev/null 2>&1 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend running (PID: $BACKEND_PID)${NC}"

# Start frontend
echo -e "${BLUE}[4/4] Starting frontend...${NC}"
cd ../frontend
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Frontend running (PID: $FRONTEND_PID)${NC}"

echo ""
echo -e "${GREEN}════════════════════════════════════${NC}"
echo -e "${GREEN}  Greeks Simulator is running! 🎉${NC}"
echo -e "${GREEN}════════════════════════════════════${NC}"
echo ""
echo -e "  📊 App:      ${BLUE}http://localhost:3000${NC}"
echo -e "  🔧 Backend:  ${BLUE}http://localhost:8000${NC}"
echo -e "  📝 Docs:     ${BLUE}http://localhost:8000/docs${NC}"
echo ""
echo -e "Press ${BLUE}Ctrl+C${NC} to stop all servers"
echo ""

# Trap Ctrl+C to kill both processes
trap "echo ''; echo 'Stopping servers...'; kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" INT

# Keep script running
wait
