import { notFound } from "next/navigation";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ArticleSchema } from "@/components/SeoSchemas";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero, SpecList, Section, TextLink } from "@/components/ui";
import { StepQuoteBlock } from "@/components/StepUpload";
import { publishedCaseStudies, getCaseStudy } from "@/lib/case-studies";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return publishedCaseStudies().map((study) => ({ slug: study.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMeta({
    title: `${study.title} | Case Study`,
    description: study.summary,
    path: `/case-studies/${slug}`,
    keywords: [study.industry, "wire forming case study", "custom wire forms"],
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study || !study.published) notFound();

  const otherStudies = publishedCaseStudies().filter((s) => s.slug !== slug);

  return (
    <Page>
      <ArticleSchema
        headline={study.title}
        description={study.summary}
        url={`/case-studies/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Case Studies", url: "/case-studies" },
          { name: study.title, url: `/case-studies/${slug}` },
        ]}
      />
      <Breadcrumbs
        items={[
          { label: "Case Studies", href: "/case-studies" },
          { label: study.title },
        ]}
      />

      <PageHero
        kicker={study.industry}
        title={study.title}
        lede={study.summary}
      />

      {/* Specifications */}
      <SpecList
        rows={study.specifications.map((spec) => ({
          label: spec.label,
          value: spec.value,
        }))}
      />

      {/* Challenge */}
      <Section title="The challenge">
        <p className="mt-4 max-w-2xl text-muted">{study.challenge}</p>
      </Section>

      {/* Solution */}
      <Section title="Our solution">
        <p className="mt-4 max-w-2xl text-muted">{study.solution}</p>
        <div className="mt-6">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Processes used
          </h4>
          <div className="mt-2 flex flex-wrap gap-2">
            {study.processes.map((process) => (
              <span
                key={process}
                className="rounded bg-muted/50 px-3 py-1 text-sm"
              >
                {process}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* Results */}
      <Section title="Results">
        <ul className="mt-4 max-w-2xl space-y-2">
          {study.results.map((result) => (
            <li
              key={result}
              className="flex items-start gap-3 text-muted"
            >
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-green-500" />
              {result}
            </li>
          ))}
        </ul>
      </Section>

      {/* Related case studies */}
      {otherStudies.length > 0 && (
        <Section title="More case studies">
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {otherStudies.slice(0, 2).map((other) => (
              <Link
                key={other.slug}
                href={`/case-studies/${other.slug}`}
                className="rounded-lg border p-4 hover:border-foreground/20"
              >
                <span className="text-xs text-muted">{other.industry}</span>
                <h4 className="mt-1 font-medium">{other.title}</h4>
              </Link>
            ))}
          </div>
          <p className="mt-4">
            <TextLink href="/case-studies">View all case studies →</TextLink>
          </p>
        </Section>
      )}

      <StepQuoteBlock
        className="mt-16"
        title="Have a similar project?"
      />
    </Page>
  );
}
