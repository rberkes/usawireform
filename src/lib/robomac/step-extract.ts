import { bend, rot, straight } from "./geometry";
import {
  add,
  allPoints,
  axisPlacement,
  cross,
  dist,
  dot,
  len,
  normalize,
  numberArg,
  parseStepEntities,
  pointsBySurface,
  scale,
  stepLengthScale,
  sub,
  type Vec3,
} from "./step-parse";
import type { WireFormGeometry, WireSegment } from "./types";

export type ExtractMeta = {
  units: "mm" | "inch";
  scale: number;
  cylinderCount: number;
  torusCount: number;
  pointCount: number;
  method: "analytic-surfaces";
};

export type ExtractOk = {
  ok: true;
  geometry: WireFormGeometry;
  pointsMm: Vec3[];
  meta: ExtractMeta;
};

export type ExtractErr = { ok: false; message: string };

export type ExtractResult = ExtractOk | ExtractErr;

const COLINEAR = 0.995;

export function extractWireFormFromStep(
  text: string,
  materialId = "1018",
): ExtractResult {
  if (!/ISO-10303-21/i.test(text) || !/\bDATA\s*;/i.test(text)) {
    return { ok: false, message: "Not a STEP file. Use .step / .stp." };
  }
  const map = parseStepEntities(text);
  const scaleToMm = stepLengthScale(map, text);
  const pts = allPoints(map).map((p) => scale(p, scaleToMm));
  const facePts = pointsBySurface(map, scaleToMm);
  const cylinders: { origin: Vec3; axis: Vec3; radius: number; pts: Vec3[] }[] = [];
  const tori: {
    origin: Vec3;
    axis: Vec3;
    ref: Vec3;
    major: number;
    minor: number;
    pts: Vec3[];
  }[] = [];

  for (const entity of map.values()) {
    if (entity.type === "CYLINDRICAL_SURFACE") {
      const place = axisPlacement(map, entity.args[1]);
      const radius = numberArg(entity.args, 2);
      if (!place || !radius || radius <= 0) continue;
      cylinders.push({
        origin: scale(place.origin, scaleToMm),
        axis: place.axis,
        radius: radius * scaleToMm,
        pts: facePts.get(entity.id) ?? [],
      });
    }
    if (entity.type === "TOROIDAL_SURFACE") {
      const place = axisPlacement(map, entity.args[1]);
      const major = numberArg(entity.args, 2);
      const minor = numberArg(entity.args, 3);
      if (!place || !major || !minor || minor <= 0) continue;
      tori.push({
        origin: scale(place.origin, scaleToMm),
        axis: place.axis,
        ref: place.ref,
        major: major * scaleToMm,
        minor: minor * scaleToMm,
        pts: facePts.get(entity.id) ?? [],
      });
    }
  }

  const wireRadius = modalRadius([
    ...cylinders.map((row) => row.radius),
    ...tori.map((row) => row.minor),
  ]);
  if (!wireRadius) {
    return {
      ok: false,
      message:
        "No circular wire surfaces found. The STEP needs a round-wire solid (cylinders / tori), not a mesh or a sheet.",
    };
  }

  const diameterMm = round1(wireRadius * 2);
  const tubes = mergeColinear(
    cylinders.filter((row) => near(row.radius, wireRadius, 0.12)),
    wireRadius,
  );
  const bends = dedupTori(
    tori.filter((row) => near(row.minor, wireRadius, 0.12)),
    wireRadius,
  );
  const pieces = [
    ...tubes.map((row) =>
      cylinderPiece(row, row.pts.length ? row.pts : pts, wireRadius),
    ),
    ...bends.map((row) =>
      torusPiece(row, row.pts.length ? row.pts : pts, wireRadius),
    ),
  ].filter((row): row is CenterlinePiece => Boolean(row && row.points.length >= 2));

  if (pieces.length === 0) {
    return {
      ok: false,
      message: "Found wire-sized surfaces but could not recover a centerline.",
    };
  }

  const pointsMm = orderPieces(pieces, wireRadius);
  if (pointsMm.length < 2) {
    return { ok: false, message: "Centerline collapsed. Check the STEP is a single wire strand." };
  }

  const closed = dist(pointsMm[0], pointsMm[pointsMm.length - 1]) < wireRadius * 2;
  const segments = fitSegments(pointsMm, diameterMm);
  if (segments.length === 0) {
    return { ok: false, message: "Could not split the centerline into straights and bends." };
  }

  const bbox = boundingBox(pointsMm);
  return {
    ok: true,
    geometry: {
      diameterMm,
      materialId,
      closed,
      gapMm: closed ? 0 : undefined,
      bboxMm: bbox,
      segments,
    },
    pointsMm,
    meta: {
      units: scaleToMm === 25.4 ? "inch" : "mm",
      scale: scaleToMm,
      cylinderCount: tubes.length,
      torusCount: bends.length,
      pointCount: pts.length,
      method: "analytic-surfaces",
    },
  };
}

