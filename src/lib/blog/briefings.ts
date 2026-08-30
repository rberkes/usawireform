import type { BlogPost } from "./types";

/** Short briefings. `/blog/daily` picks one by Ohio calendar day — no new URL every morning. */
export const briefings: BlogPost[] = [
  {
    slug: "briefing-bend-radius",
    title: "Daily briefing: inside radius is a spec",
    description:
      "Wire forming briefing: inside bend radius should be named on the print. 1× diameter is the starting rule in 4–14 mm.",
    date: "2026-01-01",
    kind: "briefing",
    tags: ["design"],
    related: [{ href: "/guide/design-for-wire-forming", label: "Design guide" }],
    blocks: [
      {
        type: "p",
        text: "If the print says “sharp” on 1/2 in wire, the quote will say no — or it will say tooling and a cracked-wire conversation. Inside radius of at least one diameter is the starting rule for this band. Stainless needs more springback thought than 1018. 330 does not copy either.",
      },
      {
        type: "p",
        text: "Put the inside radius on the drawing. Do not point at a carbon sample and write “same in stainless.”",
      },
    ],
  },
  {
    slug: "briefing-min-leg",
    title: "Daily briefing: minimum legs",
    description:
      "The CNC needs a straight to grip between bends. Starve the leg and the angle walks.",
    date: "2026-01-02",
    kind: "briefing",
    tags: ["design", "CNC"],
    related: [{ href: "/processes/3d-cnc-wire-forming", label: "3D CNC" }],
    blocks: [
      {
        type: "p",
        text: "A wire structure with a tiny straight between two bends looks fine in CAD. The bender still has to hold something. Minimum leg length is process, not aesthetics. If two bends almost touch, ask whether that is one tighter radius or a weldment.",
      },
    ],
  },
  {
    slug: "briefing-springback",
    title: "Daily briefing: springback is the alloy",
    description:
      "1018, 304, and 330 do not take the same overbend. Name the grade before you freeze the centerline.",
    date: "2026-01-03",
    kind: "briefing",
    tags: ["materials"],
    related: [{ href: "/materials/300-series-stainless", label: "300-series stainless" }],
    blocks: [
      {
        type: "p",
        text: "Springback is why a first article in carbon is not a first article in 304. The program overbends. The alloy decides how much. Freeze the centerline after the grade is frozen — not before.",
      },
    ],
  },
  {
    slug: "briefing-pitch-vs-opening",
    title: "Daily briefing: pitch is not opening",
    description:
      "Mesh pitch is center-to-center. Opening is the gap. Diameter sits in between. Name two of the three.",
    date: "2026-01-04",
    kind: "briefing",
    tags: ["mesh"],
    related: [{ href: "/wire-mesh", label: "Wire mesh" }],
    blocks: [
      {
        type: "p",
        text: "A 1 in mesh with 0.375 in wire is not a 1 in hole. Pitch minus diameter is the clear opening (for a simple square). Guards, airflow, and OSHA reach-through live on opening. Production lives on pitch and diameter. Put both on the print.",
      },
    ],
  },
  {
    slug: "briefing-decimals-not-gauge",
    title: "Daily briefing: decimals, not gauge",
    description:
      "Gauge numbers disagree by standard. Specify 0.375 in or 9.53 mm.",
    date: "2026-01-05",
    kind: "briefing",
    tags: ["sizes"],
    related: [{ href: "/sizes", label: "Wire sizes" }],
    blocks: [
      {
        type: "p",
        text: "“9 gauge” is how two buyers bid two diameters. This shop stocks 3/8, 7/16, and 1/2 in. Write decimals. Gauge is a nickname from another trade.",
      },
    ],
  },
  {
    slug: "briefing-weld-flat",
    title: "Daily briefing: weld the grid flat",
    description:
      "Form a closed channel first and the electrodes cannot reach. Weld flat, then bend the tray.",
    date: "2026-01-06",
    kind: "briefing",
    tags: ["welding"],
    related: [
      { href: "/processes/mesh-grids-and-cable-trays", label: "Grids and trays" },
    ],
    blocks: [
      {
        type: "p",
        text: "Cable trays and returned guards want the mesh welded as a panel, then the U formed. Reverse that and you buy TIG hours. Sequence is a process spec, not a shop preference.",
      },
    ],
  },
  {
    slug: "briefing-330-not-304",
    title: "Daily briefing: 330 is not 304",
    description:
      "Furnace baskets are N08330. Washdown is 304 or 316. Mixing them is how the first oven cycle fails.",
    date: "2026-01-07",
    kind: "briefing",
    tags: ["330", "stainless"],
    related: [
      { href: "/330-stainless-wire-bending-usa-parts", label: "330 stainless parts" },
    ],
    blocks: [
      {
        type: "p",
        text: "304 is wet service. 316 is chlorides. 330 is furnace air. “Stainless wire basket” without a grade is not a structure spec. Heat-treat fixtures in this shop are 330 until the print names a nickel alloy.",
      },
    ],
  },
  {
    slug: "briefing-resistance-vs-tig",
    title: "Daily briefing: resistance vs TIG",
    description:
      "Crossings want a nugget. Corners and 330 often want a fillet. Name both.",
    date: "2026-01-08",
    kind: "briefing",
    tags: ["welding"],
    related: [{ href: "/processes/resistance-welding", label: "Resistance welding" }],
    blocks: [
      {
        type: "p",
        text: "Resistance weld is the default grid joint. TIG is heat control: thin-into-heavy, 330, cosmetic stainless. MIG is production fillets on carbon frames. Three processes. One print line each.",
      },
    ],
  },
  {
    slug: "briefing-100-piece",
    title: "Daily briefing: 100-piece minimum",
    description:
      "Production quotes start at 100 pieces. Prototypes are a different conversation.",
    date: "2026-01-09",
    kind: "briefing",
    tags: ["quoting"],
    related: [{ href: "/quoting", label: "Quoting" }],
    blocks: [
      {
        type: "p",
        text: "The CNC and the coil buy are not priced like a job shop of two parts. 100-piece minimum on production. Instant quote is a ballpark. The STEP still wins the number.",
      },
    ],
  },
  {
    slug: "briefing-freight-skid",
    title: "Daily briefing: freight is a skid",
    description:
      "4–14 mm ships as weight. The quote names freight. There is no plant in every state.",
    date: "2026-01-10",
    kind: "briefing",
    tags: ["freight"],
    related: [
      { href: "/wire-forming-companies-near-me", label: "Companies near me" },
    ],
    blocks: [
      {
        type: "p",
        text: "One cell, Northeast Ohio. State pages are landings. A structure going to Houston or Seattle is still this floor. LTL class and weight belong on the quote so receiving is not a surprise.",
      },
    ],
  },
  {
    slug: "briefing-woven-vs-welded",
    title: "Daily briefing: woven vs welded cloth",
    description:
      "Weavers crimp. We resistance-weld. Same word — mesh — different machines.",
    date: "2026-01-11",
    kind: "briefing",
    tags: ["mesh"],
    related: [{ href: "/wire-mesh", label: "Wire mesh" }],
    blocks: [
      {
        type: "p",
        text: "Plain Dutch, twill, micronic ratings: loom. Welded wire cloth: flat warp and shute, nugget at the crossing, 4–14 mm. Do not paste a filter-weave name onto a 3/8 in guard.",
      },
    ],
  },
  {
    slug: "briefing-zinc-after-weld",
    title: "Daily briefing: zinc after weld",
    description:
      "Pre-galv mesh burns at every nugget. Specify finish after join.",
    date: "2026-01-12",
    kind: "briefing",
    tags: ["finish"],
    related: [{ href: "/processes/plating-and-coating", label: "Plating" }],
    blocks: [
      {
        type: "p",
        text: "A pretty pre-galv panel becomes a burned grid the first time you resistance-weld it. Carbon structures: weld, then zinc or powder. Stainless: passivate as specified. Finish is a sequence, not a color chip.",
      },
    ],
  },
  {
    slug: "briefing-stock-three",
    title: "Daily briefing: 3/8, 7/16, 1/2 in",
    description:
      "Stock production diameters. Other sizes in 4–14 mm run with a program and often a coil buy.",
    date: "2026-01-13",
    kind: "briefing",
    tags: ["sizes"],
    related: [{ href: "/sizes", label: "Sizes" }],
    blocks: [
      {
        type: "p",
        text: "Those three diameters are on the floor. Designing a structure around 0.312 in because a spreadsheet liked the weight is how you buy tooling. Stay in stock unless the print has a reason.",
      },
    ],
  },
  {
    slug: "briefing-inspect-interfaces",
    title: "Daily briefing: inspect the interfaces",
    description:
      "Hole-to-hole and pitch. Not ±0.005 on every leg of a welded structure.",
    date: "2026-01-14",
    kind: "briefing",
    tags: ["inspection"],
    related: [{ href: "/processes/inspection", label: "Inspection" }],
    blocks: [
      {
        type: "p",
        text: "Weld shrinkage stacks. A CMM dump of every bend is a report, not a useful spec. Name the mates: mounts, overall that hits a fixture, mesh pitch, a peel sample. That is inspection on a structure.",
      },
    ],
  },
  {
    slug: "briefing-fourslide-vs-cnc",
    title: "Daily briefing: fourslide vs CNC",
    description:
      "Fourslide wins frozen high-volume 2D clips. Mixed lots and 3D structures in 4–14 mm are CNC.",
    date: "2026-01-15",
    kind: "briefing",
    tags: ["process"],
    related: [{ href: "/processes/fourslide", label: "Fourslide" }],
    blocks: [
      {
        type: "p",
        text: "We explain fourslide so we do not sell it when it is wrong. This floor is mixed revisions, 3D geometry, and heavy wire. CNC is the center of the cell. A frozen million-piece 2D clip is a different quote.",
      },
    ],
  },
  {
    slug: "briefing-basket-rim",
    title: "Daily briefing: the rim is the structure",
    description:
      "Infill can be lighter. The rim carries the span. Name both diameters.",
    date: "2026-01-16",
    kind: "briefing",
    tags: ["baskets"],
    related: [
      { href: "/stainless-steel-wire-basket", label: "Stainless baskets" },
    ],
    blocks: [
      {
        type: "p",
        text: "A basket that uses one diameter for rim and mesh is easy to draw and often overweight — or the rim is too light. Industrial baskets: heavier border, named infill, weld called out. 330 furnace rims are not 9-gauge.",
      },
    ],
  },
  {
    slug: "briefing-guard-opening",
    title: "Daily briefing: a guard is an opening spec",
    description:
      "Machine guards fail on pitch and diameter, not on a mesh texture in CAD.",
    date: "2026-01-17",
    kind: "briefing",
    tags: ["guards"],
    related: [{ href: "/products/machine-guards", label: "Machine guards" }],
    blocks: [
      {
        type: "p",
        text: "Reach-through, impact, and visibility are opening and wire size. A solid with a hatch pattern is not a guard print. Frame diameter, infill diameter, pitch, mounts, weld. Then it is a structure we can run.",
      },
    ],
  },
  {
    slug: "briefing-cut-to-length",
    title: "Daily briefing: cut-to-length through 14 mm",
    description:
      "Blanks and rod cutoff live in the same band as forming. 14 mm is the ceiling.",
    date: "2026-01-18",
    kind: "briefing",
    tags: ["cutoff"],
    related: [{ href: "/processes/cut-to-length", label: "Cut-to-length" }],
    blocks: [
      {
        type: "p",
        text: "Not every structure is a nest of bends. Straight blanks, spacers, rod frames: cut-to-length from coil, then weld. Same 4–14 mm ceiling. Above that, the quote says no.",
      },
    ],
  },
  {
    slug: "briefing-datums",
    title: "Daily briefing: pick datums that install",
    description:
      "The operator does not assemble to your origin. Datum the holes and the mounts.",
    date: "2026-01-19",
    kind: "briefing",
    tags: ["design"],
    related: [{ href: "/guide/design-for-wire-forming", label: "Design guide" }],
    blocks: [
      {
        type: "p",
        text: "CAD origin is not a fixture. A wire structure should datum on the features that hit the customer’s holes, pins, or deck. Everything else can float inside a reasonable envelope.",
      },
    ],
  },
  {
    slug: "briefing-usa-coil",
    title: "Daily briefing: U.S. coil, U.S. form",
    description:
      "We buy American coil and form it in Ohio. We are not a mill.",
    date: "2026-01-20",
    kind: "briefing",
    tags: ["USA"],
    related: [
      {
        href: "/steel-wire-manufacturers-in-usa",
        label: "Steel wire manufacturers in the USA",
      },
    ],
    blocks: [
      {
        type: "p",
        text: "Rod mills draw wire. This shop turns that coil into structures. Short-haul inbound is why the cell sits in Northeast Ohio. The mill PO and the forming PO are different lines.",
      },
    ],
  },
  {
    slug: "briefing-step-file",
    title: "Daily briefing: send a STEP, not a screenshot",
    description:
      "STEP, STP, IGES, PDF, DXF, SLDPRT. A photo of a part on a table is a conversation, not a quote pack.",
    date: "2026-01-21",
    kind: "briefing",
    tags: ["quoting"],
    related: [{ href: "/contact", label: "Contact" }],
    blocks: [
      {
        type: "p",
        text: "Centerline, diameter, alloy, quantity. Instant quote if you only have inches and bend count. Production still wants a file. A mesh texture on a solid is not a grid. A DXF of the pitch plus a rim section is.",
      },
    ],
  },
];
