# Tax Queen Website - Design Guidelines

## Overview
A modern, image-heavy website for Tax Queen - a taxation firm specializing in helping Digital Nomads with US Tax Obligations.

---

## Brand Identity

### Design Style
- **Modern & Bold** + **Warm & Approachable**
- Professional yet friendly aesthetic
- Image-heavy layouts with lifestyle photography
- Glassmorphism used sparingly (hero section only)

### Target Audience
- Digital Nomads with US Tax Obligations
- Remote workers living abroad
- Full-time RVers
- Location-independent professionals

---

## Color Palette

**CRITICAL: Only steel blue variants are allowed. NO teal or green-ish colors.**

| Token | HSL Value | Usage |
|-------|-----------|-------|
| `primary` | 201 41% 51% | Main brand color (Steel Blue) - CTAs, highlights |
| `primary-foreground` | 0 0% 100% | White text on primary backgrounds |
| `foreground` | 222.2 84% 4.9% | Body text (near black) |
| `muted-foreground` | 215.4 16.3% 46.9% | Secondary/helper text |
| `background` | 0 0% 100% | White backgrounds |
| `section-blue` | 211 100% 95% | Light blue section backgrounds |
| `border` | 214.3 31.8% 91.4% | Borders and dividers |

### Usage Rules
- ✅ Use `text-foreground` for primary text
- ✅ Use `text-muted-foreground` for secondary text
- ✅ Use `text-primary` ONLY for brand highlights (sparingly)
- ✅ Use `bg-primary` for CTA buttons
- ❌ Never use teal, accent colors, or arbitrary colors
- ❌ Never use direct colors like `text-white`, `bg-blue-500`

---

## Typography

### Font
System sans-serif stack (Tailwind default)

### Headings
- **All headings MUST be UPPERCASE**
- Font weight: `font-bold`
- Responsive sizes:
  - Mobile: `text-3xl`
  - Tablet: `sm:text-4xl`
  - Desktop: `md:text-5xl`
  - Large screens: `lg:text-6xl`

### Body Text
- Mobile: `text-base`
- Desktop: `text-lg`
- Color: `text-foreground`

### Secondary Text
- Size: `text-sm` or `text-base`
- Color: `text-muted-foreground`

---

## Buttons

### CTA Button (Primary Action)
```tsx
<Button className="rounded-full bg-primary text-primary-foreground px-8 py-6 hover:translate-y-[-2px] hover:shadow-lift transition-all">
  Get Started
</Button>
```
- Shape: Pill (rounded-full)
- Background: `bg-primary`
- Text: `text-primary-foreground` (white)
- Hover: Lift animation (translate-y + shadow)
- Standard text: "Get Started" (not "Learn More")

### Outline Button (Secondary Action)
```tsx
<Button variant="outline" className="rounded-full border-border px-8 py-6 hover:translate-y-[-2px] hover:shadow-lift transition-all">
  Learn More
</Button>
```
- Shape: Pill (rounded-full)
- Border: `border-border`
- Hover: Lift animation

### Glass Button (On dark/image backgrounds)
```tsx
<Button className="glass rounded-full px-8 py-6">
  Action
</Button>
```
- Use `.glass` utility class
- For buttons on top of images/videos

---

## Cards

### Standard Card
```tsx
<div className="bg-background rounded-2xl shadow-md p-6">
  {/* content */}
</div>
```
- Background: `bg-background`
- Border radius: `rounded-2xl`
- Shadow: `shadow-md`

### Active/Selected Card
```tsx
<div className="bg-background rounded-2xl shadow-md p-6 border-2 border-primary">
  {/* content */}
</div>
```
- Add `border-2 border-primary` for active state

### FAQ Selected State
- Use `border-primary border-2` instead of full blue background
- Keep text dark (`text-foreground`)

---

## Section Backgrounds

Alternate between:
1. **White**: `bg-background`
2. **Light Blue**: `bg-section-blue`

Pattern: White → Blue → White → Blue (creates visual rhythm)

---

## Section Headings

```tsx
<h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-center text-foreground">
  SECTION TITLE
</h2>
<p className="text-muted-foreground text-center mt-4">
  Supporting tagline or description
</p>
```

---

## Images

### Style Guidelines
- Lifestyle photography featuring digital nomad life
- RVs, remote work setups, scenic locations
- Professional but relatable
- NO images with text overlays

### Technical Guidelines
- Lazy loading for non-critical images: `loading="lazy"`
- Eager loading for hero/above-fold: `loading="eager" fetchPriority="high"`
- Use aspect ratios for consistent layouts
- Import from `@/assets/` folder

---

## Animations

### Hover Lift
```tsx
hover:translate-y-[-2px] hover:shadow-lift transition-all duration-300
```

### Scroll Animations (Framer Motion)
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6 }}
>
```

### CSS Animations
- `animate-fade-in-up` - Fade in from below
- `animate-float` - Gentle floating effect
- `animate-needle-wiggle` - Compass needle animation

---

## Responsive Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| `sm` | 640px | Small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1400px | Large desktops |
| `3xl` | 1600px | Ultra-wide |

---

## Navigation

### Menu Items
Home, Services, About, Articles, Portal, Contact

### External Links
- Portal: Opens in new tab (`target="_blank"`)
- Add `rel="noopener noreferrer"` for security

### Active Link Styling
- Use underline slide-in animation
- Navbar shrinks slightly on scroll

---

## Spacing

### Section Padding
```tsx
className="py-16 md:py-24 lg:py-32"
```

### Container
```tsx
className="container mx-auto px-4"
```

### Component Gaps
- Card grids: `gap-6 md:gap-8`
- Stack spacing: `space-y-4` or `space-y-6`

---

## Dark Mode Support

Dark mode tokens are defined in `index.css` under `.dark` class. All semantic tokens automatically adapt.

---

## File Structure

```
src/
├── config/
│   ├── brand.ts          # Brand configuration
│   └── README.md         # This file (Design Guidelines)
├── components/
│   ├── layout/           # Navbar, Footer
│   ├── sections/         # Page sections
│   └── ui/               # Shadcn components
├── pages/                # Page components
├── assets/               # Images organized by category
│   ├── brand/           # Logos
│   ├── heather/         # Founder photos
│   ├── lifestyle/       # Nomad lifestyle imagery
│   └── services/        # Service-related images
└── index.css            # Design tokens (source of truth)
```

---

## Checklist for New Sections

Before building any new section:

- [ ] Uses semantic color tokens (no direct colors)
- [ ] Headings are UPPERCASE and responsive
- [ ] Buttons use correct variant (CTA/outline)
- [ ] Card styling matches design system
- [ ] Images lazy-loaded appropriately
- [ ] Section background follows alternating pattern
- [ ] Mobile responsive (test all breakpoints)
- [ ] Animations use established patterns
- [ ] No teal or unapproved colors used
