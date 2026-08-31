"use client";

import { useActionState } from "react";
import {
  saveSourceBuyerAccount,
  type SourceAccountState,
} from "@/app/actions/source-accounts";
import { Button, fieldClass, Panel } from "@/components/ui";

const initial: SourceAccountState = { success: false, message: "" };

export function SourceBuyerForm({
  company,
  name,
  email,
  phone,
}: {
  company?: string;
  name?: string;
  email?: string;
  phone?: string;
}) {
  const [state, action, pending] = useActionState(
    saveSourceBuyerAccount,
    initial,
  );

  return (
    <form action={action} className="space-y-4">
      <Panel className="space-y-4 p-5 sm:p-6">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Buyer account
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Company
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="company"
              required
              defaultValue={company}
              autoComplete="organization"
            />
          </label>
          <label className="block text-sm">
            Your name
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="name"
              defaultValue={name}
              autoComplete="name"
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
              defaultValue={email}
              autoComplete="email"
            />
          </label>
          <label className="block text-sm">
            Phone
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="phone"
              defaultValue={phone}
              autoComplete="tel"
            />
          </label>
        </div>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Save buyer account"}
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
      </Panel>
    </form>
  );
}
