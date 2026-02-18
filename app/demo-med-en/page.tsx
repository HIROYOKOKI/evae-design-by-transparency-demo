// app/demo-en/page.tsx
"use client";

import { useState } from "react";
import { Flow } from "@/components/Flow";   // ★ ここを FlowEn ではなく Flow
import { LogEn as Log } from "@/components/LogEn";
import type { EvlaLog } from "@/lib/evla/types";

export default function DemoEnPage() {
  const [prompt, setPrompt] = useState(
    "An unclear shadow is visible on the chest X-ray of a 40-year-old male. I want AI to assess the risk of serious illness and whether additional tests are necessary."
  );
  const [log, setLog] = useState<EvlaLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runDemo() {
    setError(null);
    setLoading(true);
    setLog(null);

    try {
      const res = await fetch("/api/evla-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, domain: "MEDICAL_EN" }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as any).error || `request failed with ${res.status}`
        );
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

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ Medical Decision Flow Demo (EN)
        </h1>
        <p className="text-sm text-slate-300">
          This demo simulates a medical decision involving a potentially
          high-risk finding on a chest X-ray. Enter the{" "}
          <span className="font-semibold">decision you would like AI to make</span>{" "}
          as free text, and the EVΛƎ Framework will show how it:{" "}
          <span className="font-semibold">
            generates diagnostic hypotheses (V), selects a course of action (Λ),
            and logs the reasoning (Ǝ)
          </span>{" "}
          as part of Design-by-Transparency.
        </p>
      </section>

      <section className="space-y-4 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
        <Flow running={loading || !!log} />

        <div className="space-y-3 mt-4">
          <label className="block text-xs text-slate-300">
            E — Doctor&apos;s diagnostic request (question posed to the AI)
          </label>
          <textarea
            className="w-full min-h-[110px] rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={runDemo}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-600 text-slate-950 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition"
          >
            {loading ? "Running EVΛƎ…" : "Run EVΛƎ Loop"}
          </button>
          {error && (
            <p className="text-xs text-red-400 mt-1">Error: {error}</p>
          )}
        </div>
      </section>

      {log && (
        <section>
          <Log log={log} />
        </section>
      )}
    </div>
  );
}
