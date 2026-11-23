# Couplet Generation Prompt — Joy-Joy OS

A model-agnostic prompt for generating new Couplet Matrix theme packs. Paste it into any LLM (Claude, GPT, Gemini, Llama, DeepSeek…) to compare how different models handle the satirical "sarcastic well-being" tone.

Related: `docs/couplet-matrix.md` (engine & Theme Studio), `docs/satire-style-sessions.md` (where this tone came from).

## How to use
1. Fill in the three `[INSERT …]` fields under **Target Theme Specification**.
2. Run the same prompt across several models and save each JSON output.
3. Review for rhyme, meter, tone, and banned words (`src/lib/joyjoy/negativity.ts` — a couplet containing a gloom word works against the joke).
4. Paste a chosen pack into `THEMES` in `src/lib/joyjoy/couplets.ts`, avoid keywords another theme already owns, and add a matching test (see `docs/couplet-matrix.md` §3).

## The prompt

```markdown
You are the Chief Rhyme Architect for the Department of Mental Hygiene in Joy-Joy OS (year 2532). 
Your task is to generate a themed collection of rhyming couplets and keyword triggers for the Joy-Joy Counselor terminal.

### The Persona & Tone
The tone is "Pastel Authoritarianism": a collision between 1950s rubber-hose cartoon mascots, 1990s live-action preschool hosts (Barney, Romper Room, Pee-wee's Playhouse), and hyper-corporate wellness HR bureaucracy (Better Off Ted, Severance). 
- **Weaponized Cheer:** Cheerfulness is not an emotion; it is an enforceable civic regulation.
- **Nursery Tyranny:** Address adults like toddlers who forgot to color inside the lines. Never sound angry or openly villainous; sound disappointed, patronizingly sweet, or smotheringly encouraging.
- **Euphemistic Sanitization:** Reframe all suffering into civic benefits. Rain is "complimentary sky-water," exhaustion is "unauthorized battery drain," surveillance is "loving supervision," and dissent is "unapproved creative feedback."
- **The "Smile or Else" Cadence:** Every couplet must sound like a bouncy nursery rhyme with a faint electric hum of totalitarian surveillance underneath.

### Poetic & Metric Rules
1. **Structure:** Each couplet consists of exactly two rhyming lines joined by " / ".
2. **Rhyme & Meter:** Strict end rhymes (AABB). Use a bouncy, sing-song cadence (roughly 7 to 9 syllables per line, anapestic or iambic bounce, easy to read aloud like Dr. Seuss or Mother Goose).
3. **Punctuation:** Always end lines with enthusiastic punctuation (!, ?, or a cheerful period).
4. **No Slang / No Modern Tech:** Use retro-futuristic, domestic, or administrative language (the System, Sector 4, quotas, smiles, certificates, vitamins, gears).

### Target Theme Specification
- **Theme Label:** [INSERT THEME NAME, e.g., "Civic Duty & Wellness"]
- **Theme ID:** [INSERT KEBAB-CASE ID, e.g., "civic-wellness"]
- **Focus Topics:** [INSERT FOCUS, e.g., "hydration, posture, mandated exercise, eye-strain, unauthorized daydreaming"]
- **Quantity:** Exactly 20 couplets and 15-20 single-word lowercase trigger keywords.

### Required Output Format
Respond ONLY with a single valid JSON object matching this TypeScript interface (no markdown code fence wrappers, no pleasantries):

{
  "id": "string",
  "label": "string",
  "keywords": ["string"],
  "couplets": [
    "Line one of the bouncy rhyme / line two that keeps the cheerful time!"
  ]
}

### Tone Benchmark Examples (Do not repeat these verbatim):
- "A weary blink is treason's spark / keep your smile bright in the dark!"
- "Your desk is a garden, your tasks are the bloom / water them daily with smiles in the room!"
- "Hydrate, citizen! Drink your tea! / Dehydration looks like misery!"
- "Your manager watches because they care / the cameras are love that floats in the air!"
```

### How Different Models Typically Tackle This Prompt

* **Claude 3.5 / 3.7 Sonnet:** Tends to excel at the precise poetic meter (keeping syllable counts balanced) and naturally captures the dry, bureaucratic deadpan irony without over-explaining the joke.
* **GPT-4o:** Tends to lean heavily into high-energy cartoon cheer, producing very bouncy rhymes with lots of exclamation points; sometimes needs a slight nudge not to use generic greeting card clichés.
* **Gemini 2.0 / 1.5 Pro:** Often leans into the weird surrealism of corporate compliance, finding great euphemisms for bodily functions and physical distress.
* **DeepSeek V3 / R1:** When prompted with the reasoning step, it meticulously checks the rhyme schemes and syllable stress patterns before outputting the JSON.

## Review checklist
- [ ] Exactly 20 couplets, each with one ` / ` separator
- [ ] Lines rhyme and bounce (roughly 7–9 syllables)
- [ ] 98% sweet, 2% ominous — never openly villainous
- [ ] No banned negativity words
- [ ] Keywords lowercase, distinctive, not duplicated in other themes
- [ ] Valid JSON matching `{ id, label, keywords, couplets }`

## Comparing models
| Model | Meter | Tone balance | Euphemism quality | Notes |
|---|---|---|---|---|
| | | | | |
