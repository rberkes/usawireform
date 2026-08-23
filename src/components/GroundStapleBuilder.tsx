"use client";

import { useActionState, useMemo, useState, type ReactNode } from "react";
import { submitInstantQuote, type QuoteFormState } from "@/app/actions/quote";
import { Button, EstimateMailNotice, fieldClass, Panel } from "@/components/ui";
import {
  STAPLE_MATERIALS,
  STAPLE_RADIUS,
  STAPLE_WIRES,
  buildStapleQuote,
  clampStapleRadius,
  formatInches,
  minCrownForStaple,
  roundCrownIn,
  stapleCenterlineRadius,
  staplePinForId,
  stapleRadiusMax,
  type StapleMaterialId,
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
  defaultRadius = STAPLE_RADIUS.defaultIn,
}: {
  defaultWire?: StapleWireId;
  defaultLeg?: number;
  defaultCrown?: number;
  defaultQty?: number;
  defaultMaterial?: StapleMaterialId;
  defaultRadius?: number;
}) {
  const [state, formAction, pending] = useActionState(
    submitInstantQuote,
    initialState,
  );
  const [wireId, setWireId] = useState<StapleWireId>(defaultWire);
  const [customMm, setCustomMm] = useState("4");
  const [leg, setLeg] = useState(String(defaultLeg));
  const [crown, setCrown] = useState(() => {
    const startPin = staplePinForId(defaultWire);
    const startWire = STAPLE_WIRES.find((row) => row.id === defaultWire);
    if (!startPin || !startWire) return String(defaultCrown);
    const minC = roundCrownIn(
      minCrownForStaple(startPin.insideRIn, startWire.inches),
    );
    return String(Math.max(defaultCrown, minC));
  });
  const [radius, setRadius] = useState(() => {
    const startPin = staplePinForId(defaultWire);
    return String(startPin?.insideRIn ?? defaultRadius);
  });
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
  const pin = staplePinForId(wireId);
  const radiusMax = stapleRadiusMax(crownN);
  const radiusN = pin
    ? pin.insideRIn
    : clampStapleRadius(Number(radius), crownN);
  const minCrownN = pin
    ? roundCrownIn(minCrownForStaple(pin.insideRIn, wireIn))
    : 0.5;
  const pinIn = pin && "pinIn" in pin ? pin.pinIn : undefined;

  const built = useMemo(
    () =>
      buildStapleQuote({
        wireIn,
        legIn: legN,
        crownIn: crownN,
        radiusIn: radiusN,
        quantity: qtyN,
        materialId,
      }),
    [wireIn, legN, crownN, radiusN, qtyN, materialId],
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
  const drawnRadius = built.ok ? built.radiusIn : radiusN;

  return (
    <form id="builder" action={formAction} className="scroll-mt-24 space-y-6">
      <p className="text-sm leading-6 text-muted">
        {PRICE_LINE} We buy the steel. Square-top U with a corner radius — not a
        sharp square, not a round-top pin. 8 ga + 1 in crown + 6 or 12 in legs +
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
                {material?.label.split(" (")[0]} square-top
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
              crownIn={crownN}
              legIn={legN}
              radiusIn={drawnRadius}
              pinIn={pinIn}
              pinLabel={pin?.label}
              ready={built.ok}
            />
            <p className="mt-3 font-mono text-[11px] tracking-widest text-muted uppercase">
              Qty: {Number.isFinite(qtyN) ? qtyN : "—"} pcs · {WIRE.short} · shop
              steel{built.ok && built.bag ? " · 8 ga bag" : ""} · R{" "}
              {formatInches(drawnRadius)}
              {pin ? ` · ${pin.label}` : ""}
            </p>
          </Panel>
          <Panel className="p-4 sm:p-5">
            <p className="font-mono text-[11px] tracking-[0.18em] text-copper uppercase">
              Custom staple summary
            </p>
            {built.ok ? (
              <dl className="mt-4 space-y-2 text-sm">
                <SumRow label="Part no." value={built.sku} />
                <SumRow label="Top" value="Square-top" />
                <SumRow
                  label="Inside R"
                  value={
                    pin
                      ? `${formatInches(built.radiusIn)} · ${pin.label}`
                      : formatInches(built.radiusIn)
                  }
                />
                <SumRow
                  label="Wire"
                  value={
                    wireId === "other"
                      ? `${customMm} mm`
                      : (wireRow?.label.split(" —")[0] ?? "")
                  }
                />
                <SumRow label="Leg" value={formatInches(legN)} />
                <SumRow
                  label="Crown"
                  value={formatInches(pin ? Math.max(crownN, minCrownN) : crownN)}
                />
                <SumRow
                  label="Developed"
                  value={formatInches(built.developedIn)}
                />
                <SumRow label="Each" value={usd2(built.estimate.piece)} />
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
          <Field label="Wire">
            <select
              className={fieldClass}
              value={wireId}
              onChange={(event) => {
                const id = event.target.value as StapleWireId;
                setWireId(id);
                const nextPin = staplePinForId(id);
                const nextWire = STAPLE_WIRES.find((row) => row.id === id);
                if (!nextPin || !nextWire) return;
                setRadius(String(nextPin.insideRIn));
                const minC = roundCrownIn(
                  minCrownForStaple(nextPin.insideRIn, nextWire.inches),
                );
                setCrown((current) =>
                  Number(current) < minC ? String(minC) : current,
                );
              }}
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
              min={minCrownN}
              max="6"
              step="0.25"
              value={crown}
              onChange={(event) => setCrown(event.target.value)}
            />
            <Hint>
              {pin
                ? `Opened for the ${pin.label}. Min ${formatInches(minCrownN)}.`
                : "1 in is the published 8 ga crown."}
            </Hint>
          </Field>
          <Field label="Inside corner R, inches">
            <input
              className={fieldClass}
              type="number"
              min={STAPLE_RADIUS.minIn}
              max={Number.isFinite(radiusMax) ? radiusMax : STAPLE_RADIUS.minIn}
              step={STAPLE_RADIUS.stepIn}
              value={pin ? String(pin.insideRIn) : radius}
              disabled={Boolean(pin)}
              onChange={(event) => setRadius(event.target.value)}
            />
            <Hint>
              {pin
                ? pinIn
                  ? `Locked to the ${pin.label}. Inside R ${formatInches(pin.insideRIn)}.`
                  : `Locked to stock tooling. Inside R ${formatInches(pin.insideRIn)}.`
                : `Inside corner. Keeps a flat on the crown. Max ${formatInches(radiusMax)} on this crown. Drawn as R on the top.`}
            </Hint>
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
          <input
            type="hidden"
            name="hookType"
            value={
              pin
                ? `Square-top · R ${formatInches(drawnRadius)} · ${pin.label}`
                : `Square-top · R ${formatInches(drawnRadius)}`
            }
          />
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
  crownIn,
  legIn,
  radiusIn,
  pinIn,
  pinLabel,
  ready,
}: {
  points: { x: number; y: number }[];
  wireIn: number;
  crownIn: number;
  legIn: number;
  radiusIn: number;
  pinIn?: number;
  pinLabel?: string;
  ready: boolean;
}) {
  const insideR = Math.max(radiusIn, 0.06);
  const rCl = stapleCenterlineRadius(insideR, wireIn);
  const half = Math.max(Number.isFinite(crownIn) ? crownIn : 0.5, 2 * rCl) / 2;
  const top = Number.isFinite(legIn) ? legIn : 6;
  const left = { x: -half + rCl, y: top - rCl };
  const right = { x: half - rCl, y: top - rCl };

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
  const padX = 1.4;
  const padTop = pinLabel ? 2.2 : 1.8;
  const padBot = 1.1;
  const w = maxX - minX + padX * 2;
  const h = maxY - minY + padTop + padBot;
  const vb = `${minX - padX} ${-(maxY + padTop)} ${w} ${h}`;
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${-p.y}`)
    .join(" ");
  const stroke = Math.max(wireIn, 0.12);
  const label = `R ${formatInches(insideR)}`;
  const pinNote = pinIn && pinLabel ? pinLabel : undefined;

  return (
    <svg
      viewBox={vb}
      className="mt-4 h-[min(22rem,55vw)] w-full bg-background"
      role="img"
      aria-label={`Square-top ground staple, inside radius ${label}${pinNote ? `, ${pinNote}` : ""}`}
    >
      {ready && d ? (
        <>
          <circle
            cx={left.x}
            cy={-left.y}
            r={insideR}
            fill="currentColor"
            className="text-copper/20"
          />
          <circle
            cx={right.x}
            cy={-right.y}
            r={insideR}
            fill="currentColor"
            className="text-copper/20"
          />
          <circle
            cx={left.x}
            cy={-left.y}
            r={insideR}
            fill="none"
            stroke="currentColor"
            className="text-copper"
            strokeWidth="0.035"
          />
          <circle
            cx={right.x}
            cy={-right.y}
            r={insideR}
            fill="none"
            stroke="currentColor"
            className="text-copper"
            strokeWidth="0.035"
          />
          <path
            d={d}
            fill="none"
            stroke="currentColor"
            strokeWidth={stroke}
            strokeLinecap="butt"
            strokeLinejoin="round"
          />
          <path
            d={`M ${left.x - insideR} ${-left.y} A ${insideR} ${insideR} 0 0 1 ${left.x} ${-(left.y + insideR)}`}
            fill="none"
            stroke="currentColor"
            className="text-copper"
            strokeWidth="0.045"
          />
          <line
            x1={left.x}
            y1={-left.y}
            x2={left.x - insideR}
            y2={-left.y}
            stroke="currentColor"
            className="text-copper"
            strokeWidth="0.035"
          />
          <line
            x1={left.x}
            y1={-left.y}
            x2={left.x}
            y2={-(left.y + insideR)}
            stroke="currentColor"
            className="text-copper"
            strokeWidth="0.035"
          />
          <text
            x={0}
            y={-(top + 0.55)}
            textAnchor="middle"
            className="fill-copper"
            fontSize="0.42"
            fontWeight="600"
          >
            {label}
          </text>
          {pinNote ? (
            <text
              x={0}
              y={-(top + 1.05)}
              textAnchor="middle"
              className="fill-copper"
              fontSize="0.32"
            >
              {pinNote}
            </text>
          ) : null}
        </>
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
