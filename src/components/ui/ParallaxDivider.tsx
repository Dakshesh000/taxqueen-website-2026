import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const [overlayOpacity, setOverlayOpacity] = useState(0.35);
  const [isIOS, setIsIOS] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef<number | null>(null);
  const isMobile = useIsMobile();

  // Detect iOS for background-attachment fix
  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);

  // Preload image early and lazy load when section approaches viewport
  useEffect(() => {
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
      { rootMargin: "500px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [image]);

  // Optimized scroll handler using requestAnimationFrame
  const updateOverlay = useCallback(() => {
    if (!sectionRef.current) return;

    const rect = sectionRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;

    const distanceFromCenter = Math.abs(sectionCenter - viewportCenter);
    const maxDistance = viewportHeight / 2 + rect.height / 2;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);

    // Smoother easing for mobile
    const eased = 1 - Math.pow(1 - normalizedDistance, 2);
    const opacity = 0.15 + (eased * 0.35);
    setOverlayOpacity(opacity);
  }, []);

  // Dynamic overlay opacity based on scroll position - disabled on mobile for performance
  useEffect(() => {
    // On mobile, use static overlay for better performance
    if (isMobile) {
      setOverlayOpacity(0.35); // Static mid-range opacity
      return;
    }

    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateOverlay);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isMobile, updateOverlay]);

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative bg-cover bg-center will-change-auto",
        // Use bg-scroll on iOS and mobile (bg-fixed causes issues), bg-fixed on desktop
        isIOS || isMobile ? "bg-scroll" : "bg-fixed",
        height,
        className
      )}
      style={{ 
        backgroundImage: isVisible ? `url(${image})` : undefined,
        backgroundColor: !isVisible ? "hsl(var(--muted))" : undefined
      }}
    >
      {/* Dark overlay - static on mobile, dynamic on desktop */}
      <div 
        className={cn(
          "absolute inset-0",
          isMobile ? "" : "transition-opacity duration-150"
        )}
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
