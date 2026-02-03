#!/bin/bash

# Start PostgreSQL with Docker
echo "Starting PostgreSQL..."
docker-compose up -d postgres

echo "Waiting for PostgreSQL to be ready..."
sleep 5

# Create database
PGPASSWORD=admin123 psql -h localhost -U admin -d postgres -c "CREATE DATABASE greeks_simulator;" 2>/dev/null || true

echo "Database setup complete!"
echo "PostgreSQL is running on localhost:5432"
echo "Database: greeks_simulator"
echo "User: admin"
echo "Password: admin123"