type CenterlinePiece = { points: Vec3[] };
type Cylinder = { origin: Vec3; axis: Vec3; radius: number; pts: Vec3[] };

function mergeColinear(tubes: Cylinder[], wireRadius: number) {
  const extents = tubes
    .map((tube) => {
      const piece = cylinderPiece(tube, tube.pts, wireRadius);
      if (!piece) return undefined;
      return { tube, a: piece.points[0], b: piece.points[1] };
    })
    .filter((row): row is { tube: Cylinder; a: Vec3; b: Vec3 } => Boolean(row));

  const used = new Set<number>();
  const merged: Cylinder[] = [];
  for (let i = 0; i < extents.length; i++) {
    if (used.has(i)) continue;
    const axis = extents[i].tube.axis;
    const origin = extents[i].tube.origin;
    let minT = dot(sub(extents[i].a, origin), axis);
    let maxT = dot(sub(extents[i].b, origin), axis);
    if (maxT < minT) [minT, maxT] = [maxT, minT];
    const cluster = [i];
    used.add(i);
    let grew = true;
    while (grew) {
      grew = false;
      for (let j = 0; j < extents.length; j++) {
        if (used.has(j)) continue;
        if (Math.abs(dot(normalize(axis), extents[j].tube.axis)) < COLINEAR) continue;
        const radial = len(cross(sub(extents[j].tube.origin, origin), axis));
        if (radial > wireRadius * 0.35) continue;
        const t0 = dot(sub(extents[j].a, origin), axis);
        const t1 = dot(sub(extents[j].b, origin), axis);
        const lo = Math.min(t0, t1);
        const hi = Math.max(t0, t1);
        if (lo > maxT + wireRadius * 2 || hi < minT - wireRadius * 2) continue;
        minT = Math.min(minT, lo);
        maxT = Math.max(maxT, hi);
        used.add(j);
        cluster.push(j);
        grew = true;
      }
    }
    merged.push({
      origin: add(origin, scale(axis, minT)),
      axis,
      radius: extents[i].tube.radius,
      pts: cluster.flatMap((index) => extents[index].tube.pts),
    });
  }
  return merged.length ? merged : tubes;
}

function dedupTori<T extends { origin: Vec3; major: number }>(tori: T[], wireRadius: number) {
  const kept: T[] = [];
  for (const torus of [...tori].sort((a, b) => b.major - a.major)) {
    if (kept.some((row) => dist(row.origin, torus.origin) < wireRadius * 2)) continue;
    kept.push(torus);
  }
  return kept;
}

function cylinderPiece(
  cyl: { origin: Vec3; axis: Vec3; radius: number },
  pts: Vec3[],
  wireRadius: number,
): CenterlinePiece | undefined {
  const ts: number[] = [];
  const slop = Math.max(0.35 * wireRadius, 0.4);
  for (const p of pts) {
    const rel = sub(p, cyl.origin);
    const t = dot(rel, cyl.axis);
    const radial = len(sub(rel, scale(cyl.axis, t)));
    if (Math.abs(radial - cyl.radius) <= slop || radial <= slop) ts.push(t);
  }
  if (ts.length < 2) return undefined;
  const minT = Math.min(...ts);
  const maxT = Math.max(...ts);
  if (maxT - minT < 0.2) return undefined;
  return {
    points: [
      add(cyl.origin, scale(cyl.axis, minT)),
      add(cyl.origin, scale(cyl.axis, maxT)),
    ],
  };
}

