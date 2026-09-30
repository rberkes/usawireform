"use client";

import { useActionState } from "react";
import {
  analyzeRobomacStep,
  type AnalyzeStepState,
} from "@/app/admin/robomac/actions";
import { btn, fieldClass } from "@/components/ui";

const initial: AnalyzeStepState | null = null;

export function RobomacStepAnalyze({
  materials,
}: {
  materials: { id: string; label: string }[];
}) {
  const [state, action, pending] = useActionState(analyzeRobomacStep, initial);

  return (
    <section className="mt-12">
      <h2 className="text-sm font-medium">STEP → centerline → DFM</h2>
      <p className="mt-3 max-w-3xl text-sm leading-6 text-muted">
        Desk only. Reads cylinders and tori from a round-wire solid, builds the
        S / B / ROT sequence, then runs the 214TF engine. Nothing is stored. AI
        does not decide pass/fail.
      </p>
      <form action={action} className="mt-4 max-w-xl space-y-3">
        <label className="block text-sm">
          STEP file
          <input
            type="file"
            name="file"
            accept=".step,.stp,application/step,model/step"
            required
            className={`${fieldClass} mt-1.5`}
          />
        </label>
        <label className="block text-sm">
          Material
          <select name="materialId" defaultValue="1018" className={`${fieldClass} mt-1.5`}>
            {materials.map((row) => (
              <option key={row.id} value={row.id}>
                {row.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" disabled={pending} className={btn.compact}>
          {pending ? "Reading…" : "Extract and evaluate"}
        </button>
      </form>
      {state && !state.ok ? (
        <p className="mt-4 max-w-xl text-sm text-muted">{state.message}</p>
      ) : null}
      {state?.ok && state.dfm && state.geometry ? (
        <div className="mt-6 border border-line p-4 text-sm">
          <p className="font-medium">
            <span
              className={
                state.dfm.status === "FAIL"
                  ? "font-medium"
                  : state.dfm.status === "REVIEW"
                    ? "text-copper"
                    : "text-steel"
              }
            >
              {state.dfm.status}
            </span>
            {` · ${state.fileName}`}
          </p>
          <p className="mt-1 text-muted">
            {state.geometry.diameterMm} mm · {state.geometry.materialId} ·{" "}
            {state.dfm.bendCount} bends · developed {state.dfm.developedLengthMm}{" "}
            mm
            {state.meta
              ? ` · ${state.meta.units} · ${state.meta.cylinderCount} cyl / ${state.meta.torusCount} tori`
              : ""}
          </p>
          {state.sequence ? (
            <pre className="mt-4 overflow-x-auto font-mono text-xs leading-5 text-foreground">
              {state.sequence}
            </pre>
          ) : null}
          {state.dfm.price ? (
            <p className="mt-3 text-muted">
              {state.dfm.price.filed
                ? `${state.dfm.price.materialId} forming: $${state.dfm.price.cutUsd?.toFixed(2)} / cut · $${state.dfm.price.bendUsd?.toFixed(2)} / bend · $${state.dfm.price.inchUsd?.toFixed(2)} / in. Material $/lb is a later input.`
                : state.dfm.price.note}
            </p>
          ) : null}
          {state.dfm.heads.length > 0 ? (
            <ul className="mt-4 space-y-1 text-muted">
              {state.dfm.heads.map((row) => (
                <li key={row.segmentId}>
                  B{row.bend} {row.head} · CL R {row.centerlineRadiusMm} mm ·{" "}
                  {row.note}
                </li>
              ))}
            </ul>
          ) : null}
          {state.dfm.issues.length > 0 ? (
            <ul className="mt-4 space-y-2 text-muted">
              {state.dfm.issues.map((issue) => (
                <li key={issue.id}>
                  <span className="text-foreground">
                    {issue.status} {issue.check}
                    {issue.bend ? ` B${issue.bend}` : ""}
                  </span>
                  {issue.recommendedChange ? ` — ${issue.recommendedChange}` : ""}
                  {issue.customerExplanation ? (
                    <p className="mt-1">{issue.customerExplanation}</p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-muted">Phase 1 checks are clear.</p>
          )}
        </div>
      ) : null}
    </section>
  );
}
