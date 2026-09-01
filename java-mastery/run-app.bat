@echo off
setlocal
cd /d "%~dp0"

echo Starting Java Mastery backend in the current terminal...
start /B "" cmd /c "cd /d "%~dp0\backend" && mvn spring-boot:run"

echo Starting Java Mastery frontend in the current terminal...
start /B "" cmd /c "cd /d "%~dp0\frontend" && npm install && npm run dev -- --host 0.0.0.0"

echo.
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
echo.
echo Both applications are starting in the same terminal session.
exit /b 0
