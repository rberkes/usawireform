"use client";

import { useActionState } from "react";
import { useState } from "react";
import { submitJobApplication, type JobApplicationState } from "@/app/actions/careers";
import { QUOTE_EMAIL } from "@/lib/company";
import { Button, fieldClass, Kicker, Panel } from "./ui";

const ACCEPTED_RESUME_TYPES = ".pdf,.doc,.docx";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const initialState: JobApplicationState = {
  success: false,
  message: "",
};

export function JobApplicationForm({ positions }: { positions: string[] }) {
  const [state, formAction, isPending] = useActionState(submitJobApplication, initialState);
  const [resume, setResume] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setResume(null);
      setFileError(null);
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setFileError("File must be under 10MB");
      setResume(null);
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext ?? "")) {
      setFileError("Please upload a PDF or Word document");
      setResume(null);
      return;
    }

    setFileError(null);
    setResume(file);
  }

  if (state.success) {
    return (
      <Panel>
        <Kicker>Application received</Kicker>
        <h3 className="mt-3 text-xl tracking-tight">Thank you for applying</h3>
        <p className="mt-3 text-sm leading-6 text-muted">
          {state.message}
        </p>
        <p className="mt-4 text-sm text-muted">
          Questions? Email us at{" "}
          <a className="text-copper" href={`mailto:${QUOTE_EMAIL}`}>
            {QUOTE_EMAIL}
          </a>
        </p>
      </Panel>
    );
  }

  return (
    <form action={formAction}>
      <Panel>
        {state.message && !state.success && (
          <div className="mb-5 rounded border border-copper/30 bg-copper/5 p-3 text-sm text-copper">
            {state.message}
          </div>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <label className="block text-sm">
            Full name *
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="name"
              required
              autoComplete="name"
            />
            {state.errors?.name && (
              <span className="mt-1 block text-xs text-copper">{state.errors.name}</span>
            )}
          </label>

          <label className="block text-sm">
            Email *
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="email"
              type="email"
              required
              autoComplete="email"
            />
            {state.errors?.email && (
              <span className="mt-1 block text-xs text-copper">{state.errors.email}</span>
            )}
          </label>

          <label className="block text-sm">
            Phone *
            <input
              className={`mt-1.5 ${fieldClass}`}
              name="phone"
              type="tel"
              required
              autoComplete="tel"
            />
            {state.errors?.phone && (
              <span className="mt-1 block text-xs text-copper">{state.errors.phone}</span>
            )}
          </label>

          <label className="block text-sm">
            Position applying for *
            <select className={`mt-1.5 ${fieldClass}`} name="position" required>
              <option value="">Select a position</option>
              {positions.map((pos) => (
                <option key={pos} value={pos}>
                  {pos}
                </option>
              ))}
              <option value="General Application">General Application</option>
            </select>
            {state.errors?.position && (
              <span className="mt-1 block text-xs text-copper">{state.errors.position}</span>
            )}
          </label>

          <label className="block text-sm sm:col-span-2">
            Years of relevant experience *
            <select className={`mt-1.5 ${fieldClass}`} name="experience" required>
              <option value="">Select experience level</option>
              <option value="0-1">Less than 1 year</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            {state.errors?.experience && (
              <span className="mt-1 block text-xs text-copper">{state.errors.experience}</span>
            )}
          </label>
        </div>

        <label className="mt-5 block text-sm">
          Why are you interested in this position? *
          <textarea
            className={`mt-1.5 min-h-24 ${fieldClass}`}
            name="coverLetter"
            required
            placeholder="Tell us about your experience and why you'd be a good fit..."
          />
          {state.errors?.coverLetter && (
            <span className="mt-1 block text-xs text-copper">{state.errors.coverLetter}</span>
          )}
        </label>

        <div className="mt-5">
          <label className="block text-sm">
            Resume * (PDF or Word, max 10MB)
            <input
              className={`mt-1.5 ${fieldClass} file:mr-4 file:rounded-sm file:border-0 file:bg-copper file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-copper-dim`}
              name="resume"
              type="file"
              accept={ACCEPTED_RESUME_TYPES}
              required
              onChange={handleFileChange}
            />
          </label>
          {fileError && (
            <span className="mt-1 block text-xs text-copper">{fileError}</span>
          )}
          {state.errors?.resume && (
            <span className="mt-1 block text-xs text-copper">{state.errors.resume}</span>
          )}
          {resume && (
            <p className="mt-2 text-xs text-muted">
              Selected: {resume.name} ({(resume.size / 1024 / 1024).toFixed(2)} MB)
            </p>
          )}
        </div>

        <label className="mt-5 flex items-start gap-3 text-sm">
          <input
            type="checkbox"
            name="authorized"
            required
            className="mt-1 h-4 w-4 rounded border-line"
          />
          <span className="text-muted">
            I am authorized to work in the United States. *
          </span>
        </label>

        <Button type="submit" className="mt-6" disabled={isPending || !!fileError}>
          {isPending ? "Submitting..." : "Submit application"}
        </Button>

        <p className="mt-4 text-xs text-muted">
          * Required fields. Your information will only be used for employment consideration.
        </p>
      </Panel>
    </form>
  );
}
