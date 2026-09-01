import Link from "next/link";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { PRICE_LINE } from "@/lib/price";
import type { TopicArticle } from "@/lib/topic-article";

export function TopicArticlePage({
  node,
  hubHref,
  hubLabel,
  kicker,
  serviceType,
  quoteTitle,
}: {
  node: TopicArticle;
  hubHref: string;
  hubLabel: string;
  kicker: string;
  serviceType: string;
  quoteTitle: string;
}) {
  const url = `${hubHref}/${node.slug}`;
  const trail = [
    { name: hubLabel, url: hubHref },
    { name: node.h1, url },
  ];

  return (
    <>
      <ServiceSchema
        name={node.title}
        description={node.description}
        url={url}
        serviceType={serviceType}
      />
      {node.faqs.length > 0 ? <FAQSchema questions={node.faqs} /> : null}
      <BreadcrumbJsonLd items={trail} />
      <DocPage
        kicker={kicker}
        title={node.h1}
        lede={`${PRICE_LINE} ${node.lede}`}
        breadcrumbs={[
          { label: hubLabel, href: hubHref },
          { label: node.h1 },
        ]}
        toc={[
          ...node.sections.map((section) => ({
            id: section.id,
            label: section.heading,
          })),
          ...(node.alsoCalled.length
            ? [{ id: "names", label: "Also called" }]
            : []),
          ...(node.faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
          { id: "next", label: "Related" },
        ]}
      >
        {node.sections.map((section) => (
          <div key={section.id}>
            <h2 id={section.id}>{section.heading}</h2>
            {section.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ))}

        {node.alsoCalled.length > 0 ? (
          <>
            <h2 id="names">Also called</h2>
            <p>{node.alsoCalled.join(", ")}.</p>
          </>
        ) : null}

        {node.faqs.length > 0 ? (
          <>
            <h2 id="faq">FAQ</h2>
            {node.faqs.map((item) => (
              <div key={item.question}>
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </>
        ) : null}

        <h2 id="next">Related</h2>
        <ul>
          {node.related.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>

        <QuoteBand title={quoteTitle} />
      </DocPage>
    </>
  );
}
