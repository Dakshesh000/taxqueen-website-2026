import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";

const HeroSection = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const lockPoint = 280;
      const maxScroll = window.innerHeight * 0.5;
      const snapThreshold = 120; // Snap within 120px of lock point
      
      // Clear any pending snap timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      if (scrollY >= lockPoint) {
        setIsLocked(true);
        setScrollProgress(1);
      } else {
        setIsLocked(false);
        const progress = Math.min(scrollY / maxScroll, 1);
        setScrollProgress(progress);
        
        // JS-based snap: if user stops scrolling near lock point, snap to it
        if (scrollY > lockPoint - snapThreshold && scrollY < lockPoint) {
          scrollTimeoutRef.current = setTimeout(() => {
            window.scrollTo({
              top: lockPoint,
              behavior: 'smooth'
            });
          }, 150);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  // Calculate dynamic values based on scroll
  const videoPadding = isLocked ? 0 : 40 - scrollProgress * 40;
  const videoTranslateY = isLocked ? -280 : -scrollProgress * 280;
  const textTranslateY = scrollProgress * 150; // Text moves DOWN as user scrolls

  return (
    <section className="relative min-h-[110vh] bg-white">
      {/* Text Content Section */}
      <div 
        className={`${isLocked ? 'relative' : 'sticky top-0'} z-20 pt-32 pb-12 transition-transform duration-300 ease-out`}
        style={{
          transform: `translateY(${textTranslateY}px)`,
        }}
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
        <div className={`relative w-full ${isLocked ? 'h-screen' : 'h-[70vh] sm:h-[80vh] xl:h-[85vh] 2xl:h-[88vh]'} rounded-2xl overflow-hidden shadow-lift-lg transition-all duration-300`}>
          {/* Thumbnail - shows while video loads */}
          <img
            src={vanSnowMountains}
            alt="Digital nomad lifestyle - van in snowy mountain landscape"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Video - fades in when loaded */}
          <video
            src="/videos/hero-background.mp4"
            poster={vanSnowMountains}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlayThrough={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* Radial overlay for center text readability - increases with scroll */}
          <div 
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{ 
              background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.4) 30%, rgba(255,255,255,0.1) 50%, transparent 70%)',
              opacity: scrollProgress * 0.95
            }}
          />
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
