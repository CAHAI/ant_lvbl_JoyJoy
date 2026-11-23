# Joy-Joy OS — "Playtime Mode" alternate interface

Add a second look you can switch to from Settings: a bouncy, cartoon, kids-game version of the terminal (Super Mario Maker-style), while the current terminal stays as the default.

## Settings
- Keep "Compliance Level" (locked at 100%).
- Add "Interface Mode": **Terminal** / **Playtime**. Choice is remembered between visits.
- Switching plays a quick wipe transition and an alert ("FUN LEVELS: MANDATORY").

## Playtime Mode look
- Sky-blue background with drifting puffy clouds, bright candy colors (mint, sunny yellow, cherry red, sky blue), chunky dark outlines and hard drop shadows, like game blocks.
- Big, fat rounded display font (e.g. "Lilita One" / "Fredoka") for titles and buttons.
- Title "JOY-JOY!" with each letter floating and wobbling on its own rhythm.
- A slow scrolling marquee of giant floating platitude words drifting across the background behind the panels.
- Buttons look like game blocks: squish on press, little bounce on hover.

## Chat as a game
- Counselor messages appear as speech bubbles that pop in with a springy bounce, letters typing in one at a time.
- Your messages slide in from the right like coins.
- Compliance meter becomes a chunky power bar with stars that spin when it goes up.
- Alerts appear as big bouncing banners ("SMILE DETECTED!" with sparkle).
- Re-education Sequence becomes a "GAME OVER?!" style screen with shaking letters and the giant "I LOVE JOY-JOY" button to "Continue".

## Unchanged
- All behavior (Counselor replies, negative-word detection, compliment generator, mood correction, meter) works identically in both modes.

## Technical details
- Add a `mode` state ("terminal" | "playtime") persisted in localStorage, applied as a `data-mode` attribute on the app root.
- Playtime tokens and utilities in `src/styles.css` scoped under `[data-mode="playtime"]` (colors, outlines, block shadows, keyframes: float, wobble, marquee, pop, squish, shake). Load Lilita One/Fredoka via `<link>` in `__root.tsx`.
- New components in `src/components/joyjoy/`: `FloatingTitle` (per-letter animated spans), `WordMarquee` (scrolling background words, respects prefers-reduced-motion), `TypewriterText` for counselor bubbles.
- Existing components get mode-aware class variants rather than duplicated layouts.
