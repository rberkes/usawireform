"use client";

import { FormEvent, useId, useRef, useState } from "react";
import { WIRE } from "@/lib/range";
import { QUOTE_EMAIL } from "@/lib/company";
import { Button, fieldClass, Kicker, Panel } from "./ui";

const ACCEPT_EXT = [
  "step",
  "stp",
  "stpz",
  "iges",
  "igs",
  "pdf",
  "dxf",
  "dwg",
  "sldprt",
  "sldasm",
];
const ACCEPT = ACCEPT_EXT.map((ext) => `.${ext}`).join(",");
const MAX_BYTES = 50 * 1024 * 1024;
const FILE_HINT = "STEP, STP, IGES, PDF, DXF, SLDPRT";

function extOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function validate(file: File): string | null {
  if (!ACCEPT_EXT.includes(extOf(file.name))) {
    return `Use ${FILE_HINT}.`;
  }
  if (file.size > MAX_BYTES) {
    return `Over 50 MB — email it to ${QUOTE_EMAIL}.`;
  }
  return null;
}

function assignFile(input: HTMLInputElement | null, file: File | null) {
  if (!input) return;
  if (!file) {
    input.value = "";
    return;
  }
  const transfer = new DataTransfer();
  transfer.items.add(file);
  input.files = transfer.files;
}

export function isLinkedInUrl(value: string) {
  try {
    const url = new URL(value.trim().startsWith("http") ? value.trim() : `https://${value.trim()}`);
    return /(^|\.)linkedin\.com$/i.test(url.hostname);
  } catch {
    return false;
  }
}

export function StepUpload({
  file,
  onChange,
  name = "drawing",
  required = false,
}: {
  file: File | null;
  onChange: (file: File | null) => void;
  name?: string;
  required?: boolean;
}) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function take(next: File | null) {
    if (!next) {
      setError(null);
      assignFile(inputRef.current, null);
      onChange(null);
      return;
    }
    const message = validate(next);
    if (message) {
      setError(message);
      assignFile(inputRef.current, null);
      onChange(null);
      return;
    }
    setError(null);
    assignFile(inputRef.current, next);
    onChange(next);
  }

  return (
    <div>
      <input
        ref={inputRef}
        id={inputId}
        className="sr-only"
        type="file"
        name={name}
        accept={ACCEPT}
        onChange={(event) => take(event.target.files?.[0] ?? null)}
      />
      <label
        htmlFor={inputId}
        onDragEnter={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(event) => {
          event.preventDefault();
          setOver(false);
          take(event.dataTransfer.files[0] ?? null);
        }}
        className={`flex cursor-pointer items-center gap-4 rounded-sm border border-dashed px-4 py-5 transition-colors ${
          over
            ? "border-copper bg-copper/10"
            : file
              ? "border-copper/50 bg-background"
              : "border-line bg-background hover:border-copper/40"
        }`}
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-line text-copper">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
              d="M12 16V4m0 0l-4 4m4-4l4 4M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          {file ? (
            <>
              <span className="block truncate text-sm text-foreground">
                {file.name}
              </span>
              <span className="mt-0.5 block font-mono text-[11px] text-muted">
                {formatBytes(file.size)} · STEP preferred
              </span>
            </>
          ) : (
            <>
              <span className="block text-sm text-foreground">
                Drop a drawing, or click to browse
                {required ? " (required)" : ""}
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {FILE_HINT} · {WIRE.short}
              </span>
            </>
          )}
        </span>
        {file ? (
          <button
            type="button"
            className="shrink-0 px-2 py-1 text-xs text-muted hover:text-foreground"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              take(null);
            }}
          >
            Remove
          </button>
        ) : null}
      </label>
      {error ? (
        <p className="mt-2 text-xs text-copper">{error}</p>
      ) : null}
    </div>
  );
}

export function LinkedInField({
  className = "",
  labeled = false,
}: {
  className?: string;
  labeled?: boolean;
}) {
  const input = (
    <input
      className={`${fieldClass} ${labeled ? "mt-1.5" : ""}`}
      name="linkedin"
      type="url"
      required
      inputMode="url"
      autoComplete="url"
      placeholder={
        labeled
          ? "https://www.linkedin.com/in/you"
          : "LinkedIn URL (required)"
      }
      pattern="https?://([A-Za-z0-9-]+\.)?linkedin\.com/.*"
      title="Use a full LinkedIn URL, e.g. https://www.linkedin.com/in/you"
    />
  );

  return (
    <label className={`block min-w-0 text-sm ${labeled ? "" : "flex-1"} ${className}`}>
      {labeled ? "LinkedIn" : <span className="sr-only">LinkedIn (required)</span>}
      {input}
    </label>
  );
}

export function StepQuoteBlock({
  title = "Have a form to run?",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    const linkedin = String(new FormData(form).get("linkedin") ?? "");
    if (!file || !email || !isLinkedInUrl(linkedin)) {
      setError("All fields are required — drawing, email, and LinkedIn.");
      return;
    }
    setError(null);
    setSent(true);
  }

  if (sent) {
    return (
      <Panel className={`quote-block ${className}`}>
        <Kicker>Received</Kicker>
        <h2 className="mt-3 text-xl tracking-tight">We’ll open the file.</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          {file ? (
            <>
              {file.name} is on the request. A quote follows if the diameter is
              in {WIRE.short}.
            </>
          ) : (
            <>
              If you still have a drawing, email it to{" "}
              <a className="text-copper" href={`mailto:${QUOTE_EMAIL}`}>
                {QUOTE_EMAIL}
              </a>
              .
            </>
          )}
        </p>
      </Panel>
    );
  }

  return (
    <form onSubmit={onSubmit} className={className}>
      <Panel className="quote-block">
        <h2 className="text-xl tracking-tight">{title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          We’ll call the bend sequence and whether it belongs on a 2D or 3D CNC
          program.
        </p>
        <p className="mt-3 text-sm font-medium text-copper">
          All fields required — drawing, email, and LinkedIn.
        </p>
        <div className="mt-5">
          <StepUpload file={file} onChange={setFile} required />
        </div>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <label className="block min-w-0 flex-1 text-sm">
            <span className="sr-only">Email (required)</span>
            <input
              className={fieldClass}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="Email (required)"
            />
          </label>
          <LinkedInField />
        </div>
        {error ? (
          <p className="mt-2 text-xs text-copper">{error}</p>
        ) : null}
        <Button type="submit" className="mt-4">
          Send drawing
        </Button>
      </Panel>
    </form>
  );
}
