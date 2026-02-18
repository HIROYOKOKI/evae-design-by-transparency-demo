// components/Flow.tsx
"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { key: "E", label: "E — Impulse " },
  { key: "V", label: "V — Possibility " },
  { key: "Λ", label: "Λ — Choice " },
  { key: "Ǝ", label: "Ǝ — Observation " },
] as const;

const EVAE = {
  E: "#FF4500",
  V: "#1E3A8A",
  "Λ": "#84CC16",
  "Ǝ": "#B833F5",
} as const;

type EvKey = keyof typeof EVAE;

interface FlowProps {
  running: boolean;
}

export function Flow({ running }: FlowProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!running) {
      setActiveIndex(null);
      return;
    }
    let i = 0;
    setActiveIndex(0);
    const id = setInterval(() => {
      i += 1;
      if (i >= STEPS.length) {
        clearInterval(id);
        return;
      }
      setActiveIndex(i);
    }, 400);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className="flex items-center justify-between gap-2 text-xs md:text-sm">
      {STEPS.map((step, index) => {
        const isActive = activeIndex === index;
        const color = EVAE[step.key as EvKey];

        return (
          <div key={step.key} className="flex items-center gap-2 flex-1">
            <div
              className={[
                "w-8 h-8 rounded-full flex items-center justify-center font-semibold border transition-shadow",
                isActive
                  ? "text-slate-950 shadow"
                  : "bg-slate-900 text-slate-200 border-slate-600",
              ].join(" ")}
              style={
                isActive
                  ? {
                      backgroundColor: color,
                      borderColor: color,
                    }
                  : undefined
              }
            >
              {step.key}
            </div>

            <span
              className="hidden sm:inline"
              style={{ color: isActive ? color : "#E2E8F0" }} // slate-200
            >
              {step.label}
            </span>

            {index < STEPS.length - 1 && (
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    index < (activeIndex ?? -1)
                      ? `linear-gradient(to right, ${color}, rgba(255,255,255,0))`
                      : "linear-gradient(to right, #475569, #1f2937)", // slate-600 -> slate-800
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
