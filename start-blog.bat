@echo off
setlocal enableextensions enabledelayedexpansion
cd /d "%~dp0"
set "PORT=4321"

rem ============================================================
rem  Start the Fuwari blog dev server
rem  (this file must stay in the blog project root)
rem ============================================================

rem --- 1. make sure "node" is available in this console ---
where node >nul 2>&1
if not errorlevel 1 (
    rem node already on PATH - nothing to do
) else (
    if exist "C:\Users\1\.workbuddy\binaries\node\versions\22.22.2-2\node.exe" set "PATH=C:\Users\1\.workbuddy\binaries\node\versions\22.22.2-2;%PATH%"
    if exist "C:\Program Files\nodejs\node.exe" set "PATH=C:\Program Files\nodejs;%PATH%"
    where node >nul 2>&1
    if errorlevel 1 (
        echo [x] Node.js not found. Please install Node.js 20 or newer.
        pause
        exit /b 1
    )
)

rem --- 2. if already running, just open the browser ---
netstat -ano | findstr /c:":%PORT%" | findstr /i "LISTENING" >nul 2>&1
if not errorlevel 1 (
    echo [i] Dev server is already running on port %PORT%.
    start "" "http://127.0.0.1:%PORT%/"
    echo     Opened http://127.0.0.1:%PORT%/ in your browser.
    timeout /t 2 >nul
    exit /b 0
)

rem --- 3. start the server (runs in this window) ---
echo [i] Starting Fuwari dev server ...
echo     URL : http://127.0.0.1:%PORT%/
echo     Stop: close this window, press Ctrl+C, or run stop-blog.bat
echo.
call "node_modules\.bin\astro.CMD" dev --host 127.0.0.1 --port %PORT%

echo.
echo [i] Dev server has stopped.
pause
