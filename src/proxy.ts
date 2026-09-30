import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import {
  AUDIENCE_HEADER,
  buyerAbsoluteUrl,
  clerkAuthorizedParties,
  hostnameFromRequest,
  isSupplierHostname,
  resolveAudience,
  staysOnSupplierHost,
  shouldRedirectToSupplierHost,
  supplierAbsoluteUrl,
} from "@/lib/hosts";
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

export default clerkMiddleware(
  async (auth, req) => {
    const url = req.nextUrl.clone();
    const host = hostnameFromRequest(req);
    const onSupplierHost = isSupplierHostname(host);

    if (
      !onSupplierHost &&
      url.pathname === "/" &&
      url.searchParams.get("tab") === "suppliers"
    ) {
      url.pathname = "/suppliers";
      url.searchParams.delete("tab");
      return NextResponse.redirect(url);
    }

    if (onSupplierHost && !staysOnSupplierHost(url.pathname)) {
      return NextResponse.redirect(
        buyerAbsoluteUrl(`${url.pathname}${url.search}`),
      );
    }

    if (!onSupplierHost && shouldRedirectToSupplierHost(url.pathname)) {
      const destPath =
        url.pathname === "/suppliers" ? `/${url.search}` : `${url.pathname}${url.search}`;
      return NextResponse.redirect(supplierAbsoluteUrl(destPath));
    }

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

    const rewriteHome = onSupplierHost && (url.pathname === "/" || url.pathname === "");
    const audiencePath = rewriteHome ? "/suppliers" : url.pathname;
    const audience = resolveAudience({ host, pathname: audiencePath });

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set(AUDIENCE_HEADER, audience);
    requestHeaders.set("x-pathname", audiencePath);

    const res = rewriteHome
      ? NextResponse.rewrite(new URL(`/suppliers${url.search}`, req.url), {
          request: { headers: requestHeaders },
        })
      : NextResponse.next({ request: { headers: requestHeaders } });

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
  },
  {
    authorizedParties: clerkAuthorizedParties(),
  },
);

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
