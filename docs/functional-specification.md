# Joy-Joy OS — Functional Specification

A satirical "mental hygiene terminal" inspired by the hyper-sanitized, forced-optimism world of *Demolition Man*. The citizen chats with a Joy-Joy Counselor that reflects everything back through a lens of aggressive, mandatory positivity.

---

## 1. Architecture overview

Single-page TanStack Start (React 19) app. One route (`/`) renders one root component (`JoyJoyTerminal`) that owns all session state. Reply logic lives in pure, testable modules under `src/lib/joyjoy/`. The only server touchpoint is one `createServerFn` (`askCounselor`) that proxies to the Lovable AI Gateway when the Live AI engine is selected.

```text
src/routes/index.tsx  ->  <JoyJoyTerminal />  (all UI + session state)
                                |
        +-----------------------+------------------------+
        |                       |                        |
  local engine            negativity screen         AI engine
  couplets.ts             negativity.ts            counselor.functions.ts
  (default, free)         (runs first, always)     -> counselor.server.ts
        |                                              -> Lovable AI Gateway
  fallback: eliza.ts
  platitudes.ts / moodCorrect.ts (side tools)
```

State persistence is intentionally minimal: `localStorage` keys `joyjoy-mode`, `joyjoy-engine`, `joyjoy-compliance`. No accounts, no database.

## 2. Implemented features

### Interface modes
- **Terminal** (default): white + neon-mint glassmorphism, Orbitron display font, scanline overlay, symmetrical three-column layout.
- **Playtime**: cartoon look — sky backdrop with drifting clouds, scrolling giant platitude marquee (`WordMarquee`), floating-letter title (`FloatingTitle`), blocky 4px-border panels, typewriter chat bubbles (`TypewriterText`), spinning-star compliance meter.
- Mode switch in Settings with a full-screen wipe transition; persisted across visits.

### Counselor chat
- **Local Couplet Matrix** (default, zero credits): 270 pre-written rhyming couplets across 13 themes (Fatigue, Work, Relationships, Existential, Health, Food, Technology, Travel, Nature & Weather, Wants & Dreams, Pets, Money, Holidays) + 10 general fallbacks. Keyword classifier with naive stemming; per-theme shuffle bags guarantee no repeats until a theme's pool is exhausted. See `docs/couplet-matrix.md`.
- **Live AI** (optional): server function calls the Lovable AI Gateway (`openai/gpt-6-astra`) with a Joy-Joy character prompt, bounded input (1000 chars) and history (last 8 messages). Falls back to the local ELIZA responder on any error, missing key, or rate limit.
- **ELIZA fallback** (`eliza.ts`): regex-rule responder with pronoun reflection, always available offline.
- **Auto button** next to Transmit: submits a random pre-written sample situation.
- **Idle nudge**: after 30 s of inactivity (and no open modal), the Counselor posts a "LACK OF INPUT DETECTED" nudge.
- **Auto-scroll**: chat follows new bubbles while the user is near the bottom; scrolling up is respected.

### Re-Education Sequence
- `negativity.ts` screens every message for 28 banned words *before* any reply engine runs.
- A hit docks compliance by 8, increments the Violations counter, and opens a flashing overlay that blocks interaction until the citizen clicks **I LOVE JOY-JOY** (+10 compliance).

### Side tools
- **Compliment Generator**: random vague praise from a 15-item pool (+2 compliance).
- **Mood Correction**: word-swap rewriter (`moodCorrect.ts`, ~50 substitutions) that converts any sentence into a hyper-positive version (+3 compliance).
- **System Log**: timestamped mirror of the last 6 alerts.
- **Citizen Status**: Optimism %, Smile Score, Compliance, Violations — line items in Terminal mode, big-number tiles in Playtime mode.

### Ambient systems
- **Compliance meter**: starts at 12, rises with interaction, persists in localStorage, clamps 0–100.
- **System alerts**: toast every 14 s from a 9-item pool ("SMILE DETECTED", "OPTIMISM LEVELS: OPTIMAL", …), plus event-driven alerts.
- **Settings**: Compliance Level slider locked at 100% (joke), Interface Mode switch, Counselor Engine switch (Local Couplets / Live AI).

## 3. Forward-looking checklist (discussed, not built)

From `docs/couplet-matrix.md` §3–5 and session discussions:

- [ ] Engine upgrades: keyword weights, phrase keywords, negation handling, sub-themes, templated slots, persisted shuffle bags, tone tiers, multi-theme blends.
- [ ] Theme Pack JSON import/export (no backend needed).
- [ ] Move themes into Lovable Cloud tables with local cache (keeps zero-credit runtime).
- [ ] Publisher-facing **Theme Studio**: keyword builder, couplet editor with rhyme/syllable helpers, AI draft assist (one-time credits at authoring), test console with confusion table and unmatched inbox.
- [ ] Roles & review workflow (Publisher / Censor / Administrator), scheduled themes, analytics (fallback-rate target < 20%).
- [ ] Sound design / haptic-style feedback for alerts and Re-Education.
- [ ] More interface modes or seasonal skins.
