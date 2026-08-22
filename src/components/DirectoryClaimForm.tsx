"use client";

import { useActionState } from "react";
import {
  claimDirectoryListing,
  type SourceFormState,
} from "@/app/actions/source";
import { Button } from "@/components/ui";

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
      {state.message ? (
        <p className="text-sm leading-6 text-muted">{state.message}</p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Claiming…" : `Claim ${company}`}
      </Button>
    </form>
  );
}
