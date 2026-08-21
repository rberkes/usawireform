"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StepCanvas, type OcctMesh, type ViewerSource } from "./StepCanvas";
import { Button, btn, fieldClass } from "./ui";
import { cx } from "@/lib/cx";
import {
  WIRE_DIAMETERS,
  WIRE_FINISHES,
  getShowcaseModel,
  showcaseModels,
  showcaseStepPath,
  NATIVE_CAD_PARTS,
  type WireDiameterId,
  type WireFinishId,
} from "@/lib/models";

const CAD_EXT = ["step", "stp", "stpz", "iges", "igs"];

function extOf(name: string) {
  return name.split(".").pop()?.toLowerCase() ?? "";
}

function readCadBuffer(buffer: ArrayBuffer, name: string): Promise<OcctMesh[]> {
  return new Promise((resolve, reject) => {
    const worker = new Worker("/vendor/occt-import-js/occt-import-js-worker.js");
    const fail = (message: string) => {
      worker.terminate();
      reject(new Error(message));
    };
    worker.onmessage = (event: MessageEvent<{ success?: boolean; meshes?: OcctMesh[] }>) => {
      worker.terminate();
      if (!event.data?.success || !event.data.meshes?.length) {
        reject(new Error("Could not triangulate that file."));
        return;
      }
      resolve(event.data.meshes);
    };
    worker.onerror = () => fail("STEP reader failed to start.");
    const format =
      extOf(name) === "igs" || extOf(name) === "iges" ? "iges" : "step";
    worker.postMessage({
      format,
      buffer: new Uint8Array(buffer),
      params: { linearUnit: "millimeter" },
    });
  });
}

function readCadFile(file: File): Promise<OcctMesh[]> {
  return file.arrayBuffer().then((buffer) => readCadBuffer(buffer, file.name));
}

