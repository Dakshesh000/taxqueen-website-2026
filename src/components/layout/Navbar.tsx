import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/config/brand";
import { Button } from "@/components/ui/button";
import { logoTaxQueenMain } from "@/assets";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 bg-background border-b border-border transition-all duration-300 ${
        isScrolled ? "h-14 shadow-md" : "h-16"
      }`}
    >
      <nav className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo + Wordmark */}
        <a href="/" className="flex items-center gap-3">
          <img 
            src={logoTaxQueenMain} 
            alt="Tax Queen" 
            className={`w-auto transition-all duration-300 ${isScrolled ? "h-8" : "h-10"}`}
          />
          <span className={`font-bold text-foreground uppercase tracking-wide transition-all duration-300 ${isScrolled ? "text-lg" : "text-xl"}`}>
            TAX QUEEN
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="relative text-sm font-medium text-foreground hover:text-primary transition-colors py-1 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button variant="cta" className={`transition-all duration-300 ${isScrolled ? "text-sm px-4 py-1" : ""}`}>
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div 
        className={`md:hidden bg-background border-b border-border overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {navigation.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li>
            <Button variant="cta" className="w-full">Get Started</Button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
