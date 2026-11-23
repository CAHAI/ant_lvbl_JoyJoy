import { useCallback, useEffect, useState } from "react";
import { mothballedAIAdapter, type AIProviderAdapter } from "@/lib/adapters/ai";
import { browserStorageAdapter, type StorageAdapter } from "@/lib/adapters/storage";
import { coupletReply } from "@/lib/joyjoy/couplets";
import { respond } from "@/lib/joyjoy/eliza";
import { moodCorrect } from "@/lib/joyjoy/moodCorrect";
import { detectNegativity } from "@/lib/joyjoy/negativity";
import { DEFAULT_JOYJOY_PACK, type PresentationPack } from "@/lib/joyjoy/pack";
import { pick } from "@/lib/joyjoy/platitudes";

/** Interface skin: the stark government terminal or the cartoon Playtime look. */
export type Mode = "terminal" | "playtime";
export type Engine = "local" | "eliza" | "ai";

/** A single chat bubble; `from` is the citizen ("you") or the Counselor ("joy"). */
export type Msg = { id: number; from: "you" | "joy"; text: string };
/** A transient system alert toast, also mirrored into the System Log panel. */
export type Alert = { id: number; text: string };

let uid = 0;

export interface UseJoyJoySessionOptions {
  pack?: PresentationPack;
  storage?: StorageAdapter;
  aiAdapter?: AIProviderAdapter;
}

/**
 * Portable session controller for Joy-Joy OS.
 * Decoupled from DOM/TanStack server primitives via StorageAdapter and AIProviderAdapter.
 */
