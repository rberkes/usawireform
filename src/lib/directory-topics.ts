/**
 * Capability text to the process page that explains it.
 *
 * Listing pages are close to identical by construction — a name, a city and a
 * one-line description over a shared template. Linking each capability to the
 * process page it belongs to gives every listing a link set drawn from what
 * that shop actually does, which is real differentiation rather than padding,
 * and it puts the process pages one click from several hundred listings.
 *
 * Only map to paths that exist. A link set built on 404s is worse than none.
 * Order matters: the first match wins, so specific patterns sit above generic
 * ones ("mesh grids" before "mesh", "resistance welding" before "welding").
 */
const TOPICS: { match: RegExp; href: string }[] = [
  { match: /\b3-?d\b/i, href: "/processes/3d-cnc-wire-forming" },
  { match: /\b2-?d\b/i, href: "/processes/2d-cnc-wire-forming" },
  { match: /(cut[- ]to[- ]length|straighten)/i, href: "/processes/cut-to-length" },
  { match: /(four-?slide|multi-?slide)/i, href: "/processes/fourslide" },
  { match: /(mesh grid|cable tray)/i, href: "/processes/mesh-grids-and-cable-trays" },
  { match: /(resistance weld|spot weld)/i, href: "/processes/resistance-welding" },
  { match: /(mig|tig)\b/i, href: "/processes/mig-tig-assembly" },
  { match: /heavy/i, href: "/processes/heavy-wire-forming" },
  { match: /mesh/i, href: "/wire-mesh" },
  { match: /\brod\b/i, href: "/rod-bending" },
  { match: /cnc/i, href: "/processes/2d-cnc-wire-forming" },
  { match: /wire form/i, href: "/processes/wire-form-shapes" },
  { match: /wire bend/i, href: "/processes/wire-form-shapes" },
];

/** Process page that explains this capability, when one exists. */
export function capabilityTopic(capability: string): string | undefined {
  return TOPICS.find((topic) => topic.match.test(capability))?.href;
}
