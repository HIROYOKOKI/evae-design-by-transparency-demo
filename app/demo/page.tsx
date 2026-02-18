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
  }
> = {
  medical: {
    chipBorder: "border-violet-400/50",
    chipText: "text-violet-200",
    leftBar: "bg-violet-500/70",
    titleText: "text-violet-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(167,139,250,0.35),0_0_28px_rgba(167,139,250,0.18)]",
  },
  education: {
    chipBorder: "border-sky-400/50",
    chipText: "text-sky-200",
    leftBar: "bg-sky-500/70",
    titleText: "text-sky-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(56,189,248,0.35),0_0_28px_rgba(56,189,248,0.18)]",
  },
  space: {
    chipBorder: "border-cyan-400/50",
    chipText: "text-cyan-200",
    leftBar: "bg-cyan-500/70",
    titleText: "text-cyan-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(34,211,238,0.35),0_0_28px_rgba(34,211,238,0.18)]",
  },
  auto: {
    chipBorder: "border-amber-400/50",
    chipText: "text-amber-200",
    leftBar: "bg-amber-500/70",
    titleText: "text-amber-100",
    glow: "hover:shadow-[0_0_0_1px_rgba(251,191,36,0.35),0_0_28px_rgba(251,191,36,0.18)]",
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
      desc: "Autonomous driving demo page (foundation layer).",
      href: "/demo-auto-en",
      // いったんは Coming soon のままでもOK。Autoページが実装できたら Live に変える。
      status: "Coming soon",
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
