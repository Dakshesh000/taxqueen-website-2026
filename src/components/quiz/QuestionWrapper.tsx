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
  children: ReactNode;
}

const QuestionWrapper = ({
  title,
  subtitle,
  helpText,
  backgroundImage,
  children,
}: QuestionWrapperProps) => {
  const [showAnimation, setShowAnimation] = useState(false);

  // Trigger compass animation on mount
  useEffect(() => {
    setShowAnimation(true);
    const timer = setTimeout(() => setShowAnimation(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-[380px] md:min-h-[420px] w-full overflow-hidden md:rounded-2xl">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/60 to-foreground/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[380px] md:min-h-[420px] px-4 py-6 md:py-8 text-center">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="p-1 rounded-full hover:bg-primary/20 transition-colors">
                    <HelpCircle className="w-4 h-4 text-primary-foreground/80" />
                  </button>
                </TooltipTrigger>
                <TooltipContent
                  side="top"
                  className="max-w-xs text-sm bg-card text-card-foreground"
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
