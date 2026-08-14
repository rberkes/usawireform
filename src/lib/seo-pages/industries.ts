/**
 * Industry data for programmatic SEO pages
 * Used for industry-specific wire forming pages
 */

export interface IndustryData {
  slug: string;
  name: string;
  description: string;
  wireNeeds: string[];
  commonProducts: string[];
  materials: string[];
  challenges: string[];
  caseStudy?: string;
}

export const seoIndustries: IndustryData[] = [
  {
    slug: "automotive-wire-forming",
    name: "Automotive",
    description: "Wire forms for automotive manufacturing including seat frames, exhaust hangers, brackets, and safety components. PPAP and IATF 16949 ready.",
    wireNeeds: ["High volume production", "Tight tolerances", "Consistent quality", "JIT delivery"],
    commonProducts: ["Seat frames", "Exhaust hangers", "Brackets", "Clips", "Safety guards"],
    materials: ["Carbon steel", "Spring steel", "Stainless steel"],
    challenges: ["Meeting PPAP requirements", "Volume flexibility", "Cost reduction"],
    caseStudy: "Tier 1 supplier needed 50,000 seat frame components monthly with ±0.5mm tolerance.",
  },
  {
    slug: "aerospace-wire-forming",
    name: "Aerospace",
    description: "Precision wire forms for aerospace applications including brackets, clips, safety wire guides, and ground support equipment.",
    wireNeeds: ["Precision tolerances", "Material certifications", "Full traceability", "First article inspection"],
    commonProducts: ["Support brackets", "Safety wire guides", "Ground equipment", "Interior components"],
    materials: ["Stainless steel 304", "Stainless steel 316", "Inconel", "Titanium"],
    challenges: ["AS9100 compliance", "Material traceability", "FAI requirements"],
  },
  {
    slug: "medical-device-wire-forming",
    name: "Medical Devices",
    description: "Stainless steel wire forms for medical devices, surgical instruments, diagnostic equipment, and hospital supplies.",
    wireNeeds: ["Cleanroom compatible", "316L stainless", "Electropolish finish", "Biocompatible materials"],
    commonProducts: ["Instrument handles", "Baskets", "Frames", "Retractors", "Guides"],
    materials: ["Stainless steel 316L", "Nitinol", "Titanium"],
    challenges: ["FDA compliance", "Cleaning validation", "Biocompatibility"],
  },
  {
    slug: "food-processing-wire-forming",
    name: "Food Processing",
    description: "Sanitary wire products for food processing including wash baskets, conveyors, guards, and handling equipment. NSF and FDA compliant.",
    wireNeeds: ["Sanitary design", "NSF compliance", "Chemical resistant", "Easy cleaning"],
    commonProducts: ["Wash baskets", "Conveyor guards", "Cooling racks", "Handling equipment"],
    materials: ["Stainless steel 304", "Stainless steel 316"],
    challenges: ["Sanitary design standards", "Chemical cleaning compatibility", "USDA requirements"],
  },
  {
    slug: "data-center-wire-forming",
    name: "Data Centers",
    description: "Cable management solutions for data centers including cable trays, server rack accessories, and wire management systems.",
    wireNeeds: ["High volume", "Fast turnaround", "Standard and custom sizes", "Fire rated materials"],
    commonProducts: ["Cable trays", "Rack accessories", "Wire management", "Floor supports"],
    materials: ["Galvanized steel", "Stainless steel", "Powder coated"],
    challenges: ["Scale and volume", "Quick delivery", "Standardization"],
  },
  {
    slug: "hvac-wire-forming",
    name: "HVAC",
    description: "Wire guards and components for HVAC equipment including fan guards, coil protectors, and filter frames.",
    wireNeeds: ["UL/CSA compliance", "Corrosion resistance", "Weather resistance", "Standard sizes"],
    commonProducts: ["Fan guards", "Coil guards", "Filter frames", "Duct supports"],
    materials: ["Galvanized steel", "Stainless steel", "Powder coated"],
    challenges: ["Meeting UL standards", "Weather exposure", "OEM specifications"],
  },
  {
    slug: "solar-energy-wire-forming",
    name: "Solar Energy",
    description: "Wire forms for solar installations including panel mounting hardware, cable management, and grounding components.",
    wireNeeds: ["Corrosion resistant", "UV stable", "High volume", "Outdoor rated"],
    commonProducts: ["Mounting clips", "Cable clips", "Grounding hardware", "Support frames"],
    materials: ["Stainless steel", "Hot-dip galvanized", "Aluminum"],
    challenges: ["25+ year lifespan", "UV exposure", "Thermal cycling"],
  },
  {
    slug: "retail-display-wire-forming",
    name: "Retail & Display",
    description: "Wire fixtures and displays for retail environments including racks, hooks, shelving, and point-of-purchase displays.",
    wireNeeds: ["Aesthetic finish", "Quick turnaround", "Custom designs", "Brand colors"],
    commonProducts: ["Display racks", "Hooks", "Shelving", "POP displays", "Sign holders"],
    materials: ["Chrome plated", "Powder coated", "Black oxide"],
    challenges: ["Brand consistency", "Seasonal volumes", "Custom finishing"],
  },
  {
    slug: "warehouse-logistics-wire-forming",
    name: "Warehouse & Logistics",
    description: "Material handling wire products for warehouses and distribution centers including baskets, containers, and decking.",
    wireNeeds: ["High durability", "Stackable designs", "Standard sizes", "Quick delivery"],
    commonProducts: ["Wire containers", "Pallet decking", "Baskets", "Dividers"],
    materials: ["Galvanized steel", "Powder coated", "Zinc plated"],
    challenges: ["Durability requirements", "Standardization", "Volume pricing"],
  },
  {
    slug: "pharmaceutical-wire-forming",
    name: "Pharmaceutical",
    description: "Stainless steel wire products for pharmaceutical manufacturing including cleanroom baskets, equipment guards, and processing equipment.",
    wireNeeds: ["316L stainless", "Electropolish", "Cleanroom compatible", "Full documentation"],
    commonProducts: ["Cleanroom baskets", "Equipment guards", "Drying racks", "Transfer containers"],
    materials: ["Stainless steel 316L", "Electropolished finish"],
    challenges: ["Cleanroom compatibility", "FDA compliance", "Validation documentation"],
  },
  {
    slug: "defense-military-wire-forming",
    name: "Defense & Military",
    description: "Wire products for defense applications including equipment guards, storage, and specialized military components.",
    wireNeeds: ["MIL-SPEC compliance", "ITAR registered", "Full traceability", "Durability"],
    commonProducts: ["Equipment guards", "Storage containers", "Specialized forms"],
    materials: ["Steel", "Stainless steel", "Cadmium plated"],
    challenges: ["MIL-SPEC requirements", "Security clearances", "ITAR compliance"],
  },
  {
    slug: "furniture-manufacturing-wire-forming",
    name: "Furniture Manufacturing",
    description: "Wire frames and components for furniture including chair frames, table bases, shelving, and decorative elements.",
    wireNeeds: ["Aesthetic quality", "Consistent bends", "Finish options", "Custom designs"],
    commonProducts: ["Chair frames", "Table bases", "Shelving components", "Decorative forms"],
    materials: ["Carbon steel", "Stainless steel", "Powder coated"],
    challenges: ["Visual quality standards", "Design complexity", "Finish consistency"],
  },
  {
    slug: "oil-gas-wire-forming",
    name: "Oil & Gas",
    description: "Industrial wire products for oil and gas operations including equipment guards, cable trays, and offshore components.",
    wireNeeds: ["Corrosion resistant", "High temperature", "Offshore rated", "Heavy duty"],
    commonProducts: ["Equipment guards", "Cable trays", "Offshore components", "Support structures"],
    materials: ["Stainless steel 316", "Hot-dip galvanized", "Specialty alloys"],
    challenges: ["Harsh environments", "Offshore requirements", "High temperature"],
  },
  {
    slug: "material-handling-wire-forming",
    name: "Material Handling",
    description: "Wire products for material handling systems including conveyor components, guards, containers, and guides.",
    wireNeeds: ["Durability", "Standard interfaces", "Quick replacement", "High volume"],
    commonProducts: ["Conveyor guards", "Guide rails", "Containers", "Dividers"],
    materials: ["Steel", "Galvanized", "Stainless steel"],
    challenges: ["Wear resistance", "Standardization", "Quick turnaround"],
  },
  {
    slug: "appliance-manufacturing-wire-forming",
    name: "Appliance Manufacturing",
    description: "Wire components for home and commercial appliances including racks, baskets, guards, and structural elements.",
    wireNeeds: ["High volume", "Consistent quality", "Cost effective", "OEM specifications"],
    commonProducts: ["Oven racks", "Dishwasher baskets", "Refrigerator shelves", "Guards"],
    materials: ["Carbon steel", "Chrome plated", "Stainless steel"],
    challenges: ["Volume pricing", "Consistency", "Supplier qualification"],
  },
];

export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return seoIndustries.find((ind) => ind.slug === slug);
}
