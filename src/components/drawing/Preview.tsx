import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useImageStore } from "../../stores/imageStore";

interface PreviewProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Preview({ isOpen, onClose }: PreviewProps) {
  const { imageUrl } = useImageStore();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative bg-discord-dark rounded-2xl border border-gray-700 max-w-4xl max-h-[90vh] overflow-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-discord-secondary hover:bg-discord-error rounded-lg text-white transition-colors z-10"
          >
            <X size={20} />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Drawing Preview</h2>
            {imageUrl && (
              <div className="space-y-4">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full h-auto rounded-lg border border-gray-700"
                />
                <div className="p-4 bg-discord-secondary rounded-lg">
                  <p className="text-sm text-discord-text-secondary">
                    This preview shows the image that will be drawn. The actual drawing path will be optimized
                    based on your selected method.
                  </p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

