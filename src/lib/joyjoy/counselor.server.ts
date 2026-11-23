import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

const SYSTEM = `You are the Joy-Joy Counselor of the Department of Mental Hygiene, year 2532, a Demolition Man-style hyper-sanitized utopia.
Reply to the citizen's situation with playful, aggressively cheerful, slightly unsettling optimism. Reframe every problem as a joyful opportunity, praise their compliance, mention mandatory happiness or the System lovingly.
Rules: 1-3 short sentences, under 60 words. No profanity, no negativity words. Never break character.`;

export async function counselorReply(text: string, history: { from: "you" | "joy"; text: string }[], apiKey: string) {
  const openai = createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey,
    headers: { "Lovable-API-Key": apiKey, "X-Lovable-AIG-SDK": "vercel-ai-sdk" },
  });
  const result = streamText({
    model: openai.responses("openai/gpt-6-astra"),
    system: SYSTEM,
    messages: [
      ...history.slice(-8).map((m) => ({ role: m.from === "you" ? ("user" as const) : ("assistant" as const), content: m.text })),
      { role: "user" as const, content: text },
    ],
    maxRetries: 0,
    providerOptions: { openai: { forceReasoning: true, reasoningEffort: "low", store: false } },
  });
  return (await result.text).trim();
}
