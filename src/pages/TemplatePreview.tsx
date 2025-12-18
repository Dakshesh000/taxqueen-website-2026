import { useState, useEffect, useRef } from "react";
import SubPageLayout from "@/components/layout/SubPageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FileText, Users, Shield, Clock, Check, X, Play, ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import rvCoastalDrive from "@/assets/lifestyle/rv-coastal-drive.png";
import womanWorkingViews from "@/assets/lifestyle/woman-working-views.jpg";
import heatherHikingNature from "@/assets/lifestyle/heather-hiking-nature.jpg";
import workingAtBeach from "@/assets/lifestyle/working-at-beach.jpg";
import vanSnowMountains from "@/assets/lifestyle/van-snow-mountains.jpg";
import rvAutumnLeaves from "@/assets/lifestyle/rv-autumn-leaves.jpg";
import sunsetRvReflection from "@/assets/lifestyle/sunset-rv-reflection.png";
import truckStormySky from "@/assets/lifestyle/truck-stormy-sky.jpeg";
import campingByRiver from "@/assets/lifestyle/camping-by-river.jpg";
import freedomNomad from "@/assets/lifestyle/freedom-nomad.jpg";
import truckDesert from "@/assets/lifestyle/truck-desert.jpeg";
import heatherPortrait from "@/assets/heather/portrait-square.png";

