"use client";

import React from "react";
import { spaceEngine, SpacePhaseCode } from "@/lib/evla/engine-space";

export interface SpacePhaseLog {
  code: SpacePhaseCode;
  value: string;
}

export function LogSpace({ phases }: { phases: SpacePhaseLog[] }) {
  const map = new Map<SpacePhaseCode, string>();
  phases.forEach((p) => map.set(p.code, p.value));

  return (
    <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-slate-100">
        🚀 宇宙ミッション透明性ログ（EVΛƎ）
      </h2>
      <p className="mt-1 text-xs text-slate-400">
        AIが月面着陸地点を選ぶ過程を、E→V→Λ→Ǝ の順に完全可視化しています。
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {spaceEngine.phases.map((phase) => (
          <article
            key={phase.code}
            className="rounded-xl border border-slate-700 bg-slate-800/60 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-100">
                {phase.label}
              </span>
              <span className="text-[10px] text-slate-500">EVΛƎ · {phase.code}</span>
            </div>

            <p className="mb-2 text-[11px] text-slate-400">
              {phase.description}
            </p>

            <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-2 text-xs text-slate-300">
              {map.get(phase.code) || <span className="text-slate-500">（未入力）</span>}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
