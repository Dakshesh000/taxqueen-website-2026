

## Store All Form Submissions in Google Sheets (Portable)

### The Problem

Currently all 3 forms (Quiz, Contact, Newsletter) submit to Formspree only. You want a copy of every submission in a Google Sheet for easy tracking, and you want the solution to work if someone else deploys the site.

### Recommended Approach: Google Apps Script Webhook

Instead of using the Google Sheets API (which requires OAuth service accounts, complex credentials, and is painful to hand off), we use **Google Apps Script** -- a free, zero-dependency approach that works like this:

```text
User submits form
       |
       v
Frontend sends to Formspree (existing, unchanged)
       |
       +---> Also sends to Edge Function: /functions/v1/log-submission
                    |
                    v
              Edge Function POSTs to Google Apps Script Web App URL
              (stored as env var: GOOGLE_SHEET_WEBHOOK_URL)
                    |
                    v
              Apps Script appends row to Google Sheet
```

### Why This Approach

| Approach | Portability | Complexity | Cost |
|----------|------------|------------|------|
| Google Sheets API + Service Account | Hard (share JSON key file) | High (OAuth, scopes) | Free |
| **Google Apps Script Webhook** | **Easy (just a URL)** | **Low (one env var)** | **Free** |
| Zapier/Make | Medium (separate account) | Low | Paid |

The Apps Script approach wins because:
- **One env var** to configure: `GOOGLE_SHEET_WEBHOOK_URL`
- **No API keys**, no OAuth, no service accounts
- **Client setup takes 5 minutes**: copy a script, deploy it, paste the URL
- Works on any hosting platform

### Implementation

#### 1. Create Edge Function: `supabase/functions/log-submission/index.ts`

A simple proxy that:
- Accepts POST with `{ type: "quiz" | "contact" | "newsletter", data: {...} }`
- Forwards to the Google Apps Script webhook URL (from env var)
- Returns success/failure
- Fails silently (form submission to Formspree still works even if sheet logging fails)

#### 2. Update the 3 form submission handlers

After the existing Formspree `fetch()` succeeds, fire a non-blocking call to the edge function. This is a "fire and forget" pattern -- if the sheet logging fails, the user still sees success.

**Files modified:**
- `src/components/quiz/GlobalQuiz.tsx` -- add sheet logging after Formspree success (line ~363)
- `src/pages/Contact.tsx` -- add sheet logging after Formspree success (line ~62)
- `src/components/layout/Footer.tsx` -- add sheet logging after Formspree success (line ~40)

#### 3. Create a shared utility

**New file:** `src/lib/sheetLogger.ts`

```text
logToSheet(type, data)
  --> POST to /functions/v1/log-submission
  --> catch errors silently (console.warn only)
```

This keeps the logging logic in one place so all 3 forms use the same function.

#### 4. Google Apps Script (provided as documentation, not code we deploy)

We'll include a ready-to-copy Apps Script in a comment block or README that the client pastes into their Google Sheet. The script:
- Creates 3 tabs: "Quiz", "Contact", "Newsletter"
- Appends rows with timestamp + all fields
- Auto-creates column headers on first submission

### Client Setup Instructions (5 minutes)

1. Create a Google Sheet
2. Open Extensions > Apps Script
3. Paste the provided script
4. Click Deploy > New Deployment > Web App
5. Set "Anyone" access, deploy, copy the URL
6. Set the `GOOGLE_SHEET_WEBHOOK_URL` secret in their backend

### Files Changed

| File | Change |
|------|--------|
| `supabase/functions/log-submission/index.ts` | New edge function -- proxies to Google Sheet webhook |
| `src/lib/sheetLogger.ts` | New utility -- shared logging function |
| `src/components/quiz/GlobalQuiz.tsx` | Add non-blocking sheet logging after Formspree success |
| `src/pages/Contact.tsx` | Add non-blocking sheet logging after Formspree success |
| `src/components/layout/Footer.tsx` | Add non-blocking sheet logging after Formspree success |
| `supabase/config.toml` | Add `[functions.log-submission]` with `verify_jwt = false` |

### What Stays the Same

- Formspree remains the primary submission handler (no changes to existing flow)
- If `GOOGLE_SHEET_WEBHOOK_URL` is not set, the edge function returns early with no error
- All forms continue to work even if the sheet logging is down

