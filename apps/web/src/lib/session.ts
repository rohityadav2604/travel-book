import { db } from "@memorybook/db";
import { cookies, headers } from "next/headers";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

export type SessionContext = {
  id: string;
  expiresAt: Date;
};

export async function ensureSession(): Promise<SessionContext> {
  const id = (await getCurrentSessionId()) ?? randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_TTL_MS);
  const session = await db.session.upsert({
    where: { id },
    create: { id, expiresAt },
    update: { expiresAt },
    select: {
      id: true,
      expiresAt: true,
    },
  });

  return session;
}

export async function getCurrentSessionId(): Promise<string | null> {
  const headerStore = await headers();
  const middlewareSessionId = headerStore.get("x-memorybook-session-id");

  if (middlewareSessionId) {
    return middlewareSessionId;
  }

  const cookieStore = await cookies();
  return verifySignedSessionCookie(cookieStore.get(getCookieName())?.value);
}

export function verifySignedSessionCookie(value: string | undefined): string | null {
  if (!value) {
    return null;
  }

  const [sessionId, signature] = value.split(".");

  if (!sessionId || !signature) {
    return null;
  }

  const expectedSignature = createSignature(sessionId);
  const signatureBuffer = Buffer.from(signature);
  const expectedSignatureBuffer = Buffer.from(expectedSignature);

  if (signatureBuffer.length !== expectedSignatureBuffer.length) {
    return null;
  }

  return timingSafeEqual(signatureBuffer, expectedSignatureBuffer) ? sessionId : null;
}

export function signSessionCookie(sessionId: string): string {
  return `${sessionId}.${createSignature(sessionId)}`;
}

function createSignature(sessionId: string): string {
  return createHmac("sha256", getSessionSecret()).update(sessionId).digest("base64url");
}

function getCookieName(): string {
  return process.env.SESSION_COOKIE_NAME || "memorybook_session";
}

function getSessionSecret(): string {
  return process.env.SESSION_SECRET || "dev-memorybook-session-secret";
}
