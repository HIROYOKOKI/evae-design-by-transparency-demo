// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "EVΛƎ Medical Demo — Design-by-Transparency",
  description:
    "Minimal medical-AI demo of the EVΛƎ (Eeva) Framework with Design-by-Transparency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-slate-800 px-4 py-3">
            <div className="max-w-4xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold tracking-[0.2em]">
                  EVΛƎ
                </span>
                <span className="text-xs text-slate-400">
            : Design-by-Transparency Demo
                </span>
              </div>
            </div>
          </header>
          <main className="flex-1 px-4 py-6">
            <div className="max-w-4xl mx-auto">{children}</div>
          </main>
          <footer className="border-t border-slate-800 px-4 py-3 text-xs text-slate-500">
            <div className="max-w-4xl mx-auto flex justify-between">
              <span>EVΛƎ Framework (Eeva)</span>
              <span>Amuletplus G.K.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
