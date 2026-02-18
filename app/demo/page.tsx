// app/demo/page.tsx
"use client";

type DemoItem = {
  key: "med" | "edu" | "space" | "auto";
  title: string;
  desc: string;
  href: string;
  status: "Live";
  accent: {
    bar: string; // left bar + title color
    chipBorder: string;
    chipText: string;
    glowBg: string;
  };
};

export default function DemoHubPage() {
  const demos: DemoItem[] = [
    {
      key: "med",
      title: "Medical (EN)",
      desc: "Risk-aware medical decision support — Conscious Loop foundation.",
      href: "/demo-med-en",
      status: "Live",
      accent: {
        bar: "bg-violet-500",
        chipBorder: "border-violet-400/50",
        chipText: "text-violet-300",
        glowBg: "bg-violet-500/5",
      },
    },
    {
      key: "edu",
      title: "Education (EN)",
      desc: "Learning guidance and curriculum decisions — Conscious Loop foundation.",
      href: "/demo-edu-en",
      status: "Live",
      accent: {
        bar: "bg-sky-500",
        chipBorder: "border-sky-400/50",
        chipText: "text-sky-300",
        glowBg: "bg-sky-500/5",
      },
    },
    {
      key: "space",
      title: "Space Systems (EN)",
      desc: "Mission planning and safety trade-offs — Conscious Loop foundation.",
      href: "/demo-space-en",
      status: "Live",
      accent: {
        bar: "bg-cyan-500",
        chipBorder: "border-cyan-400/50",
        chipText: "text-cyan-300",
        glowBg: "bg-cyan-500/5",
      },
    },
    {
      key: "auto",
      title: "Autonomous Driving (EN)",
      desc: "Safety-critical driving decisions — Conscious Loop foundation.",
      href: "/demo-auto-en",
      status: "Live",
      accent: {
        bar: "bg-amber-500",
        chipBorder: "border-amber-400/50",
        chipText: "text-amber-300",
        glowBg: "bg-amber-500/5",
      },
    },
  ];

  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <h1 className="text-2xl md:text-3xl font-semibold">
          EVΛƎ (Eeva) – Design-by-Transparency Demo Hub
        </h1>
        <p className="text-sm text-slate-300">
          This public repository demonstrates the <span className="font-semibold">Conscious Loop</span>{" "}
          foundation of the EVΛƎ (Eeva) Framework. Choose a domain demo below.
        </p>
        <p className="text-xs text-slate-400">
          Note: Action Loop and Three-Path Feedback are not implemented in this public demo.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {demos.map((d) => (
          <a
            key={d.key}
            href={d.href}
            className={`group block rounded-2xl border border-slate-800 bg-slate-900/60 p-4 hover:bg-slate-900/80 transition relative overflow-hidden`}
          >
            {/* subtle glow */}
            <div
              className={`pointer-events-none absolute inset-0 ${d.accent.glowBg}`}
              aria-hidden="true"
            />

            <div className="relative flex items-start gap-3">
              {/* left accent bar */}
              <div className={`mt-1 h-10 w-1 rounded-full ${d.accent.bar}`} />

              <div className="flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h2 className={`text-base font-semibold ${d.accent.chipText}`}>
                    {d.title}
                  </h2>

                  <span
                    className={`text-[11px] px-2 py-1 rounded-full border ${d.accent.chipBorder} ${d.accent.chipText}`}
                  >
                    {d.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-300">{d.desc}</p>
                <p className="mt-3 text-xs text-slate-400">
                  Open → <span className="font-mono">{d.href}</span>
                </p>
              </div>
            </div>
          </a>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-800 bg-slate-900/40 p-4">
        <h3 className="text-sm font-semibold text-slate-100">Name and Symbol</h3>
        <p className="mt-2 text-sm text-slate-300">
          EVΛƎ is pronounced <span className="font-semibold">“Eeva”</span>. The final character{" "}
          <span className="font-semibold">Ǝ</span> is called <span className="font-semibold">“Echo”</span>, representing
          Observation and structural trace recording.
        </p>
      </section>
    </div>
  );
}
