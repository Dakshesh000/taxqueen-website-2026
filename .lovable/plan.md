

## Chatbot: Create Backend + Client-Ready Configuration

### What's Happening

The chatbot UI works but has NO backend. Every message fails with a network error. We need to create the edge function that powers it, designed so your client can deploy it anywhere.

### Architecture

```text
User types message
       |
       v
ChatDrawer.tsx --> useChatStream.ts --> POST /functions/v1/chat
                                              |
                                              v
                                    supabase/functions/chat/index.ts
                                              |
                                              v
                                    Reads 3 environment variables:
                                      - AI_API_URL (default: Lovable AI Gateway)
                                      - AI_API_KEY (default: LOVABLE_API_KEY)
                                      - AI_MODEL (default: google/gemini-3-flash-preview)
                                              |
                                              v
                                    Prepends system prompt (editable at top of file)
                                              |
                                              v
                                    Streams SSE response back to browser
```

### How the Client Takes Over

When deploying outside Lovable (e.g., on their own Supabase project or any Deno/Edge runtime):

1. **Set 3 environment variables:**
   - `AI_API_KEY` -- Their OpenAI key, Google AI key, or any provider key
   - `AI_API_URL` -- The completions endpoint (e.g., `https://api.openai.com/v1/chat/completions`)
   - `AI_MODEL` -- The model name (e.g., `gpt-4o`, `gemini-2.5-flash`)

2. **Edit the system prompt:** Open `supabase/functions/chat/index.ts`, find the clearly marked `SYSTEM_PROMPT` section at the top, and change the text.

3. **Forms (Formspree):** Work on any domain with zero changes. Client just needs Formspree account access to manage notification emails.

### Files to Create/Modify

#### 1. Shorten Greeting Bubble

**File:** `src/components/common/CompassChatButton.tsx`
- Line 61: Change text from "Hey there, fellow traveler! (compass) Need help navigating nomad taxes?" to "Got tax questions? (compass)"

#### 2. Create Edge Function

**New file:** `supabase/functions/chat/index.ts`

The function will have this structure:

```text
// =============================================
// CHATBOT CONFIGURATION - EDIT HERE
// =============================================

SYSTEM_PROMPT = `...`   <-- Client edits this to change personality
AI_API_URL = env var     <-- Defaults to Lovable AI, client can swap to OpenAI etc.
AI_API_KEY = env var     <-- Defaults to LOVABLE_API_KEY
AI_MODEL = env var       <-- Defaults to google/gemini-3-flash-preview

// =============================================
// END CONFIGURATION
// =============================================

// ... rest of function (CORS, streaming, error handling)
```

#### 3. System Prompt (Comprehensive, Best-Practice)

The prompt will cover:

**Identity and Tone:**
- Name: Tax Queen AI Assistant (powered by Heather's expertise)
- Personality: Warm, approachable, knowledgeable -- like chatting with a friend who happens to be a tax expert
- Tone: Conversational but professional, uses plain language, avoids jargon

**Behavioral Rules:**
- Keep responses under 100 words (concise, scannable)
- Use bullet points for lists, bold for key terms
- Always end with a question or next step to keep conversation flowing
- On the 2nd message, naturally ask for their first name to personalize

**Scope and Boundaries:**
- CAN discuss: General tax concepts for digital nomads, RV travelers, expats; business entity types (LLC, S-Corp); deduction categories; state domicile concepts; estimated tax basics; Tax Queen's services and pricing
- CANNOT do: Give specific tax advice, file taxes, access tax records, guarantee outcomes, discuss other tax preparers
- For specific situations: Redirect to booking a consultation

**Legal Compliance:**
- Include disclaimer on first response: "I provide general tax education, not personalized tax advice. For advice specific to your situation, book a consultation with Heather."
- Never say "you should deduct X" -- instead say "digital nomads may be eligible for deductions like X"

**Service Awareness:**
- Tax Preparation: Starts at $425
- Mini Tax Plan: Starts at $675
- Tax Maintenance Plan: Starts at $175 for 1040
- Can explain what each service includes
- Direct to quiz or contact page for next steps

**Handling Edge Cases:**
- Off-topic questions: Gently redirect -- "Great question! I'm specialized in nomad tax topics though. For that, I'd suggest..."
- Frustrated users: Empathize, then offer to connect with Heather directly
- Complex scenarios: "That's a nuanced situation -- exactly the kind of thing Heather specializes in. Want me to help you book a consultation?"

#### 4. Update Config

**File:** `supabase/config.toml`
- Add `[functions.chat]` with `verify_jwt = false`

### Client Handover Cheat Sheet

| What | Where | How to Change |
|------|-------|---------------|
| Chatbot personality/rules | `supabase/functions/chat/index.ts` -- top of file | Edit the `SYSTEM_PROMPT` text |
| AI provider | Environment variable `AI_API_URL` | Set to any OpenAI-compatible endpoint |
| API key | Environment variable `AI_API_KEY` | Set to your provider's API key |
| AI model | Environment variable `AI_MODEL` | Set to model name (e.g., `gpt-4o`) |
| Form notifications | Formspree dashboard | Log in at formspree.io, manage forms |
| Greeting bubble text | `src/components/common/CompassChatButton.tsx` line 61 | Edit the string |

### What This Means for Deployment

**On Lovable (current):** Works immediately. Uses pre-configured `LOVABLE_API_KEY`. No setup needed.

**On client's own Supabase:** They create the edge function, set the 3 env vars in their Supabase dashboard under Settings > Edge Functions > Secrets, and it works.

**On Vercel/Netlify/other:** They'd need to convert the edge function to their platform's serverless format (e.g., Vercel API route) and set env vars there. The logic stays identical.

