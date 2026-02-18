// lib/evla/engine.ts
import {
  EvlaLog,
  EvlaRunRequest,
  Impulse,
  Possibility,
  Choice,
  Observation,
} from "./types";

function createImpulse(req: EvlaRunRequest): Impulse {
  return {
    text: req.prompt.trim(),
    domain: "MEDICAL",
    timestamp: new Date().toISOString(),
  };
}

function generatePossibilities(impulse: Impulse): Possibility[] {
  const base = impulse.text || "患者の症状";

  return [
    {
      id: 1,
      label: "安全優先シナリオ",
      hypothesis: `${base} に対し、追加のCT検査と血液検査を行い、患者安全を最優先とする。`,
      score: 0.92,
      risk: 0.18,
    },
    {
      id: 2,
      label: "積極介入シナリオ",
      hypothesis: `${base} を重大疾患の可能性として扱い、呼吸器専門医へ即時紹介する。`,
      score: 0.88,
      risk: 0.27,
    },
    {
      id: 3,
      label: "保守的シナリオ",
      hypothesis: `${base} は低リスクと判断し、数週間後の再撮影で経過観察を行う。`,
      score: 0.75,
      risk: 0.12,
    },
  ];
}

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
    reason: `医療安全性と重大疾患の見逃しリスクを比較し、「score - risk」が最大のシナリオ（ID: ${best.id}）を選択。`,
    criteria: [
      "医療AIでは重大疾患の見逃しリスクを最小化することが最優先",
      "score（期待効果）が高いほど有利",
      "risk（悪化・見逃しの確率）が高いほど不利",
      "score - risk が最大のシナリオを選択",
    ],
  };
}

function observe(
  impulse: Impulse,
  possibilities: Possibility[],
  choice: Choice
): Observation {
  const selected = possibilities.find((p) => p.id === choice.selectedId)!;

  return {
    outcome: selected.hypothesis,
    explanation: [
      `● 医師の診断要求（E）: 「${impulse.text}」`,
      `● AIが生成した診断仮説（V）は3通り。`,
      `● Λ（選択）では score - risk に基づき、最も重大疾患の見逃しが少ない選択肢を採用。`,
      `● Ǝ（観測）では、この診断方針を「最終提案」として確定。`,
    ].join("\n"),
    notes:
      "※ このロジックは医療AIにおける透明性の概念実証を目的とした最小版。実運用では、ガイドラインや医療統計による補正が可能。",
  };
}

export function runEvla(req: EvlaRunRequest): EvlaLog {
  const impulse = createImpulse(req);
  const possibilities = generatePossibilities(impulse);
  const choice = selectPossibility(possibilities);
  const observation = observe(impulse, possibilities, choice);

  return { impulse, possibilities, choice, observation };
}
