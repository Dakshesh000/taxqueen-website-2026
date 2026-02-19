# Tax Queen - Digital Nomad Tax Services

Expert tax services for digital nomads, RV travelers, and location-independent professionals with US tax obligations.

## 🚀 Tech Stack

- **Framework:** React 18 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** shadcn/ui (Radix primitives)
- **Routing:** React Router DOM v6
- **State Management:** TanStack Query (React Query)
- **Animations:** Framer Motion
- **Backend:** Supabase
- **Forms:** React Hook Form + Zod validation

## 📁 Project Structure

```
src/
├── assets/           # Static images and brand assets
├── components/
│   ├── layout/       # Navbar, Footer, SubPageLayout
│   ├── quiz/         # Lead generation quiz components
│   ├── sections/     # Page sections (Hero, About, Services, etc.)
│   └── ui/           # Reusable UI components (shadcn/ui)
├── config/           # Brand configuration
├── contexts/         # React contexts (Quiz state)
├── hooks/            # Custom React hooks
├── integrations/     # Supabase client and types
├── lib/              # Utility functions
└── pages/            # Route pages
```

## 🎨 Design System

The project uses a semantic design token system defined in:
- `src/index.css` - CSS custom properties for colors, gradients, shadows
- `tailwind.config.ts` - Tailwind theme extensions

**Always use semantic tokens** (e.g., `bg-primary`, `text-foreground`) instead of direct colors.

## 🔧 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📱 Key Features

- **Lead Qualification Quiz:** Multi-step quiz with image preloading for smooth transitions
- **SEO Optimized:** Meta tags, structured data (JSON-LD), sitemap
- **Accessibility:** Skip links, ARIA labels, keyboard navigation
- **Performance:** Lazy loading, image optimization, code splitting
- **Responsive:** Mobile-first design with breakpoints

## 🌐 SEO Files

- `public/sitemap.xml` - XML sitemap for search engines
- `public/robots.txt` - Crawler directives
- `index.html` - Meta tags and structured data

## 📝 Contributing

1. Follow the existing code patterns and design system
2. Use semantic tokens for all colors
3. Write TypeScript with proper types
4. Test on mobile and desktop viewports
5. Ensure accessibility compliance
