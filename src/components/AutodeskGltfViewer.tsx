"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

const VIEWER_VERSION = "7.108.0";
const VIEWER_BASE = `https://developer.api.autodesk.com/modelderivative/v2/viewers/${VIEWER_VERSION}`;

type Vec = { x: number; y: number; z: number };

export type AutodeskLocalViewer = {
  finish: () => void;
  start: () => number;
  setTheme: (theme: string) => void;
  setLightPreset: (index: number) => void;
  setBackgroundColor: (
    r: number,
    g: number,
    b: number,
    r2: number,
    g2: number,
    b2: number,
  ) => void;
  setGroundShadow: (on: boolean) => void;
  setQualityLevel: (sao: boolean, fxaa: boolean) => void;
  fitToView: () => void;
  loadExtension: (name: string) => Promise<unknown>;
  loadModel: (
    url: string,
    options: Record<string, unknown>,
    onSuccess?: () => void,
    onError?: () => void,
  ) => void;
  unloadModel?: (model?: unknown) => void;
  model?: {
    getBoundingBox: () => {
      center: () => Vec;
      size: () => Vec;
    };
  };
  navigation: {
    setView: (eye: Vec, target: Vec) => void;
    toPerspective: () => void;
  };
  getScreenShot: (
    width: number,
    height: number,
    onDone: (url: string) => void,
  ) => void;
  impl?: { invalidate: (a: boolean, b: boolean, c: boolean) => void };
};

type AutodeskNamespace = {
  Viewing: {
    Initializer: (
      options: Record<string, unknown>,
      onReady: () => void,
    ) => void;
    GuiViewer3D: new (container: HTMLElement) => AutodeskLocalViewer;
    Viewer3D: new (container: HTMLElement) => AutodeskLocalViewer;
  };
};

function autodeskNs() {
  return (window as unknown as { Autodesk?: AutodeskNamespace }).Autodesk;
}

let assetsPromise: Promise<void> | null = null;

function loadViewerAssets() {
  if (typeof window !== "undefined" && autodeskNs()) {
    return Promise.resolve();
  }
  if (assetsPromise) return assetsPromise;
  assetsPromise = new Promise((resolve, reject) => {
    const cssId = "autodesk-viewer-css";
    if (!document.getElementById(cssId)) {
      const link = document.createElement("link");
      link.id = cssId;
      link.rel = "stylesheet";
      link.href = `${VIEWER_BASE}/style.min.css`;
      document.head.appendChild(link);
    }
    const script = document.createElement("script");
    script.src = `${VIEWER_BASE}/viewer3D.min.js`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      assetsPromise = null;
      reject(new Error("Autodesk viewer failed to load."));
    };
    document.body.appendChild(script);
  });
  return assetsPromise;
}

export type CameraPose = {
  id: string;
  label: string;
  eye: (center: Vec, span: number) => Vec;
};

export function poseFromBox(
  viewer: AutodeskLocalViewer,
  eyeOf: (center: Vec, span: number) => Vec,
) {
  const box = viewer.model?.getBoundingBox();
  if (!box) return;
  const center = box.center();
  const size = box.size();
  const span = Math.max(size.x, size.y, size.z, 1);
  viewer.navigation.toPerspective();
  viewer.navigation.setView(eyeOf(center, span), center);
  viewer.impl?.invalidate(true, true, true);
}

export function AutodeskGltfViewer({
  modelUrl,
  className,
  chrome = "gui",
  onReady,
}: {
  modelUrl: string;
  className?: string;
  chrome?: "gui" | "bare";
  onReady?: (viewer: AutodeskLocalViewer) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<AutodeskLocalViewer | null>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;
  const [status, setStatus] = useState("Loading Autodesk viewer…");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let viewer: AutodeskLocalViewer | null = null;

    async function start() {
      setStatus("Loading Autodesk viewer…");
      await loadViewerAssets();
      if (cancelled || !hostRef.current) return;
      const Autodesk = autodeskNs();
      if (!Autodesk) throw new Error("Autodesk viewer failed to load.");

      await new Promise<void>((resolve) => {
        Autodesk.Viewing.Initializer({ env: "Local" }, () => resolve());
      });
      if (cancelled || !hostRef.current) return;

      const Viewer =
        chrome === "bare"
          ? Autodesk.Viewing.Viewer3D
          : Autodesk.Viewing.GuiViewer3D;
      const live = new Viewer(hostRef.current);
      viewer = live;
      viewerRef.current = live;
      const started = live.start();
      if (started < 0) {
        setStatus("WebGL is required to stream this model.");
        return;
      }
      live.setTheme("light-theme");
      live.setBackgroundColor(244, 244, 242, 244, 244, 242);
      live.setGroundShadow(true);
      live.setQualityLevel(true, true);
      try {
        live.setLightPreset(2);
      } catch {
        live.setLightPreset(1);
      }
      await live.loadExtension("Autodesk.glTF");
      if (cancelled) return;

      live.loadModel(
        modelUrl,
        {},
        () => {
          if (cancelled) return;
          live.fitToView();
          setStatus("");
          readyRef.current?.(live);
        },
        () => {
          if (!cancelled) setStatus("Could not load that CV-hook model.");
        },
      );
    }

    start().catch((cause) => {
      if (!cancelled) {
        setStatus(
          cause instanceof Error
            ? cause.message
            : "Could not open the Autodesk viewer.",
        );
      }
    });

    return () => {
      cancelled = true;
      viewerRef.current = null;
      viewer?.finish();
      host.replaceChildren();
    };
  }, [modelUrl, chrome]);

  return (
    <div
      className={cx(
        "relative w-full overflow-hidden bg-inset",
        className ?? "h-[min(72vh,40rem)] min-h-[24rem]",
      )}
    >
      <div ref={hostRef} className="absolute inset-0" />
      {status ? (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-inset/80 text-sm">
          {status}
        </div>
      ) : null}
    </div>
  );
}
