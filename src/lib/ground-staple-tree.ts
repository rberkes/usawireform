import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";

export const GROUND_STAPLE_ROOT = "/ground-staples";

export type GroundStapleCluster =
  | "style"
  | "application"
  | "material"
  | "size"
  | "price"
  | "market";

export type GroundStapleRender = "article" | "prices";

export type GroundStapleNode = {
  slug: string[];
  title: string;
  h1: string;
  description: string;
  lede: string;
  cluster: GroundStapleCluster;
  /** 1–5. Cloud size only — not search volume. */
  weight: number;
  keywords: string[];
  alsoCalled: string[];
  sections: { id: string; heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
  render?: GroundStapleRender;
};

export type GroundStaplePlayer = {
  name: string;
  url: string;
  sells: string;
  vsUs: string;
};

const CELL = WIRE.label;
const TOOLING = STOCK;

/** Published landscape-staple houses. Named because they are on the open web — not a directory invention. */
export const GROUND_STAPLE_PLAYERS: GroundStaplePlayer[] = [
  {
    name: "Sandbaggy",
    url: "https://www.sandbaggy.com",
    sells:
      "Landscape staples in 11 ga volume boxes plus a USA 8 ga ladder (6 in and 12 in). Import 8 ga SKUs sit under the USA card.",
    vsUs:
      "11 ga is under 4 mm — we do not quote it. Their USA 8 ga 6 in and 12 in cards are the public ladder we undercut 5%. We do not clone their SKU strings.",
  },
  {
    name: "Cove West",
    url: "https://covewest.com",
    sells: "California pin mill. Landscape and erosion pins. Quote-only. No public bag card.",
    vsUs: "A real pin mill. We are a 4–14 mm CNC cell. Heavy 3/8–1/2 in Us are mill math here, not their quote.",
  },
  {
    name: "DeWitt",
    url: "https://www.dewittcompany.com",
    sells: "Landscape fabric plus 11 ga sod staples in contractor boxes. 6×1×6 is the volume SKU.",
    vsUs: "11 ga sod boxes are out of this cell. Same U job, lighter wire. We name it and refuse it.",
  },
  {
    name: "SRW / Hanes Geo",
    url: "https://www.hanesgeo.com",
    sells: "Geotextile, erosion blanket, and landscape pins sold with the fabric roll.",
    vsUs: "A geosynthetics house. We form the pin from coil when the wire is 4–14 mm. We do not sell their fabric.",
  },
  {
    name: "EMI",
    url: "https://www.erosionprevention.com",
    sells: "Erosion-control staples and pins, often 11 ga, packed with blankets.",
    vsUs: "Blanket-pack 11 ga is not this floor. 8 ga and heavy stock Us are.",
  },
];

export function groundStapleHref(slug: string[]) {
  return slug.length === 0
    ? GROUND_STAPLE_ROOT
    : `${GROUND_STAPLE_ROOT}/${slug.join("/")}`;
}

function page(
  slug: string[],
  title: string,
  h1: string,
  cluster: GroundStapleCluster,
  weight: number,
  extras: Omit<
    GroundStapleNode,
    "slug" | "title" | "h1" | "cluster" | "weight"
  >,
): GroundStapleNode {
  return { slug, title, h1, cluster, weight, ...extras };
}

export const GROUND_STAPLE_TREE: GroundStapleNode[] = [
  page(
    ["sod-staples"],
    "Sod Staples",
    "Sod staples",
    "style",
    5,
    {
      description: `Sod staples from coil in ${WIRE.short}. 8 ga landscape Us in band. 11 ga sod boxes are under 4 mm — no. 100-piece minimum.`,
      lede: "Same U as a landscape staple. Turf and sod crews say sod. The print is still a U.",
      keywords: ["sod staples", "sod pins", "sod staples 8 gauge"],
      alsoCalled: ["sod pins", "turf staples", "sod nails"],
      sections: [
        {
          id: "job",
          heading: "The job",
          body: [
            "A sod staple is a U that holds sod, turf, or blanket until the roots take. Volume market is 11 ga 6×1×6 — under 4 mm. This cell starts at 8 ga (4.11 mm) and runs stock 3/8, 7/16, and 1/2 in when the hold has to last.",
            `${CELL}. Stock ${TOOLING}. 11 ga and 9 ga: we name them, we do not quote them.`,
          ],
        },
      ],
      faqs: [
        {
          question: "Do you make 11 gauge sod staples?",
          answer:
            "No. 11 ga is under 4 mm. 8 ga (0.162 in) is the lightest card in this cell. Heavy stock is 3/8, 7/16, and 1/2 in.",
        },
      ],
    },
  ),
  page(
    ["landscape-staples"],
    "Landscape Staples",
    "Landscape staples",
    "style",
    5,
    {
      description: `Landscape staples CNC from coil in ${WIRE.short}. 8 ga bags 5% under published USA cards. Heavy 3/8–1/2 in on mill math. 100-piece minimum.`,
      lede: "Fabric, edging, drip, blanket. One U. Wire size is the print.",
      keywords: ["landscape staples", "landscape pins", "landscape fabric staples"],
      alsoCalled: ["landscape pins", "garden landscape staples", "fabric pins"],
      sections: [
        {
          id: "band",
          heading: "In this cell",
          body: [
            "Published USA 8 ga landscape staples, 6 in and 12 in legs, sit in the 4 mm floor. We list those bags 5% under the public USA ladder. 1/4 in and stock 3/8, 7/16, 1/2 in are mill math — shop steel, $1/cut, $0.09/in on 3/8 in scaled by section, then 5% off.",
            "11 ga contractor boxes are a different mill. We do not race them.",
          ],
        },
      ],
      faqs: [
        {
          question: "What sizes of landscape staples do you form?",
          answer: `8 ga (4.11 mm) 6 in and 12 in on the bag card. Custom 8 ga, 1/4 in, and stock ${TOOLING} on the builder. ${CELL}. 100-piece minimum.`,
        },
      ],
    },
  ),
  page(
    ["fabric-staples"],
    "Fabric Staples",
    "Fabric staples",
    "style",
    4,
    {
      description: `Landscape fabric staples from coil. Square-top 8 ga in band. Heavy fabric pins in ${TOOLING}. 100-piece minimum.`,
      lede: "Weed barrier, geotextile, blanket. Square top sits on the fabric.",
      keywords: ["fabric staples", "landscape fabric staples", "weed barrier staples"],
      alsoCalled: ["fabric pins", "weed-barrier staples", "cloth pins"],
      sections: [
        {
          id: "top",
          heading: "Square vs round",
          body: [
            "Square top is the fabric pin: a flat crown that will not slice the roll. Round / circle top is drip and pipe. Same developed length. Crown is usually 1 in on the 8 ga card.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["garden-staples"],
    "Garden Staples",
    "Garden staples",
    "style",
    3,
    {
      description: `Garden staples in 8 ga and heavier stock. ${CELL}. 4 in garden packs are 11 ga — out. 100-piece minimum.`,
      lede: "Retail 4 in packs are under 4 mm. Production garden pins start at 8 ga.",
      keywords: ["garden staples", "garden pins", "garden fabric staples"],
      alsoCalled: ["garden pins", "garden landscape staples"],
      sections: [
        {
          id: "packs",
          heading: "Not the 4 in pack",
          body: [
            "Big-box 4 in garden staples are 11 ga or lighter. Under 4 mm. This floor does not run that box. 6 in and 12 in 8 ga, then heavy stock, are the quote.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["u-pins"],
    "U-Pins",
    "U-pins",
    "style",
    4,
    {
      description: `U-pins and U-staples from coil in ${WIRE.short}. Landscape, erosion, irrigation, solar. 100-piece minimum.`,
      lede: "A U is a U. Sod, fabric, erosion — same form, different buyer.",
      keywords: ["U-pins", "U staples", "U-shaped landscape pins"],
      alsoCalled: ["U staples", "U-shaped pins", "hairpin staples"],
      sections: [
        {
          id: "form",
          heading: "The form",
          body: [
            "Two legs, a crown, cutoff. 2D CNC. Square or round top. Developed length is 2 × leg + crown on a square top. Shop buys the steel — same as V-hooks.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["anchor-pins"],
    "Anchor Pins",
    "Anchor pins",
    "style",
    3,
    {
      description: `Ground anchor pins from coil. Landscape and erosion Us in ${WIRE.short}. Not a concrete lift anchor.`,
      lede: "Dirt pin. Not a lifting U in a slab.",
      keywords: ["anchor pins", "ground anchor pins", "landscape anchor pins"],
      alsoCalled: ["ground anchors", "soil pins"],
      sections: [
        {
          id: "not",
          heading: "Not a lift insert",
          body: [
            "A landscape anchor pin is a U in soil. A lifting U-anchor is a different part — concrete, often heavier, often a different cell. Send the print if it is a 4–14 mm round-wire U.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["square-top"],
    "Square-Top Staples",
    "Square-top staples",
    "style",
    4,
    {
      description: `Square-top ground staples. Fabric crown. 8 ga bags and custom in ${WIRE.short}. 100-piece minimum.`,
      lede: "Flat crown. Sits on fabric. Will not roll off the mat.",
      keywords: ["square top staples", "square-top landscape staples", "square crown pins"],
      alsoCalled: ["square crown staples", "flat-top pins"],
      sections: [
        {
          id: "when",
          heading: "When square",
          body: [
            "Landscape fabric, weed barrier, erosion blanket, turf. The crown is a 1 in flat on the published 8 ga card. Custom crown on the builder.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["round-top"],
    "Round-Top Staples",
    "Round-top staples",
    "style",
    4,
    {
      description: `Round-top ground staples and circle-top pins for drip, pipe, and tubing. CNC in ${WIRE.short}.`,
      lede: "Radiused crown. Holds hose without a sharp edge.",
      keywords: ["round top staples", "round-top landscape staples", "circle top pins"],
      alsoCalled: ["circle-top pins", "round crown staples"],
      sections: [
        {
          id: "when",
          heading: "When round",
          body: [
            "Drip tubing, irrigation laterals, low-voltage wire. Round top is the same developed length as square on a 1 in crown, different bend.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["circle-top"],
    "Circle-Top Pins",
    "Circle-top pins",
    "style",
    3,
    {
      description: `Circle-top landscape pins from coil. Same family as round-top staples. ${CELL}.`,
      lede: "Another name for a round crown. Drip and pipe.",
      keywords: ["circle top pins", "circle-top staples", "loop top landscape pins"],
      alsoCalled: ["loop-top pins", "round-top pins"],
      sections: [
        {
          id: "name",
          heading: "Same pin",
          body: [
            "Circle-top, round-top, loop-top: one form. Crown radius on the print. 8 ga in band. Heavy stock when the line is cable, not drip.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["landscape-fabric"],
    "Landscape Fabric Pins",
    "Landscape fabric",
    "application",
    4,
    {
      description: `Pins for landscape fabric. Square-top 8 ga in ${WIRE.short}. Heavy fabric in stock ${TOOLING}.`,
      lede: "The fabric is theirs. The pin is ours — 4–14 mm.",
      keywords: ["landscape fabric staples", "landscape fabric pins", "weed fabric staples"],
      alsoCalled: ["weed fabric pins", "cloth staples"],
      sections: [
        {
          id: "hold",
          heading: "Hold-down",
          body: [
            "Landscape fabric houses sell 11 ga pins with the roll. That pin is under 4 mm. 8 ga square-top is the overlap. Wind, slope, and gravel beds often want 3/8 in and up.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["weed-barrier"],
    "Weed Barrier Pins",
    "Weed barrier pins",
    "application",
    3,
    {
      description: `Weed barrier staples from coil. Square-top landscape pins in ${WIRE.short}. 100-piece minimum.`,
      lede: "Barrier is the roll. The staple keeps it down.",
      keywords: ["weed barrier staples", "weed barrier pins", "weed cloth staples"],
      alsoCalled: ["weed cloth pins", "barrier staples"],
      sections: [
        {
          id: "size",
          heading: "Wire",
          body: [
            "Retail weed-barrier packs are 11 ga. Production pins here start at 8 ga. Custom length on the builder.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["erosion"],
    "Erosion Staples",
    "Erosion staples",
    "application",
    4,
    {
      description: `Erosion-control staples from coil. Blanket pins in 8 ga and heavy stock ${TOOLING}. ${CELL}.`,
      lede: "Blanket and matting. Heavier wire on slope.",
      keywords: ["erosion staples", "erosion control pins", "erosion blanket staples"],
      alsoCalled: ["erosion pins", "matting staples", "blanket pins"],
      sections: [
        {
          id: "slope",
          heading: "Slope",
          body: [
            "Erosion blanket packs often ship 11 ga. That is out. 8 ga holds light blanket. Channel, shore, and solar berms take 3/8–1/2 in stock Us from this cell.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["geotextile"],
    "Geotextile Pins",
    "Geotextile pins",
    "application",
    4,
    {
      description: `Geotextile pins and fabric staples from coil in ${WIRE.short}. Square-top. 100-piece minimum.`,
      lede: "Nonwoven, woven, blanket. Pin wire is the print — not the roll spec.",
      keywords: ["geotextile pins", "geotextile staples", "geotextile fabric pins"],
      alsoCalled: ["geo pins", "filter-fabric staples"],
      sections: [
        {
          id: "spec",
          heading: "The spec",
          body: [
            "Geotextile houses spec a pin with the fabric. If that pin is 11 ga, we refuse it. If it is 8 ga or a stock diameter, we form it from coil.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["artificial-turf"],
    "Artificial Turf Staples",
    "Artificial turf",
    "application",
    3,
    {
      description: `Artificial turf staples from coil. 8 ga and heavy landscape Us in ${WIRE.short}.`,
      lede: "Turf edges and seams. Not a 11 ga sod box.",
      keywords: ["artificial turf staples", "synthetic turf pins", "turf staples"],
      alsoCalled: ["synthetic turf staples", "putting-green pins"],
      sections: [
        {
          id: "edge",
          heading: "Edges",
          body: [
            "Turf installers often grab 6 in landscape staples. 8 ga is in band. Seams on a windy field want heavier stock — send the pin length and diameter.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["irrigation"],
    "Irrigation Staples",
    "Irrigation staples",
    "application",
    4,
    {
      description: `Irrigation staples and drip-line pins from coil. Round-top in ${WIRE.short}. 100-piece minimum.`,
      lede: "Laterals, dripline, poly. Round crown. Not a 11 ga garden pack.",
      keywords: ["irrigation staples", "irrigation pins", "drip irrigation staples"],
      alsoCalled: ["drip pins", "poly-line staples"],
      sections: [
        {
          id: "round",
          heading: "Round top",
          body: [
            "Irrigation pins are usually round-top so the tube is not cut. 8 ga 6 in is the overlap with published landscape cards. Heavier laterals take stock wire.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["drip-tubing"],
    "Drip Tubing Pins",
    "Drip tubing pins",
    "application",
    3,
    {
      description: `Drip tubing pins from coil. Round-top landscape staples in ${WIRE.short}.`,
      lede: "1/4 in and 1/2 in drip. Crown radius on the print.",
      keywords: ["drip tubing pins", "drip line staples", "drip irrigation pins"],
      alsoCalled: ["drip line pins", "micro-irrigation staples"],
      sections: [
        {
          id: "tube",
          heading: "Tube",
          body: [
            "Round-top 8 ga holds typical drip. 1/4 in wire is a different pin — in band, needs tooling, mill math. Not the 8 ga bag.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["solar"],
    "Solar-Field Staples",
    "Solar-field staples",
    "application",
    3,
    {
      description: `Solar-field ground staples from coil. Cable and fabric hold-downs in stock ${TOOLING}. ${CELL}.`,
      lede: "Tracker rows, DC cable, erosion on the berm. Heavy U.",
      keywords: ["solar field staples", "solar cable staples", "PV site landscape staples"],
      alsoCalled: ["solar pins", "tracker fabric staples"],
      sections: [
        {
          id: "field",
          heading: "The field",
          body: [
            "Solar sites use landscape staples on fabric and cable trays on the row. Light 11 ga is out. 8 ga for fabric. Stock 3/8–1/2 in when the U is a cable hold-down.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["agriculture"],
    "Agriculture Staples",
    "Agriculture staples",
    "application",
    3,
    {
      description: `Agriculture ground staples from coil. Fabric, irrigation, and erosion Us in ${WIRE.short}.`,
      lede: "Row cover, drip, ditch. Same U. Diameter on the print.",
      keywords: ["agriculture staples", "farm landscape staples", "agricultural fabric pins"],
      alsoCalled: ["farm pins", "row-cover staples"],
      sections: [
        {
          id: "farm",
          heading: "Farm",
          body: [
            "Ag fabric pins are often 11 ga boxes. We do not run those. 8 ga and stock diameters for row cover that has to stay, drip mains, and washout.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["8-gauge"],
    "8 Gauge Ground Staples",
    "8 gauge",
    "size",
    5,
    {
      description:
        "8 gauge (0.162 in / 4.11 mm) landscape staples. 6 in and 12 in bags 5% under published USA 8 ga cards. Carbon. 100-piece minimum.",
      lede: "Lightest published card in this cell. 4.11 mm. In the 4 mm floor.",
      keywords: ["8 gauge staples", "8 ga landscape staples", "8 gauge sod staples"],
      alsoCalled: ["8 ga pins", "0.162 in staples"],
      sections: [
        {
          id: "card",
          heading: "The card",
          body: [
            "Published USA 8 ga landscape staples, 6 in and 12 in, 1 in crown, carbon. We take 5% off that ladder. Same legs. Steel in the lot. 100-piece minimum.",
            "CNC $1/cut cannot beat a staple mill at box qty on 8 ga. The bag card is how this cell meets that size. Custom 8 ga off 6/12 or off 1 in crown uses mill math.",
          ],
        },
      ],
      faqs: [
        {
          question: "Is 8 gauge the same as 4 mm?",
          answer:
            "8 ga is 0.162 in, 4.11 mm. 4 mm is 0.157 in — the floor of the cell. Close. 8 ga is the published landscape card we list.",
        },
      ],
    },
  ),
  page(
    ["8-gauge", "6-inch"],
    "8 Gauge 6 Inch Staples",
    "8 ga · 6 inch",
    "size",
    4,
    {
      description:
        "8 gauge 6 inch landscape staples. 5% under published USA 8 ga 6 in cards. USAWF-GS-8-06. 100-piece minimum.",
      lede: "Six-inch legs. One-inch crown. The volume 8 ga length.",
      keywords: ["8 gauge 6 inch staples", "6 inch 8 ga landscape staples"],
      alsoCalled: ["6 in 8 ga pins"],
      sections: [
        {
          id: "sku",
          heading: "Part no.",
          body: [
            "USAWF-GS-8-06. Bags 100 to 40,000 on the price list. 5% under the published USA 8 ga 6 in ladder. Carbon. Steel in the lot.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["8-gauge", "12-inch"],
    "8 Gauge 12 Inch Staples",
    "8 ga · 12 inch",
    "size",
    4,
    {
      description:
        "8 gauge 12 inch landscape staples. 5% under published USA 8 ga 12 in cards. USAWF-GS-8-12. 100-piece minimum.",
      lede: "Twelve-inch legs. Same 8 ga. Deeper hold.",
      keywords: ["8 gauge 12 inch staples", "12 inch 8 ga landscape staples"],
      alsoCalled: ["12 in 8 ga pins"],
      sections: [
        {
          id: "sku",
          heading: "Part no.",
          body: [
            "USAWF-GS-8-12. Bags 100 to 40,000 on the price list. 5% under the published USA 8 ga 12 in ladder.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["quarter-inch"],
    "1/4 Inch Ground Staples",
    "1/4 in staples",
    "size",
    4,
    {
      description: `1/4 in (0.250 in) ground staples from coil. In ${WIRE.short}. Needs tooling. Mill math. 100-piece minimum.`,
      lede: "Between 8 ga and 3/8 stock. Not a bag card.",
      keywords: ["1/4 inch ground staples", "quarter inch landscape staples", "0.250 ground staples"],
      alsoCalled: ["0.250 in pins", "6.35 mm staples"],
      sections: [
        {
          id: "tooling",
          heading: "Tooling",
          body: [
            "1/4 in is in band. It is not 3/8, 7/16, or 1/2 stock. New tooling if we have not run it. Price is V-hook mill math: shop steel, $1/cut, inch rate scaled by section, then 5% off.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["375"],
    "3/8 Inch Ground Staples",
    "3/8 in staples",
    "size",
    4,
    {
      description: `3/8 in (0.375 in) ground staples. Stock tooling. Shop steel. ${CELL}. 100-piece minimum.`,
      lede: "Stock U. Heavy landscape, cable, erosion.",
      keywords: ["3/8 ground staples", "0.375 ground staples", "9.5 mm landscape staples"],
      alsoCalled: ["0.375 in pins", "9.53 mm staples"],
      sections: [
        {
          id: "stock",
          heading: "Stock",
          body: [
            `3/8 in is stock on this cell. ${TOOLING}. No public Sandbaggy-style bag for this diameter — mill math. We buy the steel.`,
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["heavy-duty"],
    "Heavy-Duty Ground Staples",
    "Heavy-duty ground staples",
    "size",
    5,
    {
      description: `Heavy-duty ground staples in 3/8, 7/16, and 1/2 in. Stock tooling. Shop steel. ${CELL}. 100-piece minimum.`,
      lede: "The hold 8 ga will not make. Stock Us. Mill math.",
      keywords: [
        "heavy-duty ground staples",
        "heavy duty landscape staples",
        "7/16 ground staples",
        "1/2 inch ground staples",
      ],
      alsoCalled: ["heavy landscape pins", "heavy U-staples"],
      sections: [
        {
          id: "stock",
          heading: "Stock diameters",
          body: [
            `Stock tooling is ${TOOLING}. 7/16 in and 1/2 in almost never have a published bag card. We form them as CNC Us, buy the steel, $1/cut, $0.09/in on 3/8 in scaled by (d/0.375)², then 5% off.`,
            "8 ga is not heavy-duty. It is the light end of this cell, on a bag card.",
          ],
        },
      ],
      faqs: [
        {
          question: "Do you form 7/16 and 1/2 inch ground staples?",
          answer: `Yes. Both are stock. Custom leg and crown on /custom-ground-staples. ${CELL}. 100-piece minimum.`,
        },
      ],
    },
  ),
  page(
    ["7-16"],
    '7/16" Ground Staples',
    '7/16" ground staples',
    "size",
    5,
    {
      description: `7/16 in (0.438 in) ground staples. Stock tooling. Shop steel. USAWF-GS-438. ${CELL}.`,
      lede: "Stock heavy U. Between 3/8 and 1/2.",
      keywords: ["7/16 ground staples", "7/16 landscape staples", "0.438 ground staples"],
      alsoCalled: ["0.438 in pins", "11.11 mm staples"],
      sections: [
        {
          id: "sku",
          heading: "Part family",
          body: [
            "USAWF-GS-438-{leg}. Example 6 in: USAWF-GS-438-06. No published competitor bag — mill math on the builder.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["1-2"],
    '1/2" Ground Staples',
    '1/2" ground staples',
    "size",
    5,
    {
      description: `1/2 in (0.500 in) ground staples. Stock tooling. Shop steel. USAWF-GS-500. ${CELL}.`,
      lede: "Heaviest stock U on this floor.",
      keywords: ["1/2 inch ground staples", "half inch landscape staples", "0.500 ground staples"],
      alsoCalled: ["0.500 in pins", "12.7 mm staples"],
      sections: [
        {
          id: "sku",
          heading: "Part family",
          body: [
            "USAWF-GS-500-{leg}. Example 6 in: USAWF-GS-500-06. Cable, solar, and erosion that 8 ga will not hold.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["6-inch"],
    "6 Inch Ground Staples",
    "6 inch",
    "size",
    4,
    {
      description: `6 inch ground staples. 8 ga bags and custom diameters in ${WIRE.short}. 100-piece minimum.`,
      lede: "The common landscape leg. Wire size is still the print.",
      keywords: ["6 inch ground staples", "6 inch landscape staples", "6 inch sod staples"],
      alsoCalled: ["6 in pins", "6″ landscape staples"],
      sections: [
        {
          id: "leg",
          heading: "Leg",
          body: [
            "6 in is the published 8 ga length and a common custom leg on heavy stock. Crown still belongs on the print — 1 in on the 8 ga card.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["8-inch"],
    "8 Inch Ground Staples",
    "8 inch",
    "size",
    3,
    {
      description: `8 inch ground staples from coil. Custom 8 ga and stock ${TOOLING}. Not a published 8 ga bag.`,
      lede: "Between the 6 in and 12 in cards. Mill math.",
      keywords: ["8 inch ground staples", "8 inch landscape staples"],
      alsoCalled: ["8 in pins"],
      sections: [
        {
          id: "custom",
          heading: "Custom length",
          body: [
            "No public USA 8 ga 8 in ladder on the card we match. 8 in legs are a print — builder mill math, or 8 ga bag only if you take 6 or 12.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["12-inch"],
    "12 Inch Ground Staples",
    "12 inch",
    "size",
    4,
    {
      description: `12 inch ground staples. 8 ga bags 5% under published USA 12 in cards. Heavy 12 in Us on mill math.`,
      lede: "Deeper hold. Same U.",
      keywords: ["12 inch ground staples", "12 inch landscape staples", "12 inch sod staples"],
      alsoCalled: ["12 in pins", "12″ landscape staples"],
      sections: [
        {
          id: "leg",
          heading: "Leg",
          body: [
            "12 in 8 ga is on the bag list. 12 in in 3/8–1/2 in is the builder. Developed length is 2 × 12 + crown.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["galvanized"],
    "Galvanized Ground Staples",
    "Galvanized",
    "material",
    4,
    {
      description: `Galvanized ground staples from coil. 8 ga bags are carbon galv. Heavy stock galv in ${WIRE.short}.`,
      lede: "Outdoor carbon. Zinc on the wire. Shop buys it.",
      keywords: ["galvanized ground staples", "galvanized landscape staples", "galv sod staples"],
      alsoCalled: ["zinc landscape staples", "galv U-pins"],
      sections: [
        {
          id: "coat",
          heading: "Coat",
          body: [
            "Published USA 8 ga landscape staples are galvanized carbon. Our bag card is that alloy. Heavy stock: galvanized coil in the mill math at $0.95/lb.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["steel"],
    "Steel Ground Staples",
    "Bright steel",
    "material",
    3,
    {
      description: `Steel ground staples — 1018 mill / bright. Custom in ${WIRE.short}. 8 ga bags are the galv landscape card unless the print says mill.`,
      lede: "Mill carbon. Indoor or paint-after. Outdoor is usually galv.",
      keywords: ["steel ground staples", "bright basic landscape staples", "1018 ground staples"],
      alsoCalled: ["mill-finish staples", "bright pins"],
      sections: [
        {
          id: "mill",
          heading: "Mill",
          body: [
            "1018 mill at $0.90/lb in the heavy calculator. 8 ga bag card is the published galv landscape ladder. Bright 8 ga is a print.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["stainless"],
    "Stainless Ground Staples",
    "Stainless",
    "material",
    2,
    {
      description: `Stainless steel ground staples in 304 or 316. CNC from coil in ${WIRE.short}. Mill math. 100-piece minimum.`,
      lede: "Coastal, chemical, permanent. Not the 8 ga bag.",
      keywords: ["stainless ground staples", "304 landscape staples", "316 ground staples"],
      alsoCalled: ["304 pins", "316 U-staples"],
      sections: [
        {
          id: "alloy",
          heading: "Alloy",
          body: [
            "304 or 316 on the builder. Shop steel at $3.20/lb and $4.40/lb. No 8 ga bag for stainless — mill math only.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["11-gauge"],
    "11 Gauge Staples",
    "11 gauge",
    "market",
    2,
    {
      description:
        "11 gauge sod and landscape staples are under 4 mm. This cell does not form them. 8 ga is the step up.",
      lede: "We name it. We do not quote it.",
      keywords: ["11 gauge staples", "11 ga sod staples", "11 gauge landscape staples"],
      alsoCalled: ["11 ga pins", "6×1×6 sod staples"],
      sections: [
        {
          id: "out",
          heading: "Out of cell",
          body: [
            "11 ga is about 0.120 in, 3.05 mm. Under the 4 mm floor. DeWitt, SRW, EMI, and the big-box sod box live here. We do not.",
            "The step up is 8 ga (4.11 mm) on /ground-staples/8-gauge.",
          ],
        },
      ],
      faqs: [
        {
          question: "Can you make 11 gauge sod staples?",
          answer: "No. Under 4 mm. 8 gauge is the lightest staple we list.",
        },
      ],
    },
  ),
  page(
    ["9-gauge"],
    "9 Gauge Staples",
    "9 gauge",
    "market",
    1,
    {
      description:
        "9 gauge landscape staples are under 4 mm. This cell does not form them. 8 ga is in band.",
      lede: "Named so the search does not bounce. Not a quote.",
      keywords: ["9 gauge staples", "9 ga landscape staples"],
      alsoCalled: ["9 ga pins"],
      sections: [
        {
          id: "out",
          heading: "Out of cell",
          body: [
            "9 ga is about 0.148 in, 3.76 mm. Still under 4 mm. 8 ga (4.11 mm) is the floor we list.",
          ],
        },
      ],
      faqs: [],
    },
  ),
  page(
    ["prices"],
    "Ground Staple Prices",
    "Prices",
    "price",
    5,
    {
      description:
        "8 gauge landscape staple prices. 5% under published USA 8 ga 6 in and 12 in cards. Carbon. 100-piece minimum. Heavy stock on the builder.",
      lede: "Bag card for 8 ga. Mill math for everything else.",
      keywords: ["ground staple prices", "landscape staple prices", "8 gauge staple prices"],
      alsoCalled: ["8 ga bag prices"],
      sections: [],
      faqs: [],
      render: "prices",
    },
  ),
  page(
    ["market"],
    "Ground Staple Market",
    "Market",
    "market",
    3,
    {
      description:
        "Who sells ground staples: Sandbaggy, Cove West, DeWitt, SRW/Hanes Geo, EMI — and this Ohio 4–14 mm CNC cell.",
      lede: "Staple mills, fabric houses, and a CNC cell. Different jobs.",
      keywords: [
        "ground staple manufacturers",
        "Sandbaggy",
        "Cove West",
        "DeWitt staples",
      ],
      alsoCalled: ["landscape staple suppliers"],
      sections: [
        {
          id: "map",
          heading: "Who does what",
          body: [
            "Sandbaggy publishes USA 8 ga bags and a cheaper import 8 ga, plus 11 ga volume. Cove West is a California pin mill, quote-only. DeWitt, SRW/Hanes Geo, and EMI sell fabric and 11 ga pins with the roll.",
            "This floor is none of those houses. It is a 4–14 mm CNC wire cell in Northeast Ohio. 8 ga bags 5% under the published USA 8 ga ladder. Heavy 3/8–1/2 in Us on mill math. 11 ga: no.",
          ],
        },
        {
          id: "honest",
          heading: "What we will not claim",
          body: [
            "We do not clone a Sandbaggy or DeWitt SKU number. We do not quote 11 ga or 9 ga. We do not race import 8 ga. We do not invent a bag card for 7/16 and 1/2 in.",
          ],
        },
      ],
      faqs: [
        {
          question: "Are you cheaper than Sandbaggy?",
          answer:
            "On listed USA 8 ga 6 in and 12 in bags: 5% under their published USA ladder. On 11 ga: we do not quote. On import 8 ga: we do not race it. Heavy stock is the calculator, not their bag.",
        },
      ],
    },
  ),
  page(
    ["custom"],
    "Custom Ground Staples",
    "Custom",
    "style",
    4,
    {
      description: `Custom ground staples from coil. Leg, crown, square or round top, ${WIRE.short}. 100-piece minimum.`,
      lede: "The print is the pin. Builder on this site.",
      keywords: ["custom ground staples", "custom landscape staples", "custom U-pins"],
      alsoCalled: ["made-to-print staples", "custom sod pins"],
      sections: [
        {
          id: "builder",
          heading: "Builder",
          body: [
            "Live estimate on /custom-ground-staples. 8 ga + 1 in crown + 6 or 12 in legs + carbon uses the bag card. Everything else: shop steel, $1/cut, 3/8 in inch rate scaled by section, then 5% off.",
          ],
        },
      ],
      faqs: [
        {
          question: "Can you make custom ground staples?",
          answer: `Yes. Leg, crown, top, diameter, alloy. ${CELL}. Stock ${TOOLING}. 100-piece minimum.`,
        },
      ],
    },
  ),
];

const byKey = new Map(
  GROUND_STAPLE_TREE.map((node) => [node.slug.join("/"), node] as const),
);

export function groundStapleNode(slug: string[]) {
  return byKey.get(slug.join("/"));
}

export function groundStapleChildren(slug: string[]) {
  const prefix = slug.join("/");
  const depth = slug.length + 1;
  return GROUND_STAPLE_TREE.filter((node) => {
    if (node.slug.length !== depth) return false;
    if (slug.length === 0) return true;
    return node.slug.slice(0, slug.length).join("/") === prefix;
  });
}

export function groundStapleParent(slug: string[]) {
  if (slug.length <= 1) return undefined;
  return groundStapleNode(slug.slice(0, -1));
}

export function groundStapleSiblings(slug: string[]) {
  if (slug.length === 0) return [];
  return groundStapleChildren(slug.slice(0, -1)).filter(
    (node) => node.slug.join("/") !== slug.join("/"),
  );
}

export function groundStapleStaticParams() {
  return GROUND_STAPLE_TREE.map((node) => ({ slug: node.slug }));
}

export function groundStapleCloud() {
  return [...GROUND_STAPLE_TREE].sort(
    (a, b) => b.weight - a.weight || a.h1.localeCompare(b.h1),
  );
}
