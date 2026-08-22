"use client";

import Link from "next/link";
import { useActionState, useMemo, useState, type ReactNode } from "react";
import { submitInstantQuote, type QuoteFormState } from "@/app/actions/quote";
import { Button, fieldClass, Panel } from "@/components/ui";
import {
  HOOK_MATERIALS,
  HOOK_TYPES,
  HOOK_WIRES,
  buildHookQuote,
  formatInches,
  type HookMaterialId,
  type HookTypeId,
  type HookWireId,
} from "@/lib/hook-builder";
import { isShopSteelHook } from "@/lib/v-hook-price";
import { ESTIMATE, usd2 } from "@/lib/quoting";
import { PRICE_LINE, QUOTE_REVIEW, TOOLING } from "@/lib/price";
import { WIRE } from "@/lib/range";
import type { EstimateMaterialId } from "@/lib/quoting";

const initialState: QuoteFormState = { success: false, message: "" };

export function HookBuilder({
  defaultType = "v",
  defaultWire = "3/8 in",
  defaultOverall = 12,
  defaultLeg = 4,
  defaultQty = 100,
  defaultMaterial = "1018",
}: {
  defaultType?: HookTypeId;
  defaultWire?: HookWireId;
  defaultOverall?: number;
  defaultLeg?: number;
  defaultQty?: number;
  defaultMaterial?: HookMaterialId;
}) {
  const [state, formAction, pending] = useActionState(
    submitInstantQuote,
    initialState,
  );
  const [type, setType] = useState<HookTypeId>(defaultType);
  const [wireId, setWireId] = useState<HookWireId>(defaultWire);
  const [customMm, setCustomMm] = useState("4");
  const [overall, setOverall] = useState(String(defaultOverall));
  const [legId, setLegId] = useState(String(defaultLeg));
  const [qty, setQty] = useState(String(defaultQty));
  const [materialId, setMaterialId] = useState<HookMaterialId>(defaultMaterial);
  const [notes, setNotes] = useState("");

  const wireRow = HOOK_WIRES.find((row) => row.id === wireId);
  const customMmValue = Number(customMm);
  const wireIn =
    wireId === "other"
      ? Number.isFinite(customMmValue)
        ? customMmValue / 25.4
        : 0
      : (wireRow?.inches ?? 0);
  const overallN = Number(overall);
  const legN = Number(legId);
  const qtyN = Number(qty);
  const typeMeta = HOOK_TYPES.find((row) => row.id === type) ?? HOOK_TYPES[0];
  const material = HOOK_MATERIALS.find((row) => row.id === materialId);

  const built = useMemo(
    () =>
      buildHookQuote({
        type,
        wireIn,
        overall: overallN,
        legId: legN,
        quantity: qtyN,
        materialId,
      }),
    [type, wireIn, overallN, legN, qtyN, materialId],
  );
  const shopSteel = isShopSteelHook(type);

  const stockId =
    wireId === "3/8 in" || wireId === "7/16 in" || wireId === "1/2 in"
      ? wireId
      : "other";
  const customMmPosted =
    wireId === "other"
      ? customMm
      : wireId === "4mm"
        ? "4"
        : wireId === "8mm"
          ? "8"
          : "";

  return (
    <form id="builder" action={formAction} className="scroll-mt-24 space-y-6">
      <p className="text-sm leading-6 text-muted">
        {PRICE_LINE}{" "}
        {shopSteel ? (
          <>
            V-hooks: we buy the steel — 1018, galvanized, 304, or 316 is in the
            estimate. $1.00 per cut, $0.09 per developed inch on 3/8 in (heavier
            wire scales by section), then 5% off. Bends are in the drawing, not
            billed. 7/16 and 1/2 in are stock on this cell.
          </>
        ) : (
          <>
            $1.00 per cut, $0.50 per bend, $0.05 per inch of developed length.
            Material is not in the price — you buy the coil.
          </>
        )}{" "}
        {WIRE.short} only. Catalog 0.080–0.120 in is below the floor; 4 mm
        (0.157 in) is the step up.
      </p>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="space-y-4">
          <Panel className="p-4 sm:p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <p className="text-sm font-medium text-foreground">
                {material?.label.split(" (")[0]} {typeMeta.label}
              </p>
              {built.ok ? (
                <p className="font-mono text-2xl tracking-tight text-copper">
                  {usd2(built.estimate.lot)}
                  <span className="ml-2 text-sm text-muted">est. total</span>
                </p>
              ) : (
                <p className="text-sm text-muted">Enter hook details</p>
              )}
            </div>
            <HookDrawing
              points={built.ok ? built.points : []}
              overall={overallN}
              legId={legN}
              wireIn={wireIn}
              ready={built.ok}
            />
            <p className="mt-3 font-mono text-[11px] tracking-widest text-muted uppercase">
              Qty: {Number.isFinite(qtyN) ? qtyN : "—"} pcs · {WIRE.short} ·{" "}
              {shopSteel ? "shop steel" : "customer coil"}
            </p>
          </Panel>
          <Panel className="p-4 sm:p-5">
            <p className="font-mono text-[11px] tracking-[0.18em] text-copper uppercase">
              Custom hook summary
            </p>
            {built.ok ? (
              <dl className="mt-4 space-y-2 text-sm">
                <SumRow label="Hook type" value={typeMeta.label} />
                <SumRow
                  label="Wire size"
                  value={
                    wireId === "other"
                      ? `${customMm} mm`
                      : (wireRow?.label.split(" —")[0] ?? "")
                  }
                />
                <SumRow label="Overall length" value={formatInches(overallN)} />
                <SumRow label="Leg length ID" value={formatInches(legN)} />
                <SumRow label="Material" value={material?.label ?? ""} />
                <SumRow
                  label="Quantity"
                  value={`${qtyN.toLocaleString("en-US")} pcs`}
                />
                <SumRow
                  label="Forming"
                  value={`${built.cuts} cut · ${built.bends} bend${built.bends === 1 ? "" : "s"} · ${built.developedIn} in developed`}
                />
                {built.estimate.shopSteel && built.estimate.steelUsd != null ? (
                  <SumRow
                    label="Steel (shop)"
                    value={`${built.estimate.steelLb?.toFixed(3)} lb · ${usd2(built.estimate.steelUsd)}`}
                  />
                ) : (
                  <SumRow label="Coil" value="You buy it — not in the price" />
                )}
                {built.estimate.shopSteel && built.estimate.beatUsd ? (
                  <SumRow
                    label="5% under boxed 3/8"
                    value={`−${usd2(built.estimate.beatUsd)}`}
                  />
                ) : null}
                <SumRow label="Per piece" value={usd2(built.estimate.piece)} />
                <SumRow label="Lot" value={usd2(built.estimate.lot)} />
                {built.estimate.discountRate > 0 ? (
                  <SumRow
                    label="Qty break"
                    value={`−${Math.round(built.estimate.discountRate * 100)}% at ${qtyN >= 10000 ? "10,000" : "1,000"}`}
                  />
                ) : null}
              </dl>
            ) : (
              <p className="mt-3 text-sm leading-6 text-muted">
                {built.message}
              </p>
            )}
            <p className="mt-4 text-sm leading-6 text-muted">
              No deposit cart. Email the estimate, or send a print on{" "}
              <Link href="/contact" className="text-copper hover:underline">
                contact
              </Link>
              . {QUOTE_REVIEW}
            </p>
          </Panel>
        </div>

        <Panel className="space-y-4 p-4 sm:p-5">
          <Field label="Material">
            <select
              className={fieldClass}
              value={materialId}
              onChange={(event) =>
                setMaterialId(event.target.value as HookMaterialId)
              }
            >
              {HOOK_MATERIALS.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Hook type">
            <select
              className={fieldClass}
              value={type}
              onChange={(event) => setType(event.target.value as HookTypeId)}
            >
              {HOOK_TYPES.map((row) => (
                <option key={row.id} value={row.id}>
                  {row.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Wire size">
            <select
              className={fieldClass}
              value={wireId}
              onChange={(event) => setWireId(event.target.value as HookWireId)}
            >
              {HOOK_WIRES.map((row) => (
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
          <Field label="Overall length, inches">
            <input
              className={fieldClass}
              type="number"
              min="1"
              max={typeMeta.maxOverall}
              step="0.25"
              value={overall}
              onChange={(event) => setOverall(event.target.value)}
            />
            <Hint>
              V-style max 48 in. C, CV, and S max 42 in. Must exceed leg ID.
            </Hint>
          </Field>
          <Field label="Leg length ID, inches">
            <input
              className={fieldClass}
              type="number"
              min="0.5"
              step="0.25"
              value={legId}
              onChange={(event) => setLegId(event.target.value)}
            />
            <Hint>Inside leg dimension. 0.25 in steps. Less than overall.</Hint>
          </Field>
          <Field label={`Total quantity (${ESTIMATE.qtyMin} min)`}>
            <input
              className={fieldClass}
              type="number"
              min={ESTIMATE.qtyMin}
              step="1"
              value={qty}
              onChange={(event) => setQty(event.target.value)}
            />
            <Hint>100 pcs to start. −5% at 1,000. −10% at 10,000.</Hint>
          </Field>
          <Field label="Additional notes">
            <textarea
              className={`${fieldClass} min-h-24`}
              name="hookNotes"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Openings, 90° rotation, finish, rack notes."
            />
          </Field>

          <input type="hidden" name="stockId" value={stockId} />
          <input type="hidden" name="customMm" value={customMmPosted} />
          <input
            type="hidden"
            name="pricing"
            value={shopSteel ? "v-hook-supplied" : ""}
          />
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
          <input type="hidden" name="materialId" value={materialId as EstimateMaterialId} />
          <input type="hidden" name="qty" value={qty} />

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
          {state.message ? (
            <p
              className={`text-sm leading-6 ${
                state.success ? "text-foreground" : "text-copper"
              }`}
            >
              {state.message}
            </p>
          ) : null}
          {!wireRow?.stock && wireId !== "other" ? (
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

function HookDrawing({
  points,
  overall,
  legId,
  wireIn,
  ready,
}: {
  points: { x: number; y: number }[];
  overall: number;
  legId: number;
  wireIn: number;
  ready: boolean;
}) {
  const pad = 1.6;
  let minX = -1;
  let maxX = 1;
  let minY = 0;
  let maxY = Math.max(overall || 12, 4);
  for (const p of points) {
    minX = Math.min(minX, p.x);
    maxX = Math.max(maxX, p.x);
    minY = Math.min(minY, p.y);
    maxY = Math.max(maxY, p.y);
  }
  const w = maxX - minX + pad * 2;
  const h = maxY - minY + pad * 2;
  const vb = `${minX - pad} ${-(maxY + pad)} ${w} ${h}`;
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${-p.y}`)
    .join(" ");
  const stroke = Math.max(wireIn, 0.12);
  const topCrotch = points[1];
  const topJoin = points[2];
  const shankA = points[2];
  const shankB = points[3];

  return (
    <svg
      viewBox={vb}
      className="mt-4 h-[min(28rem,70vw)] w-full bg-background"
      role="img"
      aria-label="Dimensioned V-hook drawing"
    >
      {ready && d ? (
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="butt"
          strokeLinejoin="miter"
          strokeMiterlimit={3}
        />
      ) : (
        <text
          x={(minX + maxX) / 2}
          y={-maxY / 2}
          textAnchor="middle"
          className="fill-muted"
          fontSize="0.45"
        >
          Drawing updates with the form
        </text>
      )}
      {ready && topCrotch && topJoin ? (
        <>
          <text
            x={(topCrotch.x + topJoin.x) / 2 + 0.2}
            y={-((topCrotch.y + topJoin.y) / 2)}
            className="fill-copper"
            fontSize="0.42"
            fontWeight="600"
          >
            {formatInches(legId)}
          </text>
          <text
            x={Math.max(shankA.x, shankB.x) + stroke + 0.2}
            y={-((shankA.y + shankB.y) / 2)}
            className="fill-copper"
            fontSize="0.38"
            fontWeight="600"
          >
            {formatInches(wireIn)}
          </text>
          <line
            x1={maxX + 0.45}
            y1={-maxY}
            x2={maxX + 0.45}
            y2={-minY}
            stroke="currentColor"
            strokeWidth="0.04"
          />
          <text
            x={maxX + 0.55}
            y={-((minY + maxY) / 2)}
            className="fill-copper"
            fontSize="0.42"
            fontWeight="600"
          >
            {formatInches(overall)}
          </text>
        </>
      ) : null}
    </svg>
  );
}
