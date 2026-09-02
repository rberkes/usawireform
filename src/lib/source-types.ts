import type { SourceBuyerFit } from "@/lib/source-fit";

export const SOURCE_KINDS = [
  "3D CNC",
  "2D CNC",
  "Straighten & Cut to Length",
  "Fourslide",
  "Multi-slide",
  "Manual pneumatic",
  "Spring CNC",
  "Other",
] as const;

export type SourceKind = (typeof SOURCE_KINDS)[number];

/** Buyer and shop pick one. Maps 1:1 to the kind shops file on a cell. */
export const SOURCE_JOB_CLASSES = [
  {
    kind: "2D CNC",
    label: "2D CNC",
    hint: "Bends in one plane. Tables and 2D benders.",
  },
  {
    kind: "3D CNC",
    label: "3D CNC",
    hint: "Spatial forms from coil or bar. Hooks, frames, baskets.",
  },
  {
    kind: "Straighten & Cut to Length",
    label: "Straighten & Cut to Length",
    hint: "Decoil, straighten, shear or saw. Straight blanks — not a 2D former.",
  },
  {
    kind: "Fourslide",
    label: "4-slide",
    hint: "Cam four-slide. Baird, Nilson. Volume wire forms and light stampings.",
  },
  {
    kind: "Multi-slide",
    label: "Multi-slide",
    hint: "Baird #28/#33, Bihler, verti-slide. More stations than 4-slide.",
  },
  {
    kind: "Manual pneumatic",
    label: "Manual pneumatic",
    hint: "Lubow table benders and air formers. Not a cam 4-slide.",
  },
  {
    kind: "Spring CNC",
    label: "Spring CNC",
    hint: "Compression, extension, torsion. CNC or mechanical coiler.",
  },
] as const;

export type SourceJobClassKind = (typeof SOURCE_JOB_CLASSES)[number]["kind"];

export function isSourceJobClass(value: string): value is SourceJobClassKind {
  return SOURCE_JOB_CLASSES.some((row) => row.kind === value);
}

export function sourceJobClassPrompt() {
  return SOURCE_JOB_CLASSES.map((row) => row.label).join(", ");
}

export type SourceMachine = {
  oem: string;
  model: string;
  kind: string;
  minMm: string;
  maxMm: string;
  city: string;
  /** Plate year on the cell. */
  year?: string;
  /** Production capacity the shop files — pcs/week, hours, or a short note. */
  capacity?: string;
  /** Wire diameters this cell actually stocks, not just the machine band. */
  stockedSizes?: string;
  /** Mirrored from the shop fullness slider. 0 = full, 10 = needs work. */
  openSlots?: number;
  /** When the shop last filed this week's plant fullness. */
  capacityAt?: string;
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
  /** Buyer-fit from the shop profile, when matched. */
  fit?: SourceBuyerFit;
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
  /** Private blob path for the public plant photo on the listing. */
  photoPath?: string;
  /** Numbered plant street. Required to pass the plant check. */
  plantStreet?: string;
  /** Public page that names machines or shows the floor. */
  plantProofUrl?: string;
  /** When the shop passed the three-check plant test. */
  plantVerifiedAt?: string;
  /** Shop-filed buyer-fit: MOQ, setup, stock, lead, coil. */
  fit?: SourceBuyerFit;
  /** Company load this week. 0 = needs work, 100 = no capacity. */
  fullPercent?: number;
  /** When the shop last moved the fullness slider. */
  capacityAt?: string;
  /**
   * Desk grant leftover from cell-plan billing. Not required to see teasers;
   * every listed shop can buy a matched lead.
   */
  leadsAccess?: "comp";
  /** When the shop accepted the current Source NDA. */
  ndaAcceptedAt?: string;
  /** Version string from SOURCE_NDA_VERSION. */
  ndaVersion?: string;
  /** Name typed on the NDA form. */
  ndaName?: string;
};

export const SOURCE_DRAWING_PRIVACY = ["desk", "matched"] as const;
export type SourceDrawingPrivacy = (typeof SOURCE_DRAWING_PRIVACY)[number];

export function parseDrawingPrivacy(
  value: string | undefined | null,
): SourceDrawingPrivacy {
  return value === "matched" ? "matched" : "desk";
}

export function drawingPrivacyLabel(value: SourceDrawingPrivacy) {
  return value === "matched"
    ? "STEP released to quoting shops"
    : "Held at the desk";
}

export type SourceJobMailedTo = {
  email: string;
  company: string;
  userId?: string;
};

export type SourceJobPurchase = {
  userId: string;
  email: string;
  company: string;
  purchasedAt: string;
  sessionId?: string;
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
  /** Alloy the buyer named. */
  alloy?: string;
  /** Who buys coil. */
  coilBuyer?: string;
  needBy?: string;
  /** Finish / secondary the print needs. */
  finish?: string;
  runKind?: string;
  ppap?: boolean;
  parsedBy: "form" | "ai" | "form+ai";
  timestamp: string;
  fileName?: string;
  drawingPath?: string;
  /** Who may receive the STEP. Default desk. */
  drawingPrivacy?: SourceDrawingPrivacy;
  /** Unguessable token so the buyer can change privacy without an account. */
  privacyToken?: string;
  /** Shops offered this RFQ in the dashboard (up to 10). Empty until desk Release. */
  mailedTo?: SourceJobMailedTo[];
  /** Shops that paid $49 to unlock buyer contact. */
  purchasedBy?: SourceJobPurchase[];
  /** Clerk user when a signed-in buyer sent the job. */
  buyerUserId?: string;
  /** Buyer mailed once when the desk opened the drawing. */
  reviewedNotifiedAt?: string;
  /** Desk released this print to matching shops. */
  releasedAt?: string;
  /** Desk clicked Release; later prints wait on buyer $49. */
  qualifiedAt?: string;
  /** Buyer paid $49 for this later print. First released print is free. */
  buyerPaidAt?: string;
};

export type SourceJobRow = SourceJob & { pathname: string };

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
  /** MOQ, lead, coil — from the shop profile, if filed. */
  fitNote?: string;
};

export type SourceInternalMatch = SourcePublicMatch & {
  email: string;
};
