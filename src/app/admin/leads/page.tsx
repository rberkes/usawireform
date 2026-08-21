import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { listDirectoryLeadRows } from "@/lib/leads";
import { Page, PageHero, TextLink } from "@/components/ui";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Directory leads",
  robots: { index: false, follow: false },
};

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return (
      <AdminLogin next="/admin/leads" error={error} title="Directory leads" />
    );
  }

  const rows = await listDirectoryLeadRows();

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Directory leads"
        lede={`${rows.length} stored files under leads/directory/.`}
      />
      <p className="mt-6 text-sm text-muted">
        <TextLink href="/admin">Quote files</TextLink>
      </p>
      {rows.length === 0 ? (
        <p className="mt-8 text-sm text-muted">
          No directory leads yet. The directory form writes here after this
          deploy. Quote STEP files are on Quote files.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border border-line">
          {rows.map((row) => (
            <li key={row.pathname} className="px-4 py-4 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-foreground">
                  {row.name || "No name"}
                  {row.email ? (
                    <span className="ml-2 font-normal text-muted">
                      {row.email}
                    </span>
                  ) : null}
                </p>
                <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                  {row.referredCompany || "Directory"}
                </p>
              </div>
              <p className="mt-1 text-muted">
                {[row.company, row.phone, row.title].filter(Boolean).join(" · ") ||
                  row.pathname}
              </p>
              {row.message ? (
                <p className="mt-1 text-muted">{row.message}</p>
              ) : null}
              <p className="mt-1 font-mono text-[11px] text-muted">
                {row.timestamp
                  ? new Date(row.timestamp).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })
                  : "—"}
              </p>
              <p className="mt-2">
                <a href={row.href} className="text-copper hover:underline">
                  Download JSON
                </a>
              </p>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
