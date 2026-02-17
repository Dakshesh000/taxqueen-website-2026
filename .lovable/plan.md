

## Change Navbar and Footer Font to Proxima Nova Regular

### Overview
Replace the font used in the Navbar menu links and the Footer with Proxima Nova Regular, while keeping DM Sans as the default font for the rest of the site.

### Steps

1. **Add Proxima Nova font file**
   - You'll need to provide a `proxima-nova-regular.woff2` file (or similar format). Since Proxima Nova is a commercial font, it needs to be licensed and added to `public/fonts/`.
   - If you have the file, I'll place it at `public/fonts/proxima-nova-400.woff2`.

2. **Register the font in CSS** (`src/styles/index.css`)
   - Add a new `@font-face` declaration for Proxima Nova alongside the existing DM Sans declarations.

3. **Add a Tailwind utility class** (`tailwind.config.ts`)
   - Add a new font family entry: `proxima: ["Proxima Nova", "system-ui", "sans-serif"]`
   - This enables using `font-proxima` in components.

4. **Apply to Navbar** (`src/components/layout/Navbar.tsx`)
   - Add `font-proxima` to the desktop nav links and mobile menu links.

5. **Apply to Footer** (`src/components/layout/Footer.tsx`)
   - Add `font-proxima` to the footer's text elements.

### Important Note
Proxima Nova is a **commercial typeface** (by Mark Simonson Studio). You need a valid web font license and the `.woff2` file to proceed. If you have it, please upload the font file and I'll wire everything up. If you'd like a free alternative that looks similar (e.g., Montserrat), let me know.

