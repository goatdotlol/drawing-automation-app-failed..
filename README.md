# Drawing Automation App

A lightweight, high-performance desktop drawing automation application with a Discord-inspired UI, built with Tauri, React, and Rust.

## Features

- 🎨 **Discord-Inspired Modern UI** - Polished, dark-themed interface with smooth animations
- 🖼️ **Image Upload** - Drag-and-drop image upload with preview
- 🎯 **Multiple Drawing Methods** - 7 different algorithms for various drawing styles
- ⚡ **High Performance** - Built with Tauri for minimal resource usage
- 🖱️ **Mouse Automation** - Precise pixel-perfect drawing automation
- ⚙️ **Customizable Settings** - Speed control, canvas detection, color palette matching

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Backend**: Rust (Tauri)
- **Image Processing**: image crate
- **Mouse Automation**: enigo crate

## Getting Started

### 🚀 **RECOMMENDED: Use GitHub Codespaces** (Zero Local Setup!)

**Best option if you have limited data or want instant setup:**

1. Push this repo to GitHub (see [CODESPACES_SETUP.md](./CODESPACES_SETUP.md))
2. Open in Codespaces (click "Code" → "Codespaces" → "Create codespace")
3. **For UI development**: Run `npm run dev` (Vite only, instant hot reload)
4. **For Windows builds**: Use GitHub Actions (see [CODESPACES_DEVELOPMENT.md](./CODESPACES_DEVELOPMENT.md))
5. **Total data cost: ~60MB** vs 5GB+ locally

👉 **See [CODESPACES_SETUP.md](./CODESPACES_SETUP.md) for setup**
👉 **See [CODESPACES_DEVELOPMENT.md](./CODESPACES_DEVELOPMENT.md) for development workflow**

### Local Development (Alternative)

**Prerequisites:**
- Node.js 18+ and npm
- Rust (latest stable version) - **See [SETUP.md](./SETUP.md) for installation instructions**
- Tauri CLI (installed automatically with npm install)
- Visual Studio Build Tools (Windows) - Required for compiling Rust (~2.5GB download)

### Installation

1. **Install Rust** (if not already installed):
   - Windows: Run `powershell -ExecutionPolicy Bypass -File .\install-rust.ps1` in PowerShell
   - Or see [SETUP.md](./SETUP.md) for alternative methods
   - Or visit https://www.rust-lang.org/tools/install

2. **Install Node dependencies**:
```bash
npm install
```

3. **Install Rust dependencies** (automatically handled by Cargo on first run)

4. **Run in development mode**:
```bash
npm run tauri dev
```

> **Note**: If you get "cargo: command not found", you need to install Rust first. See [SETUP.md](./SETUP.md) for detailed instructions.

### Building

Build for production:
```bash
npm run tauri build
```

## Project Structure

```
drawing-automation-app/
├── src/                    # React frontend
│   ├── components/         # React components
│   │   ├── upload/         # Image upload components
│   │   ├── settings/       # Settings components
│   │   ├── canvas/         # Canvas detection
│   │   ├── drawing/        # Drawing progress
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Base UI components
│   ├── stores/             # Zustand stores
│   ├── hooks/              # Custom React hooks
│   └── utils/              # Utility functions
└── src-tauri/              # Rust backend
    ├── drawing_engine/      # Drawing algorithms
    ├── mouse_control/      # Mouse automation
    └── image_processing/   # Image processing
```

## Drawing Methods

1. **Matrix Dot Drawing** - Fast left-to-right scanning with dot placement
2. **Floyd-Steinberg Dithering** - Error diffusion for high-quality conversion
3. **Continuous Line Drawing** - Single continuous line path
4. **Spiral Raster** - Center-outward spiral pattern
5. **Scanline Method** - Traditional line-by-line drawing
6. **Stippling/Pointillism** - Varying dot density for shading
7. **Contour/Vector Drawing** - Edge detection and vectorization

## Development

The project follows strict TypeScript and Rust best practices:

- TypeScript strict mode enabled
- Functional components with hooks
- Comprehensive error handling
- Performance-optimized algorithms
- Security-first approach

## License

MIT

