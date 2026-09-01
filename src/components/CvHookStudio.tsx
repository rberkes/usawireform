"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import {
  AutodeskGltfViewer,
  poseFromBox,
  type AutodeskLocalViewer,
} from "./AutodeskGltfViewer";
import { btn } from "./ui";
import { cx } from "@/lib/cx";
import {
  CV_HOOK_MODELS,
  CV_HOOK_VIEWS,
  getCvHookModel,
  type CvHookViewId,
} from "@/lib/cv-hook-models";

const EYE: Record<CvHookViewId, (c: { x: number; y: number; z: number }, span: number) => { x: number; y: number; z: number }> =
  {
    iso: (c, span) => ({
      x: c.x + span * 1.6,
      y: c.y + span * 0.9,
      z: c.z + span * 1.8,
    }),
    hang: (c, span) => ({
      x: c.x + span * 0.2,
      y: c.y + span * 2.2,
      z: c.z + span * 0.35,
    }),
    c: (c, span) => ({
      x: c.x + span * 2.2,
      y: c.y + span * 0.35,
      z: c.z + span * 0.2,
    }),
    v: (c, span) => ({
      x: c.x,
      y: c.y,
      z: c.z + span * 2.4,
    }),
  };

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function shot(viewer: AutodeskLocalViewer, width = 640, height = 400) {
  return new Promise<string>((resolve) => {
    viewer.getScreenShot(width, height, (url) => resolve(url));
  });
}

export function CvHookStudio({ initialId }: { initialId?: string }) {
  const [modelId, setModelId] = useState(
    () => getCvHookModel(initialId ?? "cv-12-180").id,
  );
  const [view, setView] = useState<CvHookViewId>("iso");
  const [stills, setStills] = useState<Partial<Record<CvHookViewId, string>>>(
    {},
  );
  const [viewer, setViewer] = useState<AutodeskLocalViewer | null>(null);
  const model = getCvHookModel(modelId);

  const applyView = useCallback(
    (next: CvHookViewId, target?: AutodeskLocalViewer) => {
      const active = target ?? viewer;
      if (!active?.model) return;
      setView(next);
      poseFromBox(active, EYE[next]);
    },
    [viewer],
  );

  const onReady = useCallback(async (live: AutodeskLocalViewer) => {
    setViewer(live);
    poseFromBox(live, EYE.iso);
    setView("iso");
    const next: Partial<Record<CvHookViewId, string>> = {};
    for (const item of CV_HOOK_VIEWS) {
      poseFromBox(live, EYE[item.id]);
      await wait(220);
      next[item.id] = await shot(live);
    }
    poseFromBox(live, EYE.iso);
    setStills(next);
  }, []);

  return (
    <div className="mt-10 grid items-start gap-8 lg:grid-cols-[15.5rem_minmax(0,1fr)]">
      <aside>
        <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
          CV forms we bend
        </p>
        <ul className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-1">
          {CV_HOOK_MODELS.map((item) => {
            const active = item.id === model.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    setStills({});
                    setViewer(null);
                    setModelId(item.id);
                  }}
                  className={cx(
                    "w-full rounded-sm border px-3 py-2.5 text-left text-sm transition-colors",
                    active
                      ? "border-copper bg-copper/10 text-foreground"
                      : "border-line bg-background text-muted hover:border-copper/40 hover:text-foreground",
                  )}
                >
                  <span className="block text-foreground">{item.title}</span>
                  <span className="mt-0.5 block font-mono text-[10px] tracking-widest uppercase">
                    {item.kind === "90cv" ? "90° CV" : "CV"} · Autodesk
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>

      <div>
        <div className="relative border border-line">
          <AutodeskGltfViewer
            key={model.url}
            modelUrl={model.url}
            onReady={onReady}
          />
          <p className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] tracking-widest text-muted uppercase">
            Autodesk viewer · orbit · zoom · view cube
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {CV_HOOK_VIEWS.map((item) => {
            const src = stills[item.id];
            const active = view === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => applyView(item.id)}
                className={cx(
                  "overflow-hidden rounded-sm border text-left transition-colors",
                  active
                    ? "border-copper"
                    : "border-line hover:border-copper/40",
                )}
              >
                <div className="aspect-[8/5] bg-inset">
                  {src ? (
                    <img
                      src={src}
                      alt={`${model.title} · ${item.label}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center font-mono text-[10px] tracking-widest text-muted uppercase">
                      Rendering…
                    </div>
                  )}
                </div>
                <span className="block px-2 py-1.5 font-mono text-[10px] tracking-widest text-muted uppercase">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm leading-6 text-muted">
            {model.overallIn} in overall, {model.dIn} in wire, {model.openingIn}{" "}
            in C bowl and V opening — the path this cell CNC-forms from coil.
            Not an EPSI SKU. 0.180 in and 0.250 in sit in 4–14 mm.{" "}
            <Link
              href="/powder-coating-hooks/hcv-series-cv-hooks"
              className="text-copper hover:underline"
            >
              5% under published HCV boxes
            </Link>
            .
          </p>
          <Link href="/custom-powder-coating-hooks" className={btn.primary}>
            Build a CV-hook
          </Link>
        </div>
      </div>
    </div>
  );
}
