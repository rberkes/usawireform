"use client";

import { useActionState } from "react";
import { updateSourceCapacity, type SourceFormState } from "@/app/actions/source";
import { Button, fieldClass, Panel } from "@/components/ui";
import {
  SOURCE_CAPACITY_LINE,
  SOURCE_SLOT_CAP,
  capacityNeedsRefresh,
  formatCapacity,
  readCapacity,
} from "@/lib/source-capacity";
import type { SourceMachine } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };

export function SourceWeeklyCapacityForm({ cells }: { cells: SourceMachine[] }) {
  const [state, action, pending] = useActionState(
    updateSourceCapacity,
    initial,
  );
  const stale = capacityNeedsRefresh(cells);

  return (
    <form action={action} className="mt-6">
      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          This week · Free
        </p>
        <p className="text-sm leading-6 text-muted">{SOURCE_CAPACITY_LINE}</p>
        {stale ? (
          <p className="text-sm leading-6 text-copper">
            File this week or matching will not boost these cells.
          </p>
        ) : null}
        <ul className="divide-y divide-line border border-line">
          {cells.map((cell, index) => {
            const snap = readCapacity(cell);
            return (
              <li
                key={`${cell.oem}-${cell.model}-${index}`}
                className="grid gap-3 px-4 py-3 sm:grid-cols-[1fr_7rem] sm:items-center"
              >
                <div>
                  <p className="text-sm font-medium">
                    {cell.oem} {cell.model}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-muted">
                    {cell.kind}
                    {cell.minMm || cell.maxMm
                      ? ` · ${cell.minMm || "?"}–${cell.maxMm || "?"} mm`
                      : ""}
                    {snap
                      ? ` · ${formatCapacity(cell)}`
                      : " · not filed this week"}
                  </p>
                </div>
                <label className="block text-sm">
                  Open / {SOURCE_SLOT_CAP}
                  <input
                    className={`mt-1.5 ${fieldClass}`}
                    name={`open-${index}`}
                    type="number"
                    min={0}
                    max={SOURCE_SLOT_CAP}
                    inputMode="numeric"
                    defaultValue={snap?.openSlots ?? ""}
                    placeholder="0–10"
                  />
                </label>
              </li>
            );
          })}
        </ul>
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
