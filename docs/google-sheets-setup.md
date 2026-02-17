# Google Sheets Integration — Setup Guide

This project logs all form submissions (Quiz, Contact, Newsletter) to a Google Sheet via a Google Apps Script webhook.

## Setup (5 minutes)

### 1. Create a Google Sheet

Create a new Google Sheet. Name it whatever you like (e.g., "Tax Queen Submissions").

### 2. Add the Apps Script

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code and paste the script below
3. Click **Save** (💾)

```javascript
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var data = JSON.parse(e.postData.contents);
    var type = data.type; // "quiz", "contact", or "newsletter"
    var submission = data.data;
    var timestamp = data.timestamp || new Date().toISOString();

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheetName = type.charAt(0).toUpperCase() + type.slice(1); // "Quiz", "Contact", "Newsletter"

    // Get or create the tab
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) {
      sheet = ss.insertSheet(sheetName);
    }

    // Get existing headers or create them
    var headers = [];
    if (sheet.getLastRow() > 0) {
      headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    }

    // Always include Timestamp as first column
    if (headers.length === 0 || headers[0] !== "Timestamp") {
      headers = ["Timestamp"];
    }

    // Add any new keys from submission
    var keys = Object.keys(submission);
    keys.forEach(function(key) {
      if (headers.indexOf(key) === -1) {
        headers.push(key);
      }
    });

    // Write headers
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

    // Build row
    var row = headers.map(function(header) {
      if (header === "Timestamp") return timestamp;
      return submission[header] !== undefined ? String(submission[header]) : "";
    });

    // Append row
    sheet.appendRow(row);

    return ContentService.createTextOutput(
      JSON.stringify({ result: "success" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
```

### 3. Deploy as Web App

1. Click **Deploy → New Deployment**
2. Click the gear icon next to "Select type" → choose **Web app**
3. Set:
   - **Description**: "Form submissions webhook"
   - **Execute as**: Me
   - **Who has access**: **Anyone**
4. Click **Deploy**
5. Click **Authorize access** and follow the prompts
6. Copy the **Web app URL** (looks like `https://script.google.com/macros/s/.../exec`)

### 4. Add the Secret

In Lovable Cloud, add a secret named `GOOGLE_SHEET_WEBHOOK_URL` with the Web App URL you copied.

That's it! All future form submissions will appear in your Google Sheet with separate tabs for Quiz, Contact, and Newsletter.

## How It Works

```
User submits form → Formspree (primary) + Edge Function → Google Apps Script → Google Sheet
```

- Formspree remains the primary handler — the sheet logging is a non-blocking secondary action
- If the webhook URL is not configured, the edge function returns silently with no error
- If the Google Sheet logging fails, the user still sees a successful submission
