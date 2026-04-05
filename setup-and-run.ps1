# ==============================================================================
# Placement Interaction System - Comprehensive Setup & Run Script
# ==============================================================================

Write-Host "🚀 Starting Placement Interaction System Setup..." -ForegroundColor Cyan

$root = "d:\sruthi"
$backend = "$root\backend"
$frontend = "$root\frontend"

# 1. Check for Java
$java = Get-Command java -ErrorAction SilentlyContinue
if (-not $java) {
    Write-Host "❌ Error: Java is not installed or not in PATH." -ForegroundColor Red
    exit
}
Write-Host "✅ Java detected: $(java -version 2>&1 | Select-Object -First 1)" -ForegroundColor Green

# 2. Setup Backend Environment
if (-not (Test-Path "$backend\.env")) {
    Copy-Item "$backend\.env.example" "$backend\.env"
    Write-Host "📝 Created .env file from template in backend." -ForegroundColor Yellow
}

# 3. Setup Frontend Environment
if (-not (Test-Path "$frontend\.env")) {
    "VITE_API_URL=http://localhost:8080" | Out-File "$frontend\.env" -Encoding utf8
    Write-Host "📝 Created .env file in frontend." -ForegroundColor Yellow
}

# 4. Instructions
Write-Host "`n==============================================================================" -ForegroundColor White
Write-Host "  HOW TO RUN THE APPLICATION:" -ForegroundColor Yellow
Write-Host "==============================================================================" -ForegroundColor White
Write-Host "  1. BACKEND: Open '$backend' in IntelliJ IDEA or VS Code."
Write-Host "     - Run 'PlacementSystemApplication.java'."
Write-Host "     - It will start on http://localhost:8080."
Write-Host "     - Demo data will be seeded automatically (H2 database)."
Write-Host ""
Write-Host "  2. FRONTEND: Open a terminal in '$frontend'."
Write-Host "     - Run 'npm install' (if first time)."
Write-Host "     - Run 'npm run dev'."
Write-Host "     - Open http://localhost:5173 in your browser."
Write-Host "`n  LOGIN CREDENTIALS (DEMO):" -ForegroundColor Cyan
Write-Host "  - Student:  arjun@student.edu / Student@1234"
Write-Host "  - Employer: hr@google.com / Employer@1234"
Write-Host "  - Officer:  officer@placement.edu / Officer@1234"
Write-Host "  - Admin:    admin@placement.edu / Admin@1234"
Write-Host "==============================================================================`n" -ForegroundColor White
