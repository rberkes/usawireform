"use client";

import { useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

const VIEWER_VERSION = "7.108.0";
const VIEWER_BASE = `https://developer.api.autodesk.com/modelderivative/v2/viewers/${VIEWER_VERSION}`;

type ShareSession = {
  urn: string;
  accessToken: string;
  expiresIn: number;
};

declare global {
  interface Window {
    Autodesk?: {
      Viewing: {
        Initializer: (
          options: {
            env: string;
            api?: string;
            getAccessToken: (
              onTokenReady: (token: string, expires: number) => void,
            ) => void;
          },
          onReady: () => void,
        ) => void;
        Document: {
          load: (
            documentId: string,
            onSuccess: (doc: AutodeskDocument) => void,
            onError: () => void,
          ) => void;
          shutdown: () => void;
        };
        GuiViewer3D: new (container: HTMLElement) => AutodeskGuiViewer;
        Viewer3D: new (container: HTMLElement) => AutodeskGuiViewer;
      };
    };
  }
}

type AutodeskDocument = {
  getRoot: () => { getDefaultGeometry: () => unknown };
};

type AutodeskGuiViewer = {
  start: () => number;
  finish: () => void;
  loadDocumentNode: (doc: AutodeskDocument, geometry: unknown) => Promise<unknown>;
  setTheme: (theme: string) => void;
};

let assetsPromise: Promise<void> | null = null;

function loadViewerAssets() {
  if (typeof window !== "undefined" && window.Autodesk) {
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

export function AutodeskShareViewer({
  part,
  className,
  chrome = "gui",
}: {
  part: string;
  className?: string;
  chrome?: "gui" | "bare";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState("Loading Autodesk viewer…");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;
    let viewer: AutodeskGuiViewer | null = null;

    async function start() {
      setStatus("Loading Autodesk viewer…");
      const response = await fetch(
        `/api/autodesk-share?part=${encodeURIComponent(part)}`,
      );
      const session = (await response.json()) as ShareSession & { error?: string };
      if (!response.ok || !session.urn || !session.accessToken) {
        throw new Error(session.error ?? "Could not open the Autodesk share.");
      }

      await loadViewerAssets();
      if (cancelled || !hostRef.current) return;

      const Autodesk = window.Autodesk;
      if (!Autodesk) throw new Error("Autodesk viewer failed to load.");

      const tokenForViewer = { current: session };
      Autodesk.Viewing.Initializer(
        {
          env: "AutodeskProduction",
          getAccessToken: (onTokenReady) => {
            void fetch(`/api/autodesk-share?part=${encodeURIComponent(part)}`)
              .then((res) => res.json() as Promise<ShareSession>)
              .then((fresh) => {
                if (fresh.accessToken && fresh.expiresIn) {
                  tokenForViewer.current = fresh;
                }
                onTokenReady(
                  tokenForViewer.current.accessToken,
                  tokenForViewer.current.expiresIn,
                );
              })
              .catch(() => {
                onTokenReady(
                  tokenForViewer.current.accessToken,
                  tokenForViewer.current.expiresIn,
                );
              });
          },
        },
        () => {
          if (cancelled || !hostRef.current) return;
          const Viewer =
            chrome === "bare"
              ? Autodesk.Viewing.Viewer3D
              : Autodesk.Viewing.GuiViewer3D;
          viewer = new Viewer(hostRef.current);
          const started = viewer.start();
          if (started < 0) {
            setStatus("WebGL is required to stream this model.");
            return;
          }
          viewer.setTheme("light-theme");
          Autodesk.Viewing.Document.load(
            `urn:${session.urn}`,
            (doc) => {
              if (cancelled || !viewer) return;
              const geometry = doc.getRoot().getDefaultGeometry();
              void viewer.loadDocumentNode(doc, geometry).then(() => {
                if (!cancelled) setStatus("");
              });
            },
            () => {
              if (!cancelled) setStatus("Could not load that Autodesk model.");
            },
          );
        },
      );
    }

    start().catch((cause) => {
      if (!cancelled) {
        setStatus(
          cause instanceof Error ? cause.message : "Could not open the Autodesk share.",
        );
      }
    });

    return () => {
      cancelled = true;
      viewer?.finish();
      host.replaceChildren();
    };
  }, [part, chrome]);

  return (
    <div
      className={cx(
        "relative w-full overflow-hidden bg-inset",
        className ?? "h-[min(70vh,36rem)] min-h-[22rem]",
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
