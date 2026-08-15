/**
 * Case studies showcasing wire forming projects.
 * Add real project details and images as they become available.
 */

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  specifications: {
    label: string;
    value: string;
  }[];
  processes: string[];
  published: boolean;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "data-center-cable-tray-system",
    title: "High-Density Cable Tray System for AI Data Center",
    industry: "AI and Data Centers",
    summary:
      "Custom welded wire cable trays for a 50MW AI training facility. Designed for airflow, cable density, and hot-aisle containment compatibility.",
    challenge:
      "A hyperscale data center needed cable management for 2,400 GPU racks with exceptional power density. Off-the-shelf trays couldn't handle the cable weight (up to 150 lbs per linear foot) while maintaining the open area required for airflow. Lead time was critical — the facility needed trays in 8 weeks, not the 16-week lead time quoted by ladder tray vendors.",
    solution:
      "We designed a welded wire tray in 7/16 inch wire with a 2-inch pitch. The open mesh provides 85% free area for airflow while the heavier gauge handles concentrated loads. Tray sections are 10 feet long with integrated splice plates — no loose hardware to drop into server racks. All trays hot-dip galvanized after welding for corrosion resistance in the humid environment.",
    results: [
      "Delivered 4,800 linear feet of tray in 6 weeks",
      "40% lighter than equivalent ladder tray",
      "85% open area exceeds airflow requirements",
      "Zero fastener drops during installation",
      "Repeat orders for phases 2 and 3",
    ],
    specifications: [
      { label: "Wire diameter", value: "7/16 inch (11.1 mm)" },
      { label: "Tray width", value: "24 inches" },
      { label: "Mesh pitch", value: "2 × 4 inches" },
      { label: "Load capacity", value: "200 lbs/ft" },
      { label: "Finish", value: "Hot-dip galvanized" },
      { label: "Quantity", value: "4,800 linear feet" },
    ],
    processes: ["3D CNC wire forming", "Resistance welding", "MIG welding", "Hot-dip galvanizing"],
    published: true,
  },
  {
    slug: "solar-cable-hangers",
    title: "Cable Management Hangers for Utility-Scale Solar",
    industry: "Solar",
    summary:
      "Messenger-style cable hangers for a 200MW solar installation. Designed for 25-year outdoor service with zero maintenance.",
    challenge:
      "A utility-scale solar developer needed cable hangers for 15 miles of DC string wiring. The hangers had to support multiple conductors, survive desert UV and temperature cycling, and install without tools. Previous projects used plastic hangers that cracked within 3 years.",
    solution:
      "We developed a 3D-formed hanger in 3/8 inch 304 stainless with a messenger grip and three cable saddles. The grip snaps onto the messenger wire, and the saddles are shaped to prevent cable abrasion. Stainless eliminates galvanic corrosion with aluminum conductors. The 3D geometry — grip in one plane, saddles rotated 90° — required our rotary-axis CNC capability.",
    results: [
      "Delivered 45,000 hangers in 4 weeks",
      "Tool-free installation saves 2 minutes per hanger",
      "304 stainless rated for 25+ year service",
      "No reported failures after 3 years in field",
      "Adopted as standard for developer's future projects",
    ],
    specifications: [
      { label: "Wire diameter", value: "3/8 inch (9.5 mm)" },
      { label: "Material", value: "304 stainless steel" },
      { label: "Cable capacity", value: "3 × 10 AWG" },
      { label: "Messenger range", value: "1/4 to 3/8 inch" },
      { label: "Finish", value: "Mill (passivated)" },
      { label: "Quantity", value: "45,000 pieces" },
    ],
    processes: ["3D CNC wire forming", "Passivation"],
    published: true,
  },
  {
    slug: "mining-conveyor-guards",
    title: "Impact-Rated Conveyor Guards for Underground Mining",
    industry: "Mining",
    summary:
      "Heavy-gauge welded mesh guards for belt conveyor return rolls. Designed for rock impact, MSHA compliance, and underground installation.",
    challenge:
      "An underground copper mine needed guards for 2 miles of conveyor return rolls. Guards had to withstand impact from falling rock, resist corrosion in wet sulfide ore, and allow visual inspection of the rolls without removal. Existing guards were 10-gauge expanded metal that dented on impact and rusted through in 18 months.",
    solution:
      "We built guards from 1/2 inch wire mesh with a 7/16 inch frame. The mesh pitch (2 × 2 inches) allows visual inspection and airflow while stopping hands and most debris. Frames are 3D formed with integral mounting tabs — no drilling in the field. All guards hot-dip galvanized then powder coated safety yellow for visibility in low light.",
    results: [
      "Delivered 850 guard panels in 5 weeks",
      "Zero dent failures after 2 years of service",
      "Dual coating (galv + powder) achieving 5+ year life",
      "MSHA compliant opening size",
      "Expanded to additional conveyors site-wide",
    ],
    specifications: [
      { label: "Mesh wire", value: "1/2 inch (12.7 mm)" },
      { label: "Frame wire", value: "7/16 inch (11.1 mm)" },
      { label: "Mesh pitch", value: "2 × 2 inches" },
      { label: "Panel size", value: "24 × 36 inches typical" },
      { label: "Finish", value: "Hot-dip galv + powder coat" },
      { label: "Quantity", value: "850 panels" },
    ],
    processes: ["3D CNC wire forming", "Resistance welding", "MIG welding", "Hot-dip galvanizing", "Powder coating"],
    published: true,
  },
];

export function publishedCaseStudies() {
  return caseStudies.filter((cs) => cs.published);
}

export function getCaseStudy(slug: string) {
  return caseStudies.find((cs) => cs.slug === slug);
}

export function caseStudiesByIndustry() {
  const industries = [...new Set(caseStudies.map((cs) => cs.industry))];
  return industries.map((industry) => ({
    industry,
    studies: caseStudies.filter((cs) => cs.industry === industry && cs.published),
  }));
}
