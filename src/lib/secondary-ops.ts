import { secondaryLabel, type SourceSecondaryId } from "@/lib/source-secondaries";
import type { DirectoryCompany } from "@/lib/directory-types";

type SecondaryTerm = {
  id: string;
  label: string;
  aliases: string[];
  requireTokens?: string[];
  hint?: boolean;
};

/** Tokens injected when a shop filed that Source secondary. Not a floor walk. */
const SOURCE_SECONDARY_HAY: Record<SourceSecondaryId, string> = {
  "end-forming": "end forming endform chamfer swage",
  "resistance-welding": "resistance weld projection weld spot weld",
  "mig-tig-assembly": "mig weld tig weld gmaw gtaw",
  "plating-and-coating": "plating coating",
  "heat-treating": "heat treat heat treating",
  inspection: "inspection cmm fixture",
};

/**
 * Buyer terms for finishes and secondaries. requireTokens must appear on the
 * listing or a filed Source secondary — do not map a product name onto a line.
 */
export const SECONDARY_TERMS: SecondaryTerm[] = [
  {
    id: "zinc-coating",
    label: "Zinc coating",
    aliases: ["zinc", "zinc coating", "zinc plating", "zinc plate"],
    requireTokens: ["zinc plat", "zinc coat", "zinc-nickel", "zinc nickel", "rack zinc"],
    hint: true,
  },
  {
    id: "zinc-nickel",
    label: "Zinc-nickel",
    aliases: ["zinc nickel", "zinc-nickel", "zn-ni"],
    requireTokens: ["zinc nickel", "zinc-nickel", "zn ni"],
  },
  {
    id: "powder-coating",
    label: "Powder coating",
    aliases: ["powder coating", "powdercoat", "powder coat", "powdercoating"],
    requireTokens: ["powder coat", "powdercoat"],
    hint: true,
  },
  {
    id: "e-coat",
    label: "E-coat",
    aliases: ["e-coat", "ecoat", "e coating", "e-coating", "electrophoretic"],
    requireTokens: ["ecoat", "e coat", "electrophoretic", "ktl"],
  },
  {
    id: "anodizing",
    label: "Anodizing",
    aliases: ["anodizing", "anodize", "anodising", "annodizing"],
    requireTokens: ["anodiz", "anodis"],
  },
  {
    id: "black-oxide",
    label: "Black oxide",
    aliases: ["black oxide", "blackoxide", "black ox"],
    requireTokens: ["black oxide", "blackoxide"],
  },
  {
    id: "nickel-plating",
    label: "Nickel plating",
    aliases: ["nickel plating", "nickle plating", "nickel plate", "nickle"],
    requireTokens: ["nickel plat", "nickle plat", "electroless nickel"],
  },
  {
    id: "plating",
    label: "Plating",
    aliases: ["plating", "plate"],
    requireTokens: ["plating", "electroplat"],
  },
  {
    id: "tig-welding",
    label: "TIG welding",
    aliases: ["tig", "tig welding", "tig weld", "gtaw"],
    requireTokens: ["tig", "gtaw"],
    hint: true,
  },
  {
    id: "mig-welding",
    label: "MIG welding",
    aliases: ["mig", "mig welding", "mig weld", "gmaw"],
    requireTokens: ["mig", "gmaw"],
    hint: true,
  },
  {
    id: "resistance-welding",
    label: "Resistance welding",
    aliases: [
      "resistance welding",
      "resistance weld",
      "spot weld",
      "projection weld",
      "cross wire",
    ],
    requireTokens: ["resistance weld", "spot weld", "projection weld", "cross wire"],
    hint: true,
  },
  {
    id: "laser-welding",
    label: "Laser welding",
    aliases: ["laser welding", "laser weld", "laser welder"],
    requireTokens: ["laser weld"],
  },
  {
    id: "robotic-welding",
    label: "Robotic welding",
    aliases: ["robotic welding", "robot weld", "weld robot", "robotic weld"],
    requireTokens: ["robotic weld", "robot weld", "weld robot"],
  },
  {
    id: "welding",
    label: "Welding",
    aliases: ["welding", "weld"],
    requireTokens: ["welding", "welded", "welder", "weld"],
  },
  {
    id: "press-brake",
    label: "Press brake",
    aliases: ["press brake", "pressbrake", "brake press"],
    requireTokens: ["press brake", "pressbrake", "brake press"],
  },
  {
    id: "end-threading",
    label: "End threading",
    aliases: ["end threading", "end thread", "threaded end", "thread roll"],
    requireTokens: ["end thread", "threaded end", "thread roll", "roll thread"],
  },
  {
    id: "end-forming",
    label: "End forming",
    aliases: ["end forming", "endform", "end-form", "swage", "chamfer"],
    requireTokens: ["end forming", "endform", "end form", "swage", "chamfer"],
    hint: true,
  },
  {
    id: "heat-treating",
    label: "Heat treating",
    aliases: ["heat treating", "heat treat", "heat-treat", "stress relief"],
    requireTokens: ["heat treat", "heattreat", "stress relief"],
    hint: true,
  },
  {
    id: "coining",
    label: "Coining",
    aliases: ["coining", "coined"],
    requireTokens: ["coining", "coined"],
  },
  {
    id: "cold-heading",
    label: "Cold heading",
    aliases: ["cold heading", "coldhead", "cold headed"],
    requireTokens: ["cold head", "coldhead"],
  },
  {
    id: "inspection",
    label: "Inspection",
    aliases: ["inspection", "cmm", "first article"],
    requireTokens: ["inspection", "cmm", "first article"],
  },
  {
    id: "passivation",
    label: "Passivation",
    aliases: ["passivation", "passivate"],
    requireTokens: ["passivat"],
  },
  {
    id: "chrome-plating",
    label: "Chrome plating",
    aliases: ["chrome plating", "chrome plate", "chromium"],
    requireTokens: ["chrome plat", "chromium plat"],
  },
  {
    id: "tumbling",
    label: "Tumbling",
    aliases: ["tumbling", "tumble", "vibratory"],
    requireTokens: ["tumbl", "vibratory"],
  },
]

