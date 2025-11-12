# PowerShell script to clean and restart Next.js dev server

Write-Host "Cleaning Next.js cache..." -ForegroundColor Cyan

# Kill any running Node processes (optional - be careful!)
# Get-Process -Name node -ErrorAction SilentlyContinue | Stop-Process -Force

# Clean .next directory
if (Test-Path .next) {
    Remove-Item -Recurse -Force .next
    Write-Host "✓ Cleaned .next directory" -ForegroundColor Green
}

# Clean node_modules cache
if (Test-Path node_modules\.cache) {
    Remove-Item -Recurse -Force node_modules\.cache
    Write-Host "✓ Cleaned node_modules cache" -ForegroundColor Green
}

Write-Host "`nStarting Next.js dev server..." -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop the server`n" -ForegroundColor Yellow

npm run dev


