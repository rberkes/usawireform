"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { isSupplierPath, siteChromeHrefs } from "@/lib/hosts";

export function SiteChrome({
  account,
  children,
}: {
  account: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() || "/";
  const chrome = siteChromeHrefs({
    audience: isSupplierPath(pathname) ? "supplier" : "buyer",
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
