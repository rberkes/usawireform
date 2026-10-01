import { auditMarkdown, runIndexAudit } from "../src/lib/index-audit";

const audit = runIndexAudit();
process.stdout.write(`${auditMarkdown(audit)}\n`);
if (audit.findings.some((finding) => finding.severity === "error")) {
  process.exit(1);
}
