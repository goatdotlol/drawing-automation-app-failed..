import { Upload, Settings, History, Play } from "lucide-react";
import { motion } from "framer-motion";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "history", label: "History", icon: History },
    { id: "draw", label: "Draw", icon: Play },
  ];

  return (
    <div className="w-[280px] bg-discord-dark border-r border-gray-700 h-full flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <h1 className="text-2xl font-bold text-white">Drawing Automation</h1>
        <p className="text-sm text-discord-text-secondary mt-1">Pixel-perfect automation</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => onSectionChange(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-discord-accent text-white"
                      : "text-discord-text-secondary hover:bg-discord-secondary hover:text-white"
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

