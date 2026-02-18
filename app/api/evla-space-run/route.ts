// app/api/evla-space-en-run/route.ts
import { NextResponse } from "next/server";
import { runEvlaSpaceEn } from "@/lib/evla/engine-space-en";
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

    const log = runEvlaSpaceEn({ prompt, domain: "SPACE_EN" });

    const res: EvlaRunResponse = { log };
    return NextResponse.json(res);
  } catch (err) {
    console.error("evla-space-en-run error", err);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
