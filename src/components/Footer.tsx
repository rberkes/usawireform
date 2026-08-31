import Link from "next/link";
import { COMPANY, QUOTE_EMAIL, SITE_LINE } from "@/lib/company";
import { BrandLockup } from "./WireMark";
import { Container } from "./ui";
import { StateGrid } from "./StateGrid";

const library = [
  { href: "/wire-forming", label: "Wire forming" },
  { href: "/custom-wire-forming", label: "Custom wire forming" },
  { href: "/custom-cnc-wire-forming-services", label: "Custom CNC wire forming services" },
  { href: "/powder-coating-hooks", label: "Powder coating hooks" },
  { href: "/powder-coating-v-hooks", label: "Powder coating V-hooks" },
  { href: "/375-v-hooks", label: '.375" V-hooks' },
  { href: "/heavy-duty-v-hooks", label: "USA made heavy-duty powder coat V-hooks" },
  { href: "/powder-coating-hooks/v-hooks", label: "V-hooks" },
  { href: "/powder-coating-hooks/c-hooks", label: "C-hooks" },
  { href: "/powder-coating-hooks/s-hooks", label: "S-hooks" },
  { href: "/custom-powder-coating-hooks", label: "Custom powder coating hooks" },
  { href: "/wire-forming-process", label: "Wire forming process" },
  { href: "/wire-forming-manufacturers", label: "Manufacturers" },
  { href: "/wire-forming-companies-near-me", label: "Companies near me" },
  { href: "/330-stainless-wire-bending-usa-parts", label: "330 stainless" },
  { href: "/stainless-steel-wire-basket", label: "Stainless baskets" },
  { href: "/stainless-steel-wire-shelf", label: "Stainless shelves" },
  { href: "/wire-mesh", label: "Wire mesh" },
  { href: "/steel-wire-manufacturers-in-usa", label: "U.S. steel wire" },
  { href: "/products/d-rings", label: "USA made D-rings" },
  { href: "/products/wire-racks", label: "USA made wire racks" },
  { href: "/products/cable-trays", label: "USA made cable trays" },
  { href: "/products/security-mesh-fencing", label: "USA made security fencing" },
  { href: "/products/heavy-duty-wire-baskets", label: "USA made wire baskets" },
  { href: "/330-stainless-wire-bending-usa-parts", label: "USA made heat treat baskets" },
  { href: "/ground-staples", label: "USA made ground staples" },
  { href: "/ground-staples/prices", label: "8 ga landscape staple prices" },
  { href: "/custom-ground-staples", label: "Custom ground staples" },
  { href: "/products/trellis-systems", label: "USA made wire stakes" },
  { href: "/wire-fabrication", label: "Wire fabrication" },
  { href: "/sizes", label: "3/8 · 7/16 · 1/2" },
  { href: "/materials", label: "Materials" },
  { href: "/processes/heavy-wire-forming", label: "4–14 mm" },
  { href: "/processes", label: "All processes" },
  { href: "/guide/design-for-wire-forming", label: "Design guide" },
];

const factories = [
  { href: "/directory", label: "Company Directory" },
  { href: "/wire-form-factories-in-usa", label: "Wire form factories in the USA" },
  { href: "/find-factories-by-machine", label: "Find by machine or secondary" },
  { href: "/source", label: "Find a wire form shop" },
  { href: "/source/shops", label: "Add a machine cell" },
  { href: "/source/upgrade", label: "Source leads" },
  { href: "/directory/new", label: "Newest Source shops" },
  { href: "/directory/areas", label: "Wire forming cities" },
  { href: "/ohio", label: "Ohio cities" },
  { href: "/architecture", label: "Site architecture" },
];

