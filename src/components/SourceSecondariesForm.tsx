"use client";

import { useActionState, useMemo, useState } from "react";
import { saveSourceSecondaries } from "@/app/actions/source-billing";
import { Button, Panel } from "@/components/ui";
import {
  SOURCE_SECONDARIES,
  SOURCE_SECONDARY_LINE,
  SOURCE_SECONDARY_MAX,
  SOURCE_SECONDARY_TOP,
  formatSecondaryPrice,
  packForCount,
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
  const [picked, setPicked] = useState(selected);
  const count = picked.length;
  const pack = packForCount(count);
  const price = formatSecondaryPrice(count);
  const atCap = count >= SOURCE_SECONDARY_MAX;
  const billedLine = useMemo(() => {
    if (billedQty <= 0) return "None billed.";
    if (billedQty >= SOURCE_SECONDARY_MAX) return "Six-pack billed.";
    if (billedQty >= SOURCE_SECONDARY_TOP) return "Three-pack billed.";
    return `Billed now: ${billedQty}. Saving moves you to a pack.`;
  }, [billedQty]);

  return (
    <form action={action} className="space-y-4">
      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Secondaries
        </p>
        <p className="text-sm leading-6 text-muted">{SOURCE_SECONDARY_LINE}</p>
        <p className="text-sm leading-6 text-muted">
          Pick the ops you actually run. Those names show on the listing and
          in find-by-machine. Min order, setup, stock, and lead stay free
          above.
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          {SOURCE_SECONDARIES.map((row) => {
            const on = picked.includes(row.id);
            return (
              <li key={row.id}>
                <label className="flex items-start gap-3 text-sm leading-6">
                  <input
                    type="checkbox"
                    name="secondary"
                    value={row.id}
                    checked={on}
                    disabled={!on && atCap}
                    onChange={(event) => {
                      const checked = event.target.checked;
                      setPicked((current) => {
                        if (checked) {
                          if (current.includes(row.id)) return current;
                          if (current.length >= SOURCE_SECONDARY_MAX) {
                            return current;
                          }
                          return [...current, row.id];
                        }
                        return current.filter((id) => id !== row.id);
                      });
                    }}
                    className="mt-1"
                  />
                  <span>{row.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-muted">
          {count} selected
          {pack
            ? ` · ${pack.name} · ${price}`
            : " · nothing billed"}
          . {billedLine}
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
