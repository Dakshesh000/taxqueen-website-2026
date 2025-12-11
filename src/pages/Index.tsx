import Navbar from "@/components/layout/Navbar";
import { HeroSection, SocialProofSection } from "@/components/sections";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <SocialProofSection />
      </main>
    </div>
  );
};

export default Index;