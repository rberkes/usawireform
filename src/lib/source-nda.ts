export const SOURCE_NDA_VERSION = "2026-08-31";

export const SOURCE_NDA_TITLE = "Source supplier confidentiality agreement";

export const SOURCE_NDA_SECTIONS = [
  {
    heading: "What this covers",
    body: "Buyer drawings, STEP files, PDFs, notes, and contact sent through Source are confidential. You receive them only to quote or manufacture that job.",
  },
  {
    heading: "What you may not do",
    body: "Do not copy, post, forward, or reuse a print for another customer. Do not share it with a sister plant, a sales office, or a shop that is not this account.",
  },
  {
    heading: "When you see a file",
    body: "A STEP is never attached to email. You can open it in the shop dashboard only after you accept this agreement and only if the buyer released that file to matched shops. If the buyer keeps it at the desk, you quote from the spec and contact only.",
  },
  {
    heading: "Export-controlled work",
    body: "This network is not set up for export-controlled drawings. Do not upload or request that class of file here.",
  },
  {
    heading: "How long it lasts",
    body: "The duty survives after you quote, decline, or close the account. The desk holds the original file. We record the version you accepted and the time.",
  },
] as const;

export function shopHasNda(
  profile?: { ndaAcceptedAt?: string; ndaVersion?: string } | null,
) {
  return Boolean(
    profile?.ndaAcceptedAt && profile.ndaVersion === SOURCE_NDA_VERSION,
  );
}
