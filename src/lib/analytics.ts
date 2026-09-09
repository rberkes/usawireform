"use client";

import { sendGAEvent } from "@next/third-parties/google";
import type { SourceEvent } from "@/lib/analytics-events";

/**
 * Fire and forget. Safe before the tag has loaded, because a dropped
 * measurement must never break a checkout or a form.
 */
export function track(event: SourceEvent, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  try {
    sendGAEvent("event", event, params);
  } catch {
    /* measurement is never worth an exception */
  }
}
