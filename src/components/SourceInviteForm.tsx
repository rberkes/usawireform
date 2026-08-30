"use client";

import { useActionState } from "react";
import { sendSourceInvite, type SourceFormState } from "@/app/actions/source";
import { Button, fieldClass } from "@/components/ui";

const initial: SourceFormState = { success: false, message: "" };

export function SourceInviteForm() {
  const [state, action, pending] = useActionState(sendSourceInvite, initial);

  return (
    <form action={action} className="max-w-xl space-y-4">
      <label className="block text-sm">
        Shop email
        <input
          className={`mt-1.5 ${fieldClass}`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="plant@shop.com"
        />
      </label>
      <label className="block text-sm">
        Shop name
        <input
          className={`mt-1.5 ${fieldClass}`}
          name="company"
          autoComplete="organization"
          placeholder="Optional — printed in the invite"
        />
      </label>
      <label className="block text-sm">
        Note (not emailed)
        <input className={`mt-1.5 ${fieldClass}`} name="note" />
      </label>
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send invite"}
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
