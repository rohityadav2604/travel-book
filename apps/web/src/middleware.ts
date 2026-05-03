import { NextRequest, NextResponse } from "next/server";

const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

export const config = {
  matcher: ["/api/:path*"],
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const existingSessionId = await getValidSessionId(request.cookies.get(getCookieName())?.value);
  const sessionId = existingSessionId ?? crypto.randomUUID();
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-memorybook-session-id", sessionId);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (!existingSessionId) {
    response.cookies.set(getCookieName(), await signSessionId(sessionId), {
      httpOnly: true,
      maxAge: SESSION_TTL_SECONDS,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
  }

  return response;
}

function getCookieName(): string {
  return process.env.SESSION_COOKIE_NAME || "memorybook_session";
}

async function getValidSessionId(value: string | undefined): Promise<string | null> {
  if (!value) {
    return null;
  }

  const [sessionId, signature] = value.split(".");

  if (!sessionId || !signature) {
    return null;
  }

  const expectedSignature = await createSignature(sessionId);
  return signature === expectedSignature ? sessionId : null;
}

async function signSessionId(sessionId: string): Promise<string> {
  return `${sessionId}.${await createSignature(sessionId)}`;
}

async function createSignature(sessionId: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(sessionId));

  return base64UrlEncode(new Uint8Array(signature));
}

function getSessionSecret(): string {
  return process.env.SESSION_SECRET || "dev-memorybook-session-secret";
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/u, "");
}
