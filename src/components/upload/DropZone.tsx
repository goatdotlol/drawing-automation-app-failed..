import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle, XCircle, Image as ImageIcon } from "lucide-react";
import { useImageStore } from "../../stores/imageStore";
import { ToastContainer, Toast } from "../ui/Toast";

export default function DropZone() {
  const { setImage, setLoading, setError, imageUrl, clearImage } = useImageStore();
  const [isDragging, setIsDragging] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (type: Toast["type"], message: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
        addToast("error", "Invalid file type. Please upload an image.");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        addToast("error", "File too large. Maximum size is 10MB.");
        return;
      }

      setLoading(true);
      setError(null);

      setTimeout(() => {
        setImage(file);
        setLoading(false);
        addToast("success", "Image uploaded successfully!");
      }, 500);
    },
    [setImage, setLoading, setError]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile]
  );

  return (
    <>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className="relative"
      >
        <motion.div
          animate={{
            scale: isDragging ? 1.05 : 1,
            borderColor: isDragging ? "#5865f2" : "#4b5563",
          }}
          className={`
            relative border-2 border-dashed rounded-2xl p-12
            transition-all duration-300
            ${isDragging ? "bg-discord-accent/10 border-discord-accent" : "bg-discord-dark border-gray-600"}
            ${imageUrl ? "border-solid" : ""}
          `}
        >
          <AnimatePresence mode="wait">
            {imageUrl ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="space-y-4"
              >
                <div className="relative group">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-auto max-h-96 object-contain rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <button
                      onClick={clearImage}
                      className="px-4 py-2 bg-discord-error hover:bg-[#da373c] rounded-lg text-white font-medium transition-colors"
                    >
                      Remove Image
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 text-discord-success">
                  <CheckCircle size={20} />
                  <span className="text-sm font-medium">Image loaded successfully</span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center space-y-4"
              >
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex justify-center"
                >
                  <div className="p-4 bg-discord-accent/20 rounded-full">
                    <Upload size={48} className="text-discord-accent" />
                  </div>
                </motion.div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Drop your image here
                  </h3>
                  <p className="text-discord-text-secondary mb-4">
                    or click to browse
                  </p>
                  <p className="text-sm text-discord-text-secondary">
                    Supports: PNG, JPG, JPEG, WebP (Max 10MB)
                  </p>
                </div>
                <label className="inline-block">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleFileInput}
                    className="hidden"
                  />
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-discord-accent hover:bg-[#4752c4] rounded-lg text-white font-medium cursor-pointer inline-block transition-colors"
                  >
                    Browse Files
                  </motion.div>
                </label>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  );
}

