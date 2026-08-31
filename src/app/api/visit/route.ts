import { NextRequest, NextResponse } from "next/server";
import {
  hitFromRequest,
  newVisitorId,
  recordVisit,
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
  type VisitorKind,
} from "@/lib/visitor-log";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 80;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function cookieSession(request: NextRequest) {
  return request.cookies.get(VISITOR_COOKIE)?.value?.trim() || "";
}

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: true, limited: true });
  }

  let body: { kind?: unknown; path?: unknown; href?: unknown; label?: unknown } =
    {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Bad payload" }, { status: 400 });
  }

  const kind: VisitorKind = body.kind === "click" ? "click" : "page";
  const path = typeof body.path === "string" ? body.path : "";
  if (!path.startsWith("/")) {
    return NextResponse.json({ error: "Path required" }, { status: 400 });
  }

  let session = cookieSession(request);
  const fresh = !session;
  if (!session) session = newVisitorId();

  const hit = await hitFromRequest(request, {
    kind,
    path,
    href: typeof body.href === "string" ? body.href : undefined,
    label: typeof body.label === "string" ? body.label : undefined,
    session,
  });

  try {
    await recordVisit(hit, request);
  } catch (error) {
    console.error("[Visit log]", error);
  }

  const res = NextResponse.json({ ok: true });
  if (fresh) {
    res.cookies.set(VISITOR_COOKIE, session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: VISITOR_COOKIE_MAX_AGE,
    });
  }
  return res;
}
