"use client";

import { useActionState, useMemo, useState, type ReactNode } from "react";
import { submitInstantQuote, type QuoteFormState } from "@/app/actions/quote";
import { Button, EstimateMailNotice, fieldClass, Panel } from "@/components/ui";
import {
  STAPLE_MATERIALS,
  STAPLE_TOPS,
  STAPLE_WIRES,
  buildStapleQuote,
  formatInches,
  type StapleMaterialId,
  type StapleTopId,
  type StapleWireId,
} from "@/lib/ground-staple-builder";
import { ESTIMATE, usd2 } from "@/lib/quoting";
import { PRICE_LINE, QUOTE_REVIEW, TOOLING } from "@/lib/price";
import { WIRE } from "@/lib/range";
import type { EstimateMaterialId } from "@/lib/quoting";

const initialState: QuoteFormState = { success: false, message: "" };

export function GroundStapleBuilder({
  defaultWire = "8ga",
  defaultLeg = 6,
  defaultCrown = 1,
  defaultQty = 100,
  defaultMaterial = "galvanized",
  defaultTop = "square",
}: {
  defaultWire?: StapleWireId;
  defaultLeg?: number;
  defaultCrown?: number;
  defaultQty?: number;
  defaultMaterial?: StapleMaterialId;
  defaultTop?: StapleTopId;
}) {
  const [state, formAction, pending] = useActionState(
    submitInstantQuote,
    initialState,
  );
  const [top, setTop] = useState<StapleTopId>(defaultTop);
  const [wireId, setWireId] = useState<StapleWireId>(defaultWire);
  const [customMm, setCustomMm] = useState("4");
  const [leg, setLeg] = useState(String(defaultLeg));
  const [crown, setCrown] = useState(String(defaultCrown));
  const [qty, setQty] = useState(String(defaultQty));
  const [materialId, setMaterialId] = useState<StapleMaterialId>(defaultMaterial);
  const [notes, setNotes] = useState("");

  const wireRow = STAPLE_WIRES.find((row) => row.id === wireId);
  const customMmValue = Number(customMm);
  const wireIn =
    wireId === "other"
      ? Number.isFinite(customMmValue)
        ? customMmValue / 25.4
        : 0
      : (wireRow?.inches ?? 0);
  const legN = Number(leg);
  const crownN = Number(crown);
  const qtyN = Number(qty);
  const material = STAPLE_MATERIALS.find((row) => row.id === materialId);
  const topMeta = STAPLE_TOPS.find((row) => row.id === top) ?? STAPLE_TOPS[0];

  const built = useMemo(
    () =>
      buildStapleQuote({
        top,
        wireIn,
        legIn: legN,
        crownIn: crownN,
        quantity: qtyN,
        materialId,
      }),
    [top, wireIn, legN, crownN, qtyN, materialId],
  );

  const stockId =
    wireId === "3/8 in" || wireId === "7/16 in" || wireId === "1/2 in"
      ? wireId
      : "other";
  const customMmPosted =
    wireId === "other"
      ? customMm
      : wireId === "8ga"
        ? "4.11"
        : wireId === "1/4 in"
          ? "6.35"
          : "";
  const pricing = built.ok && built.bag ? "staple-bag" : "v-hook-supplied";

  return (
    <form id="builder" action={formAction} className="scroll-mt-24 space-y-6">
      <p className="text-sm leading-6 text-muted">
        {PRICE_LINE} We buy the steel. 8 ga + 1 in crown + 6 or 12 in legs +
        carbon: 5% under the published USA 8 ga bag. Everything else: $1.00 per
        cut, $0.09 per developed inch on 3/8 in (heavier wire scales by
        section), plus the steel, then 5% off. {WIRE.short} only. 11 ga and 9 ga
        are under 4 mm — no. {QUOTE_REVIEW}
      </p>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Panel className="p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                {material?.label.split(" (")[0]} {topMeta.label}
              </p>
              {built.ok ? (
                <p className="font-mono text-2xl tracking-tight text-copper">
                  {usd2(built.estimate.lot)}
                  <span className="ml-2 text-sm text-muted">est. total</span>
                </p>
              ) : (
                <p className="text-sm text-muted">Enter staple details</p>
              )}
            </div>
            <StapleDrawing
              points={built.ok ? built.points : []}
              wireIn={wireIn}
              ready={built.ok}
            />
            <p className="mt-3 font-mono text-[11px] tracking-widest text-muted uppercase">
              Qty: {Number.isFinite(qtyN) ? qtyN : "—"} pcs · {WIRE.short} · shop
              steel{built.ok && built.bag ? " · 8 ga bag" : ""}
            </p>
          </Panel>
          <Panel className="p-4 sm:p-5">
            <p className="font-mono text-[11px] tracking-[0.18em] text-copper uppercase">
              Custom staple summary
            </p>
            {built.ok ? (
              <dl className="mt-4 space-y-2 text-sm">
                <SumRow label="Part no." value={built.sku} />
                <SumRow label="Top" value={topMeta.label} />
                <SumRow
                  label="Wire"
                  value={
                    wireId === "other"
                      ? `${customMm} mm`
                      : (wireRow?.label.split(" —")[0] ?? "")
                  }
                />
                <SumRow label="Leg" value={formatInches(legN)} />
                <SumRow label="Crown" value={formatInches(crownN)} />
                <SumRow
                  label="Developed"
                  value={formatInches(built.developedIn)}
                />
                <SumRow
                  label="Each"
                  value={usd2(built.estimate.piece)}
                />
                <SumRow label="Lot" value={usd2(built.estimate.lot)} />
                {built.bag ? (
                  <SumRow
                    label="Card"
                    value={`5% under USA 8 ga · nearest ${built.estimate.bagQty?.toLocaleString("en-US")} pc bag`}
                  />
                ) : (
                  <SumRow
                    label="Steel"
                    value={`${built.estimate.steelLb.toFixed(3)} lb · ${usd2(built.estimate.steelUsd)}`}
                  />
                )}
              </dl>
            ) : (
              <p className="mt-4 text-sm text-muted">{built.message}</p>
            )}
          </Panel>
        </div>

        <Panel className="space-y-4 p-4 sm:p-5">
          <Field label="Top">
            <select
              className={fieldClass}
              value={top}
              onChange={(event) => setTop(event.target.value as StapleTopId)}
            >
              {STAPLE_TOPS.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Wire">
            <select
              className={fieldClass}
              value={wireId}
              onChange={(event) => setWireId(event.target.value as StapleWireId)}
            >
              {STAPLE_WIRES.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
            <Hint>{wireRow?.note}</Hint>
          </Field>
          {wireId === "other" ? (
            <Field label={`Diameter, mm (${WIRE.minMm}–${WIRE.maxMm})`}>
              <input
                className={fieldClass}
                type="number"
                min={WIRE.minMm}
                max={WIRE.maxMm}
                step="0.1"
                value={customMm}
                onChange={(event) => setCustomMm(event.target.value)}
              />
            </Field>
          ) : null}
          <Field label="Leg length, inches">
            <input
              className={fieldClass}
              type="number"
              min="2"
              max="24"
              step="0.25"
              value={leg}
              onChange={(event) => setLeg(event.target.value)}
            />
            <Hint>6 in and 12 in 8 ga hit the bag card.</Hint>
          </Field>
          <Field label="Crown, inches">
            <input
              className={fieldClass}
              type="number"
              min="0.5"
              max="6"
              step="0.25"
              value={crown}
              onChange={(event) => setCrown(event.target.value)}
            />
            <Hint>1 in is the published 8 ga crown.</Hint>
          </Field>
          <Field label="Material">
            <select
              className={fieldClass}
              value={materialId}
              onChange={(event) =>
                setMaterialId(event.target.value as StapleMaterialId)
              }
            >
              {STAPLE_MATERIALS.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label={`Quantity (${ESTIMATE.qtyMin} min)`}>
            <input
              className={fieldClass}
              type="number"
              min={ESTIMATE.qtyMin}
              step="1"
              value={qty}
              onChange={(event) => setQty(event.target.value)}
            />
          </Field>
          <Field label="Notes">
            <textarea
              className={fieldClass}
              name="hookNotes"
              rows={3}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Ends, point, finish, packaging."
            />
          </Field>

          <input type="hidden" name="stockId" value={stockId} />
          <input type="hidden" name="customMm" value={customMmPosted} />
          <input type="hidden" name="pricing" value={pricing} />
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
          <input
            type="hidden"
            name="materialId"
            value={materialId as EstimateMaterialId}
          />
          <input type="hidden" name="qty" value={qty} />
          <input type="hidden" name="hookType" value={topMeta.label} />
          <input type="hidden" name="overallIn" value={leg} />
          <input type="hidden" name="legIdIn" value={crown} />

          <label className="block text-sm">
            Email this estimate
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
          <Button type="submit" disabled={!built.ok || pending}>
            {pending ? "Sending..." : "Email this estimate"}
          </Button>
          <EstimateMailNotice
            success={state.success}
            message={state.message}
            receiptTo={state.receiptTo}
          />
          {!wireRow?.stock && wireId !== "other" && wireId !== "8ga" ? (
            <p className="text-sm leading-6 text-muted">
              Non-stock diameter: new tooling in {TOOLING.newLead},{" "}
              {TOOLING.newCostLabel}. Not in the piece price.
            </p>
          ) : null}
        </Panel>
      </div>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block text-sm">
      {label}
      <div className="mt-1.5 space-y-1">{children}</div>
    </label>
  );
}

function Hint({ children }: { children: ReactNode }) {
  return <span className="block text-sm leading-5 text-muted">{children}</span>;
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-muted">{label}</dt>
      <dd className="text-right font-mono text-[13px]">{value}</dd>
    </div>
  );
}

function StapleDrawing({
  points,
  wireIn,
  ready,
}: {
  points: { x: number; y: number }[];
  wireIn: number;
  ready: boolean;
}) {
  let minX = -1;
  let maxX = 1;
  let minY = 0;
  let maxY = 8;
  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  const pad = 1.2;
  const w = maxX - minX + pad * 2;
  const h = maxY - minY + pad * 2;
  const vb = `${minX - pad} ${-(maxY + pad)} ${w} ${h}`;
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${-p.y}`)
    .join(" ");
  const stroke = Math.max(wireIn, 0.12);

  return (
    <svg
      viewBox={vb}
      className="mt-4 h-[min(22rem,55vw)] w-full bg-background"
      role="img"
      aria-label="Ground staple drawing"
    >
      {ready && d ? (
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
        />
      ) : (
        <text
          x={0}
          y={-4}
          textAnchor="middle"
          className="fill-muted"
          fontSize="0.45"
        >
          Drawing updates with the form
        </text>
      )}
    </svg>
  );
}
