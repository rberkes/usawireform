"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { StepCanvas, type OcctMesh, type ViewerSource } from "./StepCanvas";
import { cx } from "@/lib/cx";
import { readCatalogStep } from "@/lib/occt-read";
import {
  NATIVE_CAD_PARTS,
  showcaseHref,
  showcaseStepPath,
} from "@/lib/models";

export function CatalogModelPreview({
  partId,
  className,
}: {
  partId: string;
  className?: string;
}) {
  const nativeCad = NATIVE_CAD_PARTS.has(partId);
  const [meshes, setMeshes] = useState<OcctMesh[] | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!nativeCad) {
      setMeshes(null);
      setFailed(false);
      return;
    }
    let cancelled = false;
    setMeshes(null);
    setFailed(false);
    readCatalogStep(showcaseStepPath(partId))
      .then((next) => {
        if (!cancelled) setMeshes(next);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
    };
  }, [partId, nativeCad]);

  const source: ViewerSource = useMemo(() => {
    if (nativeCad && meshes) {
      return {
        type: "step",
        meshes,
        name: `${partId}.step`,
        finish: "carbon",
      };
    }
    if (nativeCad) return { type: "empty" };
    return {
      type: "wire",
      id: partId,
      diameterIn: 0.375,
      finish: "carbon",
    };
  }, [nativeCad, meshes, partId]);

  const loading = nativeCad && !meshes && !failed;

  return (
    <div className={cx("border border-line bg-inset", className)}>
      <div className="relative">
        <StepCanvas
          source={source}
          autoRotate
          className="relative h-[min(50vh,24rem)] min-h-[16rem] w-full overflow-hidden bg-inset"
        />
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-inset text-sm">
            Reading STEP…
          </div>
        ) : null}
        {failed ? (
          <div className="absolute inset-0 flex items-center justify-center bg-inset px-4 text-center text-sm">
            Could not read that shop solid.
          </div>
        ) : null}
      </div>
      <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        Same model as the{" "}
        <Link
          href={showcaseHref(partId)}
          className="font-sans text-[11px] tracking-widest text-copper normal-case hover:underline"
        >
          3D viewer
        </Link>
        {" · "}drag to orbit
      </p>
    </div>
  );
}
