import Link from "next/link";
import { GroundStapleBranchNav } from "@/components/GroundStapleBranchNav";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { FAQSchema, ServiceSchema } from "@/components/SeoSchemas";
import { PRICE_LINE } from "@/lib/price";
import { GROUND_STAPLE_HUB } from "@/lib/ground-staples";
import {
  GROUND_STAPLE_PLAYERS,
  groundStapleHref,
  groundStapleParent,
  type GroundStapleNode,
} from "@/lib/ground-staple-tree";

function crumbs(node: GroundStapleNode) {
  const items: { name: string; url: string }[] = [
    { name: GROUND_STAPLE_HUB.title, url: GROUND_STAPLE_HUB.path },
  ];
  const parent = groundStapleParent(node.slug);
  if (parent) {
    items.push({ name: parent.h1, url: groundStapleHref(parent.slug) });
  }
  items.push({ name: node.h1, url: groundStapleHref(node.slug) });
  return items;
}

export function GroundStapleArticlePage({ node }: { node: GroundStapleNode }) {
  const trail = crumbs(node);
  const market = node.cluster === "market" && node.slug[0] === "market";

  return (
    <>
      <ServiceSchema
        name={node.title}
        description={node.description}
        url={groundStapleHref(node.slug)}
        serviceType="Ground staples"
      />
      {node.faqs.length > 0 ? <FAQSchema questions={node.faqs} /> : null}
      <BreadcrumbJsonLd items={trail} />
      <DocPage
        kicker="Ground staples"
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
              These are published landscape-staple and geosynthetics companies.
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
                  {GROUND_STAPLE_PLAYERS.map((player) => (
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
          <Link href={GROUND_STAPLE_HUB.path}>{GROUND_STAPLE_HUB.title}</Link>.
          Custom print:{" "}
          <Link href="/custom-ground-staples">staple builder</Link>.
        </p>

        <GroundStapleBranchNav slug={node.slug} />
        <QuoteBand title="Have a ground-staple print?" />
      </DocPage>
    </>
  );
}
