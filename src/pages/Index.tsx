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
 * Performance: Below-fold sections are lazy-loaded to reduce initial JS bundle
 * @see src/constants/layout.ts for layout constants
 */

import { lazy, Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection, SocialProofSection } from "@/components/sections";
import AboutSection from "@/components/sections/AboutSection";
import FeaturedInSection from "@/components/sections/FeaturedInSection";
import { CompassChatButton } from "@/components/common";
import usePageMeta from "@/hooks/usePageMeta";

// Lazy load below-fold sections to reduce initial JS bundle (~68KB savings)
const FAQSection = lazy(() => import("@/components/sections/FAQSection"));
const ServicesCards = lazy(() => import("@/components/sections/ServicesCards"));
const ProcessStepsSection = lazy(() => import("@/components/sections/ProcessStepsSection"));
const ComparisonSection = lazy(() => import("@/components/sections/ComparisonSection"));
const TestimonialsSection = lazy(() => import("@/components/sections/TestimonialsSection"));
const ComprehensiveFAQSection = lazy(() => import("@/components/sections/ComprehensiveFAQSection"));
const BlogSection = lazy(() => import("@/components/sections/BlogSection"));
const ParallaxDivider = lazy(() => import("@/components/ui/ParallaxDivider"));

// Parallax images (imported eagerly for lazy component props)
import truckStormySky from "@/assets/lifestyle/truck-stormy-sky.jpeg";
import { womanWorkingViews3 } from "@/assets";

// Fallback component for lazy-loaded sections
const SectionFallback = () => (
  <div className="h-64 bg-muted/30 animate-pulse" aria-hidden="true" />
);

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
        <Suspense fallback={<SectionFallback />}>
          <ParallaxDivider 
            image={truckStormySky}
            text="Adventure Awaits"
            subtext="Let us handle your taxes while you explore the open road"
          />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ParallaxDivider 
            image={womanWorkingViews3}
            text="Life on Your Terms"
            subtext="Work from anywhere while we handle the tax complexities"
          />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ServicesCards />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProcessStepsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ComparisonSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ComprehensiveFAQSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <BlogSection />
        </Suspense>
      </main>
      <Footer />
      <CompassChatButton />
    </div>
  );
};

export default Index;