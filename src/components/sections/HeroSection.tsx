import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { truckDesert } from "@/assets";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = window.innerHeight * 0.5;
      const progress = Math.min(scrollY / maxScroll, 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate dynamic values based on scroll
  const videoPadding = 40 - scrollProgress * 32; // 40px -> 8px
  const videoTranslateY = -scrollProgress * 280; // Move up behind text

  return (
    <section className="relative min-h-[150vh] bg-white">
      {/* Text Content Section - Fixed position with high z-index */}
      <div className="sticky top-0 z-20 pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            {/* Optional Text / Badge */}
            <p className="text-sm font-medium text-foreground uppercase tracking-wider">
              For Nomads With US Tax Obligations
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight uppercase">
              TAXES FOR DIGITAL NOMADS.{" "}
              <span className="text-primary">SIMPLIFIED.</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl text-foreground max-w-2xl mx-auto">
              Your life is on the Road. Your Taxes shouldn't feel like a detour.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button variant="cta" size="xl">
                Get Started
              </Button>
              <Button variant="outline-cta" size="xl">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Video/Image Frame - Expands on scroll */}
      <div 
        className="relative z-10 mx-auto transition-all duration-100 ease-out"
        style={{
          padding: `${videoPadding}px`,
          transform: `translateY(${videoTranslateY}px)`,
          maxWidth: `calc(100% - ${videoPadding * 2}px)`,
        }}
      >
        <div className="relative w-full h-[60vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-lift-lg">
          {/* Placeholder Image (will be video later) */}
          <img
            src={truckDesert}
            alt="Digital nomad lifestyle - truck in desert landscape"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-300"
        style={{ opacity: 1 - scrollProgress * 2 }}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-float" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
