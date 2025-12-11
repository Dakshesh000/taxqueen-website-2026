import { Button } from "@/components/ui/button";
import { womanWorkingViews } from "@/assets";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${womanWorkingViews})` }}
      >
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div 
            className="inline-block opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="glass px-4 py-2 rounded-full text-sm font-medium text-white uppercase tracking-wider">
              Digital Nomad Tax Expert
            </span>
          </div>

          {/* Headline */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight text-shadow-lg opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Taxes Shouldn't Ground Your Freedom
          </h1>

          {/* Subheadline */}
          <p 
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto text-shadow opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            Specialized tax solutions for digital nomads, remote workers, and location-independent entrepreneurs. 
            Navigate multi-state and international taxes with confidence.
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center pt-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button variant="cta" size="xl">
              Get Started
            </Button>
            <Button variant="glass" size="xl">
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in-up"
        style={{ animationDelay: "0.6s" }}
      >
        <a 
          href="#about" 
          className="flex flex-col items-center gap-2 text-white/70 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-float" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
