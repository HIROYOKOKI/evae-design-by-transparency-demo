// lib/evla/engine-edu-en.ts
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
    domain: "MEDICAL", // 型合わせのためそのまま
    timestamp: new Date().toISOString(),
  };
}

function generatePossibilities(impulse: Impulse): Possibility[] {
  const base = impulse.text || "this essay";

  return [
    {
      id: 1,
      label: "Responsible AI Use Plan",
      hypothesis: `${base}: Use AI only for brainstorming, outlining, and idea structuring. All paragraphs are written by the student. Any AI-assisted parts must be declared at the end of the essay.`,
      score: 0.90,
      risk: 0.15,
    },
    {
      id: 2,
      label: "Critical Verification Plan",
      hypothesis: `${base}: Use AI for organizing information and generating candidate arguments, but all facts, citations, and numerical data must be verified using credible academic sources before writing.`,
      score: 0.88,
      risk: 0.12,
    },
    {
      id: 3,
      label: "Collaborative Drafting Plan (Caution)",
      hypothesis: `${base}: AI may help produce rough drafts, but all wording must be rewritten by the student. AI-generated text must not dominate the final essay to avoid academic misconduct.`,
      score: 0.78,
      risk: 0.30,
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
    reason: `Compared academic integrity risks and learning value. Selected the scenario with the highest “score − risk” (ID: ${best.id}).`,
    criteria: [
      "Avoid over-reliance on AI and preserve the student’s own thinking",
      "Ensure all factual information is verified using credible sources",
      "Avoid plagiarism and AI-generated text dominating the final essay",
      "Enable the student to clearly explain how AI was used",
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
      `● E (Impulse): “${impulse.text}”`,
      `● V (Possibilities): AI generated 3 possible usage plans.`,
      `● Λ (Choice): Selected the scenario with the highest score − risk balance.`,
      `● Ǝ (Observation): This serves as the AI transparency log for the submitted essay.`,
    ].join("\n"),
    notes:
      "※ This logic is a simplified model for teaching responsible AI usage in academic settings. In actual courses, follow specific institutional policies.",
  };
}

export function runEvlaEduEn(req: EvlaRunRequest): EvlaLog {
  const impulse = createImpulse(req);
  const possibilities = generatePossibilities(impulse);
  const choice = selectPossibility(possibilities);
  const observation = observe(impulse, possibilities, choice);

  return { impulse, possibilities, choice, observation };
}
