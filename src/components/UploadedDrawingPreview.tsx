"use client";

import { useEffect, useMemo, useState } from "react";
import { StepCanvas, type OcctMesh, type ViewerSource } from "./StepCanvas";
import { readCadBuffer, readCadFile } from "@/lib/occt-read";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadedDrawingPreview({
  file,
  src,
  name,
}: {
  file?: File | null;
  src?: string;
  name?: string;
}) {
  const [meshes, setMeshes] = useState<OcctMesh[] | null>(null);
  const [failed, setFailed] = useState(false);
  const label = file?.name ?? name ?? "drawing.step";

  useEffect(() => {
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
  }, [file, src, label]);

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

  return (
    <div className="mt-6 border border-line bg-inset">
      <div className="relative">
        <StepCanvas
          source={source}
          autoRotate
          className="relative h-[min(50vh,24rem)] min-h-[16rem] w-full overflow-hidden bg-inset"
        />
        {!meshes && !failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-inset text-sm">
            Opening {label}…
          </div>
        ) : null}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-inset px-4 text-center text-sm">
            Could not preview this STEP. We still have the file.
          </div>
        ) : null}
      </div>
      <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        {file
          ? `Your upload · ${label}${file.size ? ` · ${formatBytes(file.size)}` : ""} · drag to orbit`
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
        View STEP
      </button>
    );
  }

  return <UploadedDrawingPreview src={src} name={name} />;
}
