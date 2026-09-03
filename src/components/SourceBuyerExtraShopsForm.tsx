"use client";

import { useState } from "react";
import { startSourceBuyerExtraCheckout } from "@/app/actions/source-billing";
import { Button } from "@/components/ui";
import { formatLeadPrice } from "@/lib/source-plans";
import { SOURCE_REBID_REASONS, type SourceRebidReason } from "@/lib/source-rebid";

export function SourceBuyerExtraShopsForm({
  pathname,
}: {
  pathname: string;
}) {
  const [reason, setReason] = useState<SourceRebidReason>("other");
  return (
    <form action={startSourceBuyerExtraCheckout} className="mt-3 space-y-3">
      <input type="hidden" name="pathname" value={pathname} />
      <input type="hidden" name="qty" value="1" />
      <label className="block text-sm">
        Why open another quote
        <select
          className="mt-1.5 w-full rounded-sm border border-line bg-background px-3 py-2.5 text-sm"
          name="reason"
          value={reason}
          onChange={(event) => setReason(event.target.value as SourceRebidReason)}
        >
          {SOURCE_REBID_REASONS.map((row) => (
            <option key={row.id} value={row.id}>
              {row.buyer}
            </option>
          ))}
        </select>
      </label>
      <Button type="submit">
        Open one more quote — {formatLeadPrice()}
      </Button>
    </form>
  );
}
