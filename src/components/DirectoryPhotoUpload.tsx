"use client";

import { useActionState, useRef } from "react";
import {
  updateSourceListingPhoto,
  type SourceFormState,
} from "@/app/actions/source";
import { btn } from "@/components/ui";

const initial: SourceFormState = { success: false, message: "" };

export function DirectoryPhotoUpload({
  slug,
  hasPhoto,
}: {
  slug: string;
  hasPhoto: boolean;
}) {
  const [state, action, pending] = useActionState(
    updateSourceListingPhoto,
    initial,
  );
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form action={action} className="flex flex-wrap items-center gap-3">
      <input type="hidden" name="slug" value={slug} />
      <label className={`${btn.ghost} cursor-pointer bg-background`}>
        {pending ? "Uploading…" : hasPhoto ? "Replace photo" : "Upload plant photo"}
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          name="photo"
          accept="image/png,image/jpeg,image/webp,image/gif"
          required
          disabled={pending}
          onChange={(event) => {
            if (event.currentTarget.files?.length) {
              event.currentTarget.form?.requestSubmit();
            }
          }}
        />
      </label>
      {state.message ? (
        <p
          className={`text-sm ${state.success ? "text-foreground" : "text-copper"}`}
        >
          {state.message}
        </p>
      ) : (
        <p className="text-sm text-muted">
          Floor or shop photo. PNG, JPG, or WebP. Under 8 MB.
        </p>
      )}
    </form>
  );
}
