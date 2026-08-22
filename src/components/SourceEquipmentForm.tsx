"use client";

import { useActionState, useState } from "react";
import {
  submitSourceEquipment,
  type SourceFormState,
} from "@/app/actions/source";
import { Button, fieldClass, Panel } from "@/components/ui";
import { SOURCE_KINDS, type SourceMachine } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };

function emptyMachine(): SourceMachine {
  return { oem: "", model: "", kind: "3D CNC", minMm: "", maxMm: "", city: "" };
}

export function SourceEquipmentForm({
  inviteId,
  company: companyPrefill = "",
  email: emailPrefill = "",
}: {
  inviteId?: string;
  company?: string;
  email?: string;
}) {
  const [state, action, pending] = useActionState(submitSourceEquipment, initial);
  const [machines, setMachines] = useState<SourceMachine[]>([emptyMachine()]);

  return (
    <form action={action} className="space-y-6">
      {inviteId ? <input type="hidden" name="inviteId" value={inviteId} /> : null}
      <input type="hidden" name="machines" value={JSON.stringify(machines)} />

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Register the shop
        </p>
        <label className="block text-sm">
          Shop name
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="company"
            required
            defaultValue={companyPrefill}
            autoComplete="organization"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Your name
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="name"
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            Email
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="email"
              type="email"
              required
              defaultValue={emailPrefill}
              autoComplete="email"
            />
          </label>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <label className="block text-sm">
            Phone
            <input className={`mt-1.5 ${fieldClass}`} name="phone" autoComplete="tel" />
          </label>
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
        <label className="block text-sm">
          Website
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="website"
            type="url"
            placeholder="https://"
            autoComplete="url"
          />
        </label>
      </Panel>

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Equipment on the floor
        </p>
        <p className="text-sm leading-6 text-muted">
          One row per cell. Jobs match these bands — not a directory paragraph.
          You can also attach a plant list.
        </p>
        {machines.map((row, index) => (
          <div
            key={index}
            className="grid gap-3 border border-line p-3 sm:grid-cols-6"
          >
            <label className="block text-sm sm:col-span-2">
              OEM
              <input
                className={`mt-1.5 ${fieldClass}`}
                value={row.oem}
                onChange={(event) => {
                  const next = [...machines];
                  next[index] = { ...row, oem: event.target.value };
                  setMachines(next);
                }}
                placeholder="Numalliance"
              />
            </label>
            <label className="block text-sm sm:col-span-2">
              Model
              <input
                className={`mt-1.5 ${fieldClass}`}
                value={row.model}
                onChange={(event) => {
                  const next = [...machines];
                  next[index] = { ...row, model: event.target.value };
                  setMachines(next);
                }}
                placeholder="Robomac 214TF"
              />
            </label>
            <label className="block text-sm">
              Type
              <select
                className={`mt-1.5 ${fieldClass}`}
                value={row.kind}
                onChange={(event) => {
                  const next = [...machines];
                  next[index] = { ...row, kind: event.target.value };
                  setMachines(next);
                }}
              >
                {SOURCE_KINDS.map((kind) => (
                  <option key={kind} value={kind}>
                    {kind}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              City
              <input
                className={`mt-1.5 ${fieldClass}`}
                value={row.city}
                onChange={(event) => {
                  const next = [...machines];
                  next[index] = { ...row, city: event.target.value };
                  setMachines(next);
                }}
              />
            </label>
            <label className="block text-sm">
              Min mm
              <input
                className={`mt-1.5 ${fieldClass}`}
                inputMode="decimal"
                value={row.minMm}
                onChange={(event) => {
                  const next = [...machines];
                  next[index] = { ...row, minMm: event.target.value };
                  setMachines(next);
                }}
                placeholder="4"
              />
            </label>
            <label className="block text-sm">
              Max mm
              <input
                className={`mt-1.5 ${fieldClass}`}
                inputMode="decimal"
                value={row.maxMm}
                onChange={(event) => {
                  const next = [...machines];
                  next[index] = { ...row, maxMm: event.target.value };
                  setMachines(next);
                }}
                placeholder="14"
              />
            </label>
          </div>
        ))}
        <button
          type="button"
          className="text-sm text-copper hover:underline"
          onClick={() => setMachines([...machines, emptyMachine()])}
        >
          Add another cell
        </button>
        <label className="block text-sm">
          Or upload a list (CSV, PDF, XLSX)
          <input className="mt-1.5 block text-sm" name="list" type="file" />
        </label>
        <label className="block text-sm">
          Notes
          <textarea
            className={`${fieldClass} mt-1.5 min-h-24`}
            name="notes"
            placeholder="Heads, coil vs bar, qty cap, sold cells."
          />
        </label>
      </Panel>

      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Register and upload equipment"}
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
    </form>
  );
}
