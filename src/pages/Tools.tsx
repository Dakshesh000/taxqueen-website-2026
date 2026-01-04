import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useQuiz } from "@/contexts/QuizContext";

// Import lifestyle images
import workingAtBeach from "@/assets/lifestyle/working-at-beach.jpg";
import sunsetRvReflection from "@/assets/lifestyle/sunset-rv-reflection.png";

type Category = "all" | "business" | "financial" | "lifestyle";

interface Tool {
  id: string;
  name: string;
  description: string;
  category: Category;
  ctaText: string;
  ctaUrl: string;
  offer?: string;
  discountCode?: string;
  logoPlaceholder: string; // Will be replaced with actual logos
}

const tools: Tool[] = [
  {
    id: "northwest",
    name: "Northwest Registered Agent",
    description: "Looking to form an LLC? Start your business the right way with help from Northwest Registered Agent. They can register in all 50 states.",
    category: "business",
    ctaText: "Start an LLC",
    ctaUrl: "#", // Affiliate URL to be provided
    offer: "Register a new LLC for $39 only available using the link below!",
    logoPlaceholder: "NW",
  },
  {
    id: "escapees",
    name: "Escapees RV Club",
    description: "One of the oldest and largest RV membership clubs in the world. They provide a total support network for all RVers, regardless of travel style, age, experience, or type of RV. Build community with like-minded folks. Get education and support today.",
    category: "lifestyle",
    ctaText: "Join Escapees",
    ctaUrl: "#",
    offer: "Save 20% on your membership",
    logoPlaceholder: "ESC",
  },
  {
    id: "savvynomad",
    name: "SavvyNomad",
    description: "Navigate your way to tax savings with Florida residency, including a virtual mail service! SavvyNomad offers simple steps to establish your domicile and residency, which includes a mail forwarding service that satisfies a physical address for your banking needs.",
    category: "business",
    ctaText: "See Tax Savings",
    ctaUrl: "#",
    offer: "Save $60",
    discountCode: "taxqueen",
    logoPlaceholder: "SN",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "QuickBooks is accounting software that offers cloud-based versions that help you keep your business finances organized. You can invoice clients, accept payments, manage and pay bills, and offers add-on services like merchant services. Very popular and easy to find tutorials!",
    category: "financial",
    ctaText: "Get QuickBooks",
    ctaUrl: "#",
    logoPlaceholder: "QB",
  },
  {
    id: "harvesthosts",
    name: "Harvest Hosts",
    description: "Enjoy unique, safe and convenient RV camping with unlimited overnight stays at 9500+ local businesses across the USA and Canada. Harvest Hosts is a network of farms, wineries, breweries, golf courses, community hosts and more that invite RVers to stay overnight.",
    category: "lifestyle",
    ctaText: "Camp Today!",
    ctaUrl: "#",
    offer: "Save 20% on your membership",
    logoPlaceholder: "HH",
  },
  {
    id: "relay",
    name: "Relay",
    description: "Struggling to find a bank that fits your digital nomad needs? Introducing Relay – an online small business bank built for entrepreneurs with NO FEES! Earn interest on your savings, integrate directly with QuickBooks Online, and more all with NO FEES and no minimum balances.",
    category: "financial",
    ctaText: "I Need Online Banking",
    ctaUrl: "#",
    logoPlaceholder: "RLY",
  },
  {
    id: "gusto",
    name: "Gusto",
    description: "Gusto is a people platform for payroll, benefits, and more. This includes a single owner S Corp and any team members. Starting at $40/month +$6/employee or contractor. Gusto will make your payroll easy and efficient while keeping your business fully compliant with payroll tax filings.",
    category: "financial",
    ctaText: "Start Payroll with Gusto",
    ctaUrl: "#",
    logoPlaceholder: "GST",
  },
  {
    id: "wave",
    name: "Wave",
    description: "Wave is bookkeeping designed for entrepreneurs that helps you make, move and manage your money. Truly understand and manage your income and expenses. This is a great alternative to QuickBooks. Track your expenses and income with automated bank feeds, reports, and more.",
    category: "financial",
    ctaText: "Join Wave",
    ctaUrl: "#",
    logoPlaceholder: "WV",
  },
  {
    id: "mileiq",
    name: "MileIQ",
    description: "MileIQ helps drivers from small business owners to enterprise organizations log every mile, making tax deductions and mileage reimbursements easy. Never worry about having mileage logs when you use MileIQ.",
    category: "financial",
    ctaText: "Track Miles",
    ctaUrl: "#",
    offer: "20% off",
    discountCode: "HRYA631A",
    logoPlaceholder: "MIQ",
  },
  {
    id: "zenwork",
    name: "ZenWork Tax 1099",
    description: "Do you have contractors that you need to file 1099-NEC for? Look no further than this award-winning IRS authorized efiling platform for 1099s. Stay in compliance and easily file for the low starting cost of $2.90. Get electronic copies to share with your contractors and save for your records.",
    category: "financial",
    ctaText: "Efile your 1099s Now",
    ctaUrl: "#",
    logoPlaceholder: "ZW",
  },
  {
    id: "docyt",
    name: "Docyt",
    description: "Do you want to focus on growing your business instead of bookkeeping? Automate your bookkeeping to help ease your task list. Close your books each month using automation so you have important financial data at your fingertips.",
    category: "financial",
    ctaText: "Automate Bookkeeping",
    ctaUrl: "#",
    logoPlaceholder: "DT",
  },
  {
    id: "artfulcontracts",
    name: "Artful Contracts",
    description: "Protect your business without hiring an attorney. Get instant access to attorney-reviewed, legally binding contract templates, guides, checklists, and over-the-shoulder video trainings to protect your business, filter out trouble clients, and get paid what you're owed when you're owed it!",
    category: "business",
    ctaText: "Protect Your Business Now",
    ctaUrl: "#",
    offer: "10% off",
    discountCode: "Heather",
    logoPlaceholder: "AC",
  },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "business", label: "Business Essentials" },
  { key: "financial", label: "Financial Tools" },
  { key: "lifestyle", label: "Nomad Lifestyle" },
];

