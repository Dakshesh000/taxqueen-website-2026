import { ReactNode, useState, useEffect } from "react";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import TravelCompass from "./TravelCompass";

interface QuestionWrapperProps {
  title: string;
  subtitle?: string;
  helpText?: string;
  backgroundImage: string;
  placeholderImage?: string; // Base64 LQIP for instant blur-up display
  children: ReactNode;
}

const QuestionWrapper = ({
  title,
  subtitle,
  helpText,
  backgroundImage,
  placeholderImage,
  children,
}: QuestionWrapperProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Trigger compass animation on mount
  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Preload the background image and fade in when ready
  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
  }, [backgroundImage]);

  return (
    <div className="relative min-h-[340px] sm:min-h-[380px] md:min-h-[420px] w-full overflow-hidden md:rounded-2xl">
      {/* Blurred LQIP placeholder - shows instantly */}
      {placeholderImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center scale-110"
          style={{ 
            backgroundImage: `url(${placeholderImage})`,
            filter: 'blur(20px)',
          }}
        />
      ) : (
        // Fallback gradient if no placeholder provided
        <div className="absolute inset-0 bg-gradient-to-br from-muted via-muted-foreground/20 to-muted" />
      )}
      
      {/* Full-quality background image - fades in when loaded */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          opacity: imageLoaded ? 1 : 0
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[340px] sm:min-h-[380px] md:min-h-[420px] px-3 sm:px-4 py-5 sm:py-6 md:py-8 text-center">
        {/* Custom Compass Icon with Animation */}
        <div className={`mb-4 p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 ${showAnimation ? "animate-needle-wiggle" : ""}`}>
          <TravelCompass size="md" animate={showAnimation} />
        </div>

        {/* Title with Help Tooltip */}
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary-foreground uppercase tracking-wide text-shadow-lg">
            {title}
          </h2>
          {helpText && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="p-1 rounded-full hover:bg-primary/20 transition-colors"
                    onClick={(e) => e.preventDefault()}
                  >
                    <HelpCircle className="w-4 h-4 text-primary-foreground/80" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  sideOffset={8}
                  className="max-w-xs text-sm bg-card text-card-foreground z-50"
                >
                  {helpText}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-primary-foreground/90 text-sm md:text-base mb-5 max-w-md text-shadow px-2">
            {subtitle}
          </p>
        )}

        {/* Question Content */}
        <div className="w-full max-w-lg">{children}</div>
      </div>
    </div>
  );
};

export default QuestionWrapper;
