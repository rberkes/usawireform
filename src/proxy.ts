import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  hitFromRequest,
  newVisitorId,
  recordVisit,
  shouldSkipVisit,
  VISITOR_COOKIE,
  VISITOR_COOKIE_MAX_AGE,
} from "@/lib/visitor-log";

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
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
