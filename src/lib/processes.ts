export type ProcessCategory = "forming" | "prep" | "secondary" | "joining";

export type Process = {
  slug: string;
  title: string;
  summary: string;
  category: ProcessCategory;
  weRun: boolean;
  published: boolean;
};

export const processCategories: { id: ProcessCategory; label: string }[] = [
  { id: "forming", label: "Forming" },
  { id: "prep", label: "Wire prep" },
  { id: "secondary", label: "Secondary operations" },
  { id: "joining", label: "Joining" },
];

export const processes: Process[] = [
  {
    slug: "heavy-wire-forming",
    title: "Heavy wire forming (4–14 mm)",
    summary:
      "The 4–14 mm band: frames, wire baskets, guards, and 3D CNC forms that light spring cells cannot run.",
    category: "forming",
    weRun: true,
    published: true,
  },
  {
    slug: "3d-cnc-wire-forming",
    title: "3D CNC wire forming",
    summary:
      "Programmable bends in multiple planes for 4–14 mm wire — frames, hooks, routing parts, and wire-basket geometry.",
    category: "forming",
    weRun: true,
    published: true,
  },
  {
    slug: "2d-cnc-wire-forming",
    title: "2D CNC wire forming",
    summary:
      "All bends in one plane. Faster programming, simpler tooling access, and the right choice when the part is flat.",
    category: "forming",
    weRun: true,
    published: true,
  },
  {
    slug: "wire-form-shapes",
    title: "Wire form shapes",
    summary:
      "The centerline: cut-to-length, L, U, J, S, C, V, serpentine, eyes, rings, and closed frames in 4–14 mm.",
    category: "forming",
    weRun: true,
    published: true,
  },
  {
    slug: "fourslide",
    title: "Fourslide vs 3D CNC",
    summary:
      "Cam tooling, NRE, and geometry limits versus a Robomac 214TF. Why 3D CNC wins on tooling and cost for 4–14 mm — cycle time is a later page.",
    category: "forming",
    weRun: false,
    published: true,
  },
  {
    slug: "wire-straightening",
    title: "Wire straightening",
    summary:
      "Rotary or roll straightening before the first bend. Cast and helix in the coil become dimensional error in the form.",
    category: "prep",
    weRun: true,
    published: true,
  },
  {
    slug: "cut-to-length",
    title: "Cut-to-length",
    summary:
      "Shear or saw cutoff in-line with CNC. End deformation, length tolerance, and when a separate cut station is required.",
    category: "prep",
    weRun: true,
    published: true,
  },
  {
    slug: "end-forming",
    title: "End forming",
    summary:
      "Chamfer, coin, flatten, pierce, swage, and thread so the wire end mates to a hole, screw, or weld.",
    category: "secondary",
    weRun: true,
    published: true,
  },
  {
    slug: "heat-treating",
    title: "Heat treating",
    summary:
      "Stress relief of the form, vs USA made heat treat baskets as a product — not the same as running a furnace on every job.",
    category: "secondary",
    weRun: false,
    published: true,
  },
  {
    slug: "plating-and-coating",
    title: "Plating and coating",
    summary:
      "Rack zinc, zinc-nickel, and zinc-iron, then in-line powder — or dual coat. Pre-coated wire vs post-form finish on 4–14 mm.",
    category: "secondary",
    weRun: true,
    published: true,
  },
  {
    slug: "inspection",
    title: "Inspection",
    summary:
      "Fixtures, overlays, and CMM for 2D and 3D wire forms. Put tolerance on the interface, not on every leg.",
    category: "secondary",
    weRun: true,
    published: true,
  },
  {
    slug: "resistance-welding",
    title: "Resistance welding",
    summary:
      "Cross-wire and projection welds that close a form or attach a second piece without filler metal.",
    category: "joining",
    weRun: true,
    published: true,
  },
  {
    slug: "mig-tig-assembly",
    title: "MIG / TIG assembly",
    summary:
      "Tack and fusion welds for frames and fixtures when resistance weld is the wrong joint or the wrong alloy.",
    category: "joining",
    weRun: true,
    published: true,
  },
  {
    slug: "mesh-grids-and-cable-trays",
    title: "Mesh grids and cable trays",
    summary:
      "USA made cable trays, USA made wire baskets, USA made security fencing, and welded mesh — resistance, MIG, and TIG after the form.",
    category: "joining",
    weRun: true,
    published: true,
  },
];

export function publishedProcesses() {
  return processes.filter((process) => process.published);
}

export function secondaryOperations() {
  return processes.filter(
    (process) =>
      process.published &&
      (process.category === "secondary" || process.category === "joining"),
  );
}

export function processesByCategory() {
  return processCategories.map((category) => ({
    ...category,
    items: processes.filter((process) => process.category === category.id),
  }));
}

export function getProcess(slug: string) {
  return processes.find((process) => process.slug === slug);
}
