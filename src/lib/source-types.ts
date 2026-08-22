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
