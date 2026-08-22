"use client";

import { useActionState, useMemo, useState } from "react";
import { submitInstantQuote, type QuoteFormState } from "@/app/actions/quote";
import { HookFigure } from "@/components/VHookFigure";
import { Button, fieldClass, Panel } from "@/components/ui";
import { buildHookQuote } from "@/lib/hook-builder";
import {
  HEAVY_DUTY_V_SIZES,
  priceHeavyDutyV,
  type HeavyDutyVSizeId,
} from "@/lib/heavy-duty-v-hooks";
import { ESTIMATE, usd2 } from "@/lib/quoting";
import { PRICE_LINE, QUOTE_REVIEW } from "@/lib/price";
import { cx } from "@/lib/cx";
import type { EstimateMaterialId } from "@/lib/quoting";

const initialState: QuoteFormState = { success: false, message: "" };

export function HeavyDutyVHookCalculator() {
  const [state, formAction, pending] = useActionState(
    submitInstantQuote,
    initialState,
  );
  const [overall, setOverall] = useState("12");
  const [legId, setLegId] = useState("4");
  const [qty, setQty] = useState("100");
  const [sizeId, setSizeId] = useState<HeavyDutyVSizeId>("3-8");
  const [notes, setNotes] = useState("");

  const overallN = Number(overall);
  const legN = Number(legId);
  const qtyN = Number(qty);
  const selected = HEAVY_DUTY_V_SIZES.find((row) => row.id === sizeId)!;

  const built = useMemo(
    () =>
      buildHookQuote({
        type: "v",
        wireIn: selected.inches,
        overall: overallN,
        legId: legN,
        quantity: qtyN,
      }),
    [selected.inches, overallN, legN, qtyN],
  );

  const columns = useMemo(() => {
    if (!built.ok) return null;
    return HEAVY_DUTY_V_SIZES.map((size) => ({
      size,
      price: priceHeavyDutyV({
        developedIn: built.developedIn,
        cuts: built.cuts,
        bends: built.bends,
        quantity: qtyN,
        diameterIn: size.inches,
      }),
    }));
  }, [built, qtyN]);

  const selectedColumn = columns?.find((col) => col.size.id === sizeId);

  return (
    <form id="calculator" action={formAction} className="scroll-mt-24 space-y-6">
      <p className="text-sm leading-6 text-muted">
        {PRICE_LINE} USA made heavy-duty powder coat V-hooks in 3/8, 7/16, and
        1/2 in. We buy the steel — it is in the price. 3/8 in: $1.00 per cut,
        $0.09 per developed inch, then 5% off boxed 0.375 in. 7/16 and 1/2 in
        are stock here — they scale the inch rate by section vs 3/8 in. Bends
        are in the drawing, not billed.
      </p>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="space-y-4">
          <HookFigure
            type="v"
            overall={Number.isFinite(overallN) ? overallN : 12}
            legId={Number.isFinite(legN) ? legN : 4}
            label="USA made V-hook"
          />
          <Panel className="p-4 sm:p-5">
            <label className="block text-sm">
              Overall length, inches
              <input
                className={`mt-1.5 ${fieldClass}`}
                type="number"
                min="1"
                max="48"
                step="0.25"
                value={overall}
                onChange={(event) => setOverall(event.target.value)}
              />
            </label>
            <label className="mt-4 block text-sm">
              Leg length ID, inches
              <input
                className={`mt-1.5 ${fieldClass}`}
                type="number"
                min="0.5"
                step="0.25"
                value={legId}
                onChange={(event) => setLegId(event.target.value)}
              />
            </label>
            <label className="mt-4 block text-sm">
              Total quantity ({ESTIMATE.qtyMin} min)
              <input
                className={`mt-1.5 ${fieldClass}`}
                type="number"
                min={ESTIMATE.qtyMin}
                step="1"
                value={qty}
                onChange={(event) => setQty(event.target.value)}
              />
            </label>
            <p className="mt-2 text-sm leading-5 text-muted">
              100 pcs to start. −5% at 1,000. −10% at 10,000.
            </p>
          </Panel>
        </div>

        <div className="space-y-4">
          <div
            role="radiogroup"
            aria-label="Heavy-duty wire size"
            className="grid gap-px bg-line sm:grid-cols-3"
          >
            {(columns ?? HEAVY_DUTY_V_SIZES.map((size) => ({ size, price: null }))).map(
              (col) => {
                const active = col.size.id === sizeId;
                return (
                  <button
                    key={col.size.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSizeId(col.size.id)}
                    className={cx(
                      "bg-background p-4 text-left sm:p-5",
                      active && "ring-2 ring-inset ring-copper",
                    )}
                  >
                    <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                      {col.size.label}
                    </p>
                    <p className="mt-1 text-sm text-foreground">
                      {col.size.mm} mm · {col.size.inches} in
                    </p>
                    {col.price && built.ok ? (
                      <>
                        <p className="mt-4 font-mono text-2xl tracking-tight text-copper">
                          {usd2(col.price.lot)}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {usd2(col.price.piece)} / pc
                        </p>
                        <p className="mt-3 font-mono text-[11px] leading-5 tracking-wide text-muted uppercase">
                          {usd2(col.price.inchRate)} / in
                        </p>
                        <p className="mt-1 text-sm leading-5 text-muted">
                          {col.size.rateCopy}
                        </p>
                      </>
                    ) : (
                      <p className="mt-4 text-sm text-muted">Enter hook details</p>
                    )}
                  </button>
                );
              },
            )}
          </div>

          {built.ok && selectedColumn ? (
            <Panel className="p-4 sm:p-5">
              <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                {selected.label} · steel in
              </p>
              <dl className="mt-4 space-y-2 text-sm">
                <SumRow label="Cuts" value={`${built.cuts} × $1.00`} />
                <SumRow
                  label="Developed length"
                  value={`${built.developedIn.toFixed(2)} in`}
                />
                <SumRow
                  label="Inch rate"
                  value={usd2(selectedColumn.price.inchRate)}
                />
                {selectedColumn.price.areaRatio !== 1 ? (
                  <SumRow
                    label="Area vs 3/8 in"
                    value={`${selectedColumn.price.areaRatio.toFixed(3)}×`}
                  />
                ) : null}
                <SumRow
                  label="Forming"
                  value={usd2(selectedColumn.price.forming)}
                />
                <SumRow
                  label="Steel (shop)"
                  value={`${selectedColumn.price.steelLb.toFixed(3)} lb · ${usd2(selectedColumn.price.steelUsd)}`}
                />
                <SumRow
                  label="5% under boxed 3/8"
                  value={`−${usd2(selectedColumn.price.beatUsd)}`}
                />
                <SumRow label="Per piece" value={usd2(selectedColumn.price.piece)} />
                <SumRow label="Lot" value={usd2(selectedColumn.price.lot)} />
              </dl>
              <p className="mt-4 text-sm leading-6 text-muted">{QUOTE_REVIEW}</p>
            </Panel>
          ) : built.ok === false ? (
            <p className="text-sm leading-6 text-copper">{built.message}</p>
          ) : null}

          <Panel className="p-4 sm:p-5">
            <label className="block text-sm">
              Additional notes
              <textarea
                className={`mt-1.5 min-h-24 ${fieldClass}`}
                name="hookNotes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Openings, 90° rotation, finish, rack notes."
              />
            </label>
            <input type="hidden" name="stockId" value={selected.stockId} />
            <input type="hidden" name="customMm" value="" />
            <input type="hidden" name="pricing" value="heavy-duty-v" />
            <input
              type="hidden"
              name="cuts"
              value={built.ok ? String(built.cuts) : ""}
            />
            <input
              type="hidden"
              name="bends"
              value={built.ok ? String(built.bends) : ""}
            />
            <input
              type="hidden"
              name="lengthIn"
              value={built.ok ? String(built.developedIn) : ""}
            />
            <input type="hidden" name="materialId" value={"1018" satisfies EstimateMaterialId} />
            <input type="hidden" name="qty" value={qty} />

            <label className="mt-4 block text-sm">
              Email this {selected.label} estimate
              <input
                className={`mt-1.5 ${fieldClass}`}
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                disabled={!built.ok}
              />
            </label>
            <Button
              type="submit"
              className="mt-4"
              disabled={!built.ok || pending}
            >
              {pending ? "Sending..." : `Email ${selected.label} estimate`}
            </Button>
            {state.message ? (
              <p
                className={`mt-3 text-sm leading-6 ${
                  state.success ? "text-foreground" : "text-copper"
                }`}
              >
                {state.message}
              </p>
            ) : null}
          </Panel>
        </div>
      </div>
    </form>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-mono text-[13px]">{value}</dd>
    </div>
  );
}
