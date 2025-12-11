import { useState } from "react";
import { ChevronLeft, ChevronRight, ClipboardCheck, Lightbulb, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Tax Preparation",
    description: "Complete filing services for digital nomads with international income, foreign tax credits, and multi-state considerations.",
    features: [
      "Federal & State Returns",
      "Foreign Tax Credit Forms",
      "FBAR & FATCA Reporting",
      "Quarterly Estimates",
    ],
    icon: ClipboardCheck,
  },
  {
    title: "Tax Strategy",
    description: "Proactive planning to minimize your tax burden while staying compliant as you move between countries and states.",
    features: [
      "Tax Residency Planning",
      "Deduction Maximization",
      "Business Structure Advice",
      "Year-Round Support",
    ],
    icon: Lightbulb,
  },
  {
    title: "1-on-1 Consultation",
    description: "Personalized guidance sessions to answer your specific questions and create a custom tax roadmap for your lifestyle.",
    features: [
      "30-Minute Strategy Call",
      "Custom Action Plan",
      "Email Follow-Up",
      "Resource Library Access",
    ],
    icon: Users,
  },
];

const ServicesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + services.length) % services.length;
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length);
  };

  const getCardStyle = (position: "left" | "center" | "right") => {
    switch (position) {
      case "left":
        return "rotate-[-8deg] scale-[0.85] opacity-50 -translate-x-4";
      case "right":
        return "rotate-[8deg] scale-[0.85] opacity-50 translate-x-4";
      case "center":
        return "rotate-0 scale-100 opacity-100 z-10";
    }
  };

  const renderCard = (serviceIndex: number, position: "left" | "center" | "right") => {
    const service = services[serviceIndex];
    const Icon = service.icon;
    const isCenter = position === "center";

    return (
      <div
        className={cn(
          "w-[300px] md:w-[340px] bg-background rounded-2xl p-6 transition-all duration-500 ease-out flex-shrink-0",
          getCardStyle(position),
          isCenter ? "shadow-lift-lg border-2 border-primary" : "shadow-md"
        )}
      >
        {/* Icon */}
        <div className="w-12 h-12 rounded-xl bg-section-blue flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-primary" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-foreground mb-3">{service.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
          {service.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              <span className="text-foreground font-medium">{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button variant="cta" className="w-full rounded-xl">
          Get Started
        </Button>
      </div>
    );
  };

  return (
    <section id="services" className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-center uppercase mb-16">
          Services I Offer
        </h2>

        {/* Carousel */}
        <div className="relative flex items-center justify-center">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-0 md:left-8 lg:left-16 z-20 w-12 h-12 rounded-full bg-muted/80 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Cards Container */}
          <div className="flex items-center justify-center gap-0 md:gap-4 py-8">
            {/* Left Card */}
            <div className="hidden md:block">
              {renderCard(getCardIndex(-1), "left")}
            </div>

            {/* Center Card */}
            {renderCard(getCardIndex(0), "center")}

            {/* Right Card */}
            <div className="hidden md:block">
              {renderCard(getCardIndex(1), "right")}
            </div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-0 md:right-8 lg:right-16 z-20 w-12 h-12 rounded-full bg-muted/80 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
            aria-label="Next service"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {services.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                currentIndex === idx ? "bg-primary w-6" : "bg-muted-foreground/30"
              )}
              aria-label={`Go to service ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
