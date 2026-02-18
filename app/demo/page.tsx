// app/demo/page.tsx
"use client";

export default function DemoHubPage() {
  const demos = [
    {
      title: "Medical (EN)",
      desc: "Conscious Loop demo for risk-aware medical decision support.",
      href: "/demo-med-en",
      status: "Live",
    },
    {
      title: "Education (EN)",
      desc: "Conscious Loop demo for learning guidance and curriculum decisions.",
      href: "/demo-edu-en",
      status: "Live",
    },
    {
      title: "Space Systems (EN)",
      desc: "Conscious Loop demo for mission planning and safety-critical trade-offs.",
      href: "/demo-space-en",
      status: "Live",
    },
    {
      title: "Autonomous Driving (EN)",
      desc: "Conscious Loop demo for safety-critical trade-offs and trace-before-action.",
      href: "/demo-auto-en",
      status: "Live",
    },
  ] as const;

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ (Eeva) – Design-by-Transparency Demo Hub
        </h1>
        <p className="text-sm text-slate-300">
          This repository demonstrates the <span className="font-semibold">Conscious Loop</span>{" "}
          foundation of the EVΛƎ (Eeva) Framework. Choose a domain demo below.
        </p>
        <p className="text-xs text-slate-400">
          Note: Action Loop and Three-Path Feedback are not implemented in this public demo.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {demos.map((d) => (
          <a
            key={d.href}
            href={d.href}
            className={
  "block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 transition hover:bg-slate-900/80 " +
  (d.href === "/demo-med-en"
    ? "bg-violet-500/5"
    : d.href === "/demo-edu-en"
    ? "bg-sky-500/5"
    : d.href === "/demo-space-en"
    ? "bg-cyan-500/5"
    : "bg-amber-500/5")
}
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-50">{d.title}</h2>
              <span
                className={
                  "text-[11px] px-2 py-1 rounded-full border " +
                  (d.status === "Live"
                    ? "border-emerald-400/50 text-emerald-300"
                    : "border-slate-600 text-slate-300")
                }
              >
                {d.status}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{d.desc}</p>
            <p className="mt-3 text-xs text-slate-400">Open → {d.href}</p>
          </a>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h3 className="text-sm font-semibold text-slate-100">Name and Symbol</h3>
        <p className="mt-2 text-sm text-slate-300">
          EVΛƎ is pronounced <span className="font-semibold">“Eeva”</span>. The final character{" "}
          <span className="font-semibold">Ǝ</span> is called{" "}
          <span className="font-semibold">“Echo”</span>, representing Observation and structural trace recording.
        </p>
      </section>
    </div>
  );
}
