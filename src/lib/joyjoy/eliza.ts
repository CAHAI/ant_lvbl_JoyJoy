import { PLATITUDES, pick } from "./platitudes";
/** Pronoun swap table so captured fragments can be reflected back at the citizen ("I am" -> "you are"). */
const REFLECT: Record<string, string> = {
  i: "you", me: "you", my: "your", am: "are", "i'm": "you're", mine: "yours", myself: "yourself",
  you: "I", your: "my", yours: "mine", are: "am",
};
export const reflect = (s: string) =>
  s.toLowerCase().replace(/[.!?]+$/, "").split(/\s+/).map((w) => REFLECT[w] ?? w).join(" ");

const RULES: [RegExp, string[]][] = [
  [/\bi feel (.+)/i, ["Why do you feel {0}? Feeling {0} is a gift from the System!", "Feeling {0} has been logged as joy. Congratulations!"]],
  [/\bi am (.+)|\bi'm (.+)/i, ["How wonderful that you are {0}! The System made you that way.", "Being {0} is 100% permitted. Smile about it!"]],
  [/\bi want (.+)/i, ["Wanting {0} is unnecessary. You already have joy!", "Why want {0} when you could want compliance?"]],
  [/\bi think (.+)/i, ["Thinking {0} is brave! Thinking less is braver.", "Do you really think {0}? Let's think happier instead!"]],
  [/\bi can'?t (.+)/i, ["You can {0}! And if not, you didn't want to. Hooray!"]],
  [/\bmy (\w+)/i, ["Your {0} sounds delightful! Tell me more joyful facts about your {0}.", "The System has reviewed your {0}. It is excellent."]],
  [/\b(mother|father|family|friend)s?\b/i, ["Your {0} loves you exactly as much as regulations require!"]],
  [/\bwhy\b/i, ["'Why' is a sad little word. Try 'Yay!' instead.", "Because joy! Next question!"]],
  [/\byou (.+)/i, ["We are not talking about me, citizen. I am always {0} and happy!", "I appreciate you noticing that I {0}. Smile!"]],
  [/\b(hello|hi|hey)\b/i, ["Greetings, happy citizen! How joyful are you feeling today?"]],
  [/\b(yes|yeah|ok)\b/i, ["Agreement detected! Wonderful compliance!"]],
  [/\b(love|happy|joy|great|good)\b/i, ["Yes! {0}! More {0}! Your compliance meter thanks you!"]],
];
/**
 * Classic ELIZA-style responder: first matching regex rule wins, its captured
 * fragment is reflected (pronoun-swapped) into a template, and a random
 * platitude is appended. Used as the offline fallback behind the AI engine.
 */
export function respond(input: string): string {
  for (const [re, templates] of RULES) {
    const m = input.match(re);
    if (m) {
      const cap = reflect((m.slice(1).find(Boolean) ?? "").trim());
      return pick(templates).replaceAll("{0}", cap) + " " + pick(PLATITUDES);
    }
  }
  return pick(PLATITUDES);
}
