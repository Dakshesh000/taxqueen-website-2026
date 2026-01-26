/**
 * Index Page - Homepage
 * 
 * Main landing page for Tax Queen website featuring:
 * - Hero section with scroll-reactive video
 * - Social proof metrics
 * - About section with video
 * - Featured press mentions
 * - FAQ sections
 * - Services overview
 * - Process steps
 * - Testimonials
 * - Blog highlights
 * 
 * @see src/constants/layout.ts for layout constants
 */

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
import usePageMeta from "@/hooks/usePageMeta";

// Parallax images
import truckStormySky from "@/assets/lifestyle/truck-stormy-sky.jpeg";
import { womanWorkingViews3 } from "@/assets";

const Index = () => {
  // SEO meta tags for homepage
  usePageMeta(
    "Tax Queen | Expert Tax Services for Digital Nomads & RV Travelers",
    "Specialized tax preparation, planning, and strategy for US citizens living abroad, digital nomads, and location-independent professionals. Enrolled Agent since 2014."
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
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