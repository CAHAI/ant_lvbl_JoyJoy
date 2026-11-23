import { useEffect, useRef } from "react";
import type { Msg } from "@/hooks/useJoyJoySession";
import { TypewriterText } from "./Playtime";

export function ChatPanel({
  play,
  counselorName,
  msgs,
  typing,
  input,
  setInput,
  onPoke,
  onSubmit,
  onAuto,
}: {
  play: boolean;
  counselorName: string;
  msgs: Msg[];
  typing: boolean;
  input: string;
  setInput: (v: string) => void;
  onPoke: () => void;
  onSubmit: (raw: string) => Promise<void>;
  onAuto: () => void;
}) {
  const chatRef = useRef<HTMLDivElement>(null);
  const stick = useRef(true);

  // Auto-scroll: follow new bubbles only while the citizen is near the bottom.
  useEffect(() => {
    const el = chatRef.current;
    if (!el) return;
    const toBottom = () => {
      if (stick.current) el.scrollTop = el.scrollHeight;
    };
    const onScroll = () => {
      stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    };
    el.addEventListener("scroll", onScroll);
    const mo = new MutationObserver(toBottom);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      mo.disconnect();
    };
  }, []);

  useEffect(() => {
    stick.current = true;
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, typing]);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    void onSubmit(input);
  };

  return (
    <section className={`glass flex flex-col overflow-hidden ${play ? "h-[85vh] min-h-[600px] lg:sticky lg:top-4" : "h-[70vh] min-h-[480px]"}`}>
      <div className="flex items-center justify-center gap-2 border-b border-border py-3 font-display text-[11px] tracking-[0.3em]">
        <span className="anim-pulse-dot h-2 w-2 rounded-full bg-primary" /> {counselorName} · ONLINE
      </div>
      <div ref={chatRef} className="flex-1 space-y-3 overflow-y-auto p-5">
        {msgs.map((m) => (
          <div key={m.id} className={`${m.from === "you" ? "bubble-you" : "anim-msg"} flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.from === "you"
                  ? play
                    ? "border-4 border-border bg-accent text-accent-foreground font-semibold"
                    : "bg-foreground text-background"
                  : play
                    ? "border-4 border-border bg-card text-base shadow-[var(--glow)]"
                    : "border border-border bg-background/70"
              }`}
            >
              {m.from === "joy" && <div className="mb-1 font-display text-[9px] tracking-[0.3em] text-primary-deep">COUNSELOR</div>}
              {play && m.from === "joy" ? <TypewriterText text={m.text} /> : m.text}
            </div>
          </div>
        ))}
        {typing && <div className="text-xs tracking-widest text-muted-foreground">CONSULTING HYGIENE MAINFRAME…</div>}
      </div>
      <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            onPoke();
          }}
          placeholder="Describe your situation, citizen…"
          className="flex-1 rounded-full border border-input bg-background/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="button"
          onClick={onAuto}
          disabled={typing}
          title="Auto-generate a situation"
          className="rounded-full border border-border px-3 font-display text-[10px] tracking-[0.2em] transition hover:bg-accent disabled:opacity-50"
        >
          {play ? "🎲 AUTO" : "AUTO"}
        </button>
        <button className="btn-joy" disabled={typing}>
          Transmit
        </button>
      </form>
    </section>
  );
}
