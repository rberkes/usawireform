"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import {
  DRAWING_ACCEPT,
  DRAWING_FREE_STEP,
  DRAWING_HINT,
  isAcceptedDrawing,
} from "@/lib/drawings";
import {
  assessPrintFit,
  type PrintFitResult,
} from "@/lib/print-fit";
import { SOURCE_STOCK_MATERIALS } from "@/lib/source-fit";
import { SOURCE_JOB_CLASSES } from "@/lib/source-types";
import { btn, fieldClass } from "@/components/ui";
import { cx } from "@/lib/cx";

export function HomePrintHero() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [over, setOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [diameter, setDiameter] = useState("");
  const [kind, setKind] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [result, setResult] = useState<PrintFitResult | null>(null);

  function take(next: File | null) {
    if (!next) {
      setFile(null);
      setFileError(null);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    if (!isAcceptedDrawing(next.name)) {
      setFile(null);
      setFileError(`Use ${DRAWING_HINT}.`);
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFileError(null);
    setFile(next);
  }

  function checkFit() {
    setResult(
      assessPrintFit({
        diameterRaw: diameter,
        kind,
        materialId,
      }),
    );
  }

  return (
    <aside
      id="upload"
      className="scroll-mt-24 rounded-sm border border-white/15 bg-white p-5 text-[#111] sm:p-6"
    >
      <p className="font-mono text-[11px] tracking-[0.22em] text-[#0b1f33]/55 uppercase">
        Upload a print
      </p>
      <h2 className="mt-2 text-xl font-medium tracking-tight">
        Drop a STEP or 3-view
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#111]/70">
        We check diameter, 2D vs 3D, and material against real cells.{" "}
        {DRAWING_FREE_STEP}
      </p>

      <input
        ref={inputRef}
        id={inputId}
        className="sr-only"
        type="file"
        accept={DRAWING_ACCEPT}
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
        className={cx(
          "mt-5 flex cursor-pointer items-center gap-4 rounded-sm border border-dashed px-4 py-5 transition-colors",
          over
            ? "border-copper bg-copper/10"
            : file
              ? "border-copper/50 bg-inset"
              : "border-line bg-background hover:border-copper/40",
        )}
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
              <span className="mt-0.5 block text-xs text-muted">
                Held on this page only — send it on Source to file the job.
              </span>
            </>
          ) : (
            <>
              <span className="block text-sm text-foreground">
                Drop a drawing, or click to browse
              </span>
              <span className="mt-0.5 block text-xs text-muted">
                {DRAWING_HINT}
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
      {fileError ? <p className="mt-2 text-xs text-copper">{fileError}</p> : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          Wire diameter
          <input
            className={`mt-1.5 ${fieldClass}`}
            value={diameter}
            onChange={(event) => {
              setDiameter(event.target.value);
              setResult(null);
            }}
            placeholder="8 mm or 3/8 in"
            inputMode="decimal"
            autoComplete="off"
          />
        </label>
        <label className="block text-sm">
          Cell
          <select
            className={`mt-1.5 ${fieldClass}`}
            value={kind}
            onChange={(event) => {
              setKind(event.target.value);
              setResult(null);
            }}
          >
            <option value="">2D, 3D, or another cell</option>
            {SOURCE_JOB_CLASSES.map((row) => (
              <option key={row.kind} value={row.kind}>
                {row.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm sm:col-span-2">
          Material
          <select
            className={`mt-1.5 ${fieldClass}`}
            value={materialId}
            onChange={(event) => {
              setMaterialId(event.target.value);
              setResult(null);
            }}
          >
            <option value="">Not sure</option>
            {SOURCE_STOCK_MATERIALS.map((row) => (
              <option key={row.id} value={row.id}>
                {row.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button type="button" className={`${btn.quote} mt-5 w-full`} onClick={checkFit}>
        Check the cell
      </button>

      {result ? <FitResult result={result} /> : null}
    </aside>
  );
}

function FitResult({ result }: { result: PrintFitResult }) {
  const tone =
    result.route === "this-floor"
      ? "border-copper/40 bg-inset"
      : result.route === "need-spec"
        ? "border-line bg-background"
        : "border-line bg-inset";

  return (
    <div className={`mt-5 border p-4 ${tone}`} role="status">
      <p className="font-mono text-[11px] tracking-[0.22em] text-copper uppercase">
        Fit
      </p>
      <h3 className="mt-2 text-lg font-medium tracking-tight">{result.title}</h3>
      <p className="mt-2 text-sm leading-6 text-[#111]/70">{result.body}</p>
      <ul className="mt-3 space-y-1.5 text-sm leading-6">
        {result.checks.map((check) => (
          <li key={check.label}>
            <span className={check.ok ? "text-foreground" : "text-copper"}>
              {check.ok ? "Yes — " : "Need — "}
              {check.label}.
            </span>{" "}
            <span className="text-[#111]/65">{check.detail}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-col gap-2">
        {result.route !== "need-spec" ? (
          <Link href={result.sourceHref} className={cx(btn.quote, "w-full")}>
            Match shops on Source
          </Link>
        ) : null}
        {result.floorHref ? (
          <Link href={result.floorHref} className={cx(btn.ghost, "w-full")}>
            This-floor estimate
          </Link>
        ) : null}
      </div>
    </div>
  );
}
