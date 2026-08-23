import { catalog, catalogGroups } from "@/lib/catalog";
import { processesByCategory } from "@/lib/processes";
import { industries } from "@/lib/site";

export type NavLink = {
  href: string;
  label: string;
};

export type NavGroup = {
  title: string;
  items: NavLink[];
};

export type NavSection = {
  label: string;
  href: string;
  groups?: NavGroup[];
  items?: NavLink[];
};

export const NAV_PRODUCTS: NavSection = {
  label: "Products",
  href: "/products",
  groups: [
    ...catalogGroups.map((group) => ({
      title: group,
      items: catalog
        .filter((item) => item.group === group)
        .slice(0, 5)
        .map((item) => ({
          href: `/products/${item.slug}`,
          label: item.title,
        })),
    })),
    {
      title: "Trailer hardware",
      items: [
        { href: "/l-hitch-pins", label: "L hitch pins" },
        { href: "/heavy-duty-l-hitch-pins", label: "Heavy-duty L hitch pins" },
        { href: "/products/hitch-pin-clips", label: "Hitch pin clips" },
        { href: "/products/trailer-latches", label: "Trailer latches" },
      ],
    },
    {
      title: "Finishing hooks",
      items: [
        { href: "/powder-coating-hooks", label: "Powder coating hooks" },
        { href: "/powder-coating-hooks/prices", label: "4–10 mm hook prices" },
        { href: "/powder-coating-hooks/square-hanging-hooks", label: "Square hanging hooks" },
        { href: "/powder-coating-hooks/v-hooks", label: "V-hooks" },
        { href: "/powder-coating-hooks/market", label: "Hook market" },
        { href: "/heavy-duty-v-hooks", label: "Heavy-duty V-hooks" },
        { href: "/custom-powder-coating-hooks", label: "Custom hook builder" },
        { href: "/guide/s-hooks-vs-v-hooks-vs-c-hooks", label: "S vs V vs C" },
      ],
    },
  ],
};

export const NAV_INDUSTRIES: NavSection = {
  label: "Industries",
  href: "/industries",
  items: industries.slice(0, 8).map((item) => ({
    href: `/industries/${item.slug}`,
    label: item.title,
  })),
};

export const NAV_PROCESSES: NavSection = {
  label: "Processes",
  href: "/processes",
  groups: processesByCategory().map((category) => ({
    title: category.label,
    items: category.items
      .filter((process) => process.published)
      .map((process) => ({
        href: `/processes/${process.slug}`,
        label: process.title.replace(/ \(4–14 mm\)/, ""),
      })),
  })),
};

export const NAV_FACTORIES: NavSection = {
  label: "Factories",
  href: "/directory",
  items: [
    { href: "/directory", label: "Company directory" },
    { href: "/wire-form-factories-in-usa", label: "USA factories" },
    { href: "/find-factories-by-machine", label: "Machine or secondary" },
    { href: "/source", label: "Match a print" },
    { href: "/source/shops", label: "Add a cell (free)" },
    { href: "/directory/new", label: "Newest Source shops" },
    { href: "/directory/areas", label: "Wire forming cities" },
    { href: "/wire-forming-companies-near-me", label: "Companies near me" },
  ],
};

export const NAV_LEARN: NavSection = {
  label: "Learn",
  href: "/guide/design-for-wire-forming",
  groups: [
    {
      title: "Guides",
      items: [
        { href: "/guide/design-for-wire-forming", label: "Design guide" },
        { href: "/materials", label: "Materials" },
        { href: "/sizes", label: "Wire sizes" },
        { href: "/330-stainless-wire-bending-usa-parts", label: "330 stainless" },
        { href: "/custom-wire-forming", label: "Custom wire forming" },
      ],
    },
    {
      title: "Machines",
      items: [
        { href: "/equipment", label: "This floor" },
        { href: "/equipment/cnc-manufacturers", label: "CNC catalog" },
        { href: "/equipment/machine-comparison", label: "Machine comparison" },
        { href: "/models", label: "3D models" },
        { href: "/past-projects", label: "Past projects" },
      ],
    },
    {
      title: "The site",
      items: [
        { href: "/blog", label: "Blog" },
        { href: "/videos", label: "Videos" },
        { href: "/architecture", label: "Site architecture" },
        { href: "/about", label: "About" },
        { href: "/careers", label: "Careers" },
      ],
    },
  ],
};

/** Header and mobile menu. Four jobs: buy a form, find a plant, learn, this floor. */
export const navSections: NavSection[] = [
  NAV_PRODUCTS,
  NAV_INDUSTRIES,
  NAV_PROCESSES,
  NAV_FACTORIES,
  NAV_LEARN,
];

export function navSectionLinks(section: NavSection): NavLink[] {
  if (section.groups?.length) {
    return section.groups.flatMap((group) => group.items);
  }
  return section.items ?? [];
}
