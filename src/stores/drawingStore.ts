import { create } from "zustand";

interface DrawingState {
  isDrawing: boolean;
  isPaused: boolean;
  progress: number; // 0-100
  currentRow: number;
  totalRows: number;
  timeElapsed: number; // seconds
  estimatedTimeRemaining: number; // seconds
  startDrawing: () => void;
  pauseDrawing: () => void;
  resumeDrawing: () => void;
  stopDrawing: () => void;
  updateProgress: (progress: number, currentRow: number, totalRows: number) => void;
  updateTime: (elapsed: number, remaining: number) => void;
  reset: () => void;
}

export const useDrawingStore = create<DrawingState>((set) => ({
  isDrawing: false,
  isPaused: false,
  progress: 0,
  currentRow: 0,
  totalRows: 0,
  timeElapsed: 0,
  estimatedTimeRemaining: 0,
  startDrawing: () => set({ isDrawing: true, isPaused: false, progress: 0 }),
  pauseDrawing: () => set({ isPaused: true }),
  resumeDrawing: () => set({ isPaused: false }),
  stopDrawing: () => set({ isDrawing: false, isPaused: false }),
  updateProgress: (progress, currentRow, totalRows) =>
    set({ progress, currentRow, totalRows }),
  updateTime: (elapsed, remaining) =>
    set({ timeElapsed: elapsed, estimatedTimeRemaining: remaining }),
  reset: () =>
    set({
      isDrawing: false,
      isPaused: false,
      progress: 0,
      currentRow: 0,
      totalRows: 0,
      timeElapsed: 0,
      estimatedTimeRemaining: 0,
    }),
}));

