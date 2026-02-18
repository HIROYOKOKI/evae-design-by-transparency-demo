// components/LogEdu.tsx
import type { EvlaLog } from "@/lib/evla/types";

interface LogEduProps {
  log: EvlaLog;
}

export function LogEdu({ log }: LogEduProps) {
  const { impulse, possibilities, choice, observation } = log;
  const selected = possibilities.find((p) => p.id === choice.selectedId);

  return (
    <div className="space-y-4 mt-6">
      {/* E */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
        <h3 className="text-sm font-semibold text-emerald-400 mb-2">
          E — 衝動（AIに任せたいこと）
        </h3>
        <p className="text-sm text-slate-100 whitespace-pre-wrap">
          {impulse.text}
        </p>
        <p className="text-[11px] text-slate-500 mt-2">
          timestamp: {impulse.timestamp}
        </p>
      </section>

      {/* V */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
        <h3 className="text-sm font-semibold text-sky-400 mb-2">
          V — 生成されたAI利用プラン
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          {possibilities.map((p) => (
            <div
              key={p.id}
              className={[
                "rounded-lg border p-3 text-xs space-y-1",
                p.id === choice.selectedId
                  ? "border-emerald-400 bg-emerald-500/10"
                  : "border-slate-700 bg-slate-900/60",
              ].join(" ")}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  #{p.id} {p.label}
                </span>
                <span className="text-[10px] text-slate-400">
                  score: {p.score.toFixed(2)} / risk: {p.risk.toFixed(2)}
                </span>
              </div>
              <p className="text-slate-100 whitespace-pre-wrap">
                {p.hypothesis}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Λ */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/40">
        <h3 className="text-sm font-semibold text-amber-400 mb-2">
          Λ — 選択とその理由
        </h3>
        {selected && (
          <p className="text-xs text-slate-100 mb-2">
            選択されたシナリオ:{" "}
            <span className="font-semibold">
              #{selected.id} {selected.label}
            </span>
          </p>
        )}
        <p className="text-xs text-slate-200 whitespace-pre-wrap mb-2">
          {choice.reason}
        </p>
        <ul className="text-[11px] text-slate-400 list-disc list-inside space-y-1">
          {choice.criteria.map((c, i) => (
            <li key={i}>{c}</li>
          ))}
        </ul>
      </section>

      {/* Ǝ */}
      <section className="border border-slate-800 rounded-xl p-4 bg-slate-900/60">
        <h3 className="text-sm font-semibold text-fuchsia-400 mb-2">
          Ǝ — 観測（AI利用透明性ログ）
        </h3>
        <p className="text-sm text-slate-50 whitespace-pre-wrap mb-2">
          {observation.outcome}
        </p>
        <p className="text-[11px] text-slate-300 whitespace-pre-wrap mb-2">
          {observation.explanation}
        </p>
        {observation.notes && (
          <p className="text-[11px] text-slate-500 whitespace-pre-wrap">
            {observation.notes}
          </p>
        )}
      </section>
    </div>
  );
}