export default function ModelsStudio({ initialPart }: { initialPart?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const fileRef = useRef<HTMLInputElement>(null);

  const partParam = searchParams.get("part") ?? initialPart ?? showcaseModels[0].id;
  const selected = getShowcaseModel(partParam) ?? showcaseModels[0];

  const [diameterId, setDiameterId] = useState<WireDiameterId>("3-8");
  const [finishId, setFinishId] = useState<WireFinishId>("carbon");
  const [autoRotate, setAutoRotate] = useState(true);
  const [over, setOver] = useState(false);
  const [reading, setReading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dropped, setDropped] = useState<{ name: string; meshes: OcctMesh[] } | null>(
    null,
  );
  const [catalogStep, setCatalogStep] = useState<{
    name: string;
    meshes: OcctMesh[];
  } | null>(null);

  const diameter = WIRE_DIAMETERS.find((item) => item.id === diameterId)!;
  const nativeCad = NATIVE_CAD_PARTS.has(selected.id);

  useEffect(() => {
    if (selected.id === "s-hooks") setDiameterId("1-2");
  }, [selected.id]);

  useEffect(() => {
    const url = showcaseStepPath(selected.id);
    let cancelled = false;
    setCatalogStep(null);
    setCatalogLoading(true);
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Missing STEP file.");
        return response.arrayBuffer();
      })
      .then((buffer) => readCadBuffer(buffer, url))
      .then((meshes) => {
        if (!cancelled) {
          setCatalogStep({ name: `${selected.id}.step`, meshes });
        }
      })
      .catch(() => {
        if (!cancelled) setCatalogStep(null);
      })
      .finally(() => {
        if (!cancelled) setCatalogLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [selected.id]);

  const source: ViewerSource = useMemo(() => {
    if (dropped)
      return {
        type: "step",
        meshes: dropped.meshes,
        name: dropped.name,
        finish: finishId,
      };
    if (catalogStep && (diameterId === "3-8" || NATIVE_CAD_PARTS.has(selected.id))) {
      return {
        type: "step",
        meshes: catalogStep.meshes,
        name: catalogStep.name,
        finish: finishId,
      };
    }
    return {
      type: "wire",
      id: selected.id,
      diameterIn: diameter.inches,
      finish: finishId,
    };
  }, [
    dropped,
    catalogStep,
    diameterId,
    selected.id,
    diameter.inches,
    finishId,
  ]);

  function selectPart(id: string) {
    setDropped(null);
    setError(null);
    const params = new URLSearchParams(searchParams.toString());
    params.set("part", id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  async function takeFile(file: File | null) {
    if (!file) return;
    if (!CAD_EXT.includes(extOf(file.name))) {
      setError("Use STEP, STP, or IGES.");
      return;
    }
    setReading(true);
    setError(null);
    try {
      const meshes = await readCadFile(file);
      setDropped({ name: file.name, meshes });
      setAutoRotate(false);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not read that file.");
    } finally {
      setReading(false);
    }
  }

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[16.5rem_minmax(0,1fr)]">
      <aside>
        <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
          Shop models
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1">
          {showcaseModels.map((model) => {
            const active = !dropped && model.id === selected.id;
            return (
              <li key={model.id}>
                <button
                  type="button"
                  onClick={() => selectPart(model.id)}
                  className={cx(
                    "w-full rounded-sm border px-3 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "border-copper bg-copper/10 text-foreground"
                      : "border-line bg-background text-muted hover:border-copper/40 hover:text-foreground",
                  )}
                >
                  <span className="block text-foreground">{model.title}</span>
                  <span className="mt-0.5 block font-mono text-[10px] tracking-widest uppercase">
                    {model.group}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div>
        <div
          className={cx(
            "relative border",
            over ? "border-copper" : "border-line",
          )}
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
            void takeFile(event.dataTransfer.files[0] ?? null);
          }}
        >
          <StepCanvas source={source} autoRotate={autoRotate} />
          <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] tracking-widest text-muted uppercase">
            Drag to orbit · scroll to zoom
          </p>
          {reading || (catalogLoading && !dropped) ? (
            <div className="absolute inset-0 flex items-center justify-center bg-inset/80 text-sm">
              Reading STEP…
            </div>
          ) : null}
          {over ? (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-copper/10 text-sm font-medium">
              Drop STEP or IGES to inspect
            </div>
          ) : null}
        </div>

        <div className="mt-4 flex flex-col gap-4 border border-line bg-background p-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid flex-1 gap-3 sm:grid-cols-3">
            <label className="block text-sm">
              Wire
              <select
                className={`mt-1.5 ${fieldClass}`}
                value={diameterId}
                disabled={!!dropped || nativeCad}
                onChange={(event) =>
                  setDiameterId(event.target.value as WireDiameterId)
                }
              >
                {WIRE_DIAMETERS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-sm">
              Coil
              <select
                className={`mt-1.5 ${fieldClass}`}
                value={finishId}
                disabled={!!dropped}
                onChange={(event) =>
                  setFinishId(event.target.value as WireFinishId)
                }
              >
                {WIRE_FINISHES.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex items-center gap-2 pt-6 text-sm">
              <input
                type="checkbox"
                checked={autoRotate}
                onChange={(event) => setAutoRotate(event.target.checked)}
              />
              Rotate
            </label>
          </div>
          <div className="flex flex-wrap gap-2">
            <input
              ref={fileRef}
              className="sr-only"
              type="file"
              accept=".step,.stp,.stpz,.iges,.igs"
              onChange={(event) => {
                void takeFile(event.target.files?.[0] ?? null);
                event.target.value = "";
              }}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => fileRef.current?.click()}
            >
              Open STEP
            </Button>
            {dropped ? (
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setDropped(null);
                  setError(null);
                }}
              >
                Back to shop models
              </Button>
            ) : null}
          </div>
        </div>

        {error ? <p className="mt-3 text-sm text-copper">{error}</p> : null}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-muted">
            {dropped ? (
              <>
                Showing <span className="text-foreground">{dropped.name}</span>.
                Orbit to inspect. This does not quote the job — send the file
                if you want it formed.
              </>
            ) : (
              <>
                {selected.summary}{" "}
                {catalogStep && (diameterId === "3-8" || nativeCad)
                  ? nativeCad
                    ? "We form this part. Send a print if the length or wire is different."
                    : "3/8 in STEP solid from the shop drawing — not a customer print."
                  : "Shop centerline in stock coil — not a customer print."}{" "}
                <Link
                  href={`/products/${selected.productSlug}`}
                  className="text-copper hover:underline"
                >
                  {selected.title} product page
                </Link>
                .
              </>
            )}
          </p>
          <Link href="/quoting" className={btn.primary}>
            Send a drawing
          </Link>
        </div>
      </div>
    </div>
  );
}
