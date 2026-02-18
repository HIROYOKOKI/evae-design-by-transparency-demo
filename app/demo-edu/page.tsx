// app/demo-edu/page.tsx
"use client";

import { useState } from "react";
import { Flow } from "@/components/Flow";
import { LogEdu } from "@/components/LogEdu";   // ★ これを必ず追加
import type { EvlaLog } from "@/lib/evla/types";

export default function DemoEduPage() {
  const [prompt, setPrompt] = useState(
    "大学のレポートでAIを使いたい。構成や論点整理にはAIを使いたいが、学術不正にならない範囲で責任ある使い方をしたい。"
  );
  const [log, setLog] = useState<EvlaLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function runDemo() {
    setError(null);
    setLoading(true);
    setLog(null);

    try {
      const res = await fetch("/api/evla-edu-run", {
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
      setError(e.message || "実行中にエラーが発生しました");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* 説明セクション */}
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ 教育AIデモ：レポートでのAI利用と透明性
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          このデモは、「学生がレポート作成でAIを使う」場面を想定しています。
          テキストで <span className="font-semibold">「AIに任せたいこと」</span>
          を入力すると、EVΛƎフレームワークが
          <span className="font-semibold">
            {" "}
            AIの使い方プラン（V）・選択とその理由（Λ）・AI利用透明性ログ（Ǝ）
          </span>{" "}
          を生成し、どのように「責任あるAI利用」を設計できるかを可視化します。
        </p>
        <p className="text-xs text-slate-400">
          ※ 実際の運用では、必ず各大学・授業ごとのルール（学則・シラバス）を優先してください。
        </p>
      </section>

      {/* 入力＋フロー */}
      <section className="space-y-4 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
        <Flow running={loading || !!log} />

        <div className="space-y-3 mt-4">
          <label className="block text-xs text-slate-300">
            E — 学生のAI利用の目的（AIに任せたいこと）
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

      {/* ログ表示 */}
      {log && (
        <section>
          <LogEdu log={log} />
        </section>
      )}
    </div>
  );
}
