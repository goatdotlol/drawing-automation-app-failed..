# 🚀 Development Guide for Codespaces

## Current Setup

You're in GitHub Codespaces (Linux environment). Here's how to develop efficiently:

## ⚡ Quick Start: UI Development Only

For now, develop the React UI without Tauri:

```bash
# Just run Vite (frontend only)
npm run dev
```

This will:
- Start Vite dev server on port 5173
- Codespaces will auto-forward the port
- Click the popup to open in browser
- Hot reload works perfectly!

**This is the fastest way to develop your UI components!**

## 🏗️ Building Windows Executable

Since you're on Linux in Codespaces, use **GitHub Actions** to build Windows executables:

### Step 1: Push Your Code

```bash
git add .
git commit -m "Add build workflow"
git push
```

### Step 2: Trigger Build

1. Go to your repo on GitHub
2. Click **"Actions"** tab
3. Click **"Build Tauri App"** workflow
4. Click **"Run workflow"** → **"Run workflow"** (green button)

### Step 3: Download Your .exe

1. Wait 5-10 minutes for build to complete
2. Click on the completed workflow run
3. Scroll down to **"Artifacts"**
4. Download:
   - `windows-installer` (contains .msi installer)
   - `windows-executable` (contains .exe file)

**Zero data cost for you - builds happen on GitHub's servers!**

## 🧪 Testing Tauri Locally (Optional)

If you want to test Tauri in Codespaces (no GUI, but you can test Rust code):

```bash
# Install GTK dependencies
sudo apt-get update && sudo apt-get install -y \
  libwebkit2gtk-4.0-dev \
  build-essential \
  curl \
  wget \
  file \
  libssl-dev \
  libgtk-3-dev \
  libayatana-appindicator3-dev \
  librsvg2-dev

# Then build (won't show window, but compiles)
npm run tauri build
```

**Note**: Tauri dev won't show a window in Codespaces (no display server), but you can:
- Test Rust compilation
- Verify Tauri commands work
- Build Linux version for testing

## 📋 Recommended Workflow

### Phase 1: UI Development (Now)

```bash
# Develop UI with hot reload
npm run dev

# Build all React components:
# - ImageUpload
# - Settings panels
# - Drawing method selector
# - Progress indicators
# - All UI according to SawBotApp.txt
```

### Phase 2: Add Tauri Commands

```bash
# When ready, add Rust commands in src-tauri/src/main.rs
# Test compilation:
npm run tauri build  # (after installing GTK deps)
```

### Phase 3: Build & Test

```bash
# Push to GitHub
git push

# Trigger GitHub Actions build
# Download .exe from Actions tab
# Test on Windows machine
```

## 🎯 Current Status

✅ **Working**: React UI development (`npm run dev`)
✅ **Working**: GitHub Actions for Windows builds
❌ **Not working**: Tauri dev window in Codespaces (no display)

## 💡 Pro Tips

1. **Develop UI first** - Use `npm run dev` for instant feedback
2. **Test Tauri commands** - Add Rust code, build to verify compilation
3. **Build via Actions** - Let GitHub build Windows .exe for you
4. **Download & test** - Get .exe from Actions, test on Windows

## 🔧 Troubleshooting

**Port forwarding not working?**
- Codespaces should auto-forward port 5173
- Check the "Ports" tab in VS Code
- Or manually forward: Right-click port → "Port Visibility" → "Public"

**GitHub Actions failing?**
- Check the Actions tab for error messages
- Make sure `tauri.conf.json` is correct
- Verify all dependencies in `Cargo.toml`

**Need to test on Windows?**
- Use GitHub Actions to build
- Download the .exe
- Run on a Windows machine (even a VM works)

---

**Next Steps**: Start with `npm run dev` and build your UI! 🎨

