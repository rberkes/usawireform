"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import {
  DRAWING_ACCEPT,
  DRAWING_HINT,
  isAcceptedDrawing,
} from "@/lib/drawings";
import { assessPrintFit } from "@/lib/print-fit";
import { SOURCE_STOCK_MATERIALS } from "@/lib/source-fit";
import { SOURCE_JOB_CLASSES } from "@/lib/source-types";
import { btn, fieldClass } from "@/components/ui";
import { cx } from "@/lib/cx";

const PRIMARY_KINDS = ["3D CNC", "2D CNC"] as const;

export function HomePrintHero() {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [over, setOver] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const [diameter, setDiameter] = useState("");
  const [kind, setKind] = useState("3D CNC");
  const [materialId, setMaterialId] = useState("");

  const result = assessPrintFit({
    diameterRaw: diameter,
    kind,
    materialId,
  });
  const ready = result.route !== "need-spec";

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

  const otherSelected = !PRIMARY_KINDS.includes(
    kind as (typeof PRIMARY_KINDS)[number],
  );

  return (
    <aside
      id="upload"
      className="scroll-mt-24 rounded-sm border border-white/15 bg-white p-5 text-[#111] shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-6"
    >
      <h2 className="text-xl font-medium tracking-tight">Drop a STEP or 3-view</h2>
      <p className="mt-1.5 text-sm leading-6 text-[#111]/65">
        No STEP? A dimensioned PDF is enough — we model it free.
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
          "mt-5 flex min-h-32 cursor-pointer flex-col items-center justify-center gap-2 rounded-sm border border-dashed px-4 py-7 text-center transition-colors",
          over
            ? "border-copper bg-copper/10"
            : file
              ? "border-copper/50 bg-inset"
              : "border-line bg-inset/60 hover:border-copper/40",
        )}
      >
        <span className="flex h-10 w-10 items-center justify-center border border-line text-copper">
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
        {file ? (
          <>
            <span className="max-w-full truncate text-sm text-foreground">
              {file.name}
            </span>
            <button
              type="button"
              className="text-xs text-muted hover:text-foreground"
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                take(null);
              }}
            >
              Remove
            </button>
          </>
        ) : (
          <>
            <span className="text-sm text-foreground">Drop a file, or browse</span>
            <span className="text-xs text-muted">{DRAWING_HINT}</span>
          </>
        )}
      </label>
      {fileError ? <p className="mt-2 text-xs text-copper">{fileError}</p> : null}

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block text-sm">
          Wire diameter
          <input
            className={`mt-1.5 ${fieldClass}`}
            value={diameter}
            onChange={(event) => setDiameter(event.target.value)}
            placeholder="8 mm or 3/8 in"
            inputMode="decimal"
            autoComplete="off"
          />
        </label>
        <label className="block text-sm">
          Grade
          <select
            className={`mt-1.5 ${fieldClass}`}
            value={materialId}
            onChange={(event) => setMaterialId(event.target.value)}
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

      <fieldset className="mt-4">
        <legend className="text-sm">Bend</legend>
        <div className="mt-1.5 grid grid-cols-3 gap-2">
          {PRIMARY_KINDS.map((row) => (
            <button
              key={row}
              type="button"
              aria-pressed={kind === row}
              onClick={() => setKind(row)}
              className={cx(
                "rounded-sm border px-3 py-2 text-sm transition-colors",
                kind === row
                  ? "border-copper bg-inset"
                  : "border-line hover:border-copper/40",
              )}
            >
              {row === "3D CNC" ? "3D" : "2D"}
            </button>
          ))}
          <button
            type="button"
            aria-pressed={otherSelected}
            onClick={() => {
              if (!otherSelected) setKind("Fourslide");
            }}
            className={cx(
              "rounded-sm border px-3 py-2 text-sm transition-colors",
              otherSelected
                ? "border-copper bg-inset"
                : "border-line hover:border-copper/40",
            )}
          >
            Other
          </button>
        </div>
        {otherSelected ? (
          <select
            className={`mt-2 ${fieldClass}`}
            value={kind}
            onChange={(event) => setKind(event.target.value)}
          >
            {SOURCE_JOB_CLASSES.filter(
              (row) => !PRIMARY_KINDS.includes(row.kind as (typeof PRIMARY_KINDS)[number]),
            ).map((row) => (
              <option key={row.kind} value={row.kind}>
                {row.label}
              </option>
            ))}
          </select>
        ) : null}
      </fieldset>

      <p className="mt-4 text-sm leading-6 text-[#111]/70">
        {ready ? result.title : "Enter a diameter to see which cell can run it."}
      </p>

      <div className="mt-4 flex flex-col gap-2">
        <Link href={result.sourceHref} className={cx(btn.quote, "w-full")}>
          Match shops
        </Link>
        {result.floorHref ? (
          <Link href={result.floorHref} className={cx(btn.ghost, "w-full")}>
            This-floor estimate
          </Link>
        ) : null}
      </div>
    </aside>
  );
}
