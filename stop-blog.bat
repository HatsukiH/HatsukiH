@echo off
setlocal enableextensions enabledelayedexpansion
cd /d "%~dp0"
set "PORT=4321"
set "KILLED=0"

rem ============================================================
rem  Stop the Fuwari blog dev server
rem  Kills whatever process is listening on PORT (4321)
rem ============================================================

for /f "tokens=5" %%P in ('netstat -ano ^| findstr /c:":%PORT%" ^| findstr /i "LISTENING"') do (
    set "KILLED=1"
    echo [i] Stopping process PID %%P ...
    taskkill /F /T /PID %%P >nul 2>&1
)

if "%KILLED%"=="0" (
    echo [i] Nothing is listening on port %PORT%. Server is already stopped.
) else (
    echo [i] Done. Port %PORT% is now free.
)

pause
