export type CncShape =
  | "robomac"
  | "dual"
  | "ftx"
  | "table2d"
  | "transfer"
  | "twin"
  | "slide"
  | "coiler";

export type CncKind = "3d" | "2d" | "transfer" | "slide";

export type CncModel = {
  slug: string;
  name: string;
  kind: CncKind;
  shape: CncShape;
  tagline: string;
  body: string[];
  wire: string;
  axes: string;
  jobs: string[];
};

export type CncOem = {
  slug: string;
  name: string;
  country: string;
  hq: string;
  site: string;
  summary: string;
  models: CncModel[];
};

export const CNC_HUB = "/equipment/cnc-manufacturers";

/** Ten OEMs × six catalog models. Specs are typical published ranges — confirm with the dealer. */
export const CNC_OEMS: CncOem[] = [
  {
    slug: "numalliance",
    name: "Numalliance",
    country: "France",
    hq: "Saint-Michel-sur-Meurthe",
    site: "https://www.numalliance.com",
    summary:
      "Full-electric 2D/3D wire, tube, and flat-stock CNC. Nine heritage brands under one banner. USA Wire Form runs a Robomac 214TF in Northeast Ohio.",
    models: [
      {
        slug: "robomac-214tf",
        name: "Robomac 214TF",
        kind: "3d",
        shape: "robomac",
        tagline: "The floor cell at USA Wire Form — 4–14 mm 3D from coil.",
        body: [
          "Head orbits the wire. Coil in, form out. 3/8, 7/16, and 1/2 in stock on this cell. Hydraulic TF frame, 19 in program, simulation before the first part.",
          "We quote production on this machine. A dealer lead on this page is still a dealer lead — we do not sell Numalliance iron.",
        ],
        wire: "2–16 mm class (our band 4–14 mm)",
        axes: "CNC TF, 1–3 heads",
        jobs: ["Frames", "Baskets", "Guards", "Hangers"],
      },
      {
        slug: "robomac-e-motion",
        name: "Robomac e-Motion",
        kind: "3d",
        shape: "robomac",
        tagline: "Full-electric TF DNA. Faster cycle, no hydraulic pack.",
        body: [
          "Same orbit-head idea as the TF, all electric. Lighter diameter band than a 214TF. Remote assist on the OEM network.",
          "Shops that want energy and no oil pick e-Motion. Heavy 1/2 in still wants the TF / TFE class.",
        ],
        wire: "2–12 mm class",
        axes: "Full electric, 1–3 heads",
        jobs: ["Clips", "Brackets", "Medical forms", "Display hooks"],
      },
      {
        slug: "ftx-10",
        name: "FTX 10",
        kind: "3d",
        shape: "ftx",
        tagline: "Slip-free double bend. Head moves around the stock.",
        body: [
          "FTX is the double-bend cell. Seven digital axes. Tooling swap in minutes. 3–16 mm class at 600 N/mm².",
          "Salco-style FTX10 shops run this family. We still form 4–14 mm on the 214TF — different cell, same OEM.",
        ],
        wire: "3–16 mm class",
        axes: "7 digital axes",
        jobs: ["Automotive frames", "Double-bend clips", "Heavy brackets"],
      },
      {
        slug: "robomac-tfe",
        name: "Robomac TFE",
        kind: "3d",
        shape: "robomac",
        tagline: "Electric drive, heavy wire. Two heads standard.",
        body: [
          "TFE sits between e-Motion and a full hydraulic TF for 4–16 mm. Two heads. Auto-correct from 3D measure if the cell is optioned.",
        ],
        wire: "4–16 mm class",
        axes: "7 axes, 2 heads",
        jobs: ["Heavy frames", "Ag forms", "Basket rims"],
      },
      {
        slug: "f2d",
        name: "F2D",
        kind: "2d",
        shape: "table2d",
        tagline: "Planar frames to 800 mm. Optional weld on the table.",
        body: [
          "2D from coil. Support table for large loops. Weld parameters ride with the program if the weld option is on.",
        ],
        wire: "3–12 mm class",
        axes: "2D CNC + table",
        jobs: ["Seat frames", "Guard outlines", "Display rectangles"],
      },
      {
        slug: "frx",
        name: "FRX",
        kind: "3d",
        shape: "coiler",
        tagline: "Spring coil and open 3D on one robotized arm.",
        body: [
          "Infinite rotation arm, no torsion on the wire. FRX04 / FRX06. Optional laser on the coil. Light wire — not our 4–14 mm production band.",
        ],
        wire: "0.8–6 mm class",
        axes: "Robotized arm",
        jobs: ["Springs", "Leads", "Small 3D clips"],
      },
    ],
  },
  {
    slug: "wafios",
    name: "WAFIOS",
    country: "Germany",
    hq: "Reutlingen",
    site: "https://www.wafios.com",
    summary:
      "Wire, tube, and spring CNC from Reutlingen. BM / BMZ bent parts, FMU, transfer BQ, and coiling FUL. North America: WAFIOS Machinery Corp.",
    models: [
      {
        slug: "bmz-6",
        name: "BMZ 6",
        kind: "3d",
        shape: "robomac",
        tagline: "Universal CNC for small bent parts.",
        body: [
          "BMZ is the compact bent-part cell. Small wire, high mix. Programming is WAFIOS WPS — not a Robomac screen.",
        ],
        wire: "Small-wire CNC class",
        axes: "CNC bent-part",
        jobs: ["Clips", "Links", "Small 3D forms"],
      },
      {
        slug: "bm-series",
        name: "BM series",
        kind: "3d",
        shape: "ftx",
        tagline: "Bent-part CNC up through heavier BM frames.",
        body: [
          "BM is the workhorse bent-component line. Diameter steps up through the series. Confirm the exact BM number with the dealer — BM 60 is not a BMZ 6.",
        ],
        wire: "Light to medium bent parts",
        axes: "CNC BM",
        jobs: ["Automotive bent parts", "Furniture wire", "Industrial forms"],
      },
      {
        slug: "fmu",
        name: "FMU",
        kind: "2d",
        shape: "table2d",
        tagline: "CNC wire bending, planar and stepped 2D.",
        body: [
          "FMU is the 2D / universal bender in the WAFIOS book. Frames and hooks that live in a plane.",
        ],
        wire: "2D CNC class",
        axes: "CNC FMU",
        jobs: ["2D frames", "Hooks", "Guards"],
      },
      {
        slug: "bq-10",
        name: "BQ 10",
        kind: "transfer",
        shape: "transfer",
        tagline: "Modular transfer bending. Volume, not a prototype cell.",
        body: [
          "Transfer stations. High volume once the tool is proven. Different economics than a 3D CNC program change.",
        ],
        wire: "Transfer class",
        axes: "Modular transfer",
        jobs: ["High-volume clips", "Repeat bent parts"],
      },
      {
        slug: "ful",
        name: "FUL",
        kind: "3d",
        shape: "coiler",
        tagline: "CNC spring coiling in the WAFIOS spring catalog.",
        body: [
          "Coiling, not a 4–14 mm frame cell. Compression, extension, torsion — dealer quotes the FUL size.",
        ],
        wire: "Spring wire class",
        axes: "CNC coiler",
        jobs: ["Compression springs", "Torsion springs"],
      },
      {
        slug: "bt-series",
        name: "BT series",
        kind: "3d",
        shape: "twin",
        tagline: "Twin / tube-adjacent CNC in the WAFIOS bent family.",
        body: [
          "BT sits with WAFIOS bent and tube cells. Confirm wire vs tube version with the dealer. Not our 214TF.",
        ],
        wire: "Bent / tube class",
        axes: "CNC BT",
        jobs: ["Bent components", "Hybrid wire-tube"],
      },
    ],
  },
  {
    slug: "aim",
    name: "AIM Inc.",
    country: "USA",
    hq: "United States",
    site: "https://aimmachines.com",
    summary:
      "U.S. CNC wire benders. AFM 3D line, Gemini twin-head, 2D and multi-axis cells. Dealer and factory support from AIM, not a European import desk.",
    models: [
      {
        slug: "afm-3d",
        name: "AFM-3D",
        kind: "3d",
        shape: "robomac",
        tagline: "AIM’s 3D CNC from coil. Servo axis count is the quote.",
        body: [
          "AFM-3D is the AIM three-dimensional former. Programming is AIM’s graphic environment with collision checks on current software.",
        ],
        wire: "3D CNC class (confirm diameter)",
        axes: "Multi-servo 3D",
        jobs: ["3D forms", "Frames", "Hooks"],
      },
      {
        slug: "gemini-twin",
        name: "Gemini Twin",
        kind: "3d",
        shape: "twin",
        tagline: "Twin 3D heads. Independent or single-head mode. 24-axis class.",
        body: [
          "Gemini is AIM’s twin-head announcement cell: independent twin-3D, off-plane 2D/3D, gantry pick-and-place. Zero minimum center-clamp length is the AIM claim — confirm on the quote.",
        ],
        wire: "Twin-head 3D class",
        axes: "Up to 24 servo",
        jobs: ["Symmetrical frames", "Long forms", "Twin-end parts"],
      },
      {
        slug: "af-2d",
        name: "AF-2D",
        kind: "2d",
        shape: "table2d",
        tagline: "Planar AIM bender. Frames and hooks in one plane.",
        body: [
          "2D from coil. Cheaper cell than Gemini. If the print is planar, do not buy 24 axes.",
        ],
        wire: "2D CNC class",
        axes: "2D servo",
        jobs: ["2D frames", "Display wire", "Guards"],
      },
      {
        slug: "scs",
        name: "SCS",
        kind: "3d",
        shape: "robomac",
        tagline: "AIM straight-cut-and-form class cell.",
        body: [
          "Straighten, cut, form. AIM books this next to AFM. Diameter and axis count on the dealer sheet.",
        ],
        wire: "Cut-and-form class",
        axes: "CNC SCS",
        jobs: ["Cut-to-length forms", "Simple 3D"],
      },
      {
        slug: "multi-axis",
        name: "Multi-axis AIM",
        kind: "3d",
        shape: "ftx",
        tagline: "High axis-count AIM cell for shops that already run AFM.",
        body: [
          "AIM sells one-to-twenty-four servo configurations. This page is the high-axis inquiry — tell the dealer the print, not a guess.",
        ],
        wire: "Application-driven",
        axes: "High servo count",
        jobs: ["Complex 3D", "Short-run CNC"],
      },
      {
        slug: "twin-head-standard",
        name: "Twin-head AIM",
        kind: "3d",
        shape: "dual",
        tagline: "Two-head AIM without the full Gemini option list.",
        body: [
          "Twin head for long and symmetric parts. Center clamp distance is the print constraint. Gemini is the newer named twin.",
        ],
        wire: "Twin-head class",
        axes: "Dual head CNC",
        jobs: ["Headrests", "Handles", "Long frames"],
      },
    ],
  },
  {
    slug: "itaya",
    name: "Itaya Engineering",
    country: "Japan",
    hq: "Japan",
    site: "https://www.itaya-eng.co.jp",
    summary:
      "Japanese CNC wire formers. TF / VF families, 3D from coil, known in North America through dealers. Tight process, different HMI than Numalliance.",
    models: [
      {
        slug: "tf-series",
        name: "TF series",
        kind: "3d",
        shape: "robomac",
        tagline: "Itaya 3D CNC former. TF is the named 3D line.",
        body: [
          "TF is the Itaya three-dimensional bender most U.S. shops mean. Diameter steps in the TF book. Programming is Itaya, not Robomac.",
        ],
        wire: "3D CNC class",
        axes: "CNC TF",
        jobs: ["3D forms", "Automotive wire", "Appliance forms"],
      },
      {
        slug: "vf-series",
        name: "VF series",
        kind: "3d",
        shape: "ftx",
        tagline: "Itaya VF — forming variants in the same family.",
        body: [
          "VF sits beside TF in the Itaya catalog. Confirm 2D vs 3D on the quote. Dealer names the exact VF number.",
        ],
        wire: "Forming class",
        axes: "CNC VF",
        jobs: ["Forms", "Clips", "Frames"],
      },
      {
        slug: "3d-cnc",
        name: "Itaya 3D CNC",
        kind: "3d",
        shape: "robomac",
        tagline: "Generic 3D inquiry when the TF number is not known yet.",
        body: [
          "Use this page if you have an Itaya print and no model plate. The dealer will map diameter and axes.",
        ],
        wire: "Confirm with dealer",
        axes: "3D CNC",
        jobs: ["Custom 3D", "Import replacement"],
      },
      {
        slug: "2d-cnc",
        name: "Itaya 2D CNC",
        kind: "2d",
        shape: "table2d",
        tagline: "Planar Itaya cell.",
        body: [
          "2D from coil. Do not specify a TF if every bend is in one plane.",
        ],
        wire: "2D class",
        axes: "2D CNC",
        jobs: ["Planar frames", "Hooks"],
      },
      {
        slug: "spring-former",
        name: "Itaya spring former",
        kind: "3d",
        shape: "coiler",
        tagline: "Coiling / spring side of the Itaya book.",
        body: [
          "Springs, not 4–14 mm frames. Different tooling than a TF 3D former.",
        ],
        wire: "Spring class",
        axes: "CNC coiler",
        jobs: ["Springs", "Wire rings"],
      },
      {
        slug: "twin-head",
        name: "Itaya twin head",
        kind: "3d",
        shape: "dual",
        tagline: "Two-head Itaya for long or symmetric parts.",
        body: [
          "Twin head for length and symmetry. Center distance on the print.",
        ],
        wire: "Twin-head class",
        axes: "Dual head",
        jobs: ["Long forms", "Symmetric frames"],
      },
    ],
  },
  {
    slug: "bihler",
    name: "Otto Bihler Maschinenfabrik",
    country: "Germany",
    hq: "Haltenbergstetten",
    site: "https://www.bihler.de",
    summary:
      "Stamp-and-form, GRM, RM, BIMERIC. Servo NC, not a 3D orbit-head CNC. Fourslide economics: cam or NC tool, then volume. Different cell than a Robomac.",
    models: [
      {
        slug: "grm-nc",
        name: "GRM-NC",
        kind: "slide",
        shape: "slide",
        tagline: "Servo GRM. Stamp, form, assemble. NC instead of a full mechanical cam.",
        body: [
          "GRM-NC is Bihler’s servo stamping-forming platform. Strip or wire depending on the tool. NRE is a Bihler tool, not a CNC program.",
        ],
        wire: "Strip / wire per tool",
        axes: "Servo GRM-NC",
        jobs: ["Clips", "Stamp-form", "Assemblies"],
      },
      {
        slug: "bimeric",
        name: "BIMERIC",
        kind: "slide",
        shape: "transfer",
        tagline: "Modular servo production. Stations in a line.",
        body: [
          "BIMERIC is the modular Bihler cell. Welding, tapping, assembly in-line. Quote is a system, not a single head.",
        ],
        wire: "System class",
        axes: "Modular servo",
        jobs: ["Assemblies", "Welded forms", "High volume"],
      },
      {
        slug: "rm-40",
        name: "RM 40",
        kind: "slide",
        shape: "slide",
        tagline: "Classic RM mechanical / NC forming press class.",
        body: [
          "RM is the Bihler radial / forming machine shops already know. Tooling is the product. Cycle time is not a Robomac comparison.",
        ],
        wire: "RM class",
        axes: "RM",
        jobs: ["Fourslide-class parts", "Stamp-form"],
      },
      {
        slug: "grm-80",
        name: "GRM 80",
        kind: "slide",
        shape: "slide",
        tagline: "Larger GRM frame for heavier strip and form.",
        body: [
          "Bigger GRM. Confirm strip width and wire with Bihler. Not a 4–14 mm 3D CNC.",
        ],
        wire: "Heavier GRM class",
        axes: "GRM 80",
        jobs: ["Heavier clips", "Stamp-form"],
      },
      {
        slug: "nc-1",
        name: "Bihler NC",
        kind: "slide",
        shape: "slide",
        tagline: "NC control inquiry when the plate is VariControl / NC.",
        body: [
          "VariControl and NC packages on Bihler iron. The machine is still a stamp-form, not an orbit-head former.",
        ],
        wire: "Per tool",
        axes: "NC / VariControl",
        jobs: ["Servo stamp-form"],
      },
      {
        slug: "rm-nc",
        name: "RM-NC",
        kind: "slide",
        shape: "slide",
        tagline: "RM with servo NC. Mechanical heritage, NC feed.",
        body: [
          "RM-NC for shops converting cam tools to servo. Still Bihler NRE.",
        ],
        wire: "RM class",
        axes: "RM-NC",
        jobs: ["Converted cam tools", "Volume forms"],
      },
    ],
  },
  {
    slug: "blm-group",
    name: "BLM GROUP",
    country: "Italy",
    hq: "Cantù",
    site: "https://www.blmgroup.com",
    summary:
      "Tube and wire CNC. E-TURN, ELECT, SMART, 4-RUNNER. Stronger on tube; wire cells exist. VGP3D programming. North American offices.",
    models: [
      {
        slug: "e-turn",
        name: "E-TURN",
        kind: "3d",
        shape: "ftx",
        tagline: "All-electric right/left tube and wire bend. No mandrel on wire jobs.",
        body: [
          "E-TURN is the BLM in-process right-and-left bender. Tube is the headline. Wire jobs are dealer-confirmed.",
        ],
        wire: "Tube / wire per spec",
        axes: "All-electric E-TURN",
        jobs: ["3D tube", "Wire if spec’d"],
      },
      {
        slug: "elect",
        name: "ELECT",
        kind: "3d",
        shape: "robomac",
        tagline: "All-electric CNC bender. ELECT 80 and siblings.",
        body: [
          "ELECT is BLM’s electric CNC bender family. Diameter and plane count on the quote.",
        ],
        wire: "ELECT class",
        axes: "All-electric CNC",
        jobs: ["CNC bends", "Multi-plane"],
      },
      {
        slug: "smart",
        name: "SMART",
        kind: "3d",
        shape: "robomac",
        tagline: "Compact BLM electric bender.",
        body: [
          "SMART is the smaller BLM electric cell. Entry vs E-TURN. Confirm wire vs tube.",
        ],
        wire: "Compact class",
        axes: "Electric SMART",
        jobs: ["Short parts", "Job shop CNC"],
      },
      {
        slug: "4-runner",
        name: "4-RUNNER",
        kind: "3d",
        shape: "transfer",
        tagline: "Coil-fed end-forming and bend line.",
        body: [
          "4-RUNNER is coil to finished bent/end-formed part. Not a Robomac orbit head. Process is BLM’s line.",
        ],
        wire: "Coil-fed class",
        axes: "4-RUNNER line",
        jobs: ["End-formed wire", "Coil-to-part"],
      },
      {
        slug: "dh4010",
        name: "DH4010",
        kind: "3d",
        shape: "dual",
        tagline: "Double-head BLM-class bender inquiry.",
        body: [
          "Double-head geometry. Map the exact BLM plate with the dealer. Twin ends, long parts.",
        ],
        wire: "Double-head class",
        axes: "DH",
        jobs: ["Long bends", "Symmetric"],
      },
      {
        slug: "vgp3d-cell",
        name: "VGP3D cell",
        kind: "3d",
        shape: "ftx",
        tagline: "Programming environment as the inquiry — any BLM bender running VGP3D.",
        body: [
          "If the shop already runs VGP3D, this page is the ‘add a cell’ lead. Name the existing machine in notes.",
        ],
        wire: "Existing BLM class",
        axes: "VGP3D",
        jobs: ["Second cell", "Same software"],
      },
    ],
  },
  {
    slug: "simplex-rapid",
    name: "Simplex Rapid",
    country: "Italy",
    hq: "Italy",
    site: "https://www.simplexrapid.it",
    summary:
      "Italian spring and wire CNC. Coilers, torsion, and forming machines. Different from a 3D orbit-head frame cell.",
    models: [
      {
        slug: "cnc-coiler",
        name: "CNC coiler",
        kind: "3d",
        shape: "coiler",
        tagline: "Spring coiling CNC. Compression and extension.",
        body: [
          "Coiler, not a basket frame machine. Pitch, diameter, and tensile on the quote.",
        ],
        wire: "Spring class",
        axes: "CNC coiler",
        jobs: ["Compression springs", "Extension springs"],
      },
      {
        slug: "torsion-cnc",
        name: "Torsion CNC",
        kind: "3d",
        shape: "coiler",
        tagline: "Torsion spring CNC.",
        body: [
          "Legs and coils in one program. Still spring wire, not 7/16 in frames.",
        ],
        wire: "Torsion class",
        axes: "Torsion CNC",
        jobs: ["Torsion springs", "Leg springs"],
      },
      {
        slug: "wire-former",
        name: "Wire former",
        kind: "3d",
        shape: "robomac",
        tagline: "Simplex Rapid forming CNC beside the coiler line.",
        body: [
          "Forming attachment / former. Confirm 2D vs 3D. Dealer maps the model plate.",
        ],
        wire: "Former class",
        axes: "CNC former",
        jobs: ["Wire forms", "Clips"],
      },
      {
        slug: "2d-former",
        name: "2D former",
        kind: "2d",
        shape: "table2d",
        tagline: "Planar Simplex Rapid former.",
        body: [
          "2D hooks and frames. Do not spec a coiler.",
        ],
        wire: "2D class",
        axes: "2D CNC",
        jobs: ["Hooks", "2D clips"],
      },
      {
        slug: "multi-axis-spring",
        name: "Multi-axis spring CNC",
        kind: "3d",
        shape: "ftx",
        tagline: "High-axis spring cell for complex legs and coils.",
        body: [
          "When the torsion machine is not enough axes. Notes field: send the spring drawing.",
        ],
        wire: "Complex spring class",
        axes: "Multi-axis",
        jobs: ["Complex springs", "Double torsion"],
      },
      {
        slug: "strip-former",
        name: "Strip former",
        kind: "slide",
        shape: "slide",
        tagline: "Flat-stock / strip forming if in the Simplex book.",
        body: [
          "Strip, not round wire. Confirm the machine forms strip before the PO.",
        ],
        wire: "Strip class",
        axes: "Strip CNC",
        jobs: ["Flat forms", "Clips from strip"],
      },
    ],
  },
  {
    slug: "pave",
    name: "Pave Engineering",
    country: "Italy",
    hq: "Italy",
    site: "https://www.pave.it",
    summary:
      "Italian CNC wire bending. 2D and 3D from coil. Dealer network for North America. Different HMI than Numalliance and WAFIOS.",
    models: [
      {
        slug: "3d-cnc",
        name: "Pave 3D CNC",
        kind: "3d",
        shape: "robomac",
        tagline: "Pave three-dimensional former from coil.",
        body: [
          "3D orbit / multi-axis Pave cell. Diameter on the dealer sheet. Programming is Pave.",
        ],
        wire: "3D class",
        axes: "3D CNC",
        jobs: ["3D forms", "Frames"],
      },
      {
        slug: "2d-cnc",
        name: "Pave 2D CNC",
        kind: "2d",
        shape: "table2d",
        tagline: "Planar Pave bender.",
        body: [
          "2D from coil. Table or free 2D depending on model.",
        ],
        wire: "2D class",
        axes: "2D CNC",
        jobs: ["Planar frames", "Hooks"],
      },
      {
        slug: "twin-head",
        name: "Pave twin head",
        kind: "3d",
        shape: "dual",
        tagline: "Two-head Pave for long parts.",
        body: [
          "Twin head. Center clamp on the print.",
        ],
        wire: "Twin-head class",
        axes: "Dual head",
        jobs: ["Long forms", "Symmetric"],
      },
      {
        slug: "heavy-wire",
        name: "Pave heavy wire",
        kind: "3d",
        shape: "ftx",
        tagline: "Heavier Pave former — confirm vs 4–14 mm.",
        body: [
          "If the print is 8–16 mm class, this is the inquiry. Our production is 4–14 mm on a 214TF, not a Pave.",
        ],
        wire: "Heavy class",
        axes: "Heavy 3D",
        jobs: ["Heavy frames", "Guards"],
      },
      {
        slug: "compact",
        name: "Pave compact",
        kind: "3d",
        shape: "robomac",
        tagline: "Small-footprint Pave cell.",
        body: [
          "Job-shop footprint. Light to medium wire.",
        ],
        wire: "Compact class",
        axes: "Compact CNC",
        jobs: ["Job shop", "Prototypes + production"],
      },
      {
        slug: "robot-tend",
        name: "Pave cell + robot",
        kind: "3d",
        shape: "transfer",
        tagline: "Former with robot load/unload inquiry.",
        body: [
          "Cell, not a standalone head. Robot make is the dealer package.",
        ],
        wire: "Cell class",
        axes: "CNC + robot",
        jobs: ["Untended runs", "Bin pick"],
      },
    ],
  },
  {
    slug: "fortuna",
    name: "Fortuna Spezialmaschinen",
    country: "Germany",
    hq: "Germany",
    site: "https://www.fortuna-maschinen.de",
    summary:
      "German special machines for wire. Forming, welding, and lines. More special-purpose than a catalog Robomac. Dealer quotes the actual Fortuna type.",
    models: [
      {
        slug: "wire-former",
        name: "Fortuna wire former",
        kind: "3d",
        shape: "robomac",
        tagline: "Fortuna CNC / special former.",
        body: [
          "Special machine. Send the part. Fortuna sizes the cell. Not a shelf SKU.",
        ],
        wire: "Per project",
        axes: "Special CNC",
        jobs: ["Special forms", "Lines"],
      },
      {
        slug: "2d-former",
        name: "Fortuna 2D former",
        kind: "2d",
        shape: "table2d",
        tagline: "Planar Fortuna former.",
        body: [
          "2D frames and grids. Confirm weld options.",
        ],
        wire: "2D class",
        axes: "2D",
        jobs: ["Frames", "Grids"],
      },
      {
        slug: "weld-line",
        name: "Fortuna weld line",
        kind: "transfer",
        shape: "transfer",
        tagline: "Form + resistance weld in one Fortuna line.",
        body: [
          "Line inquiry. Baskets and grids that leave welded. Different from a standalone CNC.",
        ],
        wire: "Line class",
        axes: "Form + weld",
        jobs: ["Welded baskets", "Grids"],
      },
      {
        slug: "mesh-welder",
        name: "Fortuna mesh welder",
        kind: "transfer",
        shape: "transfer",
        tagline: "Mesh welding special machine.",
        body: [
          "Mesh, not a 3D orbit head. Pitch and wire on the print.",
        ],
        wire: "Mesh class",
        axes: "Mesh weld",
        jobs: ["Welded mesh", "Panels"],
      },
      {
        slug: "ring-former",
        name: "Fortuna ring former",
        kind: "2d",
        shape: "coiler",
        tagline: "Rings and hoops.",
        body: [
          "Closed rings. Butt weld optional. Not a 3D clip machine.",
        ],
        wire: "Ring class",
        axes: "Ring former",
        jobs: ["Rings", "Hoops"],
      },
      {
        slug: "custom-cell",
        name: "Fortuna custom cell",
        kind: "3d",
        shape: "ftx",
        tagline: "Turnkey special. Notes field is the spec.",
        body: [
          "If no catalog model fits, this is the lead. Attach the STEP in notes by email after submit.",
        ],
        wire: "Custom",
        axes: "Turnkey",
        jobs: ["Turnkey lines", "Specials"],
      },
    ],
  },
  {
    slug: "whitelegg",
    name: "Whitelegg Machines",
    country: "United Kingdom",
    hq: "Crawley",
    site: "https://www.whitelegg.com",
    summary:
      "UK wire forming, straightening, and coil equipment. CNC formers and decoilers. Commonwealth and U.S. dealer quotes.",
    models: [
      {
        slug: "cnc-former",
        name: "Whitelegg CNC former",
        kind: "3d",
        shape: "robomac",
        tagline: "Whitelegg CNC wire former.",
        body: [
          "UK CNC former. Diameter and 2D/3D on the quote. Different spare-parts channel than Numalliance.",
        ],
        wire: "CNC class",
        axes: "CNC former",
        jobs: ["Forms", "Hooks", "Frames"],
      },
      {
        slug: "2d-cnc",
        name: "Whitelegg 2D CNC",
        kind: "2d",
        shape: "table2d",
        tagline: "Planar Whitelegg bender.",
        body: [
          "2D from coil. Straighten-and-bend packages exist on the same brand.",
        ],
        wire: "2D class",
        axes: "2D CNC",
        jobs: ["2D frames", "Guards"],
      },
      {
        slug: "straightener",
        name: "Whitelegg straightener",
        kind: "2d",
        shape: "table2d",
        tagline: "Straighten and cut. Not a 3D former.",
        body: [
          "Decoil, straighten, cut-to-length. Feed for a former or for rod. We cut-to-length through 14 mm on our cell — this page is the OEM straightener lead.",
        ],
        wire: "Straighten class",
        axes: "Straighten / cut",
        jobs: ["Cut-to-length", "Rod"],
      },
      {
        slug: "decoiler",
        name: "Whitelegg decoiler",
        kind: "2d",
        shape: "transfer",
        tagline: "Payoff / decoiler for a CNC cell.",
        body: [
          "Coil handling. Match pay-off to the former’s feed. Heavy coil for 4–14 mm is a different reel than a spring decoiler.",
        ],
        wire: "Coil handling",
        axes: "Payoff",
        jobs: ["Payoff", "Coil cars"],
      },
      {
        slug: "ring-roller",
        name: "Whitelegg ring roller",
        kind: "2d",
        shape: "coiler",
        tagline: "Rings and curves.",
        body: [
          "Section bending / rings. Not CNC 3D clips.",
        ],
        wire: "Ring class",
        axes: "Roller",
        jobs: ["Rings", "Curves"],
      },
      {
        slug: "cell",
        name: "Whitelegg forming cell",
        kind: "3d",
        shape: "twin",
        tagline: "Former + straighten + payoff as a package.",
        body: [
          "Turnkey Whitelegg cell. Notes: diameter, 2D/3D, and whether you already own a decoiler.",
        ],
        wire: "Cell class",
        axes: "Package",
        jobs: ["Turnkey", "First CNC cell"],
      },
    ],
  },
];

export function oemPath(oem: CncOem | string) {
  const slug = typeof oem === "string" ? oem : oem.slug;
  return `${CNC_HUB}/${slug}`;
}

export function modelPath(oem: CncOem | string, model: CncModel | string) {
  const oemSlug = typeof oem === "string" ? oem : oem.slug;
  const modelSlug = typeof model === "string" ? model : model.slug;
  return `${CNC_HUB}/${oemSlug}/${modelSlug}`;
}

export function getOem(slug: string) {
  return CNC_OEMS.find((oem) => oem.slug === slug);
}

export function getModel(oemSlug: string, modelSlug: string) {
  const oem = getOem(oemSlug);
  if (!oem) return undefined;
  const model = oem.models.find((item) => item.slug === modelSlug);
  if (!model) return undefined;
  return { oem, model };
}

export function allCncModels() {
  return CNC_OEMS.flatMap((oem) =>
    oem.models.map((model) => ({ oem, model })),
  );
}
