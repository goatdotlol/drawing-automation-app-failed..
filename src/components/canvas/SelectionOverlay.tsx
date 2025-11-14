import { X } from "lucide-react";
import { useState, useEffect, useRef } from "react";

interface SelectionOverlayProps {
  onSelect: (bounds: { x: number; y: number; width: number; height: number }) => void;
  onClose: () => void;
}

export default function SelectionOverlay({ onSelect, onClose }: SelectionOverlayProps) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 });
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      setIsSelecting(true);
      setStartPos({ x: e.clientX, y: e.clientY });
      setCurrentPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isSelecting) {
        setCurrentPos({ x: e.clientX, y: e.clientY });
      }
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        const bounds = {
          x: Math.min(startPos.x, currentPos.x),
          y: Math.min(startPos.y, currentPos.y),
          width: Math.abs(currentPos.x - startPos.x),
          height: Math.abs(currentPos.y - startPos.y),
        };
        if (bounds.width > 10 && bounds.height > 10) {
          onSelect(bounds);
        }
        setIsSelecting(false);
      }
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isSelecting, startPos, currentPos, onSelect]);

  const selectionBounds = {
    x: Math.min(startPos.x, currentPos.x),
    y: Math.min(startPos.y, currentPos.y),
    width: Math.abs(currentPos.x - startPos.x),
    height: Math.abs(currentPos.y - startPos.y),
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
      style={{ cursor: isSelecting ? "crosshair" : "default" }}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={onClose}
          className="p-2 bg-discord-dark hover:bg-discord-secondary rounded-lg text-white transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {isSelecting && (
        <div
          className="absolute border-2 border-discord-accent bg-discord-accent/20 pointer-events-none"
          style={{
            left: `${selectionBounds.x}px`,
            top: `${selectionBounds.y}px`,
            width: `${selectionBounds.width}px`,
            height: `${selectionBounds.height}px`,
          }}
        >
          <div className="absolute -top-6 left-0 text-white text-sm font-mono bg-discord-dark px-2 py-1 rounded">
            {selectionBounds.width} × {selectionBounds.height} px
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-discord-dark p-4 rounded-lg border border-gray-700">
        <p className="text-white text-sm text-center">
          {isSelecting ? "Release to confirm selection" : "Click and drag to select canvas area"}
        </p>
      </div>
    </div>
  );
}
