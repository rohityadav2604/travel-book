import { ensureSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function GET(): Promise<NextResponse> {
  const session = await ensureSession();

  return NextResponse.json({
    ok: true,
    service: "memorybook-web",
    sessionId: session.id,
  });
}
