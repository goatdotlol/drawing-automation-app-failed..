import { useEffect } from "react";
import { useDrawingStore } from "../stores/drawingStore";

export function useKeyboardShortcuts() {
  const { isDrawing, isPaused, pauseDrawing, resumeDrawing, stopDrawing } = useDrawingStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ESC to stop
      if (e.key === "Escape" && isDrawing) {
        stopDrawing();
      }
      // SPACE to pause/resume
      if (e.key === " " && isDrawing) {
        e.preventDefault();
        if (isPaused) {
          resumeDrawing();
        } else {
          pauseDrawing();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDrawing, isPaused, pauseDrawing, resumeDrawing, stopDrawing]);
}

