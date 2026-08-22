import { directoryRegionForState, getDirectoryCompany } from "@/lib/directory";
import type { DirectoryCompany } from "@/lib/directory-types";
import { parseSourceSecondaries } from "@/lib/source-secondaries";
import type { SourceMachine, SourceProfile } from "@/lib/source-types";

export function slugifyShopName(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return slug;
}

export function normalizeShopWebsite(raw: string) {
  const value = raw.trim().slice(0, 200);
  if (!value) return "";
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export function sourceProfileLocation(profile: Pick<SourceProfile, "city" | "state">) {
  return [profile.city, profile.state].filter(Boolean).join(", ");
}

export function sourceCellsToMachineNotes(cells: SourceMachine[]) {
  return cells.map((row) => {
    const band =
      row.minMm || row.maxMm ? `${row.minMm || "?"}–${row.maxMm || "?"} mm` : "";
    return [row.oem, row.model, row.kind, band].filter(Boolean).join(" · ");
  });
}

export function directoryCity(
  company: Pick<DirectoryCompany, "location" | "state">,
) {
  const suffix = `, ${company.state}`;
  if (company.location.toUpperCase().endsWith(suffix.toUpperCase())) {
    return company.location.slice(0, -suffix.length).trim();
  }
  return company.location;
}

export function sourceClaimPath(slug: string) {
  return `/source/claim?slug=${encodeURIComponent(slug)}`;
}

/** Source is a USA shop floor. Canada stays in the directory. Europe later, separate platform. */
export function sourceClaimable(
  company: Pick<DirectoryCompany, "country" | "filedOnSource">,
) {
  return company.country === "USA" && !company.filedOnSource;
}

export function sourceAccountLocksClaim(
  profile: Pick<SourceProfile, "slug" | "claimedDirectory"> | null | undefined,
) {
  if (!profile?.slug) return false;
  return Boolean(profile.claimedDirectory || getDirectoryCompany(profile.slug));
}

export function overlaySourceOnDirectory(
  listed: DirectoryCompany,
  sourced?: DirectoryCompany | null,
): DirectoryCompany {
  if (!sourced) return listed;
  return {
    ...listed,
    name: sourced.name || listed.name,
    phone: sourced.phone || listed.phone,
    website: sourced.website || listed.website,
    description: sourced.description || listed.description,
    machines:
      sourced.machines && sourced.machines.length > 0
        ? sourced.machines
        : listed.machines,
    wireDiameters: sourced.wireDiameters || listed.wireDiameters,
    filedOnSource: true,
    listedAt: sourced.listedAt,
    secondaries: sourced.secondaries?.length
      ? sourced.secondaries
      : listed.secondaries,
    logoUrl: sourced.logoUrl || listed.logoUrl,
  };
}

export function mergeDirectoryList(
  listed: DirectoryCompany[],
  sourced: DirectoryCompany[],
): DirectoryCompany[] {
  const listedSlugs = new Set(listed.map((row) => row.slug));
  const sourcedBySlug = new Map(sourced.map((row) => [row.slug, row]));
  return [
    ...listed.map((row) =>
      overlaySourceOnDirectory(row, sourcedBySlug.get(row.slug)),
    ),
    ...sourced.filter((row) => !listedSlugs.has(row.slug)),
  ];
}

export function sourceProfileToDirectoryCompany(
  profile: SourceProfile,
  cells: SourceMachine[],
): DirectoryCompany {
  const location = sourceProfileLocation(profile) || "United States";
  const kinds = [...new Set(cells.map((row) => row.kind).filter(Boolean))];
  const bands = cells
    .map((row) => {
      if (!row.minMm && !row.maxMm) return "";
      return `${row.minMm || "?"}–${row.maxMm || "?"} mm`;
    })
    .filter(Boolean);
  const description =
    profile.blurb.trim() ||
    `${profile.company} in ${location}. Filed CNC cells on Source — OEM, type, and wire band from the shop.`;

  return {
    slug: profile.slug,
    name: profile.company,
    location,
    state: profile.state.trim().toUpperCase() || "OH",
    country: directoryRegionForState(profile.state) === "Canada" ? "Canada" : "USA",
    region: directoryRegionForState(profile.state),
    website: profile.website || undefined,
    phone: profile.phone || undefined,
    description,
    capabilities: kinds.length > 0 ? kinds : ["CNC wire forming"],
    machines: sourceCellsToMachineNotes(cells),
    wireDiameters: bands[0] && bands.length === 1 ? bands[0] : bands.join(", ") || undefined,
    filedOnSource: true,
    listedAt: profile.listedAt || profile.updatedAt,
    secondaries: parseSourceSecondaries(profile.secondaries),
    logoUrl: profile.logoPath
      ? `/directory/logo/${profile.slug}?v=${encodeURIComponent(profile.updatedAt)}`
      : undefined,
  };
}
