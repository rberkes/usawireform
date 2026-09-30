import Link from "next/link";
import { SOURCE_JOB_HREF } from "@/components/client/ClientQuoteCtas";
import { config } from "@/lib/config";

const ACCEPT = config.upload.acceptedExtensions
  .map((ext) => `.${ext}`)
  .join(", ");

export function BuyerUploadCard() {
  return (
    <div className="rounded-sm border border-white/15 bg-white p-5 text-[#111] sm:p-6">
      <p className="font-mono text-[11px] tracking-[0.22em] text-[#0b1f33]/55 uppercase">
        Start a quote
      </p>
      <h2 className="mt-2 text-xl font-medium tracking-tight">
        Upload a CAD file
      </h2>
      <p className="mt-2 text-sm leading-6 text-[#111]/70">
        STEP, SolidWorks, DXF, DWG, IGES, or a PDF 3-view. 50 MB max.
      </p>
      <Link
        href={SOURCE_JOB_HREF}
        className="mt-5 flex min-h-36 flex-col items-center justify-center rounded-sm border border-dashed border-[#0b6bcb]/40 bg-[#f3f5f8] px-4 text-center transition-colors hover:border-[#0b6bcb] hover:bg-white"
      >
        <span className="text-sm font-medium text-[#0b6bcb]">
          Drop a file or browse
        </span>
        <span className="mt-1 font-mono text-[11px] text-[#111]/50">
          {ACCEPT}
        </span>
      </Link>
      <p className="mt-4 text-sm leading-6 text-[#111]/70">
        No file handy?{" "}
        <Link href="/instant-quote" className="text-[#0b6bcb] hover:underline">
          Instant estimate
        </Link>
        {" · "}
        <Link href="/products" className="text-[#0b6bcb] hover:underline">
          Start from a catalog part
        </Link>
        .
      </p>
    </div>
  );
}
