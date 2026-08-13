import Link from "next/link";
import { COMPANY, QUOTE_EMAIL } from "@/lib/company";
import { PRICE_LINE } from "@/lib/price";
import { BrandLockup } from "./WireMark";
import { Container } from "./ui";

const library = [
  { href: "/wire-forming", label: "Wire forming" },
  { href: "/wire-fabrication", label: "Wire fabrication" },
  { href: "/sizes", label: "3/8 · 7/16 · 1/2" },
  { href: "/materials", label: "Materials" },
  { href: "/processes/heavy-wire-forming", label: "4–14 mm" },
  { href: "/processes/3d-cnc-wire-forming", label: "3D CNC" },
  { href: "/processes/mesh-grids-and-cable-trays", label: "Grids & trays" },
  { href: "/processes", label: "All processes" },
  { href: "/guide/design-for-wire-forming", label: "Design guide" },
  { href: "/processes/wire-form-shapes", label: "Shapes" },
];

const shop = [
  { href: "/industries", label: "Industries" },
  { href: "/products", label: "Products" },
  { href: "/capabilities", label: "Capabilities" },
  { href: "/secondary-operations", label: "Secondaries" },
  { href: "/equipment", label: "Equipment" },
  { href: "/videos", label: "Videos" },
  { href: "/instant-quote", label: "Instant quote" },
  { href: "/quoting", label: "Tooling & coil" },
  { href: "/about", label: "About" },
  { href: "/cleveland", label: "Northeast Ohio" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-line">
      <Container className="flex flex-col gap-8 py-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link href="/">
            <BrandLockup />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-muted">
            4–14 mm wire forming — 3D CNC, frames, wire baskets, hangers, and
            guards. {PRICE_LINE}
          </p>
          <p className="mt-4 flex gap-4 text-sm">
            <Link
              href="/site-map"
              className="text-foreground/90 hover:text-copper"
            >
              Sitemap
            </Link>
            <Link
              href="/privacy"
              className="text-foreground/90 hover:text-copper"
            >
              Privacy
            </Link>
          </p>
        </div>

        <div className="flex gap-16 text-sm">
          <NavCol title="Library" links={library} />
          <NavCol title="Headquarters" links={shop} />
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
        <p className="mx-auto max-w-6xl px-5 py-4 font-mono text-[11px] tracking-wide text-muted">
          © {new Date().getFullYear()} {COMPANY}
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
          key={link.href}
          href={link.href}
          className="text-foreground/90 hover:text-copper"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}
