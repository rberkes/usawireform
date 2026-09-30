"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  isSupplierPath,
  siteChromeHrefs,
  type SiteAudience,
} from "@/lib/hosts";

export function SiteChrome({
  account,
  children,
  audience,
}: {
  account: ReactNode;
  children: ReactNode;
  audience: SiteAudience;
}) {
  const pathname = usePathname() || "/";
  const chrome = siteChromeHrefs({
    audience:
      audience === "supplier" || isSupplierPath(pathname)
        ? "supplier"
        : "buyer",
    onSupplierHost: false,
  });

  return (
    <>
      <Header account={account} chrome={chrome} />
      {children}
      <Footer chrome={chrome} />
    </>
  );
}
