# AGY Summary & Task Outline — Presentation System & Authoring

**Origin:** Antigravity (`agy-` prefix denotes post-Lovable, standalone documentation; original Lovable write-ups remain unprefixed in `docs/`).  
**Related:** [`docs/agy-portable-architecture.md`](./agy-portable-architecture.md) · [`docs/couplet-matrix.md`](./couplet-matrix.md) · [`docs/functional-specification.md`](./functional-specification.md)

---

## 1. Summary of Current Direction

We have baselined the transferred Lovable project on `main` (`git` + GitHub `CAHAI/ant_lvbl_JoyJoy`) and verified that the app builds and runs locally. Moving forward, we are turning Joy-Joy OS into a **standalone, portable presentation platform**:

- **Static PWA first, native wrappers next:** Drop TanStack Start SSR / Nitro in favor of a pure static Vite + React SPA (`dist/`). Wrap the same UI in **Capacitor** (mobile) and **Tauri** (desktop).
- **Unified "floating miniature tablet" UX:** Desktop Tauri windows will use compact, mobile-proportioned dimensions echoing the mobile layout so one responsive design serves both, while scaling cleanly on high-DPI displays.
- **99% universal core, thin hardware layer:** UI, styling, Theme & Conversation JSON package handling, and the local reply engine stay shared; only platform bridges (storage, file I/O, haptics/notifications, windowing) vary.
- **JSON-driven content, Live AI mothballed:** The core experience runs offline on **Theme & Conversation JSON packages** + the local engine. Live AI is kept only as an optional, separately callable module.

---

## 2. Task Outline — Presentation System

### Stage A — Decouple Content & State ✅
- [x] Define a typed **`PresentationPack` JSON schema** (`src/lib/joyjoy/pack.ts`), keeping the current Joy-Joy data as `DEFAULT_JOYJOY_PACK`.
- [x] Refactor [`src/components/joyjoy/JoyJoyTerminal.tsx`](../src/components/joyjoy/JoyJoyTerminal.tsx) into `useJoyJoySession` + modular components (`ChatPanel`, `SideTools`, `Overlays`).
- [x] Introduce **`StorageAdapter`**, **`FileIOAdapter`**, and **`AIProviderAdapter`** (mothballed offline default) under `src/lib/adapters/`.
- [x] Make reply style selectable (**Couplets / ELIZA / Live AI**) and add a **Couplet Theme Filter** + keyword weight-score alerts (`classifyScored`) for testing couplet themes.

### Stage B — Standalone Static Vite + PWA ✅
- [x] Replace `@lovable.dev/vite-tanstack-config`, Nitro, `src/server.ts`, `src/start.ts`, and `reportLovableError` with a standard Vite + React + Tailwind v4 SPA build.
- [x] Replace remote Google Fonts `<link>` tags with locally bundled `@fontsource/*` fonts for offline rendering.
- [x] Add `vite-plugin-pwa` (manifest, SVG icon, Workbox service worker precaching `dist/`).
- [ ] Verify offline installability and mobile/tablet-proportioned layout in browser dev tools.

### Stage C — Native Shells (Scaffolded; native builds pending toolchain)
- [x] **Tauri (Desktop):** Scaffolded `src-tauri/` (`tauri.conf.json` configured for `460×820` floating miniature tablet window, `frontendDist: "../dist"`).
- [x] **Capacitor (Mobile):** Scaffolded `capacitor.config.ts` (`webDir: "dist"`) and `detectRuntime()` in `src/lib/adapters/runtime.ts`.
- [ ] Compile/test native binaries in a Toolbox/Distrobox container with Rust (`cargo`) and Android SDK (`adb`), and wire native `StorageAdapter` / `FileIOAdapter` implementations.

---

## 3. Integrated Authoring System (Upcoming Design Thread)

Alongside the presentation runtime, we want an **integrated authoring system** for designing word couplets, keyword themes, and full conversation/presentation JSON packages (expanding on the "Theme Studio" concept in [`docs/couplet-matrix.md`](./couplet-matrix.md) §4).

**Prompts & Decisions to Cover Next:**
1. **Where authoring lives:** Should the authoring studio be a **built-in mode/route** inside the same app (e.g., an "Author / Studio" toggle in Settings) or a **companion desktop/PWA workspace** that exports JSON packs for the player?
2. **Authoring scope:** Are we authoring **couplet themes only** (keywords, weights, two-line couplets) or **full Presentation Packs** (customizing the persona name, alerts, compliments, banned words, and skin colors too)?
3. **Authoring helpers:** Which helpers matter most in v1—live rhyme/syllable/length meter, banned-word collision check, stemmed-keyword preview + conflict warnings, or a "Sandbox Citizen" test console?
4. **Optional AI draft assist:** Should the mothballed `AIProviderAdapter` be wired specifically into the authoring studio (e.g., batch-generating candidate couplets via a local Ollama/LM Studio model or BYOK) while keeping the presentation player 100% offline?
5. **Storage & sharing:** How should authored packs be saved and moved between desktop and mobile (local `.json` files, browser IndexedDB, or syncing via a folder/cloud)?
