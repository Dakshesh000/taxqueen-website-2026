/**
 * Tax Queen Brand Configuration
 * Central source of truth for all brand-related settings
 * Update these values when brand assets are provided
 */

export const brand = {
  // Company Info
  name: "Tax Queen",
  tagline: "Your Digital Nomad Tax Expert",
  description: "Solving taxation for Digital Nomads with US Tax Obligations",
  
  // Contact Info (to be updated)
  email: "hello@taxqueen.com",
  phone: "",
  
  // Social Links (to be updated)
  social: {
    instagram: "",
    linkedin: "",
    twitter: "",
    facebook: "",
  },
  
  // Logo paths (to be updated when assets are uploaded)
  logos: {
    primary: "/placeholder.svg",
    light: "/placeholder.svg",
    dark: "/placeholder.svg",
    icon: "/placeholder.svg",
  },
  
  // Booking/Scheduling
  booking: {
    calendlyUrl: "", // Add Calendly URL when available
    enabled: false,
  },
} as const;

/**
 * Section Configuration
 * Define which sections are active and their order
 */
export const sections = {
  hero: { enabled: true, order: 1 },
  about: { enabled: true, order: 2 },
  services: { enabled: true, order: 3 },
  process: { enabled: true, order: 4 },
  testimonials: { enabled: true, order: 5 },
  faq: { enabled: true, order: 6 },
  contact: { enabled: true, order: 7 },
} as const;

/**
 * Navigation Items
 */
export const navigation = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Tools", href: "/tools" },
  { label: "Articles", href: "/#articles" },
  { label: "Portal", href: "https://portal.tax-queen.com/login", external: true },
  { label: "Contact", href: "/contact" },
] as const;
