import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { AdminLeadsToggle } from "@/components/AdminLeadsToggle";
import { Page, PageHero } from "@/components/ui";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { countSourceFilings } from "@/lib/source";
import {
  leadsStatusLabel,
  listSourceSubscribers,
  shopGetsLeads,
} from "@/lib/source-leads";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Source subscribers",
  robots: { index: false, follow: false },
};

export default async function AdminSubscribersPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return (
      <AdminLogin
        next="/admin/subscribers"
        error={error}
        title="Subscribers"
      />
    );
  }

  const [rows, quoteCount, directoryCount, sourceCount] = await Promise.all([
    listSourceSubscribers(),
    countQuoteSubmissions(),
    countDirectoryLeads(),
    countSourceFilings(),
  ]);
  const paid = rows.filter((row) => shopGetsLeads(row.leads)).length;

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Subscribers"
        lede="Listing a cell is free. Buyer leads go only to paid plans or a comp grant from this page."
      />
      <AdminInboxNav
        current="subscribers"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={sourceCount}
        subscriberCount={rows.length}
      />
      <p className="mt-8 max-w-2xl text-sm leading-6 text-muted">
        {rows.length === 0
          ? "No shops have filed equipment yet."
          : `${paid} of ${rows.length} ${rows.length === 1 ? "shop receives" : "shops receive"} leads. The rest are listed only.`}
      </p>
      {rows.length > 0 ? (
        <ul className="mt-6 divide-y divide-line border border-line">
          {rows.map((row) => (
            <li key={row.key} className="px-4 py-4 text-sm">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-medium">
                    {row.company}
                    {row.email ? (
                      <span className="ml-2 font-normal text-muted">
                        {row.email}
                      </span>
                    ) : null}
                  </p>
                  <p className="mt-1 text-muted">
                    {[
                      row.name,
                      row.phone,
                      row.planName,
                      row.cells === 1 ? "1 cell" : `${row.cells} cells`,
                      [row.city, row.state].filter(Boolean).join(", "),
                    ]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                  <p className="mt-1 font-mono text-[11px] tracking-widest text-muted uppercase">
                    {leadsStatusLabel(row.leads)}
                  </p>
                </div>
                {row.userId && row.leads !== "stripe" ? (
                  <AdminLeadsToggle
                    userId={row.userId}
                    on={row.leads === "comp"}
                  />
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </Page>
  );
}