// Animated counter component
const AnimatedCounter = ({ end, suffix = "", duration = 2 }: { end: number; suffix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// Gallery images data
const galleryImages = [
  { src: rvAutumnLeaves, caption: "Autumn adventures on the open road" },
  { src: sunsetRvReflection, caption: "Golden hour reflections" },
  { src: truckStormySky, caption: "Chasing storms across the plains" },
  { src: campingByRiver, caption: "Riverside camp setup" },
];

// Stats data
const statsData = [
  { value: 200, suffix: "+", label: "Nomads Served" },
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "", label: "States Covered" },
  { value: 5, suffix: "★", label: "Star Rating" },
];

// Tabbed content data
const tabbedContent = [
  { id: "overview", label: "Overview", content: "This is the overview tab content. Use tabbed content to organize multiple pieces of information in a compact space without overwhelming the visitor." },
  { id: "details", label: "Details", content: "Here are the detailed specifications. Tabs work great for service breakdowns, product features, or FAQ categories that need quick switching." },
  { id: "pricing", label: "Pricing", content: "Pricing information goes here. Keep each tab focused on a single topic for maximum clarity and user experience." },
];

// Hover cards data
const hoverCards = [
  { 
    image: freedomNomad, 
    title: "Tax Preparation", 
    description: "Full-service tax prep designed for the mobile lifestyle. We handle the complexity so you can focus on the journey." 
  },
  { 
    image: womanWorkingViews, 
    title: "Tax Strategy", 
    description: "Proactive planning to minimize your tax burden. Smart strategies tailored for digital nomads." 
  },
  { 
    image: workingAtBeach, 
    title: "Consultation", 
    description: "One-on-one sessions to answer your questions and build a personalized tax roadmap." 
  },
];

// Testimonials for carousel
const testimonials = [
  { text: "Heather made tax season stress-free for the first time in years. Highly recommend!", name: "Sarah M.", role: "Full-Time RVer" },
  { text: "Finally, a tax professional who understands the nomad lifestyle. Worth every penny.", name: "Mike T.", role: "Digital Nomad" },
  { text: "Professional, responsive, and incredibly knowledgeable. My taxes have never been simpler.", name: "Jessica L.", role: "Remote Worker" },
];

// Accordion items
const accordionItems = [
  { id: "item-1", question: "What documents do I need?", answer: "You'll need your W-2s, 1099s, receipts for deductions, and any documentation related to your travel and work locations throughout the year." },
  { id: "item-2", question: "How long does the process take?", answer: "Most returns are completed within 1-2 weeks. Complex situations may take slightly longer, but we'll keep you informed every step of the way." },
  { id: "item-3", question: "Do you handle state taxes?", answer: "Absolutely! We specialize in multi-state tax situations, which are common for digital nomads who travel frequently." },
  { id: "item-4", question: "What makes you different?", answer: "We're nomads ourselves. We understand the unique challenges of mobile living and taxation firsthand." },
];

// Process steps
const processSteps = [
  { title: "Discovery Call", description: "We learn about your situation and goals" },
  { title: "Document Collection", description: "Secure upload of your tax documents" },
  { title: "Preparation", description: "We prepare and review your return" },
  { title: "Filing", description: "Final review and electronic filing" },
];

// Comparison data
const comparisonData = {
  without: [
    "Confusion about state residency rules",
    "Missed deductions for travel expenses",
    "Stress during tax season",
    "Risk of costly IRS penalties",
  ],
  with: [
    "Clear domicile strategy in place",
    "Maximum deductions captured",
    "Peace of mind year-round",
    "Full compliance confidence",
  ],
};

const TemplatePreview = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showVideoOverlay, setShowVideoOverlay] = useState(true);

  return (
    <SubPageLayout
      bannerImage={rvCoastalDrive}
      bannerAlt="RV driving along coastal highway"
      pageTitle="Template Preview"
    >
      <div className="space-y-16 pb-16">
        
        {/* 1. TEXT BLOCK SECTION */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Text Block Section
          </h2>
          <p className="text-base sm:text-lg text-foreground leading-relaxed">
            This is a standard text block for introductory content, descriptions, or any body copy. 
            It's left-aligned for better readability and follows the established typography system.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Secondary paragraphs can use muted foreground color to create visual hierarchy 
            while maintaining readability and consistency with the design system.
          </p>
        </section>

        {/* 2. IMAGE + TEXT ROW (Image Left) */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={womanWorkingViews} 
              alt="Digital nomad working with mountain views" 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
          <div className="space-y-4">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground uppercase tracking-wide">
              Image Left Layout
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              This layout places an image on the left with text content on the right. 
              Ideal for showcasing services, team members, or feature highlights with 
              supporting visuals.
            </p>
            <Button variant="cta">Get Started</Button>
          </div>
        </section>

        {/* 3. IMAGE + TEXT ROW (Image Right) */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4 md:order-1">
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground uppercase tracking-wide">
              Image Right Layout
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Alternating image placement creates visual rhythm and keeps content 
              engaging. This layout flips the image to the right side while keeping 
              text on the left.
            </p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Bullet point for key details</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>Another important feature</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden md:order-2">
            <img 
              src={workingAtBeach} 
              alt="Working remotely at the beach" 
              className="w-full h-64 sm:h-72 object-cover"
            />
          </div>
        </section>

        {/* 4. FULL-WIDTH IMAGE */}
        <section className="space-y-2">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={heatherHikingNature} 
              alt="Heather hiking in nature" 
              className="w-full h-[250px] sm:h-[300px] object-cover"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Optional caption for the image — great for context or attribution.
          </p>
        </section>

        {/* 5. FEATURE GRID (3 columns) */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Feature Grid
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-muted/30 rounded-lg border border-border space-y-3">
              <FileText className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground uppercase">Feature One</h3>
              <p className="text-sm text-muted-foreground">
                Brief description of this feature or service benefit.
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg border border-border space-y-3">
              <Users className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground uppercase">Feature Two</h3>
              <p className="text-sm text-muted-foreground">
                Brief description of this feature or service benefit.
              </p>
            </div>
            <div className="p-6 bg-muted/30 rounded-lg border border-border space-y-3">
              <Shield className="w-8 h-8 text-primary" />
              <h3 className="text-lg font-semibold text-foreground uppercase">Feature Three</h3>
              <p className="text-sm text-muted-foreground">
                Brief description of this feature or service benefit.
              </p>
            </div>
          </div>
        </section>

        {/* 6. HIGHLIGHT CARD/BOX */}
        <section className="bg-muted/30 rounded-lg p-6 sm:p-8 border border-border space-y-4">
          <h3 className="text-xl font-semibold text-foreground uppercase">
            Highlight Box
          </h3>
          <p className="text-muted-foreground">
            Use this box style for callouts, important information, pricing details, 
            special offers, or any content that needs visual separation from the main flow.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="cta">Primary Action</Button>
            <Button variant="outline">Secondary Action</Button>
          </div>
        </section>

        {/* 7. BULLET LIST SECTION */}
        <section className="space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Bullet List Section
          </h2>
          <p className="text-muted-foreground">
            Introductory text before the list items:
          </p>
          <ul className="space-y-3 text-foreground">
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>First bullet point with important information</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Second bullet point highlighting another key aspect</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Third bullet point completing the list</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Fourth bullet point for additional detail</span>
            </li>
          </ul>
        </section>

        {/* 8. QUOTE/TESTIMONIAL BLOCK */}
        <section className="border-l-4 border-primary pl-6 py-4">
          <blockquote className="text-lg sm:text-xl italic text-foreground leading-relaxed">
            "This is a quote or testimonial block. Perfect for client feedback, 
            important statements, or highlighting key messages that deserve emphasis."
          </blockquote>
          <cite className="text-sm text-muted-foreground mt-4 block not-italic">
            — Client Name, Digital Nomad
          </cite>
        </section>

        {/* 9. TWO COLUMN GRID */}
        <section className="grid sm:grid-cols-2 gap-8">
          <div className="space-y-3">
            <Clock className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground uppercase">
              Column One
            </h3>
            <p className="text-muted-foreground">
              Description for the first column item. Use for comparing options, 
              listing services side by side, or displaying related content.
            </p>
          </div>
          <div className="space-y-3">
            <FileText className="w-6 h-6 text-primary" />
            <h3 className="text-lg font-semibold text-foreground uppercase">
              Column Two
            </h3>
            <p className="text-muted-foreground">
              Description for the second column item. Maintains consistent spacing 
              and visual hierarchy with the first column.
            </p>
          </div>
        </section>

        {/* 10. IMAGE WITH OVERLAY TEXT */}
        <section className="relative rounded-lg overflow-hidden">
          <img 
            src={vanSnowMountains} 
            alt="Van in snowy mountains" 
            className="w-full h-[300px] sm:h-[350px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-white uppercase tracking-wide mb-2">
              Image with Overlay
            </h3>
            <p className="text-white/90 text-sm sm:text-base">
              Great for hero-style sections within pages or impactful visual statements.
            </p>
          </div>
        </section>

        {/* 11. CONTACT FORM SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Contact Form
          </h2>
          <p className="text-muted-foreground">
            Introductory text for the contact form section.
          </p>
          <form className="space-y-4 max-w-lg">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="How can we help?" rows={4} />
            </div>
            <Button variant="cta" type="submit">Send Message</Button>
          </form>
        </section>

        {/* 12. CTA SECTION */}
        <section className="pt-8 border-t border-border space-y-4">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground max-w-xl">
            A closing call-to-action that encourages the visitor to take the next step.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button variant="cta" size="lg">Get Started</Button>
            <Button variant="outline" size="lg">Learn More</Button>
          </div>
        </section>

        {/* ============================================= */}
        {/* ADVANCED SECTIONS (13-22) START HERE */}
        {/* ============================================= */}

        <div className="pt-12 border-t-2 border-primary">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground uppercase tracking-wide mb-4">
            Advanced Sections
          </h2>
          <p className="text-muted-foreground mb-12">
            The following sections feature animations, carousels, and interactive elements.
          </p>
        </div>

        {/* 13. IMAGE CAROUSEL/GALLERY */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Image Carousel
          </h2>
          <p className="text-muted-foreground">
            Full-width image carousel with captions. Perfect for photo galleries or showcasing multiple visuals.
          </p>
          <Carousel opts={{ loop: true }} className="w-full">
            <CarouselContent>
              {galleryImages.map((img, index) => (
                <CarouselItem key={index} className="basis-full">
                  <div className="relative h-[300px] sm:h-[400px] rounded-lg overflow-hidden">
                    <img 
                      src={img.src} 
                      alt={img.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <p className="text-white text-lg font-medium">{img.caption}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </section>

        {/* 14. ANIMATED STATS COUNTER */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Animated Stats Counter
          </h2>
          <p className="text-muted-foreground">
            Numbers that count up when scrolled into view. Creates visual interest and draws attention to key metrics.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6 bg-muted/30 rounded-lg border border-border"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 15. TABBED CONTENT SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Tabbed Content
          </h2>
          <p className="text-muted-foreground">
            Organize multiple content pieces in a compact space with tab navigation.
          </p>
          <div className="space-y-6">
            <div className="flex gap-2 border-b border-border">
              {tabbedContent.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors border-b-2 -mb-px ${
                    activeTab === tab.id 
                      ? "border-primary text-primary" 
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-muted/30 rounded-lg border border-border min-h-[120px]"
            >
              <p className="text-foreground leading-relaxed">
                {tabbedContent.find(t => t.id === activeTab)?.content}
              </p>
            </motion.div>
          </div>
        </section>

        {/* 16. HOVER REVEAL CARDS */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Hover Reveal Cards
          </h2>
          <p className="text-muted-foreground">
            Interactive cards that reveal additional content on hover. Perfect for services or team members.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hoverCards.map((card, index) => (
              <div 
                key={index}
                className="group relative h-72 rounded-lg overflow-hidden cursor-pointer"
              >
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Default state - title at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-semibold uppercase transition-opacity duration-300 group-hover:opacity-0">
                  {card.title}
                </h3>
                {/* Hover state - full overlay with description */}
                <div className="absolute inset-0 bg-primary/90 flex flex-col justify-end p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white text-xl font-semibold uppercase mb-2">
                    {card.title}
                  </h3>
                  <p className="text-white/90 text-sm leading-relaxed mb-4">
                    {card.description}
                  </p>
                  <Button variant="outline" size="sm" className="w-fit border-white text-white hover:bg-white hover:text-primary">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 17. VIDEO EMBED SECTION */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Video Embed
          </h2>
          <p className="text-muted-foreground">
            Embedded video with custom play button overlay. Great for explainer videos or introductions.
          </p>
          <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg bg-muted">
            {showVideoOverlay && (
              <div 
                className="absolute inset-0 z-10 cursor-pointer"
                onClick={() => setShowVideoOverlay(false)}
              >
                <img 
                  src={truckDesert} 
                  alt="Video thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg"
                  >
                    <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                  </motion.div>
                </div>
              </div>
            )}
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              title="Video embed example"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            Optional video caption or description below the embed.
          </p>
        </section>

        {/* 18. PARALLAX IMAGE DIVIDER */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Parallax Image Divider
          </h2>
          <p className="text-muted-foreground">
            Full-width visual break with depth effect. Creates visual rhythm between content sections.
          </p>
        </section>
        <section 
          className="relative h-[300px] sm:h-[350px] bg-fixed bg-cover bg-center -mx-4 sm:-mx-6 lg:-mx-8"
          style={{ backgroundImage: `url(${campingByRiver})` }}
        >
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="text-center">
              <h2 className="text-2xl sm:text-4xl text-white font-bold uppercase tracking-wide mb-4">
                Adventure Awaits
              </h2>
              <p className="text-white/90 max-w-xl mx-auto">
                A powerful statement or quote that resonates with your audience.
              </p>
            </div>
          </div>
        </section>

        {/* 19. TESTIMONIAL CAROUSEL (Horizontal) */}
        <section className="space-y-6 pt-16">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Testimonial Carousel
          </h2>
          <p className="text-muted-foreground">
            Single testimonial display with navigation. Perfect for featured reviews.
          </p>
          <Carousel opts={{ loop: true }} className="w-full max-w-3xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="flex flex-col items-center text-center p-8">
                    <img 
                      src={heatherPortrait} 
                      alt={testimonial.name}
                      className="w-20 h-20 rounded-full object-cover mb-6 border-4 border-primary/20"
                    />
                    <blockquote className="text-xl sm:text-2xl italic text-foreground leading-relaxed max-w-2xl mb-6">
                      "{testimonial.text}"
                    </blockquote>
                    <cite className="not-italic">
                      <span className="font-semibold text-foreground">{testimonial.name}</span>
                      <span className="text-muted-foreground"> — {testimonial.role}</span>
                    </cite>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </section>

        {/* 20. EXPANDABLE ACCORDION */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Expandable Accordion
          </h2>
          <p className="text-muted-foreground">
            Collapsible content sections for Q&A, details, or organized information.
          </p>
          <Accordion type="single" collapsible className="w-full max-w-2xl">
            {accordionItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-b border-border">
                <AccordionTrigger className="text-left font-semibold uppercase tracking-wide hover:text-primary">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* 21. PROCESS/STEPS TIMELINE (Horizontal) */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Process Steps
          </h2>
          <p className="text-muted-foreground">
            Visual step-by-step process with connectors. Great for "How It Works" content.
          </p>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 py-8">
            {processSteps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="flex-1 relative"
              >
                {/* Connector line (desktop only) */}
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] w-[calc(100%-48px)] h-0.5 bg-border" />
                )}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg mb-4">
                    {index + 1}
                  </div>
                  <h3 className="font-semibold text-foreground uppercase tracking-wide mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-[200px]">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 22. COMPARISON/BEFORE-AFTER CARDS */}
        <section className="space-y-6">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground uppercase tracking-wide">
            Comparison Cards
          </h2>
          <p className="text-muted-foreground">
            Side-by-side comparison of two options or states. Perfect for before/after scenarios.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Without */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border-2 border-destructive/30 bg-destructive/5"
            >
              <h3 className="text-xl font-semibold uppercase text-destructive mb-6 flex items-center gap-2">
                <X className="w-6 h-6" />
                Without Tax Queen
              </h3>
              <ul className="space-y-4">
                {comparisonData.without.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            
            {/* With */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-lg border-2 border-primary bg-primary/5"
            >
              <h3 className="text-xl font-semibold uppercase text-primary mb-6 flex items-center gap-2">
                <Check className="w-6 h-6" />
                With Tax Queen
              </h3>
              <ul className="space-y-4">
                {comparisonData.with.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>

      </div>
    </SubPageLayout>
  );
};

export default TemplatePreview;
