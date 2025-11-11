# Verification Script for JavaPrepHub Setup

Write-Host "JavaPrepHub Setup Verification" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Check Node.js version
Write-Host "1. Checking Node.js version..." -ForegroundColor Yellow
$nodeVersion = node --version
Write-Host "   Node.js: $nodeVersion" -ForegroundColor Green
if ([int]($nodeVersion -replace 'v(\d+)\..*', '$1') -lt 18) {
    Write-Host "   ⚠️  Warning: Node.js 18+ recommended" -ForegroundColor Red
}

# Check if node_modules exists
Write-Host "2. Checking dependencies..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   ✓ node_modules exists" -ForegroundColor Green
} else {
    Write-Host "   ✗ node_modules not found - run 'npm install'" -ForegroundColor Red
    exit 1
}

# Check key files
Write-Host "3. Checking project structure..." -ForegroundColor Yellow
$files = @(
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/globals.css",
    "tailwind.config.ts",
    "next.config.js",
    "package.json"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "   ✓ $file" -ForegroundColor Green
    } else {
        Write-Host "   ✗ $file not found" -ForegroundColor Red
    }
}

# Check if .next exists (build cache)
Write-Host "4. Checking build cache..." -ForegroundColor Yellow
if (Test-Path ".next") {
    Write-Host "   ✓ .next directory exists (build cache present)" -ForegroundColor Green
} else {
    Write-Host "   ℹ .next directory not found (will be created on first build)" -ForegroundColor Cyan
}

# Check port 3000
Write-Host "5. Checking port 3000..." -ForegroundColor Yellow
$port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port) {
    Write-Host "   ⚠️  Port 3000 is in use (dev server may already be running)" -ForegroundColor Yellow
} else {
    Write-Host "   ✓ Port 3000 is available" -ForegroundColor Green
}

Write-Host ""
Write-Host "Verification Complete!" -ForegroundColor Cyan
Write-Host ""
Write-Host "To start the development server:" -ForegroundColor Yellow
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Then open:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""

