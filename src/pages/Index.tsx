import Navbar from "@/components/layout/Navbar";
import { HeroSection, SocialProofSection } from "@/components/sections";
import AboutSection from "@/components/sections/AboutSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
        <AboutSection />
      </main>
    </div>
  );
};

export default Index;