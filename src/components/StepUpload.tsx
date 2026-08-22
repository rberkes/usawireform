"use client";

import { useActionState, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { submitQuickQuote, type QuoteFormState } from "@/app/actions/quote";
import { QUOTE_EMAIL } from "@/lib/company";
import { Button, fieldClass, Kicker, Panel } from "./ui";
import { UploadedDrawingPreview } from "./UploadedDrawingPreview";

const quoteInitialState: QuoteFormState = {
  success: false,
  message: "",
};

const ACCEPT_EXT = ["step", "stp", "stpz"];
const ACCEPT = ACCEPT_EXT.map((ext) => `.${ext}`).join(",");
const MAX_BYTES = 50 * 1024 * 1024;
const FILE_HINT = "STEP or STP";

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

function shrinkStill(blob: Blob): Promise<Blob> {
  return new Promise((resolve) => {
    const image = new Image();
    const url = URL.createObjectURL(blob);
    image.onload = () => {
      const maxW = 720;
      const scale = Math.min(1, maxW / Math.max(image.width, 1));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        resolve(blob);
        return;
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (next) => {
          URL.revokeObjectURL(url);
          resolve(next && next.size < blob.size ? next : blob);
        },
        "image/jpeg",
        0.72,
      );
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(blob);
    };
    image.src = url;
  });
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
  const previewRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function take(next: File | null) {
    if (!next) {
      setError(null);
      assignFile(inputRef.current, null);
      assignFile(previewRef.current, null);
      onChange(null);
      return;
    }
    const message = validate(next);
    if (message) {
      setError(message);
      assignFile(inputRef.current, null);
      assignFile(previewRef.current, null);
      onChange(null);
      return;
    }
    setError(null);
    assignFile(previewRef.current, null);
    assignFile(inputRef.current, next);
    onChange(next);
  }

  async function takeStill(blob: Blob) {
    const compact = await shrinkStill(blob);
    const base = (file?.name ?? "drawing").replace(/\.[^.]+$/, "") || "drawing";
    const still = new File([compact], `${base}.jpg`, { type: "image/jpeg" });
    assignFile(previewRef.current, still);
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
        required={required}
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
                {formatBytes(file.size)} · preview below is emailed with your
                thank-you
              </span>
            </>
          ) : (
            <>
              <span className="block text-sm text-foreground">
                Drop a drawing, or click to browse
                {required ? " (required)" : ""}
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {FILE_HINT} · drop the 3D solid
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
      <input
        ref={previewRef}
        className="sr-only"
        type="file"
        name="preview"
        tabIndex={-1}
        aria-hidden
      />
      {file ? (
        <UploadedDrawingPreview file={file} onStill={takeStill} />
      ) : null}
    </div>
  );
}

export function LinkedInField({
  className = "",
  labeled = false,
  required = false,
}: {
  className?: string;
  labeled?: boolean;
  required?: boolean;
}) {
  const input = (
    <input
      className={`${fieldClass} ${labeled ? "mt-1.5" : ""}`}
      name="linkedin"
      type="url"
      required={required}
      inputMode="url"
      autoComplete="url"
      placeholder={
        labeled
          ? "https://www.linkedin.com/in/you"
          : "LinkedIn URL (optional)"
      }
      pattern="https?://([A-Za-z0-9-]+\.)?linkedin\.com/.*"
      title="Use a full LinkedIn URL, e.g. https://www.linkedin.com/in/you"
    />
  );

  return (
    <label className={`block min-w-0 text-sm ${labeled ? "" : "flex-1"} ${className}`}>
      {labeled ? (
        required ? "LinkedIn" : "LinkedIn (optional)"
      ) : (
        <span className="sr-only">
          {required ? "LinkedIn (required)" : "LinkedIn (optional)"}
        </span>
      )}
      {input}
    </label>
  );
}

export function QuoteNeedFields() {
  return (
    <div className="grid gap-5 sm:grid-cols-3">
      <label className="block text-sm">
        Target price
        <input
          className={`mt-1.5 ${fieldClass}`}
          name="targetPrice"
          required
          inputMode="decimal"
          placeholder="$ / piece"
        />
      </label>
      <label className="block text-sm">
        Required timeline
        <select className={`mt-1.5 ${fieldClass}`} name="timeline" required>
          <option value="">Select</option>
          <option value="2-weeks">2 weeks</option>
          <option value="4-weeks">4 weeks</option>
          <option value="6-8-weeks">6–8 weeks</option>
          <option value="12-weeks">12 weeks</option>
          <option value="flexible">Flexible</option>
        </select>
      </label>
      <label className="block text-sm">
        Quality standard
        <select className={`mt-1.5 ${fieldClass}`} name="quality" required>
          <option value="">Select</option>
          <option value="print">Print tolerances</option>
          <option value="iso-9001">ISO 9001</option>
          <option value="ppap">PPAP</option>
          <option value="fair">First article (FAIR)</option>
          <option value="aws">AWS weld spec</option>
          <option value="customer">Customer spec (in notes)</option>
        </select>
      </label>
    </div>
  );
}

export function StepQuoteBlock({
  title = "Have a form to run?",
  className = "",
}: {
  title?: string;
  className?: string;
}) {
  const pathname = usePathname();
  const [state, formAction, isPending] = useActionState(
    submitQuickQuote,
    quoteInitialState,
  );
  const [file, setFile] = useState<File | null>(null);

  if (state.success) {
    return (
      <Panel className={`quote-block ${className}`}>
        <Kicker>Received</Kicker>
        <h2 className="mt-3 text-xl tracking-tight">We’ll open the file.</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          {state.message}
        </p>
        {file ? <UploadedDrawingPreview file={file} /> : null}
      </Panel>
    );
  }

  return (
    <form action={formAction} className={className}>
      <input type="hidden" name="source" value={pathname} />
      <Panel className="quote-block">
        <h2 className="text-xl tracking-tight">{title}</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          We’ll call the bend sequence and whether it belongs on a 2D or 3D CNC
          program.
        </p>
        <p className="mt-3 text-sm font-medium text-copper">
          Drawing and email are required. LinkedIn is optional.
        </p>
        {state.message && !state.success ? (
          <p className="mt-3 text-sm text-copper">{state.message}</p>
        ) : null}
        <div className="mt-5">
          <StepUpload file={file} onChange={setFile} required />
          {state.errors?.drawing ? (
            <p className="mt-2 text-xs text-copper">{state.errors.drawing}</p>
          ) : null}
        </div>
        <div className="mt-4">
          <QuoteNeedFields />
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
              aria-invalid={!!state.errors?.email}
            />
          </label>
          <LinkedInField />
        </div>
        <Button type="submit" className="mt-4" disabled={isPending}>
          {isPending ? "Sending..." : "Send drawing"}
        </Button>
      </Panel>
    </form>
  );
}
