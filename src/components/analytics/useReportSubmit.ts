"use client";

import { useEffect, useRef } from "react";
import { track } from "@/lib/analytics";
import type { SourceEvent } from "@/lib/analytics-events";

/**
 * Reports a form submit once per success.
 *
 * `useActionState` re-renders on every keystroke after a submit, so watching
 * `state.success` alone would report the same submit repeatedly. This fires on
 * the transition into success and re-arms only once the form goes back to a
 * non-success state, which is what happens when the user submits again.
 */
export function useReportSubmit(
  event: SourceEvent,
  succeeded: boolean,
  params: Record<string, unknown> = {},
) {
  const reported = useRef(false);
  const latest = useRef(params);
  latest.current = params;

  useEffect(() => {
    if (!succeeded) {
      reported.current = false;
      return;
    }
    if (reported.current) return;
    reported.current = true;
    track(event, latest.current);
  }, [event, succeeded]);
}
