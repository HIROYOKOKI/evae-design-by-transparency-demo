// components/FlowConscious.tsx
"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { key: "Ec", label: "Ec" },
  { key: "Vc", label: "Vc" },
  { key: "Λc", label: "Λc" },
  { key: "Ǝc", label: "Ǝc" },
] as const;

export function FlowConscious({
  running,
  color = "#F59E0B",
}: {
  running: boolean;
  color?: string;
}) {
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

        return (
          <div key={step.key} className="flex items-center gap-2 flex-1">
            <div
              className={[
                "min-w-[44px] h-8 rounded-full flex items-center justify-center font-semibold border transition-shadow",
                isActive
                  ? "text-slate-950 shadow"
                  : "bg-slate-900 text-slate-200 border-slate-600",
              ].join(" ")}
              style={isActive ? { backgroundColor: color, borderColor: color } : undefined}
            >
              {step.label}
            </div>

            {index < STEPS.length - 1 && (
              <div
                className="flex-1 h-px"
                style={{
                  background:
                    index < (activeIndex ?? -1)
                      ? `linear-gradient(to right, ${color}, rgba(255,255,255,0))`
                      : "linear-gradient(to right, #475569, #1f2937)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
