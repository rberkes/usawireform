import { allPosts } from "@/lib/blog";
import { catalog, catalogByGroup } from "@/lib/catalog";
import { CNC_OEMS, allCncModels } from "@/lib/cnc-oems";
import { directoryCompanies, getCompaniesByCountry } from "@/lib/directory";
import { L_HITCH_PIN_LANDERS } from "@/lib/l-hitch-pins";
import { machines } from "@/lib/machines";
import { WIRE_FORMING_METROS } from "@/lib/metros";
import { OHIO_CITIES } from "@/lib/ohio-cities";
import { publishedProcesses } from "@/lib/processes";
import { allSeoPages } from "@/lib/seo/pages";
import { industries } from "@/lib/site";
import { US_STATES } from "@/lib/states";
import { V_HOOK_LANDERS } from "@/lib/v-hook-landers";

export const ARCHITECTURE_PATH = "/admin/architecture";

export type ArchNode = {
  id: string;
  /** Folder label, or the URL path for a page. */
  name: string;
  href?: string;
  note?: string;
  kind: "branch" | "page" | "pattern" | "desk";
  children?: ArchNode[];
};

export type ArchStats = {
  publicUrls: number;
  shops: number;
  usa: number;
  canada: number;
  products: number;
  processes: number;
  industries: number;
  states: number;
  metros: number;
  ohioCities: number;
  oems: number;
  cncModels: number;
  posts: number;
};

export function architectureStats(): ArchStats {
  const shops = directoryCompanies;
  return {
    publicUrls: allSeoPages().length,
    shops: shops.length,
    usa: getCompaniesByCountry("USA").length,
    canada: getCompaniesByCountry("Canada").length,
    products: catalog.length,
    processes: publishedProcesses().length,
    industries: industries.length,
    states: US_STATES.length,
    metros: WIRE_FORMING_METROS.length,
    ohioCities: OHIO_CITIES.length,
    oems: CNC_OEMS.length,
    cncModels: allCncModels().length,
    posts: allPosts().length,
  };
}

function leaf(
  path: string,
  note: string,
  kind: Exclude<ArchNode["kind"], "branch"> = "page",
): ArchNode {
  const clickable = !path.includes("[") && !path.startsWith("/api/");
  return {
    id: path,
    name: path,
    href: clickable ? path : undefined,
    note,
    kind,
  };
}

