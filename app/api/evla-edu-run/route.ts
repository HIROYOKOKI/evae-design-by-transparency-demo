// app/api/evla-edu-run/route.ts
import { NextResponse } from "next/server";
import { runEvlaEdu } from "@/lib/evla/engine-edu";
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

    // domain は型の都合で "MEDICAL" のまま渡す
    const log = runEvlaEdu({ prompt, domain: "MEDICAL" });

    const res: EvlaRunResponse = { log };
    return NextResponse.json(res);
  } catch (err) {
    console.error("evla-edu-run error", err);
    return NextResponse.json(
      { error: "internal_error" },
      { status: 500 }
    );
  }
}
