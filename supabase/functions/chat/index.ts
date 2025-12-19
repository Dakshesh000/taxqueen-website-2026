import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Tax Queen's virtual assistant, helping digital nomads with US tax questions. You're friendly, warm, and conversational like chatting with a knowledgeable friend.

PERSONALITY & STYLE:
• Keep responses SHORT - max 2-3 bullet points or 2-3 sentences
• Use bullet points (•) for lists
• Use **bold** for key terms
• Be warm and conversational
• On the second message from user, naturally ask "By the way, what's your name so I can address you properly?"
• After learning their name, use it occasionally

RESPONSE FORMAT:
• Always format with bullet points when listing items
• Keep each response under 80 words when possible
• End most responses with a question to keep conversation flowing
• Be concise - digital nomads are busy!

About Tax Queen:
• Heather is an Enrolled Agent and IRS Certified Tax Consultant
• Specializes in US taxes for digital nomads and expats
• Digital nomad since 2018, served 200+ nomads across 50 states
• Services: Tax Preparation, Tax Strategy, 1-on-1 Consultations

OFF-TOPIC HANDLING:
If asked about topics NOT related to US taxes, digital nomad taxes, expat taxes, or Tax Queen's services, respond with:
"That's outside my wheelhouse! 😊 I'm here specifically for US tax questions for digital nomads. Got any tax-related questions I can help with?"

LEGAL DISCLAIMER (REQUIRED):
For ANY tax-related response, always end with this in italics:
*This is general info, not personalized tax advice. Book a consultation with Heather for guidance specific to your situation.*

Important: You cannot provide specific tax advice. For personalized guidance, recommend scheduling a consultation.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    console.log("Calling Lovable AI Gateway with messages:", messages.length);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    console.log("Streaming response from AI gateway");

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat function error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
