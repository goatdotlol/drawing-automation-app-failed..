# Rust Installation Script for Windows
# This script bypasses execution policy restrictions

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Rust Installation Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Rust is already installed
$cargoExists = Get-Command cargo -ErrorAction SilentlyContinue
if ($cargoExists) {
    Write-Host "Rust appears to be already installed!" -ForegroundColor Green
    Write-Host "Cargo version: $(cargo --version)" -ForegroundColor Green
    Write-Host ""
    $continue = Read-Host "Do you want to reinstall? (y/N)"
    if ($continue -ne "y" -and $continue -ne "Y") {
        Write-Host "Exiting..." -ForegroundColor Yellow
        exit 0
    }
}

Write-Host "Downloading Rust installer..." -ForegroundColor Yellow
$rustupUrl = "https://win.rustup.rs/x86_64"
$rustupPath = "$env:TEMP\rustup-init.exe"

try {
    Invoke-WebRequest -Uri $rustupUrl -OutFile $rustupPath -UseBasicParsing
    Write-Host "Download complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Starting Rust installer..." -ForegroundColor Yellow
    Write-Host "Please follow the prompts in the installer window." -ForegroundColor Yellow
    Write-Host "Press Enter to accept defaults (recommended)." -ForegroundColor Yellow
    Write-Host ""
    
    Start-Process -FilePath $rustupPath -Wait
    
    Write-Host ""
    Write-Host "Installation complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "IMPORTANT: Please close and reopen your terminal/PowerShell window" -ForegroundColor Yellow
    Write-Host "for the changes to take effect." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "After restarting, verify installation with:" -ForegroundColor Cyan
    Write-Host "  cargo --version" -ForegroundColor White
    Write-Host "  rustc --version" -ForegroundColor White
    Write-Host ""
    
    # Clean up
    Remove-Item $rustupPath -ErrorAction SilentlyContinue
    
} catch {
    Write-Host "Error downloading or running installer: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Rust manually:" -ForegroundColor Yellow
    Write-Host "1. Visit https://www.rust-lang.org/tools/install" -ForegroundColor White
    Write-Host "2. Download and run rustup-init.exe" -ForegroundColor White
    Write-Host "3. Follow the installation prompts" -ForegroundColor White
    exit 1
}

