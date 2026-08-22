"use client";

import { useActionState } from "react";
import {
  claimDirectoryListing,
  type SourceFormState,
} from "@/app/actions/source";
import { PlantCheckList } from "@/components/PlantCheckList";
import { Button, fieldClass } from "@/components/ui";

const initial: SourceFormState = { success: false, message: "" };

export function DirectoryClaimForm({
  slug,
  company,
}: {
  slug: string;
  company: string;
}) {
  const [state, action, pending] = useActionState(
    claimDirectoryListing,
    initial,
  );

  return (
    <form action={action} className="mt-8 space-y-4">
      <input type="hidden" name="slug" value={slug} />
      <PlantCheckList />
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
          required
          type="url"
          autoComplete="url"
          placeholder="https:// — equipment, facility, or machines page"
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
          {company} forms wire or strip on this floor. This is not a sales
          office, sourcing desk, or manufacturer’s rep.
        </span>
      </label>
      {state.message ? (
        <p className="text-sm leading-6 text-muted">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Claiming…" : `Claim ${company}`}
      </Button>
    </form>
  );
}
