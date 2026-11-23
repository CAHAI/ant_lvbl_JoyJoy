# Joy-Joy OS 🌞

> Happiness is a choice and a requirement!

A satirical 25th-century **mental hygiene terminal** inspired by the hyper-sanitized, forced-optimism world of *Demolition Man*. Chat with your Joy-Joy Counselor — it reflects everything back through a lens of aggressive, mandatory positivity. Built with [Lovable](https://lovable.dev).

## Status: ✅ Milestone reached — stable, tested, documented

| Area | State |
|---|---|
| Terminal interface (glassmorphism, mint/white, scanlines) | ✅ Done |
| Playtime cartoon interface (floating letters, marquee, typewriter) | ✅ Done |
| Counselor chat — Local Couplet Matrix (270 couplets, 13 themes) | ✅ Done, default, zero cost |
| Counselor chat — Live AI via Lovable AI Gateway | ✅ Done, optional toggle |
| ELIZA offline fallback | ✅ Done |
| Re-Education Sequence (banned-word screen flash) | ✅ Done |
| Compliance meter, alerts, System Log, Citizen Status | ✅ Done |
| Compliment Generator, Mood Correction, Auto reply, idle nudge | ✅ Done |
| Tests (couplet counts, theme matching, no-repeat bags) | ✅ Green |
| Documentation (`docs/`) | ✅ Complete |
| Theme Studio (publisher-facing theme authoring) | 🔲 Designed, not built |
| Engine upgrades (weights, phrases, negation, persisted bags) | 🔲 Planned |

## Features

- **Two interface modes** — a stark government terminal and a children's-cartoon Playtime skin, switchable in Settings with a wipe transition.
- **Three reply engines** — a local matrix of 270 pre-written rhyming couplets matched by keyword themes (default, free, instant), a live AI Counselor with a Joy-Joy character prompt, and a classic ELIZA responder as the always-available fallback.
- **Re-Education Sequence** — use a banned word ("sad", "hate", "tired"…) and the screen flashes until you click **I LOVE JOY-JOY**.
- **Compliance meter** that rises as you interact, ambient system alerts ("SMILE DETECTED"), a System Log, and a Citizen Status panel.
- **Side tools** — Compliment Generator, Mood Correction (rewrites any sentence hyper-positively), an Auto button that submits a sample situation, and a Counselor that nudges you after 30 s of silence.

## Tech stack

TanStack Start v1 · React 19 · Tailwind CSS v4 · shadcn/ui · Vitest · Lovable AI Gateway (`openai/gpt-6-astra`)

## Development

```sh
bun install
bun run dev          # dev server
bunx vitest run      # tests
```

## Documentation

- [`docs/functional-specification.md`](docs/functional-specification.md) — architecture, features, forward-looking checklist
- [`docs/developer-guide.md`](docs/developer-guide.md) — stack, data flow, conventions, mock systems to replace
- [`docs/couplet-matrix.md`](docs/couplet-matrix.md) — the local reply engine: how it works and how to extend it
- [`docs/ai-bootstrap-prompt.md`](docs/ai-bootstrap-prompt.md) — copy/paste context for a fresh AI session
- [`docs/handoff.md`](docs/handoff.md) — handoff notes for the next agent

## Next steps

1. Couplet engine upgrades: keyword weights, phrase matching, negation, persisted shuffle bags.
2. Theme Pack JSON import/export.
3. Publisher-facing **Theme Studio** so non-developers can author new couplet themes (design in `docs/couplet-matrix.md` §4).

---

*BE WELL · YOU ARE BEING WELL-MONITORED*
