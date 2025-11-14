import { Play, Settings, Eye } from "lucide-react";
import { useState } from "react";
import { useDrawingStore } from "../../stores/drawingStore";
import { useImageStore } from "../../stores/imageStore";
import { useSettingsStore } from "../../stores/settingsStore";
import Button from "../ui/Button";
import Card from "../ui/Card";

export default function Controls() {
  const { image } = useImageStore();
  const { drawingMethod, speed, canvasBounds, isCalibrated } = useSettingsStore();
  const { startDrawing } = useDrawingStore();
  const [showPreview, setShowPreview] = useState(false);

  const canStart = image && isCalibrated && canvasBounds;

  const handleStart = async () => {
    if (!canStart) return;
    // TODO: Call Tauri command to start drawing
    startDrawing();
  };

  const handlePreview = () => {
    setShowPreview(true);
    // TODO: Show preview overlay
  };

  return (
    <Card variant="elevated">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Ready to Draw</h2>

        <div className="space-y-3">
          <div className="p-4 bg-discord-secondary rounded-lg space-y-2">
            <div className="text-sm font-medium text-white mb-3">Settings Summary</div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-discord-text-secondary">Method:</span>
                <span className="text-white ml-2">{drawingMethod}</span>
              </div>
              <div>
                <span className="text-discord-text-secondary">Speed:</span>
                <span className="text-white ml-2">{speed}x</span>
              </div>
              <div>
                <span className="text-discord-text-secondary">Canvas:</span>
                <span className="text-white ml-2">
                  {canvasBounds ? `${canvasBounds.width}×${canvasBounds.height}` : "Not set"}
                </span>
              </div>
              <div>
                <span className="text-discord-text-secondary">Status:</span>
                <span className={`ml-2 ${isCalibrated ? "text-discord-success" : "text-discord-error"}`}>
                  {isCalibrated ? "Ready" : "Not calibrated"}
                </span>
              </div>
            </div>
          </div>

          {!canStart && (
            <div className="p-4 bg-discord-error/20 border border-discord-error rounded-lg">
              <p className="text-sm text-discord-error">
                {!image && "• Upload an image first\n"}
                {!isCalibrated && "• Calibrate canvas position\n"}
                {!canvasBounds && "• Set canvas dimensions"}
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleStart}
              disabled={!canStart}
              className="flex-1"
            >
              <Play size={20} className="mr-2" />
              Start Drawing
            </Button>
            <Button variant="secondary" onClick={handlePreview} disabled={!canStart}>
              <Eye size={20} />
            </Button>
          </div>

          <p className="text-xs text-discord-text-secondary text-center">
            A 3-2-1 countdown will appear before drawing starts
          </p>
        </div>
      </div>
    </Card>
  );
}

