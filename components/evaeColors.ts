// components/evaeColors.ts
export type EVAEKey = "E" | "V" | "L" | "O"; // L = Lambda, O = Observation

export const EVAE_COLORS: Record<
  EVAEKey,
  { solid: string; tint: string }
> = {
  E: { solid: "#22c55e", tint: "rgba(34,197,94,0.12)" },   // green
  V: { solid: "#3b82f6", tint: "rgba(59,130,246,0.12)" },  // blue
  L: { solid: "#f59e0b", tint: "rgba(245,158,11,0.12)" },  // amber
  O: { solid: "#a855f7", tint: "rgba(168,85,247,0.12)" },  // purple
};
