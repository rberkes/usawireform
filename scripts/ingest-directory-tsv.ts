/**
 * Turns researched TSV rows into a directory source file.
 *
 * Research passes write `NAME CITY STATE WEBSITE DESCRIPTION CAPABILITIES
 * SOURCE_URL` rows. This dedupes them against the live directory and against
 * each other, rejects anything that fails validation, and emits a TypeScript
 * module in the same shape as the other directory sources.
 *
 * Usage: npx tsx scripts/ingest-directory-tsv.ts <out.ts> <in.tsv...>
 *
 * Dedupe is deliberately done here as well as in `mergeDirectory`. The merge is
 * the backstop that keeps bad data off the site; this is the pass that tells us
 * how much of the research was actually new, which the merge silently hides.
 */
import { writeFileSync } from "fs";
import { readFileSync, existsSync } from "fs";
import { directoryCompanies, directoryRegionForState } from "../src/lib/directory";

const CANON = new Set([
  "Wire forms", "Springs", "Stampings", "Torsion springs", "Compression springs",
  "Extension springs", "Fourslide", "Multi-slide", "CNC wire forming",
  "Wire straightening", "Wire cutting", "Assemblies", "Welded assemblies",
  "Spring washers", "Coil springs", "Tube bending", "Rings", "Flat forms",
  "Machining", "Laser cutting", "Powder coating", "Medical wire", "Fasteners",
  "Prototyping",
]);

const US_STATES = new Set([
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY","DC",
]);
const CA_PROV = new Set(["ON","QC","BC","AB","MB","SK","NS","NB","NL","PE","NT","YT","NU"]);

