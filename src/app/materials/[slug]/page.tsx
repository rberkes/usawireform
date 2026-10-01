import Link from "next/link";
import { notFound } from "next/navigation";
import { DocPage } from "@/components/DocPage";
import { BreadcrumbJsonLd, FAQJsonLd } from "@/components/JsonLd";
import { QuotePath } from "@/components/QuotePath";
import { ShopRoster } from "@/components/ShopRoster";
import { ServiceSchema } from "@/components/SeoSchemas";
import { TextLink } from "@/components/ui";
import { inventorySummary, shopsForMaterial } from "@/lib/graph";
import { pageMeta } from "@/lib/seo";
import { FORMING_MATERIALS, getMaterial } from "@/lib/taxonomy";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FORMING_MATERIALS.map((item) => ({ slug: item.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) return {};
  const shops = shopsForMaterial(material.slug);
  const roster =
    shops.length > 0
      ? shops
      : material.slug === "304-stainless"
        ? shopsForMaterial("stainless-steel")
        : shops;
  return pageMeta({
    title: material.title,
    description: `${roster.length} shops in the directory name this coil family. ${material.description}`,
    path: material.path,
    keywords: [material.title, ...material.grades, "wire forming materials"],
  });
}

export default async function MaterialTaxonomyPage({ params }: Props) {
  const { slug } = await params;
  const material = getMaterial(slug);
  if (!material) notFound();
  const named = shopsForMaterial(material.slug);
  const shops =
    named.length > 0
      ? named
      : material.slug === "304-stainless"
        ? shopsForMaterial("stainless-steel")
        : named;
  const inferred304 = material.slug === "304-stainless" && named.length === 0;
  const inventory = inventorySummary(shops);

  return (
    <>
      <ServiceSchema
        name={material.title}
        description={material.description}
        url={material.path}
        serviceType={material.title}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Materials", url: "/materials" },
          { name: material.title, url: material.path },
        ]}
      />
      {material.faqs ? <FAQJsonLd questions={material.faqs} /> : null}
      <DocPage
        kicker="Material"
        title={material.h1}
        lede={material.lede}
        toc={[
          { id: "grades", label: "Grades" },
          { id: "shops", label: "Shops" },
          { id: "process", label: "Process" },
          { id: "rfq", label: "RFQ" },
        ]}
        breadcrumbs={[
          { label: "Materials", href: "/materials" },
          { label: material.title.replace(/ Wire Forming$/, "") },
        ]}
      >
        <h2 id="grades">Grades that belong here</h2>
        <ul>
          {material.grades.map((grade) => (
            <li key={grade}>{grade}</li>
          ))}
        </ul>
        <p>
          Coil notes for the whole family:{" "}
          <TextLink href="/materials">materials hub</TextLink>
          {material.slug.startsWith("stainless") || material.slug.includes("304") ? (
            <>
              {" "}
              and{" "}
              <TextLink href="/materials/300-series-stainless">
                300-series stainless
              </TextLink>
            </>
          ) : null}
          {material.slug === "music-wire" ? (
            <>
              {" "}
              and{" "}
              <TextLink href="/spring-wire">spring wire</TextLink>
            </>
          ) : null}
          .
        </p>

        <h2 id="shops">
          {inferred304
            ? "Shops that name stainless — 304 is the default grade"
            : `Shops that name ${material.title.replace(/ Wire Forming$/, "").toLowerCase()}`}
        </h2>
        {inferred304 ? (
          <p>
            No listing currently writes “304” as a string. 304 / 304L is the
            default 300-series forming wire, so the stainless shops are the
            honest roster. Confirm 304 vs 316 vs 330 on the print.
          </p>
        ) : null}
        <ShopRoster
          shops={shops}
          empty="No directory shop has named this material yet."
        />

        {inventory.capabilities.length > 0 ? (
          <p>
            Processes in this set:{" "}
            {inventory.capabilities.map((item, index) => (
              <span key={item.slug}>
                {index > 0 ? " · " : ""}
                <Link href={item.path} className="text-copper hover:underline">
                  {item.title}
                </Link>
              </span>
            ))}
            .
          </p>
        ) : null}

        <h2 id="process">Why the grade matters</h2>
        <p>
          Springback, min bend radius, and weld procedure follow the coil cert,
          not the word “steel.” The{" "}
          <TextLink href="/guide/design-for-wire-forming">design guide</TextLink>{" "}
          covers radius and tolerance. Other material pages:{" "}
          {FORMING_MATERIALS.filter((item) => item.slug !== material.slug).map(
            (item, index) => (
              <span key={item.slug}>
                {index > 0 ? " · " : ""}
                <Link href={item.path} className="text-copper hover:underline">
                  {item.title.replace(/ Wire Forming$/, "")}
                </Link>
              </span>
            ),
          )}
          .
        </p>

        <div id="rfq">
          <QuotePath
            title={`RFQ a ${material.title.replace(/ Wire Forming$/, "").toLowerCase()} form`}
          />
        </div>
      </DocPage>
    </>
  );
}
