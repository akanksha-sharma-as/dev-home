#!/usr/bin/env bash
set -e

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$ROOT/backend"
echo "Starting backend..."
mvn spring-boot:run > "$ROOT/backend.log" 2>&1 &
BACKEND_PID=$!

cd "$ROOT/frontend"
echo "Installing frontend dependencies if needed..."
npm install

echo "Starting frontend..."
npm run dev -- --host 0.0.0.0 > "$ROOT/frontend.log" 2>&1 &
FRONTEND_PID=$!

trap 'kill "$BACKEND_PID" "$FRONTEND_PID" 2>/dev/null || true; exit 0' INT TERM

echo ""
echo "Backend: http://localhost:8080"
echo "Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both apps."

wait "$BACKEND_PID" "$FRONTEND_PID"
