/**
 * Materials data for programmatic SEO pages
 * Used for material-specific wire forming pages
 */

export interface MaterialData {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  properties: string[];
  applications: string[];
  industries: string[];
  specifications: string[];
}

export const materials: MaterialData[] = [
  {
    slug: "stainless-steel-304-wire-forming",
    name: "Stainless Steel 304",
    shortName: "304 SS",
    description: "The most common stainless steel for wire forming. Excellent corrosion resistance, good formability, and widely available in all wire sizes.",
    properties: ["Corrosion resistant", "Non-magnetic (annealed)", "Weldable", "Good formability"],
    applications: ["Food processing", "Chemical handling", "Medical equipment", "Architectural"],
    industries: ["Food processing", "Medical", "Pharmaceutical", "Chemical"],
    specifications: ["ASTM A580", "ASTM A313", "AMS 5697"],
  },
  {
    slug: "stainless-steel-316-wire-forming",
    name: "Stainless Steel 316",
    shortName: "316 SS",
    description: "Superior corrosion resistance, especially against chlorides. Essential for marine, medical, and chemical applications.",
    properties: ["Superior corrosion resistance", "Chloride resistant", "Biocompatible", "Weldable"],
    applications: ["Marine equipment", "Medical devices", "Chemical processing", "Pharmaceutical"],
    industries: ["Medical", "Marine", "Chemical", "Pharmaceutical"],
    specifications: ["ASTM A580", "ASTM A313", "AMS 5648"],
  },
  {
    slug: "carbon-steel-wire-forming",
    name: "Carbon Steel",
    shortName: "Carbon Steel",
    description: "Cost-effective option for general-purpose wire forming. Excellent strength and formability. Requires protective coating for corrosion protection.",
    properties: ["High strength", "Excellent formability", "Cost effective", "Magnetic"],
    applications: ["Automotive", "Industrial equipment", "Furniture", "Agriculture"],
    industries: ["Automotive", "Industrial", "Furniture", "Agriculture"],
    specifications: ["ASTM A510", "SAE J403"],
  },
  {
    slug: "galvanized-wire-forming",
    name: "Galvanized Steel Wire",
    shortName: "Galvanized",
    description: "Carbon steel with zinc coating for corrosion protection. Ideal for outdoor and wet environment applications.",
    properties: ["Corrosion resistant", "Weather resistant", "Cost effective", "Long lasting"],
    applications: ["Outdoor equipment", "Agriculture", "HVAC", "Construction"],
    industries: ["Agriculture", "Construction", "HVAC", "Outdoor equipment"],
    specifications: ["ASTM A641", "ASTM A764"],
  },
  {
    slug: "spring-steel-wire-forming",
    name: "Spring Steel Wire",
    shortName: "Spring Steel",
    description: "High-carbon steel for applications requiring spring properties and fatigue resistance. Used for clips, clamps, and spring-loaded components.",
    properties: ["High tensile strength", "Spring properties", "Fatigue resistant", "Good formability"],
    applications: ["Springs", "Clips", "Clamps", "Retainers"],
    industries: ["Automotive", "Appliance", "Hardware", "Electronics"],
    specifications: ["ASTM A228", "ASTM A229", "SAE J316"],
  },
  {
    slug: "inconel-wire-forming",
    name: "Inconel Wire",
    shortName: "Inconel",
    description: "Nickel-chromium superalloy for extreme high-temperature applications. Essential for aerospace, heat treating, and furnace components.",
    properties: ["Extreme temperature resistance", "Oxidation resistant", "Corrosion resistant", "High strength at temperature"],
    applications: ["Heat treat fixtures", "Furnace components", "Aerospace", "Gas turbines"],
    industries: ["Aerospace", "Heat treating", "Power generation", "Chemical"],
    specifications: ["AMS 5832", "ASTM B166", "UNS N06600"],
  },
  {
    slug: "aluminum-wire-forming",
    name: "Aluminum Wire",
    shortName: "Aluminum",
    description: "Lightweight wire for weight-sensitive applications. Good corrosion resistance and electrical conductivity.",
    properties: ["Lightweight", "Corrosion resistant", "Electrically conductive", "Non-magnetic"],
    applications: ["Aerospace", "Electrical", "Lightweight structures", "Heat exchangers"],
    industries: ["Aerospace", "Electronics", "Automotive", "Marine"],
    specifications: ["ASTM B211", "AMS 4182"],
  },
  {
    slug: "music-wire-forming",
    name: "Music Wire",
    shortName: "Music Wire",
    description: "High-carbon steel wire with the highest tensile strength. Used for precision springs and demanding mechanical applications.",
    properties: ["Highest tensile strength", "Excellent fatigue life", "Precise tolerances", "Consistent quality"],
    applications: ["Precision springs", "Mechanical components", "Instruments", "Aerospace"],
    industries: ["Aerospace", "Medical", "Electronics", "Instruments"],
    specifications: ["ASTM A228", "AMS 5112"],
  },
];

export function getMaterialBySlug(slug: string): MaterialData | undefined {
  return materials.find((mat) => mat.slug === slug);
}
