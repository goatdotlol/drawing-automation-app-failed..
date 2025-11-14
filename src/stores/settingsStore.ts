import { create } from "zustand";

export type DrawingMethod =
  | "matrix-dot"
  | "floyd-steinberg"
  | "continuous-line"
  | "spiral-raster"
  | "scanline"
  | "stippling"
  | "contour-vector";

interface SettingsState {
  drawingMethod: DrawingMethod;
  speed: number; // 1-10
  canvasBounds: { x: number; y: number; width: number; height: number } | null;
  colorPalette: string[];
  isCalibrated: boolean;
  setDrawingMethod: (method: DrawingMethod) => void;
  setSpeed: (speed: number) => void;
  setCanvasBounds: (bounds: { x: number; y: number; width: number; height: number } | null) => void;
  setColorPalette: (palette: string[]) => void;
  setCalibrated: (calibrated: boolean) => void;
  reset: () => void;
}

const defaultSettings: Omit<SettingsState, "setDrawingMethod" | "setSpeed" | "setCanvasBounds" | "setColorPalette" | "setCalibrated" | "reset"> = {
  drawingMethod: "matrix-dot",
  speed: 3,
  canvasBounds: null,
  colorPalette: [],
  isCalibrated: false,
};

export const useSettingsStore = create<SettingsState>((set) => ({
  ...defaultSettings,
  setDrawingMethod: (method) => set({ drawingMethod: method }),
  setSpeed: (speed) => set({ speed: Math.max(1, Math.min(10, speed)) }),
  setCanvasBounds: (bounds) => set({ canvasBounds: bounds }),
  setColorPalette: (palette) => set({ colorPalette: palette }),
  setCalibrated: (calibrated) => set({ isCalibrated: calibrated }),
  reset: () => set(defaultSettings),
}));

