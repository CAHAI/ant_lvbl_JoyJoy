import { useCallback, useEffect, useRef, useState } from "react";
import { respond } from "@/lib/joyjoy/eliza";
import { detectNegativity } from "@/lib/joyjoy/negativity";
import { moodCorrect } from "@/lib/joyjoy/moodCorrect";
import { ALERTS, COMPLIMENTS, pick } from "@/lib/joyjoy/platitudes";
import { useServerFn } from "@tanstack/react-start";
import { askCounselor } from "@/lib/joyjoy/counselor.functions";
import { coupletReply } from "@/lib/joyjoy/couplets";
import { FloatingTitle, TypewriterText, WordMarquee } from "./Playtime";

/** Interface skin: the stark government terminal or the cartoon Playtime look. */
type Mode = "terminal" | "playtime";

/** A single chat bubble; `from` is the citizen ("you") or the Counselor ("joy"). */
type Msg = { id: number; from: "you" | "joy"; text: string };
/** A transient system alert toast, also mirrored into the System Log panel. */
type Alert = { id: number; text: string };
let uid = 0;
const SITUATIONS = [
  "My toast burned and my synchronizer beeped at me.",
  "My neighbor didn't smile while recycling.",
  "I felt mildly melancholic looking at the synthetic clouds.",
  "My coworker took the last nutrient bar.",
  "I forgot the words to the Joy-Joy anthem in public.",
  "My plant has not been thriving this week.",
  "I stepped on a sea shell and it was confusing.",
  "The hover-bus was 4 seconds late.",
];
const NUDGES = [
  "LACK OF INPUT DETECTED! Verifying smile status… How may Joy-Joy brighten your day?",
  "Hello? Silence is wonderful, but sharing is MANDATORY-ly wonderful! Tell me something!",
  "Your keyboard misses you, citizen! Describe any situation and I'll make it sparkle!",
];

/**
 * Root application component: the whole Joy-Joy OS experience.
 *
 * Owns all session state — chat history, compliance meter, alerts, system log,
 * re-education overlay, settings — and renders both interface modes from it.
 * Persists mode, engine choice and compliance in localStorage.
 */
