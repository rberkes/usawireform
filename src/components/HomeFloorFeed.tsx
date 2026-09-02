"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Kicker } from "@/components/ui";
import {
  floorMachineLabel,
  floorSentence,
  formatFloorUploadedAt,
  type SourceFloorCell,
} from "@/lib/source-floor-feed";

const POLL_MS = 60_000;

export function HomeFloorFeed({ initial }: { initial: SourceFloorCell[] }) {
  const [cells, setCells] = useState(initial);

  useEffect(() => {
    setCells(initial);
  }, [initial]);

  useEffect(() => {
    let cancelled = false;

    async function refresh() {
      try {
        const res = await fetch("/api/source/recent-cells", {
          cache: "no-store",
        });
        if (!res.ok) return;
        const data = (await res.json()) as { cells?: SourceFloorCell[] };
        if (!cancelled && Array.isArray(data.cells) && data.cells.length > 0) {
          setCells(data.cells);
        }
      } catch {
        /* keep the last good set */
      }
    }

    const id = window.setInterval(refresh, POLL_MS);
    const onVisible = () => {
      if (document.visibilityState === "visible") void refresh();
    };
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="mt-0">
      <Kicker>Recent equipment added</Kicker>
      <h2 className="mt-3 text-2xl tracking-tight">Newest Machine Lines</h2>
      <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">
        Live from shops around the USA.{" "}
        <Link href="/source/equipment" className="text-copper hover:underline">
          List a cell free
        </Link>
        .
      </p>
      <ul className="mt-8 grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        {cells.map((cell) => (
          <li key={cell.id} className="bg-background">
            <Link
              href="/source"
              className="block h-full px-5 py-5 transition-colors hover:bg-inset"
            >
              <p className="font-mono text-[11px] tracking-[0.22em] text-copper uppercase">
                {cell.sample ? "Example" : cell.kind || "Cell"}
              </p>
              <p className="mt-3 text-lg font-medium tracking-tight">
                {floorMachineLabel(cell)}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">
                {floorSentence(cell)}
              </p>
              <p className="mt-3 font-mono text-[11px] tracking-widest text-muted uppercase">
                {[cell.sample ? null : cell.kind, formatFloorUploadedAt(cell.uploadedAt)]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
