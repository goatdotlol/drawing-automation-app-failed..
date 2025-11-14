import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { X } from "lucide-react";

interface CountdownProps {
  onComplete: () => void;
  onCancel: () => void;
}

export default function Countdown({ onComplete, onCancel }: CountdownProps) {
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          className="relative bg-discord-dark rounded-2xl border border-gray-700 p-12 text-center"
        >
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 p-2 hover:bg-discord-secondary rounded-lg text-discord-text-secondary hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          <motion.div
            key={count}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            className="text-8xl font-bold text-discord-accent mb-4"
          >
            {count > 0 ? count : "GO!"}
          </motion.div>

          <p className="text-discord-text-secondary mb-6">
            Drawing will start in {count} second{count !== 1 ? "s" : ""}...
          </p>

          <Button variant="danger" onClick={onCancel}>
            Cancel
          </Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
