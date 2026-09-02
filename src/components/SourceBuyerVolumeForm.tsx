"use client";

import { useActionState, useRef, useState } from "react";
import {
  saveSourceBuyerVolume,
  type SourceAccountState,
} from "@/app/actions/source-accounts";
import { Button, Panel } from "@/components/ui";
import {
  SOURCE_BUYER_JOBS_MAX,
  SOURCE_BUYER_VOLUME_LINE,
  formatBuyerJobsPerMonth,
} from "@/lib/source-buyer-volume";

const initial: SourceAccountState = { success: false, message: "" };

export function SourceBuyerVolumeForm({
  jobsPerMonth = 0,
}: {
  jobsPerMonth?: number;
}) {
  const [state, action, pending] = useActionState(
    saveSourceBuyerVolume,
    initial,
  );
  const [jobs, setJobs] = useState(jobsPerMonth);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form ref={formRef} action={action} className="space-y-4">
      <Panel className="space-y-4 p-5 sm:p-6">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Monthly volume
        </p>
        <p className="text-sm leading-6 text-muted">{SOURCE_BUYER_VOLUME_LINE}</p>
        <label className="block text-sm">
          <span className="flex items-baseline justify-between gap-3">
            <span>Jobs you source a month</span>
            <span className="font-mono text-[12px] tracking-widest text-muted uppercase">
              {formatBuyerJobsPerMonth(jobs)}
            </span>
          </span>
          <input
            className="mt-3 w-full accent-copper"
            name="jobsPerMonth"
            type="range"
            min={0}
            max={SOURCE_BUYER_JOBS_MAX}
            step={1}
            value={jobs}
            onChange={(event) => setJobs(Number(event.target.value))}
            onPointerUp={() => formRef.current?.requestSubmit()}
          />
        </label>
        <div className="flex justify-between text-xs leading-5 text-muted">
          <span>0</span>
          <span>10+</span>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save volume"}
        </Button>
        {state.message ? (
          <p
            className={`text-sm leading-6 ${
              state.success ? "text-foreground" : "text-copper"
            }`}
          >
            {state.message}
          </p>
        ) : null}
      </Panel>
    </form>
  );
}
