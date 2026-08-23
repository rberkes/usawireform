import { notFound } from "next/navigation";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { StepQuoteBlock } from "@/components/StepUpload";
import { ProductForm } from "@/components/ProductForm";
import { CatalogModelPreview } from "@/components/CatalogModelPreview";
import { SHookDiameters } from "@/components/SHookDiameters";
import { WIRE } from "@/lib/range";
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
import { usaMadeForSlug } from "@/lib/usa-made";
import { autodeskShareForProduct } from "@/lib/autodesk-share";
import { showcaseForProduct } from "@/lib/models";
import { ProductAutodeskViewer } from "@/components/ProductAutodeskViewer";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return catalog.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) return {};
  const made = usaMadeForSlug(slug);
  return pageMeta({
    title: made?.phrases[0] ?? item.title,
    description: made
      ? `${made.phrases[0]} in ${STOCK} wire. ${item.summary}`
      : `${item.title} in ${STOCK} wire. ${item.summary}`,
    path: `/products/${slug}`,
    keywords: [
      ...(made?.phrases ?? []),
      item.title,
      item.group,
      "custom wire form",
      STOCK,
      ...(slug === "powder-coating-hooks"
        ? [
            "powder coating hooks",
            "V-hooks",
            "C-hooks",
            "CV-hooks",
            "S-hooks",
            "90 degree hooks",
          ]
        : []),
      ...(slug === "s-hooks" ? ["S-hooks", "powder coating S-hooks"] : []),
    ],
  });
}

export default async function CatalogProductPage({ params }: Props) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();
  const made = usaMadeForSlug(slug);
  const showcase = showcaseForProduct(slug);
  const autodeskShare = autodeskShareForProduct(slug);

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
        name={made?.phrases[0] ?? item.title}
        description={`${made?.phrases[0] ?? item.title} in ${STOCK} wire. ${item.summary}`}
        url={`/products/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Products", url: "/products" },
          { name: item.title, url: `/products/${slug}` },
        ]}
      />
      <Breadcrumbs items={breadcrumbItems} />
      {slug === "s-hooks" ? (
        <>
          <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <PageHero
              kicker={`${STOCK} · ${item.group}`}
              title={made?.phrases[0] ?? item.title}
              lede={item.lede}
            />
            {showcase ? <CatalogModelPreview partId={showcase.id} /> : null}
          </div>
          <SHookDiameters className="mt-10" />
        </>
      ) : (
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <PageHero
            kicker={`${STOCK} · ${item.group}`}
            title={made?.phrases[0] ?? item.title}
            lede={item.lede}
          />
          {showcase ? (
            <CatalogModelPreview partId={showcase.id} />
          ) : autodeskShare ? (
            <ProductAutodeskViewer
              part={autodeskShare.id}
              permalink={autodeskShare.permalink}
            />
          ) : (
            <div className="bg-inset">
              <ProductForm slug={item.slug} className="h-auto w-full p-8 sm:p-12" />
              <p className="border-t border-line px-5 py-3 font-mono text-[11px] tracking-widest text-muted uppercase">
                Formed from coil · {STOCK}
              </p>
            </div>
          )}
        </div>
      )}
      <SpecList
        rows={[
          ...(made
            ? [{ label: "Origin", value: `${made.phrases[0]} · Northeast Ohio` }]
            : []),
          { label: "Stock coil", value: STOCK },
          ...(slug === "s-hooks"
            ? [{ label: "Forming band", value: WIRE.label }]
            : []),
          { label: "Family", value: item.group },
        ]}
      />
      <div className="mt-10 max-w-2xl space-y-5 text-base leading-7 text-muted">
        {slug === "s-hooks" ? (
          <p>
            The three drawings are the shop S: same centerline, stroke is
            the wire. 4 mm is the floor of the band; 9 mm sits next to{" "}
            <TextLink href="/sizes">3/8 in stock</TextLink> (9.53 mm); 14 mm
            is the ceiling. Production quotes still land on 3/8, 7/16, and
            1/2 in unless the print names another size in {WIRE.short}.
          </p>
        ) : null}
        {made && made.phrases.length > 1 ? (
          <p>
            Also searched as{" "}
            {made.phrases.slice(1).map((phrase, index) => (
              <span key={phrase}>
                {index > 0 ? ", " : ""}
                {phrase}
              </span>
            ))}
            .
          </p>
        ) : null}
        {slug === "powder-coating-hooks" ? (
          <p>
            Styles:{" "}
            <TextLink href="/powder-coating-hooks/v-hooks">V-hooks</TextLink>,{" "}
            <TextLink href="/powder-coating-hooks/c-hooks">C-hooks</TextLink>,{" "}
            <TextLink href="/powder-coating-hooks/cv-hooks">CV-hooks</TextLink>,{" "}
            <TextLink href="/powder-coating-hooks/s-hooks">S-hooks</TextLink>,{" "}
            <TextLink href="/powder-coating-hooks/90-degree-hooks">90° hooks</TextLink>. Hub:{" "}
            <TextLink href="/powder-coating-hooks">
              powder coating hooks
            </TextLink>
            .
          </p>
        ) : null}
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
            {related.map((entry) => {
              const relatedMade = usaMadeForSlug(entry.slug);
              return (
              <li key={entry.slug}>
                <TextLink href={`/products/${entry.slug}`}>
                  {relatedMade?.phrases[0] ?? entry.title}
                </TextLink>
              </li>
              );
            })}
          </ul>
        </Section>
      ) : null}
      <StepQuoteBlock className="mt-16" title={item.quote} />
    </Page>
  );
}
