// app/demo-auto-en/page.tsx
"use client";

import { useState } from "react";
import { Flow } from "@/components/Flow";
import { Log } from "@/components/Log";
import type { EvlaLog } from "@/lib/evla/types";

export default function DemoAutoEnPage() {
  const [prompt, setPrompt] = useState(
    "A pedestrian is detected near a crosswalk at night. Should the vehicle brake immediately or perform an evasive maneuver? Provide a risk-aware recommendation."
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
        body: JSON.stringify({
          prompt,
          domain: "AUTONOMOUS_DRIVING", // if your API doesn't support this yet, change to "SPACE" temporarily
        }),
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

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ Autonomous Driving Decision Flow Demo (EN)
        </h1>
        <p className="text-sm text-slate-300">
          This demo simulates safety-critical autonomous driving decisions.
          Enter a decision request and observe how EVΛƎ performs
          <span className="font-semibold">
            {" "}
            possibility generation (V), choice (Λ), and trace logging (Ǝ)
          </span>
          {" "}within the Conscious Loop foundation.
        </p>
      </section>

      <section className="space-y-4 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
        <Flow running={loading || !!log} />

        <div className="space-y-3 mt-4">
          <label className="block text-xs text-slate-300">
            E — Operator Request (the question to the AI)
          </label>
          <textarea
            className="w-full min-h-[110px] rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={runDemo}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-cyan-500 text-slate-950 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-cyan-400 transition"
          >
            {loading ? "Running EVΛƎ…" : "Run the EVΛƎ Loop"}
          </button>
          {error && <p className="text-xs text-red-400 mt-1">Error: {error}</p>}
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