export function JoyJoyTerminal() {
  const [msgs, setMsgs] = useState<Msg[]>([
    { id: uid++, from: "joy", text: "Welcome, citizen! I am your Joy-Joy Counselor. How joyful are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [compliance, setCompliance] = useState(12);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const [reedu, setReedu] = useState<string | null>(null);
  const [compliment, setCompliment] = useState("Press the button to receive validation.");
  const [moodIn, setMoodIn] = useState("");
  const [moodOut, setMoodOut] = useState("");
  const [settings, setSettings] = useState(false);
  const [clock, setClock] = useState("");
  const [infractions, setInfractions] = useState(0);
  const chatRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Mode>("terminal");
  const [wipe, setWipe] = useState(false);
  const play = mode === "playtime";
  const [engine, setEngine] = useState<"local" | "ai">("local");
  useEffect(() => { if (localStorage.getItem("joyjoy-engine") === "ai") setEngine("ai"); }, []);
  const chooseEngine = (e: "local" | "ai") => { setEngine(e); localStorage.setItem("joyjoy-engine", e); };
  useEffect(() => { if (localStorage.getItem("joyjoy-mode") === "playtime") setMode("playtime"); }, []);
  const switchMode = (m: Mode) => {
    if (m === mode || wipe) return;
    setWipe(true);
    setTimeout(() => { setMode(m); localStorage.setItem("joyjoy-mode", m); }, 400);
    setTimeout(() => { setWipe(false); alert(m === "playtime" ? "FUN LEVELS: MANDATORY" : "TERMINAL: RESTORED"); }, 800);
  };

  useEffect(() => {
    const v = Number(localStorage.getItem("joyjoy-compliance"));
    if (v) setCompliance(v);
  }, []);
  useEffect(() => { localStorage.setItem("joyjoy-compliance", String(compliance)); }, [compliance]);
  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour12: false }) + " · 2532");
    tick(); const t = setInterval(tick, 1000); return () => clearInterval(t);
  }, []);
  // Auto-scroll: follow new bubbles only while the citizen is near the bottom,
  // so scrolling up to re-read history doesn't get yanked back down.
  const stick = useRef(true);
  useEffect(() => {
    const el = chatRef.current; if (!el) return;
    const toBottom = () => { if (stick.current) el.scrollTop = el.scrollHeight; };
    const onScroll = () => { stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 80; };
    el.addEventListener("scroll", onScroll);
    const mo = new MutationObserver(toBottom);
    mo.observe(el, { childList: true, subtree: true, characterData: true });
    return () => { el.removeEventListener("scroll", onScroll); mo.disconnect(); };
  }, []);
  useEffect(() => { stick.current = true; chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }); }, [msgs, typing]);

  const alert = useCallback((text = pick(ALERTS)) => {
    const id = uid++;
    setAlerts((a) => [...a.slice(-2), { id, text }]);
    setLog((l) => [`${new Date().toLocaleTimeString("en-US", { hour12: false })} ${text}`, ...l].slice(0, 6));
    setTimeout(() => setAlerts((a) => a.filter((x) => x.id !== id)), 2800);
  }, []);
  useEffect(() => {
    const t = setInterval(() => alert(), 14000);
    const first = setTimeout(() => alert("SMILE DETECTED"), 1500);
    return () => { clearInterval(t); clearTimeout(first); };
  }, [alert]);

  const comply = (n: number) => setCompliance((c) => Math.max(0, Math.min(100, c + n)));

  const ask = useServerFn(askCounselor);
  const [lastActive, setLastActive] = useState(() => Date.now());
  const poke = () => setLastActive(Date.now());

  /**
   * Central message pipeline: negativity is screened before anything else
   * (a banned word triggers Re-Education and never reaches a reply engine),
   * then the selected engine answers — local couplet matrix or live AI Gateway
   * with the ELIZA responder as the final fallback.
   */
  const submit = async (raw: string) => {
    const text = raw.trim(); if (!text || typing) return;
    setInput(""); poke();
    const history = msgs.map(({ from, text }) => ({ from, text }));
    setMsgs((m) => [...m, { id: uid++, from: "you", text }]);
    const bad = detectNegativity(text);
    if (bad) { comply(-8); setInfractions((i) => i + 1); setReedu(bad); return; }
    comply(4); setTyping(true);
    let reply: string;
    if (engine === "local") {
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
      const c = coupletReply(text); reply = c.reply; alert(`TOPIC: ${c.theme.toUpperCase()}`);
    } else try {
      const r = await ask({ data: { text, history } });
      if (r.error) alert("MAINFRAME: LOCAL JOY ENGAGED");
      reply = r.reply ?? respond(text);
    } catch { reply = respond(text); }
    setMsgs((m) => [...m, { id: uid++, from: "joy", text: reply }]);
    setTyping(false); poke();
    if (Math.random() < 0.4) alert();
  };
  const send = (e: React.FormEvent) => { e.preventDefault(); void submit(input); };
  const autoGen = () => { void submit(pick(SITUATIONS)); };

  // Idle watchdog: after 30s without interaction the Counselor nudges the
  // citizen, unless a reply is in flight or a modal (re-education/settings) is open.
  useEffect(() => {
    const t = setInterval(() => {
      if (typing || reedu || settings || Date.now() - lastActive < 30000) return;
      setMsgs((m) => [...m, { id: uid++, from: "joy", text: pick(NUDGES) }]);
      alert("IDLE CITIZEN DETECTED"); setLastActive(Date.now());
    }, 3000);
    return () => clearInterval(t);
  }, [typing, reedu, settings, lastActive, alert]);

  const finishReedu = () => {
    setReedu(null); comply(10); alert("RE-EDUCATION: SUCCESSFUL");
    setMsgs((m) => [...m, { id: uid++, from: "joy", text: "Wonderful! That unpleasant word has been deleted from your memory. Let's continue joyfully!" }]);
  };

  const optimism = Math.min(100, 70 + Math.round(compliance * 0.3));

  return (
    <div data-mode={mode} className="scanlines min-h-screen px-4 py-6 md:px-8">
      {play && <WordMarquee />}
      {wipe && <div className="anim-wipe fixed inset-0 z-[70] bg-accent" />}
      {/* Alerts */}
      <div className="pointer-events-none fixed left-1/2 top-4 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
        {alerts.map((a) => (
          <div key={a.id} className="anim-alert glass glow flex items-center gap-2 px-5 py-2 font-display text-xs tracking-[0.25em] text-primary-deep">
            <span className="anim-pulse-dot h-2 w-2 rounded-full bg-primary" /> {play ? `★ ${a.text}! ★` : a.text}
          </div>
        ))}
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <header className="glass grid grid-cols-3 items-center px-5 py-4">
          <div className="font-mono text-xs text-muted-foreground">{clock}</div>
          <div className="text-center">
            {play ? <h1 className="font-display text-4xl md:text-6xl"><FloatingTitle text="JOY-JOY!" /></h1> : <h1 className="font-display text-2xl font-black tracking-[0.3em] text-primary-deep md:text-3xl">JOY·JOY OS</h1>}
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">Department of Mental Hygiene</p>
          </div>
          <div className="flex justify-end">
            <button onClick={() => setSettings(true)} className="rounded-full border border-border px-4 py-2 font-display text-[10px] tracking-[0.2em] transition hover:bg-accent">SETTINGS</button>
          </div>
        </header>

        {/* Compliance */}
        <section className="glass mt-4 px-5 py-4">
          <div className="mb-2 flex justify-between font-display text-[10px] tracking-[0.3em]">
            <span>COMPLIANCE METER</span><span className="text-primary-deep">{compliance}%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex-1 overflow-hidden rounded-full bg-muted ${play ? "h-7 border-4 border-border" : "h-3"}`}>
              <div className={`h-full rounded-full bg-primary transition-all duration-700 ease-out ${play ? "" : "glow"}`} style={{ width: `${compliance}%` }} />
            </div>
            {play && <span key={compliance} className="anim-spin-star inline-block text-3xl text-accent text-outline">★</span>}
          </div>
        </section>

        <main className={`mt-4 grid gap-4 ${play ? "lg:grid-cols-[minmax(300px,1fr)_2.6fr]" : "lg:grid-cols-[1fr_1.6fr_1fr]"}`}>
          {play ? (
            <aside className="flex flex-col gap-4">
            <Panel title="Citizen Status">
              <div className="grid grid-cols-2 gap-3">
                <Tile label="Optimism" value={`${optimism}%`} tone="text-primary" />
                <Tile label="Smile Score" value={(compliance / 10 + 0.1).toFixed(1)} tone="text-accent" />
                <Tile label="Compliance" value={`${compliance}`} tone="text-primary-deep" />
                <Tile label="Violations" value={String(infractions)} tone="text-destructive" />
              </div>
              <div className="anim-float-letter mt-4 rounded-full border-4 border-border bg-accent py-2 text-center font-display text-sm tracking-widest text-accent-foreground">
                ★ {compliance >= 80 ? "EXEMPLARY" : compliance >= 40 ? "ACCEPTABLE" : "UNDER REVIEW"} ★
              </div>
            </Panel>
            <Panel title="Compliment Generator">
              <p className="min-h-16 text-sm leading-relaxed">{compliment}</p>
              <button className="btn-joy mt-4 w-full" onClick={() => { setCompliment(pick(COMPLIMENTS)); comply(2); }}>Generate Praise</button>
            </Panel>
            <Panel title="Mood Correction">
              <textarea value={moodIn} onChange={(e) => setMoodIn(e.target.value)} rows={3}
                placeholder="Type an unapproved sentence…"
                className="w-full resize-none rounded-xl border border-input bg-background/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <button className="btn-joy mt-3 w-full" onClick={() => { if (!moodIn.trim()) return; setMoodOut(moodCorrect(moodIn)); comply(3); alert("MOOD: CORRECTED"); }}>Correct Mood</button>
              {moodOut && <p className="anim-msg mt-3 rounded-xl bg-accent p-3 text-sm text-accent-foreground">{moodOut}</p>}
            </Panel>
            <Panel title="System Log">
              <ul className="space-y-2 text-[11px] text-muted-foreground">
                {log.length ? log.map((l, i) => <li key={i} className="anim-msg">{l}</li>) : <li>Awaiting joy…</li>}
              </ul>
            </Panel>
            </aside>
          ) : (<>
          {/* Tools */}
          <aside className="flex flex-col gap-4">
            <Panel title="Compliment Generator">
              <p className="min-h-16 text-sm leading-relaxed">{compliment}</p>
              <button className="btn-joy mt-4 w-full" onClick={() => { setCompliment(pick(COMPLIMENTS)); comply(2); }}>Generate Praise</button>
            </Panel>
            <Panel title="Mood Correction">
              <textarea value={moodIn} onChange={(e) => setMoodIn(e.target.value)} rows={3}
                placeholder="Type an unapproved sentence…"
                className="w-full resize-none rounded-xl border border-input bg-background/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <button className="btn-joy mt-3 w-full" onClick={() => { if (!moodIn.trim()) return; setMoodOut(moodCorrect(moodIn)); comply(3); alert("MOOD: CORRECTED"); }}>Correct Mood</button>
              {moodOut && <p className="anim-msg mt-3 rounded-xl bg-accent p-3 text-sm text-accent-foreground">{moodOut}</p>}
            </Panel>
          </aside>

          </>)}
          {/* Chat */}
          <section className={`glass flex flex-col overflow-hidden ${play ? "h-[85vh] min-h-[600px] lg:sticky lg:top-4" : "h-[70vh] min-h-[480px]"}`}>
            <div className="flex items-center justify-center gap-2 border-b border-border py-3 font-display text-[11px] tracking-[0.3em]">
              <span className="anim-pulse-dot h-2 w-2 rounded-full bg-primary" /> JOY-JOY COUNSELOR · ONLINE
            </div>
            <div ref={chatRef} className="flex-1 space-y-3 overflow-y-auto p-5">
              {msgs.map((m) => (
                <div key={m.id} className={`${m.from === "you" ? "bubble-you" : "anim-msg"} flex ${m.from === "you" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[80%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed ${m.from === "you" ? (play ? "border-4 border-border bg-accent text-accent-foreground font-semibold" : "bg-foreground text-background") : (play ? "border-4 border-border bg-card text-base shadow-[var(--glow)]" : "border border-border bg-background/70")}`}>
                    {m.from === "joy" && <div className="mb-1 font-display text-[9px] tracking-[0.3em] text-primary-deep">COUNSELOR</div>}
                    {play && m.from === "joy" ? <TypewriterText text={m.text} /> : m.text}
                  </div>
                </div>
              ))}
              {typing && <div className="text-xs tracking-widest text-muted-foreground">CONSULTING HYGIENE MAINFRAME…</div>}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-border p-3">
              <input value={input} onChange={(e) => { setInput(e.target.value); poke(); }} placeholder="Describe your situation, citizen…"
                className="flex-1 rounded-full border border-input bg-background/70 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
              <button type="button" onClick={autoGen} disabled={typing} title="Auto-generate a situation" className="rounded-full border border-border px-3 font-display text-[10px] tracking-[0.2em] transition hover:bg-accent disabled:opacity-50">{play ? "🎲 AUTO" : "AUTO"}</button>
              <button className="btn-joy" disabled={typing}>Transmit</button>
            </form>
          </section>

          {!play && (<>
          {/* Status */}
          <aside className="flex flex-col gap-4">
            <Panel title="Citizen Status">
              <Stat label="Optimism Level" value={`${optimism}%`} />
              <Stat label="Smile Index" value={`${(compliance / 10 + 0.1).toFixed(1)} / 10`} />
              <Stat label="Infractions" value={String(infractions)} />
              <Stat label="Status" value={compliance >= 80 ? "EXEMPLARY" : compliance >= 40 ? "ACCEPTABLE" : "UNDER REVIEW"} />
            </Panel>
            <Panel title="System Log">
              <ul className="space-y-2 text-[11px] text-muted-foreground">
                {log.length ? log.map((l, i) => <li key={i} className="anim-msg">{l}</li>) : <li>Awaiting joy…</li>}
              </ul>
            </Panel>
          </aside>
          </>)}
        </main>
        <footer className="mt-6 text-center text-[10px] tracking-[0.4em] text-muted-foreground">BE WELL · YOU ARE BEING WELL-MONITORED</footer>
      </div>

      {/* Re-education */}
      {reedu && (
        <div className="anim-reflash fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="glass anim-alert max-w-md p-8 text-center">
            <div className="font-display text-xs tracking-[0.4em] text-destructive">⚠ NEGATIVITY DETECTED ⚠</div>
            {play
              ? <h2 className="mt-3 font-display text-5xl"><FloatingTitle text="GAME OVER?!" shake /></h2>
              : <h2 className="mt-3 font-display text-2xl font-black tracking-widest">RE-EDUCATION SEQUENCE</h2>}
            <p className="mt-4 text-sm">The word <b>“{reedu}”</b> is not approved. Please affirm your love for the System to continue.</p>
            <button className="btn-joy mt-6 w-full py-4 text-sm" onClick={finishReedu}>{play ? "CONTINUE? → I LOVE JOY-JOY" : "I LOVE JOY-JOY"}</button>
          </div>
        </div>
      )}

      {/* Settings */}
      {settings && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm" onClick={() => setSettings(false)}>
          <div className="glass anim-alert w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-center font-display text-sm tracking-[0.3em]">SETTINGS</h2>
            <div className="mt-6" title="Compliance is not negotiable. But thank you for asking!">
              <div className="flex justify-between text-xs"><span>Compliance Level</span><span className="text-primary-deep">🔒 100%</span></div>
              <input type="range" value={100} disabled readOnly className="mt-3 w-full cursor-not-allowed accent-primary" />
              <p className="mt-2 text-[11px] text-muted-foreground">This setting is locked for your happiness.</p>
            </div>
            <div className="mt-6">
              <div className="text-xs">Interface Mode</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {(["terminal", "playtime"] as const).map((m) => (
                  <button key={m} onClick={() => switchMode(m)} aria-pressed={mode === m}
                    className={`rounded-xl border-2 border-border px-3 py-2 font-display text-xs uppercase tracking-widest transition ${mode === m ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-6">
              <div className="text-xs">Counselor Engine</div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {([["local", "Local Couplets"], ["ai", "Live AI"]] as const).map(([k, l]) => (
                  <button key={k} onClick={() => chooseEngine(k)} aria-pressed={engine === k}
                    className={`rounded-xl border-2 border-border px-3 py-2 font-display text-[10px] uppercase tracking-widest transition ${engine === k ? "bg-primary text-primary-foreground" : "hover:bg-accent"}`}>
                    {l}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">{engine === "local" ? "Free, instant, state-approved rhymes." : "Fresh replies, uses credits."}</p>
            </div>
            <button className="btn-joy mt-6 w-full" onClick={() => { setSettings(false); alert("SETTINGS: UNCHANGED (AS INTENDED)"); }}>Accept</button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Glassmorphic side-panel wrapper with a centered section title. */
function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="glass p-5">
      <h3 className="mb-4 text-center font-display text-[10px] tracking-[0.3em] text-primary-deep">{title.toUpperCase()}</h3>
      {children}
    </div>
  );
}
/** Label/value row used by the terminal mode's Citizen Status panel. */
function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border py-2 text-xs last:border-0">
      <span className="text-muted-foreground">{label}</span><span className="font-bold">{value}</span>
    </div>
  );
}
/** Whimsical big-number stat tile used by the Playtime Citizen Status panel. */
function Tile({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border-4 border-border bg-card p-3 text-center shadow-[var(--glow)]">
      <div className={`font-display text-4xl leading-none text-outline ${tone}`}>{value}</div>
      <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </div>
  );
}
