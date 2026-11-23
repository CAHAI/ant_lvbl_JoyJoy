import { useEffect, useState } from "react";
import { PLATITUDES } from "@/lib/joyjoy/platitudes";

const LETTER_COLORS = ["text-primary", "text-accent", "text-destructive", "text-background"];

/**
 * Renders text as individually floating, color-cycled letters (Playtime titles).
 * With `shake`, letters jitter instead — used for the Re-Education "GAME OVER?!" headline.
 */
export function FloatingTitle({ text, shake = false, className = "" }: { text: string; shake?: boolean; className?: string }) {
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {text.split("").map((ch, i) => (
        <span key={i} aria-hidden
          className={`${shake ? "anim-shake" : "anim-float-letter"} text-outline ${LETTER_COLORS[i % LETTER_COLORS.length]}`}
          style={{ animationDelay: `${i * 0.13}s`, animationDuration: shake ? undefined : `${2 + (i % 3) * 0.4}s` }}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

const ROWS = [0, 1, 2, 3].map((r) => ({
  top: `${12 + r * 22}%`,
  words: PLATITUDES.slice(r * 4, r * 4 + 4).join("  ★  "),
  duration: 60 + r * 15,
  delay: -r * 17,
}));

/**
 * Playtime backdrop: drifting clouds plus rows of giant platitude words
 * scrolling across the screen behind the UI. Purely decorative.
 */
export function WordMarquee() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden" aria-hidden>
      {[0, 1, 2].map((c) => (
        <div key={c} className="anim-cloud absolute h-16 w-48 rounded-full bg-background opacity-80"
          style={{ top: `${8 + c * 30}%`, animationDuration: `${50 + c * 20}s`, animationDelay: `${-c * 18}s` }} />
      ))}
      {ROWS.map((r, i) => (
        <div key={i} className="anim-marquee absolute whitespace-nowrap font-display text-6xl text-background opacity-30 md:text-8xl"
          style={{ top: r.top, animationDuration: `${r.duration}s`, animationDelay: `${r.delay}s`, fontFamily: "Lilita One" }}>
          {r.words}
        </div>
      ))}
    </div>
  );
}

/** Reveals text two characters at a time, like a game dialogue box. */
export function TypewriterText({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (n >= text.length) return;
    const t = setTimeout(() => setN((x) => x + 2), 18);
    return () => clearTimeout(t);
  }, [n, text]);
  return <>{text.slice(0, n)}</>;
}
