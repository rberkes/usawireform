"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "uwf-outbound-email";

type Phase = "idle" | "form" | "submitting" | "success" | "error";

function readStoredEmail(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function storeEmail(email: string) {
  try {
    window.localStorage.setItem(STORAGE_KEY, email);
  } catch {
    // Private browsing or storage disabled — the lead is already recorded server-side.
  }
}

/**
 * Reports an outbound click. `keepalive` lets the request finish even though the
 * browser is opening the destination in the same tick.
 */
function reportOutbound(payload: Record<string, unknown>) {
  return fetch("/api/outbound-lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  });
}

export function OutboundLinkGate({
  href,
  companyName,
  companySlug,
  label = "Visit website",
}: {
  href: string;
  companyName: string;
  companySlug: string;
  label?: string;
}) {
  const [phase, setPhase] = useState<Phase>("idle");
  const [email, setEmail] = useState("");
  const [visitorCompany, setVisitorCompany] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);
  const continueLinkRef = useRef<HTMLAnchorElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const isOpen = phase !== "idle";

  const close = useCallback(() => {
    setPhase("idle");
    triggerRef.current?.focus();
  }, []);

  const handleTriggerClick = () => {
    const known = readStoredEmail();

    // Already identified this visitor — record the click and let them through
    // rather than gating the same person on every company page.
    if (known) {
      reportOutbound({
        email: known,
        referredCompany: companyName,
        referredCompanySlug: companySlug,
        destinationUrl: href,
        event: "revisit",
      }).catch(() => {});
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    setPhase("form");
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setPhase("submitting");

    try {
      const response = await reportOutbound({
        email: email.trim(),
        visitorCompany: visitorCompany.trim(),
        referredCompany: companyName,
        referredCompanySlug: companySlug,
        destinationUrl: href,
        event: "capture",
      });

      if (!response.ok) {
        setPhase("error");
        return;
      }

      storeEmail(email.trim());
      setPhase("success");
    } catch {
      setPhase("error");
    }
  };

  // Escape to dismiss, and lock background scroll while the dialog is up.
  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key !== "Tab") return;

      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable || focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (phase === "form") emailInputRef.current?.focus();
  }, [phase]);

  // Hand the visitor off once the lead is recorded. Browsers that block the
  // programmatic open still get the visible "Continue" link below.
  useEffect(() => {
    if (phase !== "success") return;
    continueLinkRef.current?.focus();
    const opened = window.open(href, "_blank", "noopener,noreferrer");
    if (opened) {
      const timer = window.setTimeout(() => setPhase("idle"), 1200);
      return () => window.clearTimeout(timer);
    }
  }, [phase, href]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={handleTriggerClick}
        className="text-copper hover:underline"
      >
        {label} →
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={close}
            aria-hidden
          />

          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="outbound-gate-title"
            className="relative w-full max-w-md border border-line bg-background p-6 shadow-xl"
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 text-muted hover:text-foreground"
              aria-label="Close"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {phase === "success" ? (
              <div>
                <h2
                  id="outbound-gate-title"
                  className="text-lg font-medium text-copper"
                >
                  Thanks — opening {companyName}
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  {companyName} opens in a new tab. If it did not, use the link
                  below.
                </p>
                <a
                  ref={continueLinkRef}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="mt-5 block bg-copper px-6 py-3 text-center text-sm font-medium text-background transition-colors hover:bg-copper/90"
                >
                  Continue to {companyName}
                </a>
                <button
                  type="button"
                  onClick={close}
                  className="mt-3 w-full border border-line px-6 py-2.5 text-sm transition-colors hover:border-copper hover:text-copper"
                >
                  Stay on this page
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 id="outbound-gate-title" className="text-lg font-medium">
                  Heading to {companyName}?
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Leave your email and we&apos;ll open their site. If they
                  cannot run your job, we&apos;ll follow up with options — we
                  form 4–14&nbsp;mm wire in Northeast Ohio.
                </p>

                <div className="mt-5">
                  <label
                    htmlFor="outbound-email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email <span className="text-copper">*</span>
                  </label>
                  <input
                    ref={emailInputRef}
                    id="outbound-email"
                    type="email"
                    required
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="you@company.com"
                    className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
                  />
                </div>

                <div className="mt-4">
                  <label
                    htmlFor="outbound-company"
                    className="block text-sm font-medium mb-1"
                  >
                    Your company
                  </label>
                  <input
                    id="outbound-company"
                    type="text"
                    autoComplete="organization"
                    value={visitorCompany}
                    onChange={(event) => setVisitorCompany(event.target.value)}
                    className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={phase === "submitting"}
                  className="mt-5 w-full bg-copper px-6 py-3 text-sm font-medium text-background transition-colors hover:bg-copper/90 disabled:opacity-50"
                >
                  {phase === "submitting"
                    ? "One moment..."
                    : `Continue to ${companyName}`}
                </button>

                {phase === "error" && (
                  <p className="mt-3 text-center text-sm text-red-500">
                    Something went wrong. Please try again.
                  </p>
                )}

                <p className="mt-4 text-center text-xs text-muted">
                  We only use this to follow up.{" "}
                  <a href="/privacy" className="underline hover:text-copper">
                    Privacy policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
