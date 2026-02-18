// app/demo-edu-en/page.tsx
"use client";

import { useState } from "react";
import { Flow } from "@/components/Flow";
import { LogEduEn } from "@/components/LogEduEn";  
import type { EvlaLog } from "@/lib/evla/types";

export default function DemoEduEnPage() {
  const [prompt, setPrompt] = useState(
    "I want to use AI for my university essay. I need help with structure and organizing ideas, but I want to ensure my use is ethical and not considered academic misconduct."
  );
  const [log, setLog] = useState<EvlaLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runDemo() {
    setError(null);
    setLoading(true);
    setLog(null);

    try {
      const res = await fetch("/api/evla-edu-en-run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
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
      setError(e.message || "An error occurred during execution.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Description */}
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ Education AI Demo: Transparent AI Use in Student Essays
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          This demo simulates a scenario in which a student uses AI while writing a university essay.
          When you enter{" "}
          <span className="font-semibold">“What you want the AI to help with”</span>,
          the EVΛƎ Framework generates:
          <span className="font-semibold">
            {" "}
            AI usage plans (V), reasons for choosing one (Λ), and an AI transparency log (Ǝ)
          </span>{" "}
          showing how responsible AI use can be designed.
        </p>
        <p className="text-xs text-slate-400">
          *Always follow your university’s academic integrity policies and course guidelines.
        </p>
      </section>

      {/* Input + Flow */}
      <section className="space-y-4 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
        <Flow running={loading || !!log} />

        <div className="space-y-3 mt-4">
          <label className="block text-xs text-slate-300">
            E — Student’s purpose for AI use (what you want the AI to help with)
          </label>
          <textarea
            className="w-full min-h-[110px] rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Example: I want AI to help with idea organization, but I will write the final text myself."
          />
          <button
            onClick={runDemo}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-500 text-slate-950 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition"
          >
            {loading ? "Running EVΛƎ…" : "Run EVΛƎ Loop"}
          </button>
          {error && (
            <p className="text-xs text-red-400 mt-1">Error: {error}</p>
          )}
        </div>
      </section>

      {/* Log display */}
      {log && (
        <section>
          <LogEduEn log={log} />
        </section>
      )}
    </div>
  );
}
