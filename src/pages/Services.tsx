import { Play, HelpCircle, MessageSquare, Upload, CheckCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ServicesTimeline from "@/components/sections/ServicesTimeline";
import heatherPortrait from "@/assets/heather/portrait-square.png";
import { useQuiz } from "@/contexts/QuizContext";

const Services = () => {
  const { openQuiz } = useQuiz();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const processSteps = [
    {
      icon: HelpCircle,
      title: "Take the Quiz",
      description: "Find which service fits your unique needs",
    },
    {
      icon: MessageSquare,
      title: "Discovery Call",
      description: "We learn about your situation and goals",
    },
    {
      icon: Upload,
      title: "Onboarding",
      description: "Secure document upload & account setup",
    },
    {
      icon: CheckCircle,
      title: "Done!",
      description: "Relax while we handle the rest",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section - 2 Column Video + Text */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Video */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-muted">
              {!isVideoPlaying ? (
                <>
                  <img
                    src={heatherPortrait}
                    alt="Heather - Tax Queen"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-foreground/20 flex items-center justify-center">
                    <button
                      onClick={() => setIsVideoPlaying(true)}
                      className="w-20 h-20 rounded-full bg-primary flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      aria-label="Play video"
                    >
                      <Play className="w-8 h-8 text-primary-foreground ml-1" fill="currentColor" />
                    </button>
                  </div>
                </>
              ) : (
                <iframe
                  src="https://www.youtube.com/embed/wSL699Bqs30?autoplay=1&rel=0"
                  title="Tax Queen Introduction"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              )}
            </div>

            {/* Right: Text Content */}
            <div className="space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase">
                Tax Services Built for Life on the Road
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I understand the unique challenges of the digital nomad lifestyle because I live it too. 
                From multi-state filing complexities to maximizing deductions for remote workers, 
                I've got you covered so you can focus on what matters most — your freedom.
              </p>
              <Button
                variant="cta"
                size="lg"
                className="rounded-full"
                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Services
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quiz Placeholder Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-background rounded-2xl shadow-lg p-8 md:p-12 border-2 border-dashed border-primary/30">
              <HelpCircle className="w-16 h-16 text-primary mx-auto mb-6" />
              <h2 className="text-2xl md:text-3xl font-bold text-foreground uppercase mb-4">
                Not Sure Which Service You Need?
              </h2>
              <p className="text-muted-foreground mb-8">
                Take our quick quiz to find the perfect fit for your unique tax situation.
              </p>
              <Button
                variant="cta"
                size="lg"
                className="rounded-full"
                onClick={() => openQuiz()}
              >
                Take the Quiz
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Timeline - Existing Component */}
      <ServicesTimeline />

      {/* How It Works - 4 Step Process */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From first click to filed taxes — here's what to expect
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={step.title} className="relative">
                {/* Connector Line (hidden on last item) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-full h-0.5 bg-primary/30" />
                )}

                <div className="bg-background rounded-2xl p-6 shadow-md text-center relative z-10">
                  {/* Step Number */}
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                    {index + 1}
                  </div>

                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with Booking Widget */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground uppercase mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Book your free discovery call and let's talk about your tax situation.
            </p>

            {/* Booking Widget Embed */}
            <div className="bg-background rounded-2xl shadow-lg overflow-hidden border border-border">
              <iframe
                src="https://bookme.name/embed/widget/4573/PkkmsRgxM6nqOnUWU19ErYrgjwUnFdCG9FxGCRAmDRfX8SgQudeXGIPa1h36"
                width="100%"
                height="600"
                frameBorder="0"
                title="Book a Discovery Call"
                className="w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
