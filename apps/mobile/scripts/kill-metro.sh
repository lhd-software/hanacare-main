#!/bin/bash
# Script to kill Metro bundler process on port 8081

PORT=8081
PID=$(lsof -ti:$PORT)

if [ -z "$PID" ]; then
    echo "✅ No process running on port $PORT"
else
    echo "Killing process $PID on port $PORT..."
    kill $PID
    sleep 1
    if lsof -ti:$PORT > /dev/null 2>&1; then
        echo "Force killing..."
        kill -9 $PID
    fi
    echo "✅ Metro bundler stopped"
fi

