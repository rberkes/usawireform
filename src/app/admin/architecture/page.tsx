import { isAdmin } from "../actions";
import { AdminLogin } from "../login-form";
import { AdminInboxNav } from "@/components/AdminInboxNav";
import { SiteArchitectureTree } from "@/components/SiteArchitectureTree";
import { Page, PageHero, StatRow, TextLink } from "@/components/ui";
import {
  ARCHITECTURE_PATH,
  architectureStats,
  siteArchitectureTree,
} from "@/lib/site-architecture";
import { countDirectoryLeads } from "@/lib/leads";
import { countQuoteSubmissions } from "@/lib/quotes";
import { countSourceFilings, countSourceProfiles } from "@/lib/source";
import { countBuyerAccounts } from "@/lib/source-buyer";
import { countSourceSubscribers } from "@/lib/source-leads";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Site architecture",
  robots: { index: false, follow: false },
};

export default async function AdminArchitecturePage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const ok = await isAdmin();

  if (!ok) {
    return (
      <AdminLogin
        next={ARCHITECTURE_PATH}
        error={error}
        title="Site architecture"
      />
    );
  }

  const stats = architectureStats();
  const tree = siteArchitectureTree();
  const [quoteCount, directoryCount, sourceCount, subscriberCount, accountCount] =
    await Promise.all([
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
        title="Site architecture"
        lede="The whole public tree on one page. Folders are branches. [slug] is a repeating template — we do not list every factory here. The desk is signed-in and API. Counts are live."
      />
      <AdminInboxNav
        current="architecture"
        quoteCount={quoteCount}
        directoryCount={directoryCount}
        sourceCount={sourceCount}
        subscriberCount={subscriberCount}
        accountCount={accountCount}
      />

      <StatRow
        className="mt-10"
        items={[
          { value: String(stats.publicUrls), label: "Public URLs" },
          { value: String(stats.shops), label: "Directory shops" },
          { value: String(stats.products), label: "Catalog products" },
          { value: String(stats.cncModels), label: "CNC models" },
        ]}
      />

      <div className="mt-12">
        <SiteArchitectureTree tree={tree} />
      </div>

      <p className="mt-8 max-w-2xl text-sm leading-7 text-muted">
        Flat list of every public URL:{" "}
        <TextLink href="/site-map">sitemap</TextLink>
        . Factories:{" "}
        <TextLink href="/directory">directory</TextLink>
        {` (${stats.usa} USA, ${stats.canada} Canada). `}
        Machine or secondary search:{" "}
        <TextLink href="/find-factories-by-machine">
          find factories by machine
        </TextLink>
        .
      </p>
    </Page>
  );
}
