import { STOCK } from "@/lib/catalog";
import { WIRE } from "@/lib/range";
import type { PowderHookStyleId } from "@/lib/powder-coating-hooks";
import type { EpsiHookStyle } from "@/lib/epsi-hook-prices";
import { POWDER_HOOK_EPSI } from "@/lib/powder-hook-epsi";
import { POWDER_HOOK_ROUND_WIRE } from "@/lib/powder-hook-round";

export const POWDER_HOOK_ROOT = "/powder-coating-hooks";

export type PowderHookCluster =
  | "style"
  | "application"
  | "material"
  | "size"
  | "price"
  | "market";

export type PowderHookRender = "article" | "style" | "prices" | "square" | "epsi";

export type PowderHookNode = {
  slug: string[];
  title: string;
  h1: string;
  description: string;
  lede: string;
  cluster: PowderHookCluster;
  /** 1–5. Cloud size only — not search volume. */
  weight: number;
  keywords: string[];
  alsoCalled: string[];
  sections: { id: string; heading: string; body: string[] }[];
  faqs: { question: string; answer: string }[];
  render?: PowderHookRender;
  styleId?: PowderHookStyleId;
  priceBand?: EpsiHookStyle;
};

export type PowderHookPlayer = {
  name: string;
  url: string;
  sells: string;
  vsUs: string;
};

/** Published finishing-hook houses. Named because they are on the open web — not a directory invention. */
export const POWDER_HOOK_PLAYERS: PowderHookPlayer[] = [
  {
    name: "Mighty Hook",
    url: "https://mightyhook.com",
    sells:
      "Industrial hooks, racks, load bars, and masking. Waukegan, Illinois. Catalog plus engineered hanging under the conveyor.",
    vsUs:
      "A hanging-system house. We form 4–14 mm CNC wire hooks from coil. We do not sell Mighty Hook racks, load bars, or masking.",
  },
  {
    name: "Magic Rack / Production Plus Corp",
    url: "https://magicrack.com",
    sells:
      "Patented adjustable racks, hooks, and carts for powder, wet spray, e-coat, and plating. USA-made hanging systems.",
    vsUs:
      "A rack OEM. We do not build Magic Rack frames. We form the wire hooks a rack takes, in 4–14 mm, from coil.",
  },
  {
    name: "Hook Authority",
    url: "https://hookauthority.com",
    sells:
      "Boxed V, C, CV, S, and 90° finishing hooks. Light-to-medium wire. Online custom builder. Bag quantities.",
    vsUs:
      "Catalog bags. This cell undercuts published 0.180 in and 0.250 in V/S/C bags by 2% on the same lengths. We do not run 0.044–0.120 in.",
  },
  {
    name: "Argon USA",
    url: "https://argonusa.com/masking_square_hanging.php",
    sells: "Masking plus HSQV square hanging hooks in boxed bags.",
    vsUs:
      "Square hanging: we list 0.180, 0.250, and 0.375 in at 5% under their 1-bag and 10-bag cards. 0.120 in HSQV is under 4 mm — no.",
  },
  {
    name: "EPSI",
    url: "https://www.epsi.com/hooks",
    sells:
      "Masking and industrial hooks: S, C, CV, V, 90° V, locking V, diamond, spring tube, C-LAW.",
    vsUs:
      "Round-wire HV/HC/HS/HCV/HV90 in 0.180 in and 0.250 in: we list those boxes 5% under on /powder-coating-hooks/epsi. Diamond is square wire. C-LAW is a 3-prong clamp. Spring-tube and HKVL bags are under 4 mm. Swivels and wheel kits are not this cell.",
  },
  {
    name: "Echo Supply",
    url: "https://www.echosupply.com",
    sells: "Paint hooks and finishing supplies. S, C, V, CV comparison content for coaters.",
    vsUs: "A distributor of finishing supplies. We are the CNC cell that forms the hook from coil.",
  },
  {
    name: "HangOn",
    url: "https://www.hangon.com",
    sells: "Masking and hanging products for industrial finishing, including hooks and racks.",
    vsUs: "Masking-led. We do not sell HangOn plugs, caps, or tapes. Hooks in 4–14 mm from coil, yes.",
  },
  {
    name: "Essentra Components",
    url: "https://www.essentracomponents.com",
    sells: "Masking and some paint/powder hanging hooks, including square-bar V hooks for heavy load.",
    vsUs:
      "Square-bar V-hooks are bar stock, not round coil. This cell is round wire 4–14 mm. Send a round-wire print.",
  },
];

export function powderHookHref(slug: string[]) {
  return slug.length === 0
    ? POWDER_HOOK_ROOT
    : `${POWDER_HOOK_ROOT}/${slug.join("/")}`;
}

const CELL = WIRE.label;
const TOOLING = STOCK;

