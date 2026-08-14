import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "uwf_admin";
const SESSION_HOURS = 12;

function hash(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.ADMIN_LEADS_PASSWORD);
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const password = process.env.ADMIN_LEADS_PASSWORD;
  if (!password) return false;

  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;

  const expected = hash(password);
  const provided = Buffer.from(token);
  const wanted = Buffer.from(expected);
  if (provided.length !== wanted.length) return false;

  return timingSafeEqual(provided, wanted);
}

/** Returns false when the submitted password does not match. */
export async function trySetAdminCookie(password: string): Promise<boolean> {
  const expected = process.env.ADMIN_LEADS_PASSWORD;
  if (!expected) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  const matches = a.length === b.length && timingSafeEqual(a, b);
  if (!matches) return false;

  const store = await cookies();
  store.set(COOKIE_NAME, hash(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * SESSION_HOURS,
  });
  return true;
}

export async function clearAdminCookie(): Promise<void> {
  const store = await cookies();
  // `.delete(name)` defaults to path "/", which does NOT remove a cookie set
  // with path "/admin" — it just adds a second, unrelated expired cookie
  // while the original keeps authenticating. Overwrite at the same path instead.
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 0,
  });
}
