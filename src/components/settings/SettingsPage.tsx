import DrawingMethodSelector from "./DrawingMethodSelector";
import SpeedControl from "./SpeedControl";
import DimensionTool from "./DimensionTool";
import ColorPalette from "./ColorPalette";
import CanvasDetection from "../canvas/CanvasDetection";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-discord-text-secondary">
          Configure drawing method, speed, canvas position, and color palette
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DrawingMethodSelector />
        <SpeedControl />
        <DimensionTool />
        <ColorPalette />
      </div>

      <CanvasDetection />
    </div>
  );
}