function torusPiece(
  torus: { origin: Vec3; axis: Vec3; ref: Vec3; major: number; minor: number },
  pts: Vec3[],
  wireRadius: number,
): CenterlinePiece | undefined {
  const z = normalize(torus.axis);
  let x = normalize(torus.ref);
  if (Math.abs(dot(x, z)) > 0.95) x = orthogonal(z);
  const y = normalize(cross(z, x));
  const angles: number[] = [];
  const slop = Math.max(0.35 * wireRadius, 0.4);
  for (const p of pts) {
    const rel = sub(p, torus.origin);
    const axial = dot(rel, z);
    const inPlane = sub(rel, scale(z, axial));
    const rho = len(inPlane);
    const tube = Math.hypot(rho - torus.major, axial);
    if (Math.abs(tube - torus.minor) > slop) continue;
    angles.push(Math.atan2(dot(inPlane, y), dot(inPlane, x)));
  }
  if (angles.length < 2) return undefined;
  const [from, to] = angleSpan(angles);
  const sweep = wrapPi(to - from);
  if (Math.abs(sweep) < 0.08) return undefined;
  return {
    points: sampleTorusArc(torus.origin, x, y, torus.major, from, from + sweep, 16),
  };
}

function sampleTorusArc(
  origin: Vec3,
  x: Vec3,
  y: Vec3,
  major: number,
  a0: number,
  a1: number,
  segs: number,
): Vec3[] {
  const pts: Vec3[] = [];
  for (let i = 0; i <= segs; i++) {
    const a = a0 + ((a1 - a0) * i) / segs;
    pts.push(
      add(origin, add(scale(x, major * Math.cos(a)), scale(y, major * Math.sin(a)))),
    );
  }
  return pts;
}

function angleSpan(angles: number[]): [number, number] {
  const sorted = [...angles].sort((a, b) => a - b);
  let gap = 0;
  let gapAt = 0;
  for (let i = 0; i < sorted.length - 1; i++) {
    const d = sorted[i + 1] - sorted[i];
    if (d > gap) {
      gap = d;
      gapAt = i;
    }
  }
  const wrap = sorted[0] + Math.PI * 2 - sorted[sorted.length - 1];
  if (wrap > gap) return [sorted[0], sorted[sorted.length - 1]];
  return [sorted[gapAt + 1], sorted[gapAt] + Math.PI * 2];
}

function wrapPi(a: number) {
  let x = a;
  while (x > Math.PI * 2) x -= Math.PI * 2;
  while (x < -Math.PI * 2) x += Math.PI * 2;
  if (x > Math.PI) x -= Math.PI * 2;
  if (x < -Math.PI) x += Math.PI * 2;
  return x;
}

function orderPieces(pieces: CenterlinePiece[], wireRadius: number): Vec3[] {
  const leftover = pieces.map((piece) => dedup(piece.points, 0.15));
  const chains: Vec3[][] = [];
  const joinLimit = Math.max(wireRadius * 6, 12);
  while (leftover.length) {
    const chain = leftover.shift();
    if (!chain) break;
    let grew = true;
    while (grew && leftover.length) {
      grew = false;
      const head = chain[0];
      const tail = chain[chain.length - 1];
      let best = -1;
      let bestDist = joinLimit;
      let reverse = false;
      let atFront = false;
      leftover.forEach((piece, index) => {
        const options = [
          { dist: dist(tail, piece[0]), reverse: false, atFront: false },
          { dist: dist(tail, piece[piece.length - 1]), reverse: true, atFront: false },
          { dist: dist(head, piece[0]), reverse: true, atFront: true },
          { dist: dist(head, piece[piece.length - 1]), reverse: false, atFront: true },
        ];
        for (const option of options) {
          if (option.dist < bestDist) {
            bestDist = option.dist;
            best = index;
            reverse = option.reverse;
            atFront = option.atFront;
          }
        }
      });
      if (best < 0) break;
      const next = leftover.splice(best, 1)[0];
      const ordered = reverse ? [...next].reverse() : next;
      if (atFront) chain.unshift(...ordered);
      else chain.push(...ordered);
      grew = true;
    }
    chains.push(dedup(chain, 0.25));
  }
  chains.sort((a, b) => polylineLength(b) - polylineLength(a));
  return chains[0] ?? [];
}

