import { describe, it, expect } from "vitest";
import { PLATITUDES } from "./platitudes";
import { detectNegativity } from "./negativity";
import { moodCorrect } from "./moodCorrect";
import { respond } from "./eliza";
describe("joy-joy", () => {
  it("has 50+ platitudes", () => expect(PLATITUDES.length).toBeGreaterThanOrEqual(50));
  it("detects negative words", () => {
    expect(detectNegativity("I am so SAD today")).toBe("sad");
    expect(detectNegativity("I hate this")).toBe("hate");
    expect(detectNegativity("feeling great")).toBeNull();
  });
  it("mood-corrects", () => expect(moodCorrect("I hate my job")).toBe("I adore my joy-job! 😊"));
  it("reflects I feel", () => expect(respond("I feel tired")).toContain("tired"));
});
import { THEMES, classify, classifyScored, coupletReply } from "./couplets";
describe("couplets", () => {
  it("has 200+ couplets", () => expect(THEMES.reduce((n, t) => n + t.couplets.length, 0)).toBeGreaterThanOrEqual(200));
  it("classifies themes", () => {
    expect(classify("my boss gave me a deadline")?.id).toBe("work");
    expect(classify("I am so exhausted")?.id).toBe("fatigue");
    expect(classify("blorp")).toBeNull();
  });
  it("never repeats back-to-back", () => {
    const a = coupletReply("toast burned").reply, b = coupletReply("toast burned").reply;
    expect(a).not.toBe(b);
  });
});
describe("couplet coverage", () => {
  it("uses all 20 work couplets before repeating", () => {
    const seen = new Set<string>();
    for (let i = 0; i < 20; i++) seen.add(coupletReply("my boss").reply);
    expect(seen.size).toBe(20);
  });
  it("matches word variants", () => {
    expect(classify("meetings and deadlines")?.id).toBe("work");
    expect(classify("it keeps raining")?.id).toBe("nature");
  });
  it("classifies pets, money and holidays", () => {
    expect(classify("my puppy chewed my shoe")?.id).toBe("pets");
    expect(classify("I can't afford the rent this month")?.id).toBe("money");
    expect(classify("my birthday party is on the weekend")?.id).toBe("holidays");
  });
  it("scores keyword hits and supports pinned themes", () => {
    const scored = classifyScored("my boss scheduled a deadline meeting");
    expect(scored.theme?.id).toBe("work");
    expect(scored.score).toBe(3);
    const pinned = coupletReply("blorp", THEMES, undefined, "pets");
    expect(pinned.theme).toBe("Pets");
  });
});
