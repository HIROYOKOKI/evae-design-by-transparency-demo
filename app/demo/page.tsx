// app/demo/page.tsx
"use client";

import Link from "next/link";

type Demo = {
  title: string;
  desc: string;
  href: string;
  status: "Live" | "Coming soon";
  tint: string; // rgba
  bar: string;  // rgba
};

export default function DemoHubPage() {
  const demos: Demo[] = [
    {
      title: "Medical (EN)",
      desc: "Conscious Loop demo for risk-aware medical decision support.",
      href: "/demo-med-en",
      status: "Live",
      tint: "rgba(139,92,246,0.14)", // violet
      bar: "rgba(139,92,246,0.75)",
    },
    {
      title: "Education (EN)",
      desc: "Conscious Loop demo for learning guidance and curriculum decisions.",
      href: "/demo-edu-en",
      status: "Live",
      tint: "rgba(56,189,248,0.14)", // sky
      bar: "rgba(56,189,248,0.75)",
    },
    {
      title: "Space Systems (EN)",
      desc: "Conscious Loop demo for mission planning and safety-critical trade-offs.",
      href: "/demo-space-en",
      status: "Live",
      tint: "rgba(34,211,238,0.14)", // cyan
      bar: "rgba(34,211,238,0.75)",
    },
    {
      title: "Autonomous Driving (EN)",
      desc: "Conscious Loop demo for safety-critical trade-offs and trace-before-action.",
      href: "/demo-auto-en",
      status: "Live",
      tint: "rgba(251,191,36,0.14)", // amber
      bar: "rgba(251,191,36,0.75)",
    },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ (Eeva) – Design-by-Transparency Demo Hub
        </h1>
        <p className="text-sm text-slate-300">
          This repository demonstrates the{" "}
          <span className="font-semibold">Conscious Loop</span> foundation of the EVΛƎ (Eeva) Framework.
          Choose a domain demo below.
        </p>
        <p className="text-xs text-slate-400">
          Note: Action Loop and Three-Path Feedback are not implemented in this public demo.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {demos.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="group relative overflow-hidden block rounded-2xl border border-slate-800 bg-slate-900/60 pl-6 pr-4 py-4 transition hover:border-slate-700 hover:bg-slate-900/80"
          >
            <div className="absolute left-0 top-0 z-10 h-full w-[12px]" style={{ backgroundColor: d.bar }} />
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: d.tint }} />

            <div className="relative flex items-center justify-between gap-3">
              <h2 className="text-base font-semibold text-slate-50">{d.title}</h2>
              <span
                className="text-[11px] px-2 py-1 rounded-full border text-slate-100"
                style={{ borderColor: d.bar, backgroundColor: "rgba(15,23,42,0.35)" }}
              >
                {d.status}
              </span>
            </div>

            <p className="relative mt-2 text-sm text-slate-300">{d.desc}</p>
            <p className="relative mt-3 text-xs text-slate-400 group-hover:text-slate-300 transition">
              Open → {d.href}
            </p>
          </Link>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h3 className="text-sm font-semibold text-slate-100">Name and Symbol</h3>
        <p className="mt-2 text-sm text-slate-300">
          EVΛƎ is pronounced <span className="font-semibold">“Eeva”</span>. The final character{" "}
          <span className="font-semibold">Ǝ</span> is called <span className="font-semibold">“Echo”</span>,
          representing Observation and structural trace recording.
        </p>
      </section>
    </div>
  );
}
