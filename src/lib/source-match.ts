import { hydrateMachineFromCatalog } from "@/lib/source-iron";
import { type SourceFiling, type SourceInternalMatch } from "@/lib/source-types";

const BAND_SLACK_MM = 0.05;
export const SOURCE_MATCH_LIMIT = 3;

export function parseWireMm(raw: string): number | null {
  const text = raw.trim().toLowerCase().replace(/,/g, ".");
  if (!text) return null;
  const fraction = text.match(/^(\d+)\s*\/\s*(\d+)/);
  if (fraction) {
    const value = (Number(fraction[1]) / Number(fraction[2])) * 25.4;
    return Number.isFinite(value) && value > 0 ? roundMm(value) : null;
  }
  const inch = text.match(/^([\d.]+)\s*(in|inch|inches|")\b/);
  if (inch) {
    const value = Number(inch[1]) * 25.4;
    return Number.isFinite(value) && value > 0 ? roundMm(value) : null;
  }
  const mm = text.match(/^([\d.]+)\s*mm\b/);
  if (mm) {
    const value = Number(mm[1]);
    return Number.isFinite(value) && value > 0 ? roundMm(value) : null;
  }
  const value = Number(text);
  if (!Number.isFinite(value) || value <= 0) return null;
  return roundMm(value < 2 ? value * 25.4 : value);
}

export function roundMm(value: number) {
  return Math.round(value * 100) / 100;
}

export function parseBandMm(raw: string): number | null {
  const value = Number(String(raw).trim().replace(/,/g, "."));
  return Number.isFinite(value) && value > 0 ? value : null;
}

export type SourceJobSpec = {
  diameterMm: number | null;
  kind: string;
  oem: string;
  city: string;
  state: string;
  buyerEmail: string;
};

function kindMatches(jobKind: string, machineKind: string) {
  const job = jobKind.trim();
  const cell = machineKind.trim();
  if (!job || job === "Other" || job === "Any") return false;
  if (!cell || cell === "Other") return false;
  return job === cell;
}

export function machineFitsJob(
  machine: { kind: string; minMm: string; maxMm: string },
  job: SourceJobSpec,
) {
  if (job.diameterMm == null) return false;
  const min = parseBandMm(machine.minMm);
  const max = parseBandMm(machine.maxMm);
  if (min == null || max == null) return false;
  if (job.diameterMm + BAND_SLACK_MM < min) return false;
  if (job.diameterMm - BAND_SLACK_MM > max) return false;
  return kindMatches(job.kind, machine.kind);
}

function localeScore(job: SourceJobSpec, city: string, state: string) {
  let score = 0;
  const jobCity = job.city.trim().toLowerCase();
  const jobState = job.state.trim().toLowerCase();
  const cellCity = city.trim().toLowerCase();
  const cellState = state.trim().toLowerCase();
  if (jobState && cellState && jobState === cellState) score += 10;
  if (jobCity && cellCity && jobCity === cellCity) score += 15;
  return score;
}

function oemScore(jobOem: string, machineOem: string) {
  const want = jobOem.trim().toLowerCase();
  if (!want || want === "other" || want === "any") return 0;
  return machineOem.trim().toLowerCase() === want ? 20 : 0;
}

function tightnessScore(diameterMm: number, min: number, max: number) {
  const span = Math.max(max - min, 0.01);
  const mid = (min + max) / 2;
  return Math.max(0, 8 - Math.abs(diameterMm - mid) / span * 8);
}

export function matchFilingsToJob(
  filings: SourceFiling[],
  job: SourceJobSpec,
  limit = SOURCE_MATCH_LIMIT,
): SourceInternalMatch[] {
  if (job.diameterMm == null) return [];
  const ranked: Array<SourceInternalMatch & { score: number }> = [];

  for (const filing of filings) {
    if (
      job.buyerEmail &&
      filing.email.trim().toLowerCase() === job.buyerEmail.trim().toLowerCase()
    ) {
      continue;
    }
    let best: (SourceInternalMatch & { score: number }) | null = null;
    for (const filed of filing.machines) {
      const machine = hydrateMachineFromCatalog(filed);
      if (!machineFitsJob(machine, job)) continue;
      const min = parseBandMm(machine.minMm) ?? 0;
      const max = parseBandMm(machine.maxMm) ?? 0;
      const city = filing.city;
      const score =
        100 +
        oemScore(job.oem, machine.oem) +
        localeScore(job, city, filing.state) +
        tightnessScore(job.diameterMm, min, max);
      const why = `${machine.kind} · ${job.diameterMm} mm sits in ${machine.oem} ${machine.model} · ${machine.minMm}–${machine.maxMm} mm`;
      const row: SourceInternalMatch & { score: number } = {
        company: filing.company,
        email: filing.email,
        city,
        state: filing.state,
        oem: machine.oem,
        model: machine.model,
        kind: machine.kind,
        minMm: machine.minMm,
        maxMm: machine.maxMm,
        why,
        score,
      };
      if (!best || row.score > best.score) best = row;
    }
    if (best) ranked.push(best);
  }

  return ranked
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ score: _score, ...row }) => row);
}
