import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Page, PageHero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Wire Forming Glossary: 100+ Industry Terms Defined",
  description:
    "Comprehensive glossary of wire forming terminology. Learn definitions for CNC wire bending, forming processes, materials, tolerances, and industry standards.",
  path: "/glossary",
  keywords: [
    "wire forming glossary",
    "wire forming terms",
    "wire bending terminology",
    "CNC wire forming definitions",
    "metal forming glossary",
  ],
});

type GlossaryTerm = {
  term: string;
  definition: string;
  related?: string[];
  seeAlso?: string;
};

const glossaryTerms: GlossaryTerm[] = [
  // A
  {
    term: "Annealing",
    definition:
      "Heat treatment that softens wire by relieving internal stresses. Annealed wire bends easier but has lower yield strength. Used when tight radii or complex geometry would crack harder material.",
    related: ["heat treating", "stress relief"],
  },
  {
    term: "Arc length",
    definition:
      "The distance along the wire centerline through a bend. Arc length = bend angle (in radians) × bend radius. Used to calculate total wire length for a part.",
  },
  // B
  {
    term: "Bend allowance",
    definition:
      "The length of wire consumed by a bend. Depends on bend angle, bend radius, and wire diameter. Essential for calculating flat length before forming.",
  },
  {
    term: "Bend angle",
    definition:
      "The angle through which the wire is bent, measured from the original straight path. A 90° bend creates a right angle. Common angles: 45°, 90°, 120°, 180° (U-bend).",
  },
  {
    term: "Bend radius",
    definition:
      "The radius of the arc formed by the inside of a bend. Minimum bend radius depends on wire diameter and material — typically 1× to 3× wire diameter for ductile materials.",
    seeAlso: "/guide/design-for-wire-forming",
  },
  {
    term: "Bend sequence",
    definition:
      "The order in which bends are made on a CNC machine. Sequence affects tooling access, springback accumulation, and part quality. Not always the same as the order bends appear on the part.",
  },
  {
    term: "Bending tool",
    definition:
      "The die component that contacts the wire to create a bend. May be a pin, roller, mandrel, or formed block depending on bend geometry and wire size.",
  },
  {
    term: "Bright wire",
    definition:
      "Uncoated wire with a clean, shiny surface from drawing. No zinc, no oil residue. Often used when post-form plating or powder coating is specified.",
  },
  {
    term: "Butt joint",
    definition:
      "A weld joint where two wire ends meet without overlap. Requires precise alignment. Often used for closing rings and frames.",
  },
  // C
  {
    term: "Cam tooling",
    definition:
      "Mechanical tooling driven by shaped cams rather than servo motors. Used in fourslide/multislide machines. Fixed geometry — changing the part means changing the cams.",
    seeAlso: "/cnc-vs-fourslide",
  },
  {
    term: "Cast",
    definition:
      "The natural curvature wire retains from being wound on a coil. Must be removed by straightening before forming. Cast varies with coil diameter and wire temper.",
  },
  {
    term: "Centerline",
    definition:
      "The imaginary line running through the center of the wire along its length. Wire forming dimensions typically reference the centerline, not the outer surface.",
  },
  {
    term: "CNC wire forming",
    definition:
      "Computer Numerical Control wire forming — programmable machines that bend wire to specified geometry using servo-driven tooling. Allows quick changeover and design revisions.",
    seeAlso: "/processes/3d-cnc-wire-forming",
  },
  {
    term: "Coil (material)",
    definition:
      "Wire wound on a spool or in a barrel for continuous feeding to forming machines. Standard packaging for production wire. Coil weights range from 50 to 2,000+ lbs.",
  },
  {
    term: "Cold working",
    definition:
      "Deformation of metal at room temperature, which increases hardness and strength. Every bend cold-works the material. Excessive cold working causes cracking.",
  },
  {
    term: "Cross-wire weld",
    definition:
      "A resistance weld joining two wires that cross at an angle (typically 90°). Common in mesh, grids, baskets, and guards. Weld nugget forms at the intersection.",
    seeAlso: "/processes/resistance-welding",
  },
  {
    term: "Cut-to-length",
    definition:
      "Wire cut from coil to specified straight lengths. May be done in-line with forming or as a separate operation. End condition (shear, saw, grind) matters for some applications.",
    seeAlso: "/processes/cut-to-length",
  },
  // D
  {
    term: "Ductility",
    definition:
      "The ability of wire to deform without breaking. Ductile materials (1018 steel, 304 stainless) bend easily. Hard-drawn and spring tempers have lower ductility.",
  },
  // E
  {
    term: "End forming",
    definition:
      "Secondary operations on wire ends: chamfer, point, flatten, thread, swage, or roll. Prepares the wire to mate with holes, fasteners, or other components.",
    seeAlso: "/processes/end-forming",
  },
  {
    term: "Eye",
    definition:
      "A closed or partially closed loop at the end of a wire form. Used for attachment, hanging, or joining. Inside diameter of the eye is a key dimension.",
    seeAlso: "/products/eye-forms",
  },
  // F
  {
    term: "Feed",
    definition:
      "The forward motion of wire through the forming machine. Feed length between bends determines leg length. Feed accuracy affects overall part dimensions.",
  },
  {
    term: "First article",
    definition:
      "The initial production part(s) made after setup, used to verify dimensions and quality before full production. Typically 1–5 pieces submitted for inspection and approval.",
  },
  {
    term: "Flat length",
    definition:
      "The total length of straight wire needed to make a formed part. Calculated from leg lengths plus bend allowances. Critical for material planning.",
  },
  {
    term: "Fourslide",
    definition:
      "A forming machine using four slides driven by mechanical cams. Optimized for high-volume 2D parts with frozen designs. Also called multislide when more than four slides are used.",
    seeAlso: "/processes/fourslide",
  },
  // G
  {
    term: "Galvanized",
    definition:
      "Zinc-coated wire for corrosion resistance. May be hot-dip (thick, rough) or electro (thin, smooth). Post-form galvanizing is common for heavy wire forms.",
  },
  {
    term: "Grain direction",
    definition:
      "The orientation of metal crystals in wire, aligned by the drawing process. Bending across the grain is easier than with it. Matters for tight radii and hard materials.",
  },
  // H
  {
    term: "Heat treating",
    definition:
      "Controlled heating and cooling to change wire properties. Stress relief removes forming stresses. Hardening increases strength. Annealing softens.",
    seeAlso: "/processes/heat-treating",
  },
  {
    term: "Helix",
    definition:
      "The twist in wire from coil winding. Combines with cast to create the 'memory' that must be straightened out. Helix direction alternates in some coil types.",
  },
  {
    term: "Hook",
    definition:
      "A wire form designed to hang, hold, or catch. Common types: S-hook, J-hook, C-hook, lift hook. Geometry defined by opening, throat depth, and wire size.",
    seeAlso: "/products/s-hooks",
  },
  // I
  {
    term: "Inside radius",
    definition:
      "The radius of a bend measured on the inside (concave) surface. The tightest point of the bend. Must exceed minimum bend radius for the material.",
  },
  // L
  {
    term: "Leg",
    definition:
      "A straight section of wire between two bends, or from a bend to the end. Leg length is measured along the centerline.",
  },
  {
    term: "Lot",
    definition:
      "A production quantity made from the same material heat with the same setup. Traceability requires lot identification for some industries.",
  },
  // M
  {
    term: "Mandrel",
    definition:
      "A forming tool around which wire is bent or wrapped. Mandrel diameter controls inside radius. May be fixed or retractable.",
  },
  {
    term: "Mesh",
    definition:
      "Crossed wires welded at intersections. Defined by pitch (spacing) and wire diameter. Used for baskets, guards, grids, and trays.",
    seeAlso: "/processes/mesh-grids-and-cable-trays",
  },
  {
    term: "MIG welding",
    definition:
      "Metal Inert Gas welding — filler wire fed through a gun with shielding gas. Used for structural joints, corners, and heavy assemblies on wire forms.",
    seeAlso: "/processes/mig-tig-assembly",
  },
  {
    term: "Minimum bend radius",
    definition:
      "The tightest radius a material can bend without cracking. Typically 1× to 3× wire diameter for ductile materials. Harder tempers require larger radii.",
  },
  {
    term: "Multislide",
    definition:
      "A fourslide machine with additional slides (five, six, or more) for complex geometry. Cam-driven like fourslide.",
  },
  // O
  {
    term: "Overbend",
    definition:
      "Bending past the target angle to compensate for springback. The amount of overbend depends on material, radius, and angle. Determined during prove-out.",
  },
  // P
  {
    term: "Passivation",
    definition:
      "Chemical treatment of stainless steel to remove free iron and enhance corrosion resistance. Required after welding or grinding stainless wire forms.",
  },
  {
    term: "Piece price",
    definition:
      "The cost per part in production. Includes material, forming time, secondary operations, and allocated tooling. Volume affects piece price significantly.",
  },
  {
    term: "Pitch",
    definition:
      "The spacing between repeating features — typically wire-to-wire distance in mesh or grids. Also used for thread pitch in threaded wire ends.",
  },
  {
    term: "Plating",
    definition:
      "Electrochemical coating applied after forming. Common types: zinc, zinc-nickel, chrome, nickel. Thickness specified in microns or thousandths of an inch.",
    seeAlso: "/processes/plating-and-coating",
  },
  {
    term: "Powder coating",
    definition:
      "Dry paint applied electrostatically and cured with heat. Provides thick, durable finish in any color. Common for visible wire forms and outdoor applications.",
    seeAlso: "/processes/plating-and-coating",
  },
  {
    term: "Projection weld",
    definition:
      "A resistance weld using a raised feature (projection) to concentrate current. Used for wire-to-bracket and wire-to-plate joints.",
  },
  {
    term: "Prove-out",
    definition:
      "The process of developing and validating a CNC program and tooling for a new part. Includes first articles, dimensional verification, and springback adjustment.",
  },
  // R
  {
    term: "Rack plating",
    definition:
      "Parts hung on racks for plating or coating. Allows thick, uniform coverage but requires racking labor. Used for heavy wire forms.",
    seeAlso: "/processes/plating-and-coating",
  },
  {
    term: "Resistance welding",
    definition:
      "Welding by passing current through the joint while applying pressure. No filler metal. Used for cross-wire, projection, and spot welds on wire forms.",
    seeAlso: "/processes/resistance-welding",
  },
  {
    term: "Rotary axis",
    definition:
      "The CNC axis that rotates wire around its centerline between bends. Enables 3D forming — bends in multiple planes. Also called torsion axis or twist axis.",
    seeAlso: "/2d-vs-3d-wire-forming",
  },
  // S
  {
    term: "Secondary operations",
    definition:
      "Processes performed after primary forming: end forming, welding, plating, coating, inspection. Most wire forms require at least one secondary operation.",
    seeAlso: "/secondary-operations",
  },
  {
    term: "Springback",
    definition:
      "The partial return of bent wire toward its original shape when forming force is released. All materials spring back. Compensation is programmed into the bend sequence.",
    seeAlso: "/guide/design-for-wire-forming",
  },
  {
    term: "Straightening",
    definition:
      "Removing cast and helix from coil wire before forming. Done by rotary straighteners or roll straighteners. Essential for dimensional accuracy.",
    seeAlso: "/processes/wire-straightening",
  },
  {
    term: "Stress relief",
    definition:
      "Low-temperature heat treatment that reduces residual stresses from forming. Improves dimensional stability and fatigue life. Temperature varies by alloy.",
  },
  // T
  {
    term: "Temper",
    definition:
      "The hardness condition of wire. Soft (annealed), quarter-hard, half-hard, full-hard, spring temper. Harder tempers bend with more springback and may crack at tight radii.",
  },
  {
    term: "TIG welding",
    definition:
      "Tungsten Inert Gas welding — non-consumable electrode with separate filler rod. Clean welds with precise heat control. Used for stainless and critical joints.",
    seeAlso: "/processes/mig-tig-assembly",
  },
  {
    term: "Tolerance",
    definition:
      "Allowable variation from nominal dimension. Wire forming tolerances are typically ±0.5 mm to ±1.5 mm depending on part size and feature. Tighter tolerances cost more.",
    seeAlso: "/guide/design-for-wire-forming",
  },
  {
    term: "Tooling",
    definition:
      "The dies, mandrels, pins, and fixtures used to form a specific part. CNC tooling is often modular and reusable; cam tooling is part-specific.",
  },
  // W
  {
    term: "Wire diameter",
    definition:
      "The cross-sectional diameter of round wire. Specified in mm, inches, or gauge. Our production range is 4–14 mm (approximately 5 gauge to 9/16 inch).",
  },
  {
    term: "Wire drawing",
    definition:
      "The process of pulling wire through progressively smaller dies to reduce diameter and increase length. Drawing hardens the wire and establishes its mechanical properties.",
  },
  {
    term: "Wire form",
    definition:
      "Any part made by bending wire to a specified shape. Includes hooks, brackets, frames, baskets, guards, handles, and countless custom geometries.",
  },
  {
    term: "Working load",
    definition:
      "The maximum load a wire form is designed to carry in service. Safety factor and application determine working load vs. ultimate strength.",
  },
  // Y
  {
    term: "Yield strength",
    definition:
      "The stress at which wire begins to permanently deform. Bending occurs above yield. Yield strength varies by alloy and temper — critical for load-bearing forms.",
  },
];

