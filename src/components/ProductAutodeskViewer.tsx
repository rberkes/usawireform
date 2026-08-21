"use client";

import { AutodeskShareViewer } from "./AutodeskShareViewer";

export function ProductAutodeskViewer({
  part,
  permalink,
}: {
  part: string;
  permalink: string;
}) {
  return (
    <div className="border border-line bg-background">
      <AutodeskShareViewer part={part} />
      <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
        Shop file · Autodesk ·{" "}
        <a
          href={permalink}
          className="font-sans text-[11px] tracking-widest text-copper normal-case hover:underline"
          rel="noreferrer"
          target="_blank"
        >
          Open in Autodesk
        </a>
      </p>
    </div>
  );
}
