#!/bin/bash

echo "========================================"
echo "  Accessibility Checker Web App"
echo "========================================"
echo ""
echo "Starting Flask API server..."
python3 app.py &
FLASK_PID=$!
sleep 3
echo ""
echo "Starting React frontend..."
npm run dev &
FRONTEND_PID=$!
echo ""
echo "========================================"
echo "  Servers are running!"
echo "  API: http://localhost:5000"
echo "  Web: http://localhost:3000"
echo "========================================"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for Ctrl+C
trap "kill $FLASK_PID $FRONTEND_PID; exit" INT
wait

