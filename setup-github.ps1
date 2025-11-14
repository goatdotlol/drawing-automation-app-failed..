# Quick GitHub Setup Script
# This helps you push your code to GitHub and open in Codespaces

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Codespaces Setup" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Git initialized" -ForegroundColor Green
} else {
    Write-Host "Git already initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "STEP 1: Create GitHub Repository" -ForegroundColor Cyan
Write-Host "1. Go to: https://github.com/new" -ForegroundColor White
Write-Host "2. Repository name: drawing-automation-app" -ForegroundColor White
Write-Host "3. Choose Public (or Private if you have Pro)" -ForegroundColor White
Write-Host "4. DO NOT initialize with README/gitignore" -ForegroundColor Yellow
Write-Host "5. Click Create repository" -ForegroundColor White
Write-Host ""

$username = Read-Host "Enter your GitHub username"
if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "Username required. Exiting." -ForegroundColor Red
    exit 1
}

$repoUrl = "https://github.com/$username/drawing-automation-app.git"

Write-Host ""
Write-Host "STEP 2: Adding files and committing..." -ForegroundColor Cyan

# Check if remote already exists
$remoteExists = git remote get-url origin -ErrorAction SilentlyContinue
if ($remoteExists) {
    Write-Host "Remote origin already exists: $remoteExists" -ForegroundColor Yellow
    $update = Read-Host "Update to new URL? (y/N)"
    if ($update -eq "y" -or $update -eq "Y") {
        git remote set-url origin $repoUrl
        Write-Host "Remote updated" -ForegroundColor Green
    }
} else {
    git remote add origin $repoUrl
    Write-Host "Remote added" -ForegroundColor Green
}

# Add all files
git add .
Write-Host "Files staged" -ForegroundColor Green

# Check if there are changes to commit
$status = git status --porcelain
if ($status) {
    $commitMsg = Read-Host "Enter commit message (or press Enter for default)"
    if ([string]::IsNullOrWhiteSpace($commitMsg)) {
        $commitMsg = "Initial commit: Tauri drawing automation app"
    }
    git commit -m $commitMsg
    Write-Host "Changes committed" -ForegroundColor Green
} else {
    Write-Host "No changes to commit" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "STEP 3: Pushing to GitHub..." -ForegroundColor Cyan
Write-Host "Make sure you have created the repository on GitHub first!" -ForegroundColor Yellow
$push = Read-Host "Push to GitHub now? (y/N)"

if ($push -eq "y" -or $push -eq "Y") {
    git branch -M main
    git push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host ""
        Write-Host "STEP 4: Open in Codespaces" -ForegroundColor Cyan
        Write-Host "1. Go to: https://github.com/$username/drawing-automation-app" -ForegroundColor White
        Write-Host "2. Click green Code button, then Codespaces tab" -ForegroundColor White
        Write-Host "3. Click Create codespace on main" -ForegroundColor White
        Write-Host "4. Wait 2-3 minutes, then run: npm run tauri dev" -ForegroundColor White
        Write-Host ""
        Write-Host "Or open directly:" -ForegroundColor Cyan
        $codespaceUrl = "https://github.com/codespaces/new?repo=$username/drawing-automation-app"
        Write-Host $codespaceUrl -ForegroundColor White
    } else {
        Write-Host ""
        Write-Host "Push failed. Common issues:" -ForegroundColor Red
        Write-Host "- Repository does not exist yet (create it first)" -ForegroundColor Yellow
        Write-Host "- Authentication required (GitHub will prompt)" -ForegroundColor Yellow
        Write-Host "- Run: git push -u origin main manually" -ForegroundColor Yellow
    }
} else {
    Write-Host ""
    Write-Host "To push manually, run:" -ForegroundColor Yellow
    Write-Host "  git branch -M main" -ForegroundColor White
    Write-Host "  git push -u origin main" -ForegroundColor White
}

Write-Host ""
Write-Host "Done! See CODESPACES_SETUP.md for detailed instructions." -ForegroundColor Green
