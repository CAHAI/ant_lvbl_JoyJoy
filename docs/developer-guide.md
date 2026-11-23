# Joy-Joy OS — Developer Guide

## Stack

| Layer | Choice |
|---|---|
| Framework | TanStack Start v1 (React 19, SSR, Vite 8) |
| Routing | TanStack Router, file-based (`src/routes/`), generated `routeTree.gen.ts` — never edit |
| Styling | Tailwind CSS v4 via `src/styles.css` (`@import` + `@theme` tokens); shadcn/ui components in `src/components/ui/` |
| Fonts | Orbitron, Lilita One, Fredoka, JetBrains Mono — loaded via `<link>` in `src/routes/__root.tsx` (never `@import` remote CSS) |
| Server logic | `createServerFn` from `@tanstack/react-start` (no Supabase Edge Functions) |
| AI | Lovable AI Gateway via `@ai-sdk/openai` + `ai` SDK, model `openai/gpt-6-astra` |
| Tests | Vitest (`bunx vitest run`); logic tests in `src/lib/joyjoy/joyjoy.test.ts` |

## Data flow

Everything is client state in `JoyJoyTerminal` (`src/components/joyjoy/JoyJoyTerminal.tsx`) — no context providers, no store library.

```text
user input
  -> submit()
     1. detectNegativity(text)          // banned word? -> Re-Education overlay, stop
     2. engine === "local" (default):
          coupletReply(text)            // classify() -> theme shuffle-bag draw
        engine === "ai":
          askCounselor server fn        // zod-validated, LOVABLE_API_KEY server-side
            -> counselor.server.ts      // AI Gateway, character prompt, last 8 msgs
          on any failure -> respond()   // ELIZA fallback, always offline-safe
     3. append Counselor bubble; compliance +4; 40% chance of a bonus alert
```

Side tools are pure functions: `moodCorrect()` (word swaps), `pick(COMPLIMENTS)` (praise). Alerts, system log, idle nudge and the clock are timers inside the root component.

### Persistence

| Key | What |
|---|---|
| `joyjoy-mode` | `terminal` \| `playtime` |
| `joyjoy-engine` | `local` \| `ai` |
| `joyjoy-compliance` | meter value 0–100 |

Shuffle-bag rotation in `couplets.ts` is in-memory only; reload resets it.

## Mock / simulated systems a real backend would replace

1. **Citizen identity & compliance** — localStorage number. A real deployment would key it to an authenticated user row.
2. **Theme content** — hardcoded in `couplets.ts`. Planned move to Cloud tables with a local cache (see `docs/couplet-matrix.md` §4.1).
3. **System Log** — ephemeral in-memory list; no audit trail.
4. **AI key** — `LOVABLE_API_KEY` is injected by the platform; if absent, `askCounselor` returns an error and the UI silently falls back to ELIZA. Never read it in browser code.
5. **Settings** — the locked Compliance slider is decorative by design (satire), not a bug.

## Conventions & gotchas

- **No logic in components beyond state plumbing** — reply/classification logic stays in `src/lib/joyjoy/` so it stays unit-testable.
- **Negativity screening always runs first**, for both engines. Don't move it server-side only; the Re-Education overlay is a client experience.
- **Couplet format**: one string, lines joined by `" / "` (converted to `\n` on display). Keep lines short enough for a chat bubble.
- **Keywords**: short, distinctive, lowercase; the stemmer is naive (`bus` -> `bu`), so avoid keywords that collide after stemming. One keyword should belong to one theme — ties keep the earlier theme.
- **Adding a theme**: edit `THEMES`, add a test sentence in `joyjoy.test.ts`, update the count assertions, run `bunx vitest run src/lib/joyjoy`.
- **Server boundaries**: `process.env` only inside handlers; the AI client is dynamically imported in the server function so it never enters the browser bundle.
- **Route heads**: every content route sets its own `head()`; never put `og:image`/`twitter:image` on `__root`.

## Commands

```sh
bun run dev          # dev server
bunx vitest run      # all tests
bunx vitest run src/lib/joyjoy   # counselor logic only
```
