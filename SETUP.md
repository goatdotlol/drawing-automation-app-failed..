# Setup Guide

## Prerequisites Installation

### 1. Install Rust (Required)

Rust is required for the Tauri backend. Follow these steps:

#### Option A: Automatic Installation (Recommended)

**If you get "execution policy" errors, use one of these methods:**

**Method 1: Bypass execution policy (Easiest)**
```powershell
powershell -ExecutionPolicy Bypass -File .\install-rust.ps1
```

**Method 2: Direct download and install**
```powershell
Invoke-WebRequest -Uri "https://win.rustup.rs/x86_64" -OutFile "$env:TEMP\rustup-init.exe"; & "$env:TEMP\rustup-init.exe"
```

**Method 3: Run the script with bypass**
```powershell
.\install-rust.ps1
```
If that fails, use:
```powershell
powershell -ExecutionPolicy Bypass -File .\install-rust.ps1
```

3. Follow the installation prompts (press Enter to accept defaults)
4. Restart your terminal/PowerShell after installation

#### Option B: Manual Installation

1. Visit https://www.rust-lang.org/tools/install
2. Download and run `rustup-init.exe`
3. Follow the installation wizard
4. Restart your terminal

#### Verify Installation

After installation, open a **new** terminal and run:
```bash
cargo --version
rustc --version
```

You should see version numbers. If not, you may need to restart your terminal or add Rust to your PATH manually.

### 2. Install Additional Tools (Windows) - **REQUIRED**

Tauri requires Visual Studio Build Tools with C++ support. This is **mandatory** for compiling Rust code.

#### Microsoft Visual C++ Build Tools

**Quick Install (Recommended):**
```powershell
powershell -ExecutionPolicy Bypass -File .\install-build-tools.ps1
```

**Manual Installation:**

1. Download "Build Tools for Visual Studio 2022" from:
   https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

2. Run the installer (`vs_buildtools.exe`)

3. **During installation, you MUST select:**
   - ✅ **"Desktop development with C++"** workload (this is critical!)
   - ✅ **Windows 10/11 SDK** (latest version)
   - ✅ **MSVC v143 - VS 2022 C++ x64/x86 build tools**
   - ✅ **Windows 10/11 SDK** (check the latest version)

4. Click "Install" and wait for completion (this may take 10-20 minutes)

5. **Restart your terminal/PowerShell** after installation

#### WebView2 (Usually Pre-installed)

WebView2 is usually pre-installed on Windows 10/11. If you encounter issues, download from:
https://developer.microsoft.com/microsoft-edge/webview2/

### 3. Verify Everything Works

After installing Rust, navigate to the project directory and run:

```bash
cd drawing-automation-app
cargo --version
npm run tauri dev
```

## Troubleshooting

### "cargo: command not found"

- Make sure you restarted your terminal after installing Rust
- Check if `C:\Users\YourUsername\.cargo\bin` is in your PATH
- Try running: `$env:Path += ";$env:USERPROFILE\.cargo\bin"` in PowerShell

### "link.exe not found" or Build Errors

- Install Visual Studio Build Tools (see step 2 above)
- Make sure you selected the "Desktop development with C++" workload

### Tauri Dev Fails

- Ensure Rust is properly installed: `cargo --version`
- Ensure Node.js is installed: `node --version`
- Try cleaning and rebuilding: `npm run tauri clean` then `npm run tauri dev`

## Next Steps

Once Rust is installed, you can:

1. Run the development server:
   ```bash
   npm run tauri dev
   ```

2. Build for production:
   ```bash
   npm run tauri build
   ```

