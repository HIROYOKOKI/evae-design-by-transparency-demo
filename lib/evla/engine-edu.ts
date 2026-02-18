// lib/evla/engine-edu.ts
import {
  EvlaLog,
  EvlaRunRequest,
  Impulse,
  Possibility,
  Choice,
  Observation,
} from "./types";

/**
 * E — 衝動（AIに任せたいこと）
 * 学生が「レポートでAIに手伝ってほしい内容」をそのまま衝動として扱う
 */
function createImpulse(req: EvlaRunRequest): Impulse {
  return {
    text: req.prompt.trim(),
    // domain 型が "MEDICAL" 固定の想定なのでそのままにしておく
    domain: "MEDICAL",
    timestamp: new Date().toISOString(),
  };
}

/**
 * V — 生成される「AIの使い方プラン」3つ
 */
function generatePossibilities(impulse: Impulse): Possibility[] {
  const base = impulse.text || "このレポート";

  return [
    {
      id: 1,
      label: "責任あるAI利用プラン",
      hypothesis: `${base} について、AIには「構成案と論点整理」のみを依頼し、本文は自分で執筆する。AIが提案したアウトラインは参考として扱い、最終的な主張・構成は自分の判断で決める。レポート末尾にAI利用箇所を明示する。`,
      score: 0.9,
      risk: 0.15,
    },
    {
      id: 2,
      label: "検証重視プラン",
      hypothesis: `${base} に関する情報収集と要点整理にAIを用いるが、重要な事実・数値・引用は必ず原典や複数の資料で検証する。AIが提示した参考文献や主張は「仮説」として扱い、自分で信頼できるソースを確認してから採用する。`,
      score: 0.88,
      risk: 0.12,
    },
    {
      id: 3,
      label: "共同執筆プラン（要注意）",
      hypothesis: `${base} の下書きをAIと共同で作成する。ただし、そのまま提出するのではなく、文章の意味・論理・事実を自分で点検し、自分の言葉に書き換える。AIが生成した文章の割合が高くなりすぎると学術不正とみなされるリスクがある。`,
      score: 0.78,
      risk: 0.3,
    },
  ];
}

/**
 * Λ — 選択とその理由
 * score - risk を最大にするプランを選ぶ
 */
function selectPossibility(possibilities: Possibility[]): Choice {
  let best = possibilities[0];
  let bestVal = best.score - best.risk;

  for (const p of possibilities.slice(1)) {
    const v = p.score - p.risk;
    if (v > bestVal) {
      best = p;
      bestVal = v;
    }
  }

  return {
    selectedId: best.id,
    reason: `学則違反のリスク（学術不正・AI丸投げ）と、学習効果や情報の信頼性を比較し、「score − risk」が最大のシナリオ（ID: ${best.id}）を選択。`,
    criteria: [
      "AIに丸投げせず、自分の思考や表現が残ることを最優先した",
      "事実の誤りやハルシネーションを検証するステップが含まれていること",
      "学則やシラバスで禁じられている行為（無申告のAI利用・盗用）を避けられること",
      "レポート提出時に、AIをどのように使ったか説明できること",
    ],
  };
}

/**
 * Ǝ — 観測（最終的なAI利用方針のログ）
 * レポートに添付できる「AI利用透明性ログ」のイメージ
 */
function observe(
  impulse: Impulse,
  possibilities: Possibility[],
  choice: Choice
): Observation {
  const selected = possibilities.find((p) => p.id === choice.selectedId)!;

  const explanationLines = [
    `● E（衝動／AIに任せたいこと）: 「${impulse.text}」`,
    "● V（可能性／AIの使い方プラン）は3通り生成された。",
    `● Λ（選択）では、学術的不正リスクと学習効果のバランスから、score − risk が最大のシナリオ（ID: ${selected.id}）を採用。`,
    "● Ǝ（観測）では、このAI利用方針を「レポートでのAI利用ログ」として保存し、提出時に開示できる形にする。",
  ];

  return {
    outcome: selected.hypothesis,
    explanation: explanationLines.join("\n"),
    notes:
      "※ このロジックは、レポート作成におけるAI利用の透明性と倫理的な活用を学ぶための概念実証です。実際の運用では、各大学の学則や授業ごとのルールに合わせて調整してください。",
  };
}

/**
 * 教育版 EVΛƎ 実行エンジン
 */
export function runEvlaEdu(req: EvlaRunRequest): EvlaLog {
  const impulse = createImpulse(req);
  const possibilities = generatePossibilities(impulse);
  const choice = selectPossibility(possibilities);
  const observation = observe(impulse, possibilities, choice);

  return { impulse, possibilities, choice, observation };
}
