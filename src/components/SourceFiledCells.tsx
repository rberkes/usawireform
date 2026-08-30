"use client";

import { useActionState } from "react";
import {
  clearSourceCells,
  removeSourceCell,
  type SourceFormState,
} from "@/app/actions/source";
import { Button } from "@/components/ui";
import type { SourceMachine } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };

export function SourceFiledCells({ cells }: { cells: SourceMachine[] }) {
  const [removeState, removeAction, removing] = useActionState(
    removeSourceCell,
    initial,
  );
  const [clearState, clearAction, clearing] = useActionState(
    clearSourceCells,
    initial,
  );

  if (cells.length === 0) return null;

  return (
    <div className="mt-4 space-y-3">
      <ul className="divide-y divide-line border border-line">
        {cells.map((row, index) => (
          <li
            key={`${row.oem}-${row.model}-${index}`}
            className="flex items-start justify-between gap-4 px-4 py-3 text-sm"
          >
            <div>
              <p className="font-medium">
                {row.oem} {row.model}
              </p>
              <p className="mt-1 text-muted">
                {row.kind}
                {row.minMm || row.maxMm
                  ? ` · ${row.minMm || "?"}–${row.maxMm || "?"} mm`
                  : ""}
              </p>
            </div>
            <form action={removeAction}>
              <input type="hidden" name="index" value={index} />
              <button
                type="submit"
                disabled={removing}
                className="text-sm text-muted hover:text-copper disabled:opacity-50"
              >
                Remove
              </button>
            </form>
          </li>
        ))}
      </ul>
      <form action={clearAction}>
        <Button type="submit" variant="ghost" disabled={clearing}>
          {clearing ? "Clearing…" : "Clear all cells"}
        </Button>
      </form>
      {removeState.message ? (
        <p className="text-sm leading-6 text-copper">{removeState.message}</p>
      ) : null}
      {clearState.message ? (
        <p className="text-sm leading-6 text-copper">{clearState.message}</p>
      ) : null}
    </div>
  );
}
