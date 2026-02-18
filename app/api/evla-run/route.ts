// app/api/evla-run/route.ts
import { NextResponse } from "next/server";
import { runEvla } from "@/lib/evla/engine";
import { runEvlaEn } from "@/lib/evla/engine-en";
import type { EvlaRunRequest, EvlaRunResponse } from "@/lib/evla/types";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<EvlaRunRequest>;

    const prompt = (body.prompt ?? "").toString();
    const domain = (body.domain ?? "MEDICAL").toString().toUpperCase();

    if (!prompt.trim()) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    // 型的には domain は "MEDICAL" 固定なので、ここでは "MEDICAL" を渡す
    // 英語版エンジン側（engine-en.ts）の createImpulse で
    // domain: "MEDICAL_EN" に上書きする設計にしておく
    const baseDomain: EvlaRunRequest["domain"] = "MEDICAL";

    const log =
      domain === "MEDICAL_EN"
        ? runEvlaEn({ prompt, domain: baseDomain })
        : runEvla({ prompt, domain: baseDomain });

    const res: EvlaRunResponse = { log };
    return NextResponse.json(res);
  } catch (err) {
    console.error("evla-run error", err);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