export function useJoyJoySession({
  pack = DEFAULT_JOYJOY_PACK,
  storage = browserStorageAdapter,
  aiAdapter = mothballedAIAdapter,
}: UseJoyJoySessionOptions = {}) {
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    { id: uid++, from: "joy", text: pack.welcomeMessage },
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
  const [mode, setMode] = useState<Mode>("terminal");
  const [wipe, setWipe] = useState(false);
  const [engine, setEngine] = useState<Engine>("local");
  const [forcedThemeId, setForcedThemeId] = useState<string>("auto");
  const [lastActive, setLastActive] = useState(() => Date.now());

  useEffect(() => {
    const savedEngine = storage.get("joyjoy-engine");
    if (savedEngine === "ai" || savedEngine === "eliza" || savedEngine === "local") setEngine(savedEngine);
    const savedPin = storage.get("joyjoy-theme-pin");
    if (savedPin) setForcedThemeId(savedPin);
    if (storage.get("joyjoy-mode") === "playtime") setMode("playtime");
    const v = Number(storage.get("joyjoy-compliance"));
    if (v) setCompliance(v);
  }, [storage]);

  useEffect(() => {
    storage.set("joyjoy-compliance", String(compliance));
  }, [compliance, storage]);

  useEffect(() => {
    const tick = () => setClock(new Date().toLocaleTimeString("en-US", { hour12: false }) + " · 2532");
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  const alert = useCallback(
    (text = pick(pack.alerts)) => {
      const id = uid++;
      setAlerts((a) => [...a.slice(-2), { id, text }]);
      setLog((l) => [`${new Date().toLocaleTimeString("en-US", { hour12: false })} ${text}`, ...l].slice(0, 6));
      setTimeout(() => setAlerts((a) => a.filter((x) => x.id !== id)), 2800);
    },
    [pack.alerts],
  );

  useEffect(() => {
    const t = setInterval(() => alert(), 14000);
    const first = setTimeout(() => alert("SMILE DETECTED"), 1500);
    return () => {
      clearInterval(t);
      clearTimeout(first);
    };
  }, [alert]);

  const comply = useCallback((n: number) => {
    setCompliance((c) => Math.max(0, Math.min(100, c + n)));
  }, []);

  const poke = useCallback(() => setLastActive(Date.now()), []);

  const chooseEngine = (e: Engine) => {
    setEngine(e);
    storage.set("joyjoy-engine", e);
  };

  const chooseThemePin = (id: string) => {
    setForcedThemeId(id);
    storage.set("joyjoy-theme-pin", id);
  };

  const switchMode = (m: Mode) => {
    if (m === mode || wipe) return;
    setWipe(true);
    setTimeout(() => {
      setMode(m);
      storage.set("joyjoy-mode", m);
    }, 400);
    setTimeout(() => {
      setWipe(false);
      alert(m === "playtime" ? "FUN LEVELS: MANDATORY" : "TERMINAL: RESTORED");
    }, 800);
  };

  const submit = async (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setInput("");
    poke();
    const history = msgs.map(({ from, text }) => ({ from, text }));
    setMsgs((m) => [...m, { id: uid++, from: "you", text }]);

    const bad = detectNegativity(text, pack.bannedWords);
    if (bad) {
      comply(-8);
      setInfractions((i) => i + 1);
      setReedu(bad);
      return;
    }

    comply(4);
    setTyping(true);
    let reply: string;
    if (engine === "local") {
      await new Promise((r) => setTimeout(r, 500 + Math.random() * 500));
      const c = coupletReply(text, pack.themes, pack.fallbackCouplets, forcedThemeId);
      reply = c.reply;
      alert(`TOPIC: ${c.theme.toUpperCase()}${c.score > 0 ? ` · W:${c.score}` : ""}`);
    } else if (engine === "eliza") {
      await new Promise((r) => setTimeout(r, 350 + Math.random() * 350));
      reply = respond(text);
      alert("ENGINE: ELIZA DIRECT");
    } else {
      try {
        const r = await aiAdapter.reply(text, history);
        if (r.error) alert("MAINFRAME: LOCAL JOY ENGAGED");
        reply = r.reply ?? respond(text);
      } catch {
        reply = respond(text);
      }
    }

    setMsgs((m) => [...m, { id: uid++, from: "joy", text: reply }]);
    setTyping(false);
    poke();
    if (Math.random() < 0.4) alert();
  };

  const autoGen = () => {
    void submit(pick(pack.situations));
  };

  // Idle watchdog: after 30s without interaction the Counselor nudges the citizen.
  useEffect(() => {
    const t = setInterval(() => {
      if (typing || reedu || settings || Date.now() - lastActive < 30000) return;
      setMsgs((m) => [...m, { id: uid++, from: "joy", text: pick(pack.nudges) }]);
      alert("IDLE CITIZEN DETECTED");
      setLastActive(Date.now());
    }, 3000);
    return () => clearInterval(t);
  }, [typing, reedu, settings, lastActive, alert, pack.nudges]);

  const finishReedu = () => {
    setReedu(null);
    comply(10);
    alert("RE-EDUCATION: SUCCESSFUL");
    setMsgs((m) => [...m, { id: uid++, from: "joy", text: pack.reeduSuccessMessage }]);
  };

  const generatePraise = () => {
    setCompliment(pick(pack.compliments));
    comply(2);
  };

  const correctMood = () => {
    if (!moodIn.trim()) return;
    setMoodOut(moodCorrect(moodIn, pack.moodSwaps));
    comply(3);
    alert("MOOD: CORRECTED");
  };

  const optimism = Math.min(100, 70 + Math.round(compliance * 0.3));

  return {
    pack,
    msgs,
    input,
    setInput,
    typing,
    compliance,
    optimism,
    alerts,
    alert,
    log,
    reedu,
    compliment,
    moodIn,
    setMoodIn,
    moodOut,
    settings,
    setSettings,
    clock,
    infractions,
    mode,
    play: mode === "playtime",
    wipe,
    engine,
    forcedThemeId,
    poke,
    chooseEngine,
    chooseThemePin,
    switchMode,
    submit,
    autoGen,
    finishReedu,
    generatePraise,
    correctMood,
  };
}
