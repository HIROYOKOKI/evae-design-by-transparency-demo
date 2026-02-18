// components/LogSpaceEn.tsx
"use client";

import React from "react";
import { spaceEngineEn, type SpaceEnPhaseCode } from "@/lib/evla/engine-space-en";
import { EVAE_COLORS } from "./evaeColors";

export interface SpaceEnPhaseLog {
  code: SpaceEnPhaseCode;
  value: string;
}

function keyFromPhaseCode(code: SpaceEnPhaseCode): keyof typeof EVAE_COLORS | null {
  // phase.code から E / V / Λ / Ǝ を抽出（含まれていればそれを採用）
  const s = String(code);
  if (s.includes("E")) return "E";
  if (s.includes("V")) return "V";
  if (s.includes("Λ")) return "Λ";
  if (s.includes("Ǝ")) return "Ǝ";
  return null;
}

function tintFor(key: keyof typeof EVAE_COLORS) {
  const solid = EVAE_COLORS[key];
  // 公式カラーに合わせて手作りtint（最も安全）
  if (key === "E") return "rgba(255,69,0,0.12)";
  if (key === "V") return "rgba(30,58,138,0.12)";
  if (key === "Λ") return "rgba(132,204,22,0.12)";
  return "rgba(184,51,245,0.12)"; // Ǝ
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
        {spaceEngineEn.phases.map((phase) => {
          const k = keyFromPhaseCode(phase.code);
          const solid = k ? EVAE_COLORS[k] : "#94A3B8"; // slate-400 fallback
          const tint = k ? tintFor(k) : "rgba(148,163,184,0.10)";

          return (
            <article
              key={phase.code}
              className="rounded-xl border border-slate-700 bg-slate-800/60 p-4"
              style={{
                borderLeftWidth: 6,
                borderLeftStyle: "solid",
                borderLeftColor: solid,
              }}
            >
              <div className="mb-2 flex items-center justify-between">
                <span
                  className="text-xs font-semibold"
                  style={{ color: solid }}
                >
                  {phase.label}
                </span>

                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                  style={{
                    color: solid,
                    borderColor: solid,
                    backgroundColor: tint,
                  }}
                >
                  EVΛƎ · {phase.code}
                </span>
              </div>

              <p className="mb-2 text-[11px] text-slate-400">
                {phase.description}
              </p>

              <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-2 text-xs text-slate-300">
                {map.get(phase.code) || (
                  <span className="tex
