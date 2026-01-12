import React from "react";
import { FileText, Sparkles, Compass, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/contexts/QuizContext";

// Service images - updated
import taxPrep1 from "@/assets/services/tax-preparation-new-2.jpg";
import taxStrategy1 from "@/assets/services/tax-strategy-new.jpg";
import miniSession1 from "@/assets/services/mini-session-new.jpg";

interface ServiceCardProps {
  image: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  features: string[];
  valueProp: string;
  qualifier?: string;
  ctaText: string;
  onGetStarted: () => void;
}

const ServiceCard = ({ 
  image, 
  icon: Icon, 
  title, 
  subtitle, 
  features, 
  valueProp, 
  qualifier, 
  ctaText, 
  onGetStarted 
}: ServiceCardProps) => (
  <div className="group flex flex-col bg-background rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-border h-full">
    {/* Header Image with Dark Overlay and Icon Badge */}
    <div className="relative aspect-[4/3] overflow-hidden">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {/* Dark overlay - appears on hover */}
      <div className="absolute inset-0 bg-black/0 transition-all duration-500 group-hover:bg-black/40 z-10" />
      {/* Icon badge above overlay */}
      <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-lg z-20">
        <Icon className="w-6 h-6 text-primary-foreground" />
      </div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl md:text-2xl font-bold text-foreground uppercase mb-2">
        {title}
      </h3>
      
      <p className="text-muted-foreground text-sm md:text-base mb-4">
        {subtitle}
      </p>

      {/* Features List */}
      <ul className="space-y-2 mb-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2 text-foreground text-sm md:text-base">
            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {/* Qualifier (optional) */}
      {qualifier && (
        <p className="text-xs text-muted-foreground italic mb-3">
          {qualifier}
        </p>
      )}

      {/* Value Proposition */}
      <p className="text-foreground font-bold text-sm md:text-base mb-6">
        {valueProp}
      </p>

      {/* CTA Button - pushed to bottom */}
      <Button variant="cta" className="w-full rounded-full mt-auto" onClick={onGetStarted}>
        {ctaText}
      </Button>
    </div>
  </div>
);

const ServicesCards = () => {
  const { openQuiz } = useQuiz();

  const services = [
    {
      image: taxPrep1,
      icon: FileText,
      title: "Tax Preparation",
      subtitle: "For US taxpayers who want filing done correctly and stress-free.",
      features: [
        "Federal + state filing for nomads",
        "Self-employment & business income handled",
        "Foreign Tax Credits (Form 1116)",
        "FBAR & FATCA compliance included",
      ],
      valueProp: "Avoid costly mistakes and take every deduction and credit.",
      ctaText: "Get Started",
    },
    {
      image: miniSession1,
      icon: Compass,
      title: "Mini Tax Plan",
      subtitle: "For those who need clarity on their current tax situation.",
      features: [
        "Retirement contribution guidance",
        "Estimated quarterly payment review",
        "Personalized situation analysis",
        "Follow-up call for Q&A",
      ],
      valueProp: "Stay on track with quarterly payments and avoid surprises.",
      ctaText: "Get Started",
    },
    {
      image: taxStrategy1,
      icon: Sparkles,
      title: "Tax Strategy",
      subtitle: "For business owners + freelancers who want a proactive plan.",
      features: [
        "Year-round tax optimization",
        "LLC vs S-Corp strategy",
        "Adjust as your situation changes",
        "Reduce your tax bill proactively",
      ],
      qualifier: "*For high-income earners with business and/or rental property.",
      valueProp: "Get a plan in place and a tax advisor to keep you on track.",
      ctaText: "Get Started",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase mb-4">
            Services I Offer
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here's how I can work with you
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {services.map((service) => (
            <ServiceCard
              key={service.title}
              {...service}
              onGetStarted={() => openQuiz()}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
