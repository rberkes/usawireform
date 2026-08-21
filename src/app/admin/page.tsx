import Link from "next/link";
import { isAdmin } from "./actions";
import { AdminLogin } from "./login-form";
import { listQuoteSubmissions } from "@/lib/quotes";
import { Page, PageHero, TextLink } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Quote files",
  robots: { index: false, follow: false },
};

function kindLabel(kind: string) {
  if (kind === "contact") return "Contact quote";
  if (kind === "quick") return "Page drawing";
  return "File only";
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

  const rows = await listQuoteSubmissions();

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Quote files"
        lede="STEP uploads land in Vercel Blob. This list is the shop copy — email is still the notify."
      />
      <p className="mt-6 text-sm text-muted">
        <TextLink href="/admin/leads">Directory leads</TextLink>
      </p>
      {rows.length === 0 ? (
        <p className="mt-8 max-w-xl text-sm leading-6 text-muted">
          No stored drawings yet. Send a STEP on a product page or Contact —
          it writes here after this deploy.
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
                {row.fileName ?? "No filename"}
                {row.source ? ` · ${row.source}` : ""}
                {row.targetPrice ? ` · ${row.targetPrice}` : ""}
                {row.timeline ? ` · ${row.timeline}` : ""}
              </p>
              <p className="mt-1 font-mono text-[11px] text-muted">
                {row.timestamp
                  ? new Date(row.timestamp).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })
                  : "—"}
              </p>
              {row.drawingUrl ? (
                <p className="mt-2">
                  <Link
                    href={row.drawingUrl}
                    className="text-copper hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download STEP
                  </Link>
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
