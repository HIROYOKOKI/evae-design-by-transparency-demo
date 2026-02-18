// app/demo-auto-en/page.tsx
"use client";

export default function DemoAutoEn() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-semibold">
        AUTO ROUTE OK — /demo-auto-en
      </h1>
      <p className="text-sm text-slate-300">
        If you can see this page, routing is correct. Next step: replace this with the full
        Autonomous Driving Conscious Loop demo.
      </p>
      <a
        href="/demo"
        className="inline-flex text-xs px-3 py-2 rounded-full border border-slate-700 text-slate-200 hover:bg-slate-900/60 transition"
      >
        ← Back to Demo Hub
      </a>
    </div>
  );
}
