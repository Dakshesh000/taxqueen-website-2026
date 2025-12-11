import Navbar from "@/components/layout/Navbar";
import { HeroSection, SocialProofSection, FAQSection, ServicesSection } from "@/components/sections";
import AboutSection from "@/components/sections/AboutSection";
import CompassChatButton from "@/components/CompassChatButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <AboutSection />
        <FAQSection />
        <ServicesSection />
      </main>
      <CompassChatButton />
    </div>
  );
};

export default Index;