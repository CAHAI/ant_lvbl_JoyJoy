# Handoff — Joy-Joy OS

**For:** a fresh agent continuing this project.
**State as of:** 2026-11-22. Read `docs/functional-specification.md` first — it is the source of truth for what exists. This file only covers context that isn't in the other docs.

## Where we are

The app is feature-complete for its original brief and has gone through several refinement rounds, all committed:

1. Base terminal (ELIZA chat, platitudes, Re-Education, compliance meter, tools).
2. Playtime cartoon mode with floating letters, marquee, typewriter bubbles.
3. Live AI Counselor via Lovable AI Gateway + Auto button + idle nudge.
4. Local Couplet Matrix (270 couplets, 13 themes) as the default zero-credit engine, with a Settings toggle between Local and Live AI.
5. Playtime layout rework: all side panels in one left column (Citizen Status → Compliment Generator → Mood Correction → System Log), wider/taller chat, smart auto-scroll.

The user's most recent interest is the **couplet matrix as a content platform** — see `docs/couplet-matrix.md` for the full functionality/extensibility spec and the publisher-facing "Theme Studio" concept.

## How the user works

- Explores iteratively: tries a direction in the preview, then refines ("move the panels", "wider chat", "bigger numbers, smaller labels").
- Cost-conscious: asked specifically to reduce AI credit burn, which is why the local matrix exists and is the default.
- Values the satirical tone — keep copy in character ("citizen", "the System", mandatory joy).
- Asked for documentation without code refactors; respect that boundary unless told otherwise.

## Suggested skills / tools for the next session

- **Vitest** (`bunx vitest run src/lib/joyjoy`) after any change to matching, couplet, or compliance logic — the test suite encodes rules the user cares about.
- **Playwright preview checks** for any layout/animation change (the user judges visually; both modes need a look).
- **Lovable Cloud** (not yet enabled) when the Theme Studio / Cloud-table work begins — themes, keywords, couplets, roles.
- **AI Gateway** only for authoring-time features (e.g. AI draft assist in the Theme Studio); runtime replies should stay local by default.

## Open threads

- Theme Studio / publisher interface (designed in `docs/couplet-matrix.md` §4, not built).
- Engine upgrades (weights, phrases, negation, persisted bags) — §3 of the same doc.
- No known bugs; build and tests are green at handoff.

## Sensitive information

None. No API keys, credentials, or personal data are stored in the repo; `LOVABLE_API_KEY` is platform-injected and never appears in code.
