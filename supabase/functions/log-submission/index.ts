import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const webhookUrl = Deno.env.get("GOOGLE_SHEET_WEBHOOK_URL");

    // If no webhook URL configured, return early (graceful no-op)
    if (!webhookUrl) {
      return new Response(
        JSON.stringify({ ok: true, skipped: true, reason: "No GOOGLE_SHEET_WEBHOOK_URL configured" }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { type, data } = await req.json();

    if (!type || !data) {
      return new Response(
        JSON.stringify({ error: "Missing 'type' or 'data' in request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Forward to Google Apps Script
    const gsResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type, data, timestamp: new Date().toISOString() }),
    });

    const gsText = await gsResponse.text();

    return new Response(
      JSON.stringify({ ok: gsResponse.ok, status: gsResponse.status }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("log-submission error:", error);
    return new Response(
      JSON.stringify({ error: "Internal error", message: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