const POWDER_HOOK_CORE: PowderHookNode[] = [
  {
    slug: ["v-hooks"],
    title: "V-Hooks",
    h1: "V-hooks",
    description: `V-hooks for powder coating, paint, and finishing lines. CNC from coil in ${WIRE.short}. Stock ${TOOLING}. 100-piece minimum.`,
    lede: "Centered hang. Dual legs, a crotch, a length.",
    cluster: "style",
    weight: 5,
    keywords: ["V-hooks", "V hooks", "powder coating V-hooks", "paint V-hooks"],
    alsoCalled: ["V hooks", "vee hooks", "inverted V hooks", "double-V hooks"],
    render: "style",
    styleId: "v-hooks",
    sections: [],
    faqs: [],
  },
  {
    slug: ["c-hooks"],
    title: "C-Hooks",
    h1: "C-hooks",
    description: `C-hooks for powder coating and finishing racks. Open C hang. CNC from coil in ${WIRE.short}.`,
    lede: "Open throat. Fast load. Rack clearance.",
    cluster: "style",
    weight: 5,
    keywords: ["C-hooks", "C hooks", "powder coating C-hooks"],
    alsoCalled: ["C hooks", "open-C hooks", "paint C-hooks"],
    render: "style",
    styleId: "c-hooks",
    sections: [],
    faqs: [],
  },
  {
    slug: ["cv-hooks"],
    title: "CV-Hooks",
    h1: "CV-hooks",
    description: `CV-hooks: C clearance plus a V locate. CNC from coil in ${WIRE.short}.`,
    lede: "One end opens. One end locates.",
    cluster: "style",
    weight: 5,
    keywords: ["CV-hooks", "CV hooks", "C-V hooks", "powder coating CV-hooks"],
    alsoCalled: ["C-V hooks", "CV hangers", "combo C/V hooks"],
    render: "style",
    styleId: "cv-hooks",
    sections: [],
    faqs: [],
  },
  {
    slug: ["s-hooks"],
    title: "S-Hooks",
    h1: "S-hooks",
    description: `S-hooks for powder coating, plant hang, and lift. CNC from coil in ${WIRE.short}.`,
    lede: "Two opposite curves. Speed on the line.",
    cluster: "style",
    weight: 5,
    keywords: ["S-hooks", "S hooks", "powder coating S-hooks"],
    alsoCalled: ["S hooks", "ess hooks", "open-eye S-hooks"],
    render: "style",
    styleId: "s-hooks",
    sections: [],
    faqs: [],
  },
  {
    slug: ["90-degree-hooks"],
    title: "90° Hooks",
    h1: "90° hooks",
    description: `90 degree powder coating hooks: 90° V, C, and CV. CNC from coil in ${WIRE.short}.`,
    lede: "Right-angle offset. Tight racks. Part attitude in the oven.",
    cluster: "style",
    weight: 4,
    keywords: ["90 degree hooks", "90° hooks", "right angle powder coating hooks"],
    alsoCalled: ["90 degree hooks", "right-angle hooks", "offset hooks"],
    render: "style",
    styleId: "90-degree-hooks",
    sections: [],
    faqs: [],
  },
  {
    slug: ["square-hanging-hooks"],
    title: "Square Hanging Hooks",
    h1: "Square hanging hooks",
    description:
      "Square hanging hooks in 0.180, 0.250, and 0.375 in. 5% under published HSQV bags. Carbon. 100-piece minimum.",
    lede: "Squared corners on the hang. Flats on the bar. Same job as an HSQV card.",
    cluster: "style",
    weight: 4,
    keywords: [
      "square hanging hooks",
      "HSQV hooks",
      "square V-hooks",
      "squared hanging hooks",
    ],
    alsoCalled: ["HSQV hooks", "square V hanging hooks", "square-corner V-hooks"],
    render: "square",
    sections: [],
    faqs: [],
  },
  {
    slug: ["prices"],
    title: "Powder Coating Hook Prices",
    h1: "Powder coating hook prices",
    description: `4–10 mm V, S, and C bag prices. 2% under published 0.180 in and 0.250 in bags. ${CELL}.`,
    lede: "Listed bags. Carbon. Steel in the lot. Same lengths as the published cards.",
    cluster: "price",
    weight: 4,
    keywords: [
      "powder coating hook prices",
      "V-hook prices",
      "S-hook prices",
      "C-hook prices",
    ],
    alsoCalled: ["finishing hook prices", "paint hook prices", "bag hook prices"],
    render: "prices",
    sections: [],
    faqs: [],
  },
  {
    slug: ["v-hooks", "stainless"],
    title: "Stainless V-Hooks",
    h1: "Stainless V-hooks",
    description: `Stainless steel V-hooks in 304 or 316 for powder coating wash lines. CNC from coil in ${WIRE.short}. 100-piece minimum.`,
    lede: "304 or 316 when the washer eats carbon. Same V locate.",
    cluster: "material",
    weight: 3,
    keywords: [
      "stainless V-hooks",
      "stainless steel V-hooks",
      "304 V-hooks",
      "316 V-hooks",
    ],
    alsoCalled: ["304 V-hooks", "316 V-hooks", "stainless powder coating V-hooks"],
    sections: [
      {
        id: "why",
        heading: "When stainless",
        body: [
          "Carbon V-hooks rust in wet pretreat and acid wash. 304 is the usual stainless V-hook. 316 when chlorides are on the print.",
          `Same crotch and legs as carbon. ${CELL}. We buy the stainless on custom V. 100-piece minimum. Listed 4–10 mm bags stay carbon.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Do you stock boxed stainless V-hooks?",
        answer:
          "No boxed stainless bags. Stainless V is a print. 304 or 316, length, openings. 100-piece minimum.",
      },
    ],
  },
  {
    slug: ["v-hooks", "steel"],
    title: "Steel V-Hooks",
    h1: "Steel V-hooks",
    description: `Steel V-hooks from carbon coil for powder coating and paint lines. ${CELL}. Stock ${TOOLING}.`,
    lede: "1018 or the grade on the print. Bright or mill into the booth.",
    cluster: "material",
    weight: 3,
    keywords: ["steel V-hooks", "carbon V-hooks", "steel powder coating V-hooks"],
    alsoCalled: ["carbon V-hooks", "1018 V-hooks", "bright basic V-hooks"],
    sections: [
      {
        id: "alloy",
        heading: "Carbon into the booth",
        body: [
          "Everyday steel V-hooks are carbon coil. Bright or mill. Zinc or powder after form only when the hook itself is the finished part.",
          "Listed 4–10 mm V bags include carbon. Custom V: we still buy the steel. Galvanized coil when the print names it.",
        ],
      },
    ],
    faqs: [
      {
        question: "What steel is a powder coating V-hook?",
        answer:
          "Usually 1018 carbon. Grade on the print wins. Stainless is a different page when wash chemistry rusts carbon.",
      },
    ],
  },
  {
    slug: ["v-hooks", "heavy-duty"],
    title: "Heavy-Duty V-Hooks",
    h1: "Heavy-duty V-hooks",
    description: `Heavy-duty V-hooks in 3/8, 7/16, and 1/2 in. CNC from coil. Live calculator. ${CELL}.`,
    lede: "3/8, 7/16, 1/2 in. This cell is the heavy end of finishing hooks.",
    cluster: "size",
    weight: 4,
    keywords: [
      "heavy-duty V-hooks",
      "heavy duty powder coating V-hooks",
      "3/8 V-hooks",
    ],
    alsoCalled: ["heavy V-hooks", "3/8 V-hooks", "1/2 in V-hooks"],
    sections: [
      {
        id: "band",
        heading: "3/8 to 1/2 in",
        body: [
          `Catalog 0.044–0.120 in is not this cell. Heavy-duty V-hooks here are ${TOOLING}. Live three-column estimate on /heavy-duty-v-hooks. We buy the steel, then 5% under boxed 0.375 in on 3/8 in.`,
          "7/16 and 1/2 in are stock on this cell — not a boxed 0.375 catalog size. Inch rate scales with section.",
        ],
      },
    ],
    faqs: [
      {
        question: "Where is the heavy-duty calculator?",
        answer:
          " /heavy-duty-v-hooks — 3/8, 7/16, and 1/2 in columns. Cuts, developed inches, shop steel, then 5% off.",
      },
    ],
  },
  {
    slug: ["v-hooks", "90-degree"],
    title: "90° V-Hooks",
    h1: "90° V-hooks",
    description: `90 degree V-hooks for powder coating racks. Rotate the hang. CNC from coil in ${WIRE.short}.`,
    lede: "V locate, cranked off the bar.",
    cluster: "style",
    weight: 3,
    keywords: ["90 degree V-hooks", "90° V-hooks", "offset V-hooks"],
    alsoCalled: ["90 degree V-hooks", "right-angle V-hooks"],
    sections: [
      {
        id: "offset",
        heading: "Off the bar",
        body: [
          "A 90° V-hook keeps the crotch and adds a right-angle offset so the part hangs beside the rack bar. Tight conveyor centers. Oven face. We buy the steel.",
          "Name rotation, both openings, overall length, diameter. Full lander: /90-degree-v-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a 90° V-hook a different family than a V-hook?",
        answer:
          "No. Same V locate, one extra bend. Still a powder coating V-hook. 100-piece minimum.",
      },
    ],
  },
  {
    slug: ["v-hooks", "paint-line"],
    title: "Paint-Line V-Hooks",
    h1: "Paint-line V-hooks",
    description: `Paint-line V-hooks for wet spray and powder. CNC from coil in ${WIRE.short}. Centered hang through the booth.`,
    lede: "Same V. Wet spray or powder. Ground at the hang.",
    cluster: "application",
    weight: 3,
    keywords: ["paint line V-hooks", "paint V-hooks", "wet spray V-hooks"],
    alsoCalled: ["paint hooks", "paint hanging V-hooks", "booth V-hooks"],
    sections: [
      {
        id: "line",
        heading: "Wet or powder",
        body: [
          "Paint-line V-hooks and powder coating V-hooks are the same wire form when the hang is a V. Wet spray still needs metal-to-metal ground. Name contact if the gun cares.",
          `${CELL}. Not a 9-gauge hardware-store hook.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Are paint-line V-hooks different from powder coating V-hooks?",
        answer:
          "The hang is the same V. Process chemistry and ground spec may differ. Send the print.",
      },
    ],
  },
  {
    slug: ["v-hooks", "e-coat"],
    title: "E-Coat V-Hooks",
    h1: "E-coat V-hooks",
    description: `E-coat V-hooks for electrophoretic lines. Conductive hang. CNC from coil in ${WIRE.short}.`,
    lede: "The bath needs a ground. The V is the contact.",
    cluster: "application",
    weight: 3,
    keywords: ["e-coat V-hooks", "e-coat hooks", "electrophoretic V-hooks"],
    alsoCalled: ["e-coat hooks", "electrocoat V-hooks", "E-coat hangers"],
    sections: [
      {
        id: "ground",
        heading: "Ground in the bath",
        body: [
          "E-coat V-hooks hang the part in the tank and carry current. Build-up on the crotch kills ground — shops strip or swap hooks on a cycle. We form the wire. We do not run an e-coat tank.",
          `${CELL}. Stainless when the bath eats carbon. 100-piece minimum.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Do you e-coat parts?",
        answer:
          "No. This floor forms the hook. E-coat is a secondary some Source shops file. Instant estimate stays this cell.",
      },
    ],
  },
  {
    slug: ["c-hooks", "stainless"],
    title: "Stainless C-Hooks",
    h1: "Stainless C-hooks",
    description: `Stainless C-hooks in 304 or 316 for finishing racks. CNC from coil in ${WIRE.short}. You buy the coil on custom C.`,
    lede: "Open C. Stainless when wash chemistry rusts carbon.",
    cluster: "material",
    weight: 2,
    keywords: ["stainless C-hooks", "304 C-hooks", "stainless powder coating C-hooks"],
    alsoCalled: ["304 C-hooks", "316 C-hooks"],
    sections: [
      {
        id: "coil",
        heading: "Custom C, your coil",
        body: [
          "Listed 4–10 mm C bags are carbon and include steel. Custom stainless C outside that grid: you buy the coil. 100-piece minimum.",
          `Open throat, gap, inside radius on the print. ${CELL}.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Are listed C bags stainless?",
        answer: "No. Listed 4–10 mm C bags are carbon. Stainless C is a print and your coil.",
      },
    ],
  },
  {
    slug: ["c-hooks", "90-degree"],
    title: "90° C-Hooks",
    h1: "90° C-hooks",
    description: `90 degree C-hooks for rack clearance on powder coating lines. CNC from coil in ${WIRE.short}.`,
    lede: "Open C, rotated off the bar.",
    cluster: "style",
    weight: 2,
    keywords: ["90 degree C-hooks", "90° C-hooks", "offset C-hooks"],
    alsoCalled: ["right-angle C-hooks", "offset C-hooks"],
    sections: [
      {
        id: "rotate",
        heading: "Clearance",
        body: [
          "90° C-hooks take the open throat and crank it 90° for conveyor centers that a straight C fouls. You buy the coil on custom C. Name rotation, gap, length, diameter.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do 90° C-hooks include steel?",
        answer:
          "Listed 4–10 mm C bags include carbon. Custom 90° C outside the grid: you buy the coil.",
      },
    ],
  },
  {
    slug: ["cv-hooks", "90-degree"],
    title: "90° CV-Hooks",
    h1: "90° CV-hooks",
    description: `90 degree CV-hooks: C plus V, rotated. CNC from coil in ${WIRE.short}.`,
    lede: "Both openings. Offset hang.",
    cluster: "style",
    weight: 2,
    keywords: ["90 degree CV-hooks", "90° CV-hooks", "offset CV-hooks"],
    alsoCalled: ["right-angle CV-hooks", "90° C-V hooks"],
    sections: [
      {
        id: "both",
        heading: "Clearance and locate, offset",
        body: [
          "90° CV-hooks keep C clearance and V locate, then rotate the hang. Tight racks. Mixed part families. You buy the coil. Both insides, rotation, length, diameter on the print.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 90° CV in the bag grid?",
        answer:
          "No. Listed bags are V, S, and C. CV and 90° CV are a print. 100-piece minimum.",
      },
    ],
  },
  {
    slug: ["s-hooks", "stainless"],
    title: "Stainless S-Hooks",
    h1: "Stainless S-hooks",
    description: `Stainless S-hooks in 304 or 316 for powder coating and plant hang. CNC from coil in ${WIRE.short}.`,
    lede: "Two eyes. Stainless for wet wash.",
    cluster: "material",
    weight: 2,
    keywords: ["stainless S-hooks", "304 S-hooks", "stainless powder coating S-hooks"],
    alsoCalled: ["304 S-hooks", "316 S-hooks"],
    sections: [
      {
        id: "eyes",
        heading: "Open or closed",
        body: [
          "Listed 4–10 mm S bags are carbon and include steel. Custom stainless S outside the grid: you buy the coil. Open eyes for speed. Closed when the hook must stay on a ring.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you form closed-eye stainless S-hooks?",
        answer: "Yes, if the print names a closed eye. 100-piece minimum. Your coil on custom S.",
      },
    ],
  },
  {
    slug: ["90-degree-hooks", "v-hooks"],
    title: "90° Hooks — V",
    h1: "90° V-hooks",
    description: `90° powder coating hooks in the V style. CNC from coil. We buy the steel.`,
    lede: "The usual 90° finishing hook is a V.",
    cluster: "style",
    weight: 2,
    keywords: ["90 degree V-hooks", "90° powder coating V-hooks"],
    alsoCalled: ["90° V hanging hooks"],
    sections: [
      {
        id: "v",
        heading: "V is the stock 90°",
        body: [
          "Most 90° powder coating hooks on this floor are 90° V-hooks. We buy the steel. Builder and lander: /90-degree-v-hooks and /custom-powder-coating-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can 90° hooks be C or CV?",
        answer: "Yes. 90° V we buy the steel. 90° C and CV: you buy the coil.",
      },
    ],
  },
  {
    slug: ["90-degree-hooks", "c-hooks"],
    title: "90° Hooks — C",
    h1: "90° C-hooks",
    description: `90° C-hooks for powder coating. Open throat, offset hang. CNC from coil in ${WIRE.short}.`,
    lede: "Open C, 90° off the bar.",
    cluster: "style",
    weight: 1,
    keywords: ["90 degree C-hooks", "90° C-hooks"],
    alsoCalled: ["offset C-hooks"],
    sections: [
      {
        id: "c",
        heading: "Open and offset",
        body: [
          "Use 90° C when the part needs an open throat and the rack needs the hang beside the bar. Print names rotation, gap, length. Your coil.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 90° C a bag SKU?",
        answer: "No. Bags are straight V, S, and C. 90° C is a print.",
      },
    ],
  },
  {
    slug: ["90-degree-hooks", "cv-hooks"],
    title: "90° Hooks — CV",
    h1: "90° CV-hooks",
    description: `90° CV-hooks for powder coating. C plus V, rotated. CNC from coil in ${WIRE.short}.`,
    lede: "Both openings, offset.",
    cluster: "style",
    weight: 1,
    keywords: ["90 degree CV-hooks", "90° CV-hooks"],
    alsoCalled: ["offset CV-hooks"],
    sections: [
      {
        id: "cv",
        heading: "Mixed hang, offset",
        body: [
          "90° CV when mixed parts need C or V on the same hook family and the rack is tight. Your coil. Both insides and rotation on the print.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you stock 90° CV?",
        answer: "No stock SKU. Print, 100-piece minimum, your coil.",
      },
    ],
  },
  {
    slug: ["stainless"],
    title: "Stainless Powder Coating Hooks",
    h1: "Stainless powder coating hooks",
    description: `Stainless steel powder coating hooks in 304 or 316. V, C, CV, S, 90°. CNC from coil in ${WIRE.short}.`,
    lede: "Wash chemistry. Wet pretreat. Carbon rusts. Stainless lasts.",
    cluster: "material",
    weight: 4,
    keywords: [
      "stainless powder coating hooks",
      "stainless steel powder coating hooks",
      "304 powder coating hooks",
    ],
    alsoCalled: ["304 finishing hooks", "316 powder coating hooks"],
    sections: [
      {
        id: "alloy",
        heading: "304 or 316",
        body: [
          "Stainless powder coating hooks are 304 unless the print says 316. Same styles as carbon: V, C, CV, S, 90°, square hang if the diameter is in band.",
          "Listed 4–10 mm bags are carbon. Stainless is a print. Custom V: we buy the stainless. Custom C, CV, S outside the grid: you buy the coil. Full lander: /stainless-steel-powder-coating-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are bag prices stainless?",
        answer: "No. Published-undercut bags are carbon. Stainless is quoted from the print.",
      },
    ],
  },
  {
    slug: ["steel"],
    title: "Steel Powder Coating Hooks",
    h1: "Steel powder coating hooks",
    description: `Steel powder coating hooks from carbon coil. V, C, CV, S, 90°. ${CELL}.`,
    lede: "Everyday finishing hooks are carbon.",
    cluster: "material",
    weight: 3,
    keywords: ["steel powder coating hooks", "carbon powder coating hooks"],
    alsoCalled: ["carbon finishing hooks", "steel paint hooks"],
    sections: [
      {
        id: "carbon",
        heading: "1018 into the booth",
        body: [
          "Steel powder coating hooks here are carbon coil. Bright or mill. Listed bags include that steel. Stainless is the other branch when the washer demands it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you powder-coat the hook?",
        answer:
          "Line hooks usually go in bright. We powder the hook only when the hook is the finished part, not the hanger.",
      },
    ],
  },
  {
    slug: ["heavy-duty"],
    title: "Heavy-Duty Powder Coating Hooks",
    h1: "Heavy-duty powder coating hooks",
    description: `Heavy-duty powder coating hooks in ${WIRE.short}. 3/8, 7/16, 1/2 in stock. CNC from coil.`,
    lede: "Large parts. Fixtures. Racks. Not a 0.080 in bag.",
    cluster: "size",
    weight: 4,
    keywords: [
      "heavy-duty powder coating hooks",
      "heavy duty finishing hooks",
      "3/8 powder coating hooks",
    ],
    alsoCalled: ["heavy finishing hooks", "large-wire paint hooks"],
    sections: [
      {
        id: "heavy",
        heading: "This cell is the heavy end",
        body: [
          `${CELL}. Stock ${TOOLING}. Light catalog 0.044–0.120 in is a different house. 0.180 and 0.250 in are in band on /powder-coating-hooks/prices. 3/8–1/2 in V: /heavy-duty-v-hooks.`,
        ],
      },
    ],
    faqs: [
      {
        question: "What is heavy-duty here?",
        answer: `Wire in ${WIRE.short}. Stock 3/8, 7/16, 1/2 in. Not a light boxed hook.`,
      },
    ],
  },
  {
    slug: ["custom"],
    title: "Custom Powder Coating Hooks",
    h1: "Custom powder coating hooks",
    description: `Custom powder coating hooks from coil. Style, length, openings, alloy on the print. ${CELL}. 100-piece minimum.`,
    lede: "Not on a bag card. Send the print. Or use the builder.",
    cluster: "style",
    weight: 3,
    keywords: ["custom powder coating hooks", "custom finishing hooks"],
    alsoCalled: ["made-to-print hooks", "special powder coating hooks"],
    sections: [
      {
        id: "print",
        heading: "What to name",
        body: [
          "Style (V, C, CV, S, 90°), overall length, openings, diameter, alloy. STEP or PDF. 100-piece minimum.",
          "Builder: /custom-powder-coating-hooks. Listed 4–10 mm V/S/C bags include carbon. Custom V: we buy the steel. Custom C, CV, S outside the grid: you buy the coil.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you copy a Hook Authority or Mighty Hook SKU?",
        answer:
          "Send the print or a sample with dimensions. We form 4–14 mm CNC wire. We do not clone a catalog SKU number. Light 0.120 in bags are not this cell.",
      },
    ],
  },
  {
    slug: ["paint-hooks"],
    title: "Paint Hooks",
    h1: "Paint hooks",
    description: `Paint hooks for wet spray and powder lines. V, C, CV, S, 90°. CNC from coil in ${WIRE.short}.`,
    lede: "Shops say paint hooks. The hang is still V, C, CV, S, or 90°.",
    cluster: "application",
    weight: 4,
    keywords: ["paint hooks", "paint hanging hooks", "paint line hooks"],
    alsoCalled: ["paint hanging hooks", "spray hooks", "booth hooks"],
    sections: [
      {
        id: "name",
        heading: "A process name, not a shape",
        body: [
          "Paint hooks, paint hanging hooks, and powder coating hooks are the same wire family on this floor. Wet spray or powder. Style is the hang. Diameter is the load.",
          `${CELL}. Ground at metal-to-metal contact. 100-piece minimum.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Do you sell hardware-store paint hooks?",
        answer: "No. CNC from coil in 4–14 mm. Not a 9-gauge bag from a hardware aisle.",
      },
    ],
  },
  {
    slug: ["e-coat-hooks"],
    title: "E-Coat Hooks",
    h1: "E-coat hooks",
    description: `E-coat hooks for electrophoretic coating lines. Conductive CNC wire forms in ${WIRE.short}.`,
    lede: "Bath current travels through the hook. Contact is the spec.",
    cluster: "application",
    weight: 3,
    keywords: ["e-coat hooks", "electrocoat hooks", "e-coat hangers"],
    alsoCalled: ["electrocoat hooks", "E-coat hangers", "e-coating hooks"],
    sections: [
      {
        id: "contact",
        heading: "Contact, then strip",
        body: [
          "E-coat hooks are finishing hooks that must stay conductive. Shops burn off or chemically strip when film kills ground. We form the hook. We do not e-coat and we do not run a burn-off oven on every job.",
          "V, C, CV, S, 90° — same shapes. Stainless when the bath requires it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you strip e-coat off hooks?",
        answer: "No. We form replacement hooks. Burn-off and strip are other plants.",
      },
    ],
  },
  {
    slug: ["rack-hooks"],
    title: "Rack Hooks",
    h1: "Rack hooks",
    description: `Rack hooks for powder coating and paint racks. CNC from coil in ${WIRE.short}. Not a rack OEM.`,
    lede: "The hook on the rack. We form the hook, not the Magic Rack.",
    cluster: "application",
    weight: 3,
    keywords: ["rack hooks", "powder coating rack hooks", "finishing rack hooks"],
    alsoCalled: ["racking hooks", "crossbar hooks", "load-bar hooks"],
    sections: [
      {
        id: "rack",
        heading: "Hook, not the rack",
        body: [
          "Mighty Hook and Magic Rack sell hanging systems — Powder Peg frames, Z-bars, TSR-bars, load bars. We do not. Rack hooks on this floor are round-wire forms that hang from a bar: V, C, CV, S, 90°, Super V, locking V, Z-path, snap, J. See those pages. We do not make peghooks at 0.120 / 0.150 in, TSR lock-ins, or a $150 peg-rack sample kit.",
          "Send the hook print. 100-piece minimum. You buy the coil except V and 90° V.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you build a full coating rack?",
        answer:
          "No. This cell CNC-forms the wire hook. Rack frames are Mighty Hook, Magic Rack, or a fab shop. Source can match a plant that filed racks if they named that work.",
      },
    ],
  },
  {
    slug: ["conveyor-hooks"],
    title: "Conveyor Hooks",
    h1: "Conveyor hooks",
    description: `Conveyor hooks for overhead finishing lines. CNC from coil in ${WIRE.short}.`,
    lede: "The line moves. The hang has to stay put.",
    cluster: "application",
    weight: 3,
    keywords: ["conveyor hooks", "overhead conveyor hooks", "finishing line hooks"],
    alsoCalled: ["overhead hooks", "monorail hooks", "line hooks"],
    sections: [
      {
        id: "line",
        heading: "On a moving bar",
        body: [
          "Conveyor hooks are finishing hooks that ride an overhead bar or load bar. 90° styles when centers are tight. V when the part must not swing into the next carrier.",
          `${CELL}. We do not sell conveyor chain or trolleys.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Do you install conveyors?",
        answer: "No. We form the hooks that hang from them.",
      },
    ],
  },
  {
    slug: ["finishing-hooks"],
    title: "Finishing Hooks",
    h1: "Finishing hooks",
    description: `Finishing hooks for powder, paint, e-coat, and wash. V, C, CV, S, 90°. CNC from coil in ${WIRE.short}.`,
    lede: "The umbrella name. Style is still the hang.",
    cluster: "application",
    weight: 4,
    keywords: ["finishing hooks", "finishing line hooks", "coating hooks"],
    alsoCalled: ["coating hooks", "production hanging hooks", "process hooks"],
    sections: [
      {
        id: "umbrella",
        heading: "One family",
        body: [
          "Finishing hooks, coating hooks, and powder coating hooks are the same search for most shops. This hub is that family. Pick V, C, CV, S, 90°, or square hang from the cloud.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is a finishing hook different from a powder coating hook?",
        answer:
          "Usually no. Finishing includes powder, wet paint, e-coat, and wash. The wire form is the same set of shapes.",
      },
    ],
  },
  {
    slug: ["hangers"],
    title: "Powder Coating Hangers",
    h1: "Powder coating hangers",
    description: `Powder coating hangers and hanging hooks from coil. ${CELL}. 100-piece minimum.`,
    lede: "Hanger is the job. Hook is the shape.",
    cluster: "application",
    weight: 3,
    keywords: ["powder coating hangers", "hanging hooks", "part hangers"],
    alsoCalled: ["part hangers", "hanging hooks", "coating hangers"],
    sections: [
      {
        id: "word",
        heading: "Hanger vs hook",
        body: [
          "Buyers search powder coating hangers and hanging hooks. On this floor the part is a CNC wire hook: V, C, CV, S, 90°, square. Not a stamped hanger, not a plastic mask.",
        ],
      },
    ],
    faqs: [
      {
        question: "Do you make plastic hangers?",
        answer: "No. Round-wire CNC forms in 4–14 mm.",
      },
    ],
  },
  {
    slug: ["grounding-hooks"],
    title: "Grounding Hooks",
    h1: "Grounding hooks",
    description: `Grounding hooks for electrostatic powder and e-coat. Metal-to-metal contact. CNC from coil in ${WIRE.short}.`,
    lede: "The gun needs a path. The hang is the path.",
    cluster: "application",
    weight: 3,
    keywords: ["grounding hooks", "powder coating ground hooks", "conductive hooks"],
    alsoCalled: ["earth hooks", "conductive hanging hooks", "ground hangers"],
    sections: [
      {
        id: "path",
        heading: "Contact area",
        body: [
          "Powder is electrostatic. E-coat is a bath. Both need a ground. Grounding hooks are finishing hooks kept clean at the contact. V crotches collect film — shops specify a point or a strip cycle.",
          "We form the wire. Ground spec belongs on the print. We do not sell grounding clamps or copper braid.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will painted hooks still ground?",
        answer:
          "Film on the contact kills ground. Shops strip or swap. We form replacements. We do not strip.",
      },
    ],
  },
  {
    slug: ["wash-line-hooks"],
    title: "Wash-Line Hooks",
    h1: "Wash-line hooks",
    description: `Wash-line hooks for pretreatment and powder coating washers. CNC from coil in ${WIRE.short}.`,
    lede: "Wet chemistry first. Then the booth.",
    cluster: "application",
    weight: 2,
    keywords: ["wash line hooks", "pretreat hooks", "washer hooks"],
    alsoCalled: ["pretreatment hooks", "phosphate-line hooks", "washer hangers"],
    sections: [
      {
        id: "wet",
        heading: "Wet first",
        body: [
          "Wash-line hooks see alkaline, phosphate, rinse. Carbon rusts. Stainless when the washer is the reason the hook dies. Same V/C/CV/S shapes.",
          `${CELL}. 100-piece minimum.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Should wash-line hooks be stainless?",
        answer: "If the washer rusts carbon, yes. 304 usual. 316 when chlorides are named.",
      },
    ],
  },
  {
    slug: ["curing-oven-hooks"],
    title: "Curing Oven Hooks",
    h1: "Curing oven hooks",
    description: `Curing oven hooks for powder coating and paint ovens. CNC from coil in ${WIRE.short}.`,
    lede: "The part has to stay through heat. The hang cannot open up.",
    cluster: "application",
    weight: 2,
    keywords: ["curing oven hooks", "oven hooks", "powder coating oven hooks"],
    alsoCalled: ["oven hangers", "cure-line hooks", "bake-oven hooks"],
    sections: [
      {
        id: "heat",
        heading: "Heat and load",
        body: [
          "Curing oven hooks are finishing hooks that see oven temperature under load. Undersized light catalog wire can splay. This cell is 4–14 mm. Name load and hang on the print.",
          "We do not rate a catalog 220 lb square-bar V. That is bar stock, not this coil cell.",
        ],
      },
    ],
    faqs: [
      {
        question: "What temperature can the hook take?",
        answer:
          "Carbon and stainless wire take ordinary powder cure temperatures. Load and geometry are the print. We do not publish a fake pound rating without the drawing.",
      },
    ],
  },
  {
    slug: ["4-10mm"],
    title: "4–10 mm Powder Coating Hooks",
    h1: "4–10 mm powder coating hooks",
    description: `4–10 mm powder coating hooks. 0.180 in and 0.250 in in band. Bag prices 2% under published cards.`,
    lede: "The overlap with catalog 0.180 and 0.250 in. Plus metric steps.",
    cluster: "size",
    weight: 3,
    keywords: ["4 mm powder coating hooks", "10 mm hooks", "0.180 powder coating hooks"],
    alsoCalled: ["0.180 in hooks", "0.250 in hooks", "metric finishing hooks"],
    sections: [
      {
        id: "band",
        heading: "In this cell",
        body: [
          "0.180 in is 4.57 mm. 0.250 in is 6.35 mm. Both sit in 4–14 mm. We list those lengths — plus 4, 5, 6, 8, 10 mm — at 2% under published V/S/C bags. 0.120 in is 3.05 mm — no.",
          "Prices: /powder-coating-hooks/prices.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 4 mm the same as 0.157 in?",
        answer: "Yes. 4 mm is the step up from 0.120 in catalog wire.",
      },
    ],
  },
  {
    slug: ["375"],
    title: "3/8 in Powder Coating Hooks",
    h1: "3/8 in powder coating hooks",
    description: `3/8 in (0.375 in) powder coating hooks. Stock V tooling. CNC from coil. 100-piece minimum.`,
    lede: "0.375 in. The everyday heavy V.",
    cluster: "size",
    weight: 3,
    keywords: ["3/8 powder coating hooks", "0.375 V-hooks", ".375 hooks"],
    alsoCalled: ['.375" hooks', "9.53 mm hooks", "3/8 finishing hooks"],
    sections: [
      {
        id: "stock",
        heading: "Stock 3/8 in V",
        body: [
          "3/8 in is 0.375 in is 9.53 mm. Stock V tooling. Custom length. We buy the steel, then 5% under boxed 0.375 in on the heavy-duty calculator. Square hanging 0.375 in is a separate bag card on /powder-coating-hooks/square-hanging-hooks.",
          "Lander: /375-v-hooks.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 3/8 in in the 4–10 mm bag grid?",
        answer:
          "The V/S/C bag grid stops at 10 mm (0.394 in). 3/8 in V is the heavy-duty calculator. 0.375 in square hang is the HSQV-style card.",
      },
    ],
  },
  {
    slug: ["specialty-hooks"],
    title: "Specialty Finishing Hooks",
    h1: "Specialty finishing hooks",
    description:
      "Diamond hooks, C-LAW, spring-tube, locking V, square-bar V — catalog names from hanging houses. This cell is 4–14 mm round-wire CNC.",
    lede: "Those names are real. Most are not this cell.",
    cluster: "style",
    weight: 2,
    keywords: [
      "diamond hooks",
      "C-LAW hooks",
      "spring tube hooks",
      "locking V-hooks",
      "square bar V-hooks",
    ],
    alsoCalled: ["claw hooks", "spring hooks", "locking hooks", "diamond hanging hooks"],
    sections: [
      {
        id: "names",
        heading: "What shops ask for",
        body: [
          "EPSI catalogs diamond (square wire), C-LAW (3-prong clamp), spring-tube (1–3 mm wound), and HKVL locking V at 0.044–0.080 in. Mighty Hook catalogs peghooks, Z-bar lock-ins, TSR snaps, and flat jam. Those SKUs are real. Most are not this cell.",
          "Round-wire 4–14 mm we do form: Super V, locking V (extra bend on a V — not the EPSI HKVL bag), Z-path hooks, jam hooks for large IDs, snap hooks that close on a bar, and J-hooks. Published EPSI HV/HC/HS/HCV/HV90 in 0.180 and 0.250 in: /powder-coating-hooks/epsi, 5% under. Square-bar V is bar stock. Peghooks at 0.120 / 0.150 in and TSR clips at 0.044–0.076 in are under 4 mm — we name them and do not quote them.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you make locking V-hooks?",
        answer:
          "Yes, as round wire in 4–14 mm with the extra stay bend on the print. Not an EPSI 0.080 in SKU. /powder-coating-hooks/locking-v-hooks.",
      },
      {
        question: "Can you make C-LAW or spring-tube hooks?",
        answer:
          "No. C-LAW is a 3-prong clamp (CLAW 200/300 also under 4 mm; CLAW 400 is 4 mm but not a 2D path). Spring-tube is wound 1–3 mm. Diamond is square wire. We do not list those bags.",
      },
    ],
  },
  {
    slug: ["market"],
    title: "Powder Coating Hook Market",
    h1: "The powder coating hook market",
    description:
      "Who sells powder coating hooks: Mighty Hook, Magic Rack, Hook Authority, Argon, EPSI, Echo Supply, HangOn, Essentra — and this Ohio CNC cell.",
    lede: "Catalog bags, rack OEMs, masking houses, and a 4–14 mm CNC cell. Different jobs.",
    cluster: "market",
    weight: 3,
    keywords: [
      "powder coating hook manufacturers",
      "Mighty Hook",
      "Magic Rack",
      "Hook Authority",
    ],
    alsoCalled: ["finishing hook suppliers", "paint hook manufacturers"],
    sections: [
      {
        id: "map",
        heading: "Who does what",
        body: [
          "Mighty Hook and Magic Rack (Production Plus) sell hanging systems — racks, load bars, engineered hooks, often masking too. Hook Authority sells boxed V/C/CV/S/90° bags and a custom builder on light-to-medium wire. Argon publishes HSQV square hanging bags and masking. EPSI, HangOn, Echo Supply, and Essentra sell masking and a hook catalog that includes specialty shapes.",
          "This floor is none of those houses. It is a 4–14 mm CNC wire cell in Northeast Ohio. Instant estimate is this cell. EPSI HV/HC/HS/HCV/HV90 round-wire boxes in 0.180 and 0.250 in: 5% under on /powder-coating-hooks/epsi. Other 4–10 mm V/S/C length steps: 2% under published cards on /powder-coating-hooks/prices. Square hanging undercuts published HSQV by 5%. 0.044–0.120 in catalog hooks: no.",
        ],
      },
      {
        id: "honest",
        heading: "What we will not claim",
        body: [
          "We do not sell Mighty Hook or Magic Rack racks. We do not sell masking plugs. We do not clone a catalog SKU number. We do not quote 0.120 in bags. We do not invent pound ratings on a square-bar V we do not form.",
        ],
      },
    ],
    faqs: [
      {
        question: "Are you cheaper than EPSI?",
        answer:
          "On listed 0.180 in and 0.250 in HV/HC/HS/HCV/HV90 boxes we form: 5% under the published EPSI box, same length and count. On 0.060–0.120 in, diamond, C-LAW, spring-tube, HKVL, swivels, and wheel kits: we do not quote.",
      },
      {
        question: "Are you cheaper than Hook Authority?",
        answer:
          "On listed 4–10 mm V/S/C bags that match published 0.180 and 0.250 in cards: 2% under. On 0.044–0.120 in: we do not quote. Custom heavy V is the calculator, not their bag.",
      },
      {
        question: "Are you a Mighty Hook distributor?",
        answer: "No.",
      },
    ],
  },
];

export const POWDER_HOOK_TREE: PowderHookNode[] = [
  ...POWDER_HOOK_CORE,
  ...POWDER_HOOK_ROUND_WIRE,
  ...POWDER_HOOK_EPSI,
];

const byKey = new Map(
  POWDER_HOOK_TREE.map((node) => [node.slug.join("/"), node] as const),
);

export function powderHookNode(slug: string[]) {
  return byKey.get(slug.join("/"));
}

export function powderHookChildren(slug: string[]) {
  const prefix = slug.join("/");
  const depth = slug.length + 1;
  return POWDER_HOOK_TREE.filter((node) => {
    if (node.slug.length !== depth) return false;
    if (slug.length === 0) return true;
    return node.slug.slice(0, slug.length).join("/") === prefix;
  });
}

export function powderHookParent(slug: string[]) {
  if (slug.length <= 1) return undefined;
  return powderHookNode(slug.slice(0, -1));
}

export function powderHookSiblings(slug: string[]) {
  if (slug.length === 0) return [];
  return powderHookChildren(slug.slice(0, -1)).filter(
    (node) => node.slug.join("/") !== slug.join("/"),
  );
}

export function powderHookStaticParams() {
  return POWDER_HOOK_TREE.map((node) => ({ slug: node.slug }));
}

export function powderHookCloud() {
  return [...POWDER_HOOK_TREE].sort((a, b) => b.weight - a.weight || a.h1.localeCompare(b.h1));
}
