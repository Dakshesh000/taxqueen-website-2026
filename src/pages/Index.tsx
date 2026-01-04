import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection, SocialProofSection, FAQSection } from "@/components/sections";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ComprehensiveFAQSection from "@/components/sections/ComprehensiveFAQSection";
import BlogSection from "@/components/sections/BlogSection";
import CompassChatButton from "@/components/CompassChatButton";
import ServicesCards from "@/components/sections/ServicesCards";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ParallaxDivider from "@/components/ui/ParallaxDivider";
import FeaturedInSection from "@/components/sections/FeaturedInSection";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";

// Parallax images
import truckStormySky from "@/assets/lifestyle/truck-stormy-sky.jpeg";
import { womanWorkingViews3 } from "@/assets";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <AboutSection />
        <FeaturedInSection />
        <ParallaxDivider 
          image={truckStormySky}
          text="Adventure Awaits"
          subtext="Let us handle your taxes while you explore the open road"
        />
        <FAQSection />
        <ParallaxDivider 
          image={womanWorkingViews3}
          text="Life on Your Terms"
          subtext="Work from anywhere while we handle the tax complexities"
        />
        <ServicesCards />
        <ProcessStepsSection />
        <ComparisonSection />
        <TestimonialsSection />
        <ComprehensiveFAQSection />
        <BlogSection />
      </main>
      <Footer />
      <CompassChatButton />
    </div>
  );
};

export default Index;