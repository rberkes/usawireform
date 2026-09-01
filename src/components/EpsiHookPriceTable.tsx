import Link from "next/link";
import {
  EPSI_HOOK_LINE,
  EPSI_HOOK_STYLE_HREF,
  EPSI_HOOK_STYLE_LABEL,
  EPSI_HOOK_STYLES,
  epsiHookRows,
  formatEpsiHookUsd,
  type EpsiHookStyle,
} from "@/lib/epsi-hook-prices";

function geometry(row: { bowlIn?: number; legIn?: number }) {
  if (row.bowlIn) return `${row.bowlIn} in bowl`;
  if (row.legIn) return `${row.legIn} in legs`;
  return "—";
}

export function EpsiHookPriceTable({
  style,
  heading = "h2",
}: {
  style?: EpsiHookStyle;
  heading?: "h2" | "h3";
}) {
  const rows = epsiHookRows(style);
  const Title = heading;
  const groups = style
    ? [{ style, rows }]
    : EPSI_HOOK_STYLES.map((kind) => ({
        style: kind,
        rows: rows.filter((row) => row.style === kind),
      }));

  return (
    <div className="not-prose">
      <p className="text-sm leading-6 text-muted">{EPSI_HOOK_LINE}</p>
      {groups.map((group) => (
        <div key={group.style} className="mt-8" id={style ? undefined : group.style}>
          {!style ? (
            <Title className="font-sans text-xl font-medium tracking-tight">
              <Link
                href={EPSI_HOOK_STYLE_HREF[group.style]}
                className="hover:text-copper"
              >
                {EPSI_HOOK_STYLE_LABEL[group.style]}
              </Link>
            </Title>
          ) : null}
          {([0.18, 0.25] as const).map((dIn) => {
            const slice = group.rows.filter((row) => row.dIn === dIn);
            if (slice.length === 0) return null;
            const sample = slice[0];
            return (
              <div
                key={`${group.style}-${dIn}`}
                className="mt-6 overflow-x-auto"
              >
                <p className="font-mono text-[11px] tracking-widest text-copper uppercase">
                  {sample.mmLabel} · {sample.inch}
                </p>
                <table className="mt-2 w-full min-w-[36rem] text-sm">
                  <thead>
                    <tr className="border-b border-line text-left">
                      <th className="py-2 pr-3 font-medium">Part no.</th>
                      <th className="py-2 pr-3 font-medium">Length</th>
                      <th className="py-2 pr-3 font-medium">Hang</th>
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
                        <td className="py-2 pr-3">{geometry(row)}</td>
                        <td className="py-2 pr-3">
                          {row.qty.toLocaleString("en-US")}
                        </td>
                        <td className="py-2 pr-3">
                          {formatEpsiHookUsd(row.bagUsd)}
                        </td>
                        <td className="py-2">
                          {formatEpsiHookUsd(row.pieceUsd)}
                        </td>
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
