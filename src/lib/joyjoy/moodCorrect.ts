/** Approved vocabulary: every gloomy word has a mandatory cheerful replacement. */
const SWAPS: Record<string, string> = {
  sad: "joyful", hate: "adore", hated: "adored", angry: "delighted", anger: "delight", bad: "wonderful",
  awful: "awe-inspiring", terrible: "terrific", depressed: "elated", miserable: "radiant", upset: "uplifted",
  cry: "beam", crying: "beaming", mad: "glad", furious: "euphoric", horrible: "harmonious", worst: "best",
  lonely: "lovingly supervised", unhappy: "happy", pain: "pleasure", tired: "energized", hopeless: "hopeful",
  stupid: "splendid", sucks: "sparkles", annoyed: "enchanted", afraid: "assured", scared: "sacred",
  worried: "worry-free", no: "yes", not: "absolutely", never: "always", "can't": "can", "don't": "do",
  "won't": "will", problem: "opportunity", problems: "opportunities", boring: "thrilling", fail: "flourish",
  failed: "flourished", ugly: "lovely", sick: "sparkling", hard: "joyfully challenging", wrong: "right",
  difficult: "delightful", job: "joy-job", work: "joy-work", monday: "Funday", rain: "complimentary sky-water",
  boss: "beloved supervisor", alone: "monitored", death: "permanent relaxation",
};
export { SWAPS as DEFAULT_MOOD_SWAPS };

/**
 * Mood Correction tool: rewrites a sentence word-by-word through the swaps
 * table (preserving capitalization), then enforces a cheerful exclamation.
 */
export function moodCorrect(input: string, swaps: Record<string, string> = SWAPS): string {
  const out = input.replace(/[A-Za-z']+/g, (w) => {
    const r = swaps[w.toLowerCase()];
    if (!r) return w;
    return w[0] === w[0]?.toUpperCase() ? r.charAt(0).toUpperCase() + r.slice(1) : r;
  }).trim().replace(/[.?]*$/, "");
  return out ? `${out}! 😊` : "";
}
