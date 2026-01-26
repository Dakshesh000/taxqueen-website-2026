/**
 * Services Page
 * 
 * Displays Tax Queen service offerings including:
 * - Tax Preparation
 * - Tax Strategy/Planning
 * - Mini Sessions
 * 
 * Features embedded quiz for service recommendation.
 */

import { HelpCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalQuiz from "@/components/quiz/GlobalQuiz";
import ProcessStepsSection from "@/components/sections/ProcessStepsSection";
import ComparisonSection from "@/components/sections/ComparisonSection";
import ServicesTestimonialsCarousel from "@/components/sections/ServicesTestimonialsCarousel";
import ServicesCards from "@/components/sections/ServicesCards";
import ParallaxDivider from "@/components/ui/ParallaxDivider";
import { QuizProvider, useQuiz } from "@/contexts/QuizContext";
import { servicesHero, heatherPortrait, servicesCta } from "@/assets";
import usePageMeta from "@/hooks/usePageMeta";

const ServicesContent = () => {
  const { openQuiz } = useQuiz();

  // SEO meta tags for services page
  usePageMeta(
    "Tax Services for Digital Nomads | Tax Queen",
    "Professional tax preparation, strategy, and planning services designed for digital nomads, RV travelers, and location-independent professionals."
  );

  const painPoints = [
    "Staring at spreadsheets wondering what counts as a deduction",
    "Googling what an S corp is — and if your business should be one",
    "Unsure how to file taxes now that you're an LLC",
    "Worried about quarterly taxes (or thinking: wait — quarterly taxes?!)",
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main id="main-content">
        {/* Hero Section - Container with Rounded Image */}
      <section className="pt-24 pb-8 md:pt-28 md:pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-2xl overflow-hidden h-[280px] md:h-[320px]">
            <img
              src={servicesHero}
              alt="White RV motorhome with camping chairs at vibrant sunset"
              width={1200}
              height={800}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-foreground/50" />
            
            {/* Text - Bottom Left Aligned */}
            <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-2xl">
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white uppercase leading-tight">
                Tax Prep, Tax Review and Tax Planning
                <br />
                <span className="text-primary-foreground">For Digital Nomads</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Two-Column Content Section - White Background */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
                9 out of 10 small business owners say that working with a tax professional saves time and reduces stress.
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Your nomadic lifestyle is all about freedom — but you don't always feel free. Running a business from the road is hard. The dream of full-time travel gets drowned out by stress, confusion, and overwhelm.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                You want to get out and explore, but instead you're:
              </p>
              <ul className="space-y-3">
                {painPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Heather Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={heatherPortrait}
                  alt="Heather - Tax Queen, Enrolled Agent and Certified Tax Coach"
                  width={600}
                  height={800}
                  className="w-full h-auto object-cover max-h-[420px] object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Cards */}
      <ServicesCards />

      {/* How It Works - ProcessStepsSection */}
      <ProcessStepsSection />

      {/* Quiz Embedded Section - White Background */}
      <section id="quiz" className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground uppercase mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-muted-foreground">
                This quiz can help
              </p>
            </div>
            
            {/* Embedded Quiz - Fixed height container to prevent page jumping */}
            <div className="bg-background rounded-2xl shadow-lg border border-border overflow-hidden min-h-[620px]">
              <GlobalQuiz isEmbedded={true} />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Single View Carousel */}
      <ServicesTestimonialsCarousel />

      {/* Who's A Good Fit - ComparisonSection */}
      <ComparisonSection />

      {/* CTA Section with Parallax Effect */}
      <section className="relative">
        <ParallaxDivider
          image={servicesCta}
          height="h-[350px] md:h-[400px]"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white uppercase mb-4">
              Ready to Take Control of Your Taxes?
            </h2>
            <p className="text-white/90 text-lg md:text-xl max-w-xl mx-auto mb-8">
              Stop stressing about taxes and start enjoying the nomad life you deserve.
            </p>
            <Button
              variant="cta"
              size="lg"
              className="rounded-full"
              onClick={() => openQuiz()}
            >
              Get Started
            </Button>
          </div>
        </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

const Services = () => {
  return (
    <QuizProvider>
      <ServicesContent />
    </QuizProvider>
  );
};

export default Services;