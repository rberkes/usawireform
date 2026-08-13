"use client";

import Link from "next/link";
import { useState } from "react";
import { COMPANY } from "@/lib/company";
import { WireMark } from "./WireMark";
import { btn, Container } from "./ui";

const links = [
  { href: "/about", label: "About" },
  { href: "/equipment", label: "Equipment" },
  { href: "/secondary-operations", label: "Secondary ops" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-copper"
          onClick={() => setOpen(false)}
        >
          <WireMark />
          <span className="font-mono text-[12px] font-medium tracking-[0.14em] text-foreground uppercase sm:text-[13px]">
            {COMPANY}
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/instant-quote" className={btn.quote}>
            Instant quote
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-foreground md:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Menu</span>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            {open ? (
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </Container>

      {open ? (
        <nav className="border-t border-line px-5 py-4 md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-base text-muted"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/instant-quote"
              className={`${btn.quote} w-fit`}
              onClick={() => setOpen(false)}
            >
              Instant quote
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}
