import { WIRE } from "@/lib/range";
import type { PowderHookNode } from "@/lib/powder-hook-tree";

const CELL = WIRE.label;

/**
 * Round-wire 0.180 / 0.250 in boxes this cell forms.
 * Not diamond (square wire), C-LAW, spring-tube, light locking V, swivels, or wheel kits.
 */
export const POWDER_HOOK_EPSI: PowderHookNode[] = [
  {
    slug: ["listed-bags"],
    title: "0.180 and 0.250 in Hook Prices",
    h1: "0.180 and 0.250 in hook prices",
    description: `Round-wire V, C, S, CV, and 90° V boxes in 0.180 in and 0.250 in. 5% under the published cards. Same lengths and counts. ${CELL}. 100-piece minimum.`,
    lede: "Where we list a 0.180 or 0.250 in round-wire box, that box is 5% under the published card. Light wire stays off this list.",
    cluster: "price",
    weight: 4,
    keywords: [
      "powder coating hook prices",
      "C-hook prices",
      "V-hook prices",
      "S-hook prices",
      "CV-hook prices",
      "0.180 in hooks",
    ],
    alsoCalled: [
      "HC series",
      "HV series",
      "HS series",
      "HCV series",
      "HV90 series",
    ],
    render: "epsi",
    sections: [],
    faqs: [],
  },
  {
    slug: ["hc-series-c-hooks"],
    title: "HC Series C-Hooks",
    h1: "HC-series C-hooks",
    description: `Round-wire C-hooks in 0.180 in and 0.250 in. Same lengths, 1½ in bowl, and box counts as the published HC cards. 5% under. ${CELL}. Not 0.060–0.120 in.`,
    lede: "Open C, daisy-chain hang. Round coil. Only the HC sizes that sit in 4–14 mm.",
    cluster: "style",
    weight: 4,
    priceBand: "c",
    keywords: [
      "HC series C-hooks",
      "HC C-hooks",
      "powder coating C-hooks 0.180",
    ],
    alsoCalled: ["HC series", "open-C finishing hooks"],
    sections: [
      {
        id: "what",
        heading: "What we list",
        body: [
          "HC C-hooks are round wire with a bowl. This cell forms that path from coil. Published HC boxes in 0.180 in (4.57 mm) and 0.250 in (6.35 mm) are in band: 6, 8, 12, and 18 in, 1½ in bowl, same box counts. Five percent under those published boxes. USAWF part numbers.",
          "HC 0.060, 0.080, and 0.120 in — including the 3 in, 4 in, 10 in, and 15 in light SKUs — are under 4 mm. We name them and do not quote them as stock.",
        ],
      },
      {
        id: "print",
        heading: "Custom C outside the card",
        body: [
          "Listed boxes include carbon. Custom C outside this grid: you buy the coil. 100-piece minimum. Builder on /powder-coating-hooks/c-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are these someone else's part numbers?",
        answer:
          "No. Same length, wire, bowl, and count. Our part numbers. 5% under the published box.",
      },
      {
        question: "Can you run HC 0.120 in?",
        answer: "No. 0.120 in is 3.05 mm. This cell starts at 4 mm.",
      },
    ],
  },
  {
    slug: ["hs-series-s-hooks"],
    title: "HS Series S-Hooks",
    h1: "HS-series S-hooks",
    description: `Round-wire S-hooks in 0.180 in and 0.250 in. Same lengths, 1½ in bowl, and box counts as the published HS cards. 5% under. ${CELL}. Not 0.060–0.120 in.`,
    lede: "Two opposite curves. Round coil. Only the HS sizes in 4–14 mm.",
    cluster: "style",
    weight: 4,
    priceBand: "s",
    keywords: [
      "HS series S-hooks",
      "HS S-hooks",
      "powder coating S-hooks 0.180",
    ],
    alsoCalled: ["HS series"],
    sections: [
      {
        id: "what",
        heading: "What we list",
        body: [
          "HS S-hooks are round wire with a bowl. In-band published boxes: 0.180 in at 6, 12, 18 in; 0.250 in at 6, 8, 10, 12, 18 in. 1½ in bowl. Same counts. 5% under. USAWF part numbers.",
          "HS 0.060–0.120 in is under 4 mm — not listed. There is no published HS 0.180 in 8 in box; we do not invent one.",
        ],
      },
      {
        id: "print",
        heading: "Custom S",
        body: [
          "Listed boxes include carbon. Custom S outside this grid: you buy the coil. Builder on /powder-coating-hooks/s-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you clone catalog part numbers?",
        answer: "No. Length, wire, bowl, count. Our SKU. 5% under the published box.",
      },
    ],
  },
  {
    slug: ["hv-series-v-hooks"],
    title: "HV Series V-Hooks",
    h1: "HV-series V-hooks",
    description: `Round-wire V-hooks in 0.180 in and 0.250 in. Same lengths, legs, and box counts as the published HV cards. 5% under. We buy the steel. ${CELL}. Not 0.060–0.120 in.`,
    lede: "Dual V. Centered hang. Round coil. Only the HV sizes in 4–14 mm.",
    cluster: "style",
    weight: 4,
    priceBand: "v",
    keywords: [
      "HV series V-hooks",
      "HV V-hooks",
      "powder coating V-hooks 0.180",
    ],
    alsoCalled: ["HV series"],
    sections: [
      {
        id: "what",
        heading: "What we list",
        body: [
          "HV V-hooks are round wire with two legs. In-band: 0.180 in at 4, 6, 8, 12, 18, 24 in; 0.250 in at 6, 8, 12, 15, 18, 24 in. Legs 0.81 in on the 4 in card, 1 in on the rest. Same box counts. 5% under. We buy the carbon.",
          "HV 0.060–0.120 in, including 3 in, 10 in, 30 in light SKUs, is under 4 mm — not listed.",
        ],
      },
      {
        id: "print",
        heading: "Custom V",
        body: [
          "Heavier V, 7/16, 1/2 in, or a length not on this card: /heavy-duty-v-hooks or the builder on /powder-coating-hooks/v-hooks. We still buy the steel on V.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are these catalog SKUs?",
        answer:
          "No. Same length, wire, legs, and count. USAWF part number. 5% under the published box.",
      },
    ],
  },
  {
    slug: ["hcv-series-cv-hooks"],
    title: "HCV Series CV-Hooks",
    h1: "HCV-series CV-hooks",
    description: `Round-wire CV-hooks in 0.180 in and 0.250 in. Same lengths, 1½ in bowl, and box counts as the published HCV cards. 5% under. ${CELL}. Not 0.060–0.120 in.`,
    lede: "C clearance plus a V locate. Round coil. Only the HCV sizes in 4–14 mm.",
    cluster: "style",
    weight: 4,
    priceBand: "cv",
    keywords: [
      "HCV series CV-hooks",
      "HCV CV-hooks",
      "hybrid C-V hooks",
    ],
    alsoCalled: ["HCV series", "hybrid C/V hooks"],
    sections: [
      {
        id: "what",
        heading: "What we list",
        body: [
          "HCV is a C plus a V on one wire. In-band published boxes: 0.180 in at 6, 8, 10, 12, 18, 24 in; 0.250 in at 12 in. 1½ in bowl. Same counts. 5% under. USAWF part numbers.",
          "HCV 0.060–0.120 in is under 4 mm — not listed. We do not invent a 0.250 in 6 in HCV box that is not on the published card.",
        ],
      },
      {
        id: "print",
        heading: "Custom CV",
        body: [
          "Listed boxes include carbon. Custom CV outside this grid: you buy the coil. Builder on /powder-coating-hooks/cv-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you stock HCV 0.120 in?",
        answer: "No. Under 4 mm.",
      },
    ],
  },
  {
    slug: ["hv90-series-90-degree-v-hooks"],
    title: "HV90 Series 90° V-Hooks",
    h1: "HV90-series 90° V-hooks",
    description: `Round-wire 90° V-hooks in 0.180 in and 0.250 in. Same lengths, legs, and box counts as the published HV90 cards. 5% under. We buy the steel. ${CELL}. Not 0.060–0.120 in.`,
    lede: "V hang, rotated 90°. Round coil. Only the HV90 sizes in 4–14 mm.",
    cluster: "style",
    weight: 4,
    priceBand: "90v",
    keywords: [
      "HV90 series",
      "90 degree V-hooks 0.180",
      "HV90 V-hooks",
    ],
    alsoCalled: ["HV90 series", "right-angle V-hooks"],
    sections: [
      {
        id: "what",
        heading: "What we list",
        body: [
          "HV90 is a V with a 90° offset. In-band published boxes: 0.180 in at 6 and 12 in; 0.250 in at 6, 8, and 12 in. 1 in legs. Same counts. 5% under. We buy the carbon.",
          "HV90 0.060–0.120 in, including 3, 4, 10, 18, 24, and 30 in light SKUs, is under 4 mm — not listed. 90° C and 90° CV are not an HV90 card; those are a print on /powder-coating-hooks/90-degree-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you list HV90 0.120 in 24 in?",
        answer: "No. 0.120 in is under 4 mm.",
      },
    ],
  },
];
