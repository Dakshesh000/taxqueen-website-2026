

## Add Google Sheet Webhook Secret

### What We're Doing

Store the Google Apps Script Web App URL as the `GOOGLE_SHEET_WEBHOOK_URL` secret so the `log-submission` edge function can forward form submissions to your Google Sheet.

### Steps

1. Add the secret `GOOGLE_SHEET_WEBHOOK_URL` with the provided URL value
2. Verify the integration works by testing the edge function

### Result

Once this secret is set, all Quiz, Contact, and Newsletter submissions will automatically be logged to your Google Sheet in separate tabs.

