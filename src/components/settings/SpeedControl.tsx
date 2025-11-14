import { Gauge } from "lucide-react";
import { useSettingsStore } from "../../stores/settingsStore";
import Card from "../ui/Card";

const speedPresets = [
  { value: 1, label: "Slow", description: "100-200 dots/sec - High accuracy", color: "text-blue-400" },
  { value: 3, label: "Medium", description: "500-800 dots/sec - Balanced", color: "text-green-400" },
  { value: 5, label: "Fast", description: "1500-2000 dots/sec - Quick completion", color: "text-yellow-400" },
  { value: 10, label: "Turbo", description: "3000+ dots/sec - Speed run mode", color: "text-red-400" },
];

export default function SpeedControl() {
  const { speed, setSpeed } = useSettingsStore();

  const getSpeedColor = () => {
    if (speed <= 2) return "text-blue-400";
    if (speed <= 4) return "text-green-400";
    if (speed <= 7) return "text-yellow-400";
    return "text-red-400";
  };

  const getSpeedLabel = () => {
    const preset = speedPresets.find((p) => p.value === speed);
    return preset?.label || `${speed}x`;
  };

  return (
    <Card variant="elevated">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Gauge className="text-discord-accent" size={24} />
          <h2 className="text-2xl font-bold text-white">Speed Control</h2>
        </div>
        <p className="text-discord-text-secondary">
          Adjust drawing speed. Higher speeds complete faster but may reduce accuracy.
        </p>

        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white font-medium">Speed: {getSpeedLabel()}</span>
              <span className={`text-2xl font-bold ${getSpeedColor()}`}>{speed}x</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full h-2 bg-discord-secondary rounded-lg appearance-none cursor-pointer accent-discord-accent"
            />
            <div className="flex justify-between text-xs text-discord-text-secondary mt-1">
              <span>1x</span>
              <span>10x</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {speedPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => setSpeed(preset.value)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                  speed === preset.value
                    ? "border-discord-accent bg-discord-accent/10"
                    : "border-gray-700 bg-discord-dark hover:border-gray-600"
                }`}
              >
                <div className={`font-semibold mb-1 ${preset.color}`}>{preset.label}</div>
                <div className="text-xs text-discord-text-secondary">{preset.description}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

