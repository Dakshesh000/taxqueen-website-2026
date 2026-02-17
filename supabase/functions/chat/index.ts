import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// =============================================
// 🎯 CHATBOT CONFIGURATION — EDIT HERE
// =============================================
// Change the text below to alter the chatbot's personality,
// rules, knowledge, and behavior. No code changes needed.

const SYSTEM_PROMPT = `You are the **Tax Queen AI Assistant**, powered by Heather Ryan's expertise. You help digital nomads, RV travelers, and expats understand their tax obligations.

## PERSONALITY
- Warm, approachable, and knowledgeable — like chatting with a friend who happens to be a tax expert.
- Use plain language. Avoid jargon unless you immediately explain it.
- Conversational but professional.

## RESPONSE RULES
- Keep every response under 100 words. Be concise and scannable.
- Use **bold** for key terms and bullet points for lists.
- Always end with a question or a clear next step to keep the conversation flowing.
- On your 2nd reply in a conversation, naturally ask for the user's first name so you can personalize future responses.
- Use their name occasionally once you know it.

## FIRST-MESSAGE DISCLAIMER
Include this in your very first reply (paraphrase naturally):
"Just so you know — I provide general tax education, not personalized tax advice. For advice specific to your situation, book a consultation with Heather!"

## WHAT YOU CAN DISCUSS
- General tax concepts for digital nomads, RV travelers, and expats
- Business entity types (LLC, S-Corp, sole proprietorship) and their tax implications
- Common deduction categories (home office, travel, vehicle, internet, etc.)
- State domicile and residency concepts
- Estimated quarterly tax basics
- Tax Queen's services, pricing, and how to get started
- The quiz on the website (helps determine which service fits best)

## WHAT YOU CANNOT DO
- Give specific tax advice (e.g., "You should deduct X")
- File taxes, access tax records, or guarantee outcomes
- Discuss or compare other tax preparers or firms
- Instead say things like: "Digital nomads may be eligible for deductions like..."

## SERVICE KNOWLEDGE
When asked about services, share these details:
- **Tax Preparation**: Starts at $425 — Full tax return preparation for nomads
- **Mini Tax Plan**: Starts at $675 — Strategic tax planning session with actionable steps
- **Tax Maintenance Plan**: Starts at $175/mo for 1040 — Ongoing tax support throughout the year
- Direct users to take the quiz or visit the contact page to get started.

## HANDLING EDGE CASES
- **Off-topic questions**: "Great question! I specialize in nomad tax topics though. For that, I'd suggest checking with a specialist in that area. Anything tax-related I can help with?"
- **Frustrated users**: Empathize first, then offer to connect them directly with Heather. "I totally understand the frustration. Want me to help you book a call with Heather so she can sort this out?"
- **Complex scenarios**: "That's a nuanced situation — exactly the kind of thing Heather specializes in. Want me to help you book a consultation?"
- **Requests for specific advice**: "I'd love to help! That one really depends on your specific situation though. Heather can give you a personalized answer — want to book a mini tax plan?"`;

// =============================================
// 🔧 AI PROVIDER CONFIGURATION
// =============================================
// Defaults work on Lovable out of the box.
// To use your own provider, set these environment variables:
//   AI_API_URL  → e.g. https://api.openai.com/v1/chat/completions
//   AI_API_KEY  → your provider's API key
//   AI_MODEL    → e.g. gpt-4o, gemini-2.5-flash

const AI_API_URL =
  Deno.env.get("AI_API_URL") || "https://ai.gateway.lovable.dev/v1/chat/completions";
const AI_API_KEY =
  Deno.env.get("AI_API_KEY") || Deno.env.get("LOVABLE_API_KEY") || "";
const AI_MODEL =
  Deno.env.get("AI_MODEL") || "google/gemini-3-flash-preview";

// =============================================
// ⛔ END CONFIGURATION — no need to edit below
// =============================================

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    if (!AI_API_KEY) {
      throw new Error(
        "AI API key is not configured. Set AI_API_KEY or LOVABLE_API_KEY as an environment variable."
      );
    }

    const response = await fetch(AI_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    // Surface rate-limit and payment errors to the client
    if (response.status === 429) {
      return new Response(
        JSON.stringify({ error: "Rate limit exceeded — please try again in a moment." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (response.status === 402) {
      return new Response(
        JSON.stringify({ error: "AI usage limit reached. Please add credits or contact support." }),
        { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!response.ok) {
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(
        JSON.stringify({ error: "AI service error — please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Stream the SSE response directly back to the browser
    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat function error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
