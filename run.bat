@echo off
title WATERHALL IoT Water Management Server
echo ========================================================
echo             WATERHALL IoT MANAGEMENT SYSTEM
echo ========================================================
echo.
echo [1/2] Launching browser tabs for presentation...
start "" "http://localhost:8000/index.html?role=worker"
start "" "http://localhost:8000/index.html?role=resident"

echo [2/2] Starting Python backend server (waterhall.db)...
echo Press Ctrl+C in this window to stop the server at any time.
echo.
python server.py
pause
