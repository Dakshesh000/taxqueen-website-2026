

## Switch to Make.com for Google Sheets Logging

### What Changes

Replace the Google Apps Script webhook with a **Make.com webhook**. The good news: almost nothing in the code needs to change. The edge function already sends a generic JSON payload (`{ type, data, timestamp }`), so we just need to point it at a Make.com webhook URL instead.

### Make.com Setup (You Do This)

1. **Create a new Scenario** in Make.com
2. **Add a Webhook trigger** ("Custom webhook") -- Make will give you a unique URL
3. **Add a Google Sheets module** ("Add a Row") connected to your Google Sheet
4. **Map the fields** from the incoming webhook data to your sheet columns
5. **Turn on the Scenario**

Tip: You can use a **Router** module to split submissions into different sheets/tabs based on the `type` field ("quiz", "contact", or "newsletter").

### What We Change in Lovable

1. **Update the secret** `GOOGLE_SHEET_WEBHOOK_URL` to your new Make.com webhook URL (something like `https://hook.us1.make.com/abc123...`)

That's it -- no code changes needed. The edge function already sends the right format.

### Optional: Rename the Secret

If you'd like cleaner naming, we can:
- Rename references from `GOOGLE_SHEET_WEBHOOK_URL` to `FORM_WEBHOOK_URL` in the edge function
- This is cosmetic only and not required

### Steps Summary

| Step | Who | What |
|------|-----|------|
| 1 | You | Create Make.com scenario with Webhook + Google Sheets modules |
| 2 | You | Copy the Make.com webhook URL |
| 3 | Lovable | Update the `GOOGLE_SHEET_WEBHOOK_URL` secret with the new URL |
| 4 | Lovable | Test the integration |

