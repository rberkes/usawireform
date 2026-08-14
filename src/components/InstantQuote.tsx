"use client";

import { useMemo, useState } from "react";
import { COMMON_SIZES, WIRE } from "@/lib/range";
import {
  ESTIMATE,
  ESTIMATE_MATERIALS,
  estimatePiece,
  usd2,
  type EstimateMaterialId,
} from "@/lib/quoting";
import { fieldClass, Panel } from "./ui";
import { VolumeComparison } from "./VolumeComparison";

const stockOptions = COMMON_SIZES.map((size) => ({
  id: size.fraction,
  label: `${size.fraction} (${size.mm})`,
  inches: Number.parseFloat(size.decimal),
}));

export function InstantQuote() {
  const [stockId, setStockId] = useState<string>(stockOptions[0].id);
  const [customMm, setCustomMm] = useState("");
  const [bends, setBends] = useState("4");
  const [lengthIn, setLengthIn] = useState("24");
  const [materialId, setMaterialId] = useState<EstimateMaterialId>("1018");
  const [qty, setQty] = useState("100");
  const [showComparison, setShowComparison] = useState(false);

  const stock = stockOptions.find((option) => option.id === stockId);
  const customMmValue = Number(customMm);
  const diameterIn = stock
    ? stock.inches
    : Number.isFinite(customMmValue)
      ? customMmValue / 25.4
      : 0;
  const bendCount = Number(bends);
  const length = Number(lengthIn);
  const quantity = Number(qty);
  const material = ESTIMATE_MATERIALS.find((row) => row.id === materialId);

  const inBand = diameterIn >= WIRE.minIn && diameterIn <= WIRE.maxIn;
  const qtyOk =
    Number.isFinite(quantity) && quantity >= ESTIMATE.qtyMin;
  const ready =
    Boolean(material) &&
    inBand &&
    Number.isFinite(bendCount) &&
    bendCount >= 0 &&
    Number.isFinite(length) &&
    length > 0 &&
    qtyOk;

  const result = useMemo(() => {
    if (!ready || !material) return null;
    return estimatePiece({
      diameterIn,
      bends: bendCount,
      lengthIn: length,
      stainless: material.stainless,
      quantity,
    });
  }, [ready, material, diameterIn, bendCount, length, quantity]);

  const lotReady = Boolean(result && qtyOk);

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <p className="mb-5 text-sm font-medium text-copper">
            Fill diameter, bends, length, and material. The estimate updates as
            you type.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm">
              Wire diameter
              <select
                className={`mt-1.5 ${fieldClass}`}
                value={stockId}
                onChange={(event) => setStockId(event.target.value)}
              >
                {stockOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label} — stock
                  </option>
                ))}
                <option value="other">Other in {WIRE.short}</option>
              </select>
            </label>
            {stock ? (
              <p className="self-end text-sm leading-6 text-muted">
                Stock coil. Other sizes in {WIRE.short} still form — they need
                tooling on the production quote.
              </p>
            ) : (
              <label className="block text-sm">
                Diameter, mm
                <input
                  className={`mt-1.5 ${fieldClass}`}
                  type="number"
                  min={WIRE.minMm}
                  max={WIRE.maxMm}
                  step="0.1"
                  value={customMm}
                  onChange={(event) => setCustomMm(event.target.value)}
                  placeholder={`${WIRE.minMm}–${WIRE.maxMm}`}
                />
              </label>
            )}
            <label className="block text-sm">
              Number of bends
              <input
                className={`mt-1.5 ${fieldClass}`}
                type="number"
                min="0"
                step="1"
                value={bends}
                onChange={(event) => setBends(event.target.value)}
              />
            </label>
            <label className="block text-sm">
              Total part length, inches
              <input
                className={`mt-1.5 ${fieldClass}`}
                type="number"
                min="0.1"
                step="0.1"
                value={lengthIn}
                onChange={(event) => setLengthIn(event.target.value)}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              Material
              <select
                className={`mt-1.5 ${fieldClass}`}
                value={materialId}
                onChange={(event) =>
                  setMaterialId(event.target.value as EstimateMaterialId)
                }
              >
                {ESTIMATE_MATERIALS.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Quantity ({ESTIMATE.qtyMin} min)
              <input
                className={`mt-1.5 ${fieldClass}`}
                type="number"
                min={ESTIMATE.qtyMin}
                step="1"
                value={qty}
                onChange={(event) => setQty(event.target.value)}
              />
            </label>
          </div>
        </Panel>

        <Panel>
          {!ready || !result ? (
            <>
              <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                Estimate
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Enter a diameter in {WIRE.short}, bends, length, material, and
                at least {ESTIMATE.qtyMin} pcs.
                {stockId === "other" && customMm && !inBand
                  ? ` ${WIRE.short} only.`
                  : null}
                {Number.isFinite(quantity) && quantity > 0 && !qtyOk
                  ? ` Quantity starts at ${ESTIMATE.qtyMin}.`
                  : null}
              </p>
            </>
          ) : (
            <>
              <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                Sell estimate
              </p>
              <p className="mt-3 font-mono text-4xl tracking-tight text-foreground">
                {usd2(result.piece)}
                <span className="ml-2 text-base text-muted">/ piece</span>
              </p>
              {lotReady ? (
                <p className="mt-2 text-lg text-foreground">
                  {usd2(result.lot)} for {quantity.toLocaleString("en-US")} pcs
                  including setup
                </p>
              ) : null}
              <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
                <Row
                  label={`Forming · ${length} in · ${usd2(result.inchRate)}/in`}
                  value={usd2(result.forming)}
                />
                <Row label="Cut" value={usd2(result.cut)} />
                <Row
                  label={`${bendCount} bend${bendCount === 1 ? "" : "s"}`}
                  value={usd2(result.bendCost)}
                />
                {result.discountRate > 0 ? (
                  <Row
                    label={`Qty break · −${Math.round(result.discountRate * 100)}%`}
                    value={`−${usd2(result.gross - result.piece)}`}
                  />
                ) : null}
                <Row label="Setup · once" value={usd2(result.setup)} />
              </dl>
              <button
                type="button"
                onClick={() => setShowComparison(!showComparison)}
                className="mt-6 text-sm text-copper hover:underline"
              >
                {showComparison ? "Hide" : "Show"} volume pricing comparison
              </button>
            </>
          )}
        </Panel>
      </div>

      {/* Volume comparison table */}
      {ready && result && showComparison && material && (
        <Panel>
          <VolumeComparison
            diameterIn={diameterIn}
            bends={bendCount}
            lengthIn={length}
            stainless={material.stainless}
          />
        </Panel>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="font-mono">{value}</dd>
    </div>
  );
}