function fitSegments(points: Vec3[], diameterMm: number): WireSegment[] {
  const cleaned = dedup(points, Math.max(0.15, diameterMm * 0.02));
  if (cleaned.length < 2) return [];
  const turns = turnDegrees(cleaned);
  const parts = groupByTurn(cleaned, turns, 3);
  const segments: WireSegment[] = [];
  let bendIndex = 0;
  let prevPlane: Vec3 | undefined;
  for (const part of parts) {
    if (part.kind === "line") {
      const length = dist(part.pts[0], part.pts[part.pts.length - 1]);
      if (length < 0.3) continue;
      segments.push(
        straight(
          `S${segments.filter((row) => row.kind === "straight").length + 1}`,
          round1(length),
        ),
      );
      continue;
    }
    const fit = fitArc(part.pts, diameterMm);
    const sharp = part.pts.length <= 3;
    if (!fit || fit.angleDeg < 8) {
      const length = polylineLength(part.pts);
      if (length >= 0.3) {
        segments.push(
          straight(
            `S${segments.filter((row) => row.kind === "straight").length + 1}`,
            round1(length),
          ),
        );
      }
      continue;
    }
    if (prevPlane) {
      const twist = angleBetween(prevPlane, fit.normal);
      if (twist > 20) {
        segments.push(rot(`R${bendIndex + 1}`, round1(twist)));
      }
    }
    prevPlane = fit.normal;
    bendIndex += 1;
    const inside = sharp
      ? Math.max(fit.insideRadiusMm, diameterMm)
      : fit.insideRadiusMm;
    segments.push(bend(bendIndex, round1(fit.sign * fit.angleDeg), round2(inside)));
  }
  return mergeTiny(segments);
}

function headingChange(pts: Vec3[]) {
  if (pts.length < 3) return 0;
  const a = normalize(sub(pts[1], pts[0]));
  const b = normalize(sub(pts[pts.length - 1], pts[pts.length - 2]));
  return (Math.acos(Math.max(-1, Math.min(1, dot(a, b)))) * 180) / Math.PI;
}

function turnDegrees(points: Vec3[]) {
  const turns: number[] = [0];
  for (let i = 1; i < points.length - 1; i++) {
    const a = normalize(sub(points[i], points[i - 1]));
    const b = normalize(sub(points[i + 1], points[i]));
    turns.push((Math.acos(Math.max(-1, Math.min(1, dot(a, b)))) * 180) / Math.PI);
  }
  turns.push(0);
  return turns;
}

function groupByTurn(
  points: Vec3[],
  turns: number[],
  threshold: number,
): { kind: "line" | "arc"; pts: Vec3[] }[] {
  const parts: { kind: "line" | "arc"; pts: Vec3[] }[] = [];
  let start = 0;
  let arc = turns[1] >= threshold;
  for (let i = 1; i < points.length; i++) {
    const nowArc = i < turns.length - 1 ? turns[i] >= threshold : arc;
    if (nowArc !== arc || i === points.length - 1) {
      const end = i === points.length - 1 ? i : i;
      const slice = points.slice(start, end + 1);
      if (slice.length >= 2) {
        const heading = headingChange(slice);
        parts.push({
          kind: arc && slice.length >= 3 && heading >= 15 ? "arc" : "line",
          pts: slice,
        });
      }
      start = i - 1;
      arc = nowArc;
    }
  }
  return parts;
}

