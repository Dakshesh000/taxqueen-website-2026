import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { brand, navigation } from "@/config/brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { logoTaxQueen } from "@/assets";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
  const [linksOpen, setLinksOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive tax tips & updates in your inbox.",
    });
    setEmail("");
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Mobile Layout - Clean & Simple */}
      <div className="md:hidden container mx-auto px-4 py-6">
        {/* Brand - centered, compact */}
        <div className="text-center mb-5">
          <img 
            src={logoTaxQueen} 
            alt="Tax Queen Logo" 
            className="h-8 w-auto brightness-0 invert mx-auto mb-2"
            loading="lazy"
          />
          <p className="text-xs text-primary-foreground/70">{brand.description}</p>
        </div>

        {/* Newsletter - simple inline form */}
        <form onSubmit={handleNewsletterSubmit} className="flex gap-2 mb-6">
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-primary-foreground text-foreground placeholder:text-muted-foreground border-none h-10 flex-1 text-sm"
            aria-label="Email address for newsletter"
          />
          <Button
            type="submit"
            className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold h-10 px-4 text-sm"
          >
            Subscribe
          </Button>
        </form>

        {/* Links - 2-column grid */}
        <nav className="mb-6" aria-label="Footer navigation">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            {navigation.map((item) => {
              const isExternal = "external" in item && item.external;
              const isAnchor = item.href.startsWith("#");
              
              return (
                <li key={item.href}>
                  {isExternal ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 block"
                    >
                      {item.label}
                    </a>
                  ) : isAnchor ? (
                    <a
                      href={item.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 block"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-primary-foreground/80 hover:text-primary-foreground transition-colors py-1 block"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Contact - simple line */}
        <div className="text-center text-xs text-primary-foreground/70 pt-4 border-t border-primary-foreground/20">
          <p>{brand.email}</p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Newsletter Column */}
          <div className="space-y-4 order-last lg:order-last">
            <h4 className="font-semibold uppercase tracking-wide">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/80">
              Get tax tips & updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground text-foreground placeholder:text-muted-foreground border-none h-11 flex-1"
                aria-label="Email address for newsletter"
              />
              <Button
                type="submit"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold h-11"
              >
                Subscribe
              </Button>
            </form>
          </div>

          {/* Brand Column */}
          <div className="space-y-4 order-first lg:order-first">
            <img 
              src={logoTaxQueen} 
              alt="Tax Queen Logo" 
              className="h-10 sm:h-12 w-auto brightness-0 invert"
              loading="lazy"
            />
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              {brand.description}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">Quick Links</h4>
            <nav aria-label="Footer navigation">
              <ul className="space-y-2">
                {navigation.map((item) => {
                  const isExternal = "external" in item && item.external;
                  const isAnchor = item.href.startsWith("#");
                  
                  return (
                    <li key={item.href}>
                      {isExternal ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : isAnchor ? (
                        <a
                          href={item.href}
                          className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">Contact</h4>
            <address className="not-italic space-y-2 text-sm text-primary-foreground/80">
              <p>{brand.email}</p>
              {brand.phone && <p>{brand.phone}</p>}
            </address>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-4 sm:py-6 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <p className="text-sm text-primary-foreground/80 text-center">
            © {currentYear} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;