import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import {
  Page,
  PageHero,
  Section,
  SpecList,
  TextLink,
} from "@/components/ui";
import {
  STOCK,
  catalog,
  getCatalogItem,
} from "@/lib/catalog";
import { pageMeta } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) return {};
  return pageMeta({
    title: item.title,
    description: `${item.title} in ${STOCK} wire. ${item.summary}`,
    path: `/products/${slug}`,
    keywords: [item.title, item.group, "custom wire form", STOCK],
  });
}

export default async function CatalogProductPage({ params }: Props) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();

  const related = item.related
    .map((relatedSlug) => getCatalogItem(relatedSlug))
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry));

  const breadcrumbItems = [
    { label: "Products", href: "/products" },
    { label: item.group, href: "/products" },
    { label: item.title },
  ];

  return (
    <Page>
      <ProductJsonLd
        name={item.title}
        description={`${item.title} in ${STOCK} wire. ${item.summary}`}
        url={`/products/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "/products" },
          { name: item.title, url: `/products/${slug}` },
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />
      <PageHero kicker={`${STOCK} · ${item.group}`} title={item.title} lede={item.lede} />
      <SpecList
        rows={[
          { label: "Stock coil", value: STOCK },
          { label: "Family", value: item.group },
        ]}
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        {item.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        <p>
          Process:{" "}
          <TextLink href={item.processHref}>how we run it</TextLink>. Coil
          grades on{" "}
          <TextLink href="/materials">materials</TextLink>. Diameters on{" "}
          <TextLink href="/sizes">3/8, 7/16, and 1/2 in</TextLink>.
        </p>
      </div>
      <Section title="Typical jobs">
        <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
          {item.jobs.map((job) => (
            <li key={job}>{job}</li>
          ))}
        </ul>
      </Section>
      {related.length > 0 ? (
        <Section title="Related">
          <ul className="mt-6 max-w-2xl list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
            {related.map((entry) => (
              <li key={entry.slug}>
                <TextLink href={`/products/${entry.slug}`}>{entry.title}</TextLink>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}
      <StepQuoteBlock className="mt-16" title={item.quote} />
    </Page>
  );
}