function normName(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

function hostOf(url?: string) {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "";
  }
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Names that mean the row is not a forming floor, whatever the research said. */
const REJECT_NAME =
  /\b(distribut|supply co|supplies|service center|wire mill|steel mill|trading|import|export|brokerage|broker|equipment|machinery|machine (co|works|tool)|WAFIOS|Numalliance|Bihler|Schlatter|Herborn|Itaya|association|institute|consulting|software|magazine|media)\b/i;

type Row = {
  name: string;
  city: string;
  state: string;
  website: string;
  description: string;
  capabilities: string[];
  source: string;
  from: string;
  /**
   * Set when a resolution pass confirmed the company is real and operating.
   * A verified row may be listed without a website; an unverified one may not,
   * because a name with no domain cannot be deduped and cannot be checked.
   */
  verified?: boolean;
};

type Resolution = {
  /** Name as the verification pass reported it, kept for the unmatched report. */
  name: string;
  city: string;
  state: string;
  website: string;
  status: "OK" | "NOSITE" | "EXCLUDE";
  note: string;
};

/**
 * Name key with trailing legal suffixes removed, so "Burkhardt Manufacturing"
 * can match the "Burkhardt Manufacturing LLC" a verification pass came back
 * with. Lossy on purpose, which is why it is only ever used as an unambiguous
 * fallback — see `resolutionFor`.
 */
function looseName(name: string) {
  let key = normName(name);
  for (let i = 0; i < 3; i += 1) {
    const next = key.replace(
      /(llc|inc|incorporated|corp|corporation|company|co|ltd|limited|lp|llp|mfg|manufacturing)$/,
      "",
    );
    if (next === key || next.length < 5) break;
    key = next;
  }
  return key;
}

/** First 8 characters of the normalized name, used as a last-resort key. */
function stemName(name: string) {
  return normName(name).slice(0, 8);
}

/**
 * Optional resolution files from verification passes (comma-separated in
 * RESOLVED): `NAME CITY STATE WEBSITE STATUS NOTE`. Patches location and
 * website, and drops anything marked EXCLUDE (closed, acquired, or not a
 * forming floor).
 */
function loadResolutions(paths: string | undefined) {
  const exact = new Map<string, Resolution>();
  const loose = new Map<string, Resolution[]>();
  const stem = new Map<string, Resolution[]>();
  const all: Resolution[] = [];
  if (!paths) return { exact, loose, stem, all };
  for (const path of paths.split(",").map((p) => p.trim()).filter(Boolean)) {
    if (!existsSync(path)) {
      console.error(`! resolution file missing: ${path}`);
      continue;
    }
    for (const line of readFileSync(path, "utf8").split("\n")) {
      if (!line.trim()) continue;
      const [name, city, state, website, status, note] = line
        .split("\t")
        .map((p) => p.trim());
      if (!name || /^NAME$/i.test(name)) continue;
      const clean =
        status === "OK" || status === "NOSITE" || status === "EXCLUDE"
          ? status
          : undefined;
      if (!clean) continue;
      const row: Resolution = {
        name,
        city: city ?? "",
        state: (state ?? "").toUpperCase(),
        website: website ?? "",
        status: clean,
        note: note ?? "",
      };
      // A later file wins, so an override pass can retire an earlier verdict.
      const priorIndex = all.findIndex((r) => normName(r.name) === normName(name));
      if (priorIndex >= 0) all.splice(priorIndex, 1);
      all.push(row);
    }
  }
  // Index after every file is read. Indexing as we go would leave a replaced
  // verdict sitting in the loose and stem buckets, and two candidates under one
  // key read as ambiguous, which silently drops the resolution.
  for (const row of all) {
    exact.set(normName(row.name), row);
    const key = looseName(row.name);
    loose.set(key, [...(loose.get(key) ?? []), row]);
    const stemKey = stemName(row.name);
    stem.set(stemKey, [...(stem.get(stemKey) ?? []), row]);
  }
  return { exact, loose, stem, all };
}

/**
 * Exact name match first. Fall back to the suffix-stripped key only when it
 * points at exactly one resolution — "Acme Wire Products" and "Acme Wire
 * Products LLC" are different companies in different states, and guessing
 * between them would attach the wrong website to a real shop.
 */
function resolutionFor(name: string, state: string) {
  const hit = resolutions.exact.get(normName(name));
  if (hit) return used(hit);
  const near = resolutions.loose.get(looseName(name));
  if (near && near.length === 1) return used(near[0]);
  // Last resort: a verification pass often returns a fuller legal name than the
  // listing it came from ("Accurate Spring" becomes "Accurate Spring Mfg.,
  // Inc."). The first eight characters of the name are specific enough when
  // they point at one row; when several share a stem, the state breaks the tie.
  const stem = resolutions.stem.get(stemName(name)) ?? [];
  if (stem.length === 1) return used(stem[0]);
  const inState = stem.filter((r) => r.state === state.toUpperCase());
  return inState.length === 1 ? used(inState[0]) : undefined;
}

const matched = new Set<Resolution>();
function used(row: Resolution) {
  matched.add(row);
  return row;
}

const [, , outPath, ...inputs] = process.argv;
if (!outPath || inputs.length === 0) {
  console.error("usage: npx tsx scripts/ingest-directory-tsv.ts <out.ts> <in.tsv...>");
  process.exit(1);
}

const resolutions = loadResolutions(process.env.RESOLVED);
const rejects: string[] = [];
const rows: Row[] = [];

for (const file of inputs) {
  if (!existsSync(file)) {
    console.error(`! missing ${file}`);
    continue;
  }
  const lines = readFileSync(file, "utf8").split("\n").filter((l) => l.trim());
  let seenHeader = false;
  for (const line of lines) {
    const parts = line.split("\t").map((p) => p.trim());
    if (!seenHeader && /^NAME$/i.test(parts[0] ?? "")) {
      seenHeader = true;
      continue;
    }
    const [name, city, state, website, description, capabilities, source] = parts;
    if (!name) continue;
    rows.push({
      name,
      city: city ?? "",
      state: (state ?? "").toUpperCase(),
      website: website ?? "",
      description: description ?? "",
      capabilities: (capabilities ?? "").split(";").map((c) => c.trim()).filter(Boolean),
      source: source ?? "",
      from: file.replace(/^.*\//, ""),
    });
  }
}

/**
 * Slugs this script wrote on a previous run.
 *
 * Once the generated file is wired into `directory.ts`, its own output shows up
 * in `directoryCompanies`. Without this, a re-run would reject everything it
 * added last time as "already in directory" and emit an empty file. Reading the
 * prior output back keeps regeneration idempotent, so the TSVs stay the source
 * of truth and this file can always be rebuilt from them.
 */
function priorOutputSlugs(path: string) {
  if (!existsSync(path)) return new Set<string>();
  const text = readFileSync(path, "utf8");
  const slugs = new Set<string>();
  // The slug is the first argument to shop(); anchor on that so a lowercase
  // city or description can never be mistaken for one.
  for (const m of text.matchAll(/\bshop\(\s*\n\s*"([a-z0-9-]+)",/g)) {
    slugs.add(m[1]);
  }
  return slugs;
}

const ours = priorOutputSlugs(outPath);

// Live directory keys, excluding rows this script generated previously.
const liveHosts = new Set<string>();
const liveNames = new Set<string>();
const liveSlugs = new Set<string>();
for (const c of directoryCompanies) {
  if (ours.has(c.slug)) continue;
  const h = hostOf(c.website);
  if (h) liveHosts.add(h);
  liveNames.add(normName(c.name));
  liveSlugs.add(c.slug);
}

const keptHosts = new Set<string>();
const keptNames = new Set<string>();
const keptSlugs = new Set<string>();
const kept: (Row & { slug: string })[] = [];

// Apply the resolution pass before validating.
for (const row of rows) {
  const fix = resolutionFor(row.name, row.state);
  if (!fix) continue;
  if (fix.status === "EXCLUDE") {
    row.verified = false;
    row.website = "";
    row.state = "!EXCLUDED";
    row.description = fix.note;
    continue;
  }
  row.verified = true;
  if (fix.website) row.website = fix.website;
  if (fix.city) row.city = fix.city;
  if (fix.state) row.state = fix.state;
}

for (const row of rows) {
  const host = hostOf(row.website);
  const nameKey = normName(row.name);

  if (row.state === "!EXCLUDED") {
    rejects.push(`${row.from}\tresolution excluded\t${row.name} — ${row.description}`);
    continue;
  }
  if ((!row.website || !host) && !row.verified) {
    rejects.push(`${row.from}\tno website\t${row.name}`);
    continue;
  }
  if (!row.city) {
    rejects.push(`${row.from}\tno city\t${row.name}`);
    continue;
  }
  if (!US_STATES.has(row.state) && !CA_PROV.has(row.state)) {
    rejects.push(`${row.from}\tbad state "${row.state}"\t${row.name}`);
    continue;
  }
  if (REJECT_NAME.test(row.name)) {
    rejects.push(`${row.from}\tnot a forming floor\t${row.name}`);
    continue;
  }
  const caps = row.capabilities.filter((c) => CANON.has(c));
  if (caps.length === 0) {
    rejects.push(`${row.from}\tno canonical capability\t${row.name}`);
    continue;
  }
  // An empty host is not a collision — several rows may legitimately lack one.
  if ((host && liveHosts.has(host)) || liveNames.has(nameKey)) {
    rejects.push(`${row.from}\talready in directory\t${row.name}`);
    continue;
  }
  if ((host && keptHosts.has(host)) || keptNames.has(nameKey)) {
    rejects.push(`${row.from}\tduplicate within research\t${row.name}`);
    continue;
  }
  let slug = slugify(row.name);
  if (!slug) {
    rejects.push(`${row.from}\tunsluggable name\t${row.name}`);
    continue;
  }
  if (liveSlugs.has(slug) || keptSlugs.has(slug)) {
    slug = `${slug}-${row.state.toLowerCase()}`;
  }
  if (liveSlugs.has(slug) || keptSlugs.has(slug)) {
    rejects.push(`${row.from}\tslug collision\t${row.name}`);
    continue;
  }

  if (host) keptHosts.add(host);
  keptNames.add(nameKey);
  keptSlugs.add(slug);
  kept.push({
    ...row,
    slug,
    capabilities: caps,
    website: host ? `https://${host}` : "",
  });
}

function lit(value: string) {
  return JSON.stringify(value);
}

const body = kept
  .sort((a, b) => a.state.localeCompare(b.state) || a.name.localeCompare(b.name))
  .map((row) => {
    const region = directoryRegionForState(row.state);
    const country = CA_PROV.has(row.state) ? "Canada" : "USA";
    return `  shop(
    ${lit(row.slug)},
    ${lit(row.name)},
    ${lit(row.city)},
    ${lit(row.state)},
    ${lit(country)},
    ${lit(region)},
    ${lit(row.description || `${row.name} in ${row.city}, ${row.state}.`)},
    [${row.capabilities.map(lit).join(", ")}],
    ${lit(row.website)},
  ),`;
  })
  .join("\n");

const out = `import type { DirectoryCompany } from "./directory-types";

/**
 * Forming floors found in a deeper outreach pass: association rosters (SMI,
 * CASMI, NESMA), trade show exhibitor lists (SpringWorld, Interwire, Wire Expo,
 * FABTECH), industry category directories, and state-by-state gap filling.
 *
 * USA and Canada forming floors only. No reps, distributors, mills, service
 * centers, sourcing desks, or equipment OEMs. Generated by
 * \`scripts/ingest-directory-tsv.ts\`; edit the research TSVs and re-run rather
 * than hand-editing this file.
 */

function shop(
  slug: string,
  name: string,
  city: string,
  state: string,
  country: DirectoryCompany["country"],
  region: DirectoryCompany["region"],
  description: string,
  capabilities: string[],
  website?: string,
): DirectoryCompany {
  return {
    slug,
    name,
    location: \`\${city}, \${state}\`,
    state,
    country,
    region,
    description,
    capabilities,
    ...(website ? { website } : {}),
  };
}

export const outreachDirectoryCompanies: DirectoryCompany[] = [
${body}
];
`;

writeFileSync(outPath, out);

const byState = new Map<string, number>();
for (const row of kept) byState.set(row.state, (byState.get(row.state) ?? 0) + 1);

console.log(`read ${rows.length} researched rows from ${inputs.length} file(s)`);
console.log(`kept ${kept.length}, rejected ${rejects.length}`);
console.log(`wrote ${outPath}`);
console.log(`\nkept by state: ${[...byState.entries()].sort((a, b) => b[1] - a[1]).map(([s, n]) => `${s}:${n}`).join("  ")}`);

const reasons = new Map<string, number>();
for (const r of rejects) {
  const reason = r.split("\t")[1];
  reasons.set(reason, (reasons.get(reason) ?? 0) + 1);
}
// A resolution that matches nothing is a verified company quietly thrown away,
// which is the one failure here that looks like success.
const orphans = resolutions.all.filter((r) => !matched.has(r));
if (orphans.length > 0) {
  console.log(
    `\n! ${orphans.length} resolution row(s) matched no researched row:\n${orphans
      .map((r) => `  ${r.status}\t${r.name} (${r.city}, ${r.state})`)
      .join("\n")}`,
  );
}

console.log(`\nreject reasons:`);
for (const [reason, n] of [...reasons.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${n}\t${reason}`);
}
if (process.env.SHOW_REJECTS) console.log(`\n${rejects.join("\n")}`);
