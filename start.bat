@echo off
echo ========================================
echo   Accessibility Checker Web App
echo ========================================
echo.
echo Starting Flask API server...
start "Flask API" cmd /k "python app.py"
timeout /t 3 /nobreak >nul
echo.
echo Starting React frontend...
start "React Frontend" cmd /k "npm run dev"
echo.
echo ========================================
echo   Servers are starting!
echo   API: http://localhost:5000
echo   Web: http://localhost:3000
echo ========================================
echo.
echo Press any key to exit...
pause >nul

