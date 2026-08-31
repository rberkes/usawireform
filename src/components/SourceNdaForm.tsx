"use client";

import { useActionState } from "react";
import {
  acceptSourceNda,
  type SourceAccountState,
} from "@/app/actions/source-accounts";
import { Button, fieldClass, Panel } from "@/components/ui";
import {
  SOURCE_NDA_SECTIONS,
  SOURCE_NDA_TITLE,
  SOURCE_NDA_VERSION,
} from "@/lib/source-nda";

const initial: SourceAccountState = { success: false, message: "" };

export function SourceNdaForm({
  company,
  name,
}: {
  company?: string;
  name?: string;
}) {
  const [state, action, pending] = useActionState(acceptSourceNda, initial);

  return (
    <form action={action} className="space-y-8">
      <Panel className="space-y-6 p-5 sm:p-6">
        <p className="font-mono text-[12px] tracking-[0.22em] uppercase text-copper">
          Version {SOURCE_NDA_VERSION}
        </p>
        <h2 className="text-xl font-medium tracking-tight">{SOURCE_NDA_TITLE}</h2>
        <ol className="space-y-5">
          {SOURCE_NDA_SECTIONS.map((section) => (
            <li key={section.heading}>
              <p className="text-sm font-medium">{section.heading}</p>
              <p className="mt-1.5 text-sm leading-6 text-muted">{section.body}</p>
            </li>
          ))}
        </ol>
      </Panel>

      <Panel className="space-y-4 p-5 sm:p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm">
            Your name
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="name"
              required
              defaultValue={name}
              autoComplete="name"
            />
          </label>
          <label className="block text-sm">
            Shop
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="company"
              defaultValue={company}
              autoComplete="organization"
            />
          </label>
        </div>
        <label className="flex items-start gap-2 text-sm leading-6">
          <input className="mt-1" type="checkbox" name="agree" value="yes" required />
          <span>
            I have authority to bind this shop. I accept this agreement for
            every buyer print Source sends this account.
          </span>
        </label>
        <Button type="submit" disabled={pending}>
          {pending ? "Saving..." : "Accept and open the shop dashboard"}
        </Button>
        {state.message ? (
          <p className="text-sm leading-6 text-copper">{state.message}</p>
        ) : null}
      </Panel>
    </form>
  );
}
