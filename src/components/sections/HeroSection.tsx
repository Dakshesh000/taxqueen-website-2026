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
  const minPadding = 16; // Keep 16px frame even when locked
  const maxPadding = 56; // Start 10% narrower for more immersive effect
  const videoPadding = minPadding + (maxPadding - minPadding) * (1 - scrollProgress);
  const videoTranslateY = isLocked ? -280 : -scrollProgress * 280;
  const textTranslateY = scrollProgress * 150; // Text moves DOWN as user scrolls

  return (
    <section className="relative min-h-[110vh] bg-white">
      {/* Text Content Section */}
      <div 
        className={`${isLocked ? 'relative' : 'sticky top-0'} z-10 pt-32 pb-12 transition-transform duration-300 ease-out`}
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
        className="relative z-20 mx-auto transition-all duration-300 ease-out will-change-transform"
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
          
          {/* Quiz Prompt Input Bar - inside video container at bottom */}
          <div 
            className="absolute bottom-8 left-1/2 w-full max-w-2xl px-6 z-10 transition-all duration-500"
            style={{ 
              opacity: isLocked ? 1 : 0,
              transform: `translateX(-50%) translateY(${isLocked ? 0 : 20}px)`
            }}
          >
            <div className="bg-white rounded-full shadow-2xl flex items-center p-2 pl-6 border border-border">
              <input
                type="text"
                placeholder="Your domicile state or current country of residence is..."
                className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-base"
                readOnly
              />
              <button className="bg-primary text-primary-foreground px-5 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                <span>Enter</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
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
