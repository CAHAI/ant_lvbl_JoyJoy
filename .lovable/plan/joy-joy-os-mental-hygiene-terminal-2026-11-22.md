# Joy-Joy OS — Mental Hygiene Terminal

A single-page, client-only app (no backend needed) styled as a 25th-century government terminal.

## Visual direction

- Stark white base, neon mint accents, frosted glass panels, perfectly symmetrical centered layout.
- Display font: Orbitron-style geometric; body: a clean mono (e.g. JetBrains Mono / Space Grotesk).
- Subtle scanline/grid background, soft mint glow, smooth snappy transitions.

## Layout (symmetrical)

```text
[ JOY-JOY OS header | clock | settings ]
[ Compliance Meter (full width bar)     ]
[ Left: Tools ] [ Counselor Chat ] [ Right: Status ]
```

- Left panel: Compliment Generator, Mood Correction tool.
- Right panel: citizen status readouts (optimism level, smile index), recent alerts.
- Collapses to stacked single column on mobile.

## Features

1. **Joy-Joy Counselor chat** — ELIZA-style pattern rules (regex + pronoun reflection: "I feel X" -> "Why do you feel X? Feeling X is a gift from the System!"), falls back to platitudes.
2. **Platitude library** — 55+ soul-crushing platitudes.
3. **Re-education Sequence** — negative words (sad, hate, anger, bad, etc.) trigger a full-screen flashing overlay; only exit is an "I LOVE JOY-JOY" button.
4. **System alerts** — toasts at random intervals and after actions ("SMILE DETECTED", "OPTIMISM LEVELS: OPTIMAL").
5. **Compliance meter** — rises with every interaction, persisted in local storage; drops briefly on negativity.
6. **Compliment Generator** — random vague praise.
7. **Mood Correction** — word-swap dictionary turns any sentence hyper-positive.
8. **Settings dialog** — one option: "Compliance Level", slider locked at 100% (disabled, with a smug tooltip).

## Technical details

- Rewrite `src/routes/index.tsx`; components under `src/components/joyjoy/`; logic in `src/lib/joyjoy/` (eliza.ts, platitudes.ts, moodCorrect.ts, negativity.ts).
- Design tokens in `src/styles.css` (oklch mint/white, glass utilities, flash keyframes); fonts via `<link>` in `__root.tsx`; update head metadata.
- Vitest tests for negative-word detection, mood correction, and platitude count (>= 50).