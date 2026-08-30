"use client";

import { useActionState } from "react";
import { submitMachineLead, type QuoteFormState } from "@/app/actions/quote";
import { FormLegalNotice } from "./LegalDoc";
import { Button, fieldClass, Kicker, Panel } from "./ui";

const initial: QuoteFormState = { success: false, message: "" };

export function MachineLeadForm({
  oem,
  model,
  path,
}: {
  oem: string;
  model: string;
  path: string;
}) {
  const [state, formAction, pending] = useActionState(submitMachineLead, initial);

  if (state.success) {
    return (
      <Panel>
        <Kicker>Received</Kicker>
        <h2 className="mt-3 text-xl tracking-tight">Machine inquiry sent.</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{state.message}</p>
      </Panel>
    );
  }

  return (
    <form action={formAction}>
      <input type="hidden" name="oem" value={oem} />
      <input type="hidden" name="model" value={model} />
      <input type="hidden" name="source" value={path} />
      <Panel>
        <h2 className="text-xl tracking-tight">Interested in this 3D CNC machine?</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          We pass the inquiry to dealers and manufacturers. USA Wire Form runs a
          Numalliance Robomac 214TF — we do not sell this iron. Your print still
          gets a parts quote on{" "}
          <a className="text-copper" href="/contact">
            contact
          </a>{" "}
          if you need forms, not a cell.
        </p>
        {state.message && !state.success ? (
          <p className="mt-3 text-sm text-copper">{state.message}</p>
        ) : null}
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Name
            <input className={`mt-1.5 ${fieldClass}`} name="name" required autoComplete="name" />
          </label>
          <label className="block text-sm">
            Company
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="company"
              required
              autoComplete="organization"
            />
          </label>
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
            <input className={`mt-1.5 ${fieldClass}`} name="phone" type="tel" autoComplete="tel" />
          </label>
        </div>
        <label className="mt-4 block text-sm">
          I am
          <select className={`mt-1.5 ${fieldClass}`} name="role" required defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option value="shop">A shop buying a machine</option>
            <option value="dealer">A dealer / integrator</option>
            <option value="oem">The manufacturer</option>
            <option value="other">Other</option>
          </select>
        </label>
        <label className="mt-4 block text-sm">
          Notes
          <textarea
            className={`mt-1.5 min-h-24 ${fieldClass}`}
            name="notes"
            placeholder="Diameter band, 2D vs 3D, new vs used, location."
          />
        </label>
        <Button type="submit" className="mt-5" disabled={pending}>
          {pending ? "Sending..." : "Send machine inquiry"}
        </Button>
        <FormLegalNotice />
      </Panel>
    </form>
  );
}
