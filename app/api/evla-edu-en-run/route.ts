import { NextResponse } from "next/server";
import { runEvlaEduEn } from "@/lib/evla/engine-edu-en";
import type { EvlaRunRequest, EvlaRunResponse } from "@/lib/evla/types";

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<EvlaRunRequest>;
    const prompt = (body.prompt ?? "").toString();

    if (!prompt.trim()) {
      return NextResponse.json(
        { error: "prompt is required" },
        { status: 400 }
      );
    }

    const log = runEvlaEduEn({ prompt, domain: "MEDICAL" });

    return NextResponse.json({ log } satisfies EvlaRunResponse);
  } catch (err) {
    console.error("evla-edu-en-run error", err);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
