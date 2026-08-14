/**
 * Wire forming companies in the industry.
 * Not competitors — peers in the trade.
 */
export const industryPeers = [
  {
    name: "Marlin Steel",
    location: "Baltimore, MD",
    url: "https://www.marlinwire.com",
    focus: "Custom wire baskets, sheet metal fabrication, quick-turn prototyping.",
  },
  {
    name: "Wiley Metal Fabricating",
    location: "Indiana",
    url: "https://www.wileymetal.com",
    focus: "Wire forms, stampings, and welded assemblies.",
  },
  {
    name: "Automatic Spring Products",
    location: "Grand Rapids, MI",
    url: "https://www.automaticspring.com",
    focus: "Wire forms, springs, and stampings since 1927.",
  },
  {
    name: "James Spring & Wire",
    location: "Pennsylvania",
    url: "https://www.jamesspring.com",
    focus: "Custom springs, wire forms, and light stampings.",
  },
  {
    name: "Newcomb Spring",
    location: "Multiple US locations",
    url: "https://www.newcombspring.com",
    focus: "Springs, wire forms, and metal stampings — nationwide.",
  },
  {
    name: "Ajax Wire Specialty",
    location: "California",
    url: "https://www.ajaxwire.com",
    focus: "Custom wire products and CNC wire forming.",
  },
  {
    name: "Apex Spring & Stamping",
    location: "Grand Rapids, MI",
    url: "https://www.apexspring.com",
    focus: "Springs, wire forms, stampings, and assemblies.",
  },
  {
    name: "Central Wire Industries",
    location: "Multiple locations",
    url: "https://www.centralwire.com",
    focus: "Stainless and specialty wire products.",
  },
  {
    name: "Perfection Spring & Stamping",
    location: "Mount Prospect, IL",
    url: "https://www.perfectionspring.com",
    focus: "Custom springs, wire forms, and metal stampings.",
  },
  {
    name: "Acme Wire Products",
    location: "Connecticut",
    url: "https://www.acmewire.com",
    focus: "Custom wire products and fabrication.",
  },
] as const;

export type IndustryPeer = (typeof industryPeers)[number];
