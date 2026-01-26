import { forwardRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import ChatDrawer from "./ChatDrawer";

const CompassChatButton = forwardRef<HTMLButtonElement>((_, ref) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  // Wiggle needle periodically to attract attention (only when chat is closed)
  useEffect(() => {
    if (isOpen) return;
    
    const wiggleInterval = setInterval(() => {
      setIsWiggling(true);
      setTimeout(() => setIsWiggling(false), 1200);
    }, 5000);

    return () => clearInterval(wiggleInterval);
  }, [isOpen]);

  // Show greeting once per session after delay
  useEffect(() => {
    const hasSeenGreeting = sessionStorage.getItem('chatGreetingSeen');
    if (hasSeenGreeting || isOpen) return;

    const showTimer = setTimeout(() => {
      setShowGreeting(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowGreeting(false);
      sessionStorage.setItem('chatGreetingSeen', 'true');
    }, 15000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [isOpen]);

  const dismissGreeting = () => {
    setShowGreeting(false);
    sessionStorage.setItem('chatGreetingSeen', 'true');
  };

  return (
    <>
      {/* Greeting Bubble */}
      {showGreeting && !isOpen && (
        <div className="fixed bottom-24 right-6 z-50 max-w-[240px] animate-fade-in-up">
          <div className="bg-primary rounded-2xl shadow-lg border border-primary/30 p-3 relative">
            <button
              onClick={dismissGreeting}
              className="absolute -top-2 -right-2 w-5 h-5 bg-white/20 rounded-full flex items-center justify-center text-xs text-primary-foreground hover:bg-white/30"
              aria-label="Dismiss"
            >
              ×
            </button>
            <p className="text-sm text-primary-foreground">
              Hey there, fellow traveler! 🧭 Need help navigating nomad taxes?
            </p>
          </div>
          {/* Speech bubble tail */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-primary border-r border-b border-primary/30 rotate-45 transform" />
        </div>
      )}

      <button
        ref={ref}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full",
          "bg-background shadow-lift-lg border-[3px] border-foreground",
          "hover:scale-110 hover:shadow-xl transition-all duration-300",
          "flex items-center justify-center group",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isOpen && "opacity-0 pointer-events-none"
        )}
        aria-label="Open chat assistant"
        aria-expanded={isOpen}
      >
        {/* Continuous pulse ring */}
        <span className="absolute inset-[-6px] rounded-full border-[3px] border-primary/50 animate-pulse-ring" />
        
        {/* Compass SVG */}
        <svg viewBox="0 0 100 100" className="w-10 h-10">
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
          
          {/* Needle group - only this rotates */}
          <g 
            className={cn(
              "origin-center transition-transform",
              isWiggling && "animate-needle-wiggle"
            )}
            style={{ transformOrigin: "50px 50px" }}
          >
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
          </g>
          
          {/* Center circle */}
          <circle cx="50" cy="50" r="6" fill="hsl(201 41% 51%)" />
          <circle cx="50" cy="50" r="3" fill="white" />
        </svg>
      </button>

      <ChatDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
});

CompassChatButton.displayName = "CompassChatButton";

export default CompassChatButton;
