import { useJoyJoySession, type UseJoyJoySessionOptions } from "@/hooks/useJoyJoySession";
import { ChatPanel } from "./ChatPanel";
import { AlertBanner, ReEducationOverlay, SettingsModal } from "./Overlays";
import { FloatingTitle, WordMarquee } from "./Playtime";
import { CitizenStatusPanel, ComplimentPanel, MoodCorrectionPanel, SystemLogPanel } from "./SideTools";

/**
 * Root application shell: the whole Joy-Joy OS experience.
 *
 * Delegates session state to `useJoyJoySession` and renders both Terminal and
 * Playtime skins from the active `PresentationPack`.
 */
export function JoyJoyTerminal(props: UseJoyJoySessionOptions = {}) {
  const s = useJoyJoySession(props);

  return (
    <div data-mode={s.mode} className="scanlines min-h-screen px-4 py-6 md:px-8">
      {s.play && <WordMarquee />}
      {s.wipe && <div className="anim-wipe fixed inset-0 z-[70] bg-accent" />}
      <AlertBanner alerts={s.alerts} play={s.play} />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="glass grid grid-cols-3 items-center px-5 py-4">
          <div className="font-mono text-xs text-muted-foreground">{s.clock}</div>
          <div className="text-center">
            {s.play ? (
              <h1 className="font-display text-4xl md:text-6xl">
                <FloatingTitle text={s.pack.playtimeTitle} />
              </h1>
            ) : (
              <h1 className="font-display text-2xl font-black tracking-[0.3em] text-primary-deep md:text-3xl">{s.pack.name}</h1>
            )}
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">{s.pack.subtitle}</p>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => s.setSettings(true)}
              className="rounded-full border border-border px-4 py-2 font-display text-[10px] tracking-[0.2em] transition hover:bg-accent"
            >
              SETTINGS
            </button>
          </div>
        </header>

        <section className="glass mt-4 px-5 py-4">
          <div className="mb-2 flex justify-between font-display text-[10px] tracking-[0.3em]">
            <span>COMPLIANCE METER</span>
            <span className="text-primary-deep">{s.compliance}%</span>
          </div>
          <div className="flex items-center gap-3">
            <div className={`flex-1 overflow-hidden rounded-full bg-muted ${s.play ? "h-7 border-4 border-border" : "h-3"}`}>
              <div
                className={`h-full rounded-full bg-primary transition-all duration-700 ease-out ${s.play ? "" : "glow"}`}
                style={{ width: `${s.compliance}%` }}
              />
            </div>
            {s.play && (
              <span key={s.compliance} className="anim-spin-star inline-block text-3xl text-accent text-outline">
                ★
              </span>
            )}
          </div>
        </section>

        <main className={`mt-4 grid gap-4 ${s.play ? "lg:grid-cols-[minmax(300px,1fr)_2.6fr]" : "lg:grid-cols-[1fr_1.6fr_1fr]"}`}>
          {s.play ? (
            <aside className="flex flex-col gap-4">
              <CitizenStatusPanel play optimism={s.optimism} compliance={s.compliance} infractions={s.infractions} />
              <ComplimentPanel compliment={s.compliment} onGenerate={s.generatePraise} />
              <MoodCorrectionPanel moodIn={s.moodIn} setMoodIn={s.setMoodIn} moodOut={s.moodOut} onCorrect={s.correctMood} />
              <SystemLogPanel log={s.log} />
            </aside>
          ) : (
            <aside className="flex flex-col gap-4">
              <ComplimentPanel compliment={s.compliment} onGenerate={s.generatePraise} />
              <MoodCorrectionPanel moodIn={s.moodIn} setMoodIn={s.setMoodIn} moodOut={s.moodOut} onCorrect={s.correctMood} />
            </aside>
          )}

          <ChatPanel
            play={s.play}
            counselorName={s.pack.counselorName}
            msgs={s.msgs}
            typing={s.typing}
            input={s.input}
            setInput={s.setInput}
            onPoke={s.poke}
            onSubmit={s.submit}
            onAuto={s.autoGen}
          />

          {!s.play && (
            <aside className="flex flex-col gap-4">
              <CitizenStatusPanel play={false} optimism={s.optimism} compliance={s.compliance} infractions={s.infractions} />
              <SystemLogPanel log={s.log} />
            </aside>
          )}
        </main>

        <footer className="mt-6 text-center text-[10px] tracking-[0.4em] text-muted-foreground">{s.pack.footer}</footer>
      </div>

      {s.reedu && <ReEducationOverlay word={s.reedu} play={s.play} onFinish={s.finishReedu} />}
      {s.settings && (
        <SettingsModal
          mode={s.mode}
          engine={s.engine}
          onSwitchMode={s.switchMode}
          onChooseEngine={s.chooseEngine}
          onClose={() => {
            s.setSettings(false);
            s.alert("SETTINGS: UNCHANGED (AS INTENDED)");
          }}
        />
      )}
    </div>
  );
}
