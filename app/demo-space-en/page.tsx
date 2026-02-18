// app/demo-space-en/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Flow } from "@/components/Flow";
import { EVAE_COLORS } from "@/components/evaeColors";
import type { EvlaLog } from "@/lib/evla/types";

type PhaseKey = "E" | "V" | "Λ" | "Ǝ";

function tintFor(k: PhaseKey) {
  if (k === "E") return "rgba(255,69,0,0.12)";
  if (k === "V") return "rgba(30,58,138,0.12)";
  if (k === "Λ") return "rgba(132,204,22,0.12)";
  return "rgba(184,51,245,0.12)";
}

export default function DemoSpaceEnPage() {
  const [prompt, setPrompt] = useState(
    "We want the AI to choose a safe landing site near the lunar south pole, balancing sunlight, communication, and terrain conditions."
  );
  const [log, setLog] = useState<EvlaLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runDemo() {
    setError(null);
    setLoading(true);
    setLog(null);

    try {
      const res = await fetch("/api/evla-space-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as any).error || `request failed with ${res.status}`);
      }

      const data = (await res.json()) as { log: EvlaLog };
      setLog(data.log);
    } catch (e: any) {
      console.error(e);
      setError(e.message || "An error occurred while running the demo.");
    } finally {
      setLoading(false);
    }
  }

  const phaseValue = useMemo(() => {
    if (!log) return null;
    const anyLog = log as any;

    const E = anyLog.E ?? anyLog.impulse?.text ?? "";
    const V = anyLog.V ?? "";
    const L = anyLog["Λ"] ?? "";
    const O = anyLog["Ǝ"] ?? anyLog.observation?.outcome ?? "";

    return {
      E: String(E || ""),
      V: String(V || ""),
      "Λ": String(L || ""),
      "Ǝ": String(O || ""),
    } as Record<PhaseKey, string>;
  }, [log]);

  const phases = [
    {
      key: "E" as const,
      title: "E — Impulse (Mission objective)",
      desc:
        "Define the core mission objective — what you want the AI to achieve. This is the initial impulse that guides all later decisions.",
    },
    {
      key: "V" as const,
      title: "V — Possibility (Options considered)",
      desc:
        "Record the different candidate landing sites or trajectories that the AI compares. This makes the space of possibilities transparent.",
    },
    {
      key: "Λ" as const,
      title: "Λ — Choice (Selected option and rationale)",
      desc:
        "Describe which option was selected and why. What criteria were weighted most heavily in the final decision?",
    },
    {
      key: "Ǝ" as const,
      title: "Ǝ — Observation (Final transparency log)",
      desc:
        "Summarize the final decision and how it will be stored as a transparency log, so the reasoning can be audited later.",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
          EVΛƎ Space AI Demo: Transparent Lunar Landing Decisions
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          This demo imagines a scenario where an AI system helps select a landing site for a lunar mission. By entering{" "}
          <span className="font-semibold">what you want the AI to decide</span>, the EVΛƎ framework generates:
          <span className="font-semibold">
            {" "}
            candidate options (V), the final choice and its rationale (Λ), and a transparency log (Ǝ)
          </span>
          , so we can see how a <span className="font-semibold">safe and accountable space AI</span> could be designed.
        </p>
        <p className="text-xs text-slate-400">
          * This is a fictional scenario to illustrate the EVΛƎ structure. It does not use real mission data.
        </p>
      </section>

      <section className="space-y-4 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
        <Flow running={loading || !!log} />

        <div className="space-y-3 mt-4">
          <label className="block text-xs text-slate-300">
            E — Mission objective (what you want the AI to decide)
          </label>

          <textarea
            className="w-full min-h-[110px] rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button
            onClick={runDemo}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-600 text-sm text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 active:bg-blue-700 transition"
          >
            {loading ? "Running EVΛƎ Loop…" : "Run EVΛƎ Loop"}
          </button>

          {error && <p className="text-xs text-red-400 mt-1">Error: {error}</p>}
        </div>
      </section>

      {phaseValue && (
        <section className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/50 p-6 shadow-lg">
          <h2 className="text-lg font-semibold text-slate-100">
            🚀 Space Mission Transparency Log (EVΛƎ)
          </h2>
          <p className="mt-1 text-xs text-slate-400">
            This log shows how the AI moved through the EVΛƎ Loop while selecting a lunar landing site:
            from the initial mission impulse to the final, observable decision.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {phases.map((p) => {
              const solid = EVAE_COLORS[p.key];
              const tint = tintFor(p.key);
              const value = phaseValue[p.key]?.trim();

              return (
                <article
                  key={p.key}
                  className="rounded-xl border border-slate-700 bg-slate-800/60 p-4"
                  style={{
                    borderLeftWidth: 6,
                    borderLeftStyle: "solid",
                    borderLeftColor: solid,
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: solid }}>
                      {p.title}
                    </span>

                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full border"
                      style={{ color: solid, borderColor: solid, backgroundColor: tint }}
                    >
                      EVΛƎ · {p.key}
                    </span>
                  </div>

                  <p className="mb-2 text-[11px] text-slate-400">{p.desc}</p>

                  <div className="rounded-lg border border-slate-600 bg-slate-900/60 p-2 text-xs text-slate-300">
                    {value ? value : <span className="text-slate-500">(no entry)</span>}
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
