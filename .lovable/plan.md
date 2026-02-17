

## Update Webhook Secret to Make.com URL

### What We're Doing

Update the `GOOGLE_SHEET_WEBHOOK_URL` secret to point to your new Make.com webhook endpoint.

### Steps

1. Update the existing `GOOGLE_SHEET_WEBHOOK_URL` secret with your Make.com URL: `https://hook.eu2.make.com/erqm3fpxxq315o9du7uynld5iimxrnzp`
2. Test the integration by sending a test payload to the `log-submission` edge function

### Payload Format (Already in Place)

The edge function already sends this consistent shape to the webhook -- no code changes needed:

```text
{
  "type": "quiz" | "contact" | "newsletter",
  "data": { ...form fields... },
  "timestamp": "2026-02-17T..."
}
```

This is exactly what Make.com needs to route submissions via a Router module based on the `type` field.

