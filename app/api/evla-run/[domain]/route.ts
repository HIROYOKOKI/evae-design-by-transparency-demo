// app/api/run/[domain]/route.ts
import { NextResponse } from "next/server";
import type { EvlaRunRequest, EvlaRunResponse } from "@/lib/evla/types";

import { runEvlaEn } from "@/lib/evla/engine-en";

export const runtime = "edge";

type DomainKey = "MEDICAL" | "EDUCATION" | "SPACE" | "AUTO";
type LangKey = "EN" | "JA";

/**
 * Map /api/run/[domain] -> engine domain keys.
 */
function mapDomain(slug: string): { domain: DomainKey; lang: LangKey } {
  const s = slug.toLowerCase();

  if (s === "med" || s === "medical") return { domain: "MEDICAL", lang: "EN" };
  if (s === "edu" || s === "education") return { domain: "EDUCATION", lang: "EN" };
  if (s === "space") return { domain: "SPACE", lang: "EN" };
  if (s === "auto" || s === "autonomous" || s === "driving") return { domain: "AUTO", lang: "EN" };

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

    // 型が追いついてない場合に備えて、いったんMEDICALへフォールバックしてもOK
    // もし EvlaRunRequest["domain"] がすでに "EDUCATION" 等を含むならこのままでOK。
    const baseDomain = (mapped.domain as EvlaRunRequest["domain"]) ?? "MEDICAL";

    const log = runEvlaEn({ prompt, domain: baseDomain });

    const res: EvlaRunResponse = { log };
    return NextResponse.json(res);
  } catch (err) {
    console.error("run/[domain] error", err);
    return NextResponse.json({ error: "internal_error" }, { status: 500 });
  }
}
