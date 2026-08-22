"use client";

import { useActionState } from "react";
import { saveSourceSecondaries } from "@/app/actions/source-billing";
import { Button, Panel } from "@/components/ui";
import {
  SOURCE_SECONDARIES,
  SOURCE_SECONDARY_CENTS,
} from "@/lib/source-secondaries";

const initial = { success: false, message: "" };

export function SourceSecondariesForm({
  selected,
  billedQty,
}: {
  selected: string[];
  billedQty: number;
}) {
  const [state, action, pending] = useActionState(
    saveSourceSecondaries,
    initial,
  );
  const each = SOURCE_SECONDARY_CENTS / 100;

  return (
    <form action={action} className="space-y-4">
      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Secondaries
        </p>
        <p className="text-sm leading-6 text-muted">
          Main secondary operations on the public listing. ${each} a month
          for each one you list. Uncheck to drop the charge. Min order,
          setup, stock, and lead stay free above.
        </p>
        <ul className="space-y-2">
          {SOURCE_SECONDARIES.map((row) => (
            <li key={row.id}>
              <label className="flex items-start gap-3 text-sm leading-6">
                <input
                  type="checkbox"
                  name="secondary"
                  value={row.id}
                  defaultChecked={selected.includes(row.id)}
                  className="mt-1"
                />
                <span>
                  {row.label}
                  <span className="text-muted"> · ${each}/mo</span>
                </span>
              </label>
            </li>
          ))}
        </ul>
        <p className="text-xs text-muted">
          Billed now: {billedQty} {billedQty === 1 ? "secondary" : "secondaries"}.
        </p>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save secondaries"}
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
