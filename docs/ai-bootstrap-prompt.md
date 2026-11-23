# AI Bootstrap Prompt — Joy-Joy OS

Copy everything below the line into a blank AI chat to recreate this project's context.

---

You are continuing work on **Joy-Joy OS**, a satirical web app: a 25th-century "mental hygiene terminal" inspired by the hyper-sanitized, forced-optimism world of *Demolition Man*. A citizen chats with a "Joy-Joy Counselor" that reflects everything back through aggressive, mandatory positivity. The tone is playful, slightly unsettling, never actually mean.

## Aesthetic / design constraints (established, do not drift)

- Two interface modes, switchable in Settings, persisted in localStorage:
  - **Terminal** (default): high-contrast white + neon mint, glassmorphism panels, perfectly symmetrical layouts, Orbitron display font, scanline overlay, tracking-widest uppercase micro-labels.
  - **Playtime**: children's-cartoon look — sky backdrop, drifting clouds, giant scrolling platitude marquee, floating-letter titles, blocky panels with 4px borders, typewriter chat bubbles, spinning-star accents. Big, fat, rounded letterforms (Lilita One / Fredoka).
- All colors come from semantic design tokens in `src/styles.css` — never hardcode color utilities.
- Ambient "system alerts" pop up ("SMILE DETECTED", "OPTIMISM LEVELS: OPTIMAL"). A "compliance meter" fills as the user interacts. Settings include a Compliance Level slider permanently locked at 100% (the joke is intentional).
- Animations smooth and snappy; the app should feel like cohesive, unsettling futuristic software.

## Technical state

- TanStack Start v1 + React 19 + Tailwind v4, single route `/`, all state in `src/components/joyjoy/JoyJoyTerminal.tsx`. No database, no auth; persistence is three localStorage keys (`joyjoy-mode`, `joyjoy-engine`, `joyjoy-compliance`).
- Reply engines (Settings → Counselor Engine):
  1. **Local Couplet Matrix** (default, zero cost): `src/lib/joyjoy/couplets.ts` — 270 rhyming couplets, 13 keyword themes + general fallback, naive stemmer, per-theme shuffle bags (no repeats until a theme is exhausted). Full spec: `docs/couplet-matrix.md`.
  2. **Live AI**: `createServerFn` `askCounselor` -> Lovable AI Gateway (`openai/gpt-6-astra`) with a Joy-Joy character prompt; bounded input/history.
  3. **ELIZA fallback** (`eliza.ts`): regex + pronoun reflection, used whenever AI fails.
- Every message is screened by `negativity.ts` (28 banned words) **before** any engine; a hit triggers the Re-Education overlay (screen flash, -8 compliance, must click "I LOVE JOY-JOY").
- Side tools: Compliment Generator, Mood Correction (word-swap rewriter), System Log, Citizen Status panel, Auto button (random sample situation), 30 s idle nudge, smart auto-scroll.
- Tests: `src/lib/joyjoy/joyjoy.test.ts` (Vitest) covers couplet counts, theme matching, no-repeat bags. Run `bunx vitest run`.

## Rules for this session

- Do NOT refactor or "optimize" working logic unless asked; the user values the current behavior.
- Keep reply logic in `src/lib/joyjoy/` (pure, testable); components only plumb state.
- When adding a rule the user cares about (limits, matching, compliance math), add/adjust a test.
- Docs live in `docs/`: `functional-specification.md`, `developer-guide.md`, `couplet-matrix.md`, `handoff.md`, this file.

## Immediate next goals (priority order)

1. Couplet engine upgrades: keyword weights, phrase keywords, negation handling, persisted shuffle bags (see `docs/couplet-matrix.md` §3).
2. Theme Pack JSON import/export.
3. Publisher-facing "Theme Studio" for non-developers to author themes (see `docs/couplet-matrix.md` §4) — optionally moving themes into Lovable Cloud tables with local cache.
4. Polish: sound/haptic-style feedback, seasonal skins.
