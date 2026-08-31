export const HOME_FLOOR_CARD_COUNT = 6;

export type SourceFloorCell = {
  id: string;
  year: string;
  oem: string;
  model: string;
  kind: string;
  minMm: string;
  maxMm: string;
  city: string;
  state: string;
  uploadedAt: string;
  sample?: boolean;
};

type FilingLike = {
  pathname?: string;
  timestamp: string;
  city: string;
  state: string;
  machines: Array<{
    oem: string;
    model: string;
    kind: string;
    minMm: string;
    maxMm: string;
    city?: string;
    year?: string;
  }>;
};

const SAMPLE_FLOOR_CELLS: Omit<SourceFloorCell, "uploadedAt" | "sample">[] = [
  {
    id: "sample:pittsburgh-robomac",
    year: "2022",
    oem: "Numalliance",
    model: "Robomac R214TF",
    kind: "3D CNC",
    minMm: "4",
    maxMm: "14",
    city: "Pittsburgh",
    state: "PA",
  },
  {
    id: "sample:grand-rapids-baird",
    year: "2016",
    oem: "U.S. Baird",
    model: "#28",
    kind: "Fourslide",
    minMm: "1",
    maxMm: "6",
    city: "Grand Rapids",
    state: "MI",
  },
  {
    id: "sample:elgin-wafios",
    year: "2020",
    oem: "WAFIOS",
    model: "BM 50",
    kind: "3D CNC",
    minMm: "4",
    maxMm: "10",
    city: "Elgin",
    state: "IL",
  },
  {
    id: "sample:corona-aim",
    year: "2019",
    oem: "AIM Inc.",
    model: "SCS",
    kind: "2D CNC",
    minMm: "3",
    maxMm: "12",
    city: "Corona",
    state: "CA",
  },
  {
    id: "sample:nashville-nilson",
    year: "2014",
    oem: "Nilson",
    model: "S-3",
    kind: "Fourslide",
    minMm: "0.5",
    maxMm: "4",
    city: "Nashville",
    state: "TN",
  },
  {
    id: "sample:rockford-itaya",
    year: "2021",
    oem: "Itaya Engineering",
    model: "CS-20",
    kind: "Spring CNC",
    minMm: "1",
    maxMm: "6",
    city: "Rockford",
    state: "IL",
  },
];

function cellKey(cell: Pick<SourceFloorCell, "oem" | "model" | "city" | "state">) {
  return [cell.oem, cell.model, cell.city, cell.state]
    .map((part) => part.trim().toLowerCase())
    .join("|");
}

export function filingsToFloorCells(filings: FilingLike[]): SourceFloorCell[] {
  const cells: SourceFloorCell[] = [];
  for (const filing of filings) {
    filing.machines.forEach((machine, index) => {
      const oem = machine.oem.trim();
      const model = machine.model.trim();
      if (!oem && !model) return;
      const city = (machine.city || filing.city).trim();
      if (!city) return;
      cells.push({
        id: `${filing.pathname || filing.timestamp}:${index}`,
        year: (machine.year || "").trim(),
        oem,
        model,
        kind: machine.kind.trim(),
        minMm: machine.minMm.trim(),
        maxMm: machine.maxMm.trim(),
        city,
        state: filing.state.trim(),
        uploadedAt: filing.timestamp,
      });
    });
  }
  return cells.sort((a, b) =>
    a.uploadedAt < b.uploadedAt ? 1 : a.uploadedAt > b.uploadedAt ? -1 : 0,
  );
}

export function mergeFloorFeed(
  live: SourceFloorCell[],
  limit = HOME_FLOOR_CARD_COUNT,
): SourceFloorCell[] {
  const seen = new Set<string>();
  const out: SourceFloorCell[] = [];
  for (const cell of live) {
    const key = cellKey(cell);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(cell);
    if (out.length >= limit) return out;
  }
  SAMPLE_FLOOR_CELLS.forEach((sample, index) => {
    if (out.length >= limit) return;
    const key = cellKey(sample);
    if (seen.has(key)) return;
    seen.add(key);
    out.push({
      ...sample,
      sample: true,
      uploadedAt: new Date(Date.now() - (index + 1) * 3 * 60 * 60 * 1000).toISOString(),
    });
  });
  return out;
}

export function floorMachineLabel(cell: SourceFloorCell) {
  return [cell.year, cell.oem, cell.model].filter(Boolean).join(" ");
}

export function floorBandLabel(cell: SourceFloorCell) {
  if (cell.minMm && cell.maxMm) return `${cell.minMm}–${cell.maxMm} mm capacity`;
  if (cell.maxMm) return `up to ${cell.maxMm} mm capacity`;
  if (cell.minMm) return `from ${cell.minMm} mm`;
  return "";
}

export function floorPlaceLabel(cell: SourceFloorCell) {
  return [cell.city, cell.state].filter(Boolean).join(", ");
}

export function floorSentence(cell: SourceFloorCell) {
  const who = floorMachineLabel(cell) || "cell";
  const band = floorBandLabel(cell);
  const place = floorPlaceLabel(cell);
  return `A ${who} was uploaded${band ? ` ${band}` : ""}${place ? ` in ${place}` : ""}.`;
}

export function formatFloorUploadedAt(iso: string) {
  const at = new Date(iso).getTime();
  if (Number.isNaN(at)) return "";
  const ms = Date.now() - at;
  if (ms < 60 * 1000) return "just now";
  if (ms < 60 * 60 * 1000) {
    const n = Math.max(1, Math.floor(ms / (60 * 1000)));
    return `${n} min ago`;
  }
  if (ms < 24 * 60 * 60 * 1000) {
    const n = Math.max(1, Math.floor(ms / (60 * 60 * 1000)));
    return `${n}h ago`;
  }
  if (ms < 7 * 24 * 60 * 60 * 1000) {
    const n = Math.max(1, Math.floor(ms / (24 * 60 * 60 * 1000)));
    return `${n}d ago`;
  }
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}
