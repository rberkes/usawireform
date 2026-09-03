"use client";

import { useState } from "react";
import { startSourceBuyerExtraCheckout } from "@/app/actions/source-billing";
import { Button } from "@/components/ui";
import { formatLeadPrice, formatLeadTotal } from "@/lib/source-plans";

export function SourceBuyerExtraShopsForm({
  pathname,
  remaining,
}: {
  pathname: string;
  remaining: number;
}) {
  const [qty, setQty] = useState(1);
  const max = Math.max(1, remaining);
  const n = Math.min(max, Math.max(1, qty));
  return (
    <form action={startSourceBuyerExtraCheckout} className="mt-3 space-y-3">
      <input type="hidden" name="pathname" value={pathname} />
      <label className="block text-sm">
        <span className="flex items-baseline justify-between gap-3">
          <span>Add more shops to bid</span>
          <span className="font-mono text-[12px] tracking-widest text-muted uppercase">
            {n} × {formatLeadPrice()} = {formatLeadTotal(n)}
          </span>
        </span>
        <select
          className="mt-1.5 w-full rounded-sm border border-line bg-background px-3 py-2.5 text-sm"
          name="qty"
          value={n}
          onChange={(event) => setQty(Number(event.target.value))}
        >
          {Array.from({ length: remaining }, (_, i) => i + 1).map((value) => (
            <option key={value} value={value}>
              {value} {value === 1 ? "shop" : "shops"} — {formatLeadTotal(value)}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">
        Add {n} {n === 1 ? "shop" : "shops"} — {formatLeadTotal(n)}
      </Button>
    </form>
  );
}
