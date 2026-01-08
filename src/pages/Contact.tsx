import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import GlobalQuiz from "@/components/quiz/GlobalQuiz";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Award,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import heatherHiking from "@/assets/lifestyle/heather-hiking-nature.jpg";

const Contact = () => {
  const { toast } = useToast();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24-48 hours.",
    });
  };

  const credentials = [
    { icon: Shield, label: "Enrolled Agent (EA)" },
    { icon: Calendar, label: "EA Since 2014" },
    { icon: Award, label: "Tax Strategist" },
    { icon: MapPin, label: "Full-Time Nomad Since 2016" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Introduction Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heatherHiking} 
                  alt="Heather hiking in nature"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary">
                Let's Connect
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                Let's Start Your Tax Journey
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether you're just curious about nomad taxes, ready to file, or looking for ongoing strategy — 
                I'm here to help you navigate the complexities with confidence. No judgment, no jargon, 
                just real solutions from someone who understands your lifestyle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Booking Widget - 30/70 Split */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[30%_70%] gap-8">
            {/* Column 1 - 30% - Send a Message + Credentials */}
            <div className="space-y-8">
              <div id="contact-form" className="scroll-mt-32">
                <h2 className="text-2xl font-bold text-foreground mb-6 uppercase">Send a Message</h2>
                <div className="bg-muted/30 rounded-2xl p-6">
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <select 
                        id="subject" 
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        required
                      >
                        <option value="">Select a topic...</option>
                        <option value="tax-prep">Tax Preparation</option>
                        <option value="tax-strategy">Tax Strategy</option>
                        <option value="mini-session">Mini Session Question</option>
                        <option value="general">General Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell me about your situation..." 
                        rows={4}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </div>
              </div>

              {/* Credentials below form */}
              <div className="bg-primary text-primary-foreground rounded-2xl p-6">
                <div className="space-y-4">
                  {credentials.map((cred, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <cred.icon className="w-5 h-5 flex-shrink-0" />
                      <span className="font-medium text-sm">{cred.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 - 70% - Booking Widget */}
            <div id="booking" className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-foreground mb-6 uppercase">Book a Discovery Call</h2>
              <div className="bg-muted/30 rounded-2xl p-4">
                <iframe
                  src="https://bookme.name/embed/widget/4573/PkkmsRgxM6nqOnUWU19ErYrgjwUnFdCG9FxGCRAmDRfX8SgQudeXGIPa1h36"
                  width="100%"
                  height="700"
                  frameBorder="0"
                  className="rounded-lg"
                  title="Book a discovery call with Tax Queen"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Not Sure Where To Get Started? Take The Quiz */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground uppercase">
              Not Sure Where To Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mt-2">
              Take The Quiz
            </p>
          </div>
          <GlobalQuiz isEmbedded={true} />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
