@echo off

cd /d "%~dp0"

start cmd /k "npm run dev"

cd "server"

start cmd /k "python main.py"
