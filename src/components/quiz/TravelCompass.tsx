import { cn } from "@/lib/utils";

interface TravelCompassProps {
  className?: string;
  animate?: boolean;
  size?: "sm" | "md" | "lg";
}

const TravelCompass = ({ className, animate = true, size = "md" }: TravelCompassProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };

  return (
    <svg viewBox="0 0 100 100" className={cn(sizeClasses[size], className)}>
      {/* Outer ring */}
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        className="text-primary-foreground"
      />
      
      {/* Inner ring */}
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
        className="text-primary-foreground"
      />
      
      {/* Cardinal direction marks */}
      <line x1="50" y1="8" x2="50" y2="15" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" />
      <line x1="50" y1="85" x2="50" y2="92" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" />
      <line x1="85" y1="50" x2="92" y2="50" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" />
      <line x1="8" y1="50" x2="15" y2="50" stroke="currentColor" strokeWidth="2" className="text-primary-foreground" />
      
      {/* Needle group - only this rotates */}
      <g 
        className={cn(
          "origin-center transition-transform",
          animate && "animate-needle-wiggle"
        )}
        style={{ transformOrigin: "50px 50px" }}
      >
        {/* Compass needle - North (Red) */}
        <polygon
          points="50,15 44,50 50,45 56,50"
          fill="#DC2626"
          className="drop-shadow-sm"
        />
        
        {/* Compass needle - South (Steel Blue) */}
        <polygon
          points="50,85 44,50 50,55 56,50"
          fill="hsl(201 41% 35%)"
          className="drop-shadow-sm"
        />
      </g>
      
      {/* Center circle */}
      <circle cx="50" cy="50" r="6" fill="currentColor" className="text-primary-foreground" />
      <circle cx="50" cy="50" r="3" fill="white" />
    </svg>
  );
};

export default TravelCompass;
