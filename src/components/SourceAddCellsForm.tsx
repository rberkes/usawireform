"use client";

import { useActionState, useState } from "react";
import { addSourceCells, type SourceFormState } from "@/app/actions/source";
import {
  SourceMachineRows,
  emptySourceMachine,
} from "@/components/SourceMachineRows";
import { Button, ButtonLink, fieldClass, Panel } from "@/components/ui";
import type { SourceMachine } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };

export function SourceAddCellsForm({ remaining }: { remaining: number }) {
  const [state, action, pending] = useActionState(addSourceCells, initial);
  const [machines, setMachines] = useState<SourceMachine[]>([
    emptySourceMachine(),
  ]);

  if (remaining <= 0) {
    return (
      <Panel className="space-y-3 p-4 sm:p-5">
        <p className="text-sm leading-6 text-muted">
          This plan is full. Upgrade to file more cells.
        </p>
        <ButtonLink href="/source/upgrade">See Source plans</ButtonLink>
      </Panel>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <input type="hidden" name="machines" value={JSON.stringify(machines)} />
      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Add cells
        </p>
        <p className="text-sm leading-6 text-muted">
          Room for {remaining} more {remaining === 1 ? "cell" : "cells"} on
          this plan.
        </p>
        <SourceMachineRows
          machines={machines}
          onChange={setMachines}
          maxRows={remaining}
        />
        <label className="block text-sm">
          Or upload a list (CSV, PDF, XLSX)
          <input className="mt-1.5 block text-sm" name="list" type="file" />
        </label>
        <label className="block text-sm">
          Notes
          <textarea
            className={`${fieldClass} mt-1.5 min-h-20`}
            name="notes"
            placeholder="Heads, coil vs bar, sold cells."
          />
        </label>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save cells"}
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
