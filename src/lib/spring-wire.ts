import { WIRE } from "@/lib/range";
import type { TopicArticle } from "@/lib/topic-article";

export const SPRING_WIRE_ROOT = "/spring-wire";

export const SPRING_WIRE_PAGES: TopicArticle[] = [
  {
    slug: "a227",
    title: "ASTM A227 Spring Wire",
    h1: "ASTM A227 hard-drawn spring wire",
    description:
      "ASTM A227 hard-drawn carbon steel spring wire for mechanical springs and wire forms. Class I and Class II. 4–14 mm CNC when the coil is in band — not 1018.",
    lede: "A227 is hard-drawn carbon spring wire. Drawn to tensile, not oil-tempered after. Clips, torsion forms, and mechanical springs. Name the class. It is not 1018.",
    keywords: [
      "ASTM A227",
      "A227 spring wire",
      "227 spring wire",
      "hard drawn spring wire",
      "A227 Class I",
      "A227 Class II",
    ],
    alsoCalled: [
      "hard-drawn MB spring wire (trade slang — confirm the ASTM)",
      "HD spring wire",
      "227 wire",
    ],
    sections: [
      {
        id: "what",
        heading: "What A227 is",
        body: [
          "ASTM A227 is the spec for hard-drawn carbon steel wire used in mechanical springs. The wire is drawn to the required tensile. There is no oil-temper after draw, unlike A229. Residual draw stress stays in the coil. Springback on a CNC form is real.",
          "Class I is the commercial / lower-tensile class. Class II is higher tensile. Put the class on the PO. “227” or “spring wire” is not a class.",
        ],
      },
      {
        id: "use",
        heading: "What it is for",
        body: [
          "Extension and torsion springs, snap clips, hairpin cotters that have to spring back, and wire forms that live as a spring whether the title block says so or not.",
          "Hairpin and R-clips in spring temper are often A227 or A229, not 1018. 1018 will take a set. If the clip has to pop back into a hole, name A227 Class I or II, or A229, on the print.",
        ],
      },
      {
        id: "form",
        heading: "Forming on this cell",
        body: [
          `We form A227 from coil in ${WIRE.label} when the diameter, the inside radius, and the head fit. Stock tooling is 3/8, 7/16, and 1/2 in. Min inside radius starts near 1.5–2× diameter — tighter than 1018 wants to crack the outside fiber.`,
          "Most catalog A227 is sold in small spring diameters, well under 4 mm. Those coils belong on a coiler or a light spring CNC, not a 4–14 mm orbit head. We will name that. Heavy A227 in band is a real job here.",
        ],
      },
      {
        id: "vs",
        heading: "A227 vs A228 vs A229",
        body: [
          "A227: hard-drawn, mechanical springs, Class I / II. Cheaper, more residual stress, fine for many clips and general springs.",
          "A228: music-wire quality, very high tensile, usually small diameters. Not a 1/2 in frame wire.",
          "A229: oil-tempered after draw. More uniform, better for cyclic mechanical springs. Specify Class I (MB) or Class II (HB).",
        ],
      },
      {
        id: "print",
        heading: "What the print names",
        body: [
          "ASTM A227, class, diameter, tensile if you care beyond the class table, coating (bare, phosphate, zinc — bake after acid zinc on high tensile), and the form. 100-piece minimum. You buy the coil. We do not sell leftover spring wire.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 227 the same as music wire?",
        answer:
          "No. Music wire is ASTM A228. A227 is hard-drawn mechanical spring wire. Different tensile, different usual diameters, different fatigue story.",
      },
      {
        question: "Can you substitute 1018 for A227 on a clip?",
        answer:
          "Not if the clip has to spring. 1018 takes a set. Name A227 or A229 when snap-back is the job.",
      },
      {
        question: "Do you run A227 under 4 mm?",
        answer: `No as stock on this floor. Under ${WIRE.minMm} mm is a spring cell. We name it. ${WIRE.short} A227 from coil runs here.`,
      },
    ],
    related: [
      { href: SPRING_WIRE_ROOT, label: "Spring wire" },
      { href: "/spring-wire/a229", label: "ASTM A229" },
      { href: "/spring-wire/a228", label: "ASTM A228 music wire" },
      { href: "/hairpin-cotter-pins", label: "Hairpin cotter pins" },
      { href: "/materials", label: "Materials" },
    ],
  },
  {
    slug: "a228",
    title: "ASTM A228 Music Wire",
    h1: "ASTM A228 music spring wire",
    description:
      "ASTM A228 music-wire quality carbon spring wire. Very high tensile. Usual diameters are well under 4 mm — we explain it; we do not run it as 1/2 in frame wire.",
    lede: "Music wire is A228. Highest-quality carbon spring wire, small diameters, high tensile. Not a substitute for 1018 or for 1/2 in A227.",
    keywords: [
      "ASTM A228",
      "A228 music wire",
      "music wire",
      "music spring wire",
    ],
    alsoCalled: ["music spring quality wire", "piano wire (do not spec that)"],
    sections: [
      {
        id: "what",
        heading: "What A228 is",
        body: [
          "ASTM A228 is music spring quality carbon steel wire. Tight chemistry, high tensile, excellent fatigue in small diameters. It is the spec for small compression, extension, and torsion springs — not for frames, trays, or hitch pins.",
          "Trade talk still says “piano wire.” Put A228 on the print. Piano wire as a consumer string is not a forming spec.",
        ],
      },
      {
        id: "size",
        heading: "Diameter",
        body: [
          "Published A228 ranges are typically a few thousandths up through about 0.180 in. That sits under or barely at the 4 mm floor. We do not pretend music wire is stock 3/8 in production.",
          `If a print says A228 at ${WIRE.short}, question the spec. Heavy spring in this band is usually A227, A229, A231, or A401 — not music wire.`,
        ],
      },
      {
        id: "cell",
        heading: "This cell",
        body: [
          "We explain A228 so it is not confused with 1018 or A227. We do not run a music-wire coiler. Small A228 springs belong on a spring CNC or coiler. Send that job to Source if a shop filed that class of cell.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you form music wire clips?",
        answer:
          "Typical A228 clips are under 4 mm. We name that. We do not quote them as 3/8 in stock.",
      },
    ],
    related: [
      { href: SPRING_WIRE_ROOT, label: "Spring wire" },
      { href: "/spring-wire/a227", label: "ASTM A227" },
      { href: "/equipment/machine-comparison", label: "Machine comparison" },
      { href: "/source", label: "Match a print" },
    ],
  },
  {
    slug: "a229",
    title: "ASTM A229 Oil-Tempered Spring Wire",
    h1: "ASTM A229 oil-tempered spring wire",
    description:
      "ASTM A229 oil-tempered carbon steel spring wire (Class I MB, Class II HB) for mechanical springs and snap clips. 4–14 mm from coil when the diameter fits.",
    lede: "A229 is oil-tempered after draw. More uniform than hard-drawn A227. MB and HB are the class names. Not 1018.",
    keywords: [
      "ASTM A229",
      "A229 spring wire",
      "oil tempered spring wire",
      "MB spring wire",
      "HB spring wire",
    ],
    alsoCalled: ["OTMB", "oil-tempered MB", "oil-tempered HB"],
    sections: [
      {
        id: "what",
        heading: "What A229 is",
        body: [
          "ASTM A229 is carbon steel spring wire, oil-tempered after drawing. The temper evens the structure. Fatigue and set resistance are better than A227 for many cyclic springs.",
          "Class I is the MB (medium) oil-tempered grade. Class II is HB (higher tensile). Write A229 Class I or Class II. “MB spring wire” without ASTM is how POs get the wrong coil.",
        ],
      },
      {
        id: "use",
        heading: "Clips and springs",
        body: [
          "Mechanical springs, torsion bars in wire, and hairpin / R-clips that must snap for the life of the assembly. If A227 takes too much set on the first article, A229 is the next carbon spec to try — not a jump to 1018.",
        ],
      },
      {
        id: "form",
        heading: "Forming",
        body: [
          `In ${WIRE.short}, A229 is a real coil on this cell when radius and tensile fit the head. Inside radius toward 1.5–2× diameter. Hydrogen bake after acid zinc on high tensile. Stock 3/8, 7/16, 1/2 in.`,
          "Light A229 for small springs is a coiler job. Same rule as A227: under 4 mm, we name it.",
        ],
      },
    ],
    faqs: [
      {
        question: "A227 or A229 for a hairpin clip?",
        answer:
          "A227 if hard-drawn snap is enough. A229 if cyclic set matters. Neither is 1018. Name the class.",
      },
    ],
    related: [
      { href: SPRING_WIRE_ROOT, label: "Spring wire" },
      { href: "/spring-wire/a227", label: "ASTM A227" },
      { href: "/hairpin-cotter-pins", label: "Hairpin cotter pins" },
      { href: "/materials", label: "Materials" },
    ],
  },
  {
    slug: "a231",
    title: "ASTM A231 Chrome-Vanadium Spring Wire",
    h1: "ASTM A231 chromium-vanadium spring wire",
    description:
      "ASTM A231 chromium-vanadium alloy steel spring wire for higher-stress mechanical springs. 4–14 mm CNC when the coil is in band. Not 1018, not A227.",
    lede: "A231 is chrome-vanadium alloy spring wire. Higher stress than carbon A227 / A229. Valve-spring cousin is A232 — different spec.",
    keywords: [
      "ASTM A231",
      "A231 spring wire",
      "chrome vanadium spring wire",
      "chromium vanadium wire",
    ],
    alsoCalled: ["CrV spring wire", "chrome-vanadium wire"],
    sections: [
      {
        id: "what",
        heading: "Alloy spring, not carbon HD",
        body: [
          "ASTM A231 is chromium-vanadium alloy steel spring wire for mechanical springs at higher stress than carbon hard-drawn or oil-tempered grades. Heat and fatigue both change. Do not swap A227 on a first article and call it equivalent.",
          "A232 is the valve-spring quality CrV spec. If the print says valve spring, it is probably A232 or A230, not A231. Read the number.",
        ],
      },
      {
        id: "form",
        heading: "This cell",
        body: [
          `We form alloy spring coil in ${WIRE.label} when the radius, the tensile, and the head agree. Min radius is not a 1018 1× diameter. Bake after plate. You buy the coil.`,
          "Small CrV springs are a spring cell. Heavy torsion and clips in 3/8–1/2 in are the jobs that belong here.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is A231 the same as chrome-silicon?",
        answer:
          "No. Chrome-silicon mechanical spring wire is ASTM A401. Different alloy, different temper, different fatigue.",
      },
    ],
    related: [
      { href: SPRING_WIRE_ROOT, label: "Spring wire" },
      { href: "/spring-wire/a401", label: "ASTM A401" },
      { href: "/spring-wire/a229", label: "ASTM A229" },
    ],
  },
  {
    slug: "a401",
    title: "ASTM A401 Chrome-Silicon Spring Wire",
    h1: "ASTM A401 chromium-silicon spring wire",
    description:
      "ASTM A401 chromium-silicon alloy steel spring wire for high-stress mechanical springs. 4–14 mm from coil when diameter and radius fit. Not A227.",
    lede: "A401 is chrome-silicon alloy spring wire. High stress, heat-capable compared with carbon HD. Name it. Do not write “alloy spring.”",
    keywords: [
      "ASTM A401",
      "A401 spring wire",
      "chrome silicon spring wire",
      "chromium silicon wire",
    ],
    alsoCalled: ["CrSi spring wire", "chrome-silicon wire"],
    sections: [
      {
        id: "what",
        heading: "What A401 is",
        body: [
          "ASTM A401 is chromium-silicon alloy steel spring wire for mechanical springs that need higher stress and better relaxation resistance than carbon A227 / A229. It shows up on heavy torsion parts and hot-service springs.",
          "6150 and 5160 are related alloy families on some prints. Put the ASTM or AISI on the coil cert. “Chrome silicon” without a number is not a buy.",
        ],
      },
      {
        id: "form",
        heading: "Forming",
        body: [
          `In ${WIRE.short}, alloy spring is a CNC job when the inside radius is honest (start at 2× diameter unless the print proved tighter) and the head can hold the tensile. Stress-relieve when the print cares. Hydrogen bake after acid zinc.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Can you run A401 at 1/2 in?",
        answer:
          "When the coil, radius, and head fit — yes, as a named alloy spring job, not as 1018. Send the cert and the print.",
      },
    ],
    related: [
      { href: SPRING_WIRE_ROOT, label: "Spring wire" },
      { href: "/spring-wire/a231", label: "ASTM A231" },
      { href: "/guide/design-for-wire-forming", label: "Design guide" },
    ],
  },
  {
    slug: "stainless",
    title: "Stainless Spring Wire",
    h1: "Stainless spring wire",
    description:
      "Stainless spring wire for clips and forms: ASTM A313, 302 spring temper, 17-7. 4–14 mm CNC when in band. Not 304 annealed frame wire.",
    lede: "Stainless that springs is not 304 annealed. A313, 302 spring, 17-7 — name the spec. 304 grids are a different page.",
    keywords: [
      "stainless spring wire",
      "ASTM A313",
      "302 spring wire",
      "17-7 spring wire",
    ],
    alsoCalled: ["302 spring temper", "A313 stainless spring"],
    sections: [
      {
        id: "what",
        heading: "Spring stainless vs 304 coil",
        body: [
          "ASTM A313 covers stainless steel spring wire. 302 in a spring temper is the common clip grade: more carbon than 304, more snap, more work-hardening. 17-7 PH shows up on higher-stress stainless springs.",
          "304 / 304L annealed is for frames, trays, and grids. It will take a set if you use it as a hairpin clip. Do not write “SS” and expect spring.",
        ],
      },
      {
        id: "form",
        heading: "This cell",
        body: [
          `We form 300-series from coil in ${WIRE.label}, including spring tempers when radius and galling are honest. 1.5–2× diameter inside radius is the starting point. Passivate after form — not zinc.`,
          "Light A313 music-like diameters are under 4 mm. Same honesty as A228. Heavy stainless clips in 3/8–1/2 in run here. Deep page for the family: 300-series stainless.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is 304 spring wire?",
        answer:
          "Not in the annealed condition we form for frames. 302 spring temper or A313 is the clip spec. 304L is the weld-and-grid spec.",
      },
    ],
    related: [
      { href: SPRING_WIRE_ROOT, label: "Spring wire" },
      { href: "/materials/300-series-stainless", label: "300-series stainless" },
      { href: "/hairpin-cotter-pins", label: "Hairpin cotter pins" },
      { href: "/330-stainless-wire-bending-usa-parts", label: "330 stainless" },
    ],
  },
];

export function springWireHref(slug: string) {
  return `${SPRING_WIRE_ROOT}/${slug}`;
}
