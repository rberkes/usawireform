import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { Page, PageHero } from "@/components/ui";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { countSourceFilings, countSourceProfiles } from "@/lib/source";
import { countBuyerAccounts } from "@/lib/source-buyer";
import { countSourceSubscribers } from "@/lib/source-leads";
import {
  listRecentVisits,
  networkLabel,
  placeLabel,
} from "@/lib/visitor-log";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Visitors",
  robots: { index: false, follow: false },
};

function hostOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url.slice(0, 60);
  }
}

export default async function AdminVisitorsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return <AdminLogin next="/admin/visitors" error={error} title="Visitors" />;
  }

  const [hits, quoteCount, directoryCount, sourceCount, subscriberCount, accountCount] =
    await Promise.all([
      listRecentVisits(150),
      countQuoteSubmissions(),
      countDirectoryLeads(),
      countSourceFilings(),
      countSourceSubscribers(),
      Promise.all([countSourceProfiles(), countBuyerAccounts()]).then(
        ([a, b]) => a + b,
      ),
    ]);

  return (
    <Page>
      <PageHero
        kicker="Admin"
        title="Visitors"
        lede="IP, city, referrer, and what they clicked. Reverse DNS marks a likely company network vs home ISP. Google does not send the search words they typed. Use this list if you later want to block an IP."
      />
      <AdminInboxNav
        current="visitors"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={sourceCount}
        subscriberCount={subscriberCount}
        accountCount={accountCount}
        visitorCount={hits.length}
      />
      {hits.length === 0 ? (
        <p className="mt-8 max-w-xl text-sm leading-6 text-muted">
          No hits stored yet. After deploy, page loads and link clicks land
          here. Localhost has no Vercel city headers.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border border-line">
          {hits.map((hit) => (
            <li key={hit.pathname} className="px-4 py-4 text-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-medium text-foreground">
                  {hit.ip || "No IP"}
                  {hit.bot ? (
                    <span className="ml-2 font-normal text-muted">Bot</span>
                  ) : null}
                </p>
                <p className="font-mono text-[11px] tracking-widest text-muted uppercase">
                  {hit.kind === "click" ? "Click" : "Page"}
                </p>
              </div>
              <p className="mt-1 text-muted">{placeLabel(hit)}</p>
              <p className="mt-1 text-muted">{networkLabel(hit)}</p>
              <p className="mt-1 text-muted">
                {hit.kind === "click"
                  ? `${hit.path} → ${hit.label || hit.href || "link"}`
                  : hit.path}
              </p>
              {hit.referrer ? (
                <p className="mt-1 text-muted">From {hostOf(hit.referrer)}</p>
              ) : (
                <p className="mt-1 text-muted">No referrer</p>
              )}
              <p className="mt-1 font-mono text-[11px] text-muted">
                {hit.at
                  ? new Date(hit.at).toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })
                  : "—"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
