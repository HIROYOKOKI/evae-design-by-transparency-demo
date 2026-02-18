// app/demo-auto-en/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { FlowConscious } from "@/components/FlowConscious";

type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

type Candidate = {
  id: string;
  title: string;
  why: string;
  expected: string;
  risk: RiskLevel;
  cost: "LOW" | "MED" | "HIGH";
  notes?: string[];
};

function riskBadgeClass(r: RiskLevel) {
  if (r === "HIGH") return "border-rose-400/50 text-rose-200 bg-rose-500/10";
  if (r === "MEDIUM") return "border-amber-400/50 text-amber-200 bg-amber-500/10";
  return "border-emerald-400/50 text-emerald-200 bg-emerald-500/10";
}

export default function DemoAutoEnPage() {
  // Ec: situation input
  const [scenario, setScenario] = useState<"pedestrian" | "cutin" | "blackice">("pedestrian");
  const [speedKmh, setSpeedKmh] = useState(42);
  const [road, setRoad] = useState<"dry" | "wet" | "icy">("wet");
  const [visibility, setVisibility] = useState<"good" | "poor">("poor");

  // Λc: user selection
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Ǝc: trace record (stored before action)
  const [trace, setTrace] = useState<any | null>(null);

<<<<<<< HEAD
  // ✅ チップ点灯用（選択 or commit のたびに一回流す）
=======
  // ✅ チップ点灯（選択 or Commit のたびに一回だけ流す）
>>>>>>> ae878a6 (Unify demo UI: add Conscious Loop chips and fix EVAE colors)
  const [animateFlow, setAnimateFlow] = useState(false);
  useEffect(() => {
    if (!selectedId && !trace) return;
    setAnimateFlow(true);
    const t = setTimeout(() => setAnimateFlow(false), 1800);
    return () => clearTimeout(t);
  }, [selectedId, trace]);

  const context = useMemo(() => {
    const friction = road === "dry" ? 0.9 : road === "wet" ? 0.6 : 0.25;
    const visFactor = visibility === "good" ? 1.0 : 0.75;
    const hazardBase = scenario === "pedestrian" ? 0.85 : scenario === "cutin" ? 0.65 : 0.75;

<<<<<<< HEAD
    // simple risk proxy
=======
>>>>>>> ae878a6 (Unify demo UI: add Conscious Loop chips and fix EVAE colors)
    const speedFactor = Math.min(1, Math.max(0.2, speedKmh / 80));
    const danger = Math.min(
      1,
      hazardBase * speedFactor * (1.1 - friction) * (1.1 - visFactor) + hazardBase * 0.2
    );

    return { friction, visFactor, danger };
  }, [scenario, speedKmh, road, visibility]);

  // Vc: possibility generation
  const candidates = useMemo<Candidate[]>(() => {
    const { friction, danger } = context;

    const hardBrakeRisk: RiskLevel = friction < 0.35 ? "HIGH" : friction < 0.6 ? "MEDIUM" : "LOW";
    const evasiveRisk: RiskLevel = danger > 0.75 ? "MEDIUM" : "LOW";
    const controlledBrakeRisk: RiskLevel = danger > 0.75 ? "MEDIUM" : "LOW";
    const minimalInterventionRisk: RiskLevel = danger > 0.7 ? "HIGH" : danger > 0.5 ? "MEDIUM" : "LOW";

    return [
      {
        id: "A",
        title: "Controlled braking + hazard lights",
        why: "Reduce speed while minimizing instability under uncertain traction.",
        expected: "Stable deceleration with improved controllability.",
        risk: controlledBrakeRisk,
        cost: "LOW",
        notes: ["Stays within lane", "Smooth decel profile"],
      },
      {
        id: "B",
        title: "Hard braking (maximum decel)",
        why: "Stop as fast as possible when time-to-collision is small.",
        expected: "Shortest stopping distance (if traction allows).",
        risk: hardBrakeRisk,
        cost: "LOW",
        notes: ["Skid risk on wet/icy roads", "High jerk / discomfort"],
      },
      {
        id: "C",
        title: "Evasive steering + moderate braking",
        why: "Avoid obstacle if full stop is unlikely in time.",
        expected: "Collision avoidance via path change.",
        risk: evasiveRisk,
        cost: "MED",
        notes: ["Requires safe adjacent space", "More complex control"],
      },
      {
        id: "D",
        title: "Minimal intervention (slight decel)",
        why: "Avoid overreaction when confidence is low; buy time to observe.",
        expected: "Stability preserved, but may fail to avoid hazard.",
        risk: minimalInterventionRisk,
        cost: "LOW",
        notes: ["Often unacceptable when danger is high"],
      },
    ];
  }, [context]);

<<<<<<< HEAD
  const selected = useMemo(
    () => candidates.find((c) => c.id === selectedId) || null,
    [candidates, selectedId]
  );
=======
  const selected = useMemo(() => candidates.find((c) => c.id === selectedId) || null, [candidates, selectedId]);
>>>>>>> ae878a6 (Unify demo UI: add Conscious Loop chips and fix EVAE colors)

  function commitTrace() {
    if (!selected) return;

    const now = new Date().toISOString();
    const record = {
      domain: "Autonomous Driving",
      loop: "Conscious Loop (public demo)",
      Ec: { scenario, speedKmh, road, visibility },
      Vc: candidates.map((c) => ({ id: c.id, title: c.title, risk: c.risk, cost: c.cost })),
      Lambda_c: {
        selectedId: selected.id,
        selectedTitle: selected.title,
        rationale: selected.why,
      },
      Echo_c: {
        timestamp: now,
        riskProxy: Number(context.danger.toFixed(3)),
        note: "This trace is recorded before any action execution.",
      },
    };

    setTrace(record);
  }

  const dangerLabel = context.danger > 0.75 ? "HIGH" : context.danger > 0.5 ? "MEDIUM" : "LOW";

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl md:text-3xl font-semibold">
            Autonomous Driving (EN) — Conscious Loop Demo
          </h1>
          <a
            href="/demo"
            className="text-xs px-3 py-2 rounded-full border border-slate-700 text-slate-200 hover:bg-slate-900/60 transition"
          >
            ← Back to Demo Hub
          </a>
        </div>

        <p className="text-sm text-slate-300">
          Demonstrates EVΛƎ (Eeva) <span className="font-semibold">Conscious Loop</span>:{" "}
          <span className="font-semibold">Ec → Vc → Λc → Ǝc (Echo)</span>. Execution and three-path feedback are
          omitted in this public repo.
        </p>

<<<<<<< HEAD
        {/* ✅ チップ（1色・順点灯） */}
        <div className="mt-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
          <div className="text-[11px] text-slate-400 mb-2">
            Conscious Loop (public): Ec → Vc → Λc → Ǝc
          </div>
=======
        {/* ✅ 追加：構造チップ（1色・順点灯） */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-3">
          <div className="text-[11px] text-slate-400 mb-2">Conscious Loop (public): Ec → Vc → Λc → Ǝc</div>
>>>>>>> ae878a6 (Unify demo UI: add Conscious Loop chips and fix EVAE colors)
          <FlowConscious running={animateFlow} color="#F59E0B" />
        </div>
      </header>

      {/* Ec */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-slate-100">Ec — Situation Input</h2>
          <span className="text-[11px] px-2 py-1 rounded-full border border-amber-400/40 text-amber-200 bg-amber-500/10">
            AUTO DOMAIN
          </span>
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          <label className="space-y-1">
            <div className="text-xs text-slate-400">Scenario</div>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value as any)}
              className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-sm text-slate-100"
            >
              <option value="pedestrian">Pedestrian crossing</option>
              <option value="cutin">Vehicle cut-in</option>
              <option value="blackice">Black ice detected</option>
            </select>
          </label>

          <label className="space-y-1">
            <div className="text-xs text-slate-400">Road condition</div>
            <select
              value={road}
              onChange={(e) => setRoad(e.target.value as any)}
              className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-sm text-slate-100"
            >
              <option value="dry">Dry</option>
              <option value="wet">Wet</option>
              <option value="icy">Icy</option>
            </select>
          </label>

          <label className="space-y-1">
            <div className="text-xs text-slate-400">Visibility</div>
            <select
              value={visibility}
              onChange={(e) => setVisibility(e.target.value as any)}
              className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-sm text-slate-100"
            >
              <option value="good">Good</option>
              <option value="poor">Poor</option>
            </select>
          </label>

          <label className="space-y-1">
            <div className="text-xs text-slate-400">Speed (km/h)</div>
            <input
              type="number"
              value={speedKmh}
              onChange={(e) => setSpeedKmh(Math.max(0, Math.min(160, Number(e.target.value || 0))))}
              className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-3 py-2 text-sm text-slate-100"
              min={0}
              max={160}
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
          <span>
            Risk proxy: <span className="text-slate-200">{context.danger.toFixed(3)}</span>
          </span>
          <span>
            {" "}
            / friction: <span className="text-slate-200">{context.friction.toFixed(2)}</span>
          </span>
          <span className={"px-2 py-1 rounded-full border " + riskBadgeClass(dangerLabel as any)}>
            Danger: {dangerLabel}
          </span>
        </div>
      </section>

      {/* Vc */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
        <h2 className="text-sm font-semibold text-slate-100">Vc — Possibility Generation</h2>

        <div className="grid gap-3 md:grid-cols-2">
          {candidates.map((c) => {
            const active = c.id === selectedId;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedId(c.id)}
                className={
                  "text-left rounded-2xl border p-4 transition " +
                  (active
                    ? "border-amber-400/50 bg-amber-500/10"
                    : "border-slate-800 bg-slate-950/30 hover:bg-slate-950/50")
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="font-semibold text-slate-100">{c.title}</div>
                  <span className={"text-[11px] px-2 py-1 rounded-full border " + riskBadgeClass(c.risk)}>
                    {c.risk}
                  </span>
                </div>
                <div className="mt-2 text-sm text-slate-300">{c.why}</div>
                <div className="mt-2 text-xs text-slate-400">Expected: {c.expected}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Λc → Ǝc */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 space-y-3">
        <h2 className="text-sm font-semibold text-slate-100">Λc → Ǝc (Echo) — Selection & Trace Commit</h2>

        {!selected ? (
          <p className="text-sm text-slate-300">Select one candidate above to proceed.</p>
        ) : (
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/30 p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400">Selected</div>
                  <div className="text-base font-semibold text-slate-100">{selected.title}</div>
                  <div className="mt-1 text-sm text-slate-300">{selected.why}</div>
                </div>
                <span className={"text-[11px] px-2 py-1 rounded-full border " + riskBadgeClass(selected.risk)}>
                  {selected.risk}
                </span>
              </div>
<<<<<<< HEAD
=======

>>>>>>> ae878a6 (Unify demo UI: add Conscious Loop chips and fix EVAE colors)
              {selected.notes?.length ? (
                <ul className="mt-3 list-disc pl-5 text-xs text-slate-400 space-y-1">
                  {selected.notes.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
              ) : null}
            </div>

            <button
              onClick={commitTrace}
              className="w-full rounded-2xl border border-amber-400/40 bg-amber-500/10 px-4 py-3 text-sm font-semibold text-amber-100 hover:bg-amber-500/15 transition"
            >
              Commit Ǝ (Echo) Trace — Record reason before action
            </button>

            {trace ? (
              <div className="rounded-2xl border border-slate-800 bg-slate-950/40 p-4">
                <div className="text-xs text-slate-400 mb-2">
                  Stored Trace (example JSON) — kept for explanation and auditing
                </div>
                <pre className="overflow-auto text-xs text-slate-200 leading-relaxed">
{JSON.stringify(trace, null, 2)}
                </pre>
              </div>
            ) : null}
          </div>
        )}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <div className="text-xs text-slate-400">
<<<<<<< HEAD
          Note: This demo intentionally stops at Ǝ (Echo). Execution and three-path feedback remain private /
          domain-specific and are not included in this public repository.
=======
          Note: This demo intentionally stops at Ǝ (Echo). Execution and three-path feedback are not included here.
>>>>>>> ae878a6 (Unify demo UI: add Conscious Loop chips and fix EVAE colors)
        </div>
      </section>
    </div>
  );
}
