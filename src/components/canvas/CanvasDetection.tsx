import { Target, MousePointer2, Save } from "lucide-react";
import { useState } from "react";
import { useSettingsStore } from "../../stores/settingsStore";
import Card from "../ui/Card";
import Button from "../ui/Button";

type DetectionMode = "auto" | "manual" | "preset";

const presets = [
  { name: "Gartic Phone", bounds: { x: 100, y: 100, width: 800, height: 600 } },
  { name: "Skribbl.io", bounds: { x: 200, y: 150, width: 600, height: 400 } },
  { name: "MS Paint", bounds: { x: 0, y: 0, width: 1920, height: 1080 } },
];

export default function CanvasDetection() {
  const { canvasBounds, setCanvasBounds, isCalibrated, setCalibrated } = useSettingsStore();
  const [mode, setMode] = useState<DetectionMode>("auto");
  const [isDetecting, setIsDetecting] = useState(false);

  const handleAutoDetect = async () => {
    setIsDetecting(true);
    // TODO: Implement auto-detection via Tauri
    setTimeout(() => {
      // Mock detection
      setCanvasBounds({ x: 100, y: 100, width: 800, height: 600 });
      setCalibrated(true);
      setIsDetecting(false);
    }, 2000);
  };

  const handleManualSelect = () => {
    // TODO: Open selection overlay
    setMode("manual");
  };

  const handlePresetSelect = (preset: typeof presets[0]) => {
    setCanvasBounds(preset.bounds);
    setCalibrated(true);
  };

  const handleTestCorners = async () => {
    if (!canvasBounds) return;
    // TODO: Test corner clicks via Tauri
    alert("Testing corner clicks...");
  };

  return (
    <Card variant="elevated">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Target className="text-discord-accent" size={24} />
          <h2 className="text-2xl font-bold text-white">Canvas Detection</h2>
        </div>
        <p className="text-discord-text-secondary">
          Detect or manually set the drawing canvas area. The app needs to know where to draw on your screen.
        </p>

        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => setMode("auto")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                mode === "auto"
                  ? "border-discord-accent bg-discord-accent/10"
                  : "border-gray-700 bg-discord-dark hover:border-gray-600"
              }`}
            >
              <Target className="mx-auto mb-2 text-discord-accent" size={24} />
              <div className="text-sm font-medium text-white">Auto-Detect</div>
              <div className="text-xs text-discord-text-secondary">Find canvas automatically</div>
            </button>
            <button
              onClick={() => setMode("manual")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                mode === "manual"
                  ? "border-discord-accent bg-discord-accent/10"
                  : "border-gray-700 bg-discord-dark hover:border-gray-600"
              }`}
            >
              <MousePointer2 className="mx-auto mb-2 text-discord-accent" size={24} />
              <div className="text-sm font-medium text-white">Manual</div>
              <div className="text-xs text-discord-text-secondary">Click corners</div>
            </button>
            <button
              onClick={() => setMode("preset")}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                mode === "preset"
                  ? "border-discord-accent bg-discord-accent/10"
                  : "border-gray-700 bg-discord-dark hover:border-gray-600"
              }`}
            >
              <Save className="mx-auto mb-2 text-discord-accent" size={24} />
              <div className="text-sm font-medium text-white">Preset</div>
              <div className="text-xs text-discord-text-secondary">Use saved</div>
            </button>
          </div>

          {mode === "auto" && (
            <Button variant="primary" onClick={handleAutoDetect} isLoading={isDetecting} className="w-full">
              {isDetecting ? "Detecting Canvas..." : "Auto-Detect Canvas"}
            </Button>
          )}

          {mode === "manual" && (
            <Button variant="primary" onClick={handleManualSelect} className="w-full">
              Start Manual Selection
            </Button>
          )}

          {mode === "preset" && (
            <div className="space-y-2">
              {presets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handlePresetSelect(preset)}
                  className="w-full p-3 rounded-lg border-2 border-gray-700 bg-discord-dark hover:border-gray-600 transition-all text-left"
                >
                  <div className="font-medium text-white">{preset.name}</div>
                  <div className="text-xs text-discord-text-secondary">
                    {preset.bounds.width} × {preset.bounds.height} px
                  </div>
                </button>
              ))}
            </div>
          )}

          {canvasBounds && (
            <div className="p-4 bg-discord-secondary rounded-lg space-y-2">
              <div className="text-sm font-medium text-white">Canvas Bounds</div>
              <div className="text-sm text-discord-text-secondary">
                Position: ({canvasBounds.x}, {canvasBounds.y})
              </div>
              <div className="text-sm text-discord-text-secondary">
                Size: {canvasBounds.width} × {canvasBounds.height} px
              </div>
              {isCalibrated && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-2 h-2 bg-discord-success rounded-full" />
                  <span className="text-sm text-discord-success">Calibrated</span>
                </div>
              )}
              <Button variant="secondary" size="sm" onClick={handleTestCorners} className="mt-2">
                Test Corner Clicks
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

