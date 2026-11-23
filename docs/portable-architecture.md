# Portable Architecture & Modularization Plan — Joy-Joy OS

**Status:** Architectural direction confirmed (no code changes made).  
**Goal:** Evolve Joy-Joy OS from a Lovable-hosted TanStack Start SSR app into a **static Vite + React SPA / PWA first**, with a clean path to **Capacitor** (mobile) and **Tauri** (desktop) sharing 99% of the codebase.

## Confirmed Design Decisions
- **Drop TanStack Start SSR / Nitro:** Move to a pure static Vite + React SPA (`dist/`). No server runtime required.
- **Universal core, thin hardware layer:** UI, styling, Theme/Conversation JSON package I/O, and the couplet engine are shared across all targets. Only platform/hardware bridges (storage, file pickers, windowing, haptics/notifications) vary between mobile and desktop.
- **Desktop "floating miniature tablet" form factor:** Tauri desktop windows use compact, mobile-proportioned dimensions echoing the mobile app layout—keeping one common layout system while scaling cleanly on high-DPI/high-resolution monitors.
- **Mothball Live AI as an optional module:** Primary runtime is 100% driven by **Theme & Conversation JSON packages** + the local engine; Live AI lives behind an optional, separately callable adapter for future/authoring use.

---

## 1. Files & Structures That Currently Limit Portability

| Area | Current File(s) | Why It Limits PWA / Capacitor / Tauri |
|---|---|---|
| **SSR & Worker build** | `vite.config.ts` (`@lovable.dev/vite-tanstack-config`), `src/server.ts`, `src/start.ts`, `src/routes/__root.tsx` (`RootShell` / `Scripts`) | Builds a Nitro/Cloudflare Worker SSR app. PWA, Capacitor, and Tauri all expect a **static SPA bundle** (`index.html` + static assets) with no Node/Worker runtime required to boot. |
| **Server function (`createServerFn`)** | `src/lib/joyjoy/counselor.functions.ts`, `src/lib/joyjoy/counselor.server.ts`, `useServerFn` in `JoyJoyTerminal.tsx` | `createServerFn` requires a TanStack Start server endpoint and `process.env["LOVABLE_API_KEY"]`. Static PWAs and mobile/desktop shells cannot run server-only handlers inside the client bundle. |
| **Lovable-coupled tooling** | `package.json` (`@lovable.dev/vite-tanstack-config`), `src/lib/lovable-error-reporting.ts`, `src/lib/error-capture.ts`, `src/lib/error-page.ts`, `@Lovable` meta in `src/routes/__root.tsx` | Ties build/error reporting to Lovable infrastructure instead of standard Vite/React error boundaries. |
| **Monolithic UI + hardcoded copy** | `src/components/joyjoy/JoyJoyTerminal.tsx` (373 lines) | Mixes session state, timers, `localStorage` calls, hardcoded copy (`SITUATIONS`, `NUDGES`, alerts, welcome text), and inline `terminal` vs. `playtime` branches. Blocks multi-theme / presentation-pack reuse. |
| **Remote Google Fonts** | `src/routes/__root.tsx` (`fonts.googleapis.com` `<link>`) | Breaks offline-first PWA / Capacitor / Tauri rendering unless fonts are bundled locally or precached by a service worker. |
| **Direct `localStorage` & in-memory bags** | `JoyJoyTerminal.tsx` (`joyjoy-mode`, `joyjoy-engine`, `joyjoy-compliance`), `couplets.ts` (in-memory shuffle bags) | `localStorage` works in PWAs/WebViews but can be evicted on iOS/mobile and isn't ideal for large Theme Packs or native secure storage (e.g., API keys). |
| **Bun `.bin` symlink assumptions** | `package.json` scripts (`vite dev`, `vitest run`) | On CIFS/network shares with Bun-only hosts (no `node` in `PATH`), `.bin/` symlinks fail to resolve relative imports unless invoked via `node` or direct entrypoints. |

---

## 2. Target Modular Architecture (PWA-First → Capacitor / Tauri)

Separate the codebase into **four clear layers** so the core app is 100% static-capable and runtime-agnostic:

```text
packages / src layers:
├── core/ (pure TypeScript, zero DOM/React/platform imports)
│   ├── engine/       # couplets.ts, eliza.ts, negativity.ts, moodCorrect.ts
│   ├── packs/        # PresentationPack schema + built-in Joy-Joy default pack
│   └── types.ts      # Msg, Alert, Mode, Engine, PackConfig
│
├── adapters/ (swappable platform bridges)
│   ├── storage.ts    # StorageAdapter (localStorage/IndexedDB for PWA; Preferences/SecureStorage for Capacitor; fs/store for Tauri)
│   ├── ai.ts         # AIProviderAdapter (offline-only, local OpenAI-compatible URL, external proxy, or BYOK)
│   └── notify.ts     # Alerts / haptics / sound / badge (web toast vs. Capacitor Haptics vs. Tauri notifications)
│
├── ui/ (pure React + Tailwind + shadcn/ui)
│   ├── shell/        # AppShell, SettingsModal, ReEducationOverlay, CitizenStatus, SystemLog
│   ├── chat/         # ChatStream, ChatInput, AutoButton, TypewriterText
│   └── skins/        # TerminalSkin, PlaytimeSkin (driven by skin config, not scattered ternaries)
│
└── app/ (thin entrypoints per target)
    ├── web-pwa/      # Standard Vite + React + vite-plugin-pwa (manifest, service worker, local fonts)
    ├── capacitor/    # Wraps web-pwa dist/ for iOS & Android
    └── tauri/        # Wraps web-pwa dist/ for Linux / Windows / macOS (and mobile)
```

---

## 3. Recommended Migration Sequence

### Phase 1 — Decouple & Modularize (No Shell Changes Yet)
1. **Extract a `PresentationPack` config** (`src/lib/joyjoy/pack.ts`): move `SITUATIONS`, `NUDGES`, welcome message, `ALERTS`, `COMPLIMENTS`, `negativity` word list, `moodCorrect` dictionary, and `THEMES` into one typed JSON-serializable object.
2. **Split `JoyJoyTerminal.tsx`**: extract state/session hooks (`useJoyJoySession`) and subcomponents (`ChatPanel`, `SideToolsPanel`, `SettingsModal`, `ReEducationModal`) so UI components only render props.
3. **Introduce `StorageAdapter` & `AIProviderAdapter`**:
   - Default `StorageAdapter` wraps `localStorage` (identical behavior today, easy to swap for IndexedDB/Capacitor Preferences later).
   - `AIProviderAdapter` replaces the tight `useServerFn(askCounselor)` coupling with a clean interface:
     - `local` (Couplet Matrix, default)
     - `eliza` (offline fallback)
     - `openai-compatible` (configurable `baseURL` + optional key for local Ollama/LM Studio, an external API proxy, or BYOK)

### Phase 2 — Standalone Static Vite + PWA
1. **Replace `@lovable.dev/vite-tanstack-config`** with standard `@vitejs/plugin-react` + `@tailwindcss/vite` + `@tanstack/router-plugin` (client-side SPA mode, no SSR/Nitro required).
2. **Remove Lovable-only scaffolding**: `lovable-error-reporting.ts`, `error-capture.ts`, `error-page.ts`, `src/server.ts`, `src/start.ts`, and `counselor.functions.ts` (unless keeping an optional external backend).
3. **Bundle fonts locally** (e.g., `@fontsource/orbitron`, `@fontsource/lilita-one`, `@fontsource/fredoka`, `@fontsource/jetbrains-mono`) so the app looks identical offline.
4. **Add `vite-plugin-pwa`**: generate `manifest.webmanifest`, app icons, and a service worker precaching the app shell, fonts, and default Theme Pack.

### Phase 3 — Native Wrappers (Capacitor / Tauri)
- **Capacitor (Mobile):** Point `capacitor.config.ts` `webDir` at `dist/`. Swap `StorageAdapter` to `@capacitor/preferences`, use native file pickers/share sheets for Theme & Conversation JSON packages, and optionally wire `@capacitor/haptics` to Re-Education / alert events.
- **Tauri (Desktop — "Floating Miniature Tablet"):** Point `tauri.conf.json` `frontendDist` at `../dist` with a compact, mobile-proportioned default window (e.g., tablet/phone aspect ratio, optional always-on-top/floating behavior, crisp high-DPI scaling) so desktop mirrors the mobile layout. Wire native file dialogs for local Theme & Conversation JSON package import/export and OS notifications.

---

## 4. What Stays Unchanged
- All pure logic in `src/lib/joyjoy/` (`couplets.ts`, `eliza.ts`, `negativity.ts`, `moodCorrect.ts`, `platitudes.ts`).
- The Vitest logic suite in `src/lib/joyjoy/joyjoy.test.ts`.
- Both visual skins (Terminal and Playtime) and the CSS design tokens in `src/styles.css`.