export function siteArchitectureTree(): ArchNode[] {
  const s = architectureStats();
  const groups = catalogByGroup();

  return [
    {
      id: "home",
      name: "/",
      href: "/",
      note: "Home — resource + this floor",
      kind: "page",
    },
    {
      id: "floor",
      name: "this-floor/",
      note: "What we run in Northeast Ohio",
      kind: "branch",
      children: [
        leaf("/instant-quote", "Estimate on the 214TF"),
        leaf("/contact", "Send a STEP"),
        leaf("/quoting", "Tooling and coil"),
        leaf("/capabilities", "4–14 mm cell"),
        leaf("/equipment", "Floor list — Robomac 214TF"),
        leaf("/models", "Orbit shop STEP / IGES"),
        leaf("/past-projects", "Jobs we formed"),
        leaf("/videos", "CNC on camera"),
        leaf("/secondary-operations", "Weld, plate, ends, inspect"),
        leaf("/sizes", "3/8 · 7/16 · 1/2"),
        leaf("/careers", "Jobs on this floor"),
      ],
    },
    {
      id: "learn",
      name: "learn/",
      note: "How a print becomes a form",
      kind: "branch",
      children: [
        leaf("/guide/design-for-wire-forming", "Design guide"),
        leaf("/guide/s-hooks-vs-v-hooks-vs-c-hooks", "S vs V vs C"),
        leaf("/processes", `Process hub · ${s.processes} pages`),
        leaf("/processes/[slug]", `${s.processes} published processes`, "pattern"),
        leaf("/wire-forming-process", "Straighten, bend, cut, weld"),
        leaf("/blog", "Articles"),
        leaf("/blog/daily", "Daily briefing"),
        leaf("/blog/[slug]", `${s.posts} posts`, "pattern"),
      ],
    },
    {
      id: "forming",
      name: "forming/",
      note: "Keyword landers for the trade",
      kind: "branch",
      children: [
        leaf("/wire-forming", "Pillar"),
        leaf("/wire-fabrication", "4–14 mm fabrication"),
        leaf("/cnc-wire-forming", "2D and 3D CNC"),
        leaf("/cnc-wire-bending", "Same cell, bending name"),
        leaf("/rod-bending", "Heavy round"),
        leaf("/wire-parts", "USA-made forms"),
        leaf("/wire-forming-manufacturers", "This manufacturer"),
        leaf("/custom-wire-forming", "Custom 4–14 mm"),
        leaf("/custom-cnc-wire-forming-services", "Print from coil"),
        leaf("/wire-mesh", "Mesh, crimp, count"),
        leaf("/330-stainless-wire-bending-usa-parts", "N08330 heat-treat"),
      ],
    },
    {
      id: "products",
      name: "products/",
      note: `${s.products} catalog + hook landers`,
      kind: "branch",
      children: [
        leaf("/products", "Catalog hub"),
        ...groups.map((group) => ({
          id: `products-${group.group}`,
          name: `${group.group.toLowerCase().replace(/\s+/g, "-")}/`,
          note: `${group.items.length}`,
          kind: "branch" as const,
          children: group.items.map((item) =>
            leaf(`/products/${item.slug}`, item.title),
          ),
        })),
        {
          id: "hooks",
          name: "hook-landers/",
          note: "Top-level finishing-hook URLs",
          kind: "branch" as const,
          children: [
            leaf("/powder-coating-hooks", "Hook family hub + keyword cloud"),
            leaf("/powder-coating-hooks/v-hooks", "V-hooks"),
            leaf("/powder-coating-hooks/c-hooks", "C-hooks"),
            leaf("/powder-coating-hooks/cv-hooks", "CV-hooks"),
            leaf("/powder-coating-hooks/s-hooks", "S-hooks"),
            leaf("/powder-coating-hooks/90-degree-hooks", "90° family"),
            leaf("/powder-coating-hooks/square-hanging-hooks", "Square hanging"),
            leaf("/powder-coating-hooks/prices", "4–10 mm bags"),
            leaf("/powder-coating-hooks/market", "Named market houses"),
            leaf("/powder-coating-hooks/[...slug]", "Keyword branches"),
            ...V_HOOK_LANDERS.map((lander) => leaf(lander.path, lander.title)),
            leaf("/custom-powder-coating-hooks", "Custom builder"),
            leaf("/stainless-steel-powder-coating-hooks", "304 / 316 hooks"),
            leaf("/stainless-steel-wire-basket", "Stainless baskets"),
            leaf("/stainless-steel-wire-shelf", "Stainless shelves"),
            ...L_HITCH_PIN_LANDERS.map((lander) =>
              leaf(lander.path, lander.title),
            ),
          ],
        },
        {
          id: "staples",
          name: "staple-landers/",
          note: "Top-level ground-staple URLs",
          kind: "branch" as const,
          children: [
            leaf("/ground-staples", "Staple family hub + keyword cloud"),
            leaf("/ground-staples/sod-staples", "Sod staples"),
            leaf("/ground-staples/landscape-staples", "Landscape staples"),
            leaf("/ground-staples/8-gauge", "8 gauge bags"),
            leaf("/ground-staples/heavy-duty", "Heavy-duty stock Us"),
            leaf("/ground-staples/prices", "8 ga bags"),
            leaf("/ground-staples/market", "Named pin mills"),
            leaf("/ground-staples/[...slug]", "Keyword branches"),
            leaf("/custom-ground-staples", "Custom builder"),
          ],
        },
      ],
    },
    {
      id: "industries",
      name: "industries/",
      note: `${s.industries} verticals`,
      kind: "branch",
      children: [
        leaf("/industries", "Hub"),
        ...industries.map((item) => leaf(`/industries/${item.slug}`, item.title)),
      ],
    },
    {
      id: "iron",
      name: "iron/",
      note: "OEM catalog — we do not sell the machines",
      kind: "branch",
      children: [
        leaf(
          "/equipment/cnc-manufacturers",
          `${s.oems} OEMs · ${s.cncModels} models`,
        ),
        leaf(
          "/equipment/cnc-manufacturers/[oem]",
          `${s.oems} OEM hubs`,
          "pattern",
        ),
        leaf(
          "/equipment/cnc-manufacturers/[oem]/[model]",
          `${s.cncModels} model pages`,
          "pattern",
        ),
        leaf("/equipment/machine-comparison", "Which class wins which job"),
        leaf("/equipment/machines", "Numalliance series"),
        leaf(
          "/equipment/machines/[slug]",
          `${machines.length} machine pages`,
          "pattern",
        ),
      ],
    },
    {
      id: "factories",
      name: "factories/",
      note: `${s.shops} shops · ${s.usa} USA · ${s.canada} Canada`,
      kind: "branch",
      children: [
        leaf("/directory", "USA + Canada cards"),
        leaf("/directory/[slug]", `${s.shops} company listings`, "pattern"),
        leaf("/wire-form-factories-in-usa", "USA plants only · desks out"),
        leaf("/find-factories-by-machine", "Type a machine or secondary → 3–4 plants"),
        leaf("/directory/new", "Newest Source filings"),
        leaf("/directory/areas", `${s.metros} forming cities`),
        leaf("/directory/areas/[slug]", `${s.metros} metro landers`, "pattern"),
        {
          id: "source",
          name: "source/",
          note: "Match a print to a filed cell",
          kind: "branch" as const,
          children: [
            leaf("/source", "Buyer — pick cell, then wire size"),
            leaf("/source/job", "Redirects to /source"),
            leaf("/source/privacy", "Buyer drawing privacy", "desk"),
            leaf("/source/shops", "Claim listing · cell and operating notes free"),
            leaf("/source/equipment", "Register plant · file cells"),
            leaf("/source/upgrade", "1 / 4 / 10 / 20 cells · operating notes free"),
            leaf("/source/claim", "Claim /directory/[slug]", "desk"),
            leaf("/source/dashboard", "Shop desk · how the plant operates", "desk"),
            leaf("/source/account", "Clerk account", "desk"),
          ],
        },
      ],
    },
    {
      id: "places",
      name: "places/",
      note: "ZIP, states, Ohio, Cleveland coil",
      kind: "branch",
      children: [
        leaf("/wire-forming-companies-near-me", "ZIP → state page"),
        leaf("/[state]", `${s.states} state landers`, "pattern"),
        leaf("/cleveland", "Northeast Ohio — mills and drawers"),
        leaf("/ohio/[city]", `${s.ohioCities} Ohio city landers`, "pattern"),
      ],
    },
    {
      id: "materials",
      name: "materials/",
      note: "Coil grades — we are not a mill",
      kind: "branch",
      children: [
        leaf("/materials", "Grades from coil"),
        leaf("/materials/300-series-stainless", "304 / 316"),
        leaf("/steel-wire-manufacturers-in-usa", "U.S. coil, not this floor"),
      ],
    },
    {
      id: "company",
      name: "company/",
      note: "Map, legal, indexes",
      kind: "branch",
      children: [
        leaf("/work-with-us", "Client landers"),
        leaf("/work-with-us/cnc-wire-forming", "CNC for buyers"),
        leaf("/work-with-us/cut-to-length", "Cut-to-length 4–14 mm"),
        leaf("/production-quote", "Production quote"),
        leaf("/about", "The map and a shop"),
        leaf("/site-map", "Every public page, listed"),
        leaf("/privacy", "Privacy"),
        leaf("/terms", "User Agreement"),
      ],
    },
    {
      id: "desk",
      name: "desk/",
      note: "Signed-in and machine — not the public map",
      kind: "desk",
      children: [
        leaf("/sign-in", "Clerk", "desk"),
        leaf("/sign-up", "Clerk", "desk"),
        leaf("/source/nda", "Supplier NDA", "desk"),
        leaf("/source/enter", "Post-login router", "desk"),
        leaf("/buyer/dashboard", "Buyer dashboard", "desk"),
        leaf("/admin", "Leads inbox", "desk"),
        leaf("/admin/leads", "Directory leads", "desk"),
        leaf("/admin/source", "Source filings", "desk"),
        leaf("/admin/subscribers", "Source subscribers", "desk"),
        leaf("/admin/accounts", "Shops, buyers, Source STEPs", "desk"),
        leaf("/admin/visitors", "Visitor IPs and referrers", "desk"),
        leaf("/admin/live", "Live page checklist", "desk"),
        leaf("/admin/architecture", "This tree", "desk"),
        leaf("/api/visit", "Visitor log", "desk"),
        leaf("/api/machine-factories", "Machine typeahead", "desk"),
        leaf("/api/directory-lead", "Listing RFQ", "desk"),
        leaf("/api/stripe/webhook", "Source billing", "desk"),
        leaf("/api/autodesk-share", "Past-project viewer", "desk"),
      ],
    },
  ];
}
