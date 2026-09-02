"use client";

import { useActionState, useState } from "react";
import { updateSourceCapacity, type SourceFormState } from "@/app/actions/source";
import { Button, Panel } from "@/components/ui";
import {
  SOURCE_CAPACITY_LINE,
  capacityNeedsRefresh,
  formatFullness,
  readShopCapacity,
} from "@/lib/source-capacity";
import type { SourceMachine, SourceProfile } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };

export function SourceWeeklyCapacityForm({
  profile,
  cells,
}: {
  profile?: Pick<SourceProfile, "fullPercent" | "capacityAt"> | null;
  cells: SourceMachine[];
}) {
  const [state, action, pending] = useActionState(
    updateSourceCapacity,
    initial,
  );
  const snap = readShopCapacity(profile, cells);
  const [full, setFull] = useState(snap?.fullPercent ?? 50);
  const stale = capacityNeedsRefresh(profile, cells);

  return (
    <form action={action} className="mt-6">
      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          This week · Free
        </p>
        <p className="text-sm leading-6 text-muted">{SOURCE_CAPACITY_LINE}</p>
        {stale ? (
          <p className="text-sm leading-6 text-copper">
            File this week or matching will not boost this shop.
          </p>
        ) : snap ? (
          <p className="text-sm leading-6 text-muted">{formatFullness(snap)}</p>
        ) : null}
        <label className="block text-sm">
          <span className="flex items-baseline justify-between gap-3">
            <span>How full is the plant</span>
            <span className="font-mono text-[12px] tracking-widest text-muted uppercase">
              {full}% full
            </span>
          </span>
          <input
            className="mt-3 w-full accent-copper"
            name="fullPercent"
            type="range"
            min={0}
            max={100}
            step={1}
            value={full}
            onChange={(event) => setFull(Number(event.target.value))}
          />
        </label>
        <div className="flex justify-between text-xs leading-5 text-muted">
          <span>0% — needs work</span>
          <span>100% — no capacity</span>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save this week"}
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
