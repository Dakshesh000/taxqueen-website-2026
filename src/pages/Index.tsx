import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { HeroSection, SocialProofSection, FAQSection, ServicesSection } from "@/components/sections";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ComprehensiveFAQSection from "@/components/sections/ComprehensiveFAQSection";
import BlogSection from "@/components/sections/BlogSection";
import CompassChatButton from "@/components/CompassChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background snap-y snap-mandatory overflow-y-scroll h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <AboutSection />
        <FAQSection />
        <ServicesSection />
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