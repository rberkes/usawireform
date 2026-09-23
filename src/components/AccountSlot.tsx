"use client";

import { useEffect, useState, type ComponentType } from "react";

type NavProps = {
  shopName?: string;
  shopSlug?: string;
  role?: "supplier" | "buyer";
};

export function AccountSlot(props: NavProps & { signedIn: boolean }) {
  const [Nav, setNav] = useState<ComponentType<NavProps> | null>(null);

  useEffect(() => {
    if (!props.signedIn) return;
    let cancel = false;
    void import("@/components/SignedInAccount").then((mod) => {
      if (!cancel) setNav(() => mod.SignedInAccount);
    });
    return () => {
      cancel = true;
    };
  }, [props.signedIn]);

  if (!props.signedIn || !Nav) return null;
  return (
    <Nav shopName={props.shopName} shopSlug={props.shopSlug} role={props.role} />
  );
}