function fitArc(pts: Vec3[], diameterMm: number) {
  if (pts.length < 3) return undefined;
  const a = pts[0];
  const b = pts[Math.floor(pts.length / 2)];
  const c = pts[pts.length - 1];
  const ab = sub(b, a);
  const ac = sub(c, a);
  const n = normalize(cross(ab, ac));
  if (len(n) < 1e-8) return undefined;
  const center = lineIntersect(
    scale(add(a, b), 0.5),
    normalize(cross(n, ab)),
    scale(add(a, c), 0.5),
    normalize(cross(n, ac)),
  );
  if (!center) return undefined;
  const radius = dist(center, a);
  if (radius < 0.2) return undefined;
  const u = normalize(sub(a, center));
  const w = normalize(sub(c, center));
  const mid = normalize(sub(b, center));
  let angle = Math.acos(Math.max(-1, Math.min(1, dot(u, w))));
  const via =
    Math.acos(Math.max(-1, Math.min(1, dot(u, mid)))) +
    Math.acos(Math.max(-1, Math.min(1, dot(mid, w))));
  if (via > Math.PI) angle = Math.PI * 2 - angle;
  const sign = Math.sign(dot(cross(u, w), n)) || 1;
  return {
    angleDeg: (angle * 180) / Math.PI,
    insideRadiusMm: Math.max(radius - diameterMm / 2, 0.1),
    normal: n,
    sign,
    radius,
  };
}

function lineIntersect(p1: Vec3, d1: Vec3, p2: Vec3, d2: Vec3): Vec3 | undefined {
  const n = cross(d1, d2);
  if (len(n) < 1e-8) return undefined;
  const m = cross(sub(p2, p1), d2);
  const t = dot(m, n) / dot(n, n);
  return add(p1, scale(d1, t));
}

function mergeTiny(segments: WireSegment[]) {
  const out: WireSegment[] = [];
  for (const segment of segments) {
    const last = out[out.length - 1];
    if (
      segment.kind === "straight" &&
      last?.kind === "straight" &&
      segment.lengthMm < 2
    ) {
      last.lengthMm = round1(last.lengthMm + segment.lengthMm);
      continue;
    }
    out.push(segment);
  }
  return out;
}

function polylineLength(pts: Vec3[]) {
  let n = 0;
  for (let i = 1; i < pts.length; i++) n += dist(pts[i - 1], pts[i]);
  return n;
}

function boundingBox(pts: Vec3[]) {
  let minX = Infinity;
  let minY = Infinity;
  let minZ = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let maxZ = -Infinity;
  for (const [x, y, z] of pts) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    minZ = Math.min(minZ, z);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
    maxZ = Math.max(maxZ, z);
  }
  return {
    x: round1(maxX - minX),
    y: round1(maxY - minY),
    z: round1(maxZ - minZ),
  };
}

function modalRadius(values: number[]) {
  const usable = values.filter((n) => n > 0.2 && n < 40);
  if (!usable.length) return undefined;
  const buckets = new Map<number, { sum: number; n: number }>();
  for (const value of usable) {
    const key = Math.round(value * 4) / 4;
    const bucket = buckets.get(key) ?? { sum: 0, n: 0 };
    bucket.sum += value;
    bucket.n += 1;
    buckets.set(key, bucket);
  }
  let best: { sum: number; n: number } | undefined;
  for (const bucket of buckets.values()) {
    if (!best || bucket.n > best.n) best = bucket;
  }
  return best ? best.sum / best.n : undefined;
}

function near(a: number, b: number, rel: number) {
  return Math.abs(a - b) <= Math.max(b * rel, 0.15);
}

function orthogonal(n: Vec3): Vec3 {
  return Math.abs(n[0]) < 0.9 ? normalize(cross(n, [1, 0, 0])) : normalize(cross(n, [0, 1, 0]));
}

function angleBetween(a: Vec3, b: Vec3) {
  return (Math.acos(Math.max(-1, Math.min(1, Math.abs(dot(normalize(a), normalize(b)))))) * 180) / Math.PI;
}

function dedup(pts: Vec3[], eps: number) {
  const out: Vec3[] = [];
  for (const p of pts) {
    if (!out.length || dist(out[out.length - 1], p) >= eps) out.push(p);
  }
  return out;
}

function round1(n: number) {
  return Math.round(n * 10) / 10;
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}
