/**
 * @fileoverview Shared TypeScript type definitions
 * @description Central location for reusable types across the application
 * @version 1.0.0
 */

/**
 * Service card data structure
 * Used in ServicesCards component
 */
export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  popular?: boolean;
}

/**
 * Testimonial data structure
 * Used in TestimonialsSection and ServicesTestimonialsCarousel
 */
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
}

/**
 * FAQ item structure
 * Used in FAQSection and ComprehensiveFAQSection
 */
export interface FAQ {
  question: string;
  answer: string;
}

/**
 * FAQ category structure
 * Used in ComprehensiveFAQSection
 */
export interface FAQCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: FAQ[];
}

/**
 * Tool/Resource data structure
 * Used in Tools page
 */
export interface Tool {
  name: string;
  description: string;
  logo: string;
  category: string;
  offer?: string;
  link: string;
  discountCode?: string;
}

/**
 * Media/Press mention structure
 * Used in FeaturedInSection
 */
export interface MediaMention {
  name: string;
  logo?: string;
  logoText?: string;
  link: string;
}

/**
 * Process step structure
 * Used in ProcessStepsSection
 */
export interface ProcessStep {
  number: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Blog post structure
 * Used in BlogSection
 */
export interface BlogPost {
  title: string;
  excerpt: string;
  category: string;
  image: string;
  link: string;
  date?: string;
}

/**
 * Credential/Certification structure
 * Used in About page
 */
export interface Credential {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

/**
 * Navigation link structure
 * Used in Navbar and Footer
 */
export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

/**
 * Social link structure
 * Used in Footer
 */
export interface SocialLink {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}
