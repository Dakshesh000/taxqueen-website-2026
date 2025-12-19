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
  height = "h-[300px]",
  className 
}: ParallaxDividerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section 
      ref={sectionRef}
      className={cn(
        "relative bg-fixed bg-cover bg-center",
        height,
        className
      )}
      style={{ 
        backgroundImage: isVisible ? `url(${image})` : undefined,
        backgroundColor: !isVisible ? "hsl(var(--muted))" : undefined
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      {(text || subtext) && (
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          {text && (
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-wide">
              {text}
            </h2>
          )}
          {subtext && (
            <p className="mt-4 text-lg md:text-xl text-white/90 max-w-2xl">
              {subtext}
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default ParallaxDivider;
