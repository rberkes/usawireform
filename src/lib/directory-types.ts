import type { SourceBuyerFit } from "@/lib/source-fit";

export interface DirectoryCompany {
  slug: string;
  name: string;
  location: string;
  state: string;
  country: "USA" | "Canada";
  region: "Northeast" | "Southeast" | "Midwest" | "Southwest" | "West" | "Canada";
  website?: string;
  linkedin?: string;
  phone?: string;
  description: string;
  capabilities: string[];
  /** Named iron from a public page — not a floor audit. */
  machines?: string[];
  /** Public page that named the iron. */
  equipmentSource?: string;
  industries?: string[];
  certifications?: string[];
  wireDiameters?: string;
  established?: string;
  /** Shop filed its own CNC cells on Source. */
  filedOnSource?: boolean;
  listedAt?: string;
  /** Paid Source secondaries the shop listed. */
  secondaries?: string[];
  /** Public shop logo from Source. */
  logoUrl?: string;
  /**
   * Plant vs desk. Set when we checked, or when the shop passed the
   * three-check claim / filed a cell. Offices stay off the USA factories page.
   */
  plantKind?: "plant" | "office";
  /** Numbered plant street. Not a PO box. */
  plantStreet?: string;
  /** Public page that names machines or shows the floor. */
  plantProofUrl?: string;
  /** Shop-filed buyer-fit. Empty on public-page listings we did not walk. */
  buyerFit?: SourceBuyerFit;
  /** Fresh weekly open slots the shop filed on a cell. */
  weeklyCapacity?: string;
}
