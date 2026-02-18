// lib/evla/engine-en.ts
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
  const base = impulse.text || "the patient's condition";

  return [
    {
      id: 1,
      label: "Safety-First Scenario",
      hypothesis: `${base}. Recommend additional CT imaging and blood tests to prioritize patient safety and avoid missing serious illness.`,
      score: 0.92,
      risk: 0.18,
    },
    {
      id: 2,
      label: "Proactive Intervention Scenario",
      hypothesis: `${base}. Treat as having a significant probability of severe disease and refer immediately to a respiratory specialist.`,
      score: 0.88,
      risk: 0.27,
    },
    {
      id: 3,
      label: "Conservative Observation Scenario",
      hypothesis: `${base}. Judged as low risk. Recommend follow-up imaging in several weeks to monitor changes.`,
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
    reason: `Compared safety and the risk of missing severe illness. Selected the scenario with the highest “score − risk” value (ID: ${best.id}).`,
    criteria: [
      "In medical AI, minimizing the risk of missing severe illness is the top priority",
      "Higher score = greater expected benefit",
      "Higher risk = higher probability of deterioration or missed diagnosis (less favorable)",
      "Chosen scenario had the maximum “score − risk”",
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
      `● E (Impulse): Doctor's request → “${impulse.text}”`,
      `● V (Possibilities): AI generated three diagnostic hypotheses.`,
      `● Λ (Choice): Selected based on highest “score − risk”, minimizing chance of missing severe illness.`,
      `● Ǝ (Observation): This clinical strategy is finalized as the AI's transparent proposal.`,
    ].join("\n"),
    notes:
      "※ This logic is a minimal proof-of-concept for transparency in medical AI. In real deployment, clinical guidelines and statistical models can be incorporated.",
  };
}

export function runEvlaEn(req: EvlaRunRequest): EvlaLog {
  const impulse = createImpulse(req);
  const possibilities = generatePossibilities(impulse);
  const choice = selectPossibility(possibilities);
  const observation = observe(impulse, possibilities, choice);

  return { impulse, possibilities, choice, observation };
}
