"use client";

import type { SourceEvent } from "@/lib/analytics-events";

/**
 * Fire and forget. Safe before the tag has loaded: commands sit on
 * `dataLayer` until the deferred gtag script drains the queue.
 */
export function track(event: SourceEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    pushGa("event", event, params);
  } catch {
    /* measurement is never worth an exception */
  }
}

function pushGa(
  command: string,
  event: string,
  params: Record<string, unknown>,
) {
  const w = window as Window & { dataLayer?: IArguments[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(arguments);
}
