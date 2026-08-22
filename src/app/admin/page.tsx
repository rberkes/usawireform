import Link from "next/link";
import { isAdmin } from "./actions";
import { AdminLogin } from "./login-form";
import { listQuoteSubmissions } from "@/lib/quotes";
import { countDirectoryLeads } from "@/lib/leads";
import { countSourceFilings } from "@/lib/source";
import { AdminStepPreview } from "@/components/UploadedDrawingPreview";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { Page, PageHero } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Quote files",
  robots: { index: false, follow: false },
};

function kindLabel(kind: string) {
  if (kind === "contact") return "Contact quote";
  if (kind === "quick") return "Page drawing";
  if (kind === "instant") return "Instant estimate";
  return "File only";
}

function line(parts: Array<string | undefined>) {
  return parts.filter(Boolean).join(" · ");
}

export default async function AdminQuotesPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return <AdminLogin next="/admin" error={error} title="Quote files" />;
  }

  const [rows, directoryCount, sourceCount] = await Promise.all([
    listQuoteSubmissions(),
    countDirectoryLeads(),
    countSourceFilings(),
  ]);

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Quote files"
        lede="RFQs with a STEP. Contact and product-page drawings. This is the shop copy for a part to run."
      />
      <AdminInboxNav
        current="quotes"
        quoteCount={rows.length}
        directoryCount={directoryCount}
        sourceCount={sourceCount}
      />
      {rows.length === 0 ? (
        <p className="mt-8 max-w-xl text-sm leading-6 text-muted">
          No quote drawings yet. Contact and product-page STEP uploads land
          here.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border border-line">
          {rows.map((row) => (
            <li key={row.id} className="px-4 py-4 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-foreground">
                  {row.email ?? "No email"}
                  {row.company ? (
                    <span className="ml-2 font-normal text-muted">
                      {row.company}
                    </span>
                  ) : null}
                </p>
                <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                  {kindLabel(row.kind)}
                </p>
              </div>
              <p className="mt-1 text-muted">
                {line([row.name, row.phone, row.linkedin])}
              </p>
              <p className="mt-1 text-muted">
                {line([
                  row.fileName,
                  row.material,
                  row.diameter,
                  row.targetPrice ? `${row.targetPrice} / pc` : undefined,
                  row.timeline,
                  row.quality,
                  row.source,
                ]) || "No filename"}
              </p>
              {row.notes ? (
                <p className="mt-2 max-w-2xl text-foreground/90">{row.notes}</p>
              ) : null}
              <p className="mt-1 font-mono text-[11px] text-muted">
                {row.timestamp
                  ? new Date(row.timestamp).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })
                  : "—"}
              </p>
              {row.drawingUrl ? (
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <Link
                    href={row.drawingUrl}
                    className="text-copper hover:underline"
                  >
                    Download STEP
                  </Link>
                  <AdminStepPreview src={row.drawingUrl} name={row.fileName} />
                </div>
              ) : row.kind === "instant" ? (
                <p className="mt-2 text-muted">
                  Numbers only — no STEP on this estimate.
                </p>
              ) : (
                <p className="mt-2 text-muted">No file URL on this record.</p>
              )}
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
