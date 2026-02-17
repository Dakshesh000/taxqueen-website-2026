
## Three Changes

### 1. Articles link opens external blog
**File: `src/config/brand.ts`** (line 62)
- Change the Articles nav item from `{ label: "Articles", href: "/#articles" }` to `{ label: "Articles", href: "https://gray-kudu-450355.hostingersite.com/", external: true }`
- This makes it open in a new tab, same as the Portal link

### 2. Toast auto-dismiss after 5 seconds
**File: `src/hooks/use-toast.ts`** (line 6)
- Change `TOAST_REMOVE_DELAY` from `1000000` (roughly permanent) to `5000` (5 seconds)
- This affects all toast notifications site-wide (contact form, newsletter, quiz, etc.)

### 3. Font investigation
The hero heading and tagline are already rendering in **DM Sans** -- the brand font is correctly configured in:
- `tailwind.config.ts`: `fontFamily: { sans: ["DM Sans", ...] }`
- `src/styles/index.css`: Self-hosted `@font-face` declarations for weights 400-700
- `index.html`: Font files are preloaded

The fonts visible in the screenshot match DM Sans. If you're seeing a different font on your device, it may be a caching issue -- try a hard refresh (Ctrl+Shift+R / Cmd+Shift+R). No code changes needed here.

### Technical Details

| File | Line | Change |
|---|---|---|
| `src/config/brand.ts` | 62 | `href: "https://gray-kudu-450355.hostingersite.com/"`, add `external: true` |
| `src/hooks/use-toast.ts` | 6 | `TOAST_REMOVE_DELAY = 5000` |
