/**
 * Central configuration for USA Wire Form
 * All business constants and settings in one place
 */

// Company Information
export const config = {
  company: {
    name: "USA Wire Form",
    tagline: "4–14 mm 3D CNC Wire Forming",
    location: "Northeast Ohio",
    experience: "50+ years",
  },
  
  contact: {
    email: "info@usawireform.com",
    quoteEmail: "info@usawireform.com",
  },
  
  site: {
    url: "https://usawireform.com",
    host: "usawireform.com",
  },
  
  // Wire capabilities
  wire: {
    minMm: 4,
    maxMm: 14,
    minIn: 0.157,
    maxIn: 0.551,
    stockSizes: ["3/8", "7/16", "1/2"] as const,
  },
  
  // Pricing and quoting
  pricing: {
    minimumQuantity: 100,
    setupFee: 175,
    toolingRange: { min: 2500, max: 6900 },
    programmingFee: 175,
    coilMinimum: { min: 1500, max: 2500 }, // lbs
    quantityBreaks: [
      { qty: 1000, discount: 0.05 },
      { qty: 10000, discount: 0.10 },
    ],
  },
  
  // File upload
  upload: {
    maxSizeBytes: 50 * 1024 * 1024, // 50MB
    acceptedExtensions: [
      "step", "stp", "stpz",
      "iges", "igs",
      "pdf", "dxf", "dwg",
      "sldprt", "sldasm",
    ],
  },
  
  // SEO
  seo: {
    defaultTitle: "USA Wire Form — 4–14 mm 3D CNC Wire Forming",
    defaultDescription: "USA Wire Form: 4–14 mm 3D CNC wire forming in Northeast Ohio. Lowest prices guaranteed. 100-piece minimum. Frames, wire baskets, guards.",
    keywords: [
      "wire forming",
      "CNC wire forming",
      "wire bending",
      "custom wire forms",
      "wire fabrication",
      "4-14 mm wire",
      "Northeast Ohio manufacturing",
    ],
  },
  
  // Social/certifications
  certifications: [
    { name: "ISO 9001:2015", description: "Quality Management" },
    { name: "RoHS Compliant", description: "Environmental Standards" },
  ],
  
  // Analytics (IDs go here when configured)
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    vercelAnalytics: true,
  },
} as const;

// Type exports for use throughout the app
export type Config = typeof config;
export type StockSize = typeof config.wire.stockSizes[number];