const ToolCard = ({ tool }: { tool: Tool }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full bg-background border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
        <CardContent className="p-6 flex flex-col h-full">
          {/* Logo Container */}
          <div className="w-20 h-20 rounded-xl bg-muted/50 flex items-center justify-center mb-4 mx-auto p-2 overflow-hidden">
            <span className="text-lg font-bold text-muted-foreground">
              {tool.logoPlaceholder}
            </span>
          </div>

          {/* Tool Name */}
          <h3 className="text-lg font-bold text-foreground uppercase text-center mb-3">
            {tool.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground text-center flex-grow mb-4 leading-relaxed">
            {tool.description}
          </p>

          {/* Offer Badge */}
          {tool.offer && (
            <div className="mb-4 text-center">
              <Badge className="bg-background border border-primary text-primary px-3 py-1">
                {tool.offer}
              </Badge>
              {tool.discountCode && (
                <p className="text-xs text-muted-foreground mt-2">
                  Use code: <span className="font-semibold text-primary">{tool.discountCode}</span>
                </p>
              )}
            </div>
          )}

          {/* CTA Button */}
          <Button
            variant="cta"
            className="w-full mt-auto"
            asChild
          >
            <a
              href={tool.ctaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              {tool.ctaText}
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const Tools = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const { openQuiz } = useQuiz();

  const filteredTools = activeCategory === "all"
    ? tools
    : tools.filter((tool) => tool.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Hero Banner */}
        <section className="pt-24 pb-8 md:pt-28 md:pb-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-2xl overflow-hidden h-[280px] md:h-[320px]">
              <img
                src={workingAtBeach}
                alt="Digital nomad working at beach"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute bottom-8 left-8 right-8">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight">
                  Tools I Use & Recommend
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Intro + Affiliate Disclosure */}
        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-4xl text-center">
            <p className="text-lg md:text-xl text-foreground mb-4 leading-relaxed">
              Taxes and finances as a digital nomad can be confusing and overwhelming. 
              I've created this list of recommended tools to help you get started.
            </p>
            <p className="text-sm text-muted-foreground italic underline">
              Disclosure: Some of the links below are affiliate links. This means that, at no additional cost to you, 
              I may earn a commission if you click through and make a purchase.
            </p>
          </div>
        </section>

        {/* Category Filter Tabs */}
        <section className="py-8 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.key
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-12 px-4 bg-background">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative py-24 px-4">
          <div className="absolute inset-0">
            <img
              src={sunsetRvReflection}
              alt="RV at sunset"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative container mx-auto max-w-4xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white uppercase mb-6">
              Need Help With Your Nomad Taxes?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Let's find the right tax strategy for your digital nomad lifestyle.
            </p>
            <Button variant="cta" size="lg" onClick={() => openQuiz()}>
              Get Started
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Tools;
