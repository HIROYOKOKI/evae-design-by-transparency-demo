// app/demo/page.tsx
"use client";

type Demo = {
  title: string;
  desc: string;
  href: string;
  status: "Live" | "Coming soon";
  domain: "medical" | "education" | "space" | "auto";
};

const DOMAIN_STYLE: Record<
  Demo["domain"],
  {
    chipBorder: string;
    chipText: string;
    leftBar: string;
    titleText: string;
    glow: string;
    tintBg: string;
  }
> = {
  medical: {
    chipBorder: "border-violet-400/50",
    chipText: "text-violet-200",
    leftBar: "bg-violet-500/70",
    titleText: "text-violet-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_28px_rgba(167,139,250,0.18)]",
    tintBg: "bg-violet-500/5",
  },
  education: {
    chipBorder: "border-sky-400/50",
    chipText: "text-sky-200",
    leftBar: "bg-sky-500/70",
    titleText: "text-sky-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_rgba(56,189,248,0.18)]",
    tintBg: "bg-sky-500/5",
  },
  space: {
    chipBorder: "border-cyan-400/50",
    chipText: "text-cyan-200",
    leftBar: "bg-cyan-500/70",
    titleText: "text-cyan-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_28px_rgba(34,211,238,0.18)]",
    tintBg: "bg-cyan-500/5",
  },
  auto: {
    chipBorder: "border-amber-400/50",
    chipText: "text-amber-200",
    leftBar: "bg-amber-500/70",
    titleText: "text-amber-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(251,191,36,0.35),0_0_28px_rgba(251,191,36,0.18)]",
    tintBg: "bg-amber-500/5",
  },
};

export default function DemoHubPage() {
  const demos: Demo[] = [
    {
      title: "Medical (EN)",
      desc: "Conscious Loop demo for risk-aware medical decision support.",
      href: "/demo-med-en",
      status: "Live",
      domain: "medical",
    },
    {
      title: "Education (EN)",
      desc: "Conscious Loop demo for learning guidance and curriculum decisions.",
      href: "/demo-edu-en",
      status: "Live",
      domain: "education",
    },
    {
      title: "Space Systems (EN)",
      desc: "Conscious Loop demo for mission planning and safety-critical trade-offs.",
      href: "/demo-space-en",
      status: "Live",
      domain: "space",
    },
    {
      title: "Autonomous Driving (EN)",
      desc: "Conscious Loop demo for safety-critical trade-offs and trace-before-action.",
      href: "/demo-auto-en",
      status: "Live",
      domain: "auto",
    },
  ];

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
        {demos.map((d) => {
          const s = DOMAIN_STYLE[d.domain];
          const isLive = d.status === "Live";
          return (
            <a
              key={d.href}
              href={d.href}
              className={
                "group relative block overflow-hidden rounded-2xl border border-slate-800 " +
                "bg-slate-900/60 " +
                s.tintBg +
                " p-4 transition hover:bg-slate-900/80 " +
                s.glow
              }
              aria-label={`Open demo: ${d.title}`}
            >
              <div className={"absolute left-0 top-0 z-10 h-full w-[10px] " + s.leftBar} />

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100">
                <div className="absolute -top-24 left-1/2 h-48 w-[520px] -translate-x-1/2 rounded-full bg-white/5 blur-3xl" />
              </div>

              <div className="flex items-start justify-between gap-3">
                <h2 className={"text-base font-semibold " + s.titleText}>{d.title}</h2>
                <span
                  className={
                    "text-[11px] px-2 py-1 rounded-full border " +
                    (isLive
                      ? "border-emerald-400/50 text-emerald-300"
                      : "border-slate-600 text-slate-300")
                  }
                >
                  {d.status}
                </span>
              </div>

              <p className="mt-2 text-sm text-slate-300">{d.desc}</p>

              <div className="mt-3 flex items-center gap-2">
                <span
                  className={
                    "text-[11px] px-2 py-1 rounded-full border " + s.chipBorder + " " + s.chipText
                  }
                >
                  {d.domain.toUpperCase()}
                </span>
                <p className="text-xs text-slate-400">Open → {d.href}</p>
              </div>
            </a>
          );
        })}
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
