import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useQuiz } from "@/contexts/QuizContext";
import { heroVideoThumbnail } from "@/assets";
import { useIsMobile } from "@/hooks/use-mobile";

const HeroSection = () => {
  const { openQuiz } = useQuiz();
  const isMobile = useIsMobile();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const lockPoint = isMobile ? 200 : 280;
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
  }, [isMobile]);

  // Mobile: full-bleed video with no padding, height animates from 70vh to 100vh
  // Desktop: animated padding based on scroll
  const minPadding = isMobile ? 0 : 16;
  const maxPadding = isMobile ? 0 : 56;
  const videoPadding = minPadding + (maxPadding - minPadding) * (1 - scrollProgress);
  const videoTranslateY = isLocked ? (isMobile ? -200 : -280) : -scrollProgress * (isMobile ? 200 : 280);
  const textTranslateY = scrollProgress * 150;

  // Mobile video dimensions: smoothly interpolate from 70% to 100% based on scroll
  const mobileStart = 70; // Start at 70% width and 70vh height
  const mobileEnd = 100;  // End at 100% width and 100vh height
  const mobileVideoWidth = isMobile 
    ? (isLocked ? mobileEnd : mobileStart + (mobileEnd - mobileStart) * scrollProgress)
    : null;
  const mobileVideoHeight = isMobile 
    ? (isLocked ? mobileEnd : mobileStart + (mobileEnd - mobileStart) * scrollProgress)
    : null;
  
  // Mobile: show rounded corners while expanding, remove when fully expanded
  const mobileFullyExpanded = isMobile && (isLocked || (mobileVideoWidth && mobileVideoWidth >= 99));

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

      {/* Video/Image Frame - Width & height animate 70%→100% on mobile */}
      <div 
        className={`relative mx-auto transition-all duration-300 ease-out will-change-transform ${
          isMobile ? 'z-[60] -mt-16' : 'z-20'
        }`}
        style={{
          padding: isMobile ? 0 : `${videoPadding}px`,
          transform: `translateY(${videoTranslateY}px)`,
          // Mobile: width animates from 70% to 100%
          // Desktop: uses padding-based animation
          width: isMobile ? `${mobileVideoWidth}%` : undefined,
          maxWidth: isMobile ? `${mobileVideoWidth}%` : `calc(100% - ${videoPadding * 2}px)`,
        }}
      >
        <div 
          className={`relative w-full ${
            !isMobile && (isLocked ? 'h-screen' : 'h-[70vh] sm:h-[80vh] xl:h-[85vh] 2xl:h-[88vh]')
          } overflow-hidden shadow-lift-lg transition-all duration-300`}
          style={{
            height: isMobile ? `${mobileVideoHeight}vh` : undefined,
            // Rounded corners during expansion, none when fully expanded
            borderRadius: isMobile 
              ? (mobileFullyExpanded ? '0px' : '16px') 
              : (isLocked ? '0px' : '16px'),
          }}
        >
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