import { create } from "zustand";

export type Theme = "discord" | "dark" | "blue" | "green" | "purple";

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const themes = {
  discord: {
    dark: "#2b2d31",
    darker: "#1e1f22",
    secondary: "#313338",
    accent: "#5865f2",
    text: "#ffffff",
    "text-secondary": "#b5bac1",
    success: "#23a559",
    error: "#f23f42",
  },
  dark: {
    dark: "#1a1a1a",
    darker: "#0d0d0d",
    secondary: "#2a2a2a",
    accent: "#ffffff",
    text: "#ffffff",
    "text-secondary": "#a0a0a0",
    success: "#4ade80",
    error: "#f87171",
  },
  blue: {
    dark: "#1e293b",
    darker: "#0f172a",
    secondary: "#334155",
    accent: "#3b82f6",
    text: "#ffffff",
    "text-secondary": "#cbd5e1",
    success: "#10b981",
    error: "#ef4444",
  },
  green: {
    dark: "#1a2e1a",
    darker: "#0d1a0d",
    secondary: "#2d4a2d",
    accent: "#22c55e",
    text: "#ffffff",
    "text-secondary": "#bbf7d0",
    success: "#16a34a",
    error: "#dc2626",
  },
  purple: {
    dark: "#2d1b3d",
    darker: "#1a0f26",
    secondary: "#3d2b4d",
    accent: "#a855f7",
    text: "#ffffff",
    "text-secondary": "#d8b4fe",
    success: "#10b981",
    error: "#ef4444",
  },
};

export const useThemeStore = create<ThemeState>((set) => ({
  theme: "discord",
  setTheme: (theme) => {
    set({ theme });
    // Apply theme to CSS variables
    const themeColors = themes[theme];
    Object.entries(themeColors).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--discord-${key}`, value);
    });
  },
}));

export { themes };
