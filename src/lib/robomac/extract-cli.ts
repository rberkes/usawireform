import { readFileSync } from "node:fs";
import { evaluateWireForm } from "./dfm";
import { formatSequence } from "./geometry";
import { extractWireForm } from "./extract";

const file = process.argv[2];
const materialId = process.argv[3] || "1018";
if (!file) {
  console.error("usage: npx tsx src/lib/robomac/extract-cli.ts <file.step> [materialId]");
  process.exit(1);
}

const bytes = new Uint8Array(readFileSync(file));
const extracted = extractWireForm(bytes, file, materialId);
if (!extracted.ok) {
  console.error(extracted.message);
  process.exit(1);
}
const dfm = evaluateWireForm(extracted.geometry);
console.log(formatSequence(extracted.geometry));
console.log("");
console.log(`DFM ${dfm.status} · ${dfm.issues.length} issues`);
for (const issue of dfm.issues) {
  console.log(
    `  ${issue.status} ${issue.check}${issue.recommendedChange ? ` — ${issue.recommendedChange}` : ""}`,
  );
}
