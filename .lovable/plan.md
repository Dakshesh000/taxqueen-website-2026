
## New Page: Tax Maintenance Packages

A new sub-page under Services that displays the tax maintenance pricing packages using the site's existing design system and Services page hero pattern.

### Page Structure

1. **Hero Banner** -- Rounded container with image overlay and bottom-left heading, matching the Services page pattern (rounded-2xl, h-280px/320px). Reuses the existing `servicesHero` image.
2. **Intro Content** -- Centered text block (max-w-4xl) with the provided copy:
   - "Overwhelmed by all the forms?"
   - "Not sure what to take as deductions -- and where to take them?"
   - "Tax regulations change yearly..." 
   - "What if you make a costly mistake..."
   - "By hiring a professional, you make sure you get it right the first time."
   - "Ready to work with me?" with a CTA button
3. **Pricing Cards Section** -- 3-column grid (max-w-6xl) with cards for:
   - **1040 Return** -- $150/month
   - **1065 Partnership Return** -- $350/month
   - **1120S S Corp Return** -- $350/month
   - Each card has a primary-colored header, price display, feature checklist, CTA button, and footnotes
4. **Footer**

### Files to Create

- **`src/pages/TaxMaintenance.tsx`** -- The new page component following the Services page hero pattern (not SubPageLayout, since Services uses its own hero style). Includes pricing cards inline.

### Files to Update

- **`src/App.tsx`** -- Add lazy-loaded route for `/services/tax-maintenance`
- **`src/config/brand.ts`** -- No nav changes needed yet (user said they'll provide the name/link later)

### Pricing Card Design

Each card will follow the site's existing card patterns (rounded-2xl, shadow, border) with:
- Primary-colored header banner with package name + "Starting price"
- Large price display ($150 or $350 per month, with asterisk)
- Checkmark feature list using the Check icon from lucide-react
- CTA button using the `cta` variant
- Footnotes for asterisks at the bottom

### Technical Details

| Item | Detail |
|---|---|
| Route | `/services/tax-maintenance` |
| Hero image | Reuses `servicesHero` from assets |
| CTA buttons | Open the quiz via `useQuiz().openQuiz()` |
| Headings | Uppercase per design system |
| Responsive | 1-col mobile, 3-col desktop grid |
