// app/api/run/[domain]/route.ts
import { NextResponse } from "next/server";
import type { EvlaRunRequest, EvlaRunResponse } from "@/lib/evla/types";

import { runEvla } from "@/lib/evla/engine";
import { runEvlaEn } from "@/lib/evla/engine-en";

export const runtime = "edge";

type DomainSlug = "med" | "edu" | "space" | "auto";
type DomainKey = "MEDICAL" | "EDUCATION" | "SPACE" | "AUTO";
type LangKey = "EN" | "JA";

/**
 * Map /api/run/[domain] -> engine domain keys.
 * Note: current engines/types are MEDICAL-centric; we keep compatibility.
 * We'll pass a base domain and let engine layer adjust if needed.
 */
function mapDomain(slug: string): { domain: DomainKey; lang: LangKey } {
  // Accept both short and legacy long forms
  const s = slug.toLowerCase();

  if (s === "med" || s === "medical") return { domain: "MEDICAL", lang: "EN" };
  if (s === "edu" || s === "education") return { domain: "EDUCATION", lang: "EN" };
  if (s === "space") return { domain: "SPACE", lang: "EN" };
  if (s === "auto" || s === "autonomous" || s === "driving") return { domain: "AUTO", lang: "EN" };

  // default
  return { domain: "MEDICAL", lang: "EN" };
}

export async function POST(
  req: Request,
  ctx: { params: Promise<{ domain: string }> }
) {
  try {
    const { domain: domainParam } = await ctx.params;

    const body = (await req.json()) as Partial<EvlaRunRequest>;
    const prompt = (body.prompt ?? "").toString();

    if (!prompt.trim()) {
      return NextResponse.json({ error: "prompt is required" }, { status: 400 });
    }

    const mapped = mapDomain(domainParam);

    // ✅ compatibility: keep baseDomain typed as EvlaRunRequest["domain"].
    // If your types don't include EDUCATION/SPACE/AUTO yet,
    // we still pass "MEDICAL" and let the engine decide output shape.
    const baseDomain: EvlaRunRequest["domain"] =
      // @ts-expect-error if domain union is currently "MEDICAL" only
      mapped.domain ?? "MEDICAL";

    // EN only public demo
    const log = runEvlaEn({ prompt, domain: baseDomain });

    const res: EvlaRunResponse = { log };
    return NextResponse.json(res);
  } catch (err) {
    console.error("run/[domain] error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
