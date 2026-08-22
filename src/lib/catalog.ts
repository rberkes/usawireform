export const STOCK = "3/8, 7/16, and 1/2 in" as const;

export const catalogGroups = [
  "Hooks and rings",
  "Hangers",
  "Grids and trays",
  "Frames and hardware",
] as const;

export type CatalogGroup = (typeof catalogGroups)[number];

/**
 * Type for catalog items
 * Note: `related` contains slugs that reference other catalog items.
 * Run `npx tsx src/lib/catalog-validation.ts` to validate all references.
 */
export type CatalogItem = {
  /** URL-safe identifier for the product */
  slug: string;
  /** Display name */
  title: string;
  /** Product category */
  group: CatalogGroup;
  /** Short description for listings */
  summary: string;
  /** Opening paragraph for product page */
  lede: string;
  /** Body paragraphs */
  body: string[];
  /** Typical job applications */
  jobs: string[];
  /** CTA text for quote block */
  quote: string;
  /** Link to the relevant process page */
  processHref: `/processes/${string}`;
  /** Slugs of related products (validated at build time) */
  related: string[];
};

export const catalog: CatalogItem[] = [
  {
    slug: "s-hooks",
    title: "S-hooks",
    group: "Hooks and rings",
    summary:
      "Heavy S-hooks in 3/8, 7/16, and 1/2 in — hang, lift, and plant hardware, not a 9-gauge store hook.",
    lede: "Two bends, a length, and a load. Open or closed eyes on stock 3/8, 7/16, and 1/2 in coil.",
    body: [
      "An S-hook is a 2D CNC part: feed, two radii, cutoff. Eyes even or offset, length on the print. 1018 or galvanized 1018; 304 when the outdoor spec wants it.",
      "Quotes in this directory are the three stock diameters. If the hook is under 4 mm, the quote will say so.",
    ],
    jobs: [
      "Industrial hang and lift S-hooks",
      "Closed-eye hooks for D-rings and strap hardware",
      "Construction and plant-floor hangers",
      "Galvanized outdoor hooks",
    ],
    quote: "Have an S-hook length and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["d-rings", "lift-hooks", "powder-coating-hooks"],
  },
  {
    slug: "d-rings",
    title: "D-rings",
    group: "Hooks and rings",
    summary:
      "Load-bearing D-rings in 3/8, 7/16, and 1/2 in for tie-down, strap, and frame hardware.",
    lede: "USA made D-rings: a flat span and a round back, formed from stock coil so a strap or a hook stays put.",
    body: [
      "USA made D-rings are a closed form: bend, close, weld at the joint when the print wants a continuous loop. Name inside width, diameter, and whether the joint is welded or butted. Production is Northeast Ohio — not an import catalog ring.",
      "Usual coil is 1018, zinc after form. 304 when the strap lives outside.",
    ],
    jobs: [
      "USA made D-rings for tie-down and strap",
      "Frame and rack hardware",
      "Construction and equipment attachment",
      "Outdoor galvanized rings",
    ],
    quote: "Have a D-ring width and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["s-hooks", "closed-rings", "connecting-links"],
  },
  {
    slug: "closed-rings",
    title: "Closed rings",
    group: "Hooks and rings",
    summary:
      "Round closed rings and O-rings formed and welded in 3/8, 7/16, and 1/2 in coil.",
    lede: "A round loop, closed and usually welded. Stock diameters — not jewelry wire, not a snap ring under 4 mm.",
    body: [
      "Closed rings are 2D CNC plus a weld when the loop has to take load without opening. Inside diameter and wire size are the quote. Resistance or MIG at the joint depending on diameter and alloy.",
      "1018 zinc for plant hardware. 304 for outdoor and washdown.",
    ],
    jobs: [
      "Load rings and hitch rings",
      "Frame and rack loops",
      "O-rings that a strap or hook runs through",
      "Welded rings on a heavier assembly",
    ],
    quote: "Have an inside diameter and a wire size?",
    processHref: "/processes/resistance-welding",
    related: ["d-rings", "eye-forms", "load-loops"],
  },
  {
    slug: "j-hooks",
    title: "J-hooks",
    group: "Hooks and rings",
    summary:
      "Round-wire J-hooks in 3/8, 7/16, and 1/2 in for cable, hose, pipe, and plant hang.",
    lede: "A loop or eye on top, a J below. Round coil — not a rolled-flat catalog hanger.",
    body: [
      "J-hooks in this shop are 2D or 3D CNC from 3/8, 7/16, or 1/2 in wire. Single, double, or stacked carriers when the print calls for them. Zinc, powder, or 316 for mine and outdoor service.",
      "A stamped flat J with a 1 in saddle is a different process. Send it; we will say what we can run in round wire.",
    ],
    jobs: [
      "Cable and hose J-hooks",
      "Side-mount and stacked J-hooks",
      "Mining roof and rib hangers",
      "Plant and utility supports",
    ],
    quote: "Have a J-hook size and a wire diameter?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["cable-hangers", "u-hangers", "hose-hangers"],
  },
  {
    slug: "lift-hooks",
    title: "Lift hooks",
    group: "Hooks and rings",
    summary:
      "Heavy lift and tow hooks in 7/16 and 1/2 in — load-bearing 3D forms, not a light S-hook.",
    lede: "A hook that has to pick something up. Usually 7/16 or 1/2 in, often 3D, often welded to a loop or a plate.",
    body: [
      "Lift hooks sit at the top of the stock band. Inside radius, throat, and a closed or latched eye belong on the print. 1018 or higher-carbon; 304 when corrosion is the spec. MIG or TIG on the closure.",
      "Working load is the buyer’s calculation. We form the geometry and name the alloy.",
    ],
    jobs: [
      "Tow and recovery hooks",
      "Bucket and hoist hooks",
      "Closed-eye lift hooks",
      "Welded hook-and-loop assemblies",
    ],
    quote: "Have a lift-hook print and a load?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["s-hooks", "load-loops", "u-anchors"],
  },
  {
    slug: "gate-hooks",
    title: "Gate hooks",
    group: "Hooks and rings",
    summary:
      "Gate hooks, catch hooks, and fence hardware in 3/8, 7/16, and 1/2 in galvanized or 304.",
    lede: "A hook that holds a gate or a panel. Outdoor coil, stock diameters, 2D or 3D.",
    body: [
      "Gate hardware is usually galvanized 1018 or 304. Eyes, offsets, and a length that matches the post. Formed on 2D CNC; 3D when the catch sits out of plane.",
      "We do not sell a boxed gate kit. We form the hook to the print.",
    ],
    jobs: [
      "Farm and corral gate hooks",
      "Panel and fence catches",
      "Offset hooks for round posts",
      "Stainless outdoor latches",
    ],
    quote: "Have a gate-hook length and a post size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["trailer-latches", "security-mesh-fencing", "eye-forms"],
  },
  {
    slug: "trailer-latches",
    title: "Trailer latches",
    group: "Hooks and rings",
    summary:
      "Wire trailer and gate latches in 3/8, 7/16, and 1/2 in — hoops, catches, and keepers. Not a stamped over-center draw latch.",
    lede: "A latch formed from stock coil. Hoop, catch, or keeper on a trailer gate — not a boxed sheet-metal kit.",
    body: [
      "Trailer latches in this directory are wire: hoop latches, catch loops, formed keepers, and gate-style catches in 3/8, 7/16, and 1/2 in. 2D CNC; 3D when the catch sits out of plane. Galvanized 1018 or 304. A pin or an L-pin through the hoop is a separate SKU.",
      "A stamped over-center draw latch is plate, not coil. Send it; we will say what we can run in round wire instead of quoting a punch press we do not have.",
    ],
    jobs: [
      "Trailer and tailgate hoop latches",
      "Wire catch and keeper forms",
      "Farm-gate and panel latches in stock coil",
      "304 outdoor latch loops",
    ],
    quote: "Have a latch print, a hoop ID, and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["gate-hooks", "l-pins", "handles"],
  },
  {
    slug: "display-hooks",
    title: "Display hooks",
    group: "Hooks and rings",
    summary:
      "Heavy display and peg hooks in 3/8 in — retail and warehouse, not light 9-gauge pegboard wire.",
    lede: "Hooks that hold product on a rack. Stock 3/8 in when the load is real; we will not quote a 0.148 in peg hook as production.",
    body: [
      "Display hooks here are the heavy end: 3/8 in for warehouse and industrial display, 7/16 when the span sags. 2D CNC, zinc or powder after form.",
      "Light retail pegboard wire is under 4 mm. That print gets a no, not a pretend quote.",
    ],
    jobs: [
      "Industrial peg and rack hooks",
      "Warehouse display arms",
      "Powder-coated showroom hooks",
      "Heavy scan-hook geometry in 3/8 in",
    ],
    quote: "Have a display-hook length and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["s-hooks", "powder-coating-hooks", "wire-displays"],
  },
  {
    slug: "powder-coating-hooks",
    title: "Powder-coating hooks",
    group: "Hooks and rings",
    summary:
      "C, S, V, and CV powder coating hooks in 3/8, 7/16, and 1/2 in for hanging parts through a coating line.",
    lede: "Powder coating hooks that carry a part through wash, coat, and cure. Stock coil, custom length and angle — not a bag of 9-gauge C-hooks.",
    body: [
      "Powder coating hooks in this shop are C-hooks, S-hooks, V-hooks, CV-hooks, and 90° hooks, 2D CNC from 3/8, 7/16, or 1/2 in. Length, opening, and point geometry are the print. Bright or mill going into a booth; we also hang our own forms on the in-line powder line — see plating and coating.",
      "V-hooks and 90° V: we buy the steel — it is in the estimate. C, S, and CV: you buy the coil. Steel powder coating hooks for everyday lines. Stainless steel powder coating hooks in 304 / 316 when the washer eats carbon. Light line hooks under 4 mm are a different cell. This directory is the heavy hangers.",
    ],
    jobs: [
      "C-hooks for wide parts",
      "S-hooks for line loading",
      "V-hooks for a settled hang",
      "CV-hooks and 90° hooks, mixed opening",
    ],
    quote: "Have a line-hook style and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["s-hooks", "display-hooks", "handles"],
  },
  {
    slug: "eye-forms",
    title: "Eye forms",
    group: "Hooks and rings",
    summary:
      "Eyes, eyelets, and loop ends in 3/8, 7/16, and 1/2 in — closed on the bender or welded shut.",
    lede: "A round eye on the end of a leg. Stock diameters, 2D or 3D, closed or left open for a later weld.",
    body: [
      "Eye forms are a CNC wrap plus a cutoff. Inside diameter of the eye and the wire size are the quote. Close it on the machine or MIG it shut when the print wants no gap.",
      "Threaded or flattened shanks are a secondary — see end forming.",
    ],
    jobs: [
      "Closed eyes on a straight leg",
      "Offset eyes for a pin or a bolt",
      "Welded eyes on a frame",
      "Eye-and-hook combinations",
    ],
    quote: "Have an eye ID and a wire size?",
    processHref: "/processes/end-forming",
    related: ["closed-rings", "load-loops", "lift-hooks"],
  },
  {
    slug: "load-loops",
    title: "Load loops",
    group: "Hooks and rings",
    summary:
      "Load-bearing loops and bails in 3/8, 7/16, and 1/2 in for lift, hang, and strap points.",
    lede: "A loop that takes a sling or a hook. 3D when it stands off the part; welded when it cannot open.",
    body: [
      "Load loops are 3D CNC or a bent U welded to a rim. Name the inside opening, the wire, and the weld. 7/16 and 1/2 in when the sling is real.",
      "This is not a spring clip. If the function is stored energy, that is a different shop.",
    ],
    jobs: [
      "Basket and tray lift bails",
      "Strap loops on a frame",
      "Hoist loops on a guard",
      "Welded bails on a rim",
    ],
    quote: "Have a loop opening and a wire size?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["eye-forms", "lift-hooks", "heavy-duty-wire-baskets"],
  },
  {
    slug: "cable-hangers",
    title: "Cable hangers",
    group: "Hangers",
    summary:
      "Messenger hangers and multi-loop cable supports in 3/8, 7/16, and 1/2 in for mines, plants, and utility.",
    lede: "Round-wire hangers that hold cable off the floor or under a strand. Stock diameters — not a rolled-flat ring.",
    body: [
      "Hangers here are 2D or 3D CNC from 3/8, 7/16, or 1/2 in. Messenger grip, multi-loop carriers, side-mount. Zinc, powder, or 316. We form round wire; a rolled-flat ring with a stamped saddle is a different process.",
      "Trays are a separate SKU when the run is a welded channel instead of a hanger on a strand.",
    ],
    jobs: [
      "Messenger hangers",
      "Multi-loop carriers",
      "Mining roof and rib hangers",
      "Plant and utility cable supports",
    ],
    quote: "Have a hanger print or a carrier count?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["j-hooks", "solar-hangers", "cable-trays"],
  },
  {
    slug: "solar-hangers",
    title: "Solar hangers",
    group: "Hangers",
    summary:
      "Round-wire hangers for solar rows — messenger and structure hang in 3/8, 7/16, and 1/2 in, 304 or galv.",
    lede: "Hangers under a tracker or a fixed-tilt row. Outdoor coil, stock diameters, CNC so the revision can move.",
    body: [
      "Solar hangers in this shop are round 3/8, 7/16, or 1/2 in: messenger hangers, multi-carrier, structure snap-ons when the geometry is a round-wire form. 1018 galvanized or 304 / 316. Pre-galv that cracks at the bend is the wrong finish for a 25-year array.",
      "We do not sell a patented torque-tube catalog. We form the print in round wire.",
    ],
    jobs: [
      "Messenger hangers along the row",
      "Multi-carrier string and feeder hangers",
      "Structure hangers in round wire",
      "304 / 316 outdoor hangers",
    ],
    quote: "Have a solar hanger print?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["cable-hangers", "j-hooks", "ground-staples"],
  },
  {
    slug: "hose-hangers",
    title: "Hose hangers",
    group: "Hangers",
    summary:
      "Hose and air-line hangers in 3/8, 7/16, and 1/2 in for shops, mines, and plants.",
    lede: "A J or a loop sized to the hose, not the cable. Stock coil, coated or zinc.",
    body: [
      "Hose hangers are J-hooks and loops with a larger throat. 3/8 in for shop air; 7/16 and 1/2 in for mine and plant hose. Plastisol or powder when the spec wants jacket protection — see plating and coating.",
      "Name the hose OD, the hang style, and the wire.",
    ],
    jobs: [
      "Shop air and water hose hangers",
      "Mine and plant hose J-hooks",
      "Double hangers for two lines",
      "Coated hangers for jacket protection",
    ],
    quote: "Have a hose OD and a hang style?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["j-hooks", "pipe-hangers", "u-hangers"],
  },
  {
    slug: "pipe-hangers",
    title: "Pipe hangers",
    group: "Hangers",
    summary:
      "Round-wire pipe hangers and clevis-style loops in 3/8, 7/16, and 1/2 in.",
    lede: "A loop or a U that carries pipe. Stock wire, not a stamped strap hanger from a plumbing catalog.",
    body: [
      "Pipe hangers here are formed round wire: U-hangers, loops, and 3D wraps around a known OD. 3/8 to 1/2 in. Zinc after form, or 304. Threaded rod and a stamped clevis are not this cell — we form the wire piece.",
      "Name pipe OD, hang style, and whether the loop is closed.",
    ],
    jobs: [
      "U-hangers for small pipe",
      "Loop hangers on a messenger",
      "Plant utility pipe supports",
      "304 hangers for washdown",
    ],
    quote: "Have a pipe OD and a hang style?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["u-hangers", "hose-hangers", "j-hooks"],
  },
  {
    slug: "u-hangers",
    title: "U-hangers",
    group: "Hangers",
    summary:
      "U-hangers and U-bolts in 3/8, 7/16, and 1/2 in — two legs, a radius, optional thread or flatten.",
    lede: "A U with a specified inside width. Stock coil, 2D CNC, ends square, threaded, or flattened.",
    body: [
      "U-hangers are 2D CNC: two legs and a radius. Inside width and wire size are the quote. End forming when the legs thread or flatten. 1018 zinc or 304.",
      "A ground staple is a U that goes in dirt. A lifting U-anchor is a U that goes in concrete. This SKU is the hanger and clamp U.",
    ],
    jobs: [
      "Pipe and conduit U-hangers",
      "Clamp U-bolts in wire",
      "Open U-hangers on a beam",
      "Threaded-leg U-forms",
    ],
    quote: "Have a U inside width and a wire size?",
    processHref: "/processes/end-forming",
    related: ["u-anchors", "pipe-hangers", "j-hooks"],
  },
  {
    slug: "heavy-duty-wire-baskets",
    title: "Heavy-duty wire baskets",
    group: "Grids and trays",
    summary:
      "Welded rims and mesh in 3/8, 7/16, and 1/2 in — material handling, harvest, furnace, and facility.",
    lede: "USA made wire baskets: a rim plus a mesh, welded so it carries load. Stock coil — not a chrome display basket.",
    body: [
      "USA made wire baskets are resistance-welded at the intersections, MIG or TIG on corners and mounts. Infill and rim are often different diameters. Name both. 1018 zinc for plant and harvest; 304 for washdown; 330 for USA made heat treat baskets.",
      "This is a welded product, not a bent clip. Furnace work in 330 is USA made heat treat baskets — same cell, different alloy.",
    ],
    jobs: [
      "USA made wire baskets for material handling",
      "Harvest and agriculture USA made wire baskets",
      "Facility and data-center USA made wire baskets",
      "USA made heat treat baskets in 330",
    ],
    quote: "Have a wire basket print?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["mesh-grids", "wire-shelves", "dunnage-inserts"],
  },
  {
    slug: "cable-trays",
    title: "Cable trays",
    group: "Grids and trays",
    summary:
      "Welded wire cable trays in 3/8, 7/16, and 1/2 in for data centers, solar, mining, and plants.",
    lede: "USA made cable trays: welded wire channel — mesh bottom, sidewalls, lip, splices. Stock diameters on the rim and the runners.",
    body: [
      "USA made cable trays run 1018, zinc after weld, in 3/8 or 7/16 in. 1/2 in when the span is structural. 304 when the spec is stainless. Resistance on intersections; MIG on lips and splices. Formed in Northeast Ohio from coil.",
      "Hangers are a separate SKU when the run is a strand instead of a tray.",
    ],
    jobs: [
      "USA made cable trays for AI and data centers",
      "USA made cable trays on solar rows",
      "Mining and plant-floor USA made cable trays",
      "Stainless washdown trays",
    ],
    quote: "Have a tray width and a pitch?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["cable-hangers", "mesh-grids", "partition-grids"],
  },
  {
    slug: "mesh-grids",
    title: "Mesh grids",
    group: "Grids and trays",
    summary:
      "Welded mesh panels in 3/8, 7/16, and 1/2 in — guards, decks, shelves, and infill.",
    lede: "A pitch, a rim, and a weld at every crossing. Stock coil on the border; infill named if it is lighter.",
    body: [
      "Mesh grids are resistance-welded intersections plus a rim. 3/8 in for medium panels; 7/16 and 1/2 in for decks and machine guards. MIG on corners and mounts.",
      "Quotes in 4–14 mm. Lighter infill is called out, not pretended as stock.",
    ],
    jobs: [
      "Machine-guard panels",
      "Deck and walk grids",
      "Shelf infill",
      "Fence and partition panels",
    ],
    quote: "Have a pitch, a rim, and a size?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["machine-guards", "partition-grids", "security-mesh-fencing"],
  },
  {
    slug: "partition-grids",
    title: "Partition grids",
    group: "Grids and trays",
    summary:
      "Welded partition and cage panels in 3/8, 7/16, and 1/2 in for plants, cages, and facilities.",
    lede: "A grid that divides a space. Rim, pitch, and mounts in stock diameters.",
    body: [
      "Partition grids are mesh panels with a heavier rim and mounts for posts or walls. 3/8 and 7/16 in typical; 1/2 in when the span is long. Zinc or powder after weld.",
      "Cage components for agriculture sit next to this SKU. Outdoor fence panels are a separate directory: security mesh fencing.",
    ],
    jobs: [
      "Plant floor partitions",
      "Cage and pen panels",
      "Facility dividers",
      "Welded door and gate grids",
    ],
    quote: "Have a panel size and a pitch?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["mesh-grids", "security-mesh-fencing", "machine-guards"],
  },
  {
    slug: "security-mesh-fencing",
    title: "Security mesh fencing",
    group: "Grids and trays",
    summary:
      "Welded security mesh fence panels in 3/8, 7/16, and 1/2 in — rims, pitch, posts, and gates. Not chain-link roll.",
    lede: "USA made security fencing: a welded panel — rim, mesh, mounts. Stock coil on the border. Pitch named. Galvanized or 304.",
    body: [
      "USA made security fencing here is the same cell as partitions and machine guards: resistance weld on the intersections, MIG on corners, posts, and gate frames. 3/8 in for medium panels; 7/16 and 1/2 in when the span or the hit is real. Infill can be lighter than the rim — name both.",
      "This is not chain-link from a roll, and not a 9-gauge garden fence. Posts, hinges, and latches are formed or welded when they are wire. Bought hardware is named on the quote. Panels ship from Northeast Ohio.",
    ],
    jobs: [
      "USA made security fencing for plant and facility",
      "Yard and compound USA made security fencing",
      "Gate frames with mesh infill",
      "304 or zinc outdoor security mesh",
    ],
    quote: "Have a panel size, a pitch, and a height?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["partition-grids", "mesh-grids", "gate-hooks"],
  },
  {
    slug: "wire-shelves",
    title: "Wire shelves",
    group: "Grids and trays",
    summary:
      "Welded wire shelves in 3/8, 7/16, and 1/2 in — rims, pitch, and mounts, not chrome retail wire.",
    lede: "A shelf that is a grid with a rim. Stock coil, welded, load-bearing.",
    body: [
      "Shelves here are mesh plus rim, same cell as baskets and trays. 3/8 in for light plant shelves; 7/16 and 1/2 in when the span carries parts. Name pitch, rim, and how it mounts.",
      "Chrome display wire under 4 mm is not this directory.",
    ],
    jobs: [
      "Plant and warehouse shelves",
      "Cart and rack decks",
      "Washdown 304 shelves",
      "Heavy parts shelves in 7/16 and 1/2 in",
    ],
    quote: "Have a shelf size and a pitch?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["heavy-duty-wire-baskets", "wire-racks", "dunnage-inserts"],
  },
  {
    slug: "machine-guards",
    title: "Machine guards",
    group: "Grids and trays",
    summary:
      "Welded machine guards in 3/8, 7/16, and 1/2 in — frames, mesh, hinges, and mounts.",
    lede: "A guard that takes a hit, not a look. Stock diameters on the frame; mesh named separately.",
    body: [
      "Machine guards are 2D/3D frames plus welded mesh. 7/16 and 1/2 in for impact; 3/8 in for lighter covers. Resistance on the grid, MIG on the frame. 1018 zinc or 304.",
      "Inside radius follows the design guide, not a sharp CAD corner.",
    ],
    jobs: [
      "Equipment and conveyor covers",
      "Robot-cell and press guards",
      "Hinged access panels",
      "Mining and plant impact guards",
    ],
    quote: "Have a guard print?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["conveyor-guards", "mesh-grids", "fan-guards"],
  },
  {
    slug: "conveyor-guards",
    title: "Conveyor guards",
    group: "Grids and trays",
    summary:
      "Conveyor side guards, return covers, and crossover grids in 3/8, 7/16, and 1/2 in.",
    lede: "Guards that follow a belt. Long frames, welded mesh, stock coil.",
    body: [
      "Conveyor guards are long 2D frames with mesh infill. 3/8 in for side rails; 7/16 and 1/2 in for return covers and crossovers. Mounts and splices are MIG. Zinc after weld.",
      "Name belt width, height, and whether the panel is hinged.",
    ],
    jobs: [
      "Side-rail guards",
      "Return and nip covers",
      "Crossover and walk grids",
      "Mining and plant conveyor panels",
    ],
    quote: "Have a belt width and a guard height?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["machine-guards", "mesh-grids", "fan-guards"],
  },
  {
    slug: "fan-guards",
    title: "Fan guards",
    group: "Grids and trays",
    summary:
      "Fan and blower guards with a 3/8, 7/16, or 1/2 in frame. Mesh infill named — not a 9-gauge residential register.",
    lede: "A heavy frame around the fan. Stock coil on the rim; pitch and infill on the print.",
    body: [
      "Fan guards here are a 2D or 3D frame in 3/8, 7/16, or 1/2 in plus welded mesh when the opening has to be covered. Resistance on the grid, MIG on mounts and rims. 1018 zinc or powder; 304 in wet air.",
      "Residential register wire and light 9-gauge grille are under 4 mm. We will name that instead of quoting them as production. HVAC and equipment fans that need a real frame sit in this directory and under ventilation.",
    ],
    jobs: [
      "Blower and axial fan guards",
      "HVAC intake and discharge screens with a stock-coil frame",
      "Equipment and generator fan covers",
      "304 washdown fan guards",
    ],
    quote: "Have a fan-guard print, a pitch, and a wire size?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["machine-guards", "mesh-grids", "conveyor-guards"],
  },
  {
    slug: "wire-frames",
    title: "Wire frames",
    group: "Frames and hardware",
    summary:
      "2D and 3D wire frames in 3/8, 7/16, and 1/2 in — seats, racks, furniture, and equipment outlines.",
    lede: "A closed or open outline in stock coil. The default 3D CNC job in this shop.",
    body: [
      "Frames are spatial or planar bends in 3/8, 7/16, or 1/2 in. Welded at the joint when the outline closes. 1018, spring steels, or 300-series. This is the part family the rest of the directory hangs off.",
      "Furniture frames live here as contract work and on the furniture line.",
    ],
    jobs: [
      "Seat, rack, and equipment frames",
      "Furniture outlines in 3/8 to 1/2 in",
      "Closed welded frames",
      "3D routing frames",
      "Trellis and outdoor structure frames",
    ],
    quote: "Have a frame print?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["handles", "brackets", "trellis-systems"],
  },
  {
    slug: "trellis-systems",
    title: "Trellis and growing structures",
    group: "Frames and hardware",
    summary:
      "Outdoor trellis and vertical-garden structure wire in 3/8, 7/16, and 1/2 in — frames, panels, and mounts. Not a 9-gauge tomato cage.",
    lede: "USA made wire stakes and trellis frames. Heavy structure plants climb — commercial vertical growing, not garden-center mesh.",
    body: [
      "USA made wire stakes in this shop are 3/8, 7/16, and 1/2 in posts, frames, and row stakes — not imported 9-gauge tomato wire. Imported climber mesh is often 2.5–4.5 mm, at or under our 4 mm floor. What we run is the structure: frames, posts, rims, and wall mounts, with welded mesh infill when the pitch is on the print. 1018 galvanized or 304.",
      "Vertical gardening, espalier, hop and vine rows, green-wall armatures, arbor and screen frames. Light infill is named, not pretended as stock. Ground staples hold fabric at the base; they are a separate SKU.",
    ],
    jobs: [
      "USA made wire stakes for commercial vertical gardens",
      "Espalier and vine / hop row USA made wire stakes",
      "Welded climber panels with a heavy rim",
      "Arbor, screen, and outdoor structure wire",
    ],
    quote: "Have a trellis height, a pitch, and a wire size?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["wire-frames", "security-mesh-fencing", "ground-staples"],
  },
  {
    slug: "handles",
    title: "Handles",
    group: "Frames and hardware",
    summary:
      "Equipment, cart, trailer, and furniture handles in 3/8, 7/16, and 1/2 in — 2D or 3D, welded or bolted.",
    lede: "A grip formed from stock coil. Offset, return, or welded to a frame.",
    body: [
      "Handles are 2D or 3D CNC with a specified offset and grip length. 3/8 in for carts and furniture; 7/16 and 1/2 in for equipment and trailer pulls. Ends welded, flattened, or left as a butt.",
      "1018 zinc, powder, or 304. Trailer latches and L-pins sit next to this SKU when the gate needs a catch as well as a grip.",
    ],
    jobs: [
      "Cart and basket handles",
      "Trailer, tailgate, and gate pulls",
      "Equipment pull handles",
      "Furniture arms and grips",
    ],
    quote: "Have a handle offset and a wire size?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["trailer-latches", "l-pins", "wire-carts"],
  },
  {
    slug: "l-pins",
    title: "L-pins",
    group: "Frames and hardware",
    summary:
      "L-pins in 3/8, 7/16, and 1/2 in — hitch, implement, and trailer lock pins. A 90° bend, a length, a wire size.",
    lede: "An L formed from stock coil. One leg through the hitch, the short leg as the stop. Not a 1/8 in implement pin.",
    body: [
      "An L-pin is 2D CNC: feed, 90°, cutoff. Name the long-leg length, the short-leg length, and the diameter. 3/8 and 7/16 in for implements and lighter hitches; 1/2 in when the receiver wants it. A hole for a clip is drilled or formed when it is on the print. Galvanized 1018 or 304.",
      "5/8 in hitch pins sit above the 14 mm ceiling. The clip that retains the pin is a separate SKU — hitch pin clips. Typical clip wire is under 4 mm; we will name that.",
    ],
    jobs: [
      "Trailer and hitch L-pins in 1/2 in",
      "Implement and ag L-pins in 3/8 and 7/16 in",
      "L-pins with a clip hole",
      "Galvanized or 304 outdoor L-pins",
    ],
    quote: "Have an L-pin length and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["hitch-pin-clips", "trailer-latches", "handles"],
  },
  {
    slug: "pins-and-clips",
    title: "Pins and clips",
    group: "Frames and hardware",
    summary:
      "Hitch pins, linch-style pins, and heavy retainers in 3/8, 7/16, and 1/2 in. Hairpin and R-clips have their own page.",
    lede: "A pin that holds a hitch, a gate, or an implement. Stock diameters.",
    body: [
      "Pins in this directory are formed round wire in 3/8, 7/16, and 1/2 in: hitch pins, straight lock pins, and linch-style pins with a formed head or ring when that ring is in band. 2D CNC. Zinc or 304. L-pins are the same cell with a 90° stop — they have their own directory page.",
      "The clip that retains the pin is a separate SKU: hitch pin clips. A 5/8 in hitch pin is over 14 mm. Send the size; the quote will say which side of the band it sits on.",
    ],
    jobs: [
      "Trailer hitch pins in 1/2 in",
      "Implement and linch-style pins in stock coil",
      "Straight lock pins with a formed head",
      "Heavy retainers in 3/8 to 1/2 in",
    ],
    quote: "Have a pin length, a diameter, and whether it needs a clip?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["hitch-pin-clips", "l-pins", "trailer-latches"],
  },
  {
    slug: "hitch-pin-clips",
    title: "Hitch pin clips",
    group: "Frames and hardware",
    summary:
      "Hairpin, R-clip, and bridge-pin retainers. Typical catalog clips sit under 4 mm — we name that. 3/8, 7/16, and 1/2 in when the print is heavy.",
    lede: "The clip that keeps a hitch pin in the hole. Most store clips are light spring wire. Stock coil when the clip itself is 3/8 to 1/2 in.",
    body: [
      "A hitch pin clip is 2D CNC: two legs and a loop, or a double-loop. Internal, external, and hairpin styles. The pin it retains is a separate SKU. Galvanized 1018 or 304. Spring steels when the print wants snap-back.",
      "The clip that holds a 1/2 in hitch pin is usually 1/8 in wire — under the 4 mm floor. We will name that instead of quoting it as stock production. If the clip itself is 3/8, 7/16, or 1/2 in, it runs here.",
    ],
    jobs: [
      "Heavy R-clips and hairpin retainers in stock coil",
      "Double-loop hitch pin clips in 3/8 to 1/2 in",
      "Implement and gate retainers",
      "Light 1/8 in clips — named, not pretended as stock",
    ],
    quote: "Have a clip style, a pin diameter, and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["pins-and-clips", "l-pins", "hog-rings"],
  },
  {
    slug: "brackets",
    title: "Brackets",
    group: "Frames and hardware",
    summary:
      "Wire brackets and retainers in 3/8, 7/16, and 1/2 in — 2D/3D CNC, not a stamped sheet bracket.",
    lede: "A formed wire that holds something to something else. Stock diameters, holes or welds as specified.",
    body: [
      "Wire brackets are 2D or 3D forms with mounts: flattened pads, welded tabs, or eyes. 3/8 to 1/2 in. We form round wire, not lasered plate.",
      "Construction retainers and equipment mounts sit here.",
    ],
    jobs: [
      "Equipment and tray brackets",
      "Construction retainers",
      "Wall and post mounts",
      "Welded bracket-and-frame assemblies",
    ],
    quote: "Have a bracket print?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["wire-frames", "rebar-supports", "eye-forms"],
  },
  {
    slug: "wire-racks",
    title: "Wire racks",
    group: "Frames and hardware",
    summary:
      "Welded wire racks in 3/8, 7/16, and 1/2 in — frames, shelves, and hooks as one assembly.",
    lede: "USA made wire racks: a frame plus decks plus hooks. Stock coil, CNC, then weld.",
    body: [
      "USA made wire racks combine frames, shelves, and often S-hooks or display hooks. 3/8 in for light plant racks; 7/16 and 1/2 in for parts racks. Resistance and MIG. Zinc or powder. Formed in Northeast Ohio.",
      "Send the assembly, not three unrelated prints.",
    ],
    jobs: [
      "USA made wire racks for parts and tools",
      "Harvest and plant USA made wire racks",
      "Display USA made wire racks in heavy wire",
      "Welded shelf-and-frame units",
    ],
    quote: "Have a rack print?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["wire-shelves", "magazine-racks", "wire-displays"],
  },
  {
    slug: "magazine-racks",
    title: "Magazine racks",
    group: "Frames and hardware",
    summary:
      "Magazine and literature racks in 3/8, 7/16, and 1/2 in — lobby, plant, and showroom, not chrome 9-gauge retail.",
    lede: "Pockets or a grid on a stock-coil frame. Heavy enough to stand in a plant hallway.",
    body: [
      "Magazine racks are 2D/3D frames with welded pockets, rods, or mesh decks. 3/8 in for lobby units; 7/16 when the span is wide or the rack is free-standing. 1018 zinc or powder; 304 for washdown.",
      "Light chrome display wire is under 4 mm. This directory is the frame that does not rack when someone leans on it.",
    ],
    jobs: [
      "Lobby and waiting-room literature racks",
      "Plant and break-room magazine stands",
      "Showroom brochure racks in powder",
      "Wall-mount pocket frames",
    ],
    quote: "Have a pocket count, a height, and a wire size?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["newspaper-racks", "wire-racks", "wire-displays"],
  },
  {
    slug: "newspaper-racks",
    title: "Newspaper racks",
    group: "Frames and hardware",
    summary:
      "Newspaper and periodical racks in 3/8, 7/16, and 1/2 in — outdoor galvanized or 304, not a stamped box.",
    lede: "A public rack in stock coil. Weather, a stack, and a frame that stays square.",
    body: [
      "Newspaper racks are frames plus a shelf or rod stack, often outdoor. 3/8 and 7/16 in typical. Galvanized 1018 or 304. Powder when the color is specified. Welded, not a folded sheet-metal honor box.",
      "If the print is a stamped enclosure with a coin mechanism, send it; we will say what we can run in round wire.",
    ],
    jobs: [
      "Outdoor periodical racks",
      "Indoor newspaper stands",
      "Galvanized street and lobby units",
      "304 coastal racks",
    ],
    quote: "Have a stack height and a wire size?",
    processHref: "/processes/3d-cnc-wire-forming",
    related: ["magazine-racks", "wire-racks", "wire-frames"],
  },
  {
    slug: "wire-displays",
    title: "Wire displays",
    group: "Frames and hardware",
    summary:
      "Display stands, arms, and grids in 3/8, 7/16, and 1/2 in — showroom and warehouse, not 9-gauge pegboard.",
    lede: "A display that is a form. Stock coil, CNC, weld — the same cell as racks and hooks.",
    body: [
      "Wire displays here are frames, grids, and arms in 3/8, 7/16, or 1/2 in. Peg hooks, shelves, and sign loops weld on. 1018 zinc or powder. 304 when the floor is wet.",
      "Light retail pegboard wire is under 4 mm. Industrial and showroom displays that have to take load sit in this directory.",
    ],
    jobs: [
      "Showroom and trade-show stands",
      "Warehouse pick displays",
      "Grid-and-hook merchandisers in heavy wire",
      "Powder-coated branded display frames",
    ],
    quote: "Have a display print and a wire size?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["display-hooks", "magazine-racks", "wire-racks"],
  },
  {
    slug: "wire-carts",
    title: "Wire carts",
    group: "Frames and hardware",
    summary:
      "Welded cart frames, baskets, and handles in 3/8, 7/16, and 1/2 in. Casters are the buyer’s, unless specified.",
    lede: "A rolling frame in stock coil. Baskets, handles, and decks welded on.",
    body: [
      "Carts are frames plus baskets or shelves plus handles. 3/8 and 7/16 in typical. We form and weld the wire. Casters, brakes, and plate bases are named on the quote if we buy them — we do not invent a caster SKU.",
      "1018 zinc or 304 washdown.",
    ],
    jobs: [
      "Parts carts",
      "Harvest and laundry carts",
      "Facility utility carts",
      "304 washdown carts",
    ],
    quote: "Have a cart print?",
    processHref: "/processes/mig-tig-assembly",
    related: ["handles", "heavy-duty-wire-baskets", "carts-and-trolleys"],
  },
  {
    slug: "carts-and-trolleys",
    title: "Carts and trolleys",
    group: "Frames and hardware",
    summary:
      "Industrial carts and trolleys in 3/8, 7/16, and 1/2 in: welded frames, baskets, handles. Casters named on the quote.",
    lede: "A rolling frame from stock coil. Plant carts, line trolleys, and washdown units — not an imported utility cart.",
    body: [
      "Carts and trolleys are the same cell as frames: 2D/3D CNC, resistance weld, MIG. 3/8 and 7/16 in typical; 1/2 in when the deck takes a hit. We form and weld the wire. Casters, brakes, tow bars, and plate bases are line items if we buy them.",
      "1018 zinc or powder for the plant floor. 304 when washdown or food is on the spec. Ohio plants in Cleveland, Columbus, Dayton, and Cincinnati get short-haul freight from the Northeast Ohio cell.",
    ],
    jobs: [
      "Production-line carts and picking trolleys",
      "Heat-treat and furnace carts in heavy wire",
      "304 washdown carts for food and pharma",
      "Tugger-train and tow-bar frames",
    ],
    quote: "Have a cart or trolley print?",
    processHref: "/processes/mig-tig-assembly",
    related: ["wire-carts", "handles", "heavy-duty-wire-baskets"],
  },
  {
    slug: "dunnage-inserts",
    title: "Dunnage inserts",
    group: "Grids and trays",
    summary:
      "Custom wire dunnage inserts that drop into returnable plastic totes — dividers, nests, and part locators in 4–14 mm.",
    lede: "A wire nest for the tote you already own. Formed and welded to the part, not a foam dunnage catalog.",
    body: [
      "Dunnage inserts are CNC-formed wire frames that sit in a standard plastic tote or pallet box. Inside width, nest height, and diameter on the print. 3/8 in typical; 7/16 when the part is heavy. Resistance weld at the joints. The tote is the buyer’s unless the PO says we buy it.",
      "Returnable, stackable, and cheaper than foam that dies in a season. 1018 zinc or 304. Ohio auto and food plants run these as a pair with baskets and carts.",
    ],
    jobs: [
      "Auto and Tier-1 returnable dunnage",
      "Wire dividers for plastic totes",
      "Part locators for wash and assembly",
      "304 inserts for food and medical",
    ],
    quote: "Have a tote size and a part nest?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["heavy-duty-wire-baskets", "partition-grids", "carts-and-trolleys"],
  },
  {
    slug: "bread-racks",
    title: "Bread racks",
    group: "Grids and trays",
    summary:
      "Bakery tray racks and bread racks in 3/8, 7/16, and 1/2 in — casters named, not a chrome residential baker’s rack.",
    lede: "A rolling bakery rack from coil. Tray slides, end frames, and casters as specified. Commercial, not kitchen retail.",
    body: [
      "Bread racks and bakery tray racks are welded wire frames with tray angles or slides on a pitch the bakery already owns. 3/8 and 7/16 in typical. We form the frames and weld. Casters, brakes, and bumper extrusions are named if we supply them.",
      "Zinc or powder for dry bakery. 304 when washdown is the spec. Pair with product displays and carts when the same plant wants a set.",
    ],
    jobs: [
      "Commercial bakery tray racks on casters",
      "Proofing and cooling racks",
      "Retail bread and bun displays",
      "304 washdown bakery racks",
    ],
    quote: "Have a tray size, pitch, and a wire size?",
    processHref: "/processes/mesh-grids-and-cable-trays",
    related: ["wire-racks", "magazine-racks", "wire-displays"],
  },
  {
    slug: "ground-staples",
    title: "Ground staples",
    group: "Frames and hardware",
    summary:
      "U-staples in 3/8, 7/16, and 1/2 in for fabric, cable, erosion, and agriculture. Lighter sod sizes named if they fall below 4 mm.",
    lede: "USA made ground staples: a U that holds fabric, cable, or soil. Heavy production on the three stock diameters.",
    body: [
      "USA made ground staples are 2D CNC plus cutoff. Volume is high, geometry is simple, finish is usually galvanized 1018. 3/8 in and neighbors for erosion, agriculture, and cable that a light sod staple will not hold. Buyers searching USA made ground samples land here — the part is a U-staple from coil, not a soil lab coupon.",
      "If the print is 9-gauge landscape wire under 4 mm, we will say so. Production is Northeast Ohio.",
    ],
    jobs: [
      "USA made ground staples for erosion and landscape fabric",
      "USA made ground samples — U-staples, not soil-lab coupons",
      "Irrigation and cable hold-downs",
      "Agriculture and solar field staples",
    ],
    quote: "Have a staple length and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["trellis-systems", "rebar-supports", "solar-hangers"],
  },
  {
    slug: "rebar-supports",
    title: "Rebar supports",
    group: "Frames and hardware",
    summary:
      "Heavy rebar chairs, spacers, and supports in 3/8, 7/16, and 1/2 in — not 9-gauge masonry clips.",
    lede: "Wire that holds rebar where the pour wants it. Stock diameters. Light 0.148 in positioners are outside the quote band.",
    body: [
      "Rebar supports in this directory are 3/8, 7/16, and 1/2 in chairs, spacers, and heavy positioners. 2D CNC, galvanized or mill. 9-gauge CMU clips and light Z-ties are under 4 mm — we will name that instead of quoting them as production.",
      "Stirrups in these three diameters are the same cell when the print is heavy wire, not a rebar fabricator’s #3 bar.",
    ],
    jobs: [
      "Heavy chairs and spacers",
      "Slab and beam supports in 3/8 to 1/2 in",
      "Galvanized outdoor supports",
      "Custom positioners in stock coil",
    ],
    quote: "Have a support height and a wire size?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["u-anchors", "ground-staples", "u-hangers"],
  },
  {
    slug: "u-anchors",
    title: "U-anchors",
    group: "Frames and hardware",
    summary:
      "Solid-wire U-anchors for precast and poured concrete lift in 3/8, 7/16, and 1/2 in. Not a forged headed anchor, not a wire-rope loop.",
    lede: "A U that is cast in and picked with a hook. Stock coil, two legs, a radius. The load is the buyer’s calculation.",
    body: [
      "A lifting U-anchor here is 2D CNC from 3/8, 7/16, or 1/2 in round wire: inside width, leg length, and diameter on the print. Ends square, flared, or tied to a spreader when that is specified. Galvanized 1018 or 304. Working load is the buyer’s — we form the geometry and name the alloy.",
      "A double-headed U-anchor with forged spherical feet is a forge, not this cell. A cast-in loop of stranded rope with a swaged ferrule is a sling shop. Catalog 5-ton and 10-ton headed anchors in 20 mm and 26 mm sit over the 14 mm ceiling. Send the size; the quote will say which side of the band it sits on.",
    ],
    jobs: [
      "Precast panel and vault U-loops in 1/2 in",
      "Poured-in lifting Us in 3/8 and 7/16 in",
      "U-anchors with a welded spreader",
      "Galvanized or 304 embedment Us",
    ],
    quote: "Have a U width, a leg length, a wire size, and a load?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["u-hangers", "lift-hooks", "rebar-supports"],
  },
  {
    slug: "connecting-links",
    title: "Connecting links",
    group: "Frames and hardware",
    summary:
      "Connecting links and chain-style loops in 3/8, 7/16, and 1/2 in, formed and welded.",
    lede: "A link that joins two things. Stock coil, closed, usually welded.",
    body: [
      "Connecting links are closed forms in 3/8, 7/16, or 1/2 in. Oval or round, welded at the joint. Not a stamped quick-link from a hardware bin, and not a chain mill’s proof-coil run.",
      "Name inside length, wire, and whether the joint is welded.",
    ],
    jobs: [
      "Welded connecting links",
      "Strap-to-hook links",
      "Repair and joiners in heavy wire",
      "304 outdoor links",
    ],
    quote: "Have a link inside length and a wire size?",
    processHref: "/processes/resistance-welding",
    related: ["closed-rings", "d-rings", "hog-rings"],
  },
  {
    slug: "hog-rings",
    title: "Hog rings",
    group: "Frames and hardware",
    summary:
      "Hog rings and C-rings in 3/8, 7/16, and 1/2 in for fencing, bags, and cages. 9-gauge upholstery rings sit under 4 mm and get named.",
    lede: "A C that closes on a fence, a bag, or a cage. Stock coil when the ring is heavy. Light upholstery hog rings are a different size.",
    body: [
      "A hog ring is 2D CNC: a C or an open ring, cutoff, sometimes a point. 3/8, 7/16, and 1/2 in for industrial bag close, heavy fence, and cage ties. Galvanized 1018, copper-coated when specified, or 304. Closed on the job, not welded in the shop unless the print says so.",
      "Fence and upholstery hog rings in 9–16 gauge are under 4 mm. We will name that instead of quoting them as stock production. Send the open gap, the wire size, and whether the ends are pointed.",
    ],
    jobs: [
      "Industrial bag and bale hog rings in 3/8 to 1/2 in",
      "Heavy fence and cage C-rings",
      "Copper-coated or galvanized outdoor rings",
      "9-gauge upholstery rings — named, not stocked as production",
    ],
    quote: "Have an open gap, a wire size, and whether the ends are pointed?",
    processHref: "/processes/2d-cnc-wire-forming",
    related: ["connecting-links", "hitch-pin-clips", "ground-staples"],
  },
];

const bySlug = new Map(catalog.map((item) => [item.slug, item]));

export function getCatalogItem(slug: string) {
  return bySlug.get(slug);
}

export function catalogByGroup() {
  return catalogGroups.map((group) => ({
    group,
    items: catalog.filter((item) => item.group === group),
  }));
}
