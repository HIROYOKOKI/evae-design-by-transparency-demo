// lib/evla/engine-space-en.ts

// UI テキストを英語にした宇宙ミッション用エンジン。
// Medical / Edu と同じく、ここはフロント表示用＋簡易ログ生成だけ担当します。

export type SpaceEnPhaseCode = "E" | "V" | "Λ" | "Ǝ";

export interface SpaceEnPhase {
  code: SpaceEnPhaseCode;
  label: string;
  description: string;
  placeholder: string;
}

export const spaceEngineEn = {
  title: "EVΛƎ Space AI Demo — Lunar Mission Transparency Log",
  subtitle:
    "This demo shows how the EVΛƎ framework can make an AI’s reasoning visible " +
    "when selecting a landing site for a lunar mission.",
  phases: <SpaceEnPhase[]>[
    {
      code: "E",
      label: "E — Impulse (Mission objective)",
      description:
        "Define the core mission objective – what you want the AI to achieve. " +
        "This is the initial impulse that guides all later decisions.",
      placeholder:
        "Example: Choose a safe landing site near the lunar south pole that balances " +
        "sunlight, communication, and terrain conditions."
    },
    {
      code: "V",
      label: "V — Possibility (Options considered)",
      description:
        "Record the different candidate landing sites or trajectories that the AI " +
        "compares. This makes the space of possibilities transparent.",
      placeholder:
        "Example: (1) Crater floor with rich ice deposits but steep slopes; " +
        "(2) High ridge with stable sunlight and good line of sight for communication; " +
        "(3) Crater rim with moderate values for all factors."
    },
    {
      code: "Λ",
      label: "Λ — Choice (Selected option and rationale)",
      description:
        "Describe which option was selected and why. What criteria were weighted " +
        "most heavily in the final decision?",
      placeholder:
        "Example: Safety was prioritized, so the high ridge was selected due to " +
        "stable sunlight, reliable communication, and safe terrain. Water ice will " +
        "be investigated later via rover excursions."
    },
    {
      code: "Ǝ",
      label: "Ǝ — Observation (Final transparency log)",
      description:
        "Summarize the final decision and how it will be stored as a transparency " +
        "log, so the reasoning can be audited later.",
      placeholder:
        "Example: The ridge was chosen as the final landing site. All candidate " +
        "options, evaluation criteria, weights, and reasons were stored as an EVΛƎ " +
        "log, enabling full post-mission review of the AI’s decision process."
    }
  ]
};

/**
 * EVΛƎ Space（EN）用の簡易ラン関数。
 * 返り値は any にしておき、/api 側では EvlaLog としてそのまま扱えるようにします。
 * 必要になったらここを GPT 連携版に差し替えればOK。
 */
export function runEvlaSpaceEn(args: { prompt: string; domain?: string }): any {
  const prompt = (args.prompt ?? "").toString();

  return {
    E: prompt,
    V:
      "The AI compared three main options:\n" +
      "(1) A crater floor with rich ice deposits but steep 15° slopes and higher landing risk.\n" +
      "(2) A high ridge (peak of eternal light) with very stable sunlight, good line of sight for communication, and safe terrain.\n" +
      "(3) A crater rim with moderate levels of ice, sunlight, communication quality and safety.",
    Λ:
      "Safety and mission continuity were prioritized. Therefore, option (2) — the high ridge — " +
      "was selected. Water ice exploration is planned as a follow-up using a rover after landing.",
    Ǝ:
      "The final landing site is the high ridge. All candidate options, evaluation criteria, " +
      "weights and reasons were stored as an EVΛƎ transparency log so that the entire decision " +
      "path can be reviewed and audited later."
  };
}
