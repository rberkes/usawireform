"use client";

import { useActionState, useState } from "react";
import {
  submitSourceJob,
  type SourceFormState,
} from "@/app/actions/source";
import { StepUpload } from "@/components/StepUpload";
import { Button, fieldClass, Panel } from "@/components/ui";
import { DRAWING_FREE_STEP } from "@/lib/drawings";
import { SourceKindCards } from "@/components/SourceKindCards";
import { SOURCE_OEM_NAMES } from "@/lib/source-iron";

const initial: SourceFormState = { success: false, message: "" };

export function SourceJobForm({
  defaults,
}: {
  defaults?: {
    company?: string;
    name?: string;
    email?: string;
    phone?: string;
  };
}) {
  const [state, action, pending] = useActionState(submitSourceJob, initial);
  const [file, setFile] = useState<File | null>(null);

  return (
    <form action={action} className="space-y-6">
      <Panel className="space-y-4 p-4 sm:p-5">
        <fieldset>
          <legend className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            What should run this job?
          </legend>
          <p className="mt-3 text-sm leading-6 text-muted">
            Pick the cell first. Quotes go to shops that filed that iron, year,
            capacity, and stocked sizes — not a shop that says they form wire.
          </p>
          <div className="mt-4">
            <SourceKindCards name="kind" required />
          </div>
        </fieldset>
      </Panel>

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Buyer
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Company
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="company"
              autoComplete="organization"
              defaultValue={defaults?.company}
            />
          </label>
          <label className="block text-sm">
            Your name
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="name"
              autoComplete="name"
              defaultValue={defaults?.name}
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Email
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="email"
              type="email"
              required
              autoComplete="email"
              defaultValue={defaults?.email}
            />
          </label>
          <label className="block text-sm">
            Phone
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="phone"
              autoComplete="tel"
              defaultValue={defaults?.phone}
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            City
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="city"
              autoComplete="address-level2"
            />
          </label>
          <label className="block text-sm">
            State
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="state"
              autoComplete="address-level1"
            />
          </label>
        </div>
      </Panel>

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          The print
        </p>
        <p className="text-sm leading-6 text-muted">
          Upload a STEP. Quotes go to shops whose equipment can manufacture it.
          Wire size is the second match key. {DRAWING_FREE_STEP}
        </p>
        <div>
          <StepUpload file={file} onChange={setFile} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Wire size
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="diameter"
              placeholder="8 mm or 3/8 in"
              required
            />
          </label>
          <label className="block text-sm">
            Quantity
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="qty"
              inputMode="numeric"
              placeholder="5000"
            />
          </label>
        </div>
        <label className="block text-sm">
          OEM if it matters
          <select className={`mt-1.5 ${fieldClass}`} name="oem" defaultValue="">
            <option value="">Any</option>
            {SOURCE_OEM_NAMES.filter((name) => name !== "Other").map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          Notes
          <textarea
            className={`${fieldClass} mt-1.5 min-h-24`}
            name="notes"
            placeholder="3/8 3D V-hook, 5k pcs, Midwest."
          />
        </label>
        <fieldset className="space-y-3">
          <legend className="text-sm">The drawing</legend>
          <p className="text-sm leading-6 text-muted">
            Matched shops see the spec and can quote. You choose whether
            the STEP itself is released.
          </p>
          <label className="flex items-start gap-2 text-sm leading-6">
            <input
              className="mt-1"
              type="radio"
              name="drawingPrivacy"
              value="desk"
              defaultChecked
            />
            <span>
              Keep the STEP at the desk. Shops quote from wire, cell, and
              notes. You can change this from the receipt.
            </span>
          </label>
          <label className="flex items-start gap-2 text-sm leading-6">
            <input
              className="mt-1"
              type="radio"
              name="drawingPrivacy"
              value="matched"
            />
            <span>
            Release the STEP to shops quoting this job. They open it in
            the dashboard. It is never attached to email and not posted
            publicly.
            </span>
          </label>
        </fieldset>
      </Panel>

      <Button type="submit" disabled={pending}>
        {pending ? "Matching..." : "Get quotes from capable equipment"}
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
      {state.success && state.matches && state.matches.length > 0 ? (
        <ul className="divide-y divide-line border border-line">
          {state.matches.map((row, index) => (
            <li key={`${row.company}-${row.model}-${index}`} className="px-4 py-4 text-sm">
              <p className="font-medium">{row.company}</p>
              <p className="mt-1 text-muted">
                {row.oem} {row.model} · {row.kind} · {row.minMm}–{row.maxMm} mm
                {row.city || row.state
                  ? ` · ${[row.city, row.state].filter(Boolean).join(", ")}`
                  : ""}
              </p>
              <p className="mt-1 text-muted">{row.why}</p>
              {row.fitNote ? (
                <p className="mt-1 text-muted">{row.fitNote}</p>
              ) : null}
            </li>
          ))}
        </ul>
      ) : null}
    </form>
  );
}
