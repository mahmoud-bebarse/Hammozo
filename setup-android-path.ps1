# PowerShell Script to Add ADB to System PATH
# Run as Administrator: Right-click → "Run as Administrator"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Android ADB PATH Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# ADB platform-tools path
$adbPath = "C:\Users\Mahmo\Downloads\platform-tools-latest-windows\platform-tools"

# Check if the path exists
if (-Not (Test-Path $adbPath)) {
    Write-Host "ERROR: ADB folder not found at: $adbPath" -ForegroundColor Red
    Write-Host "Please verify the path and try again." -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host "✓ Found ADB folder: $adbPath" -ForegroundColor Green
Write-Host ""

# Get current system PATH
$currentPath = [Environment]::GetEnvironmentVariable("Path", "Machine")

# Check if ADB path is already in PATH
if ($currentPath -like "*$adbPath*") {
    Write-Host "✓ ADB is already in your PATH!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Current PATH includes: $adbPath" -ForegroundColor Yellow
} else {
    Write-Host "Adding ADB to system PATH..." -ForegroundColor Yellow

    # Add to PATH
    $newPath = $currentPath + ";" + $adbPath

    try {
        [Environment]::SetEnvironmentVariable("Path", $newPath, "Machine")
        Write-Host "✓ Successfully added ADB to system PATH!" -ForegroundColor Green
    } catch {
        Write-Host "ERROR: Failed to update PATH. Make sure you're running as Administrator!" -ForegroundColor Red
        Write-Host ""
        Write-Host "To run as Administrator:" -ForegroundColor Yellow
        Write-Host "1. Right-click on this file" -ForegroundColor Yellow
        Write-Host "2. Select 'Run with PowerShell'" -ForegroundColor Yellow
        Write-Host "3. Or open PowerShell as Administrator and run: .\setup-android-path.ps1" -ForegroundColor Yellow
        Write-Host ""
        Read-Host "Press Enter to exit"
        exit 1
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Verification" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Refresh environment variables in current session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

# Test ADB
Write-Host "Testing ADB command..." -ForegroundColor Yellow
try {
    $adbVersion = & "$adbPath\adb.exe" version 2>&1
    Write-Host "✓ ADB is working!" -ForegroundColor Green
    Write-Host ""
    Write-Host "ADB Version:" -ForegroundColor Cyan
    Write-Host $adbVersion
} catch {
    Write-Host "⚠ Could not execute ADB directly" -ForegroundColor Yellow
    Write-Host "You may need to restart your terminal or computer" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Next Steps" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. CLOSE this PowerShell window" -ForegroundColor Yellow
Write-Host "2. CLOSE any open Command Prompt or Git Bash windows" -ForegroundColor Yellow
Write-Host "3. Open a NEW terminal window" -ForegroundColor Yellow
Write-Host "4. Test by running: adb version" -ForegroundColor Yellow
Write-Host ""
Write-Host "If 'adb version' works, you're ready to run:" -ForegroundColor Green
Write-Host "   npm run android" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan

Read-Host "Press Enter to exit"
