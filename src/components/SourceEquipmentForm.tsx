"use client";

import { useActionState, useState } from "react";
import {
  submitSourceEquipment,
  type SourceFormState,
} from "@/app/actions/source";
import {
  SourceMachineRows,
  emptySourceMachine,
} from "@/components/SourceMachineRows";
import { Button, ButtonLink, fieldClass, Panel } from "@/components/ui";
import { sourceAccountHref } from "@/lib/source-plans";
import type { SourceMachine } from "@/lib/source-types";

const initial: SourceFormState = { success: false, message: "" };

export function SourceEquipmentForm({
  inviteId,
  company: companyPrefill = "",
  email: emailPrefill = "",
  maxCells = 1,
}: {
  inviteId?: string;
  company?: string;
  email?: string;
  maxCells?: number;
}) {
  const [state, action, pending] = useActionState(submitSourceEquipment, initial);
  const [machines, setMachines] = useState<SourceMachine[]>([
    emptySourceMachine(),
  ]);

  return (
    <form action={action} className="space-y-6">
      {inviteId ? <input type="hidden" name="inviteId" value={inviteId} /> : null}
      <input type="hidden" name="machines" value={JSON.stringify(machines)} />

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Register the plant
        </p>
        <p className="text-sm leading-6 text-muted">
          Three checks: numbered plant street, a cell or a public floor page,
          and you attest this is not a sales or sourcing office.
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
        <label className="block text-sm">
          Plant street
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="plantStreet"
            required
            autoComplete="street-address"
            placeholder="123 Industrial Ave"
          />
        </label>
        <label className="block text-sm">
          Floor proof URL
          <input
            className={`mt-1.5 ${fieldClass}`}
            name="plantProofUrl"
            type="url"
            autoComplete="url"
            placeholder="Optional if you name a cell below"
          />
        </label>
        <label className="flex items-start gap-2 text-sm leading-6">
          <input
            className="mt-1"
            type="checkbox"
            name="plantAttest"
            value="1"
            required
          />
          <span>
            This location forms wire or strip on the floor. Not a sales office,
            sourcing desk, or manufacturer’s rep.
          </span>
        </label>
      </Panel>

      <Panel className="space-y-4 p-4 sm:p-5">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Equipment on the floor
        </p>
        <p className="text-sm leading-6 text-muted">
          Pick the class first: 2D CNC, 3D CNC, 4-slide, multi-slide, or
          manual pneumatic. Model and wire capacity come from the catalog —
          Baird, Nilson, Lubow, Numalliance, AIM. Confirm the plate. This
          plan holds {maxCells} {maxCells === 1 ? "cell" : "cells"} here. More
          iron is a paid plan on the shop dashboard.
        </p>
        <SourceMachineRows
          machines={machines}
          onChange={setMachines}
          maxRows={maxCells}
        />
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
      {state.success ? (
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink
            href={sourceAccountHref(state.receiptTo)}
            className="w-full justify-center sm:w-auto"
          >
            Confirm your account
          </ButtonLink>
          <ButtonLink
            href="/source/dashboard"
            variant="ghost"
            className="w-full justify-center sm:w-auto"
          >
            Shop dashboard
          </ButtonLink>
        </div>
      ) : null}
    </form>
  );
}
