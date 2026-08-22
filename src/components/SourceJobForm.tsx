"use client";

import { useActionState } from "react";
import {
  submitSourceJob,
  type SourceFormState,
} from "@/app/actions/source";
import { Button, fieldClass, Panel } from "@/components/ui";
import { SOURCE_OEM_NAMES } from "@/lib/source-iron";
import { SOURCE_JOB_CLASSES } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };

export function SourceJobForm() {
  const [state, action, pending] = useActionState(submitSourceJob, initial);

  return (
    <form action={action} className="space-y-6">
      <Panel className="space-y-4 p-4 sm:p-5">
        <fieldset>
          <legend className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
            What should run this job?
          </legend>
          <p className="mt-3 text-sm leading-6 text-muted">
            Pick the cell first. We match shops that filed that iron and a
            wire band that fits — not a shop that says they form wire.
          </p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {SOURCE_JOB_CLASSES.map((row) => (
              <label
                key={row.kind}
                className="flex cursor-pointer flex-col border border-line bg-background px-3 py-3 has-[:checked]:border-copper has-[:checked]:bg-inset"
              >
                <input
                  type="radio"
                  name="kind"
                  value={row.kind}
                  required
                  className="sr-only"
                />
                <span className="text-sm font-medium">{row.label}</span>
                <span className="mt-1 text-xs leading-5 text-muted">
                  {row.hint}
                </span>
              </label>
            ))}
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
            />
          </label>
          <label className="block text-sm">
            Your name
            <input className={`mt-1.5 ${fieldClass}`} name="name" autoComplete="name" />
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
            />
          </label>
          <label className="block text-sm">
            Phone
            <input className={`mt-1.5 ${fieldClass}`} name="phone" autoComplete="tel" />
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
          Wire size is the second match key. Notes can be plain language. We
          do not let a model pick the shop. Mesh and this floor’s Robomac
          estimate are not this form. Quantity is checked against a shop’s
          filed min when they have one. This week’s open slots boost shops
          that already fit the cell.
        </p>
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
      </Panel>

      <Button type="submit" disabled={pending}>
        {pending ? "Matching..." : "Match shops"}
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
