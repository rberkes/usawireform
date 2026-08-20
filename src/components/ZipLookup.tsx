"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { stateFromZip } from "@/lib/states";
import { Button, fieldClass } from "./ui";

export function ZipLookup({
  label = "Enter your ZIP code",
}: {
  label?: string;
}) {
  const router = useRouter();
  const [zip, setZip] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const state = stateFromZip(zip);
    if (!state) {
      setError("Use a 5-digit U.S. ZIP. We’ll send you to that state’s page.");
      return;
    }
    setError(null);
    router.push(`/${state.slug}`);
  }

  return (
    <form onSubmit={onSubmit} className="max-w-md">
      <label className="block text-sm">
        {label}
        <span className="mt-1.5 flex gap-2">
          <input
            className={fieldClass}
            name="zip"
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="44114"
            maxLength={10}
            value={zip}
            onChange={(event) => {
              setZip(event.target.value);
              if (error) setError(null);
            }}
          />
          <Button type="submit">Find shop</Button>
        </span>
      </label>
      {error ? <p className="mt-2 text-sm text-copper">{error}</p> : null}
      <p className="mt-2 text-sm leading-6 text-muted">
        One forming cell, Northeast Ohio. We quote nationwide from that floor —
        the ZIP opens the state page.
      </p>
    </form>
  );
}
