/** Teaser-safe email. First character of local and host, TLD kept. */
export function maskEmail(value?: string | null) {
  const email = (value ?? "").trim();
  const at = email.lastIndexOf("@");
  if (at < 1) return "";
  const local = email.slice(0, at);
  const domain = email.slice(at + 1);
  if (!local || !domain) return "";
  const dot = domain.lastIndexOf(".");
  const host = dot > 0 ? domain.slice(0, dot) : domain;
  const tld = dot > 0 ? domain.slice(dot) : "";
  return `${maskPart(local)}@${maskPart(host)}${tld}`;
}

function maskPart(part: string) {
  const first = part[0];
  if (!first) return "***";
  return `${first}***`;
}
