import { invoke } from "@tauri-apps/api/core";

export interface StartDrawingRequest {
  image_data: number[];
  method: string;
  speed: number;
  canvas_bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color_palette: string[];
}

export async function startDrawing(request: StartDrawingRequest): Promise<string> {
  return await invoke("start_drawing", { request });
}

export async function stopDrawing(): Promise<string> {
  return await invoke("stop_drawing");
}

export async function pauseDrawing(): Promise<string> {
  return await invoke("pause_drawing");
}

export async function resumeDrawing(): Promise<string> {
  return await invoke("resume_drawing");
}

export async function captureScreenshot(): Promise<Uint8Array> {
  const data = await invoke<number[]>("capture_screenshot");
  return new Uint8Array(data);
}

export async function detectColorPalette(imageData: Uint8Array): Promise<string[]> {
  const data = Array.from(imageData);
  return await invoke("detect_color_palette", { imageData: data });
}
