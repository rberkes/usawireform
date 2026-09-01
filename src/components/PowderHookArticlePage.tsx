import Link from "next/link";
import { PowderHookBranchNav } from "@/components/PowderHookBranchNav";
import { EpsiHookPriceTable } from "@/components/EpsiHookPriceTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { PRICE_LINE } from "@/lib/price";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import {
  POWDER_HOOK_PLAYERS,
  powderHookHref,
  powderHookParent,
  type PowderHookNode,
} from "@/lib/powder-hook-tree";

function crumbs(node: PowderHookNode) {
  const items: { name: string; url: string }[] = [
    { name: POWDER_HOOK_HUB.title, url: POWDER_HOOK_HUB.path },
  ];
  const parent = powderHookParent(node.slug);
  if (parent) {
    items.push({ name: parent.h1, url: powderHookHref(parent.slug) });
  }
  items.push({ name: node.h1, url: powderHookHref(node.slug) });
  return items;
}

export function PowderHookArticlePage({ node }: { node: PowderHookNode }) {
  const trail = crumbs(node);
  const market = node.cluster === "market";

  return (
    <>
      <ServiceSchema
        name={node.title}
        description={node.description}
        url={powderHookHref(node.slug)}
        serviceType="Powder coating hooks"
      />
      {node.faqs.length > 0 ? <FAQSchema questions={node.faqs} /> : null}
      <BreadcrumbJsonLd items={trail} />
      <DocPage
        kicker="Powder coating hooks"
        title={node.h1}
        lede={`${PRICE_LINE} ${node.lede}`}
        breadcrumbs={trail.map((item, index) =>
          index === trail.length - 1
            ? { label: item.name }
            : { label: item.name, href: item.url },
        )}
        toc={[
          ...node.sections.map((section) => ({
            id: section.id,
            label: section.heading,
          })),
          ...(node.priceBand ? [{ id: "prices", label: "5% under EPSI" }] : []),
          ...(node.alsoCalled.length
            ? [{ id: "names", label: "Also called" }]
            : []),
          ...(market ? [{ id: "players", label: "Players" }] : []),
          ...(node.faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
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

        {node.priceBand ? (
          <>
            <h2 id="prices">5% under published EPSI boxes</h2>
            <p>
              Same length, wire, hang, and box count as the published EPSI card.
              Our part numbers.{" "}
              <Link href="/powder-coating-hooks/epsi">All EPSI-match styles</Link>
              .
            </p>
            <div className="not-prose my-8">
              <EpsiHookPriceTable style={node.priceBand} heading="h3" />
            </div>
          </>
        ) : null}

        {node.alsoCalled.length > 0 ? (
          <>
            <h2 id="names">Also called</h2>
            <p>{node.alsoCalled.join(", ")}.</p>
          </>
        ) : null}

        {market ? (
          <>
            <h2 id="players">Named houses</h2>
            <p>
              These are published finishing-hook and hanging-system companies.
              Not a shop we invented, and not a claim we sell their line.
            </p>
            <div className="not-prose my-8 overflow-x-auto">
              <table className="w-full min-w-[40rem] text-sm">
                <thead>
                  <tr className="border-b border-line text-left">
                    <th className="py-2 pr-3 font-medium">House</th>
                    <th className="py-2 pr-3 font-medium">What they sell</th>
                    <th className="py-2 font-medium">This cell</th>
                  </tr>
                </thead>
                <tbody>
                  {POWDER_HOOK_PLAYERS.map((player) => (
                    <tr key={player.url} className="border-b border-line/70 align-top">
                      <td className="py-3 pr-3">
                        <a
                          href={player.url}
                          className="font-medium"
                          rel="nofollow noopener noreferrer"
                          target="_blank"
                        >
                          {player.name}
                        </a>
                      </td>
                      <td className="py-3 pr-3 text-muted">{player.sells}</td>
                      <td className="py-3 text-muted">{player.vsUs}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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

        <p>
          Hub:{" "}
          <Link href={POWDER_HOOK_HUB.path}>{POWDER_HOOK_HUB.title}</Link>.
          Custom print:{" "}
          <Link href="/custom-powder-coating-hooks">hook builder</Link>.
        </p>

        <PowderHookBranchNav slug={node.slug} />
        <QuoteBand title="Have a finishing-hook print?" />
      </DocPage>
    </>
  );
}
