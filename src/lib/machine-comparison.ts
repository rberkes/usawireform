import { modelPath, oemPath } from "@/lib/cnc-oems";

export type MachineFit = "best" | "good" | "fair" | "poor";

export const FIT_LABEL: Record<MachineFit, string> = {
  best: "Best",
  good: "Good",
  fair: "Fair",
  poor: "Wrong tool",
};

export type CompareJob = "springs" | "heavy3d" | "cut" | "medium";

export const COMPARE_JOBS: {
  id: CompareJob;
  label: string;
  short: string;
  maxSize: string;
  lede: string;
}[] = [
  {
    id: "springs",
    label: "Small springs",
    short: "Springs",
    maxSize: "to ~4 mm",
    lede:
      "Compression, torsion, and extension from spring wire — usually under 4 mm. Coilers and spring CNC, not a 4–14 mm orbit head.",
  },
  {
    id: "heavy3d",
    label: "Heavy 3D forming",
    short: "Heavy 3D",
    maxSize: "to 14–16 mm",
    lede:
      "Spatial bends in 8–14 mm (and the 4–14 mm production band). Frames, basket rims, guards. Head orbits the wire.",
  },
  {
    id: "cut",
    label: "Cut-to-length",
    short: "Cut-to-length",
    maxSize: "by cell",
    lede:
      "Straighten, feed, shear or saw. Hooks and forms may ride after cutoff. Dedicated CTL or in-line cutoff on a 2D/3D cell.",
  },
  {
    id: "medium",
    label: "Medium 5–8 mm",
    short: "5–8 mm",
    maxSize: "5–8 mm",
    lede:
      "The middle of the industrial band: clips, hangers, mid-weight frames. Most 3D CNC families cover it. Fourslide is usually the wrong start.",
  },
];

export type CompareRow = {
  id: string;
  name: string;
  href: string;
  note: string;
  /** Typical published family max. Confirm tensile and options with the dealer. */
  maxSize: string;
  fits: Record<CompareJob, MachineFit>;
};

