// app/demo-space-en/page.tsx
"use client";

import { useState } from "react";
import { Flow } from "@/components/Flow";
import { LogSpaceEn } from "@/components/LogSpaceEn";
import type { EvlaLog } from "@/lib/evla/types";

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

  // Convert EvlaLog → LogSpaceEn phases
  const phases =
    log
      ? ([
          { code: "E", value: (log as any).E ?? "" },
          { code: "V", value: (log as any).V ?? "" },
          { code: "Λ", value: (log as any).Λ ?? "" },
          { code: "Ǝ", value: (log as any).Ǝ ?? "" },
        ] as { code: "E" | "V" | "Λ" | "Ǝ"; value: string }[])
      : [];

  return (
    <div className="space-y-6">
      {/* Intro */}
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

      {/* Input + Flow */}
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
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 active:bg-blue-700 transition"
    >
            {loading ? "Running EVΛƎ loop…" : "Run EVΛƎ loop"}
          </button>

          {error && <p className="text-xs text-red-400 mt-1">Error: {error}</p>}
        </div>
      </section>

      {/* Transparency log */}
      {log && (
        <section>
          <LogSpaceEn phases={phases} />
        </section>
      )}
    </div>
  );
}
