// components/LogEduEn.tsx
import type { EvlaLog } from "@/lib/evla/types";
import { EVAE_COLORS } from "./evaeColors";

interface LogEduEnProps {
  log: EvlaLog;
}

export function LogEduEn({ log }: LogEduEnProps) {
  const { impulse, possibilities, choice, observation } = log;
  const selected = possibilities.find((p) => p.id === choice.selectedId);

  // ✅ “選択＝Λ” の強調色（border + tint）
  const lambdaSolid = EVAE_COLORS["Λ"];
  const lambdaTint = "rgba(132,204,22,0.12)"; // #84CC16 tint

  return (
    <div className="space-y-4 mt-6">
      {/* E */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
        <h3 className="text-sm font-semibold mb-2" style={{ color: EVAE_COLORS.E }}>
          E — Impulse (What you wanted the AI to do)
        </h3>
        <p className="text-sm text-slate-100 whitespace-pre-wrap">{impulse.text}</p>
        <p className="text-[11px] text-slate-500 mt-2">timestamp: {impulse.timestamp}</p>
      </section>

      {/* V */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
        <h3 className="text-sm font-semibold mb-2" style={{ color: EVAE_COLORS.V }}>
          V — Generated AI Usage Plans
        </h3>

        <div className="grid gap-3 md:grid-cols-3">
          {possibilities.map((p) => {
            const isSelected = p.id === choice.selectedId;

            return (
              <div
                key={p.id}
                className={[
                  "rounded-lg border p-3 text-xs space-y-1 transition-colors",
                  isSelected ? "bg-slate-900/60" : "border-slate-700 bg-slate-900/60",
                ].join(" ")}
                style={isSelected ? { borderColor: lambdaSolid, backgroundColor: lambdaTint } : undefined}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    #{p.id} {p.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    score: {p.score.toFixed(2)} / risk: {p.risk.toFixed(2)}
                  </span>
                </div>
                <p className="text-slate-100 whitespace-pre-wrap">{p.hypothesis}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Λ */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
        <h3 className="text-sm font-semibold mb-2" style={{ color: EVAE_COLORS["Λ"] }}>
          Λ — Choice and Its Rationale
        </h3>

        {selected && (
          <p className="text-xs text-slate-100 mb-2">
            Selected scenario:{" "}
            <span className="font-semibold">
              #{selected.id} {selected.label}
            </span>
          </p>
        )}

        <p className="text-xs text-slate-200 whitespace-pre-wrap mb-2">{choice.reason}</p>

        <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1">
          {choice.criteria.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      {/* Ǝ */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
        <h3 className="text-sm font-semibold mb-2" style={{ color: EVAE_COLORS["Ǝ"] }}>
          Ǝ — Observation (AI Transparency Log)
        </h3>

        <p className="text-sm text-slate-50 whitespace-pre-wrap mb-2">{observation.outcome}</p>
        <p className="text-[11px] text-slate-300 whitespace-pre-wrap mb-2">{observation.explanation}</p>

        {observation.notes && (
          <p className="text-[11px] text-slate-500 whitespace-pre-wrap">{observation.notes}</p>
        )}
      </section>
    </div>
  );
}
