import type { BlogPost } from "./types";

export const articles: BlogPost[] = [
  {
    slug: "what-is-a-wire-form-structure",
    title: "What is a wire form structure?",
    description:
      "A wire form structure is load-bearing geometry made from round wire: frames, grids, baskets, guards, and trays. Not a clip. 4–14 mm from coil.",
    date: "2026-08-19",
    kind: "article",
    tags: ["structures", "wire forming"],
    related: [
      { href: "/wire-forming", label: "Wire forming" },
      { href: "/custom-wire-forming", label: "Custom wire forming" },
      { href: "/products/mesh-grids", label: "Mesh grids" },
    ],
    blocks: [
      {
        type: "p",
        text: "A wire form can be a hook. A wire form structure is the next step: a 3D skeleton that carries load, holds an opening, or guards a machine. The part is still the wire. There is no sheet blank and no chip. Geometry comes from bend sequence, diameter, and — when the structure is a grid — the weld.",
      },
      {
        type: "h2",
        id: "not-a-clip",
        text: "Not a clip, not a stamping",
      },
      {
        type: "p",
        text: "Music-wire clips and fourslide fasteners are wire forms. They are not structures. A structure spans: a basket rim, a guard frame, a shelf, a cable-tray channel, a furnace fixture. Diameter moves up. 4–14 mm is the band this shop runs. Stock production wire is 3/8, 7/16, and 1/2 in.",
      },
      {
        type: "p",
        text: "Stamping starts as sheet. A wire structure starts as coil. If the print is a bent plate with holes, that is fabrication. If the print is a centerline through round stock, that is forming.",
      },
      {
        type: "h2",
        id: "kinds",
        text: "Kinds of structure we actually quote",
      },
      {
        type: "ul",
        items: [
          "Frames — 2D or 3D closed or open loops that become a rim or a chassis.",
          "Grids — line wire × cross wire, resistance-welded, often with a heavier border.",
          "Baskets — rim plus mesh or rod infill. Heat-treat versions in 330.",
          "Guards — frame plus named opening. Impact is a diameter and a pitch, not a texture.",
          "Trays — U-channel grids: bottom, sidewalls, lip, splices.",
        ],
      },
      {
        type: "h2",
        id: "print",
        text: "What the print has to say",
      },
      {
        type: "p",
        text: "A structure print names alloy, diameter (decimals, not gauge), centerline or pitch, weld type, and the interfaces that actually mate. “Welded wire mesh” with no pitch is not a structure spec. Design rules: bend radius, minimum legs, springback — those still apply to every member that goes through the CNC.",
      },
    ],
  },
  {
    slug: "how-wire-forming-builds-a-structure",
    title: "How wire forming builds a structure",
    description:
      "Coil to structure: straighten, CNC bend, cut-to-length, then resistance weld or TIG. The sequence is the product. 4–14 mm in Northeast Ohio.",
    date: "2026-08-19",
    kind: "article",
    tags: ["process", "structures"],
    related: [
      { href: "/wire-forming-process", label: "Wire forming process" },
      { href: "/processes/3d-cnc-wire-forming", label: "3D CNC" },
      { href: "/secondary-operations", label: "Secondary operations" },
    ],
    blocks: [
      {
        type: "p",
        text: "A structure is not one hit on a press. It is a sequence. Coil in, straighten, feed, bend, cut. Then the joints that make separate members into one part. Skip a step and you buy someone else’s scrap as a secondary.",
      },
      {
        type: "h2",
        id: "cell",
        text: "The cell",
      },
      {
        type: "ul",
        items: [
          "Straighten — cast and helix out of the coil before the first bend.",
          "2D or 3D CNC — Numalliance Robomac on 4–14 mm from coil.",
          "Cut-to-length — in-line or a separate shear, through 14 mm rod.",
          "End work — chamfer, coin, flatten, pierce when the print mates.",
          "Join — cross-wire resistance weld on grids; TIG or MIG on rims, 330, and joints a nugget cannot reach.",
          "Inspect — interfaces and pitch, not ±0.005 on every leg.",
        ],
      },
      {
        type: "h2",
        id: "order",
        text: "Weld flat, then form the channel",
      },
      {
        type: "p",
        text: "Tray and guard returns want the grid welded flat, then the channel bent. Form a closed 3D mesh first and the electrodes cannot get in. That is how a production grid becomes a TIG sculpture. Sequence belongs on the print.",
      },
      {
        type: "h2",
        id: "band",
        text: "Why the band matters",
      },
      {
        type: "p",
        text: "Below 4 mm this cell is the wrong quote. Above 14 mm the CNC is the wrong machine. Structures in this shop live in the middle: heavy enough to span, light enough to feed from coil. That is the whole point of 4–14 mm.",
      },
    ],
  },
  {
    slug: "3d-wire-frames-and-welded-grids",
    title: "3D wire frames and welded grids",
    description:
      "Two structure languages: a CNC frame (centerline in space) and a welded grid (pitch and nuggets). Most industrial parts are both — a rim plus infill.",
    date: "2026-08-18",
    kind: "article",
    tags: ["structures", "grids", "frames"],
    related: [
      { href: "/processes/3d-cnc-wire-forming", label: "3D CNC wire forming" },
      { href: "/processes/mesh-grids-and-cable-trays", label: "Mesh grids" },
      { href: "/wire-mesh", label: "Wire mesh glossary" },
    ],
    blocks: [
      {
        type: "p",
        text: "Callouts get sloppy. “Wire frame” and “wire grid” are not synonyms. A frame is a bent centerline in space. A grid is an opening pattern joined at crossings. Industrial structures usually need both: CNC the rim, weld the infill.",
      },
      {
        type: "h2",
        id: "frame",
        text: "The frame",
      },
      {
        type: "p",
        text: "3D CNC puts bends where a 2D fourslide cannot. Returns, stacking feet, mounting loops, a closed rectangle that is not flat. Diameter is often heavier than the infill — 7/16 or 1/2 in on a rim that 3/8 in mesh hangs from. Name both.",
      },
      {
        type: "h2",
        id: "grid",
        text: "The grid",
      },
      {
        type: "p",
        text: "Welded wire cloth lays warp and shute flat. No loom crimp. Every crossing is a resistance nugget unless the alloy or the access says TIG. Pitch is center-to-center. Opening is the gap. They are not the same number. Fine woven filter cloth is a different trade — see the mesh glossary.",
      },
      {
        type: "h2",
        id: "together",
        text: "Putting them together",
      },
      {
        type: "p",
        text: "Baskets, shelves, machine guards, security panels, cable trays: rim or channel on CNC, intersections on the welder, corners on MIG or TIG. One PO. One cell in Northeast Ohio. 100-piece production minimum.",
      },
    ],
  },
  {
    slug: "designing-wire-form-structures",
    title: "Designing wire form structures for CNC",
    description:
      "Bend radius, minimum legs, springback, and datums for 4–14 mm structures. What to put on the print so the first article is the part.",
    date: "2026-08-18",
    kind: "article",
    tags: ["design", "CNC"],
    related: [
      { href: "/guide/design-for-wire-forming", label: "Design guide" },
      { href: "/sizes", label: "Stock sizes" },
      { href: "/instant-quote", label: "Instant quote" },
    ],
    blocks: [
      {
        type: "p",
        text: "A pretty solid in CAD is not a wire structure. The CNC follows a centerline. If the model is a tube with a mesh texture, we will ask for a DXF of the pitch and a section of the rim. Design for the process or pay for the translation.",
      },
      {
        type: "h2",
        id: "radius",
        text: "Radius and legs",
      },
      {
        type: "p",
        text: "Inside radius should be at least 1× diameter unless you like tool marks and a conversation about cracking. Minimum straight between bends is what the bender needs to grip — starve it and the angle walks. Stainless springback is not 1018 springback. 330 is its own animal. Put the inside radius on the print, not “make it like the carbon version in stainless.”",
      },
      {
        type: "h2",
        id: "datums",
        text: "Datums that matter",
      },
      {
        type: "p",
        text: "Hole-to-hole, mount-to-mount, overall that hits a fixture. Not every leg ±0.005. Structures stack error through weld shrinkage. Inspect the interfaces. A peel sample on the mesh. Overlay on the frame.",
      },
      {
        type: "h2",
        id: "stock",
        text: "Stock diameters save tooling",
      },
      {
        type: "p",
        text: "3/8, 7/16, and 1/2 in are on the floor. Other sizes in 4–14 mm run, with a program and often a coil buy. Changing diameter to hit a theoretical weight is how a simple structure grows a tooling line. Design guide is the longer version of this post.",
      },
    ],
  },
  {
    slug: "resistance-welded-wire-structures",
    title: "Resistance-welded wire structures",
    description:
      "Cross-wire resistance weld is the default joint on industrial grids. When it is not: 330, poor access, thin-to-heavy, cosmetic stainless — then TIG or MIG.",
    date: "2026-08-17",
    kind: "article",
    tags: ["welding", "grids"],
    related: [
      { href: "/processes/resistance-welding", label: "Resistance welding" },
      { href: "/processes/mig-tig-assembly", label: "MIG / TIG" },
      { href: "/secondary-operations", label: "Secondaries" },
    ],
    blocks: [
      {
        type: "p",
        text: "A welded wire structure lives or dies at the crossing. Cross-wire resistance weld is fast, repeatable, and has no filler. That is the default on carbon grids and on many 304 panels. It is not a worse MIG. It is a different joint.",
      },
      {
        type: "h2",
        id: "when",
        text: "When resistance is the joint",
      },
      {
        type: "ul",
        items: [
          "Line wire × cross wire on a flat panel.",
          "Similar diameters, or a known step the cell already runs.",
          "Carbon and most 300-series the print allows.",
          "Production counts where a nugget cycle beats a fillet.",
        ],
      },
      {
        type: "h2",
        id: "when-not",
        text: "When it is not",
      },
      {
        type: "p",
        text: "330 (N08330) often wants TIG with a nickel-bearing filler — nickel content, heat, electrode life. Thin infill into a heavy rim may blow through or miss. Electrodes that cannot reach a closed channel belong on a different sequence, not a bigger welder. Visible cosmetic stainless is a TIG conversation.",
      },
      {
        type: "h2",
        id: "print",
        text: "Name the process",
      },
      {
        type: "p",
        text: "“Weld as required” is how two shops bid two different parts. Resistance on crossings. MIG on corners. TIG where listed. Flash: as-welded on the mesh, dressed on a named face. Then the structure is quotable.",
      },
    ],
  },
  {
    slug: "330-stainless-heat-treat-structures",
    title: "330 stainless heat-treat structures",
    description:
      "Furnace baskets and fixtures in 330 (N08330): why not 304, how we form 4–14 mm from coil, and why TIG shows up more than resistance weld.",
    date: "2026-08-17",
    kind: "article",
    tags: ["330", "heat treat", "stainless"],
    related: [
      { href: "/330-stainless-wire-bending-usa-parts", label: "330 stainless USA parts" },
      { href: "/stainless-steel-wire-basket", label: "Stainless baskets" },
      { href: "/processes/heat-treating", label: "Heat treating" },
    ],
    blocks: [
      {
        type: "p",
        text: "A heat-treat wire basket is a structure that has to survive someone else’s furnace. 304 sags and scales in that air. 330 — UNS N08330, a nickel-chromium high-temp alloy — is why the print should not say “stainless.” Buyers search 330. Metallurgy is N08330.",
      },
      {
        type: "h2",
        id: "form",
        text: "Formed from coil, not bar leftovers",
      },
      {
        type: "p",
        text: "We run 4–14 mm from coil, cut-to-length through 14 mm rod. Rims are often 7/16 or 1/2 in. Infill can be lighter if the print allows. Springback does not copy 1018. The inside radius belongs on the drawing.",
      },
      {
        type: "h2",
        id: "join",
        text: "Join for furnace service",
      },
      {
        type: "p",
        text: "Resistance weld is the grid default on carbon. 330 often is not a clean resistance candidate. Then the joint is TIG, nickel-bearing filler — not “stainless rod.” Two jobs share the words heat treat: the basket that goes into a furnace, and stress-relief on a carbon form after bend. Those are different lines.",
      },
    ],
  },
  {
    slug: "from-coil-to-wire-structure",
    title: "From coil to wire structure",
    description:
      "USA Wire Form buys American coil and CNC-forms structures in Northeast Ohio. We are a former, not a mill. Cut-to-length through 14 mm rod.",
    date: "2026-08-16",
    kind: "article",
    tags: ["coil", "USA"],
    related: [
      { href: "/steel-wire-manufacturers-in-usa", label: "Steel wire manufacturers in the USA" },
      { href: "/cleveland", label: "Northeast Ohio" },
      { href: "/materials", label: "Materials" },
    ],
    blocks: [
      {
        type: "p",
        text: "Structures start as coil. Straighten, feed, bend, cut. Headquarters sits next to mills and drawers so 4–14 mm inbound is short-haul. That is the low-cost location — not a cheaper bend in a cheap building.",
      },
      {
        type: "h2",
        id: "mill",
        text: "Not a mill",
      },
      {
        type: "p",
        text: "Mills and drawers make wire. We form it. Calling ourselves a mill would be a lie. Buying U.S. coil and running it on a Robomac, then weld and finish in the same building, is the work. Carbon, 300-series including 330, brass, copper when the print is electrical or decorative.",
      },
      {
        type: "h2",
        id: "freight",
        text: "The structure ships as a skid",
      },
      {
        type: "p",
        text: "4–14 mm is weight. A Texas or California job is still this cell. Freight is a line on the quote, not a surprise at the dock. State pages exist so a ZIP search lands on that fact, not on a fake plant.",
      },
    ],
  },
  {
    slug: "shop-notes-directory-and-landings",
    title: "Shop notes: state pages, 330, and the mesh glossary",
    description:
      "Company blog: ZIP-to-state landings, 330 heat-treat copy, welded vs woven mesh, and how to quote a structure from a STEP.",
    date: "2026-08-19",
    kind: "article",
    tags: ["shop notes", "company"],
    related: [
      { href: "/wire-forming-companies-near-me", label: "Companies near me" },
      { href: "/330-stainless-wire-bending-usa-parts", label: "330 stainless" },
      { href: "/wire-mesh", label: "Wire mesh" },
    ],
    blocks: [
      {
        type: "p",
        text: "This is the shop blog, not a process page. A few landings went up so buyers who search the way they actually search can find the cell.",
      },
      {
        type: "ul",
        items: [
          "ZIP lookup at /wire-forming-companies-near-me opens /ohio, /texas, and the rest. One plant. Nationwide freight.",
          "330 stainless has its own page: heat-treat baskets, TIG vs resistance, coil through 14 mm rod.",
          "Wire mesh glossary: weaves and crimp for weavers; welded cloth for this floor.",
          "Stainless basket and shelf landers so “304 grid” does not dump you on a carbon SKU.",
        ],
      },
      {
        type: "p",
        text: "Send a STEP, STP, IGES, PDF, DXF, or SLDPRT. Instant ballpark is diameter, bends, length, material, quantity. Production number still comes from the print. 100-piece minimum.",
      },
    ],
  },
];
