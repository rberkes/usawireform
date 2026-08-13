"use client";

import { FormEvent, useState } from "react";
import { isLinkedInUrl, LinkedInField, StepUpload } from "./StepUpload";
import { QUOTE_EMAIL } from "@/lib/company";
import { Button, fieldClass, Kicker, Panel } from "./ui";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const linkedin = String(data.get("linkedin") ?? "");
    const filled = ["name", "company", "email", "phone", "material", "diameter", "notes"].every(
      (name) => String(data.get(name) ?? "").trim(),
    );
    if (!file || !filled || !isLinkedInUrl(linkedin)) {
      setError("All fields are required.");
      return;
    }
    setError(null);
    setSent(true);
  }

  if (sent) {
    return (
      <Panel>
        <Kicker>Received</Kicker>
        <h2 className="mt-3 text-2xl tracking-tight">We’ll review your request.</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted">
          Thanks — a quote typically follows once we have a drawing or enough
          detail to size the job
          {file ? ` (${file.name})` : ""}. Email files anytime to{" "}
          <a className="text-copper" href={`mailto:${QUOTE_EMAIL}`}>
            {QUOTE_EMAIL}
          </a>
          .
        </p>
      </Panel>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <Panel>
        <p className="mb-5 text-sm font-medium text-copper">
          All fields required.
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
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
          <LinkedInField labeled />
          <label className="block text-sm">
            Phone
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
            />
          </label>
          <label className="block text-sm">
            Material
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="material"
              required
              placeholder="Stainless, carbon, 330…"
            />
          </label>
          <label className="block text-sm">
            Wire diameter
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="diameter"
              required
              placeholder="e.g. 8 mm or 0.315 in"
            />
          </label>
        </div>
        <label className="mt-5 block text-sm">
          Part notes
          <textarea
            className={`mt-1.5 min-h-32 ${fieldClass}`}
            name="notes"
            required
            placeholder="Quantities, tolerances, finish, and anything a drawing doesn’t capture."
          />
        </label>
        <div className="mt-5">
          <p className="mb-2 text-sm">Drawing (required)</p>
          <StepUpload file={file} onChange={setFile} required />
        </div>
        {error ? (
          <p className="mt-2 text-xs text-copper">{error}</p>
        ) : null}
        <Button type="submit" className="mt-6">
          Send request
        </Button>
      </Panel>
    </form>
  );
}
