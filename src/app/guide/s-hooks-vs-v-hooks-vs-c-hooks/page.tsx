import Link from "next/link";
import { HookFigure } from "@/components/VHookFigure";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { ArticleSchema, FAQSchema } from "@/components/SeoSchemas";
import { POWDER_HOOK_HUB } from "@/lib/powder-coating-hooks";
import { WIRE } from "@/lib/range";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "S-Hooks vs V-Hooks vs C-Hooks",
  description:
    "S-hooks vs V-hooks vs C-hooks for powder coating: which hook to use for hang stability, rack clearance, and line speed. CV-hooks and 90° hooks included.",
  path: "/guide/s-hooks-vs-v-hooks-vs-c-hooks",
  image: {
    url: "/hooks/v.png",
    width: 1024,
    height: 1536,
    alt: "Powder coating V-hook",
  },
  keywords: [
    "S-hooks vs V-hooks vs C-hooks",
    "which powder coating hook",
    "powder coating hook guide",
    "V-hooks vs C-hooks",
    "S-hooks vs V-hooks",
  ],
});

const faqs = [
  {
    question: "S-hooks vs V-hooks vs C-hooks — which should I use?",
    answer:
      "S-hooks for speed and general hang. V-hooks when the part must stay centered. C-hooks when you need an open throat and rack clearance. CV-hooks when you want both locate and clearance.",
  },
  {
    question: "When are 90° hooks better?",
    answer:
      "When bar centers are tight or the part needs a different attitude through wash, coat, and cure. 90° V-hooks, 90° C-hooks, and 90° CV-hooks are the same families, rotated.",
  },
];

export default function HookStyleGuidePage() {
  return (
    <>
      <ArticleSchema
        headline="S-Hooks vs V-Hooks vs C-Hooks"
        description="Which powder coating hook to use: S-hooks, V-hooks, C-hooks, CV-hooks, and 90° hooks."
        url="/guide/s-hooks-vs-v-hooks-vs-c-hooks"
      />
      <FAQSchema questions={faqs} />
      <BreadcrumbJsonLd
        items={[
          { name: "Design guide", url: "/guide/design-for-wire-forming" },
          {
            name: "S-hooks vs V-hooks vs C-hooks",
            url: "/guide/s-hooks-vs-v-hooks-vs-c-hooks",
          },
        ]}
      />
      <DocPage
        kicker="Guide"
        title="S-hooks vs V-hooks vs C-hooks"
        lede="Powder coating shops hang on S, V, and C. The wrong hook moves in the oven, shadows the coat, or slows the load. Style first, then wire size."
        breadcrumbs={[
          { label: "Guides", href: "/guide/design-for-wire-forming" },
          { label: "S vs V vs C" },
        ]}
        toc={[
          { id: "s", label: "S-hooks" },
          { id: "v", label: "V-hooks" },
          { id: "c", label: "C-hooks" },
          { id: "cv", label: "CV-hooks" },
          { id: "ninety", label: "90° hooks" },
          { id: "pick", label: "How to choose" },
          { id: "faq", label: "FAQ" },
          { id: "next", label: "Related" },
        ]}
      >
        <h2 id="s">S-hooks</h2>
        <p>
          Two opposite curves. Fast to load, easy to strip. Powder coating{" "}
          <Link href="/powder-coating-hooks/s-hooks">S-hooks</Link> are the general hang. They move
          more than a V if the part can swing. Closed eyes when the hook has to
          stay on a bar or a D-ring.
        </p>
        <div className="not-prose my-8">
          <HookFigure type="s" label="S-hook" />
        </div>

        <h2 id="v">V-hooks</h2>
        <p>
          Dual V: rack crotch on top, part trough on the bottom, sharp 45°
          bends.{" "}
          <Link href="/powder-coating-hooks/v-hooks">V-hooks</Link> center the part and keep contact
          consistent through wash, coat, and cure. Use them when orientation
          matters more than load speed.
        </p>
        <div className="not-prose my-8">
          <HookFigure type="v" label="V-hook" />
        </div>

        <h2 id="c">C-hooks</h2>
        <p>
          Open throat.{" "}
          <Link href="/powder-coating-hooks/c-hooks">C-hooks</Link> give clearance and a simple hang.
          Better for wide parts and racks that fight a V. Less locate than a V.
          Pointed ends when the spec wants a bite.
        </p>
        <div className="not-prose my-8">
          <HookFigure type="c" label="C-hook" />
        </div>

        <h2 id="cv">CV-hooks</h2>
        <p>
          <Link href="/powder-coating-hooks/cv-hooks">CV-hooks</Link> mix C clearance and V locate.
          One opening for load, one for a settled hang. Common when a shop runs
          mixed part families on one rack style.
        </p>
        <div className="not-prose my-8">
          <HookFigure type="cv" label="CV-hook" />
        </div>

        <h2 id="ninety">90° hooks</h2>
        <p>
          <Link href="/powder-coating-hooks/90-degree-hooks">90° hooks</Link> rotate V, C, or CV off
          the bar. Use them for tight centers and a different face to the gun.
        </p>
        <div className="not-prose my-8">
          <HookFigure type="90v" label="90° V-hook" />
        </div>

        <h2 id="pick">How to choose</h2>
        <ul>
          <li>Simple shapes, high line speed → S-hooks</li>
          <li>Centered, repeatable hang → V-hooks</li>
          <li>Clearance and fast load on wide parts → C-hooks</li>
          <li>Both locate and opening → CV-hooks</li>
          <li>Tight rack or rotated part → 90° hooks</li>
        </ul>
        <p>
          Then name diameter. This shop forms {WIRE.label} — heavy-duty powder
          coating hooks, not 0.080 in catalog wire. Hub:{" "}
          <Link href={POWDER_HOOK_HUB.path}>{POWDER_HOOK_HUB.title}</Link>.
        </p>

        <h2 id="faq">FAQ</h2>
        {faqs.map((item) => (
          <div key={item.question}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}

        <h2 id="next">Related</h2>
        <ul>
          <li>
            <Link href="/custom-powder-coating-hooks">
              Custom powder coating hooks
            </Link>
          </li>
          <li>
            <Link href="/guide/design-for-wire-forming">
              Design for wire forming
            </Link>
          </li>
          <li>
            <Link href="/processes/plating-and-coating">
              Plating and coating
            </Link>
          </li>
        </ul>

        <QuoteBand title="Have a line-hook style and a wire size?" />
      </DocPage>
    </>
  );
}
