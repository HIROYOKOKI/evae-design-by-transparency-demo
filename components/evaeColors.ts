// components/evaeColors.ts
export const EVAE_COLORS = {
  E: "#FF4500",
  V: "#1E3A8A",
  "Λ": "#84CC16",
  "Ǝ": "#B833F5",
} as const;

export type EVAEKey = keyof typeof EVAE_COLORS;
