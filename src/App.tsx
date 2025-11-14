import { useState } from "react";
import Sidebar from "./components/layout/Sidebar";
import MainArea from "./components/layout/MainArea";
import ImageUpload from "./components/upload/ImageUpload";
import SettingsPage from "./components/settings/SettingsPage";
import DrawPage from "./components/drawing/DrawPage";

function App() {
  const [activeSection, setActiveSection] = useState("upload");

  const renderContent = () => {
    switch (activeSection) {
      case "upload":
        return <ImageUpload />;
      case "settings":
        return <SettingsPage />;
      case "history":
        return (
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-4">History</h2>
            <p className="text-discord-text-secondary">History panel coming soon...</p>
          </div>
        );
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
