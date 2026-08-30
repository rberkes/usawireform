import { COMPANY, PART_PREFIX, QUOTE_EMAIL, SITE_HOST, SITE_URL } from "@/lib/company";

/** Effective date for the public Privacy Policy and User Agreement. */
export const LEGAL_EFFECTIVE = "August 30, 2026";

export const LEGAL_EMAIL = QUOTE_EMAIL;

export const MARKS = {
  company: `${COMPANY}™`,
  partPrefix: `${PART_PREFIX}™`,
  host: SITE_HOST,
} as const;

export const LEGAL_PATHS = {
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const LEGAL_NOTICE = `${COMPANY} owns the original content, code, design, and compilation of ${SITE_HOST}. All rights reserved.`;