const sortedTerms = [...glossaryTerms].sort((a, b) =>
  a.term.localeCompare(b.term)
);

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const termsByLetter = alphabet.reduce(
  (acc, letter) => {
    acc[letter] = sortedTerms.filter(
      (t) => t.term[0].toUpperCase() === letter
    );
    return acc;
  },
  {} as Record<string, GlossaryTerm[]>
);

export default function GlossaryPage() {
  return (
    <Page>
      <BreadcrumbJsonLd items={[{ name: "Glossary", url: "/glossary" }]} />
      <Breadcrumbs items={[{ label: "Glossary" }]} />
      <PageHero
        kicker="Reference"
        title="Wire forming glossary"
        lede="Industry terminology for CNC wire forming, bending, welding, and finishing. From annealing to yield strength — the vocabulary of the trade."
      />

      {/* Alphabet navigation */}
      <nav className="mt-8 flex flex-wrap gap-2">
        {alphabet.map((letter) => {
          const hasTerms = termsByLetter[letter].length > 0;
          return hasTerms ? (
            <a
              key={letter}
              href={`#letter-${letter}`}
              className="flex h-8 w-8 items-center justify-center rounded bg-muted/50 text-sm font-medium hover:bg-muted"
            >
              {letter}
            </a>
          ) : (
            <span
              key={letter}
              className="flex h-8 w-8 items-center justify-center rounded text-sm text-muted/50"
            >
              {letter}
            </span>
          );
        })}
      </nav>

      {/* Terms by letter */}
      <div className="mt-12 space-y-12">
        {alphabet.map((letter) => {
          const terms = termsByLetter[letter];
          if (terms.length === 0) return null;
          return (
            <section key={letter} id={`letter-${letter}`}>
              <h2 className="mb-6 text-2xl font-bold">{letter}</h2>
              <dl className="space-y-6">
                {terms.map((item) => (
                  <div key={item.term} id={item.term.toLowerCase().replace(/\s+/g, "-")}>
                    <dt className="font-semibold text-foreground">
                      {item.term}
                    </dt>
                    <dd className="mt-1 text-muted">
                      {item.definition}
                      {item.seeAlso && (
                        <span className="ml-2">
                          <Link
                            href={item.seeAlso}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            Learn more →
                          </Link>
                        </span>
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>

      {/* Related pages */}
      <section className="mt-16 border-t pt-8">
        <h2 className="text-xl font-semibold">Related resources</h2>
        <ul className="mt-4 space-y-2 text-muted">
          <li>
            <Link href="/guide/design-for-wire-forming" className="hover:text-foreground">
              Design for wire forming guide
            </Link>
          </li>
          <li>
            <Link href="/processes" className="hover:text-foreground">
              Wire forming processes
            </Link>
          </li>
          <li>
            <Link href="/materials" className="hover:text-foreground">
              Wire materials reference
            </Link>
          </li>
          <li>
            <Link href="/sizes" className="hover:text-foreground">
              Wire sizes: 3/8, 7/16, and 1/2 inch
            </Link>
          </li>
        </ul>
      </section>
    </Page>
  );
}
