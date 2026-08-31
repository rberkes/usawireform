"use client";

import { useEffect } from "react";

function send(body: Record<string, string>) {
  try {
    void fetch("/api/visit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      keepalive: true,
      credentials: "same-origin",
    });
  } catch {
    /* ignore */
  }
}

/** First-party page and click log for the shop desk. Not an ad pixel. */
export function VisitTracker() {
  useEffect(() => {
    const path = `${window.location.pathname}${window.location.search}`;
    if (path.startsWith("/admin") || path.startsWith("/api/")) return;

    send({ kind: "page", path });

    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement)) return;
      const href = link.getAttribute("href") || "";
      if (!href || href.startsWith("javascript:")) return;
      const label = (link.textContent || "").replace(/\s+/g, " ").trim();
      send({
        kind: "click",
        path,
        href,
        label,
      });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
