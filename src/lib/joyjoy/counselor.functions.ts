import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  text: z.string().min(1).max(1000),
  history: z.array(z.object({ from: z.enum(["you", "joy"]), text: z.string().max(1000) })).max(20),
});

export const askCounselor = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => Input.parse(d))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) return { reply: null, error: "Counselor mainframe not configured." };
    try {
      const { counselorReply } = await import("./counselor.server");
      const reply = await counselorReply(data.text, data.history, key);
      if (!reply) return { reply: null, error: "The Counselor is momentarily speechless with joy." };
      return { reply, error: null };
    } catch (e) {
      const err = e as { statusCode?: number; message?: string };
      console.error("counselor error", err.statusCode, err.message);
      const msg = err.statusCode === 429 ? "Too much joy at once! Please wait a moment." : err.statusCode === 402 ? "AI credits are used up. Add credits in Settings → Plans & credits." : "Mainframe hiccup.";
      return { reply: null, error: msg };
    }
  });
