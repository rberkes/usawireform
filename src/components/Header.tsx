"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { useState, useEffect, useRef, type ReactNode } from "react";
import { BrandLockup } from "./WireMark";
import { SearchButton } from "./Search";
import { btn, Container } from "./ui";
import { cx } from "@/lib/cx";
import {
  navSectionLinks,
  navSections,
  type NavSection,
} from "@/lib/nav";
import { sourceHomeLoginHref } from "@/lib/source-plans";

const SearchDialog = dynamic(
  () => import("./Search").then((mod) => ({ default: mod.SearchDialog })),
  { ssr: false }
);

export function Header({ account }: { account: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line bg-background/85 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <BrandLockup />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" ref={dropdownRef}>
            {navSections.map((section) => (
              <div key={section.label} className="relative">
                <button
                  type="button"
                  className={cx(
                    "flex items-center gap-1 px-3 py-2 text-sm transition-colors",
                    activeDropdown === section.label
                      ? "text-copper"
                      : "text-muted hover:text-foreground"
                  )}
                  onClick={() =>
                    setActiveDropdown(
                      activeDropdown === section.label ? null : section.label
                    )
                  }
                  onMouseEnter={() => setActiveDropdown(section.label)}
                  aria-expanded={activeDropdown === section.label}
                >
                  {section.label}
                  <ChevronIcon
                    className={cx(
                      "transition-transform",
                      activeDropdown === section.label && "rotate-180"
                    )}
                  />
                </button>
                {activeDropdown === section.label && (
                  <div
                    className={cx(
                      "absolute top-full pt-2",
                      section.label === "Learn" || section.label === "Factories"
                        ? "right-0"
                        : "left-0"
                    )}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <DropdownMenu
                      section={section}
                      onClose={() => setActiveDropdown(null)}
                    />
                  </div>
                )}
              </div>
            ))}
            <Link
              href="/contact"
              className="px-3 py-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <SearchButton onClick={() => setSearchOpen(true)} />
            <Link
              href={sourceHomeLoginHref()}
              className="hidden px-2 py-2 text-sm text-muted transition-colors hover:text-foreground sm:inline"
            >
              Log in
            </Link>
            {account}
            <Link
              href="/instant-quote"
              className={cx(btn.quote, "hidden whitespace-nowrap sm:inline-flex")}
            >
              Instant quote
            </Link>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center text-foreground lg:hidden"
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((value) => !value)}
            >
              <span className="sr-only">Menu</span>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                {mobileOpen ? (
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
          </div>
        </Container>

        {mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
      </header>

      <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-line bg-background p-3 sm:hidden">
        <Link
          href="/instant-quote"
          className={cx(btn.quote, "w-full justify-center")}
        >
          Get instant quote
        </Link>
      </div>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function DropdownMenu({
  section,
  onClose,
}: {
  section: NavSection;
  onClose: () => void;
}) {
  const groups = section.groups;
  if (groups?.length) {
    const cols =
      groups.length === 3 || groups.length >= 5 ? "grid-cols-3" : "grid-cols-2";
    return (
      <div
        className={cx(
          "rounded-lg border border-line bg-background p-4 shadow-xl",
          groups.length >= 3 ? "min-w-[540px]" : "min-w-[420px]",
          groups.length >= 5 && "min-w-[720px]"
        )}
      >
        <div className="mb-3 flex items-center justify-between border-b border-line pb-3">
          <Link
            href={section.href}
            className="text-sm font-medium text-copper hover:underline"
            onClick={onClose}
          >
            View all {section.label.toLowerCase()} →
          </Link>
        </div>
        <div className={cx("grid gap-6", cols)}>
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-2 font-mono text-[10px] font-medium uppercase tracking-widest text-muted">
                {group.title}
              </h3>
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block py-1 text-sm text-foreground/90 hover:text-copper"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[220px] rounded-lg border border-line bg-background p-2 shadow-xl">
      <Link
        href={section.href}
        className="mb-2 block rounded px-3 py-2 text-sm font-medium text-copper hover:bg-inset"
        onClick={onClose}
      >
        View all {section.label.toLowerCase()} →
      </Link>
      <div className="border-t border-line pt-2">
        {section.items?.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block rounded px-3 py-2 text-sm text-foreground/90 hover:bg-inset hover:text-copper"
            onClick={onClose}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <nav className="border-t border-line bg-background px-5 py-4 lg:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-2">
        {navSections.map((section) => {
          const links = navSectionLinks(section);
          const shown =
            section.label === "Products" ? links.slice(0, 10) : links;
          const open = expandedSection === section.label;
          return (
            <div key={section.label}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-2 text-base text-foreground"
                onClick={() =>
                  setExpandedSection(open ? null : section.label)
                }
                aria-expanded={open}
              >
                {section.label}
                <ChevronIcon
                  className={cx("transition-transform", open && "rotate-180")}
                />
              </button>
              {open ? (
                <div className="ml-4 border-l border-line pl-4">
                  <Link
                    href={section.href}
                    className="block py-2 text-sm text-copper"
                    onClick={onClose}
                  >
                    View all →
                  </Link>
                  {shown.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block py-2 text-sm text-muted"
                      onClick={onClose}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <Link
          href="/contact"
          className="py-2 text-base text-foreground"
          onClick={onClose}
        >
          Contact
        </Link>
        <Link
          href={sourceHomeLoginHref()}
          className="py-2 text-base text-foreground"
          onClick={onClose}
        >
          Log in
        </Link>
        <Link
          href="/source/enter"
          className="py-2 text-base text-foreground"
          onClick={onClose}
        >
          Source shop
        </Link>
        <Link
          href="/instant-quote"
          className={`${btn.quote} mt-4 w-full justify-center`}
          onClick={onClose}
        >
          Instant quote
        </Link>
      </div>
    </nav>
  );
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
