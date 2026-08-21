"use client";

import { useEffect, useMemo, useState } from "react";
import { StepCanvas, type OcctMesh, type ViewerSource } from "./StepCanvas";
import { readCadFile } from "@/lib/occt-read";

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function UploadedDrawingPreview({ file }: { file: File }) {
  const [meshes, setMeshes] = useState<OcctMesh[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setMeshes(null);
    setFailed(false);
    readCadFile(file)
      .then((next) => {
        if (!cancelled) setMeshes(next);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [file]);

  const source: ViewerSource = useMemo(() => {
    if (!meshes) return { type: "empty" };
    return {
      type: "step",
      meshes,
      name: file.name,
      finish: "carbon",
    };
  }, [file.name, meshes]);

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
            Opening {file.name}…
          </div>
        ) : null}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-inset px-4 text-center text-sm">
            Could not preview this STEP. We still have the file.
          </div>
        ) : null}
      </div>
      <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        Your upload · {file.name} · {formatBytes(file.size)} · drag to orbit
      </p>
    </div>
  );
}
