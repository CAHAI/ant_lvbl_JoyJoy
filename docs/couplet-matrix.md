# Couplet Matrix — Functionality & Extensibility

The Couplet Matrix is Joy-Joy OS's local, zero-credit Counselor engine. It maps a citizen's message to a theme and returns a rhyming couplet instantly, offline, with no AI Gateway call.

Source: `src/lib/joyjoy/couplets.ts` · Tests: `src/lib/joyjoy/joyjoy.test.ts`

---

## 1. Current functionality

### Data model
```ts
type Theme = { id: string; label: string; keywords: string[]; couplets: string[] };
```
- `THEMES` — 13 themes × 20 couplets = 260: Fatigue, Work, Relationships, Existential, Health, Food, Technology, Travel, Nature & Weather, Wants & Dreams, Pets, Money, Holidays.
- `FALLBACK_COUPLETS` — 10 general couplets for off-topic messages (270 total).
- Each couplet is one string; ` / ` separates the two lines and becomes a line break on display.

### Pipeline
```text
message -> gloom filter (violation screen) -> classify() -> draw() -> "TOPIC: X" alert + typed bubble
```
1. **Tokenize & stem** — lowercase words, light suffix stemming (`'s`, `ies`->`y`, `ing`, `ed`, `es`, `s`) so "meetings", "deadlines", "raining" match.
2. **Score** — each theme scores one point per matching word (exact stem, or prefix match for stems longer than 3 letters). Highest score wins; ties keep the earlier theme.
3. **Draw (shuffle bag)** — each theme has its own shuffled bag; every couplet is used once before any repeats, and a new round never starts with the couplet just shown.
4. **Fallback** — no keyword hit -> general bag.

### Settings
"Counselor Engine": **Local Matrix** (default, free) or **AI Gateway** (live model, uses credits). The idle "LACK OF INPUT DETECTED" nudge and auto-reply follow the selected engine.

### Guarantees covered by tests
- Couplet count and theme count.
- Keyword → theme matching (including word forms).
- All 20 couplets in a theme appear before a repeat; no back-to-back duplicates.

---

## 2. Known limits
- Keyword scoring is bag-of-words: no negation ("not tired"), no phrases ("day off"), no weighting.
- Bag state lives in memory; a page reload resets rotation.
- Stemmer is naive ("bus" -> "bu"); keep keywords short and distinctive.
- Adding content means editing code and redeploying.

---

## 3. Extending it today (developer path)
1. Add an object to `THEMES` with a unique `id`, a `label`, 15–40 `keywords` and ideally 20 `couplets` using ` / `.
2. Avoid keywords already owned by another theme (they cause ties).
3. Add a test: one sample sentence → expected theme; update the total count assertion.
4. Run `bunx vitest run src/lib/joyjoy`.

### Low-cost engine upgrades
| Idea | Benefit |
|---|---|
| Keyword weights (`{ word, weight }`) | Strong signals ("rent") beat weak ones ("day") |
| Phrase keywords ("day off", "group chat") | Better precision |
| Negation window ("not", "never", "no longer") | Flip or skip matches |
| Sub-themes (Work → Meetings / Boss / Commute) | Sharper on-topic replies |
| Templated slots (`{noun}` filled from the message) | Replies feel personal with zero AI |
| Persist bags in localStorage | No repeats across visits |
| Tone tiers (mild / stern / Re-Education) by compliance level | Escalating satire |
| Multi-theme blends (top 2 scores → line 1 from A, line 2 from B) | Variety without new content |

---

## 4. Publisher-facing interface ideas

Goal: let non-developers ("Ministry Publishers") create, test and ship new themes without touching code.

### 4.1 Storage move
Move themes from code into Lovable Cloud tables, keeping the code file as the offline fallback:
```text
themes(id, label, status: draft|review|live, color, icon, version)
theme_keywords(theme_id, phrase, weight)
couplets(id, theme_id, line1, line2, tone, status, author_id)
```
The app fetches live themes once, caches them locally, and keeps the zero-credit runtime.

### 4.2 Theme Studio (main screen)
- Grid of theme cards in Playtime style: big label, couplet count badge (e.g. 14/20), coverage meter, status chip.
- "New Theme" button → wizard: name → color/icon → keywords → couplets → test → publish.

### 4.3 Keyword Builder
- Chip input; each chip shows its stemmed form so publishers see what will actually match.
- Conflict warnings: "'party' is already owned by Holidays."
- Weight slider per keyword.
- "Suggest keywords" button (optional one-time AI call) that proposes related words.

### 4.4 Couplet Editor
- Two-line editor with live preview bubble in both Terminal and Playtime looks.
- Rhyme helper: highlights the last word of each line and flags lines that don't rhyme.
- Syllable/length meter so lines fit the chat bubble.
- Tone tag (cheerful / stern / unsettling) and a "banned word" check against the gloom list.
- **AI Draft Assist:** generate 20 candidate couplets for a theme in one batch, publisher keeps/edits/rejects. Credits are spent once at authoring time, never at runtime.

### 4.5 Test Console ("Sandbox Citizen")
- Type any sentence → see token stems, per-theme scores, winning theme, and the couplet drawn.
- Bulk test: paste 50 sample messages, get a confusion table (expected vs. matched).
- "Unmatched inbox": anonymized messages that fell to General, grouped by frequent words, with one click to add a word to a theme.

### 4.6 Workflow & governance
- Draft → Review → Live, with version history and one-click rollback.
- Roles: Publisher (create drafts), Censor (approve), Administrator (manage roles).
- Scheduled themes (Holidays live only in December, "Mandatory Fun Day" events).
- Import/export themes as JSON packs to share between projects.

### 4.7 Analytics
- Most-hit themes, fallback rate, couplets never drawn, average compliance gain per theme.
- Target: fallback rate under 20%.

### 4.8 Theme Pack format (shareable)
```json
{
  "id": "pets",
  "label": "Pets",
  "version": 1,
  "keywords": [{ "phrase": "dog", "weight": 2 }, { "phrase": "vet", "weight": 1 }],
  "couplets": [{ "line1": "Your doggy's bark is a civic cheer", "line2": "a woof of joy for all to hear!", "tone": "cheerful" }]
}
```

---

## 5. Suggested roadmap
1. Engine upgrades: weights, phrases, persisted bags.
2. Theme Pack JSON import/export (no backend needed).
3. Cloud tables + read-only fetch with local cache.
4. Theme Studio with Keyword Builder, Couplet Editor and Test Console.
5. Roles, review workflow, scheduling, analytics.
