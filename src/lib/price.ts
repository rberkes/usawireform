export const PRICE_LINE =
  "Lowest prices guaranteed. We will not be beat. 100-piece minimum.";

export const QUOTE_REVIEW =
  "All instant quotes are subject to quote department review.";

/** Shop rate card for Ask estimates. Customer supplies the coil. */
export const FORMING_RATES = {
  cutUsd: 1,
  bendUsd: 0.5,
  inchUsd: 0.05,
  cutLabel: "$1.00 per cut",
  bendLabel: "$0.50 per bend",
  inchLabel: "$0.05 per inch",
  material:
    "Customer buys the material and brings it to the shop. We form it. We do not sell coil.",
  coil:
    "We work with all steels processed by coil, and all aluminum alloys in coil including 6061-T6. If it comes in a coil, we process it.",
} as const;

export const TOOLING = {
  stock: '3/8", 7/16", and 1/2"',
  newLead: "7–10 business days",
  newCostUsd: 3500,
  newCostLabel: "about $3,500 per wire size",
} as const;

export const PRICE_ITEMS = [
  {
    label: "Lowest prices",
    value: "Lowest prices guaranteed on 4–14 mm CNC wire forming.",
  },
  {
    label: "Will not be beat",
    value: "Show a competing quote on the same print. Our prices will not be beat.",
  },
  {
    label: "100-piece minimum",
    value: "100 pcs to start. 5% off at 1,000. 10% off at 10,000.",
  },
] as const;
