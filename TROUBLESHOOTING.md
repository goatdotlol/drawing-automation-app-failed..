# 🔧 Troubleshooting Guide

## Common Build Errors

### GitHub Actions Build Failed

**Error: Missing icons**
```
error: failed to bundle app: icon file not found
```

**Solution**: The `tauri.conf.json` references icon files that don't exist. We need to either:
1. Create placeholder icons, or
2. Remove icon references temporarily

**Quick Fix**:
```bash
# In Codespaces, create a simple icon directory
mkdir -p src-tauri/icons
# Or edit tauri.conf.json to remove icon references temporarily
```

**Error: Tauri action version issue**
```
Error: Action input 'includeUpdaterArtifacts' is not supported
```

**Solution**: Update the workflow to use a compatible version or remove that parameter.

**Error: Cargo.toml dependencies**
```
error: failed to resolve: use of undeclared crate or module
```

**Solution**: Make sure all dependencies in `Cargo.toml` are valid and compatible with Tauri 2.0.

### Local Build Errors (Codespaces)

**Error: GTK libraries not found**
```
pkg-config exited with status code 1
The system library gdk-3.0 required by crate gdk-sys was not found
```

**Solution**: Install GTK dependencies:
```bash
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
```

**Error: npm run dev fails**
```
Error: Cannot find module
```

**Solution**: 
```bash
npm install
```

### Frontend Only Development

If you just want to develop the UI without Tauri:

```bash
# This works perfectly in Codespaces
npm run dev
```

This runs Vite only (no Tauri), perfect for UI development.

## Quick Fixes

### Fix Missing Icons

Create a simple fix by editing `tauri.conf.json`:

```json
{
  "bundle": {
    "active": true,
    "targets": "all",
    "icon": []
  }
}
```

Or create placeholder icons (we can add real ones later).

### Simplify GitHub Actions

If the workflow is too complex, use a simpler version that just builds without releases:

```yaml
- name: Build Tauri app
  run: |
    npm run tauri build -- --target x86_64-pc-windows-msvc
```

## Getting Help

1. **Check the error message** - Copy the full error output
2. **Check GitHub Actions logs** - Go to Actions tab → Click failed workflow → Check logs
3. **Try frontend-only first** - Use `npm run dev` to develop UI
4. **Build later** - Fix build issues after UI is done

## Recommended Approach

1. ✅ **Develop UI first**: `npm run dev` (works immediately)
2. ⏳ **Fix build later**: Once UI is working, fix any build issues
3. 🚀 **Use Actions**: Let GitHub Actions handle Windows builds

---

**Most Common Issue**: Missing icons. Either create them or remove from config temporarily.

