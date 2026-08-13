import Link from "next/link";
import { BandTable } from "@/components/BandTable";
import { DocPage, QuoteBand } from "@/components/DocPage";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Plating and In-Line Powder Coating",
  description: "Rack zinc, zinc-nickel, and zinc-iron plating plus in-line powder coating for 4–14 mm wire forms: form, weld, plate, powder.",
  path: '/processes/plating-and-coating',
  keywords: [
    "plating and coating",
    "wire forming process",
    "4-14 mm",
    "CNC",
  ],
});

const toc = [
  { id: "what", label: "What it is" },
  { id: "when", label: "Pre-coat vs post-form" },
  { id: "plating", label: "Rack plating" },
  { id: "powder", label: "In-line powder" },
  { id: "dual", label: "Plate then powder" },
  { id: "band", label: "4–14 mm" },
  { id: "print", label: "What to spec" },
  { id: "next", label: "Related" },
];

export default function PlatingPage() {
  return (
    <DocPage
      kicker="Process"
      title="Plating and coating"
      lede="Finish is a sequence, not a color chip. On 4–14 mm wire we form and weld, then rack-plate and/or run in-line powder — or we buy pre-coated wire and live with what the bend does to it."
      toc={toc}
    >
      <h2 id="what">What finish actually is</h2>
      <p>
        A wire form leaves the bender as mill steel, stainless, or whatever
        was on the coil. Corrosion and appearance come after — or they were
        already on the wire. Mixing those two paths on one line item is how
        you get a cracked zinc radius and a surprised PPAP.
      </p>
      <p>
        We run rack plating and in-line powder on the formed part. Exotic
        specs still go out. The process rules do not change: name the
        spec, the thickness, and whether powder sits on plate or on
        pretreated mill.
      </p>

      <h2 id="when">Pre-coated wire vs post-form finish</h2>
      <p>
        <strong>Pre-galvanized / pre-painted wire</strong> — cheaper at
        volume, ugly at a tight inside radius. The coating stretches on the
        outside fiber and can flake. Straightener marks show. Welds burn it
        off locally; you will see a halo unless you dress and touch up.
      </p>
      <p>
        <strong>Form then finish</strong> — the honest path for most 4–14 mm
        frames, wire baskets, and anything that is welded. Plate or powder
        sees the finished geometry. Weld flash has to be called: as-welded
        under plate, or dressed.
      </p>
      <p>
        Stainless is usually passivate, not paint. Powder over mill steel
        needs a pretreatment that matches the spec, not “black paint.”
      </p>

      <h2 id="plating">Rack plating — zinc family</h2>
      <p>
        3/8, 7/16, and 1/2 in forms hang on a rack. Barrel plating is for
        small loose parts; a 12 mm frame does not belong in a barrel. We
        run the zinc family that industrial wire actually specs:
      </p>
      <ul>
        <li>
          <strong>Zinc</strong> — alkaline for even coverage on a bent form;
          acid chloride when the print wants a brighter deposit. Call ASTM
          (or equivalent), microns, and chromate. Acid zinc on high-tensile
          wire needs a hydrogen bake.
        </li>
        <li>
          <strong>Zinc-nickel</strong> — higher corrosion life than straight
          zinc. The usual upgrade when the part lives outside, on a vehicle,
          or in a plant that used to fail salt spray on zinc alone.
        </li>
        <li>
          <strong>Zinc-iron</strong> — alloy zinc when the spec wants it
          instead of Zn-Ni. Same rule: thickness and chromate on the print,
          not “silver plate.”
        </li>
        <li>
          <strong>Nickel</strong> — appearance and wear. Thickness matters
          on a fit diameter.
        </li>
      </ul>
      <p>
        Racks, thieves, and current density decide whether the inside of a
        tight 3D loop plates or starves. A sample racked the way production
        will rack is part of first article — not an afterthought.
      </p>

      <h2 id="powder">In-line powder coating</h2>
      <p>
        In-line means a conveyor: hang, wash / pretreat, dry, spray, cure.
        Not a batch booth for every job. Stock 3/8, 7/16, and 1/2 in frames,
        hangers, grids, and baskets hang on{" "}
        <Link href="/products/powder-coating-hooks">line hooks</Link> and
        run. Color, gloss, and max film build belong on the quote.
      </p>
      <p>
        Powder build eats a tight clip gap and a threaded end. Call max
        thickness on mating faces. Batch powder stays available when the
        form will not hang consistently or the lot is too small to set the
        line.
      </p>
      <p>
        Pretreat is the process. Powder on dirty mill or on an unmatched
        conversion coat peels. We do not skip wash to “save a pass.”
      </p>

      <h2 id="dual">Plate, then powder</h2>
      <p>
        Corrosion plus a color is a dual coat: rack zinc, zinc-nickel, or
        zinc-iron, then in-line powder over the plate. That is one sequence
        in this shop — not plate here and powder three states away. The
        print has to name both layers. Powder over chromate is not the same
        as powder over phosphate; say which.
      </p>
      <p>
        Passivate stays the stainless path. Do not powder 304 to “make it
        look finished” unless the print wants a color, not corrosion.
      </p>

      <h2 id="band">What changes from 4 to 14 mm</h2>
      <BandTable
        heading="Finish"
        rows={{
          4: "Pre-galv is common and will crack on a 1× bend. Powder build is a large fraction of diameter. Barrel plating may still apply.",
          8: "Form-then-zinc is the usual frame path. Rack. In-line powder hangs clean.",
          12: "Rack plating. Weld then plate. Pre-coat is a last resort. Dual coat is routine on outdoor frames.",
          14: "Finish is secondary to the structure. Spec thickness on faces that mate, not ‘cover all over.’ Rack and hang with real hooks.",
        }}
      />

      <h2 id="print">What to spec</h2>
      <ul>
        <li>Plating: zinc, zinc-nickel, or zinc-iron — spec, microns, chromate</li>
        <li>Powder: color, gloss, max film on mating features</li>
        <li>Dual coat: plate then powder, and which pretreat sits between</li>
        <li>Before or after weld; before or after{" "}
          <Link href="/processes/end-forming">end forming</Link>
        </li>
        <li>Hydrogen bake if the wire is high-tensile and the plate is acid</li>
        <li>Surfaces that must stay bare (threads, weld later, ground datums)</li>
      </ul>

      <h2 id="next">Related</h2>
      <ul>
        <li>
          <Link href="/capabilities">Capabilities</Link> — what we run
        </li>
        <li>
          <Link href="/products/powder-coating-hooks">Powder-coating hooks</Link>
        </li>
        <li>
          <Link href="/processes/resistance-welding">Resistance welding</Link>
        </li>
        <li>
          <Link href="/guide/design-for-wire-forming">Design for wire forming</Link>
        </li>
      </ul>

      <QuoteBand title="Have a plating spec or a powder color?" />
    </DocPage>
  );
}
