// app/demo/page.tsx
"use client";

export default function DemoHub() {
  const cards = [
    { href: "/demo-med-en", title: "Medical Demo (EN)", desc: "EVΛƎ log in a clinical scenario." },
    { href: "/demo-edu-en", title: "Education Demo (EN)", desc: "EVΛƎ log in an education scenario." },
    { href: "/demo-space-en", title: "Space Demo (EN)", desc: "EVΛƎ log in a space mission scenario." },
    { href: "/demo-auto-en", title: "Autonomous Driving (EN)", desc: "Conscious Loop demo (Ec→Vc→Λc→Ǝc)." },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-semibold text-slate-50">EVΛƎ Demo Hub</h1>
        <p className="text-sm text-slate-300">
          Public demos showcasing Design-by-Transparency (EVΛƎ). Choose a domain below.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2">
        {cards.map((c) => (
          <a
            key={c.href}
            href={c.href}
            className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 hover:bg-slate-900/70 transition"
          >
            <div className="text-base font-semibold text-slate-100">{c.title}</div>
            <div className="mt-1 text-sm text-slate-400">{c.desc}</div>
            <div className="mt-3 text-xs text-slate-400">Open →</div>
          </a>
        ))}
      </div>
    </div>
  );
}
