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
}
