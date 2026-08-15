import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero } from "@/components/ui";
import { StepQuoteBlock } from "@/components/StepUpload";
import { publishedCaseStudies } from "@/lib/case-studies";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Case Studies",
  description:
    "Real-world wire forming projects: cable trays for data centers, solar hangers, mining guards, and custom manufacturing solutions. See how we solve problems.",
  path: "/case-studies",
  keywords: [
    "wire forming case studies",
    "wire forming projects",
    "custom wire form examples",
    "CNC wire forming applications",
  ],
});

export default function CaseStudiesPage() {
  const studies = publishedCaseStudies();

  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Case Studies", url: "/case-studies" }]} />
      <Breadcrumbs items={[{ label: "Case Studies" }]} />
      <PageHero
        kicker="Projects"
        title="Case studies"
        lede="Real projects, real solutions. See how we've helped customers in data centers, solar, mining, and manufacturing solve wire forming challenges."
      />

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group flex flex-col rounded-lg border border-border bg-card p-6 transition-colors hover:border-foreground/20"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              {study.industry}
            </span>
            <h2 className="mt-2 text-lg font-semibold group-hover:text-blue-600">
              {study.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-muted">{study.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {study.processes.slice(0, 3).map((process) => (
                <span
                  key={process}
                  className="rounded bg-muted/50 px-2 py-0.5 text-xs text-muted"
                >
                  {process}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>

      {/* Industries we serve */}
      <section className="mt-16 border-t pt-8">
        <h2 className="text-xl font-semibold">Industries we serve</h2>
        <p className="mt-2 text-muted">
          Our case studies span multiple sectors. Explore more about how we
          serve each industry:
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/industries/data-centers"
            className="rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
          >
            AI &amp; Data Centers
          </Link>
          <Link
            href="/industries/solar"
            className="rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
          >
            Solar
          </Link>
          <Link
            href="/industries/mining"
            className="rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
          >
            Mining
          </Link>
          <Link
            href="/industries/automotive"
            className="rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
          >
            Automotive
          </Link>
          <Link
            href="/industries/construction"
            className="rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
          >
            Construction
          </Link>
          <Link
            href="/industries"
            className="rounded border px-3 py-1.5 text-sm hover:bg-muted/50"
          >
            All Industries →
          </Link>
        </div>
      </section>

      <StepQuoteBlock className="mt-16" title="Have a project to discuss?" />
    </Page>
  );
}
