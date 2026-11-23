import type { Alert, Engine, Mode } from "@/hooks/useJoyJoySession";
import { FloatingTitle } from "./Playtime";

export function AlertBanner({ alerts, play }: { alerts: Alert[]; play: boolean }) {
  return (
    <div className="pointer-events-none fixed left-1/2 top-4 z-40 flex -translate-x-1/2 flex-col items-center gap-2">
      {alerts.map((a) => (
        <div key={a.id} className="anim-alert glass glow flex items-center gap-2 px-5 py-2 font-display text-xs tracking-[0.25em] text-primary-deep">
          <span className="anim-pulse-dot h-2 w-2 rounded-full bg-primary" /> {play ? `★ ${a.text}! ★` : a.text}
        </div>
      ))}
    </div>
  );
}

export function ReEducationOverlay({ word, play, onFinish }: { word: string; play: boolean; onFinish: () => void }) {
  return (
    <div className="anim-reflash fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="glass anim-alert max-w-md p-8 text-center">
        <div className="font-display text-xs tracking-[0.4em] text-destructive">⚠ NEGATIVITY DETECTED ⚠</div>
        {play ? (
          <h2 className="mt-3 font-display text-5xl">
            <FloatingTitle text="GAME OVER?!" shake />
          </h2>
        ) : (
          <h2 className="mt-3 font-display text-2xl font-black tracking-widest">RE-EDUCATION SEQUENCE</h2>
        )}
        <p className="mt-4 text-sm">
          The word <b>“{word}”</b> is not approved. Please affirm your love for the System to continue.
        </p>
        <button className="btn-joy mt-6 w-full py-4 text-sm" onClick={onFinish}>
          {play ? "CONTINUE? → I LOVE JOY-JOY" : "I LOVE JOY-JOY"}
        </button>
      </div>
    </div>
  );
}

export function SettingsModal({
  mode,
  engine,
  onSwitchMode,
  onChooseEngine,
  onClose,
}: {
  mode: Mode;
  engine: Engine;
  onSwitchMode: (m: Mode) => void;
  onChooseEngine: (e: Engine) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 p-4 backdrop-blur-sm" onClick={onClose}>
      <div className="glass anim-alert w-full max-w-sm p-6" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-center font-display text-sm tracking-[0.3em]">SETTINGS</h2>
        <div className="mt-6" title="Compliance is not negotiable. But thank you for asking!">
          <div className="flex justify-between text-xs">
            <span>Compliance Level</span>
            <span className="text-primary-deep">🔒 100%</span>
          </div>
          <input type="range" value={100} disabled readOnly className="mt-3 w-full cursor-not-allowed accent-primary" />
          <p className="mt-2 text-[11px] text-muted-foreground">This setting is locked for your happiness.</p>
        </div>
        <div className="mt-6">
          <div className="text-xs">Interface Mode</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["terminal", "playtime"] as const).map((m) => (
              <button
                key={m}
                onClick={() => onSwitchMode(m)}
                aria-pressed={mode === m}
                className={`rounded-xl border-2 border-border px-3 py-2 font-display text-xs uppercase tracking-widest transition ${
                  mode === m ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6">
          <div className="text-xs">Counselor Engine</div>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(
              [
                ["local", "Local Couplets"],
                ["ai", "Live AI"],
              ] as const
            ).map(([k, l]) => (
              <button
                key={k}
                onClick={() => onChooseEngine(k)}
                aria-pressed={engine === k}
                className={`rounded-xl border-2 border-border px-3 py-2 font-display text-[10px] uppercase tracking-widest transition ${
                  engine === k ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="mt-2 text-[11px] text-muted-foreground">
            {engine === "local" ? "Free, instant, state-approved rhymes." : "Fresh replies (falls back to ELIZA offline)."}
          </p>
        </div>
        <button className="btn-joy mt-6 w-full" onClick={onClose}>
          Accept
        </button>
      </div>
    </div>
  );
}
