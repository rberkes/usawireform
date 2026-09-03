import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { SourceInviteForm } from "@/components/SourceInviteForm";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { Page, PageHero } from "@/components/ui";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { listSourceFilings, listSourceInvites, listSourceJobs, countSourceProfiles } from "@/lib/source";
import { countBuyerAccounts } from "@/lib/source-buyer";
import { listSourceSubscribers } from "@/lib/source-leads";
import { adminFileHref } from "@/lib/blob";
import { drawingPrivacyLabel, parseDrawingPrivacy } from "@/lib/source-types";

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

  const [invites, filings, jobs, quoteCount, directoryCount, subscribers, accountCount] =
    await Promise.all([
      listSourceInvites(),
      listSourceFilings(),
      listSourceJobs(),
      countQuoteSubmissions(),
      countDirectoryLeads(),
      listSourceSubscribers(),
      Promise.all([countSourceProfiles(), countBuyerAccounts()]).then(
        ([a, b]) => a + b,
      ),
    ]);

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Source"
        lede="Send an invite. Equipment JSON lives here. Shops, buyers, and STEP files are under Accounts."
      />
      <AdminInboxNav
        current="source"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={filings.length}
        subscriberCount={subscribers.length}
        accountCount={accountCount}
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
      <section className="mt-12">
        <h2 className="text-lg font-medium">Jobs</h2>
        {jobs.length === 0 ? (
          <p className="mt-3 max-w-xl text-sm leading-6 text-muted">
            No buyer jobs yet. When a buyer submits on /source, name, email,
            phone, city, wire, notes, and the STEP land here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-line border border-line">
            {jobs.map((row) => (
              <li
                key={`${row.timestamp}-${row.email}-${row.fileName ?? ""}`}
                className="px-4 py-4 text-sm"
              >
                <p className="font-medium">
                  {row.company || row.email}
                  <span className="ml-2 font-normal text-muted">{row.email}</span>
                </p>
                <p className="mt-1 text-muted">
                  {[row.name, row.phone, [row.city, row.state, row.zip].filter(Boolean).join(", ")]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
                <p className="mt-1 text-muted">
                  {row.diameterMm != null ? `${row.diameterMm} mm` : row.diameterRaw}
                  {row.kind ? ` · ${row.kind}` : ""}
                  {row.oem ? ` · ${row.oem}` : ""}
                  {row.qty ? ` · qty ${row.qty}` : ""}
                </p>
                {row.notes ? (
                  <p className="mt-1 max-w-2xl text-foreground/90">{row.notes}</p>
                ) : null}
                <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                  {drawingPrivacyLabel(parseDrawingPrivacy(row.drawingPrivacy))}
                  {row.mailedTo && row.mailedTo.length > 0
                    ? ` · ${row.mailedTo.length === 1 ? "1 shop mailed" : `${row.mailedTo.length} shops mailed`}`
                    : ""}
                </p>
                <p className="mt-1 font-mono text-[11px] text-muted">
                  {row.timestamp
                    ? new Date(row.timestamp).toLocaleString("en-US", {
                        timeZone: "America/New_York",
                      })
                    : "—"}
                </p>
                {row.drawingPath ? (
                  <p className="mt-2">
                    <a
                      href={adminFileHref(row.drawingPath, row.fileName)}
                      className="text-copper hover:underline"
                    >
                      Download {row.fileName || "drawing"}
                    </a>
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </Page>
  );
}
