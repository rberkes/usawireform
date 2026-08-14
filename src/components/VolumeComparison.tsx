"use client";

import { useMemo } from "react";
import { estimatePiece, usd2, ESTIMATE } from "@/lib/quoting";
import { cx } from "@/lib/cx";

type VolumeComparisonProps = {
  diameterIn: number;
  bends: number;
  lengthIn: number;
  stainless: boolean;
  className?: string;
};

const VOLUME_TIERS = [100, 500, 1000, 5000, 10000];

export function VolumeComparison({
  diameterIn,
  bends,
  lengthIn,
  stainless,
  className,
}: VolumeComparisonProps) {
  const comparisons = useMemo(() => {
    return VOLUME_TIERS.map((qty) => {
      const result = estimatePiece({
        diameterIn,
        bends,
        lengthIn,
        stainless,
        quantity: qty,
      });
      return {
        qty,
        piece: result.piece,
        lot: result.lot,
        savings: result.discountRate,
      };
    });
  }, [diameterIn, bends, lengthIn, stainless]);

  const basePrice = comparisons[0].piece;

  return (
    <div className={cx("mt-8", className)}>
      <h3 className="font-mono text-[11px] tracking-widest text-muted uppercase">
        Volume pricing comparison
      </h3>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[400px] text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className="pb-3 pr-4 text-left font-mono text-[10px] uppercase tracking-widest text-muted">
                Quantity
              </th>
              <th className="pb-3 pr-4 text-right font-mono text-[10px] uppercase tracking-widest text-muted">
                Per piece
              </th>
              <th className="pb-3 pr-4 text-right font-mono text-[10px] uppercase tracking-widest text-muted">
                Lot total
              </th>
              <th className="pb-3 text-right font-mono text-[10px] uppercase tracking-widest text-muted">
                Savings
              </th>
            </tr>
          </thead>
          <tbody>
            {comparisons.map((row, index) => (
              <tr
                key={row.qty}
                className={cx(
                  "border-b border-line",
                  index === 0 && "bg-inset"
                )}
              >
                <td className="py-3 pr-4">
                  <span className="font-medium">
                    {row.qty.toLocaleString("en-US")}
                  </span>
                  {row.qty === ESTIMATE.qtyMin && (
                    <span className="ml-2 text-xs text-muted">(minimum)</span>
                  )}
                </td>
                <td className="py-3 pr-4 text-right font-mono">
                  {usd2(row.piece)}
                </td>
                <td className="py-3 pr-4 text-right font-mono">
                  {usd2(row.lot)}
                </td>
                <td className="py-3 text-right">
                  {row.savings > 0 ? (
                    <span className="rounded bg-copper/10 px-2 py-0.5 text-xs font-medium text-copper">
                      −{Math.round(row.savings * 100)}%
                    </span>
                  ) : (
                    <span className="text-xs text-muted">Base</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        All prices include ${ESTIMATE.setup} setup fee (once per lot).{" "}
        {ESTIMATE.qtyBreaks.map((b) => `−${Math.round(b.rate * 100)}% at ${b.qty.toLocaleString()}`).join(". ")}
        .
      </p>
    </div>
  );
}
