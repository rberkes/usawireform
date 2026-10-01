import Link from "next/link";
import { btn } from "@/components/ui";
import { QUOTE_PATH } from "@/lib/taxonomy";

export function QuotePath({
  title = "Have a print?",
  context,
}: {
  title?: string;
  context?: string;
}) {
  return (
    <aside className="mt-16 border border-line bg-inset/40 p-6 sm:p-8">
      <p className="font-mono text-[11px] tracking-[0.22em] text-copper uppercase">
        RFQ
      </p>
      <h2 className="mt-3 text-2xl font-medium tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">
        {context ??
          "Upload a CAD or print. We read manufacturability against real cells — diameter, 2D vs 3D, material — then match shops that can run it."}
      </p>
      <ol className="mt-6 grid gap-3 text-sm sm:grid-cols-4">
        <li className="border border-line bg-background p-3">
          <span className="font-mono text-[11px] text-muted">01</span>
          <p className="mt-1 font-medium">Upload CAD</p>
        </li>
        <li className="border border-line bg-background p-3">
          <span className="font-mono text-[11px] text-muted">02</span>
          <p className="mt-1 font-medium">Check the cell</p>
        </li>
        <li className="border border-line bg-background p-3">
          <span className="font-mono text-[11px] text-muted">03</span>
          <p className="mt-1 font-medium">Match shops</p>
        </li>
        <li className="border border-line bg-background p-3">
          <span className="font-mono text-[11px] text-muted">04</span>
          <p className="mt-1 font-medium">Quote</p>
        </li>
      </ol>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={QUOTE_PATH} className={btn.primary}>
          Start an RFQ
        </Link>
        <Link href="/source" className={btn.ghost}>
          Match a print
        </Link>
        <Link href="/instant-quote" className={btn.ghost}>
          This-floor estimate
        </Link>
      </div>
    </aside>
  );
}
