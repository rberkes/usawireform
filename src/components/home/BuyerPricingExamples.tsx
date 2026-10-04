import Link from "next/link";
import { formatHookBagUsd, hookBagRows } from "@/lib/hook-bag-prices";
import { FORMING_RATES } from "@/lib/price";
import { formatStapleUsd, stapleBagRows } from "@/lib/ground-staple-prices";
import { ESTIMATE } from "@/lib/quoting";

function pieceAtQty(each: number, qty: number) {
  const breakRate = qty >= 10000 ? 0.1 : qty >= 1000 ? 0.05 : 0;
  return each * (1 - breakRate);
}

export function BuyerPricingExamples() {
  const vHook = hookBagRows("v").find(
    (row) => row.mm === 4.57 && row.lengthIn === 6,
  );
  const staple6 = stapleBagRows().filter((row) => row.legIn === 6);
  const staple100 = staple6.find((row) => row.qty === 100);
  const staple500 = staple6.find((row) => row.qty === 500);
  const staple1000 = staple6.find((row) => row.qty === 1000);

  const cuts = 2;
  const bends = 4;
  const inches = 24;
  const formEach =
    cuts * ESTIMATE.cut + bends * ESTIMATE.bend + inches * ESTIMATE.inch;

  return (
    <div className="grid gap-5 md:grid-cols-3">
      {vHook ? (
        <PriceCard
          href="/powder-coating-hooks/prices"
          kicker="Powder coating hooks"
          title={`V-hook · ${vHook.inch} × ${vHook.lengthIn}"`}
          note={`Bag of ${vHook.qty}. Carbon. 2% under published bag cards.`}
          prices={[
            { qty: vHook.qty, each: vHook.pieceUsd, label: "listed bag" },
            {
              qty: 1000,
              each: pieceAtQty(vHook.pieceUsd, 1000),
              label: "−5%",
            },
            {
              qty: 10000,
              each: pieceAtQty(vHook.pieceUsd, 10000),
              label: "−10%",
            },
          ]}
        />
      ) : null}
      {staple100 && staple500 && staple1000 ? (
        <PriceCard
          href="/ground-staples/prices"
          kicker="Ground staples"
          title='8 ga · 6" landscape staple'
          note="5% under published USA 8 ga cards. Steel in the lot."
          prices={[
            { qty: staple100.qty, each: staple100.ourEach },
            { qty: staple500.qty, each: staple500.ourEach, label: "−31%" },
            { qty: staple1000.qty, each: staple1000.ourEach, label: "−38%" },
          ]}
        />
      ) : null}
      <PriceCard
        href="/instant-quote"
        kicker="Instant estimate"
        title="2 cuts · 4 bends · 24 in"
        note={`${FORMING_RATES.cutLabel}, ${FORMING_RATES.bendLabel}, ${FORMING_RATES.inchLabel}. Forming only — coil is separate.`}
        prices={[
          { qty: 100, each: formEach },
          { qty: 1000, each: pieceAtQty(formEach, 1000), label: "−5%" },
          { qty: 10000, each: pieceAtQty(formEach, 10000), label: "−10%" },
        ]}
      />
    </div>
  );
}

function PriceCard({
  href,
  kicker,
  title,
  note,
  prices,
}: {
  href: string;
  kicker: string;
  title: string;
  note: string;
  prices: { qty: number; each: number; label?: string }[];
}) {
  const featured = prices[0];
  return (
    <article className="flex flex-col border border-line bg-background p-6">
      <p className="font-mono text-[11px] tracking-[0.22em] text-copper uppercase">
        {kicker}
      </p>
      <h3 className="mt-2 text-lg tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{note}</p>
      <p className="mt-6 font-mono text-3xl text-copper">
        {formatHookBagUsd(featured.each)}
        <span className="ml-1 text-sm text-muted">/ea</span>
      </p>
      <ul className="mt-4 space-y-1.5 text-sm text-muted">
        {prices.map((row) => (
          <li key={row.qty} className="flex justify-between gap-3">
            <span>{row.qty.toLocaleString()} pcs</span>
            <span>
              {formatStapleUsd(row.each)}
              {row.label ? (
                <span className="ml-2 font-mono text-[11px] text-copper">
                  {row.label}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>
      <Link
        href={href}
        className="mt-6 text-sm font-medium text-copper hover:text-copper-dim"
      >
        See pricing →
      </Link>
    </article>
  );
}
