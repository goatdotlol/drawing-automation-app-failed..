import { Palette } from "lucide-react";
import { useThemeStore, Theme } from "../../stores/themeStore";
import { motion } from "framer-motion";

const themeOptions: { value: Theme; label: string; preview: string }[] = [
  { value: "discord", label: "Discord", preview: "bg-[#5865f2]" },
  { value: "dark", label: "Dark", preview: "bg-white" },
  { value: "blue", label: "Blue", preview: "bg-blue-500" },
  { value: "green", label: "Green", preview: "bg-green-500" },
  { value: "purple", label: "Purple", preview: "bg-purple-500" },
];

export default function ThemeSelector() {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="p-4 border-t border-gray-700">
      <div className="flex items-center gap-2 mb-3">
        <Palette size={16} className="text-discord-text-secondary" />
        <span className="text-sm font-medium text-discord-text-secondary">Theme</span>
      </div>
      <div className="flex gap-2">
        {themeOptions.map((option) => (
          <motion.button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`relative w-8 h-8 rounded-lg ${option.preview} border-2 transition-all ${
              theme === option.value
                ? "border-discord-accent scale-110"
                : "border-gray-700 hover:border-gray-600"
            }`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={option.label}
          >
            {theme === option.value && (
              <motion.div
                layoutId="themeIndicator"
                className="absolute inset-0 border-2 border-white rounded-lg"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

