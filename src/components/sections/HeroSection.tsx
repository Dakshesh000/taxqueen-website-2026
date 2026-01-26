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
    let ticking = false;
    
    const handleScroll = () => {
      if (ticking) return;
      
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        // Mobile uses lower lock point for scroll snap
        const lockPoint = isMobile ? 180 : 280;
        const maxScroll = window.innerHeight * 0.5;
        
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
          
          // Native CSS scroll-snap handles snapping on mobile
          // Only use JS snap assist on desktop
          if (!isMobile) {
            const snapThreshold = 100;
            if (scrollY > lockPoint - snapThreshold && scrollY < lockPoint) {
              scrollTimeoutRef.current = setTimeout(() => {
                window.scrollTo({
                  top: lockPoint,
                  behavior: 'smooth'
                });
              }, 150);
            }
          }
        }
        
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMobile]);

  // Mobile: full-bleed video with no padding, height animates from 70vh to 100dvh
  // Desktop: animated padding based on scroll
  const minPadding = isMobile ? 0 : 16;
  const maxPadding = isMobile ? 0 : 56;
  const videoPadding = minPadding + (maxPadding - minPadding) * (1 - scrollProgress);
  const videoTranslateY = isLocked ? (isMobile ? -180 : -280) : -scrollProgress * (isMobile ? 180 : 280);
  const textTranslateY = scrollProgress * 150;

  // GPU-composited scale animation (avoids layout recalculation)
  // Mobile: scale from 0.7 to 1.0 as user scrolls
  const mobileScale = isMobile 
    ? (isLocked ? 1 : 0.7 + 0.3 * scrollProgress)
    : 1;
  
  // Mobile: show rounded corners while scaling up, remove when fully expanded
  const mobileFullyExpanded = isMobile && (isLocked || mobileScale >= 0.99);

  return (
    <section 
      className="relative min-h-[110vh] bg-white"
      style={{
        // Enable scroll snap on mobile for smooth stopping points
        scrollSnapAlign: isMobile ? 'start' : undefined,
      }}
    >
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

      {/* Video/Image Frame - GPU-composited scale animation */}
      <div 
        className={`relative mx-auto transition-transform duration-300 ease-out will-change-transform ${
          isMobile ? 'z-[60] w-full' : 'z-20'
        }`}
        style={{
          // Only GPU-composited properties: transform (translateY + scale)
          transform: `translateY(${videoTranslateY}px) scale(${mobileScale})`,
          transformOrigin: 'center top',
          // Desktop padding (static, not animated)
          padding: isMobile ? 0 : `${videoPadding}px`,
          maxWidth: isMobile ? '100%' : `calc(100% - ${videoPadding * 2}px)`,
        }}
      >
        <div 
          className={`relative w-full ${
            !isMobile && (isLocked ? 'h-screen' : 'h-[70vh] sm:h-[80vh] xl:h-[85vh] 2xl:h-[88vh]')
          } overflow-hidden shadow-lift-lg transition-[border-radius] duration-300`}
          style={{
            // Use 100dvh on mobile when locked for true full-screen (accounts for browser chrome)
            height: isMobile 
              ? (isLocked ? '100dvh' : '100vh')
              : undefined,
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
            width={1920}
            height={1080}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
            loading="eager"
            fetchPriority="high"
          />
          
          {/* Video - fades in when loaded */}
          <video
            src="/videos/hero-background.mp4"
            poster={heroVideoThumbnail}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlayThrough={() => setIsVideoLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            {/* Accessibility: Captions track for deaf/hard-of-hearing users */}
            <track 
              kind="captions" 
              src="/videos/hero-captions.vtt" 
              srcLang="en" 
              label="English captions"
            />
          </video>
          
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