const shop = [
  { href: "/work-with-us", label: "Work with us" },
  { href: "/work-with-us/cut-to-length", label: "Cut-to-length wire" },
  { href: "/production-quote", label: "Production quote" },
  { href: "/industries", label: "Industries" },
  { href: "/products", label: "Products" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/secondary-operations", label: "Secondaries" },
  { href: "/equipment", label: "Equipment" },
  { href: "/equipment/cnc-manufacturers", label: "CNC machine catalog" },
  { href: "/equipment/machine-comparison", label: "Machine comparison" },
  { href: "/models", label: "3D models" },
  { href: "/past-projects", label: "Our past projects" },
  { href: "/videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/instant-quote", label: "Instant quote" },
  { href: "/quoting", label: "Tooling & coil" },
  { href: "/about", label: "About" },
  { href: "/cleveland", label: "Northeast Ohio" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const industryAssociations = [
  { href: "https://www.wireformingtech.com", label: "Wire Forming Technology International" },
  { href: "https://smihq.org", label: "Spring Manufacturers Institute" },
  { href: "https://wirenet.org", label: "Wire Association International" },
  { href: "https://pma.org", label: "Precision Metalforming Assoc." },
  { href: "https://casmi-springworld.org", label: "CASMI / SpringWorld" },
  { href: "https://www.fmanet.org", label: "Fabricators & Manufacturers" },
  { href: "https://www.metalformingmagazine.com", label: "MetalForming Magazine" },
  { href: "https://astm.org", label: "ASTM International" },
  { href: "https://aws.org", label: "American Welding Society" },
  { href: "https://natm.com", label: "NATM (Trailer Manufacturers)" },
  { href: "https://trucktrailer.org", label: "TTMA (Truck Trailers)" },
  { href: "https://www.natda.org", label: "NATDA (Trailer Dealers)" },
  { href: "https://www.rvia.org", label: "RV Industry Association" },
  { href: "https://www.ntea.com", label: "NTEA (Work Truck)" },
];

const wireSuppliers = [
  { href: "https://www.jadesterling.com", label: "Jade Sterling Steel" },
  { href: "https://www.bekaert.com", label: "Bekaert" },
  { href: "https://www.insteel.com", label: "Insteel Wire Products" },
  { href: "https://www.nationalstandard.com", label: "National Standard" },
  { href: "https://www.treeisland.com", label: "Tree Island Steel" },
  { href: "https://www.mid-southwire.com", label: "Mid-South Wire" },
  { href: "https://www.centralwire.com", label: "Central Wire Industries" },
  { href: "https://www.ulbrich.com", label: "Ulbrich Stainless" },
];

const equipmentMfrs = [
  { href: "https://www.numalliance.com", label: "Numalliance" },
  { href: "https://www.wafios.com", label: "Wafios" },
  { href: "https://www.witels-albert-usa.com", label: "witels-albert" },
];

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/">
            <BrandLockup />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            {SITE_LINE}
          </p>
          <p className="mt-4 flex flex-wrap gap-4 text-sm">
            <Link
              href="/site-map"
              className="text-foreground/90 hover:text-copper"
            >
              Sitemap
            </Link>
            <Link
              href="/architecture"
              className="text-foreground/90 hover:text-copper"
            >
              Architecture
            </Link>
            <Link
              href="/privacy"
              className="text-foreground/90 hover:text-copper"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-foreground/90 hover:text-copper"
            >
              User Agreement
            </Link>
          </p>
        </div>

        <div className="flex flex-wrap gap-10 text-sm sm:gap-16">
          <NavCol title="Library" links={library} />
          <NavCol title="Factories" links={factories} />
          <NavCol title="Headquarters" links={shop} />
          <ExternalNavCol title="Associations" links={industryAssociations} />
          <ExternalNavCol title="Wire Suppliers" links={wireSuppliers} />
          <ExternalNavCol title="Equipment" links={equipmentMfrs} />
          <div className="flex flex-col gap-2">
            <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
              Quotes
            </span>
            <a
              href={`mailto:${QUOTE_EMAIL}`}
              className="text-foreground/90 hover:text-copper"
            >
              {QUOTE_EMAIL}
            </a>
            <p className="text-muted">STEP, STP, IGES, PDF, DXF, SLDPRT</p>
          </div>
        </div>
      </Container>
      <div className="border-t border-line">
        <Container className="py-8">
          <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
            Wire forming by state
          </span>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
            Every U.S. state plus D.C. The resource covers the United
            States and beyond. Production is Northeast Ohio. The
            state page is the landing —{" "}
            <Link
              href="/wire-forming-companies-near-me"
              className="text-foreground/90 hover:text-copper"
            >
              ZIP lookup
            </Link>
            .
          </p>
          <StateGrid />
        </Container>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-5 py-4 font-mono text-[11px] tracking-wide text-muted">
          © {new Date().getFullYear()} {COMPANY}. All rights reserved. {COMPANY}™
          and USAWF™ are trademarks of {COMPANY}.
        </p>
      </div>
    </footer>
  );
}

function NavCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
        {title}
      </span>
      {links.map((link) => (
        <Link
          key={`${link.href}-${link.label}`}
          href={link.href}
          className="text-foreground/90 hover:text-copper"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function ExternalNavCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-[11px] tracking-widest text-muted uppercase">
        {title}
      </span>
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-foreground/90 hover:text-copper"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
