#!/bin/bash
echo "🛑 Stopping Greeks Simulator..."
pkill -f "uvicorn app.main"
pkill -f "vite"
echo "✓ All servers stopped"
