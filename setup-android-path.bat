@echo off
REM Batch Script to Add ADB to System PATH
REM Right-click this file and select "Run as administrator"

echo ========================================
echo   Android ADB PATH Setup Script
echo ========================================
echo.

REM Check for admin rights
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ERROR: This script must be run as Administrator!
    echo.
    echo How to run as Administrator:
    echo 1. Right-click this file
    echo 2. Select "Run as administrator"
    echo.
    pause
    exit /b 1
)

set ADB_PATH=C:\Users\Mahmo\Downloads\platform-tools-latest-windows\platform-tools

REM Check if the path exists
if not exist "%ADB_PATH%" (
    echo ERROR: ADB folder not found at: %ADB_PATH%
    echo Please verify the path and try again.
    echo.
    pause
    exit /b 1
)

echo [OK] Found ADB folder: %ADB_PATH%
echo.

REM Add to system PATH
echo Adding ADB to system PATH...
setx /M PATH "%PATH%;%ADB_PATH%" >nul 2>&1

if %errorLevel% equ 0 (
    echo [OK] Successfully added ADB to system PATH!
    echo.
    echo ========================================
    echo   IMPORTANT - Next Steps
    echo ========================================
    echo.
    echo 1. CLOSE this window
    echo 2. CLOSE all Command Prompt windows
    echo 3. Open a NEW Command Prompt
    echo 4. Test by running: adb version
    echo.
    echo If it works, you can run: npm run android
    echo.
) else (
    echo [ERROR] Failed to update PATH!
    echo Make sure you ran this as Administrator.
    echo.
)

pause
