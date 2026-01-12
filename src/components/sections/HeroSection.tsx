import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";
import { heroVideoThumbnail } from "@/assets";

const HeroSection = () => {
  const { openQuiz } = useQuiz();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const lockPoint = 280;
      const maxScroll = window.innerHeight * 0.5;
      const snapThreshold = 120;
      
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

  const minPadding = 16;
  const maxPadding = 56;
  const videoPadding = minPadding + (maxPadding - minPadding) * (1 - scrollProgress);
  const videoTranslateY = isLocked ? -280 : -scrollProgress * 280;
  const textTranslateY = scrollProgress * 150;

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
              <Button variant="cta" size="xl" onClick={() => openQuiz()}>
                Get Started
              </Button>
              <Button variant="outline-cta" size="xl" asChild>
                <Link to="/services">Learn More</Link>
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
            src={heroVideoThumbnail}
            alt="Aerial view of RV adventure - hero video thumbnail"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Video - fades in when loaded */}
          <video
            src="/videos/hero-background.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlayThrough={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
          
          {/* US Tax Obligations Question - Yes/No Buttons */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center z-10 transition-all duration-500 px-4 sm:px-6"
            style={{ 
              opacity: isLocked ? 1 : 0,
              pointerEvents: isLocked ? 'auto' : 'none'
            }}
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl sm:rounded-full py-4 px-5 sm:px-8 shadow-xl max-w-sm sm:max-w-none">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <span className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground text-center">
                  Do you have US Tax Obligations?
                </span>
                <div className="flex gap-3">
                  <Button
                    onClick={() => openQuiz("usTaxYes")}
                    className="h-11 px-6 text-base rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg transition-all hover:scale-105 border border-foreground"
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() => openQuiz("usTaxNo")}
                    className="h-11 px-6 text-base rounded-full bg-white hover:bg-gray-50 text-foreground font-semibold shadow-lg transition-all hover:scale-105 border border-foreground"
                  >
                    No
                  </Button>
                </div>
              </div>
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
