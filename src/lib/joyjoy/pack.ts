import { FALLBACK_COUPLETS, THEMES, type Theme } from "./couplets";
import { DEFAULT_MOOD_SWAPS } from "./moodCorrect";
import { NEGATIVE_WORDS } from "./negativity";
import { ALERTS, COMPLIMENTS, PLATITUDES } from "./platitudes";

/**
 * Portable Presentation & Conversation Pack schema.
 * Bundles all copy, theme couplets, screening words, and mood-swap rules
 * so the app can load custom packs without touching UI or engine code.
 */
export interface PresentationPack {
  id: string;
  version: number;
  name: string;
  subtitle: string;
  playtimeTitle: string;
  counselorName: string;
  footer: string;
  welcomeMessage: string;
  reeduSuccessMessage: string;
  situations: string[];
  nudges: string[];
  alerts: string[];
  compliments: string[];
  platitudes: string[];
  bannedWords: string[];
  moodSwaps: Record<string, string>;
  themes: Theme[];
  fallbackCouplets: string[];
}

export const DEFAULT_JOYJOY_PACK: PresentationPack = {
  id: "joy-joy-os",
  version: 1,
  name: "JOY·JOY OS",
  subtitle: "Department of Mental Hygiene",
  playtimeTitle: "JOY-JOY!",
  counselorName: "JOY-JOY COUNSELOR",
  footer: "BE WELL · YOU ARE BEING WELL-MONITORED",
  welcomeMessage: "Welcome, citizen! I am your Joy-Joy Counselor. How joyful are you feeling today?",
  reeduSuccessMessage: "Wonderful! That unpleasant word has been deleted from your memory. Let's continue joyfully!",
  situations: [
    "My toast burned and my synchronizer beeped at me.",
    "My neighbor didn't smile while recycling.",
    "I felt mildly melancholic looking at the synthetic clouds.",
    "My coworker took the last nutrient bar.",
    "I forgot the words to the Joy-Joy anthem in public.",
    "My plant has not been thriving this week.",
    "I stepped on a sea shell and it was confusing.",
    "The hover-bus was 4 seconds late.",
  ],
  nudges: [
    "LACK OF INPUT DETECTED! Verifying smile status… How may Joy-Joy brighten your day?",
    "Hello? Silence is wonderful, but sharing is MANDATORY-ly wonderful! Tell me something!",
    "Your keyboard misses you, citizen! Describe any situation and I'll make it sparkle!",
  ],
  alerts: ALERTS,
  compliments: COMPLIMENTS,
  platitudes: PLATITUDES,
  bannedWords: NEGATIVE_WORDS,
  moodSwaps: DEFAULT_MOOD_SWAPS,
  themes: THEMES,
  fallbackCouplets: FALLBACK_COUPLETS,
};

/** Validates/normalizes an imported JSON pack, falling back to defaults for omitted fields. */
export function parsePresentationPack(raw: unknown): PresentationPack | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Partial<PresentationPack>;
  if (typeof r.id !== "string" || typeof r.name !== "string" || !Array.isArray(r.themes)) return null;
  return {
    ...DEFAULT_JOYJOY_PACK,
    ...r,
    version: typeof r.version === "number" ? r.version : 1,
    themes: r.themes.length ? r.themes : DEFAULT_JOYJOY_PACK.themes,
    fallbackCouplets: Array.isArray(r.fallbackCouplets) && r.fallbackCouplets.length ? r.fallbackCouplets : DEFAULT_JOYJOY_PACK.fallbackCouplets,
  };
}
