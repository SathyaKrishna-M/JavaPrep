# Quick Start Script for BabuHub Development Server

Write-Host "Starting BabuHub Development Server..." -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Clean build cache
Write-Host "Cleaning build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Remove-Item -Path .next -Recurse -Force -ErrorAction SilentlyContinue
}
if (Test-Path "node_modules\.cache") {
    Remove-Item -Path node_modules\.cache -Recurse -Force -ErrorAction SilentlyContinue
}
Write-Host ""

# Start dev server
Write-Host "Starting development server on http://localhost:3000" -ForegroundColor Green
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Yellow
Write-Host ""

npm run dev

