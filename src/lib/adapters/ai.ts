/** Chat history entry passed to an optional AI provider. */
export type ChatTurn = { from: "you" | "joy"; text: string };

/**
 * Optional, separately callable AI provider interface.
 * Live AI is mothballed for standalone/offline builds; when no provider is wired,
 * the session falls back cleanly to the local ELIZA or Couplet Matrix engine.
 */
export interface AIProviderAdapter {
  reply(text: string, history: ChatTurn[]): Promise<{ reply: string | null; error: string | null }>;
}

/** Default offline/mothballed adapter used when no external AI backend is configured. */
export const mothballedAIAdapter: AIProviderAdapter = {
  async reply() {
    return { reply: null, error: "Counselor mainframe offline — local joy engaged." };
  },
};
