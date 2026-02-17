

## Lighthouse Score Recovery Plan (Services Page: 87 -> 95+)

### Priority 1: Fix Font 404s (Performance + Best Practices)

**Problem:** CSS declares `@font-face` for `dm-sans-600.woff2` and `dm-sans-700.woff2` but only `dm-sans-400.woff2` and `dm-sans-500.woff2` exist in `public/fonts/`. The browser requests them, waits for the timeout, then falls back. This wastes ~5 seconds in the font chain and drops Best Practices from 100 to 96.

**Fix:** Remove the two `@font-face` declarations for weight 600 and 700 from `src/styles/index.css` (lines 74-88). Tailwind's `font-semibold` (600) and `font-bold` (700) will simply use the closest available weight (500) via the browser's font matching algorithm. Since DM Sans is a variable-weight-friendly family and 500 is already loaded, the visual difference is negligible.

**Files:** `src/styles/index.css` -- delete lines 74-88

**Impact:** Eliminates 404 console errors, breaks the 5,245ms font chain, fixes Best Practices score.

---

### Priority 2: Preload LCP Hero Image (Performance)

**Problem:** The Services hero image (`services-hero-new.webp`) is loaded by JS-rendered React, so the browser can't discover it until JS executes. Resource load delay is 4,740ms.

**Fix:** Add a `<link rel="preload">` in `index.html` for the services hero image. Since Vite hashes filenames, and we can't predict the hash, the best approach is to add `fetchpriority="high"` to the `<img>` tag in `src/pages/Services.tsx` so the browser prioritizes it once discovered.

**Files:** `src/pages/Services.tsx` -- add `fetchPriority="high"` to the hero `<img>` tag (around line 52)

**Impact:** Estimated 2-3 second LCP improvement.

---

### Priority 3: Remove Unused Preconnect (Best Practices)

**Problem:** `index.html` line 6 has `<link rel="preconnect" href="https://api.dicebear.com" crossorigin>` but this connection is only used on pages with testimonials (not on initial load). It wastes a connection handshake on every page.

**Fix:** Remove line 6 from `index.html`.

**Files:** `index.html` -- delete line 6

**Impact:** Eliminates "unused preconnect" warning.

---

### Priority 4: Fix Carousel Touch Targets (Accessibility)

**Problem:** Testimonial dot indicators are `w-2 h-2` (8x8px), below the 24x24px minimum for touch targets.

**Fix:** Add minimum touch target sizing. Keep the visual dot small but wrap in a larger hit area using padding.

**Files:** `src/components/sections/ServicesTestimonialsCarousel.tsx` -- update the dot buttons (line 163-172) to have `min-w-6 min-h-6` with flexbox centering, keeping the inner dot at `w-2 h-2`.

Also apply the same fix to `src/components/sections/TestimonialsSection.tsx` if it has similar dots (it doesn't -- it uses auto-scrolling columns, no dots).

**Impact:** Fixes accessibility touch target warning.

---

### Priority 5: Fix Heading Order (Accessibility)

**Problem:** Footer uses `<h4>` tags ("STAY UPDATED", "Quick Links") without preceding `<h3>`, breaking heading hierarchy.

**Fix:** Change the `<h4>` elements in `src/components/layout/Footer.tsx` (lines 160, 201) to `<h3>` tags. This maintains visual appearance (they use utility classes for styling) while fixing the semantic hierarchy.

**Files:** `src/components/layout/Footer.tsx` -- change `h4` to `h3` on lines 160 and 201

**Impact:** Fixes heading order accessibility warning across all pages.

---

### Priority 6: Lazy-load react-markdown (Unused JS)

**Problem:** `vendor-markdown` bundle (26 KiB) loads on every page but is only used by `ChatDrawer.tsx` (the chatbot). Most users on `/services` never open the chatbot.

**Fix:** Dynamically import `react-markdown` inside `ChatDrawer.tsx` using `React.lazy()` so it only loads when the chat drawer is opened.

**Files:** `src/components/common/ChatDrawer.tsx` -- replace the static `import ReactMarkdown from "react-markdown"` with a lazy/dynamic import that loads on first render of the drawer.

**Impact:** Saves 26 KiB of unused JS on every page that doesn't use the chatbot.

---

### Summary of Changes

| File | Change | Issue Fixed |
|------|--------|-------------|
| `src/styles/index.css` | Remove `@font-face` for weights 600 and 700 | Font 404s, font chain delay, Best Practices |
| `index.html` | Remove dicebear preconnect (line 6) | Unused preconnect warning |
| `src/pages/Services.tsx` | Add `fetchPriority="high"` to hero img | LCP delay |
| `src/components/sections/ServicesTestimonialsCarousel.tsx` | Enlarge dot button touch targets | Accessibility touch targets |
| `src/components/layout/Footer.tsx` | Change `h4` to `h3` | Heading order |
| `src/components/common/ChatDrawer.tsx` | Lazy-load react-markdown | Unused JS |

### Not Addressed (and why)

- **Hero image 665 KiB:** Requires re-exporting the WebP at lower quality outside Lovable. Can't be fixed in code -- the source image file needs to be replaced with a more compressed version.
- **Cache headers (9,390 KiB):** The `_headers` file already sets 1-year cache. This is a hosting/CDN configuration issue, not a code issue. On Lovable preview, headers may not apply.
- **Render-blocking CSS (100ms):** At 15.9 KiB, this is a standard Vite-generated CSS bundle. The `media="print"` trick risks FOUC (flash of unstyled content). The 100ms cost is acceptable for a styled first paint.
- **Unused JS (39 KiB from index.js):** This is the main app bundle and can't be easily split further without over-engineering.

