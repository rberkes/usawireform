import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { SourceInviteForm } from "@/components/SourceInviteForm";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { Page, PageHero } from "@/components/ui";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { listSourceFilings, listSourceInvites } from "@/lib/source";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Source invites",
  robots: { index: false, follow: false },
};

export default async function AdminSourcePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return <AdminLogin next="/admin/source" error={error} title="Source" />;
  }

  const [invites, filings, quoteCount, directoryCount] = await Promise.all([
    listSourceInvites(),
    listSourceFilings(),
    countQuoteSubmissions(),
    countDirectoryLeads(),
  ]);

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Source"
        lede="Send an invite. The shop gets a link to register and upload equipment. You get a LEAD copy."
      />
      <AdminInboxNav
        current="source"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={filings.length}
      />
      <div className="mt-10">
        <SourceInviteForm />
      </div>
      <section className="mt-12">
        <h2 className="text-lg font-medium">Invites sent</h2>
        {invites.length === 0 ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            No invites yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {invites.map((row) => (
              <li key={row.id} className="px-4 py-4 text-sm">
                <p className="font-medium">
                  {row.company || row.to}
                  <span className="ml-2 font-normal text-muted">{row.to}</span>
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {new Date(row.sentAt).toLocaleString("en-US", {
                    timeZone: "America/New_York",
                  })}
                </p>
                {row.note ? (
                  <p className="mt-1 text-muted">{row.note}</p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
      <section className="mt-12">
        <h2 className="text-lg font-medium">Equipment lists</h2>
        {filings.length === 0 ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            Nobody has filed a list yet.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {filings.map((row) => (
              <li key={row.pathname} className="px-4 py-4 text-sm">
                <p className="font-medium">
                  {row.company || "Shop"}
                  {row.email ? (
                    <span className="ml-2 font-normal text-muted">
                      {row.email}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-muted">
                  {row.machines.length === 1
                    ? "1 cell"
                    : `${row.machines.length} cells`}
                  {row.city ? ` · ${row.city}` : ""}
                </p>
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
      </section>
    </Page>
  );
}
