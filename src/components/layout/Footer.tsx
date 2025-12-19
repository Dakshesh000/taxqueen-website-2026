import { useState } from "react";
import { brand, navigation } from "@/config/brand";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { logoTaxQueen } from "@/assets";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState("");
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
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <img 
              src={logoTaxQueen} 
              alt="Tax Queen Logo" 
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-sm text-primary-foreground/80 max-w-xs">
              {brand.description}
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              {navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">Contact</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>{brand.email}</p>
              {brand.phone && <p>{brand.phone}</p>}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-4">
            <h4 className="font-semibold uppercase tracking-wide">Stay Updated</h4>
            <p className="text-sm text-primary-foreground/80">
              Get tax tips & updates delivered to your inbox.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-primary-foreground text-foreground placeholder:text-muted-foreground border-none h-11"
              />
              <Button
                type="submit"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-primary-foreground/20">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <p className="text-sm text-primary-foreground/80">
            © {currentYear} {brand.name}. All rights reserved.
          </p>
          <a
            href="/admin-login"
            className="text-xs text-primary-foreground/50 hover:text-primary-foreground/80 transition-colors"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
