import Link from "next/link";
import { ButtonLink, Container, Kicker } from "@/components/ui";
import { COMPANY } from "@/lib/company";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Container className="py-24 text-center">
        <Kicker tone="muted">404</Kicker>
        <h1 className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-muted">
          The page you're looking for doesn't exist or has been moved. Check the
          URL or explore our wire forming capabilities.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink href="/" variant="primary">
            Back to home
          </ButtonLink>
          <ButtonLink href="/products" variant="ghost">
            Browse products
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghost">
            Contact us
          </ButtonLink>
        </div>
        <div className="mx-auto mt-16 max-w-lg">
          <p className="text-sm text-muted">Looking for something specific?</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            <li>
              <Link href="/industries" className="text-copper hover:underline">
                Industries
              </Link>
            </li>
            <li>
              <Link href="/processes" className="text-copper hover:underline">
                Processes
              </Link>
            </li>
            <li>
              <Link href="/equipment" className="text-copper hover:underline">
                Equipment
              </Link>
            </li>
            <li>
              <Link href="/materials" className="text-copper hover:underline">
                Materials
              </Link>
            </li>
            <li>
              <Link
                href="/instant-quote"
                className="text-copper hover:underline"
              >
                Instant quote
              </Link>
            </li>
            <li>
              <Link href="/site-map" className="text-copper hover:underline">
                Site map
              </Link>
            </li>
          </ul>
        </div>
      </Container>
    </main>
  );
}
