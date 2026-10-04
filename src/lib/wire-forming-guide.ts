export const WIRE_FORMING_TITLE = "Wire forming";

export const WIRE_FORMING_LEDE =
  "Wire forming is the manufacture of a specified centerline from coil or bar — 2D and 3D CNC, fourslide, multislide, welded assemblies, baskets, racks, and formed wire components. This page is the process map; the directory is the shop list.";

export const WIRE_FORMING_KEYWORDS = [
  "wire forming",
  "wire forming services",
  "wire forming companies",
  "custom wire forming",
  "wire form manufacturing",
  "CNC wire forming",
];

export const WIRE_FORMING_TOC = [
  { id: "what", label: "What wire forming is" },
  { id: "2d-3d", label: "2D vs 3D" },
  { id: "cnc", label: "CNC forming" },
  { id: "fourslide", label: "Fourslide" },
  { id: "multislide", label: "Multislide" },
  { id: "feed", label: "Coil-fed vs cut-to-length" },
  { id: "diameter", label: "Wire diameter" },
  { id: "radius", label: "Bend radius" },
  { id: "material", label: "Material selection" },
  { id: "springback", label: "Springback" },
  { id: "tolerances", label: "Tolerances" },
  { id: "welding", label: "Welding" },
  { id: "finishing", label: "Finishing" },
  { id: "prototype", label: "Prototype vs production" },
  { id: "machines", label: "Machine selection" },
  { id: "pricing", label: "Pricing variables" },
  { id: "dfm", label: "Design for manufacturing" },
  { id: "oems", label: "Equipment manufacturers" },
  { id: "suppliers", label: "Supplier selection" },
  { id: "directory", label: "Manufacturer directory" },
  { id: "faq", label: "FAQ" },
] as const;

export const WIRE_FORMING_FAQS = [
  {
    question: "What is wire forming?",
    answer:
      "Wire forming starts with a specified alloy and diameter and produces a part whose geometry is the wire itself. A shop straightens, feeds, bends to a centerline, cuts, and often welds or finishes the ends. There is no blank, no chip, and no mold.",
  },
  {
    question: "What is the difference between 2D and 3D wire forming?",
    answer:
      "2D CNC bends in one plane — clips, hooks, and flat frames. 3D CNC adds a rotary or torsion axis so the wire can leave the plane — routing forms, spatial hooks, baskets, and frames. Fourslide and multislide are usually 2D with dedicated cams.",
  },
  {
    question: "What is CNC wire forming?",
    answer:
      "A CNC wire former runs a program: feed length, bend angle, and (on 3D cells) rotation. Pins, mandrels, and cutoff are standard tooling. First article is measured in hours or days, not in a twelve-week cam tool.",
  },
  {
    question: "When does fourslide beat CNC?",
    answer:
      "Frozen high volume, mostly planar geometry, often with a stamp or pierce in the same stroke. Piece price can undercut CNC at hundreds of thousands of identical clips. Tooling cost and revision risk are the trade.",
  },
  {
    question: "What wire diameters can U.S. shops form?",
    answer:
      "Across the directory the published band runs from about 0.010 in on medical and spring cells to 0.625 in and heavier on rod and 3D CNC. Each machine has its own min and max. USA Wire Form’s production cell is 4–14 mm (about 0.157–0.551 in).",
  },
  {
    question: "How do I choose a wire forming company?",
    answer:
      "Match the print to the iron: diameter band, 2D vs 3D, coil-fed vs cut-to-length, weld process, finish, MOQ, and certifications. Named machine models beat a listing that only says “custom wire forms.”",
  },
];
