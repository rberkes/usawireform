import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SiteArchitectureTree } from "@/components/SiteArchitectureTree";
import { Page, PageHero, StatRow, TextLink } from "@/components/ui";
import {
  ARCHITECTURE_PATH,
  architectureStats,
  siteArchitectureTree,
} from "@/lib/site-architecture";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Site Architecture",
  description:
    "One-page directory of USA Wire Form: this floor, products, factories, Source, states, and the desk. Repeat templates show as [slug] × N.",
  path: ARCHITECTURE_PATH,
  keywords: ["USA Wire Form site architecture", "wire forming sitemap tree"],
});

export default function ArchitecturePage() {
  const stats = architectureStats();
  const tree = siteArchitectureTree();

  return (
    <Page>
      <BreadcrumbJsonLd
        items={[{ name: "Site architecture", url: ARCHITECTURE_PATH }]}
      />
      <Breadcrumbs items={[{ label: "Site architecture" }]} />

      <PageHero
        kicker="Map"
        title="Site architecture"
        lede="The whole public tree on one page. Folders are branches. [slug] is a repeating template — we do not list every factory here. The desk is signed-in and API. Counts are live."
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
        Machine search:{" "}
        <TextLink href="/find-factories-by-machine">
          find factories by machine
        </TextLink>
        .
      </p>
    </Page>
  );
}
