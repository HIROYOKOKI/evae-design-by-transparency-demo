// components/LogSpaceEn.tsx
"use client";

import React from "react";
import { spaceEngineEn, type SpaceEnPhaseCode } from "@/lib/evla/engine-space-en";

export interface SpaceEnPhaseLog {
  code: SpaceEnPhaseCode;
  value: string;
}

export function LogSpaceEn({ phases }: { phases: SpaceEnPhaseLog[] }) {
  const map = new Map<SpaceEnPhaseCode, string>();
  phases.forEach((p) => map.set(p.code, p.value));

  return (
    <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-slate-100">
        🚀 Space Mission Transparency Log (EVΛƎ)
      </h2>
      <p className="mt-1 text-xs text-slate-400">
        This log shows how the AI moved through the EVΛƎ loop while selecting a lunar
        landing site: from the initial mission impulse to the final, observable decision.
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {spaceEngineEn.phases.map((phase) => (
          <article
            key={phase.code}
            className="rounded-xl border border-slate-700 bg-slate-800/60 p-4"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-100">
                {phase.label}
              </span>
              <span className="text-[10px] text-slate-500">
                EVΛƎ · {phase.code}
              </span>
            </div>

            <p className="mb-2 text-[11px] text-slate-400">
              {phase.description}
            </p>

            <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-2 text-xs text-slate-300">
              {map.get(phase.code) || (
                <span className="text-slate-500">(no entry)</span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
