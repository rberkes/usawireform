export const SOURCE_KINDS = [
  "3D CNC",
  "2D CNC",
  "Fourslide",
  "Multi-slide",
  "Spring CNC",
  "Other",
] as const;

export type SourceKind = (typeof SOURCE_KINDS)[number];

/** Buyer must pick one. Maps 1:1 to the kind shops file on a cell. */
export const SOURCE_JOB_CLASSES = [
  {
    kind: "Spring CNC",
    label: "Spring",
    hint: "Compression, extension, torsion. CNC or mechanical coiler. Not hot-wound rail coil.",
  },
  {
    kind: "2D CNC",
    label: "2D CNC",
    hint: "Bends in one plane. Tables, 2D benders, cut-to-length.",
  },
  {
    kind: "3D CNC",
    label: "3D CNC",
    hint: "Spatial forms from coil or bar. Hooks, frames, baskets.",
  },
  {
    kind: "Fourslide",
    label: "Fourslide",
    hint: "Cam four-slide. Volume wire forms and light stampings.",
  },
  {
    kind: "Multi-slide",
    label: "Multi-slide",
    hint: "Multi-slide, verti-slide, Bihler. More stations than fourslide.",
  },
] as const;

export type SourceJobClassKind = (typeof SOURCE_JOB_CLASSES)[number]["kind"];

export function isSourceJobClass(value: string): value is SourceJobClassKind {
  return SOURCE_JOB_CLASSES.some((row) => row.kind === value);
}

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
  /** Private blob path for the public shop logo. */
  logoPath?: string;
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
