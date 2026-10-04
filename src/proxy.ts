import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import { SITE_HOST, SITE_URL } from "@/lib/company";
import {
  hitFromRequest,
  newVisitorId,
  recordVisit,
  shouldSkipVisit,
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
} from "@/lib/visitor-log";

const productionParties = [SITE_URL, `https://www.${SITE_HOST}`];

function partiesFor(req: NextRequest) {
  if (process.env.VERCEL_ENV === "production") return productionParties;
  const host =
    req.headers.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    req.nextUrl.host;
  const local = host.startsWith("localhost") || host.startsWith("127.0.0.1");
  const origin = `${local ? "http" : "https"}://${host}`;
  return productionParties.includes(origin)
    ? productionParties
    : [...productionParties, origin];
}

const isProtectedRoute = createRouteMatcher([
  "/source/dashboard(.*)",
  "/source/account(.*)",
  "/source/claim(.*)",
  "/source/nda(.*)",
  "/source/enter(.*)",
  "/source/drawing(.*)",
]);

const isBuyerRoute = createRouteMatcher(["/buyer(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (isBuyerRoute(req)) {
    const signIn = req.nextUrl.clone();
    signIn.pathname = "/sign-in";
    signIn.search = "";
    signIn.searchParams.set("as", "buyer");
    signIn.searchParams.set(
      "redirect_url",
      `${req.nextUrl.pathname}${req.nextUrl.search}`,
    );
    await auth.protect({ unauthenticatedUrl: signIn.toString() });
  } else if (isProtectedRoute(req)) {
    await auth.protect();
  }

  const res = NextResponse.next();
  if (req.method !== "GET" || shouldSkipVisit(req)) return res;

  let session = req.cookies.get(VISITOR_COOKIE)?.value?.trim() || "";
  if (!session) {
    session = newVisitorId();
    res.cookies.set(VISITOR_COOKIE, session, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: VISITOR_COOKIE_MAX_AGE,
    });
  }

  const path = `${req.nextUrl.pathname}${req.nextUrl.search}`;
  void hitFromRequest(req, { kind: "page", path, session })
    .then((hit) => recordVisit(hit, req))
    .catch((error) => console.error("[Visit proxy]", error));

  return res;
}, (req) => ({ authorizedParties: partiesFor(req) }));

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
