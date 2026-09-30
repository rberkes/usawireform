"use client";

import { useActionState, useState } from "react";
import {
  analyzePublicStep,
  type PublicCadDfmState,
} from "@/app/actions/cad-dfm";
import { ESTIMATE, qtyBreakCopy, usd2 } from "@/lib/quoting";
import { QUOTE_REVIEW } from "@/lib/price";
import { QUOTE_FORMULA } from "@/lib/robomac/quote";
import { Button, EstimateMailNotice, fieldClass, Panel } from "./ui";

const initial: PublicCadDfmState | null = null;

export function CadDfmQuote({
  materials,
}: {
  materials: { id: string; label: string; shopRun?: boolean }[];
}) {
  const [state, action, pending] = useActionState(analyzePublicStep, initial);
  const [qty, setQty] = useState(String(ESTIMATE.qtyMin));

  return (
    <form action={action} className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Panel>
          <p className="mb-5 text-sm font-medium text-copper">
            Round-wire STEP. The 214TF twin reads cylinders and tori, runs DFM,
            then prices {QUOTE_FORMULA}. 1018 is $0.05/in. Material $/lb is not
            filed — forming only until the desk plugs it in. 304, 330, and
            6061-T6 have no inch rate. FAIL is not a buyable price.
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm sm:col-span-2">
              STEP file
              <input
                type="file"
                name="file"
                accept=".step,.stp,application/step,model/step"
                required
                className={`${fieldClass} mt-1.5`}
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              Material
              <select
                name="materialId"
                defaultValue="1018"
                className={`${fieldClass} mt-1.5`}
              >
                {materials.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.shopRun ? `${row.label} — shop run` : row.label}
                  </option>
                ))}
              </select>
              <span className="mt-1.5 block text-sm leading-6 text-muted">
                Shop-run coils: 1018, 304, 330, 6061-T6. Only 1018 has a filed
                inch rate. Do not expect a 304 or aluminum dollar from this
                page.
              </span>
            </label>
            <label className="block text-sm">
              Quantity ({ESTIMATE.qtyMin} min)
              <input
                className={`${fieldClass} mt-1.5`}
                name="qty"
                type="number"
                min={ESTIMATE.qtyMin}
                step="1"
                value={qty}
                onChange={(event) => setQty(event.target.value)}
              />
            </label>
            <p className="self-end text-sm leading-6 text-muted">
              {qtyBreakCopy}
            </p>
          </div>
          <Button type="submit" className="mt-6" disabled={pending}>
            {pending ? "Reading…" : "Read STEP and price"}
          </Button>
        </Panel>

        <Panel>
          {!state ? (
            <>
              <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                DFM + shop quote
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">
                Upload a .step / .stp. Analytic SolidWorks solids extract
                cleanly. Meshed or polyline sweeps often smear crowns.
              </p>
            </>
          ) : !state.ok ? (
            <>
              <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
                Could not read
              </p>
              <p className="mt-3 text-sm leading-6 text-muted">{state.message}</p>
            </>
          ) : state.dfm && state.quote ? (
            <CadResult state={state} pending={pending} />
          ) : null}
        </Panel>
      </div>
    </form>
  );
}

function CadResult({
  state,
  pending,
}: {
  state: PublicCadDfmState;
  pending: boolean;
}) {
  const dfm = state.dfm;
  const quote = state.quote;
  if (!dfm || !quote) return null;

  return (
    <>
      <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
        {dfm.status}
        {state.fileName ? ` · ${state.fileName}` : ""}
      </p>
      {state.buyable && state.pieceUsd != null ? (
        <>
          <p className="mt-3 font-mono text-4xl tracking-tight text-foreground">
            {usd2(state.pieceUsd)}
            <span className="ml-2 text-base text-muted">/ piece</span>
          </p>
          {state.lotUsd != null && state.quantity ? (
            <p className="mt-2 text-lg text-foreground">
              {usd2(state.lotUsd)} for {state.quantity.toLocaleString("en-US")}{" "}
              pcs
            </p>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-sm leading-6 text-foreground">
          {dfm.status === "FAIL"
            ? "Not a buyable price. The 214TF twin failed this print."
            : quote.note}
        </p>
      )}
      <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
        <Row
          label="Wire"
          value={state.diameterLabel ?? `${state.geometry?.diameterMm} mm`}
        />
        <Row
          label={`Developed · ${state.lengthIn != null ? `${state.lengthIn.toFixed(1)} in` : "—"}`}
          value={
            quote.formingUsd != null ? usd2(quote.formingUsd) : "no inch rate"
          }
        />
        {state.weightLb != null ? (
          <Row
            label="Carbon mass"
            value={`${state.weightLb.toFixed(3)} lb`}
          />
        ) : (
          <Row
            label="Mass"
            value="Not filed for this alloy"
          />
        )}
        {quote.materialPending ? (
          <Row label="Material $/lb" value="Later input — not in the piece" />
        ) : null}
        {state.discountRate && state.discountRate > 0 ? (
          <Row
            label={`Qty break · −${Math.round(state.discountRate * 100)}%`}
            value={`−${Math.round(state.discountRate * 100)}%`}
          />
        ) : null}
        <Row label="Bends" value={String(dfm.bendCount)} />
      </dl>
      {state.sequence ? (
        <pre className="mt-4 overflow-x-auto font-mono text-xs leading-5 text-muted">
          {state.sequence}
        </pre>
      ) : null}
      {dfm.heads.length > 0 ? (
        <ul className="mt-4 space-y-1 text-sm text-muted">
          {dfm.heads.map((row) => (
            <li key={row.segmentId}>
              B{row.bend} {row.head} · CL R {row.centerlineRadiusMm} mm
            </li>
          ))}
        </ul>
      ) : null}
      {dfm.issues.length > 0 ? (
        <ul className="mt-4 space-y-2 text-sm text-muted">
          {dfm.issues.map((issue) => (
            <li key={issue.id}>
              <span className="text-foreground">
                {issue.status} {issue.check}
                {issue.bend ? ` B${issue.bend}` : ""}
              </span>
              {issue.customerExplanation ? (
                <p className="mt-1">{issue.customerExplanation}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-4 text-sm text-muted">Phase 1 checks are clear.</p>
      )}
      <label className="mt-6 block text-sm">
        Email this {state.buyable ? "estimate" : "DFM"}
        <input
          className={`${fieldClass} mt-1.5`}
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
        />
      </label>
      <p className="mt-2 text-sm leading-6 text-muted">
        Two emails go out: a receipt to the address you type, and a LEAD to the
        shop. The STEP stays on this page — it is not attached to email.
      </p>
      <Button type="submit" className="mt-4" disabled={pending}>
        {pending ? "Sending…" : "Email the desk"}
      </Button>
      <EstimateMailNotice
        className="mt-3"
        success={Boolean(state.mailed)}
        message={state.message ?? ""}
        receiptTo={state.receiptTo}
      />
      <p className="mt-4 text-sm leading-6 text-muted">{QUOTE_REVIEW}</p>
    </>
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
