import Card from "../ui/Card";
import DropZone from "./DropZone";

export default function ImageUpload() {
  return (
    <Card variant="elevated">
      <div className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Upload Image</h2>
          <p className="text-discord-text-secondary">
            Upload an image to begin the drawing automation process
          </p>
        </div>
        <DropZone />
      </div>
    </Card>
  );
}

