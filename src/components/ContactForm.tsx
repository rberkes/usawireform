"use client";

import { useActionState } from "react";
import { useState } from "react";
import { submitContactForm, type QuoteFormState } from "@/app/actions/quote";
import { LinkedInField, QuoteNeedFields, StepUpload } from "./StepUpload";
import { UploadedDrawingPreview } from "./UploadedDrawingPreview";
import { QUOTE_EMAIL } from "@/lib/company";
import { Button, fieldClass, Kicker, Panel } from "./ui";

const initialState: QuoteFormState = {
  success: false,
  message: "",
};

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactForm, initialState);
  const [file, setFile] = useState<File | null>(null);

  if (state.success) {
    return (
      <Panel>
        <Kicker>Received</Kicker>
        <h2 className="mt-3 text-2xl tracking-tight">We'll review your request.</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-muted">
          {state.message}
        </p>
        <p className="mt-4 text-sm text-muted">
          Questions? Email us at{" "}
          <a className="text-copper" href={`mailto:${QUOTE_EMAIL}`}>
            {QUOTE_EMAIL}
          </a>
          .
        </p>
        {file ? <UploadedDrawingPreview file={file} /> : null}
      </Panel>
    );
  }

  return (
    <form action={formAction}>
      <Panel>
        <p className="mb-5 text-sm font-medium text-copper">
          Email and a STEP file are required. LinkedIn is optional.
        </p>
        {state.message && !state.success && (
          <div className="mb-5 rounded border border-copper/30 bg-copper/5 p-3 text-sm text-copper">
            {state.message}
          </div>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm">
            Name
            <input 
              className={`mt-1.5 ${fieldClass}`} 
              name="name" 
              required 
              autoComplete="name"
              aria-invalid={!!state.errors?.name}
            />
            {state.errors?.name && (
              <span className="mt-1 block text-xs text-copper">{state.errors.name}</span>
            )}
          </label>
          <label className="block text-sm">
            Company
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="company"
              required
              autoComplete="organization"
              aria-invalid={!!state.errors?.company}
            />
            {state.errors?.company && (
              <span className="mt-1 block text-xs text-copper">{state.errors.company}</span>
            )}
          </label>
          <label className="block text-sm">
            Email
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="email"
              type="email"
              required
              autoComplete="email"
              aria-invalid={!!state.errors?.email}
            />
            {state.errors?.email && (
              <span className="mt-1 block text-xs text-copper">{state.errors.email}</span>
            )}
          </label>
          <div>
            <LinkedInField labeled />
            {state.errors?.linkedin && (
              <span className="mt-1 block text-xs text-copper">{state.errors.linkedin}</span>
            )}
          </div>
          <label className="block text-sm">
            Phone
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              aria-invalid={!!state.errors?.phone}
            />
            {state.errors?.phone && (
              <span className="mt-1 block text-xs text-copper">{state.errors.phone}</span>
            )}
          </label>
          <label className="block text-sm">
            Material
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="material"
              required
              placeholder="Stainless, carbon, 330…"
              aria-invalid={!!state.errors?.material}
            />
            {state.errors?.material && (
              <span className="mt-1 block text-xs text-copper">{state.errors.material}</span>
            )}
          </label>
          <label className="block text-sm">
            Wire diameter
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="diameter"
              required
              placeholder="e.g. 8 mm or 0.315 in"
              aria-invalid={!!state.errors?.diameter}
            />
            {state.errors?.diameter && (
              <span className="mt-1 block text-xs text-copper">{state.errors.diameter}</span>
            )}
          </label>
        </div>
        <div className="mt-5">
          <QuoteNeedFields />
          <div className="mt-2 grid gap-2 sm:grid-cols-3">
            {state.errors?.targetPrice && (
              <span className="text-xs text-copper">{state.errors.targetPrice}</span>
            )}
            {state.errors?.timeline && (
              <span className="text-xs text-copper">{state.errors.timeline}</span>
            )}
            {state.errors?.quality && (
              <span className="text-xs text-copper">{state.errors.quality}</span>
            )}
          </div>
        </div>
        <label className="mt-5 block text-sm">
          Part notes
          <textarea
            className={`mt-1.5 min-h-32 ${fieldClass}`}
            name="notes"
            required
            placeholder="Quantities, tolerances, finish, and anything a drawing doesn't capture."
            aria-invalid={!!state.errors?.notes}
          />
          {state.errors?.notes && (
            <span className="mt-1 block text-xs text-copper">{state.errors.notes}</span>
          )}
        </label>
        <div className="mt-5">
          <p className="mb-2 text-sm">Drawing (required)</p>
          <StepUpload file={file} onChange={setFile} required />
          {state.errors?.drawing && (
            <span className="mt-1 block text-xs text-copper">{state.errors.drawing}</span>
          )}
        </div>
        <Button type="submit" className="mt-6" disabled={isPending}>
          {isPending ? "Sending..." : "Send request"}
        </Button>
      </Panel>
    </form>
  );
}
