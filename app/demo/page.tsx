// app/demo/page.tsx
"use client";

import { useState } from "react";
import { Flow } from "@/components/Flow";
import { Log } from "@/components/Log";
import type { EvlaLog } from "@/lib/evla/types";

export default function DemoPage() {
  const [prompt, setPrompt] = useState(
    "40歳男性の胸部X線で不明瞭な影が見えています。追加検査の必要性と重大疾患のリスクについて、AIに判断支援させたい。"
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
        body: JSON.stringify({ prompt, domain: "MEDICAL" }),
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
      setError(e.message || "実行中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ Medical Decision Flow Demo
        </h1>
        <p className="text-sm text-slate-300">
          胸部X線の影など、リスクを伴う医療判断を想定しています。
          テキストで「AIに任せたい判断」を入力し、EVΛƎ フレームワークが
          <span className="font-semibold">
            診断仮説の生成（V）・方針の選択（Λ）・その理由のログ化（Ǝ）
          </span>
          をどのように行うかを確認できます。
        </p>
      </section>

      <section className="space-y-4 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
        <Flow running={loading || !!log} />

        <div className="space-y-3 mt-4">
          <label className="block text-xs text-slate-300">
            E — 医師の診断要求（AIに投げかける問い）
          </label>
          <textarea
            className="w-full min-h-[110px] rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={runDemo}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-500 text-slate-950 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-400 transition"
          >
            {loading ? "EVΛƎ を実行中…" : "EVΛƎ ループを走らせる"}
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
