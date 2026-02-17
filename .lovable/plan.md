

## Remove Intro Section from Tax Maintenance Page

### Changes to `src/pages/TaxMaintenance.tsx`

1. **Delete** the entire "Intro Content" section (lines ~80-117) -- the block containing "Remove the Struggle. Hire Someone Else." and all the marketing copy plus the "Get Started" CTA.
2. **Change** the pricing cards section background from `bg-section-blue` to `bg-background` (white).
3. **Ensure** the card borders remain visible (they already have `border border-border`).

The page will go straight from the hero banner to the pricing cards on a clean white background.

