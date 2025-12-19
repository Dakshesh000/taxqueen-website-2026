import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useQuiz } from "@/contexts/QuizContext";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  Award,
  ArrowRight,
  ClipboardList,
  Phone,
  Mail,
  ExternalLink
} from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import heatherHiking from "@/assets/lifestyle/heather-hiking-nature.jpg";
import heatherPortrait from "@/assets/heather/portrait-square.png";
import heatherInVan from "@/assets/heather/heather-in-van.jpg";
import heatherWhale from "@/assets/lifestyle/heather-whale-baja.png";

const Contact = () => {
  const { toast } = useToast();
  const { openQuiz } = useQuiz();

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

  const featuredIn = [
    { name: "Drivin' & Vibin'", url: "https://drivinandvibin.com" },
    { name: "Rootless Living", url: "https://rootlessliving.com" },
    { name: "Heath & Alyssa", url: "https://heathandalyssa.com" },
    { name: "XSCAPERS", url: "https://xscapers.com" },
    { name: "Nervda", url: "https://nervda.com" },
  ];

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Introduction Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Image - no badge */}
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
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="gap-2" onClick={() => openQuiz()}>
                  Take the Quiz <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Work With Heather - Trust Gallery */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">Why Work With Me</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              More Than Just a Tax Professional
            </h2>
          </div>

          {/* Image 1 - Portrait with credentials */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-xl max-w-md mx-auto lg:mx-0">
              <img 
                src={heatherPortrait} 
                alt="Heather professional portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Expertise You Can Trust
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                As an Enrolled Agent licensed by the IRS, I have the credentials to represent you 
                before the IRS and handle even the most complex tax situations. But more importantly, 
                I specialize in the unique tax challenges that digital nomads face.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center gap-3 text-foreground">
                  <Shield className="w-5 h-5 text-primary" />
                  IRS-licensed Enrolled Agent
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <Award className="w-5 h-5 text-primary" />
                  10+ years of tax experience
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <MapPin className="w-5 h-5 text-primary" />
                  Nomad tax specialist since 2016
                </li>
              </ul>
            </div>
          </div>

          {/* Image 2 - Van life context */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1 space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                I Live This Life Too
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Since 2016, I've been living the nomad lifestyle full-time. From RVs to van life, 
                I've navigated every tax scenario you might face. When you work with me, you're 
                working with someone who truly understands the challenges and opportunities of 
                location-independent living.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I know what it's like to earn income from multiple states, work remotely for 
                foreign companies, and manage a business from the road. Your situation isn't 
                weird to me — it's my everyday reality.
              </p>
            </div>
            <div className="order-1 lg:order-2 aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={heatherInVan} 
                alt="Heather working in her van"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Image 3 - Fun personality */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={heatherWhale} 
                alt="Heather whale watching in Baja"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">
                Not Your Typical Accountant
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, I'm a tax professional. But I'm also someone who loves adventure, 
                values freedom, and believes life is meant to be lived fully. I bring 
                that same energy to my work — making taxes less intimidating and more 
                empowering.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I'll never make you feel judged for your lifestyle choices or confused 
                by unnecessary jargon. My goal is to help you feel confident and in 
                control of your tax situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials Strip */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {credentials.map((cred, index) => (
              <div key={index} className="flex items-center gap-3">
                <cred.icon className="w-6 h-6" />
                <span className="font-medium">{cred.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured In Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <p className="text-center text-muted-foreground mb-8 uppercase tracking-wider text-sm font-medium">
            As Featured In
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {featuredIn.map((feature, index) => (
              <a
                key={index}
                href={feature.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="text-lg font-semibold">{feature.name}</span>
                <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Options - 3 Column */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              How Can I Help You?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the option that best fits where you are in your journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Option 1: Take the Quiz */}
            <div className="bg-background rounded-2xl p-8 shadow-lg text-center space-y-4 border border-primary/20 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <ClipboardList className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Take the Quiz</h3>
              <p className="text-muted-foreground text-sm">
                Not sure which service you need? Our quick quiz will help you find the perfect fit.
              </p>
              <Button className="w-full gap-2" onClick={() => openQuiz()}>
                Get Started <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Option 2: Book a Call */}
            <div className="bg-background rounded-2xl p-8 shadow-lg text-center space-y-4 border border-primary/20 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Phone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Book a Call</h3>
              <p className="text-muted-foreground text-sm">
                Ready to chat? Schedule a discovery call and let's discuss your tax situation.
              </p>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => scrollToSection("booking")}
              >
                Schedule Now <Calendar className="w-4 h-4" />
              </Button>
            </div>

            {/* Option 3: Send a Message */}
            <div className="bg-background rounded-2xl p-8 shadow-lg text-center space-y-4 border border-primary/20 hover:border-primary/50 transition-colors">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Send a Message</h3>
              <p className="text-muted-foreground text-sm">
                Have a quick question? Drop me a message and I'll get back to you soon.
              </p>
              <Button 
                variant="outline" 
                className="w-full gap-2"
                onClick={() => scrollToSection("contact-form")}
              >
                Contact Me <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Booking Widget */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div id="contact-form" className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-foreground mb-6">Send a Message</h2>
              <div className="bg-muted/30 rounded-2xl p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your@email.com" required />
                    </div>
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
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </div>
            </div>

            {/* Booking Widget */}
            <div id="booking" className="scroll-mt-32">
              <h2 className="text-2xl font-bold text-foreground mb-6">Book a Discovery Call</h2>
              <div className="bg-muted/30 rounded-2xl p-4 min-h-[500px]">
                <iframe
                  src="https://bookme.name/embed/widget/4573/PkkmsRgxM6nqOnUWU19ErYrgjwUnFdCG9FxGCRAmDRfX8SgQudeXGIPa1h36"
                  width="100%"
                  height="500"
                  frameBorder="0"
                  className="rounded-lg"
                  title="Book a discovery call with Tax Queen"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
