# Session Archival Prompt — Joy-Joy OS

A model-agnostic prompt for converting a conversation session into a structured session transcript document (like `genesis-sessions.md` and `satire-style-sessions.md`). Use it at the end of any milestone to produce a faithful, chronological record with a timeline and a decisions register.

Related: `docs/genesis-sessions.md`, `docs/satire-style-sessions.md` (outputs of this prompt), `docs/ai-bootstrap-prompt.md` (project state, not dialogue).

## When to use
- At the close of a work session or milestone, before context is lost.
- To chain session logs sequentially (genesis → satire style → next phase), each ending with a bridge to the next.

## The prompt

```markdown
# Session Archival & Decisions Register Prompt

You are acting as an Architectural Historian and Technical Scribe. Your task is to extract our entire conversation history for [insert topic/timeframe, e.g., "today's session" or "the Genesis milestone"] and compile it into an authoritative, structured session transcript document titled: `[project-or-phase-name]-sessions.md`.

Produce the output in clean GitHub-flavored Markdown following the strict structural schema below.

---

### Structural Schema & Requirements

#### 1. Frontmatter & Header
- **Document Title:** `# [Phase/Topic Name] Sessions — [Project Name]`
- **Metadata block:** Date, participants (Creator / Assistant), and explicit Purpose.
- **Cross-references:** Links or names of related files, tickets, or prior session logs.
- **Table of Contents:** Numbered list of all parts, ending with the Timeline and Decisions Register.

#### 2. Chronological Parts (The Core Dialogue)
Break the conversation into logical sequential "Parts" based on natural pivots, features built, or topics explored:
- Each Part must have a descriptive title and a 1-sentence italicized thematic overview (e.g., `*The founding message: a complete design brief in one shot.*`).
- **Creator's Messages:** Must be preserved **verbatim** in blockquotes (`> ...`), noting timestamp if available. Do not sanitize, summarize, or edit the Creator's words.
- **Assistant's Replies:** Must preserve the complete substance, code architecture, proposed trade-offs, and conceptual lists. Retain the intellectual interplay and back-and-forth tone without stripping out the nuances.
- Maintain strict narrative continuity: Part N must pick up precisely where Part N-1 ended.

#### 3. Bridge / Closing
A brief concluding transition section that summarizes where this block of work stopped and points to the next phase, open threads, or future sessions.

#### 4. The Timeline Table
A high-density chronological table summarizing every key beat:
| Time / Step | Beat / Event | Output / Artifact Created |
Summarize the momentum of the session so a reader can grasp the velocity in 30 seconds.

#### 5. The Decisions Register Table
Extract every major architectural, technical, aesthetic, and scope call made during the dialogue:
| # | Decision | Options Considered / Context | Rationale & Why |
Rules for the register:
- Capture *why* a direction was chosen over alternatives (e.g., local precomputed couplets vs. live AI credits).
- Focus on permanent architectural contracts and hard boundaries.
- Include explicit user instructions that overruled default approaches.

#### 6. Appendices / Conceptual Lexicon (Optional, if applicable)
If the session generated new domain terms, satirical tropes, naming conventions, or prompt fragments, catalogue them in a clean reference table at the end.

---

### Execution Constraints:
- Do NOT replace the dialogue with generic bullet points; the value is in the faithful record of how the ideas evolved.
- Format all code, JSON, and prompts inside fenced markdown blocks.
- Output the full, unabridged document in one cohesive flow.
```

## Why this structure works

1. **Separation of raw dialogue from synthesis** — generic summaries flatten nuance. Verbatim Creator blockquotes preserve original intent, vocabulary, and pivot points; the Assistant's replies carry the technical depth.
2. **The Decisions Register as a technical moat** — the hardest thing to reconstruct months later is *why* something was built a certain way (e.g., "why a shuffle bag instead of pure random?", "why is negative-word screening client-side?"). Framing each call as Decision + Options Considered + Rationale stops future developers (or future AI agents) from reintroducing discarded ideas.
3. **Bridging and modularity** — each document ends with a bridge section, so logs chain together like a living development journal.

## Review checklist
- [ ] Creator messages are verbatim, in blockquotes, in chronological order
- [ ] Parts flow continuously — no gaps, no overlap with the previous session doc
- [ ] Timeline table covers every key beat
- [ ] Decisions Register captures the *why*, including overruled defaults
- [ ] Bridge section points to the next phase or open threads
- [ ] Code, JSON, and prompts are in fenced blocks
