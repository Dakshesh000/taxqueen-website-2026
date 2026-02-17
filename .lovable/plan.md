

## Fix: Restore Brand Fonts Properly

### What Went Wrong

The previous change removed the `@font-face` declarations for DM Sans weights 600 and 700 to fix 404 errors. This "fixed" the 404s but broke the brand typography -- all bold headings and semibold text now render at weight 500 (medium), making the entire site look visually weaker. With 825 uses of `font-bold`/`font-semibold` across 46 files, this is a site-wide regression.

### The Correct Fix

Instead of removing the font declarations, we need to **add the missing font files** and **restore the `@font-face` rules**. DM Sans is a Google Font available in individual weights as static `.woff2` files.

### Steps

#### 1. Download and add font files

Download these two files from Google Fonts CDN and add them to `public/fonts/`:
- `dm-sans-600.woff2` (semibold)
- `dm-sans-700.woff2` (bold)

These are freely available static font files from the DM Sans family.

#### 2. Restore `@font-face` declarations in `src/styles/index.css`

After the existing weight-500 declaration (line 72), re-add:

```css
@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans-600.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'DM Sans';
  src: url('/fonts/dm-sans-700.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

### Why This Fixes Both Problems

- **Brand consistency:** Bold headings render at true 700 weight, semibold at true 600 weight -- matching the original design.
- **No more 404s:** The files will actually exist, eliminating console errors and the 5-second font chain timeout.
- **Lighthouse Best Practices:** No failed network requests means the score returns to 100.
- **Performance:** With `font-display: swap`, text renders immediately with fallback, then swaps when the font loads -- no blocking.

### Files Changed

| File | Change |
|------|--------|
| `public/fonts/dm-sans-600.woff2` | Add new file (downloaded from Google Fonts) |
| `public/fonts/dm-sans-700.woff2` | Add new file (downloaded from Google Fonts) |
| `src/styles/index.css` | Restore two `@font-face` declarations after line 72 |

