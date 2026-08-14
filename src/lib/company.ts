export const COMPANY = "USA Wire Form";
export const SITE_HOST = "usawireform.com";
export const SITE_URL = `https://${SITE_HOST}`;
export const QUOTE_EMAIL = `info@${SITE_HOST}`;

// Where directory-inquiry and outbound-link leads get emailed. Separate from
// QUOTE_EMAIL (the public contact address) so lead notifications can point
// somewhere different without touching the site's public-facing email.
export const LEAD_NOTIFICATION_EMAIL =
  process.env.LEAD_NOTIFICATION_EMAIL || "rberkes@gmail.com";
