import {
  formatSquareHangUsd,
  squareHangRows,
  SQUARE_HANG_LINE,
  SQUARE_HANG_WIRES,
} from "@/lib/square-hanging-hooks";

export function SquareHangPriceTable() {
  const rows = squareHangRows();

  return (
    <div className="not-prose">
      <p className="text-sm leading-6 text-muted">{SQUARE_HANG_LINE}</p>
      {SQUARE_HANG_WIRES.map((wire) => {
        const slice = rows.filter((row) => row.dIn === wire.dIn);
        return (
          <div key={wire.dIn} className="mt-6 overflow-x-auto">
            <p className="font-mono text-[11px] tracking-widest text-copper uppercase">
              {wire.label} · {wire.inch} · square hang
            </p>
            <table className="mt-2 w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-line text-left">
                  <th className="py-2 pr-3 font-medium">Part no.</th>
                  <th className="py-2 pr-3 font-medium">Length</th>
                  <th className="py-2 pr-3 font-medium">Qty</th>
                  <th className="py-2 pr-3 font-medium">1 lot</th>
                  <th className="py-2 pr-3 font-medium">10 lots</th>
                  <th className="py-2 font-medium">Each</th>
                </tr>
              </thead>
              <tbody>
                {slice.map((row) => (
                  <tr key={row.sku} className="border-b border-line/70">
                    <td className="py-2 pr-3 font-mono text-xs">{row.sku}</td>
                    <td className="py-2 pr-3">{row.lengthIn} in</td>
                    <td className="py-2 pr-3">
                      {row.qty.toLocaleString("en-US")}
                    </td>
                    <td className="py-2 pr-3">{formatSquareHangUsd(row.bagUsd)}</td>
                    <td className="py-2 pr-3">
                      {formatSquareHangUsd(row.bag10Usd)}
                    </td>
                    <td className="py-2">{formatSquareHangUsd(row.pieceUsd)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
