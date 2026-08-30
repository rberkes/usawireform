"use client";

import { useActionState } from "react";
import {
  releaseDirectoryClaim,
  type SourceFormState,
} from "@/app/actions/source";
import { Button } from "@/components/ui";

const initial: SourceFormState = { success: false, message: "" };

export function ReleaseDirectoryClaimForm({ company }: { company: string }) {
  const [state, action, pending] = useActionState(
    releaseDirectoryClaim,
    initial,
  );

  return (
    <form action={action} className="space-y-3">
      <p className="text-sm leading-6 text-muted">
        Wrong shop, or this was a test: release {company}. That directory page
        becomes claimable again. This login can then claim another US listing.
      </p>
      <Button type="submit" variant="ghost" disabled={pending}>
        {pending ? "Releasing…" : "Release directory page"}
      </Button>
      {state.message ? (
        <p className="text-sm leading-6 text-copper">{state.message}</p>
      ) : null}
    </form>
  );
}
