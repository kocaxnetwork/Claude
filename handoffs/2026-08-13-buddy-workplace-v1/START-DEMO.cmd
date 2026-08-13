@echo off
setlocal
cd /d "%~dp0"
where node >nul 2>nul || (echo Node.js 24 or newer is required. & exit /b 1)
if not exist node_modules call npm ci
if errorlevel 1 exit /b 1
call npm run dev
