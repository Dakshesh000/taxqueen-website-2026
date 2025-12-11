import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ChatDrawer from "./ChatDrawer";

const CompassChatButton = () => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Spin periodically to attract attention (only when chat is closed)
  useEffect(() => {
    if (isOpen) return;
    
    const spinInterval = setInterval(() => {
      setIsSpinning(true);
      setTimeout(() => setIsSpinning(false), 1000);
    }, 5000);

    return () => clearInterval(spinInterval);
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full",
          "bg-background shadow-lift-lg border-2 border-primary/30",
          "hover:scale-110 hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center group",
          isOpen && "opacity-0 pointer-events-none"
        )}
        aria-label="Open chat"
      >
        {/* Compass SVG */}
        <svg
          viewBox="0 0 100 100"
          className={cn(
            "w-10 h-10 transition-transform duration-1000",
            isSpinning && "animate-[spin_1s_ease-in-out]"
          )}
        >
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(201 41% 51%)"
            strokeWidth="3"
          />
          
          {/* Inner ring */}
          <circle
            cx="50"
            cy="50"
            r="38"
            fill="none"
            stroke="hsl(201 41% 51%)"
            strokeWidth="1"
            opacity="0.5"
          />
          
          {/* Cardinal direction marks */}
          <line x1="50" y1="8" x2="50" y2="15" stroke="hsl(201 41% 51%)" strokeWidth="2" />
          <line x1="50" y1="85" x2="50" y2="92" stroke="hsl(201 41% 51%)" strokeWidth="2" />
          <line x1="85" y1="50" x2="92" y2="50" stroke="hsl(201 41% 51%)" strokeWidth="2" />
          <line x1="8" y1="50" x2="15" y2="50" stroke="hsl(201 41% 51%)" strokeWidth="2" />
          
          {/* Compass needle - North (Red) */}
          <polygon
            points="50,15 44,50 50,45 56,50"
            fill="#DC2626"
            className="drop-shadow-sm"
          />
          
          {/* Compass needle - South (Dark gray/steel) */}
          <polygon
            points="50,85 44,50 50,55 56,50"
            fill="hsl(201 41% 35%)"
            className="drop-shadow-sm"
          />
          
          {/* Center circle */}
          <circle cx="50" cy="50" r="6" fill="hsl(201 41% 51%)" />
          <circle cx="50" cy="50" r="3" fill="white" />
        </svg>
        
        {/* Pulse ring on hover */}
        <span className="absolute inset-0 rounded-full border-2 border-primary/50 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
      </button>

      <ChatDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default CompassChatButton;
