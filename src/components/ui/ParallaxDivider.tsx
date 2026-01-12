import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ParallaxDividerProps {
  image: string;
  text?: string;
  subtext?: string;
  height?: string;
  className?: string;
}

const ParallaxDivider = ({ 
  image, 
  text, 
  subtext,
  height = "h-[250px] sm:h-[300px]",
  className 
}: ParallaxDividerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0.5);
  const [isIOS, setIsIOS] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Detect iOS for background-attachment fix
  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  // Preload image early and lazy load when section approaches viewport
  useEffect(() => {
    // Preload the image immediately
    const img = new Image();
    img.src = image;
    img.onload = () => setIsVisible(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "500px" } // Preload 500px before visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [image]);

  // Dynamic overlay opacity based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const sectionCenter = rect.top + rect.height / 2;
      const viewportCenter = viewportHeight / 2;

      // Calculate distance from center (0 = perfectly centered)
      const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
      const maxDistance = viewportHeight / 2 + rect.height / 2;

      // Normalize to 0-1 range, where 0 = center, 1 = far from center
      const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

      // Map to opacity: center = 0.15 (reduced), edges = 0.5 (full)
      // Using easeOutQuad for smoother transition
      const eased = 1 - Math.pow(1 - normalizedDistance, 2);
      const opacity = 0.15 + (eased * 0.35);
      setOverlayOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative bg-cover bg-center",
        // Use bg-scroll on iOS (bg-fixed doesn't work), bg-fixed on desktop
        isIOS ? "bg-scroll" : "bg-fixed",
        height,
        className
      )}
      style={{ 
        backgroundImage: isVisible ? `url(${image})` : undefined,
        backgroundColor: !isVisible ? "hsl(var(--muted))" : undefined
      }}
    >
      {/* Dynamic dark overlay - opacity changes based on scroll position */}
      <div 
        className="absolute inset-0 transition-opacity duration-150"
        style={{ backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})` }}
      />
      
      {/* Content */}
      {(text || subtext) && (
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {text && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide">
              {text}
            </h2>
          )}
          {subtext && (
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl">
              {subtext}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default ParallaxDivider;
