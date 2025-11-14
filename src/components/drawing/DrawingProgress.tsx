import { Play, Pause, Square, Clock } from "lucide-react";
import { useDrawingStore } from "../../stores/drawingStore";
import Card from "../ui/Card";
import Button from "../ui/Button";

export default function DrawingProgress() {
  const {
    isDrawing,
    isPaused,
    progress,
    currentRow,
    totalRows,
    timeElapsed,
    estimatedTimeRemaining,
    pauseDrawing,
    resumeDrawing,
    stopDrawing,
  } = useDrawingStore();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!isDrawing && !isPaused) {
    return null;
  }

  return (
    <Card variant="elevated" className="fixed bottom-6 right-6 w-96 z-50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white">Drawing Progress</h3>
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            isPaused ? "bg-yellow-500/20 text-yellow-400" : "bg-discord-success/20 text-discord-success"
          }`}>
            {isPaused ? "Paused" : "Drawing"}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-discord-text-secondary">Progress</span>
            <span className="text-white font-medium">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-discord-secondary rounded-full h-3 overflow-hidden">
            <div
              className="h-full bg-discord-accent transition-all duration-300 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {totalRows > 0 && (
          <div className="text-sm text-discord-text-secondary">
            Row {currentRow} of {totalRows}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex items-center gap-2 text-discord-text-secondary mb-1">
              <Clock size={14} />
              <span>Elapsed</span>
            </div>
            <div className="text-white font-medium">{formatTime(timeElapsed)}</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-discord-text-secondary mb-1">
              <Clock size={14} />
              <span>Remaining</span>
            </div>
            <div className="text-white font-medium">{formatTime(estimatedTimeRemaining)}</div>
          </div>
        </div>

        <div className="flex gap-2">
          {isPaused ? (
            <Button variant="primary" onClick={resumeDrawing} className="flex-1">
              <Play size={16} className="mr-2" />
              Resume
            </Button>
          ) : (
            <Button variant="secondary" onClick={pauseDrawing} className="flex-1">
              <Pause size={16} className="mr-2" />
              Pause
            </Button>
          )}
          <Button variant="danger" onClick={stopDrawing}>
            <Square size={16} />
          </Button>
        </div>

        <p className="text-xs text-discord-text-secondary">
          Press SPACE to pause/resume, ESC to stop
        </p>
      </div>
    </Card>
  );
}

