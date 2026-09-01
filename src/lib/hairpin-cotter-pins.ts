import { WIRE } from "@/lib/range";
import type { TopicArticle } from "@/lib/topic-article";

export const HAIRPIN_ROOT = "/hairpin-cotter-pins";

export const HAIRPIN_PAGES: TopicArticle[] = [
  {
    slug: "r-clips",
    title: "R-Clips",
    h1: "R-clips",
    description:
      "R-clips and hairpin cotter pins from coil. Most catalog R-clips sit under 4 mm — we name that. Heavy retainers in 3/8, 7/16, and 1/2 in.",
    lede: "An R-clip is a hairpin cotter with a loop and two legs. The R is the shape, not a brand. Catalog sizes are light spring wire. This cell is 4–14 mm.",
    keywords: [
      "R-clips",
      "R clip",
      "R-pin",
      "hairpin R-clip",
      "wire forming R-clips",
    ],
    alsoCalled: [
      "R-pins",
      "hitch pin R-clips",
      "hairpin R retainers",
      "linch pin clips",
    ],
    sections: [
      {
        id: "shape",
        heading: "What an R-clip is",
        body: [
          "Two legs, a closed or nearly closed loop, and enough spring to stay in a hole. One leg is usually longer. The loop is the grab. It is 2D CNC: feed, loop, two legs, cutoff. Not a split cotter driven with a hammer.",
          "The pin it retains is a separate part. Trailer L hitch pins, implement pins, and clevis pins take an R-clip. Do not order the clip as if it were the pin.",
        ],
      },
      {
        id: "wire",
        heading: "Wire size vs pin size",
        body: [
          "Store R-clips that hold a 1/2 in hitch pin are usually about 1/8 in wire — under the 4 mm floor. We will name that instead of quoting it as stock production on this cell.",
          `Heavy R-clips in ${WIRE.short} run here: 3/8, 7/16, and 1/2 in when the print is the clip itself, not the pin. Spring steels (A227 hard-drawn, A229 oil-tempered) when the clip has to snap back. 1018 when it is a formed retainer, not a spring.`,
        ],
      },
      {
        id: "print",
        heading: "What the print names",
        body: [
          "Loop inside diameter or the pin diameter the clip is made for. Leg lengths. Wire diameter. Alloy and temper. Whether the loop is closed, open, or double. Finish: zinc, galv, or bare. 100-piece minimum. You buy the coil.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is an R-clip the same as a hairpin cotter pin?",
        answer:
          "Yes in the trade. R-clip, hairpin cotter, hitch pin clip — same family. Split cotter pins are a different part.",
      },
      {
        question: "Do you make 1/8 in R-clips?",
        answer: `No as stock on this floor. 1/8 in is under ${WIRE.minMm} mm. We name it. Heavy clips in 3/8 to 1/2 in run here.`,
      },
    ],
    related: [
      { href: HAIRPIN_ROOT, label: "Hairpin cotter pins" },
      { href: "/hairpin-cotter-pins/hitch-pin-clips", label: "Hitch pin clips" },
      { href: "/spring-wire/a227", label: "ASTM A227 spring wire" },
      { href: "/l-hitch-pins", label: "L hitch pins" },
    ],
  },
  {
    slug: "internal",
    title: "Internal Hairpin Cotter Pins",
    h1: "Internal hairpin cotter pins",
    description:
      "Internal hairpin cotter pins go through a hole in a pin or clevis. 2D CNC from coil. Light catalog sizes under 4 mm named. Heavy 3/8–1/2 in on this cell.",
    lede: "An internal hairpin goes through the hole. Legs pass the pin; the loop stays outside as the stop. That is the common hitch-pin clip.",
    keywords: [
      "internal hairpin cotter",
      "internal hair pin cotter pins",
      "internal hitch pin clip",
    ],
    alsoCalled: [
      "through-hole hairpins",
      "internal R-clips",
      "internal hitch pin clips",
    ],
    sections: [
      {
        id: "fit",
        heading: "Through the hole",
        body: [
          "Internal means the legs occupy the hole in the hitch pin, clevis, or shaft. The loop is larger than the hole so the clip cannot fall through. Pull the loop to remove it.",
          "Name the hole diameter, not only the pin OD. A 1/2 in pin with a 9/64 in clip hole is a different clip than a 1/2 in pin with a 3/16 in hole. Wire diameter has to pass the hole with spring left.",
        ],
      },
      {
        id: "vs",
        heading: "Internal vs external",
        body: [
          "Internal: through a drilled or formed hole. External: snaps into a groove on the shaft and never goes through a hole. Do not send an external print and call it a hitch pin clip.",
          "Most trailer and implement clips are internal. Groove retainers on hydraulic pins and some ag shafts are external.",
        ],
      },
      {
        id: "cell",
        heading: "This cell",
        body: [
          `Production is ${WIRE.label}. Typical catalog internals are 0.072–0.177 in spring wire — under 4 mm. Heavy internals in 3/8, 7/16, and 1/2 in run here. 2D CNC. Spring coil when snap-back is the spec.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Do I spec the pin or the hole?",
        answer:
          "Both. Pin OD for the job, hole ID for the clip wire. The clip has to pass the hole and still spring.",
      },
    ],
    related: [
      { href: HAIRPIN_ROOT, label: "Hairpin cotter pins" },
      { href: "/hairpin-cotter-pins/external", label: "External hairpins" },
      { href: "/hairpin-cotter-pins/r-clips", label: "R-clips" },
      { href: "/products/hitch-pin-clips", label: "Catalog: hitch pin clips" },
    ],
  },
  {
    slug: "external",
    title: "External Hairpin Cotter Pins",
    h1: "External hairpin cotter pins",
    description:
      "External hairpin cotter pins snap into a shaft groove. Not a through-hole hitch pin clip. Heavy 4–14 mm from coil when the print is in band.",
    lede: "An external hairpin wraps a grooved shaft. It does not go through a hole. Different print than a hitch pin R-clip.",
    keywords: [
      "external hairpin cotter",
      "external hair pin cotter pins",
      "groove hairpin retainer",
    ],
    alsoCalled: [
      "external R-clips",
      "groove hairpins",
      "shaft groove retainers",
    ],
    sections: [
      {
        id: "groove",
        heading: "Groove, not a hole",
        body: [
          "The shaft has a turned or rolled groove. The hairpin’s inside sits in that groove. Legs or a second loop keep it from walking off. Pull to remove — no hammer, no split tines.",
          "Name groove diameter, groove width, and shaft OD. Wire diameter has to sit in the groove without rattling out or crushing the land.",
        ],
      },
      {
        id: "vs",
        heading: "Not a hitch pin clip",
        body: [
          "Trailer hitch pin clips are internal: they go through a hole in the pin. An external hairpin on a grooved hydraulic pin is a different SKU. Same family name, different form.",
          "Rue rings and some bridge-style retainers sit closer to external than to a two-leg R-clip. Send the picture if the name on the PO is messy.",
        ],
      },
      {
        id: "cell",
        heading: "This cell",
        body: [
          `Light external clips are usually under ${WIRE.minMm} mm. We name them. Heavy groove retainers in 3/8 to 1/2 in run on 2D CNC from coil. Spring wire when the snap is the spec — A227 or A229, not “spring steel.”`,
        ],
      },
    ],
    faqs: [
      {
        question: "Can you copy a retaining ring from a photo?",
        answer:
          "Send groove Ø, width, shaft Ø, and wire size. A photo helps style (hairpin vs rue vs stamped ring). Stamped E-rings are not this cell.",
      },
    ],
    related: [
      { href: HAIRPIN_ROOT, label: "Hairpin cotter pins" },
      { href: "/hairpin-cotter-pins/internal", label: "Internal hairpins" },
      { href: "/hairpin-cotter-pins/bridge-pins", label: "Bridge pins" },
      { href: "/spring-wire", label: "Spring wire" },
    ],
  },
  {
    slug: "hitch-pin-clips",
    title: "Hitch Pin Clips",
    h1: "Hitch pin clips",
    description:
      "Hitch pin clips, hairpin cotters, and R-clips that retain a hitch pin. Typical 1/8 in clips are under 4 mm. Heavy clips in 3/8–1/2 in from coil.",
    lede: "The clip that keeps a hitch pin in the receiver. Hairpin, R, internal. The pin is a separate part.",
    keywords: [
      "hitch pin clips",
      "hitch pin clip",
      "hairpin hitch pin clip",
      "trailer hitch pin clip",
    ],
    alsoCalled: [
      "hitch pin hairpins",
      "trailer pin clips",
      "implement pin clips",
    ],
    sections: [
      {
        id: "job",
        heading: "Clip, not pin",
        body: [
          "A hitch pin clip retains an L hitch pin or a straight hitch pin. It is not the pin. Order the pin on L hitch pins. Order the clip here.",
          "Most clips for a 1/2 in trailer pin are 1/8 in spring wire. That is under 4 mm. We will say so on the quote instead of pretending it is 3/8 in production.",
        ],
      },
      {
        id: "styles",
        heading: "Styles",
        body: [
          "Single-loop R / hairpin is the default. Double-loop (bridge-style) when the print wants two loops and a longer grab. Internal through the pin hole unless the print is a groove retainer.",
          "Zinc or galv for outdoor trailers. 304 when the fleet is stainless. Hard-drawn A227 or oil-tempered A229 when snap-back is on the spec, not 1018.",
        ],
      },
      {
        id: "heavy",
        heading: "Heavy clips on this floor",
        body: [
          `When the clip wire itself is 3/8, 7/16, or 1/2 in, it is this cell: ${WIRE.label}, 2D CNC, 100-piece minimum, customer coil. Construction pins, large implements, and industrial retainers live here. Catalog /products/hitch-pin-clips is the same family.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Do you include the clip with an L hitch pin?",
        answer:
          "No. Separate SKU. Most store clips are under 4 mm. Heavy clips in 3/8 to 1/2 in quote with the pin print if you send both.",
      },
    ],
    related: [
      { href: HAIRPIN_ROOT, label: "Hairpin cotter pins" },
      { href: "/products/hitch-pin-clips", label: "Catalog: hitch pin clips" },
      { href: "/l-hitch-pins", label: "L hitch pins" },
      { href: "/hairpin-cotter-pins/r-clips", label: "R-clips" },
    ],
  },
  {
    slug: "bridge-pins",
    title: "Bridge Pins and Rue Rings",
    h1: "Bridge pins and rue rings",
    description:
      "Bridge pins, double-loop hairpins, and rue-ring retainers from coil. Related to hairpin cotters, not a split cotter. 4–14 mm when the wire is in band.",
    lede: "A bridge pin is a double-loop hairpin. A rue ring is a rounder snap retainer. Same job as a clip: keep a pin in a hole or a groove.",
    keywords: [
      "bridge pins",
      "rue rings",
      "double loop hairpin",
      "bridge pin cotter",
    ],
    alsoCalled: ["double-loop clips", "rue clips", "bridge hairpins"],
    sections: [
      {
        id: "bridge",
        heading: "Double loop",
        body: [
          "Two loops and a span. More grab than a single R. Common on implements and some trailer hardware when a single loop is easy to snag off.",
          "Name both loop IDs (often the same), span, wire size, and alloy. 2D CNC. Spring temper when it has to snap.",
        ],
      },
      {
        id: "rue",
        heading: "Rue rings",
        body: [
          "A rue ring is closer to a formed round snap ring than to a two-leg R-clip. It seats in a groove. Stamped E-rings and circlips from sheet are not this cell.",
          "Send groove and wire. If it is a stamped ring, we will name that and not quote it as round-wire CNC.",
        ],
      },
      {
        id: "cell",
        heading: "This cell",
        body: [
          `Light bridge pins and rue rings are often under ${WIRE.minMm} mm. Heavy double-loop retainers in 3/8 to 1/2 in run here. 100-piece minimum.`,
        ],
      },
    ],
    faqs: [
      {
        question: "Is a rue ring a hairpin cotter?",
        answer:
          "Same retaining job, different shape. Hairpin / R is two legs and a loop. Rue is a rounder snap in a groove. Send the print.",
      },
    ],
    related: [
      { href: HAIRPIN_ROOT, label: "Hairpin cotter pins" },
      { href: "/hairpin-cotter-pins/external", label: "External hairpins" },
      { href: "/hairpin-cotter-pins/hitch-pin-clips", label: "Hitch pin clips" },
    ],
  },
  {
    slug: "heavy-duty",
    title: "Heavy-Duty Hairpin Cotter Pins",
    h1: "Heavy-duty hairpin cotter pins",
    description:
      "Heavy-duty hairpin cotter pins and R-clips in 3/8, 7/16, and 1/2 in from coil. Not 1/8 in catalog clips. 4–14 mm CNC in Northeast Ohio.",
    lede: "When the clip wire is 3/8 to 1/2 in, it is a formed retainer on this cell — not a bag of 1/8 in hitch pin clips.",
    keywords: [
      "heavy duty hairpin cotter pins",
      "heavy R-clips",
      "3/8 hairpin clip",
      "1/2 in hitch pin clip",
    ],
    alsoCalled: [
      "heavy R-clips",
      "large hairpin retainers",
      "implement hairpins",
    ],
    sections: [
      {
        id: "band",
        heading: "In band",
        body: [
          `Stock diameters: 3/8, 7/16, and 1/2 in. Production band ${WIRE.label}. 2D CNC from coil. 100-piece minimum. You buy the coil.`,
          "Construction, mining, and large ag pins use clips in this band. The pin they retain is often over 1 in — still a separate SKU. We form the clip, not a 2 in forged pin.",
        ],
      },
      {
        id: "not",
        heading: "Not the hardware-store bag",
        body: [
          "1/8 in, 5/32 in, and 3/16 in hitch pin clips are under 4 mm. We name them. We do not run them as stock on the 214TF.",
          "5/8 in clip wire is over 14 mm. Same rule as 5/8 in hitch pins: out of band. Send that print to Source if another shop filed a heavier cell.",
        ],
      },
      {
        id: "alloy",
        heading: "Alloy",
        body: [
          "1018 when the clip is a formed stop, not a spring. A227 hard-drawn or A229 oil-tempered when it has to snap back. 304 outdoor stainless. Name the ASTM, not “spring steel.”",
        ],
      },
    ],
    faqs: [
      {
        question: "Can you match a 1/8 in catalog clip in 3/8 in wire?",
        answer:
          "No as a substitute. Different hole, different spring, different pin. Send the heavy print as its own clip.",
      },
    ],
    related: [
      { href: HAIRPIN_ROOT, label: "Hairpin cotter pins" },
      { href: "/sizes", label: "Stock sizes" },
      { href: "/spring-wire", label: "Spring wire" },
      { href: "/l-hitch-pins", label: "L hitch pins" },
    ],
  },
];

export function hairpinHref(slug: string) {
  return `${HAIRPIN_ROOT}/${slug}`;
}
