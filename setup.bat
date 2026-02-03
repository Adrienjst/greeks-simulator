@echo off
REM Colors for output (Windows doesn't have native color support, so we'll just use echo)

echo ================================
echo Greeks Simulator Setup
echo ================================
echo.

REM Check prerequisites
echo Checking prerequisites...

python --version >nul 2>&1
if errorlevel 1 (
    echo Python 3 is required but not installed.
    exit /b 1
)

node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js is required but not installed.
    exit /b 1
)

echo Prerequisites check complete
echo.

REM Backend setup
echo Setting up backend...
cd backend

if not exist "venv" (
    python -m venv venv
    echo Virtual environment created
)

call venv\Scripts\activate.bat
pip install -r requirements.txt
echo Backend dependencies installed

cd ..

REM Frontend setup
echo Setting up frontend...
cd frontend
npm install
echo Frontend dependencies installed
cd ..

REM Environment setup
echo Setting up environment...
if not exist ".env" (
    copy .env.example .env
    echo .env file created
    echo WARNING: Please update .env with your PostgreSQL credentials
)

echo.
echo ================================
echo Setup Complete!
echo ================================
echo.

echo Next steps:
echo 1. Update .env with your PostgreSQL credentials
echo 2. Start PostgreSQL (local or Docker)
echo 3. Run backend: cd backend && venv\Scripts\activate.bat && uvicorn app.main:app --reload
echo 4. Run frontend: cd frontend && npm run dev
echo 5. Open http://localhost:3000
