import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "node_modules/occt-import-js/dist");
const dest = join(root, "public/vendor/occt-import-js");

mkdirSync(dest, { recursive: true });

for (const file of [
  "occt-import-js.js",
  "occt-import-js.wasm",
  "occt-import-js-worker.js",
]) {
  copyFileSync(join(src, file), join(dest, file));
}
