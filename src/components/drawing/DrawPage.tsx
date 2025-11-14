import { useState } from "react";
import Controls from "./Controls";
import DrawingProgress from "./DrawingProgress";
import Preview from "./Preview";
import { useImageStore } from "../../stores/imageStore";
import Card from "../ui/Card";

export default function DrawPage() {
  const { imageUrl } = useImageStore();
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Draw</h1>
        <p className="text-discord-text-secondary">
          Review settings and start the drawing process
        </p>
      </div>

      {imageUrl ? (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card variant="elevated">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white">Image Preview</h2>
                <img
                  src={imageUrl}
                  alt="Drawing preview"
                  className="w-full h-auto rounded-lg border border-gray-700"
                />
              </div>
            </Card>
            <Controls />
          </div>
        </>
      ) : (
        <Card variant="elevated">
          <div className="text-center py-12">
            <p className="text-discord-text-secondary mb-4">
              Upload an image first to begin drawing
            </p>
          </div>
        </Card>
      )}

      <DrawingProgress />
      <Preview isOpen={showPreview} onClose={() => setShowPreview(false)} />
    </div>
  );
}