const SECONDARY_IDS = new Set(SECONDARY_TERMS.map((term) => term.id));

export function isSecondaryTerm(term: { id: string } | null | undefined) {
  return Boolean(term && SECONDARY_IDS.has(term.id));
}

/** This floor: processes we actually run. Not a furnace, not e-coat, not a brake. */
export const THIS_FLOOR_SECONDARY_HAY =
  "end forming endform chamfer swage coined coining flatten pierce resistance weld projection weld cross wire mig weld tig weld plating coating rack zinc zinc plating zinc-nickel in-line powder coat powder coating inspection";

function stripProductNoise(text: string) {
  return text
    .replace(
      /powder(?:-|\s)*coat(?:ing)?(?:\s+(?:v-?|c-?|cv-?|s-?|90(?:\s*degree)?\s*)?)*hooks?/gi,
      " ",
    )
    .replace(/heat(?:-|\s)*treat(?:ing)?\s+baskets?/gi, " ")
    .replace(/furnace\s+(?:fixtures?|baskets?)/gi, " ");
}

export function shopSecondaryHay(company: DirectoryCompany) {
  const filed = (company.secondaries ?? [])
    .map((id) =>
      id in SOURCE_SECONDARY_HAY
        ? SOURCE_SECONDARY_HAY[id as SourceSecondaryId]
        : secondaryLabel(id),
    )
    .join(" ");
  const publicText = stripProductNoise(
    [
      ...(company.capabilities ?? []),
      ...(company.machines ?? []),
      company.description ?? "",
    ].join(" "),
  );
  return [filed, publicText].filter(Boolean).join(" ");
}
