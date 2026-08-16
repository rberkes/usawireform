export type Machine = {
  slug: string;
  name: string;
  shortName: string;
  category: "3d" | "2d";
  tagline: string;
  description: string;
  wireDiameter: string;
  wireDiameterMetric: string;
  /** Base list price in USD. Must match the visible price on the machine page. */
  priceUsd: number;
  features: string[];
  applications: string[];
  youtubeSearchTerms: string[];
  specs: { label: string; value: string }[];
};

export const machines: Machine[] = [
  {
    slug: "numalliance-robomac-tf",
    name: "Robomac TF",
    shortName: "Robomac TF",
    category: "3d",
    tagline: "High-performance 3D wire bending with proven reliability",
    description:
      "The Robomac TF series represents decades of industrial wire forming expertise in a compact, robust package. With configurations ranging from single to triple bending heads, this CNC platform handles wire diameters from 2mm to 16mm with exceptional repeatability. The bending head moves freely around the wire, enabling complex 3D geometries without material slip or marking.",
    wireDiameter: ".08–.625″",
    wireDiameterMetric: "2–16 mm",
    priceUsd: 225_000,
    features: [
      "3D bending from coil",
      "Compact and robust frame",
      "1 to 3 bending heads available",
      "Bending head moves freely around wire",
      "Simple tool design with easy configuration",
      "Dedicated safety fence for machine and decoiler",
      "19″ touchscreen programming interface",
      "Simulation software for part setup",
    ],
    applications: [
      "Automotive seat frames and headrests",
      "Furniture wire components",
      "Industrial hooks and hangers",
      "Agricultural equipment clips",
      "HVAC mounting brackets",
      "Medical device frames",
    ],
    youtubeSearchTerms: ["Numalliance Robomac TF", "Robomac wire bending"],
    specs: [
      { label: "Wire Capacity", value: ".08–.625″ / 2–16 mm at 600 N/mm²" },
      { label: "Bending Type", value: "3D from coil" },
      { label: "Bending Heads", value: "1, 2, or 3" },
      { label: "Models", value: "R106TF, R108TF, R206TF, R208TF, R210TF, R213TF, R214TF, R216TF, R310TF" },
      { label: "Control", value: "CNC with 19″ touchscreen" },
      { label: "Materials", value: "Mild steel, stainless, aluminum, copper" },
    ],
  },
  {
    slug: "numalliance-robomac-e-motion",
    name: "Robomac e-Motion",
    shortName: "e-Motion",
    category: "3d",
    tagline: "Full-electric precision for optimized production cycles",
    description:
      "The Robomac e-Motion delivers the performance DNA of the TF series in a fully electric package. Faster cycle times, higher precision, and more versatile tooling make this the choice for shops prioritizing energy efficiency without sacrificing capability. The electric drive system eliminates hydraulic maintenance while providing smoother, more controlled motion throughout the bending sequence.",
    wireDiameter: ".08–.375″",
    wireDiameterMetric: "2–12 mm",
    priceUsd: 195_000,
    features: [
      "100% electric bending arm",
      "Faster cycle times than hydraulic",
      "Higher precision and repeatability",
      "Compact, modular, and cost-efficient",
      "1 to 3 bending head configurations",
      "Bending head revolves freely around material",
      "Integrated safety gate system",
      "Remote assistance via internet connection",
    ],
    applications: [
      "High-volume automotive clips",
      "Precision electronic brackets",
      "Medical wire forms",
      "Aerospace cable routing",
      "Consumer product handles",
      "Retail display hooks",
    ],
    youtubeSearchTerms: ["Numalliance e-Motion", "Robomac e-Motion wire"],
    specs: [
      { label: "Wire Capacity", value: ".08–.375″ / 2–12 mm at 600 N/mm²" },
      { label: "Bending Type", value: "3D from coil" },
      { label: "Drive System", value: "Full electric" },
      { label: "Bending Heads", value: "1, 2, or 3" },
      { label: "Models", value: "R106, R206, R210, R212, R310 e-Motion" },
      { label: "Interface", value: "19″ touchscreen with simulation" },
    ],
  },
  {
    slug: "numalliance-robomac-tfe",
    name: "Robomac TFE",
    shortName: "Robomac TFE",
    category: "3d",
    tagline: "Electric efficiency meets heavy-wire capability",
    description:
      "The Robomac TFE bridges the gap between electric efficiency and heavy-wire forming capacity. Purpose-built for wire diameters from 4mm to 16mm, this dual-head machine delivers the cycle time advantages of electric drive while handling the industrial wire gauges that smaller electric machines cannot. The modular design allows shops to evolve their capability as production demands change.",
    wireDiameter: ".16–.625″",
    wireDiameterMetric: "4–16 mm",
    priceUsd: 255_000,
    features: [
      "100% electric operation",
      "High precision with reduced cycle times",
      "Compact, modular, and sturdy construction",
      "2 bending heads standard",
      "Bending head moves freely around material",
      "Simple and easy-to-configure tooling",
      "Integrated safety gate system",
      "Auto-corrective feedback from 3D measuring",
    ],
    applications: [
      "Heavy-gauge automotive frames",
      "Construction reinforcement shapes",
      "Agricultural machinery components",
      "Industrial basket frames",
      "Furniture structural wire",
      "HVAC support brackets",
    ],
    youtubeSearchTerms: ["Numalliance Robomac TFE", "TFE wire bending"],
    specs: [
      { label: "Wire Capacity", value: ".16–.625″ / 4–16 mm at 600 N/mm²" },
      { label: "Bending Type", value: "3D from coil" },
      { label: "Drive System", value: "Full electric" },
      { label: "Bending Heads", value: "2" },
      { label: "Models", value: "R213TFE, R214TFE, R216TFE" },
      { label: "Axes", value: "7 digital axes" },
    ],
  },
  {
    slug: "numalliance-robomac-2-heads",
    name: "Robomac 2 Heads",
    shortName: "2 Heads",
    category: "3d",
    tagline: "Dual-head forming for long and symmetrical parts",
    description:
      "The Robomac 2 Heads machine is engineered specifically for long-length and symmetrical wire forms. The retractable central orientation clamp achieves extremely short distances between the final two bends—down to 75mm—enabling geometries that single-head machines cannot efficiently produce. Both heads can operate independently, opening possibilities for asymmetrical parts and optimized cycle times.",
    wireDiameter: ".065–.47″",
    wireDiameterMetric: "1.8–12 mm",
    priceUsd: 245_000,
    features: [
      "Double bending head configuration",
      "Retractable central clamp for close bends",
      "Minimum 3″ (75mm) between central bends",
      "3-position auxiliary clamp on heads",
      "Looping capability at both ends",
      "Optional independent head operation",
      "Modular and expandable design",
      "Coil or precut length feeding",
    ],
    applications: [
      "Long symmetrical frames",
      "Automotive headrest wires",
      "Shopping cart handles",
      "Furniture back supports",
      "Industrial safety guards",
      "Display rack structures",
    ],
    youtubeSearchTerms: ["Numalliance Robomac 2 heads", "dual head wire bending"],
    specs: [
      { label: "Wire Capacity", value: ".065–.47″ / 1.8–12 mm at 600 N/mm²" },
      { label: "Bending Type", value: "3D from coil or precut" },
      { label: "Bending Heads", value: "2 (optional independent)" },
      { label: "Min Central Distance", value: "3″ / 75 mm" },
      { label: "Models", value: "R2104TF, R2105TF, R2106TF, R2108TF, R2110TF, R2112TF" },
      { label: "Feed Options", value: "Coil or precut lengths" },
    ],
  },
  {
    slug: "numalliance-robomac-r4xx",
    name: "Robomac R4xx",
    shortName: "R4xx",
    category: "3d",
    tagline: "Four simultaneous bends for maximum throughput",
    description:
      "The Robomac R4xx pushes wire forming cycle times to their limit with parallel processing architecture. Two benches work simultaneously while four bending heads execute folds in concert, making this the production choice for high-volume symmetrical parts. The narrow central clamp maintains the ability to form tight central geometries while the programmable work height adapts to different part profiles.",
    wireDiameter: ".07–.16″",
    wireDiameterMetric: "1.8–4 mm",
    priceUsd: 215_000,
    features: [
      "2 parallel working benches",
      "4 simultaneous bending heads",
      "Narrow central clamp design",
      "Programmable work height adjustment",
      "Looping capability at both ends",
      "Independent head operation option",
      "Electric stabilization unit available",
      "Rotary or biplane straightener options",
    ],
    applications: [
      "High-volume automotive clips",
      "Mass-produced retail hooks",
      "Consumer product wire forms",
      "Electronic connector clips",
      "Small symmetrical brackets",
      "Light-gauge industrial fasteners",
    ],
    youtubeSearchTerms: ["Numalliance R4xx", "Robomac 4 heads wire"],
    specs: [
      { label: "Wire Capacity", value: ".07–.16″ / 1.8–4 mm at 600 N/mm²" },
      { label: "Bending Type", value: "3D from coil" },
      { label: "Bending Heads", value: "4" },
      { label: "Working Benches", value: "2 parallel" },
      { label: "Min Central Distance", value: "2″ / 50 mm" },
      { label: "Straightener", value: "Rotary or biplane" },
    ],
  },
  {
    slug: "numalliance-frx",
    name: "FRX",
    shortName: "FRX",
    category: "3d",
    tagline: "Compact flexibility from spring coils to complex forms",
    description:
      "The FRX bridges traditional spring coiling and modern 3D wire forming in a compact, flexible package. The robotized bending arm rotates infinitely around the wire without inducing torsion stress, enabling both tight spring coils and open 3D geometries from the same machine. Optional laser coil detection adds process control for spring-wound sections.",
    wireDiameter: ".03–.25″",
    wireDiameterMetric: "0.8–6 mm",
    priceUsd: 165_000,
    features: [
      "Robotized bending arm with infinite rotation",
      "No torsion stress on wire during forming",
      "Multi-face tooling for complex parts",
      "Quick changeover for small batches",
      "Optional laser coil detection",
      "Spring coiling capability",
      "3D forming from coil",
      "Tool editor for complex part programming",
    ],
    applications: [
      "Compression and extension springs",
      "Wire forms with integrated springs",
      "Small complex brackets",
      "Electronic component leads",
      "Medical device springs",
      "Precision instrument clips",
    ],
    youtubeSearchTerms: ["Numalliance FRX", "FRX wire forming spring"],
    specs: [
      { label: "Wire Capacity (High Tensile)", value: ".03–.16″ / 0.8–4 mm at 1800 N/mm²" },
      { label: "Wire Capacity (Standard)", value: ".03–.25″ / 0.8–6 mm at 600 N/mm²" },
      { label: "Bending Type", value: "3D from coil" },
      { label: "Special Feature", value: "Infinite rotation bending arm" },
      { label: "Models", value: "FRX04, FRX06" },
      { label: "Options", value: "Laser coil detection" },
    ],
  },
  {
    slug: "numalliance-ftx",
    name: "FTX",
    shortName: "FTX",
    category: "3d",
    tagline: "Advanced double-bend technology with slip-free forming",
    description:
      "The FTX represents the most advanced CNC wire bending technology in the NumAlliance lineup. The bending head moves freely around the material rather than pulling wire through tooling, enabling slip-free bends and true double-bend capability in a single station. Seven digital axes provide the motion complexity needed for parts that would otherwise require multiple setups or secondary operations.",
    wireDiameter: ".12–.625″",
    wireDiameterMetric: "3–16 mm",
    priceUsd: 285_000,
    features: [
      "Bending head moves around material",
      "Slip-free bending process",
      "Double bend capability",
      "7 digital axes",
      "Single bending head with multiple radii",
      "Single-minute tooling exchange",
      "Integrated safety gate system",
      "Auto-corrective feedback from 3D measuring",
    ],
    applications: [
      "Complex automotive frames",
      "Aerospace structural forms",
      "Heavy industrial brackets",
      "Construction reinforcement shapes",
      "Agricultural equipment frames",
      "Custom machinery components",
    ],
    youtubeSearchTerms: ["Numalliance FTX", "FTX wire bending double bend"],
    specs: [
      { label: "Wire Capacity", value: ".12–.625″ / 3–16 mm at 600 N/mm²" },
      { label: "Bending Type", value: "3D double bend from coil" },
      { label: "Digital Axes", value: "7" },
      { label: "Tooling", value: "Single head, multiple radii" },
      { label: "Models", value: "FTX08, FTX10, FTX13, FTX14, FTX16 (G4/G8)" },
      { label: "Special Feature", value: "Slip-free double bending" },
    ],
  },
  {
    slug: "numalliance-f2d",
    name: "F2D",
    shortName: "F2D",
    category: "2d",
    tagline: "Precision 2D forming for frames up to 800mm",
    description:
      "The F2D is purpose-built for 2D wire forms and welded frames where in-plane geometry is the primary requirement. The support table maintains wire position during large frame production, while optional integrated welding allows closed-loop frames to exit the machine ready for finishing. Pick-and-place ejection keeps completed frames organized for downstream operations.",
    wireDiameter: ".12–.47″",
    wireDiameterMetric: "3–12 mm",
    priceUsd: 175_000,
    features: [
      "2D bending from coil",
      "Frames up to 800 × 800 mm",
      "Support table for large frame stability",
      "Optional integrated welding station",
      "Weld parameters saved with part program",
      "Optional pick-and-place ejection",
      "Small to medium batch optimization",
      "Simulation software for setup",
    ],
    applications: [
      "Rectangular wire frames",
      "Display rack outlines",
      "Furniture seat frames",
      "Industrial guards and covers",
      "Welded basket tops",
      "HVAC register frames",
    ],
    youtubeSearchTerms: ["Numalliance F2D", "F2D wire frame bending"],
    specs: [
      { label: "Wire Capacity", value: ".12–.47″ / 3–12 mm at 600 N/mm²" },
      { label: "Bending Type", value: "2D from coil" },
      { label: "Max Frame Size", value: "800 × 800 mm / 31.5 × 31.5″" },
      { label: "Welding", value: "Optional integrated" },
      { label: "Ejection", value: "Optional pick-and-place" },
      { label: "Batch Size", value: "Small to medium production" },
    ],
  },
];

export function getMachine(slug: string): Machine | undefined {
  return machines.find((m) => m.slug === slug);
}

export function getMachinesByCategory(category: "3d" | "2d"): Machine[] {
  return machines.filter((m) => m.category === category);
}

export function formatMachinePrice(usd: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(usd);
}
