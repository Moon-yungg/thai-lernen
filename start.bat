@echo off
rem Baut die App und startet den lokalen Server (HTTPS im Heimnetz, mit Laut- und Tonanalyse).
cd /d "%~dp0"
if not exist server\.venv (
  echo Erstinstallation ...
  py -m venv server\.venv
  server\.venv\Scripts\python -m pip install torch torchaudio --index-url https://download.pytorch.org/whl/cu128
  server\.venv\Scripts\python -m pip install -r server\requirements.txt
)
if not exist node_modules call npm install
call npm run build
server\.venv\Scripts\python server\run.py
pause
