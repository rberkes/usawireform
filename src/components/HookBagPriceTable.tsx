import Link from "next/link";
import {
  formatHookBagUsd,
  hookBagRows,
  HOOK_BAG_LINE,
  HOOK_BAG_STYLE_LABEL,
  HOOK_BAG_WIRES,
  type HookBagStyle,
} from "@/lib/hook-bag-prices";

const STYLE_HREF: Record<HookBagStyle, string> = {
  v: "/v-hooks",
  s: "/s-hooks",
  c: "/c-hooks",
};

export function HookBagPriceTable({
  style,
  heading = "h2",
}: {
  style?: HookBagStyle;
  heading?: "h2" | "h3";
}) {
  const rows = hookBagRows(style);
  const Title = heading;
  const groups = style
    ? [{ style, rows }]
    : (["v", "s", "c"] as const).map((kind) => ({
        style: kind,
        rows: rows.filter((row) => row.style === kind),
      }));

  return (
    <div className="not-prose">
      <p className="text-sm leading-6 text-muted">{HOOK_BAG_LINE}</p>
      {groups.map((group) => (
        <div key={group.style} className="mt-8">
          {!style ? (
            <Title className="font-sans text-xl font-medium tracking-tight">
              <Link href={STYLE_HREF[group.style]} className="hover:text-copper">
                {HOOK_BAG_STYLE_LABEL[group.style]}
              </Link>
            </Title>
          ) : null}
          {HOOK_BAG_WIRES.map((wire) => {
            const slice = group.rows.filter((row) => row.mm === wire.mm);
            if (slice.length === 0) return null;
            return (
              <div key={`${group.style}-${wire.mm}`} className="mt-6 overflow-x-auto">
                <p className="font-mono text-[11px] tracking-widest text-copper uppercase">
                  {wire.label} · {wire.inch} · 1½ in arch
                </p>
                <table className="mt-2 w-full min-w-[32rem] text-sm">
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th className="py-2 pr-3 font-medium">SKU</th>
                      <th className="py-2 pr-3 font-medium">Length</th>
                      <th className="py-2 pr-3 font-medium">Qty</th>
                      <th className="py-2 pr-3 font-medium">Lot</th>
                      <th className="py-2 font-medium">Each</th>
                    </tr>
                  </thead>
                  <tbody>
                    {slice.map((row) => (
                      <tr key={row.sku} className="border-b border-line/70">
                        <td className="py-2 pr-3 font-mono text-xs">{row.sku}</td>
                        <td className="py-2 pr-3">{row.lengthIn} in</td>
                        <td className="py-2 pr-3">{row.qty.toLocaleString("en-US")}</td>
                        <td className="py-2 pr-3">{formatHookBagUsd(row.bagUsd)}</td>
                        <td className="py-2">{formatHookBagUsd(row.pieceUsd)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
