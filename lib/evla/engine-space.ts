// lib/evla/engine-space.ts

// このファイルは「宇宙ミッション用のUIテキスト」と
// APIから返すシンプルなログ生成だけを担当します。

export type SpacePhaseCode = "E" | "V" | "Λ" | "Ǝ";

export interface SpacePhase {
  code: SpacePhaseCode;
  label: string;
  description: string;
  placeholder: string;
}

export const spaceEngine = {
  title: "EVΛƎ 宇宙開発AIデモ — 月面ミッション透明性ログ",
  subtitle:
    "AIが月面着陸地点を選ぶとき、その判断理由を「E→V→Λ→Ǝ」で可視化するデモです。",
  phases: <SpacePhase[]>[
    {
      code: "E",
      label: "E — Impulse（ミッション目的）",
      description:
        "ミッションの最上位目的（衝動）を定義します。AIに何を達成してほしいのかを最初に書きます。",
      placeholder:
        "例：月面南極域に安全に着陸し、太陽光・通信・地形条件を満たした地点を選びたい。"
    },
    {
      code: "V",
      label: "V — Possibility（可能性の比較）",
      description:
        "AIが検討した複数の着陸候補や軌道案を記録します。どんな可能性を比較したかを透明化します。",
      placeholder:
        "例：①氷資源は豊富だが傾斜が大きい／②高台で太陽光と通信は安定するが水氷は少ない／③クレーター縁で全指標が中程度 など。"
    },
    {
      code: "Λ",
      label: "Λ — Choice（選択理由）",
      description:
        "AIが複数案の中から「どれを選んだか」と、その理由を記録します。",
      placeholder:
        "例：安全性を最優先し、太陽光と通信が安定し地形が平坦な高台を選択した。氷資源は後続ミッションで補う方針とした。"
    },
    {
      code: "Ǝ",
      label: "Ǝ — Observation（最終ログ）",
      description:
        "最終的に採用されたミッション案と、その背後にある理由ログを観測します。",
      placeholder:
        "例：最終着陸地点は高台に決定。比較した候補と重み付け・選択理由をログとして保存し、意思決定過程を完全に追跡できる状態にした。"
    }
  ]
};

/**
 * 宇宙ミッション向け EVΛƎ 実行関数
 * 型は any にして、既存の EvlaLog 型とは切り離しておく。
 * （API 側では any → EvlaLog への代入が許可されるので問題なし）
 */
export function runEvlaSpace(args: { prompt: string; domain?: string }): any {
  const prompt = (args.prompt ?? "").toString();

  return {
    E: prompt,
    V:
      "AIが検討した候補:\n" +
      "① 氷資源が多いが傾斜が15°と急な地点\n" +
      "② 高台（ピーク・オブ・エターナルライト）：太陽光・通信が安定し地形も安全\n" +
      "③ クレーター縁：各指標が中程度でバランスは良いが決定打に欠ける",
    Λ:
      "安全性とミッション継続性を最優先し、②高台を選択。氷資源については、" +
      "着陸後に探査車で周辺クレーターを段階的に調査する方針とした。",
    Ǝ:
      "最終着陸地点は②高台に決定。比較案・評価指標・重み付け・選択理由をすべて EVΛƎ ログとして保存し、" +
      "後から意思決定過程を完全に検証できるようにした。"
  };
}
