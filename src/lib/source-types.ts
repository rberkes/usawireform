export const SOURCE_KINDS = [
  "3D CNC",
  "2D CNC",
  "Fourslide",
  "Multi-slide",
  "Spring CNC",
  "Other",
] as const;

export type SourceKind = (typeof SOURCE_KINDS)[number];

export type SourceMachine = {
  oem: string;
  model: string;
  kind: string;
  minMm: string;
  maxMm: string;
  city: string;
};

export type SourceInvite = {
  id: string;
  to: string;
  company: string;
  note: string;
  href: string;
  sentAt: string;
};

export type SourceFiling = {
  inviteId?: string;
  userId?: string;
  company: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  website: string;
  machines: SourceMachine[];
  notes: string;
  fileName?: string;
  timestamp: string;
};

export type SourceFilingRow = SourceFiling & {
  pathname: string;
  href: string;
};

export type SourceProfile = {
  userId: string;
  slug: string;
  company: string;
  name: string;
  phone: string;
  city: string;
  state: string;
  website: string;
  blurb: string;
  secondaries?: string[];
  published: boolean;
  claimedDirectory?: boolean;
  listedAt?: string;
  updatedAt: string;
};

export type SourceJob = {
  company: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  diameterRaw: string;
  diameterMm: number | null;
  kind: string;
  oem: string;
  qty: string;
  notes: string;
  parsedBy: "form" | "ai" | "form+ai";
  timestamp: string;
};

export type SourcePublicMatch = {
  company: string;
  city: string;
  state: string;
  oem: string;
  model: string;
  kind: string;
  minMm: string;
  maxMm: string;
  why: string;
};

export type SourceInternalMatch = SourcePublicMatch & {
  email: string;
};
