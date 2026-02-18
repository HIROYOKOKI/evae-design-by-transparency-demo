// app/demo-space/page.tsx
"use client";

import { useState } from "react";
import { Flow } from "@/components/Flow";
import { LogSpace } from "@/components/LogSpace";
import type { EvlaLog } from "@/lib/evla/types";

export default function DemoSpacePage() {
  const [prompt, setPrompt] = useState(
    "月面南極域に安全に着陸し、太陽光・通信・地形の条件を満たした地点を選びたい。"
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

  // LogSpace 用に EVΛƎ フェーズを配列に変換
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
      {/* 説明セクション */}
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">
          EVΛƎ 宇宙開発AIデモ：月面着陸意思決定の透明性
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          このデモは、「月面ミッションでAIが着陸地点を選ぶ」場面を想定しています。
          テキストで
          <span className="font-semibold">「AIに任せたいミッション目的」</span>
          を入力すると、EVΛƎフレームワークが
          <span className="font-semibold">
            {" "}
            AIが比較した候補（V）・最終選択とその理由（Λ）・宇宙ミッション透明性ログ（Ǝ）
          </span>{" "}
          を生成し、どのように「安全で説明可能な宇宙AI」を設計できるかを可視化します。
        </p>
        <p className="text-xs text-slate-400">
          ※ 実際の宇宙機関のデータではなく、EVΛƎ構造を示すための仮想シナリオです。
        </p>
      </section>

      {/* 入力＋フロー（Medical / Edu と同じ構成） */}
      <section className="space-y-4 border border-slate-800 rounded-2xl p-4 bg-slate-900/60">
        <Flow running={loading || !!log} />

        <div className="space-y-3 mt-4">
          <label className="block text-xs text-slate-300">
            E — ミッション目的（AIに任せたいこと）
          </label>
          <textarea
            className="w-full min-h-[110px] rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={runDemo}
            disabled={loading || !prompt.trim()}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-evae-e text-white font-semibold hover:bg-[#e63d00] transition"

          >
            {loading ? "EVΛƎ を実行中…" : "EVΛƎ ループを走らせる"}
          </button>
          {error && (
            <p className="text-xs text-red-400 mt-1">Error: {error}</p>
          )}
        </div>
      </section>

      {/* ログ表示（Medical のスタイルに合わせて下に出す） */}
      {log && (
        <section>
          <LogSpace phases={phases} />
        </section>
      )}
    </div>
  );
}
