/** Banned vocabulary. Any hit triggers the Re-Education Sequence before a reply is generated. */
export const NEGATIVE_WORDS = [
  "sad","hate","anger","angry","bad","awful","terrible","depressed","miserable","upset",
  "cry","crying","mad","furious","horrible","worst","lonely","unhappy","pain","tired",
  "hopeless","stupid","sucks","annoyed","afraid","scared","worried","no",
];
const RE = new RegExp(`\\b(${NEGATIVE_WORDS.join("|")})\\b`, "i");
/** Returns the first banned word found in `text` (lowercased), or null if the message is compliant. */
export function detectNegativity(text: string): string | null {
  const m = text.match(RE);
  return m ? (m[1] ?? "").toLowerCase() : null;
}
