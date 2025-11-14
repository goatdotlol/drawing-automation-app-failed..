# Visual Studio Build Tools Installation Guide
# This script provides instructions and downloads the installer

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Visual Studio Build Tools Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Rust requires Visual Studio Build Tools with C++ support." -ForegroundColor Yellow
Write-Host ""

# Check if link.exe exists in common locations
$linkPaths = @(
    "${env:ProgramFiles}\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\*\bin\Hostx64\x64\link.exe",
    "${env:ProgramFiles(x86)}\Microsoft Visual Studio\2022\BuildTools\VC\Tools\MSVC\*\bin\Hostx64\x64\link.exe",
    "${env:ProgramFiles}\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\*\bin\Hostx64\x64\link.exe",
    "${env:ProgramFiles(x86)}\Microsoft Visual Studio\2022\Community\VC\Tools\MSVC\*\bin\Hostx64\x64\link.exe"
)

$found = $false
foreach ($path in $linkPaths) {
    $files = Get-ChildItem -Path $path -ErrorAction SilentlyContinue
    if ($files) {
        Write-Host "Build Tools appear to be installed!" -ForegroundColor Green
        Write-Host "Found: $($files[0].FullName)" -ForegroundColor Green
        $found = $true
        break
    }
}

if (-not $found) {
    Write-Host "Build Tools not found. Installation required." -ForegroundColor Red
    Write-Host ""
    Write-Host "OPTION 1: Download Build Tools Installer (Recommended)" -ForegroundColor Cyan
    Write-Host "1. Downloading installer..." -ForegroundColor Yellow
    
    $vsInstallerUrl = "https://aka.ms/vs/17/release/vs_buildtools.exe"
    $vsInstallerPath = "$env:TEMP\vs_buildtools.exe"
    
    try {
        Invoke-WebRequest -Uri $vsInstallerUrl -OutFile $vsInstallerPath -UseBasicParsing
        Write-Host "Download complete!" -ForegroundColor Green
        Write-Host ""
        Write-Host "Starting installer..." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "IMPORTANT: During installation, select:" -ForegroundColor Yellow
        Write-Host "  - 'Desktop development with C++' workload" -ForegroundColor White
        Write-Host "  - Windows 10/11 SDK (latest version)" -ForegroundColor White
        Write-Host ""
        
        Start-Process -FilePath $vsInstallerPath -Wait
        
        Write-Host ""
        Write-Host "After installation completes:" -ForegroundColor Cyan
        Write-Host "1. Close and reopen your terminal" -ForegroundColor White
        Write-Host "2. Run: npm run tauri dev" -ForegroundColor White
        Write-Host ""
    } catch {
        Write-Host "Error downloading installer: $_" -ForegroundColor Red
        Write-Host ""
        Write-Host "Please install manually:" -ForegroundColor Yellow
        Write-Host "1. Visit: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022" -ForegroundColor White
        Write-Host "2. Download 'Build Tools for Visual Studio 2022'" -ForegroundColor White
        Write-Host "3. Run the installer and select 'Desktop development with C++'" -ForegroundColor White
    }
} else {
    Write-Host ""
    Write-Host "If you're still getting linker errors, try:" -ForegroundColor Yellow
    Write-Host "1. Restart your terminal" -ForegroundColor White
    Write-Host "2. Run: npm run tauri dev" -ForegroundColor White
}

