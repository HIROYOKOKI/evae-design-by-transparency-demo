// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
          EVΛƎ Medical AI Demo
        </h1>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          現在の医療AIは、多くが診断結果だけを返し、
          <span className="font-semibold">
            その判断に至った“理由”を医師が確認できない
          </span>
          というブラックボックス構造を抱えています。
        </p>
        <p className="text-slate-300 text-sm md:text-base leading-relaxed">
          EVΛƎ（イーヴァ）フレームワークは、
          AI の意思決定を{" "}
          <span className="font-semibold">
            E（衝動）→ V（可能性）→ Λ（選択）→ Ǝ（観測）
          </span>{" "}
          の4段階に分けて構造化し、
          決定の瞬間にその理由を同時にログとして残します。
          これを{" "}
          <span className="font-semibold">
            Design-by-Transparency（設計段階で透明性を生成する）
          </span>
          と呼びます。
        </p>
        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
          このデモでは、胸部X線の影など{" "}
          <span className="font-semibold">リスクの高い医療判断</span>
          を題材に、EVΛƎがどのように診断候補を生成し（V）、
          どの基準で方針を選択し（Λ）、そのプロセスを
          Ǝ（観測ログ）として可視化するかを体験できます。
          特許出願中の全機能ではなく、「コア構造」を医療用に最小実装した版です。
        </p>
      </section>

      <section className="border border-slate-800 bg-slate-900/40 rounded-2xl p-6 space-y-4">
        <h2 className="text-xl font-semibold">Demo Overview</h2>
        <ol className="list-decimal list-inside text-sm text-slate-200 space-y-1">
          <li>医師の診断要求（E）をテキストで入力する</li>
          <li>AIが3つの診断仮説（V）を生成する</li>
          <li>score − risk に基づき最適な方針を選択する（Λ）</li>
          <li>
            最終診断方針と、そのプロセス全体（E/V/Λ/Ǝ）をログとして表示する
          </li>
        </ol>
        <p className="text-xs text-slate-400">
          ※ このデモは、医療AIにおける透明性の概念実証を目的とした最小版です。
          実運用ではガイドラインや医療統計を取り込むことで拡張可能です。
        </p>
      </section>

      <div>
        <Link
          href="/demo"
          className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-emerald-500 text-slate-950 text-sm font-medium hover:bg-emerald-400 transition"
        >
          医療AI EVΛƎ デモを開始する
        </Link>
      </div>
    </div>
  );
}
