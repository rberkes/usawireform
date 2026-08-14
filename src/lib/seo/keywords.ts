/**
 * SEO Keywords Strategy
 * 
 * Industrial buyers search with HIGH SPECIFICITY:
 * - Process + Material + Application + Requirement
 * - NOT generic terms like "wire forming"
 * 
 * Focus: Low volume, HIGH INTENT keywords that generate RFQs
 */

// Core brand and capability terms (always included)
export const CORE_KEYWORDS = [
  // Brand
  "USA Wire Form",
  
  // Primary process (what you DO)
  "CNC wire forming",
  "3D CNC wire forming", 
  "CNC wire bending",
  "custom wire forming",
  "precision wire forming",
  
  // Diameter range (your specialty)
  "heavy gauge wire forming",
  "4-14 mm wire forming",
  "3/8 inch wire forming",
  "10 gauge wire forming",
  
  // Location (geo-targeting)
  "wire forming Ohio",
  "wire forming manufacturer USA",
  "Northeast Ohio wire forming",
  "Cleveland wire forming",
];

// High-intent product keywords (what you MAKE)
export const PRODUCT_KEYWORDS = [
  // Baskets & containers
  "custom wire baskets",
  "industrial wire baskets",
  "stainless steel wire baskets",
  "parts washing baskets",
  "dipping baskets",
  
  // Guards & safety
  "wire machine guards",
  "fan guards",
  "OSHA wire guards",
  "equipment guards",
  "safety guards wire",
  
  // Frames & structural
  "wire frames custom",
  "welded wire frames",
  "tube frame fabrication",
  
  // Hooks & hangers
  "industrial S-hooks",
  "heavy duty S-hooks",
  "custom wire hooks",
  "wire hangers industrial",
  
  // Grids & trays  
  "wire grids custom",
  "cable trays",
  "wire mesh grids",
  "oven racks custom",
  
  // Displays & retail
  "wire display racks",
  "point of purchase wire displays",
  "retail wire fixtures",
];

// Industry-specific keywords (WHO you serve)
export const INDUSTRY_KEYWORDS = [
  // High-value industries
  "automotive wire forms",
  "data center cable trays",
  "solar panel wire forms",
  "HVAC wire guards",
  "agricultural wire products",
  "food processing wire baskets",
  "medical device wire forms",
  
  // OEM focus
  "OEM wire forming",
  "contract wire forming",
  "wire form supplier OEM",
];

// Buyer-intent keywords (ready to purchase)
export const INTENT_KEYWORDS = [
  // Quote-ready
  "wire forming quote",
  "custom wire form quote",
  "wire forming RFQ",
  "wire basket quote",
  
  // Supplier search
  "wire forming manufacturer",
  "wire form supplier",
  "wire forming company",
  "wire bending services",
  
  // Problem-solving
  "custom wire forms low volume",
  "wire forming prototype",
  "quick turn wire forming",
  "100 piece minimum wire forming",
  
  // Price-focused (your differentiator)
  "low cost wire forming",
  "affordable wire forming",
  "competitive wire forming pricing",
];

// Material keywords
export const MATERIAL_KEYWORDS = [
  "carbon steel wire forming",
  "stainless steel wire forming",
  "galvanized wire forming",
  "1018 steel wire forms",
  "304 stainless wire forms",
  "316 stainless wire forms",
];

// Process/capability keywords  
export const PROCESS_KEYWORDS = [
  "resistance welding wire",
  "wire straightening cutting",
  "wire bending services",
  "MIG welding wire forms",
  "TIG welding wire forms",
  "powder coating wire forms",
  "zinc plating wire forms",
];

// Long-tail high-intent combinations (these generate RFQs)
export const LONGTAIL_KEYWORDS = [
  "custom wire baskets stainless steel USA",
  "CNC wire forming manufacturer Ohio",
  "heavy gauge wire bending service",
  "3D CNC wire forming low volume",
  "wire basket manufacturer 100 piece minimum",
  "industrial wire guards custom",
  "welded wire frames manufacturer",
  "OEM wire forming supplier USA",
];

// All keywords combined for meta tags
export const ALL_KEYWORDS = [
  ...CORE_KEYWORDS,
  ...PRODUCT_KEYWORDS.slice(0, 10),
  ...INDUSTRY_KEYWORDS.slice(0, 5),
  ...INTENT_KEYWORDS.slice(0, 5),
];
