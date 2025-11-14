import { useState, useEffect } from "react";
import Sidebar from "./components/layout/Sidebar";
import MainArea from "./components/layout/MainArea";
import ImageUpload from "./components/upload/ImageUpload";
import SettingsPage from "./components/settings/SettingsPage";
import DrawPage from "./components/drawing/DrawPage";
import HistoryPage from "./components/history/HistoryPage";
import { useThemeStore } from "./stores/themeStore";
import { useKeyboardShortcuts } from "./hooks/useKeyboardShortcuts";

function App() {
  const [activeSection, setActiveSection] = useState("upload");
  const { theme, setTheme } = useThemeStore();
  
  // Initialize theme
  useEffect(() => {
    setTheme(theme);
  }, [theme, setTheme]);

  // Enable keyboard shortcuts
  useKeyboardShortcuts();

  const renderContent = () => {
    switch (activeSection) {
      case "upload":
        return <ImageUpload />;
      case "settings":
        return <SettingsPage />;
      case "history":
        return <HistoryPage />;
      case "draw":
        return <DrawPage />;
      default:
        return <ImageUpload />;
    }
  };

  return (
    <div className="w-full h-full bg-discord-darker flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <MainArea>{renderContent()}</MainArea>
    </div>
  );
}

export default App;
