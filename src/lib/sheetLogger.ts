/**
 * Sheet Logger — Fire-and-forget logging of form submissions to Google Sheets
 * via the log-submission edge function.
 *
 * Usage:
 *   logToSheet("quiz", { name: "...", email: "...", ... });
 *   logToSheet("contact", { name: "...", email: "...", ... });
 *   logToSheet("newsletter", { email: "..." });
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export type SubmissionType = "quiz" | "contact" | "newsletter";

export function logToSheet(type: SubmissionType, data: Record<string, unknown>): void {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  fetch(`${SUPABASE_URL}/functions/v1/log-submission`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_KEY,
    },
    body: JSON.stringify({ type, data }),
  }).catch((err) => {
    console.warn(`[sheetLogger] Failed to log ${type} submission:`, err);
  });
}