export const COMPARE_ROWS: CompareRow[] = [
  {
    id: "214tf",
    name: "Numalliance Robomac 214TF / TFE",
    href: modelPath("numalliance", "robomac-214tf"),
    note: "What we run. Heavy 3D from coil. Production quotes 4–14 mm.",
    maxSize: "16 mm / 0.63 in",
    fits: { springs: "poor", heavy3d: "best", cut: "good", medium: "best" },
  },
  {
    id: "emotion-ftx",
    name: "Numalliance e-Motion / FTX",
    href: modelPath("numalliance", "robomac-e-motion"),
    note: "e-Motion to 12 mm. FTX family to 16 mm. Lighter than a TF on 1/2 in.",
    maxSize: "16 mm / 0.63 in",
    fits: { springs: "poor", heavy3d: "good", cut: "good", medium: "best" },
  },
  {
    id: "f2d",
    name: "Numalliance F2D (2D table)",
    href: modelPath("numalliance", "f2d"),
    note: "Planar frames. Cutoff in the program. Not 3D baskets.",
    maxSize: "12 mm / 0.47 in",
    fits: { springs: "poor", heavy3d: "poor", cut: "best", medium: "fair" },
  },
  {
    id: "frx",
    name: "Numalliance FRX",
    href: modelPath("numalliance", "frx"),
    note: "Coiler class. Small wire, spring-like work.",
    maxSize: "6 mm / 0.24 in",
    fits: { springs: "best", heavy3d: "poor", cut: "fair", medium: "poor" },
  },
  {
    id: "wafios-spring",
    name: "WAFIOS FUL (spring CNC)",
    href: modelPath("wafios", "ful"),
    note: "Spring wire. Small FUL cells are under 8 mm; large FUL plates go much heavier.",
    maxSize: "to 16 mm class",
    fits: { springs: "best", heavy3d: "poor", cut: "fair", medium: "poor" },
  },
  {
    id: "wafios-3d",
    name: "WAFIOS BM / BMZ",
    href: modelPath("wafios", "bmz-6"),
    note: "BMZ is small-wire. BM series steps up. Confirm the plate.",
    maxSize: "by BM frame",
    fits: { springs: "fair", heavy3d: "good", cut: "good", medium: "best" },
  },
  {
    id: "wafios-2d",
    name: "WAFIOS FMU (2D)",
    href: modelPath("wafios", "fmu"),
    note: "Planar CNC. Cutoff on the table.",
    maxSize: "by FMU frame",
    fits: { springs: "poor", heavy3d: "poor", cut: "best", medium: "fair" },
  },
  {
    id: "aim-3d",
    name: "AIM AFM-3D / Gemini",
    href: modelPath("aim", "afm-3d"),
    note: "U.S. 3D CNC. Twin-head for long symmetric parts.",
    maxSize: "confirm diameter",
    fits: { springs: "poor", heavy3d: "good", cut: "good", medium: "best" },
  },
  {
    id: "aim-scs",
    name: "AIM SCS (cut-and-form)",
    href: modelPath("aim", "scs"),
    note: "Cut then form. Straight lengths and simple forms.",
    maxSize: "confirm diameter",
    fits: { springs: "poor", heavy3d: "fair", cut: "best", medium: "good" },
  },
  {
    id: "aim-2d",
    name: "AIM AF-2D",
    href: modelPath("aim", "af-2d"),
    note: "Planar AIM table. Cutoff in the program. AFM-2D12 published to 8 mm.",
    maxSize: "8 mm / 0.32 in",
    fits: { springs: "poor", heavy3d: "poor", cut: "best", medium: "fair" },
  },
  {
    id: "itaya",
    name: "Itaya TF / VF",
    href: modelPath("itaya", "tf-series"),
    note: "Japanese 3D CNC. Different HMI than Robomac. Same job class.",
    maxSize: "confirm diameter",
    fits: { springs: "poor", heavy3d: "good", cut: "good", medium: "best" },
  },
  {
    id: "itaya-spring",
    name: "Itaya spring former",
    href: modelPath("itaya", "spring-former"),
    note: "Itaya coiler class. Small spring wire, not 4–14 mm frames.",
    maxSize: "spring class",
    fits: { springs: "best", heavy3d: "poor", cut: "fair", medium: "poor" },
  },
  {
    id: "bihler",
    name: "Bihler GRM / RM (slide / transfer)",
    href: oemPath("bihler"),
    note: "Cam / NC transfer. Frozen high volume. GRM-NC published ~6 mm wire.",
    maxSize: "~6 mm wire",
    fits: { springs: "fair", heavy3d: "poor", cut: "good", medium: "fair" },
  },
  {
    id: "blm",
    name: "BLM 4-RUNNER / E-TURN",
    href: modelPath("blm-group", "4-runner"),
    note: "Coil-to-part and tube/wire bend. CTL plus end-form on the line.",
    maxSize: "confirm diameter",
    fits: { springs: "poor", heavy3d: "fair", cut: "best", medium: "good" },
  },
  {
    id: "simplex",
    name: "Simplex Rapid (spring)",
    href: oemPath("simplex-rapid"),
    note: "Spring coiling. Not 4–14 mm frames.",
    maxSize: "spring class",
    fits: { springs: "best", heavy3d: "poor", cut: "fair", medium: "poor" },
  },
  {
    id: "whitelegg",
    name: "Whitelegg (spring / rings / cell)",
    href: oemPath("whitelegg"),
    note: "UK spring and ring equipment. Payoff and ring rollers in the family.",
    maxSize: "spring / ring class",
    fits: { springs: "best", heavy3d: "poor", cut: "good", medium: "poor" },
  },
  {
    id: "pave",
    name: "Pave heavy-wire 3D",
    href: modelPath("pave", "heavy-wire"),
    note: "Italian heavy former. Confirm diameter vs 4–14 mm.",
    maxSize: "heavy class",
    fits: { springs: "poor", heavy3d: "best", cut: "good", medium: "good" },
  },
  {
    id: "fortuna",
    name: "Fortuna wire former",
    href: modelPath("fortuna", "wire-former"),
    note: "European 3D cell. Heavy frames when the plate says so.",
    maxSize: "heavy class",
    fits: { springs: "poor", heavy3d: "best", cut: "good", medium: "good" },
  },
  {
    id: "fourslide",
    name: "Fourslide / multislide",
    href: "/processes/fourslide",
    note: "Cam tool. Frozen 2D clips. Light slides ~6 mm; heavy slides to ~12 mm. We do not run fourslide.",
    maxSize: "~6–12 mm",
    fits: { springs: "fair", heavy3d: "poor", cut: "fair", medium: "poor" },
  },
];

export function bestFor(job: CompareJob) {
  return COMPARE_ROWS.filter((row) => row.fits[job] === "best");
}
