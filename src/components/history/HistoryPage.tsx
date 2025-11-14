import { History as HistoryIcon } from "lucide-react";
import Card from "../ui/Card";

export default function HistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">History</h1>
        <p className="text-discord-text-secondary">
          View your previous drawings and settings
        </p>
      </div>

      <Card variant="elevated">
        <div className="text-center py-12">
          <HistoryIcon className="mx-auto mb-4 text-discord-text-secondary" size={48} />
          <p className="text-discord-text-secondary">
            History feature coming soon...
          </p>
          <p className="text-sm text-discord-text-secondary mt-2">
            Save and replay your drawing sessions
          </p>
        </div>
      </Card>
    </div>
  );
}

