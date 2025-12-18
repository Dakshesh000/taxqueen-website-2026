import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const navbarHeight = 64;
      // Lock when image would reach navbar (around 280px scroll based on translateY calc)
      const lockPoint = 280;
      const maxScroll = window.innerHeight * 0.5;
      
      if (scrollY >= lockPoint) {
        setIsLocked(true);
        setScrollProgress(1);
      } else {
        setIsLocked(false);
        const progress = Math.min(scrollY / maxScroll, 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate dynamic values based on scroll
  const videoPadding = isLocked ? 8 : 40 - scrollProgress * 32;
  const videoTranslateY = isLocked ? -280 : -scrollProgress * 280;

  return (
    <section className="relative min-h-[110vh] bg-white">
      {/* Text Content Section */}
      <div 
        className={`${isLocked ? 'relative' : 'sticky top-0'} z-20 pt-32 pb-12`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl xl:max-w-4xl mx-auto text-center space-y-6">
            {/* Optional Text / Badge */}
            <p className="text-sm font-medium text-foreground uppercase tracking-wider">
              For Nomads With US Tax Obligations
            </p>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight uppercase">
              TAXES FOR DIGITAL NOMADS.{" "}
              <span className="text-foreground">SIMPLIFIED.</span>
            </h1>

            {/* Tagline */}
            <p className="text-lg sm:text-xl xl:text-2xl text-foreground max-w-2xl xl:max-w-3xl mx-auto">
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

      {/* Video/Image Frame - Expands on scroll until locked */}
      <div 
        className="relative z-10 mx-auto transition-all duration-300 ease-out will-change-transform"
        style={{
          padding: `${videoPadding}px`,
          transform: `translateY(${videoTranslateY}px)`,
          maxWidth: `calc(100% - ${videoPadding * 2}px)`,
        }}
      >
        <div className="relative w-full h-[70vh] sm:h-[80vh] xl:h-[85vh] 2xl:h-[88vh] rounded-2xl overflow-hidden shadow-lift-lg">
          {/* Hero Image */}
          <img
            src={vanSnowMountains}
            alt="Digital nomad lifestyle - van in snowy mountain landscape"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Dynamic white overlay for text readability - increases with scroll */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-white via-white/60 to-transparent transition-opacity duration-300"
            style={{ opacity: scrollProgress * 0.85 }}
          />
          
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 transition-opacity duration-300"
        style={{ opacity: isLocked ? 0 : 1 - scrollProgress * 2 }}
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
