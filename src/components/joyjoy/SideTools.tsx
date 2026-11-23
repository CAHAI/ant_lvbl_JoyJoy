import type { ReactNode } from "react";

/** Glassmorphic side-panel wrapper with a centered section title. */
export function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="glass p-5">
      <h3 className="mb-4 text-center font-display text-[10px] tracking-[0.3em] text-primary-deep">{title.toUpperCase()}</h3>
      {children}
    </div>
  );
}

/** Label/value row used by the terminal mode's Citizen Status panel. */
export function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between border-b border-border py-2 text-xs last:border-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}

/** Whimsical big-number stat tile used by the Playtime Citizen Status panel. */
export function Tile({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-2xl border-4 border-border bg-card p-3 text-center shadow-[var(--glow)]">
      <div className={`font-display text-4xl leading-none text-outline ${tone}`}>{value}</div>
      <div className="mt-2 text-[9px] font-bold uppercase tracking-[0.25em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function CitizenStatusPanel({
  play,
  optimism,
  compliance,
  infractions,
}: {
  play: boolean;
  optimism: number;
  compliance: number;
  infractions: number;
}) {
  const status = compliance >= 80 ? "EXEMPLARY" : compliance >= 40 ? "ACCEPTABLE" : "UNDER REVIEW";
  const smileScore = (compliance / 10 + 0.1).toFixed(1);

  if (play) {
    return (
      <Panel title="Citizen Status">
        <div className="grid grid-cols-2 gap-3">
          <Tile label="Optimism" value={`${optimism}%`} tone="text-primary" />
          <Tile label="Smile Score" value={smileScore} tone="text-accent" />
          <Tile label="Compliance" value={`${compliance}`} tone="text-primary-deep" />
          <Tile label="Violations" value={String(infractions)} tone="text-destructive" />
        </div>
        <div className="anim-float-letter mt-4 rounded-full border-4 border-border bg-accent py-2 text-center font-display text-sm tracking-widest text-accent-foreground">
          ★ {status} ★
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="Citizen Status">
      <Stat label="Optimism Level" value={`${optimism}%`} />
      <Stat label="Smile Index" value={`${smileScore} / 10`} />
      <Stat label="Infractions" value={String(infractions)} />
      <Stat label="Status" value={status} />
    </Panel>
  );
}

export function ComplimentPanel({ compliment, onGenerate }: { compliment: string; onGenerate: () => void }) {
  return (
    <Panel title="Compliment Generator">
      <p className="min-h-16 text-sm leading-relaxed">{compliment}</p>
      <button className="btn-joy mt-4 w-full" onClick={onGenerate}>
        Generate Praise
      </button>
    </Panel>
  );
}

export function MoodCorrectionPanel({
  moodIn,
  setMoodIn,
  moodOut,
  onCorrect,
}: {
  moodIn: string;
  setMoodIn: (v: string) => void;
  moodOut: string;
  onCorrect: () => void;
}) {
  return (
    <Panel title="Mood Correction">
      <textarea
        value={moodIn}
        onChange={(e) => setMoodIn(e.target.value)}
        rows={3}
        placeholder="Type an unapproved sentence…"
        className="w-full resize-none rounded-xl border border-input bg-background/60 p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
      <button className="btn-joy mt-3 w-full" onClick={onCorrect}>
        Correct Mood
      </button>
      {moodOut && <p className="anim-msg mt-3 rounded-xl bg-accent p-3 text-sm text-accent-foreground">{moodOut}</p>}
    </Panel>
  );
}

export function SystemLogPanel({ log }: { log: string[] }) {
  return (
    <Panel title="System Log">
      <ul className="space-y-2 text-[11px] text-muted-foreground">
        {log.length ? log.map((l, i) => <li key={i} className="anim-msg">{l}</li>) : <li>Awaiting joy…</li>}
      </ul>
    </Panel>
  );
}
