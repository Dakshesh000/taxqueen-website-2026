# Tax Queen — Digital Nomad Tax Services

> Expert tax services for digital nomads, RV travelers, and location-independent professionals with US tax obligations.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Proprietary-red)

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS + custom design system |
| UI Components | shadcn/ui (Radix primitives) |
| Routing | React Router DOM v6 |
| State Management | TanStack Query (React Query) |
| Animations | Framer Motion |
| Backend | Supabase (Auth, Database, Edge Functions) |
| Forms | React Hook Form + Zod |

---

## 📋 Prerequisites

Before getting started, make sure you have the following installed:

- **Node.js** v18 or higher — [nodejs.org](https://nodejs.org)
- **npm** v9+ or **bun** — [bun.sh](https://bun.sh)
- A configured backend project (see [Environment Variables](#-environment-variables))

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Type-check without building
npm run typecheck

# Lint the codebase
npm run lint

# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 🌍 Environment Variables

Create a `.env` file in the project root based on the following template:

```env
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_PROJECT_ID=your_project_id
```

> **Note:** Never commit real credentials to version control. The `.env` file is listed in `.gitignore`.

---

## 📁 Project Structure

```
src/
├── assets/           # Static images, brand assets, lifestyle photos
│   ├── brand/        # Logo variants
│   ├── heather/      # Founder photography
│   ├── lifestyle/    # RV / nomad lifestyle imagery
│   └── services/     # Service-specific imagery
├── components/
│   ├── layout/       # Navbar, Footer, SubPageLayout
│   ├── quiz/         # Multi-step lead qualification quiz
│   ├── sections/     # Page sections (Hero, About, Services, FAQ, etc.)
│   └── ui/           # Reusable base components (shadcn/ui)
├── config/           # Brand configuration constants
├── contexts/         # React context providers (Quiz state)
├── hooks/            # Custom React hooks
├── integrations/     # Backend client and generated types
├── lib/              # Utility functions
├── pages/            # Route-level page components
├── styles/           # Global CSS and design tokens
└── types/            # Shared TypeScript types
```

---

## 🗺️ Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero, services overview, testimonials, quiz CTA |
| `/about` | About | Heather's story, mission, and credentials |
| `/services` | Services | Full service offerings and pricing overview |
| `/services/tax-maintenance` | Tax Maintenance | Dedicated tax maintenance plan page |
| `/contact` | Contact | Contact form and booking information |
| `/tools` | Tools | Recommended tools and resources for nomads |
| `/terms` | Terms | Terms of service |
| `/privacy` | Privacy | Privacy policy |
| `/quiz-preview` | Quiz Preview | Internal preview for the lead quiz |
| `/design-guide` | Design Guide | Internal design system reference |
| `*` | 404 | Not found fallback |

---

## 🎨 Design System

The project uses a semantic design token system. **Always use semantic tokens** — never hardcode colors.

| File | Purpose |
|---|---|
| `src/styles/index.css` | CSS custom properties (colors, gradients, shadows, typography) |
| `tailwind.config.ts` | Tailwind theme extensions referencing CSS variables |

**Example usage:**
```tsx
// ✅ Correct — uses semantic tokens
<div className="bg-primary text-primary-foreground shadow-elegant">

// ❌ Incorrect — hardcoded values
<div style={{ background: "#c4a882", color: "#fff" }}>
```

---

## 📱 Key Features

- **Lead Qualification Quiz** — Multi-step quiz with image preloading for smooth transitions and AI-powered responses
- **SEO Optimized** — Meta tags, JSON-LD structured data, sitemap, canonical tags
- **Accessibility** — Skip links, ARIA labels, keyboard navigation, semantic HTML
- **Performance** — Lazy loading, image optimization, code splitting, font preloading
- **Responsive** — Mobile-first design with consistent breakpoints

---

## 🌐 SEO & Public Files

| File | Purpose |
|---|---|
| `public/sitemap.xml` | XML sitemap for search engine crawlers |
| `public/robots.txt` | Crawler directives |
| `public/_headers` | HTTP security headers (CSP, HSTS, etc.) |
| `index.html` | Root HTML with meta tags and JSON-LD structured data |

---

## 🚢 Deployment

```bash
# Build the production bundle
npm run build
# Output is in the /dist directory
```

The `/dist` directory is a standard static site and can be deployed to any host:

- **Vercel** — `vercel --prod`
- **Netlify** — drag and drop `dist/` or connect the repo
- **Cloudflare Pages** — connect the repo, set build command to `npm run build`, output to `dist`

---

## 📝 Contributing

1. Follow existing code patterns and naming conventions
2. Use semantic design tokens for all colors — no hardcoded values
3. Write TypeScript with proper types — avoid `any`
4. Test on both mobile (375px) and desktop (1440px) viewports
5. Ensure accessibility compliance (WCAG AA minimum)
6. Keep components small and focused — single responsibility

---

## ⚖️ License

**Proprietary — All Rights Reserved.**

This codebase and all associated assets are the property of Tax Queen LLC. Unauthorized reproduction, distribution, or use is strictly prohibited.
