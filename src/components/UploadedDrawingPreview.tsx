"use client";

import { useEffect, useMemo, useState } from "react";
import { StepCanvas, type OcctMesh, type ViewerSource } from "./StepCanvas";
import { DRAWING_FREE_STEP, isPdfDrawing } from "@/lib/drawings";
import { isCadFile, readCadBuffer, readCadFile } from "@/lib/occt-read";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadedDrawingPreview({
  file,
  src,
  name,
  onStill,
}: {
  file?: File | null;
  src?: string;
  name?: string;
  onStill?: (blob: Blob) => void;
}) {
  const [meshes, setMeshes] = useState<OcctMesh[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const label = file?.name ?? name ?? "drawing";
  const cad = isCadFile(label);
  const pdf = isPdfDrawing(label);

  useEffect(() => {
    if (!file || !pdf) {
      setPdfUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPdfUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file, pdf]);

  useEffect(() => {
    if (!cad) {
      setMeshes(null);
      setFailed(false);
      return;
    }

    let cancelled = false;
    setMeshes(null);
    setFailed(false);

    const load = file
      ? readCadFile(file)
      : src
        ? fetch(src).then(async (response) => {
            if (!response.ok) throw new Error("Missing file");
            return readCadBuffer(await response.arrayBuffer(), label);
          })
        : Promise.reject(new Error("No drawing"));

    load
      .then((next) => {
        if (!cancelled) setMeshes(next);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [cad, file, src, label]);

  const source: ViewerSource = useMemo(() => {
    if (!meshes) return { type: "empty" };
    return {
      type: "step",
      meshes,
      name: label,
      finish: "carbon",
    };
  }, [label, meshes]);

  if (!file && !src) return null;

  const sizeLabel = file?.size ? ` · ${formatBytes(file.size)}` : "";

  if (pdf) {
    const href = pdfUrl ?? src;
    return (
      <div className="mt-6 border border-line bg-inset">
        {href ? (
          <iframe
            title={label}
            src={href}
            className="h-[min(50vh,24rem)] min-h-[16rem] w-full bg-inset"
          />
        ) : (
          <p className="px-5 py-8 text-center text-sm text-muted">
            PDF received. {DRAWING_FREE_STEP}
          </p>
        )}
        <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
          Your upload · {label}
          {sizeLabel} · 3-view PDF
        </p>
      </div>
    );
  }

  if (!cad) {
    return (
      <div className="mt-6 border border-line bg-inset px-5 py-8">
        <p className="text-sm text-foreground">{label} received.</p>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          {DRAWING_FREE_STEP} The desk will open this file with the quote.
        </p>
        <p className="mt-4 font-mono text-[11px] tracking-widest text-muted uppercase">
          Your upload{sizeLabel}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 border border-line bg-inset">
      <div className="relative">
        <StepCanvas
          source={source}
          autoRotate
          onStill={onStill}
          className="relative h-[min(50vh,24rem)] min-h-[16rem] w-full overflow-hidden bg-inset"
        />
        {!meshes && !failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-inset text-sm">
            Opening {label}…
          </div>
        ) : null}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-inset px-4 text-center text-sm">
            Could not preview this file. We still have it.
          </div>
        ) : null}
      </div>
      <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        {file
          ? `Your upload · ${label}${sizeLabel} · drag to orbit`
          : `${label} · drag to orbit`}
      </p>
    </div>
  );
}

export function AdminStepPreview({
  src,
  name,
}: {
  src: string;
  name?: string;
}) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        type="button"
        className="text-copper hover:underline"
        onClick={() => setOpen(true)}
      >
        View drawing
      </button>
    );
  }

  return <UploadedDrawingPreview src={src} name={name} />;
}
