/**
 * Product data for programmatic SEO pages
 * Used for product-specific and product+location combinations
 */

export interface ProductData {
  slug: string;
  name: string;
  pluralName: string;
  category: string;
  description: string;
  applications: string[];
  industries: string[];
  materials: string[];
  features: string[];
  relatedProducts: string[];
}

export const products: ProductData[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // BASKETS & CONTAINERS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "wire-baskets",
    name: "Wire Basket",
    pluralName: "Wire Baskets",
    category: "Baskets & Containers",
    description: "Custom wire baskets for parts washing, dipping, storage, and material handling. Built to your specifications in 4-14 mm wire.",
    applications: ["Parts washing", "Dipping operations", "Storage", "Material handling", "Cleanroom transport"],
    industries: ["Automotive", "Medical", "Aerospace", "Food processing", "Electronics"],
    materials: ["Stainless steel 304", "Stainless steel 316", "Carbon steel", "Galvanized"],
    features: ["Custom sizes", "Stackable designs", "Handles available", "Dividers optional"],
    relatedProducts: ["dipping-baskets", "parts-washing-baskets", "storage-baskets"],
  },
  {
    slug: "parts-washing-baskets",
    name: "Parts Washing Basket",
    pluralName: "Parts Washing Baskets",
    category: "Baskets & Containers",
    description: "Industrial parts washing baskets designed for aqueous cleaning, solvent degreasing, and ultrasonic cleaning operations.",
    applications: ["Aqueous cleaning", "Solvent degreasing", "Ultrasonic cleaning", "Vapor degreasing"],
    industries: ["Automotive", "Aerospace", "Medical devices", "Electronics", "Precision machining"],
    materials: ["Stainless steel 304", "Stainless steel 316"],
    features: ["Open mesh design", "Chemical resistant", "Heat tolerant", "Quick drainage"],
    relatedProducts: ["wire-baskets", "dipping-baskets", "ultrasonic-baskets"],
  },
  {
    slug: "dipping-baskets",
    name: "Dipping Basket",
    pluralName: "Dipping Baskets",
    category: "Baskets & Containers",
    description: "Wire baskets for plating, coating, and chemical treatment dipping operations. Designed for maximum drainage and part exposure.",
    applications: ["Electroplating", "Powder coating", "Chemical treatment", "Anodizing", "Phosphating"],
    industries: ["Metal finishing", "Automotive", "Aerospace", "Industrial equipment"],
    materials: ["Stainless steel 316", "Titanium-coated", "Plastisol-coated"],
    features: ["Maximum open area", "Corrosion resistant", "Heat resistant", "Quick drainage"],
    relatedProducts: ["wire-baskets", "parts-washing-baskets", "plating-racks"],
  },
  {
    slug: "storage-baskets",
    name: "Storage Basket",
    pluralName: "Storage Baskets",
    category: "Baskets & Containers",
    description: "Industrial wire storage baskets for inventory management, warehouse organization, and work-in-process storage.",
    applications: ["Inventory storage", "WIP storage", "Warehouse organization", "Parts staging"],
    industries: ["Manufacturing", "Warehousing", "Retail", "Healthcare"],
    materials: ["Carbon steel", "Galvanized", "Stainless steel", "Powder coated"],
    features: ["Stackable", "Label holders", "Handles", "Dividers available"],
    relatedProducts: ["wire-baskets", "wire-bins", "wire-shelving"],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // CABLE TRAYS & WIRE MANAGEMENT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "cable-trays",
    name: "Cable Tray",
    pluralName: "Cable Trays",
    category: "Wire Management",
    description: "Wire mesh cable trays for data centers, industrial facilities, and commercial buildings. Open design for ventilation and easy cable access.",
    applications: ["Data center cabling", "Industrial cable runs", "Commercial buildings", "Network infrastructure"],
    industries: ["Data centers", "Technology", "Commercial construction", "Industrial facilities"],
    materials: ["Galvanized steel", "Stainless steel 304", "Hot-dip galvanized"],
    features: ["Ventilated design", "Easy cable access", "Multiple widths", "Splice plates available"],
    relatedProducts: ["cable-trays", "j-hooks", "cable-hangers"],
  },
  {
    slug: "wire-cable-management",
    name: "Wire Cable Management",
    pluralName: "Wire Cable Management Systems",
    category: "Wire Management",
    description: "Complete wire cable management solutions including trays, hangers, and routing systems for organized cable infrastructure.",
    applications: ["Cable routing", "Server racks", "Network closets", "Industrial wiring"],
    industries: ["Data centers", "Telecommunications", "Broadcasting", "Industrial"],
    materials: ["Steel", "Stainless steel", "Powder coated"],
    features: ["Modular design", "Easy installation", "Scalable", "Code compliant"],
    relatedProducts: ["cable-trays", "j-hooks", "wire-racks"],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // GUARDS & SAFETY
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "machine-guards",
    name: "Machine Guard",
    pluralName: "Machine Guards",
    category: "Guards & Safety",
    description: "Industrial machine guards for equipment protection and worker safety. OSHA-compliant designs for manufacturing environments.",
    applications: ["Equipment guarding", "Worker safety", "OSHA compliance", "Belt guards", "Pulley guards"],
    industries: ["Manufacturing", "Food processing", "Packaging", "Material handling"],
    materials: ["Carbon steel", "Stainless steel", "Galvanized", "Powder coated"],
    features: ["OSHA compliant", "Quick access doors", "Hinged designs", "Bolt-on mounting"],
    relatedProducts: ["fan-guards", "safety-guards", "equipment-guards"],
  },
  {
    slug: "fan-guards",
    name: "Fan Guard",
    pluralName: "Fan Guards",
    category: "Guards & Safety",
    description: "Wire fan guards for HVAC equipment, industrial fans, and cooling systems. Finger-safe designs meeting UL and CSA standards.",
    applications: ["HVAC protection", "Industrial fans", "Cooling systems", "Exhaust fans"],
    industries: ["HVAC", "Manufacturing", "Data centers", "Food processing"],
    materials: ["Carbon steel", "Stainless steel", "Chrome plated", "Powder coated"],
    features: ["Finger-safe mesh", "UL/CSA compliant", "Multiple sizes", "Quick-mount clips"],
    relatedProducts: ["machine-guards", "motor-mounts", "hvac-components"],
  },
  {
    slug: "safety-guards",
    name: "Safety Guard",
    pluralName: "Safety Guards",
    category: "Guards & Safety",
    description: "Custom safety guards for industrial equipment, conveyor systems, and hazardous areas. Designed to OSHA and ANSI standards.",
    applications: ["Conveyor guarding", "Robot cells", "Hazardous areas", "Pinch points"],
    industries: ["Manufacturing", "Automotive", "Food processing", "Warehousing"],
    materials: ["Steel", "Stainless steel", "Powder coated"],
    features: ["OSHA/ANSI compliant", "Interlocked options", "Easy maintenance access", "Custom sizes"],
    relatedProducts: ["machine-guards", "perimeter-guards", "light-curtains"],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // HOOKS & HANGERS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "s-hooks",
    name: "S-Hook",
    pluralName: "S-Hooks",
    category: "Hooks & Hangers",
    description: "Industrial S-hooks in heavy gauge wire for hanging, suspension, and material handling applications.",
    applications: ["Parts hanging", "Retail display", "Industrial suspension", "Plating lines"],
    industries: ["Metal finishing", "Retail", "Manufacturing", "Food processing"],
    materials: ["Carbon steel", "Stainless steel", "Galvanized", "Zinc plated"],
    features: ["Heavy gauge wire", "Multiple sizes", "Custom lengths", "High load capacity"],
    relatedProducts: ["j-hooks", "wire-hangers", "hanging-hooks"],
  },
  {
    slug: "j-hooks",
    name: "J-Hook",
    pluralName: "J-Hooks",
    category: "Hooks & Hangers",
    description: "Wire J-hooks for cable support, parts hanging, and industrial applications. Available in multiple sizes and materials.",
    applications: ["Cable support", "Parts hanging", "Display systems", "Plating racks"],
    industries: ["Telecommunications", "Retail", "Manufacturing", "Metal finishing"],
    materials: ["Steel", "Stainless steel", "Galvanized"],
    features: ["Easy installation", "Multiple sizes", "High capacity", "Corrosion resistant options"],
    relatedProducts: ["s-hooks", "cable-hangers", "wire-hangers"],
  },
  {
    slug: "wire-hangers",
    name: "Wire Hanger",
    pluralName: "Wire Hangers",
    category: "Hooks & Hangers",
    description: "Industrial wire hangers for parts processing, finishing lines, and material handling systems.",
    applications: ["Paint lines", "Plating operations", "Assembly", "Parts transport"],
    industries: ["Automotive", "Appliance", "Metal finishing", "Manufacturing"],
    materials: ["Carbon steel", "Stainless steel", "Disposable"],
    features: ["Custom designs", "High temperature", "Reusable or disposable", "Multiple gauges"],
    relatedProducts: ["s-hooks", "j-hooks", "plating-hooks"],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // FRAMES & STRUCTURAL
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "wire-frames",
    name: "Wire Frame",
    pluralName: "Wire Frames",
    category: "Frames & Structural",
    description: "Custom wire frames for furniture, displays, industrial equipment, and structural applications. 3D CNC formed in 4-14 mm wire.",
    applications: ["Furniture frames", "Display structures", "Equipment frames", "Industrial supports"],
    industries: ["Furniture", "Retail", "Industrial", "Automotive"],
    materials: ["Carbon steel", "Stainless steel", "Powder coated"],
    features: ["3D CNC formed", "Welded construction", "Custom designs", "High strength"],
    relatedProducts: ["tube-frames", "display-racks", "furniture-frames"],
  },
  {
    slug: "welded-frames",
    name: "Welded Frame",
    pluralName: "Welded Frames",
    category: "Frames & Structural",
    description: "Heavy-duty welded wire frames combining CNC forming with resistance or MIG welding for maximum strength.",
    applications: ["Heavy duty structures", "Industrial equipment", "Material handling", "Furniture"],
    industries: ["Industrial", "Manufacturing", "Automotive", "Agriculture"],
    materials: ["Carbon steel", "Stainless steel"],
    features: ["Resistance welded", "MIG/TIG welded", "Heavy gauge", "High load capacity"],
    relatedProducts: ["wire-frames", "structural-supports", "equipment-frames"],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // RACKS & SHELVING
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "wire-racks",
    name: "Wire Rack",
    pluralName: "Wire Racks",
    category: "Racks & Shelving",
    description: "Industrial wire racks for storage, display, and organization. Custom sizes and configurations available.",
    applications: ["Storage", "Display", "Organization", "Material handling"],
    industries: ["Retail", "Warehousing", "Food service", "Healthcare"],
    materials: ["Chrome plated", "Stainless steel", "Powder coated", "Galvanized"],
    features: ["Adjustable shelves", "Mobile options", "Custom sizes", "High capacity"],
    relatedProducts: ["wire-shelving", "display-racks", "storage-racks"],
  },
  {
    slug: "wire-shelving",
    name: "Wire Shelving",
    pluralName: "Wire Shelving Units",
    category: "Racks & Shelving",
    description: "Wire shelving systems for commercial, industrial, and food service applications. NSF certified options available.",
    applications: ["Commercial storage", "Food service", "Healthcare", "Retail"],
    industries: ["Food service", "Healthcare", "Retail", "Warehousing"],
    materials: ["Chrome plated", "Stainless steel", "Epoxy coated"],
    features: ["NSF certified", "Adjustable", "Ventilated", "Easy assembly"],
    relatedProducts: ["wire-racks", "storage-shelving", "utility-carts"],
  },
  {
    slug: "display-racks",
    name: "Display Rack",
    pluralName: "Display Racks",
    category: "Racks & Shelving",
    description: "Wire display racks for retail, trade shows, and point-of-purchase applications. Custom designs available.",
    applications: ["Retail display", "Trade shows", "POP displays", "Showrooms"],
    industries: ["Retail", "Trade shows", "Marketing", "Hospitality"],
    materials: ["Chrome plated", "Powder coated", "Black oxide"],
    features: ["Custom designs", "Portable options", "Branded finishes", "Easy assembly"],
    relatedProducts: ["wire-racks", "retail-fixtures", "sign-holders"],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // GRIDS & MESH
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "wire-grids",
    name: "Wire Grid",
    pluralName: "Wire Grids",
    category: "Grids & Mesh",
    description: "Welded wire grids for shelving, partitions, security, and industrial applications. Custom patterns and sizes.",
    applications: ["Shelving", "Partitions", "Security panels", "Conveyor decking"],
    industries: ["Warehousing", "Manufacturing", "Security", "Material handling"],
    materials: ["Carbon steel", "Galvanized", "Stainless steel", "Powder coated"],
    features: ["Welded intersections", "Custom patterns", "Various gauges", "Cut to size"],
    relatedProducts: ["mesh-panels", "wire-partitions", "security-grids"],
  },
  {
    slug: "mesh-panels",
    name: "Mesh Panel",
    pluralName: "Mesh Panels",
    category: "Grids & Mesh",
    description: "Wire mesh panels for partitions, guarding, architectural applications, and industrial enclosures.",
    applications: ["Machine guarding", "Partitions", "Security enclosures", "Architectural screens"],
    industries: ["Manufacturing", "Security", "Architecture", "Warehousing"],
    materials: ["Steel", "Stainless steel", "Aluminum", "Powder coated"],
    features: ["Various mesh sizes", "Framed options", "Custom sizes", "Modular systems"],
    relatedProducts: ["wire-grids", "security-panels", "partition-systems"],
  },
  // ═══════════════════════════════════════════════════════════════════════════
  // SPECIALTY PRODUCTS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    slug: "oven-racks",
    name: "Oven Rack",
    pluralName: "Oven Racks",
    category: "Specialty Products",
    description: "Custom oven racks for industrial heat treating, baking, and curing operations. High-temperature materials available.",
    applications: ["Heat treating", "Baking", "Curing", "Powder coating"],
    industries: ["Food processing", "Metal finishing", "Automotive", "Aerospace"],
    materials: ["Stainless steel 304", "Stainless steel 330", "Inconel"],
    features: ["High temperature", "Flat or crowned", "Custom sizes", "Multiple tiers"],
    relatedProducts: ["heat-treat-baskets", "conveyor-belts", "baking-racks"],
  },
  {
    slug: "conveyor-guards",
    name: "Conveyor Guard",
    pluralName: "Conveyor Guards",
    category: "Specialty Products",
    description: "Safety guards for conveyor systems including nip point guards, sprocket guards, and full enclosures.",
    applications: ["Nip point protection", "Sprocket guarding", "Belt guarding", "Full enclosures"],
    industries: ["Manufacturing", "Food processing", "Distribution", "Mining"],
    materials: ["Steel", "Stainless steel", "Powder coated"],
    features: ["OSHA compliant", "Quick release", "Hinged access", "See-through mesh"],
    relatedProducts: ["machine-guards", "safety-guards", "perimeter-guards"],
  },
  {
    slug: "automotive-wire-forms",
    name: "Automotive Wire Form",
    pluralName: "Automotive Wire Forms",
    category: "Specialty Products",
    description: "Wire forms for automotive applications including seat frames, exhaust hangers, brackets, and safety components.",
    applications: ["Seat frames", "Exhaust hangers", "Brackets", "Clips", "Safety components"],
    industries: ["Automotive OEM", "Automotive aftermarket", "Tier 1 suppliers"],
    materials: ["Carbon steel", "Spring steel", "Stainless steel"],
    features: ["PPAP capable", "High volume", "Tight tolerances", "IATF 16949 ready"],
    relatedProducts: ["wire-frames", "spring-clips", "exhaust-components"],
  },
  {
    slug: "agricultural-wire-products",
    name: "Agricultural Wire Product",
    pluralName: "Agricultural Wire Products",
    category: "Specialty Products",
    description: "Wire products for agricultural applications including ground staples, fencing components, and harvest equipment.",
    applications: ["Ground staples", "Fencing", "Harvest baskets", "Equipment guards"],
    industries: ["Agriculture", "Landscaping", "Farming", "Greenhouse"],
    materials: ["Galvanized steel", "Stainless steel", "Zinc coated"],
    features: ["Corrosion resistant", "UV stable coatings", "Heavy duty", "Outdoor rated"],
    relatedProducts: ["ground-staples", "fencing-components", "harvest-baskets"],
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(category: string): ProductData[] {
  return products.filter((product) => product.category === category);
}

export function getProductsByIndustry(industry: string): ProductData[] {
  return products.filter((product) => 
    product.industries.some((ind) => ind.toLowerCase().includes(industry.toLowerCase()))
  );
}
