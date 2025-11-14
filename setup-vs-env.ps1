# Setup Visual Studio Environment for Rust
# This script sets up the Visual Studio environment variables that Rust needs

Write-Host "Setting up Visual Studio environment..." -ForegroundColor Cyan

# Find Visual Studio installation
$vsPaths = @(
    "${env:ProgramFiles}\Microsoft Visual Studio\2022\Community",
    "${env:ProgramFiles}\Microsoft Visual Studio\2022\BuildTools",
    "${env:ProgramFiles(x86)}\Microsoft Visual Studio\2022\Community",
    "${env:ProgramFiles(x86)}\Microsoft Visual Studio\2022\BuildTools"
)

$vsPath = $null
foreach ($path in $vsPaths) {
    if (Test-Path $path) {
        $vsPath = $path
        Write-Host "Found Visual Studio at: $vsPath" -ForegroundColor Green
        break
    }
}

if (-not $vsPath) {
    Write-Host "Visual Studio not found in standard locations." -ForegroundColor Red
    Write-Host "Please ensure Visual Studio 2022 is installed." -ForegroundColor Yellow
    exit 1
}

# Find vcvars64.bat
$vcvarsPath = Join-Path $vsPath "VC\Auxiliary\Build\vcvars64.bat"
if (-not (Test-Path $vcvarsPath)) {
    Write-Host "vcvars64.bat not found at: $vcvarsPath" -ForegroundColor Red
    exit 1
}

Write-Host "Found vcvars64.bat at: $vcvarsPath" -ForegroundColor Green
Write-Host ""
Write-Host "To use Visual Studio environment, run:" -ForegroundColor Yellow
Write-Host "  cmd /c `"$vcvarsPath`" && npm run tauri dev" -ForegroundColor White
Write-Host ""
Write-Host "Or set environment manually:" -ForegroundColor Yellow
Write-Host "  cmd /c `"$vcvarsPath`" && set" -ForegroundColor White

