/** Minimal ISO-10303-21 reader for wire-form surfaces. Not a full CAD kernel. */

export type StepId = number;
export type StepValue = string | number | boolean | null | StepRef | StepValue[];
export type StepRef = { ref: StepId };

export type StepEntity = {
  id: StepId;
  type: string;
  args: StepValue[];
};

export type Vec3 = [number, number, number];

export function isRef(value: StepValue): value is StepRef {
  return Boolean(value && typeof value === "object" && "ref" in value);
}

export function parseStepEntities(text: string): Map<StepId, StepEntity> {
  const start = text.search(/\bDATA\s*;/i);
  if (start < 0) throw new Error("STEP file has no DATA section.");
  const afterData = text.slice(start);
  const endRel = afterData.search(/\bENDSEC\s*;/i);
  const body = endRel < 0 ? afterData : afterData.slice(0, endRel);
  const map = new Map<StepId, StepEntity>();
  const re = /#(\d+)\s*=\s*/g;
  let match: RegExpExecArray | null;
  const starts: { id: number; head: number; at: number }[] = [];
  while ((match = re.exec(body))) {
    starts.push({
      id: Number(match[1]),
      head: match.index,
      at: match.index + match[0].length,
    });
  }
  for (let i = 0; i < starts.length; i++) {
    const from = starts[i].at;
    const to = i + 1 < starts.length ? starts[i + 1].head : body.length;
    const raw = body.slice(from, to).replace(/;[\s\S]*$/, "").trim();
    const typeMatch = raw.match(/^([A-Z][A-Z0-9_]*)\s*\(/i);
    if (!typeMatch) continue;
    const type = typeMatch[1].toUpperCase();
    const inside = raw.slice(typeMatch[0].length - 1);
    map.set(starts[i].id, {
      id: starts[i].id,
      type,
      args: parseArgList(inside),
    });
  }
  return map;
}

function parseArgList(source: string): StepValue[] {
  const trimmed = source.trim();
  if (!trimmed.startsWith("(")) return [];
  const [values] = readList(trimmed, 0);
  return values;
}

function readList(source: string, start: number): [StepValue[], number] {
  const out: StepValue[] = [];
  let i = start + 1;
  while (i < source.length) {
    const ch = source[i];
    if (ch === ")") return [out, i + 1];
    if (ch === "," || /\s/.test(ch)) {
      i += 1;
      continue;
    }
    const [value, next] = readValue(source, i);
    out.push(value);
    i = next;
  }
  return [out, i];
}

function readValue(source: string, start: number): [StepValue, number] {
  let i = start;
  while (i < source.length && /\s/.test(source[i])) i += 1;
  const ch = source[i];
  if (ch === "(") return readList(source, i);
  if (ch === "'") {
    i += 1;
    let text = "";
    while (i < source.length) {
      if (source[i] === "'") {
        if (source[i + 1] === "'") {
          text += "'";
          i += 2;
          continue;
        }
        return [text, i + 1];
      }
      text += source[i];
      i += 1;
    }
    return [text, i];
  }
  if (ch === "#") {
    const m = source.slice(i).match(/^#(\d+)/);
    if (!m) return [null, i + 1];
    return [{ ref: Number(m[1]) }, i + m[0].length];
  }
  if (ch === "." ) {
    const m = source.slice(i).match(/^\.([A-Z0-9_]+)\./i);
    if (!m) return [null, i + 1];
    const token = m[1].toUpperCase();
    if (token === "T") return [true, i + m[0].length];
    if (token === "F") return [false, i + m[0].length];
    return [token, i + m[0].length];
  }
  if (ch === "$" || ch === "*") return [null, i + 1];
  const m = source.slice(i).match(/^[+-]?(?:\d+\.\d*|\.\d+|\d+)(?:E[+-]?\d+)?/i);
  if (m) return [Number(m[0]), i + m[0].length];
  const word = source.slice(i).match(/^[A-Z][A-Z0-9_]*/i);
  if (word) return [word[0], i + word[0].length];
  return [null, i + 1];
}

export function entityOf(map: Map<StepId, StepEntity>, value: StepValue) {
  if (!isRef(value)) return undefined;
  return map.get(value.ref);
}

export function numberArg(args: StepValue[], index: number) {
  const value = args[index];
  return typeof value === "number" && Number.isFinite(value) ? value : undefined;
}

export function cartPoint(map: Map<StepId, StepEntity>, value: StepValue): Vec3 | undefined {
  const entity = entityOf(map, value);
  if (!entity || entity.type !== "CARTESIAN_POINT") return undefined;
  const coords = entity.args.find((arg) => Array.isArray(arg));
  if (!Array.isArray(coords) || coords.length < 3) return undefined;
  const x = coords[0];
  const y = coords[1];
  const z = coords[2];
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof z !== "number"
  ) {
    return undefined;
  }
  return [x, y, z];
}

export function direction(map: Map<StepId, StepEntity>, value: StepValue): Vec3 | undefined {
  const entity = entityOf(map, value);
  if (!entity || entity.type !== "DIRECTION") return undefined;
  const coords = entity.args.find((arg) => Array.isArray(arg));
  if (!Array.isArray(coords) || coords.length < 3) return undefined;
  const x = coords[0];
  const y = coords[1];
  const z = coords[2];
  if (
    typeof x !== "number" ||
    typeof y !== "number" ||
    typeof z !== "number"
  ) {
    return undefined;
  }
  return normalize([x, y, z]);
}

export function axisPlacement(
  map: Map<StepId, StepEntity>,
  value: StepValue,
): { origin: Vec3; axis: Vec3; ref: Vec3 } | undefined {
  const entity = entityOf(map, value);
  if (!entity || entity.type !== "AXIS2_PLACEMENT_3D") return undefined;
  const origin = cartPoint(map, entity.args[1]);
  const axis = direction(map, entity.args[2]);
  const ref = direction(map, entity.args[3]) ?? [1, 0, 0];
  if (!origin || !axis) return undefined;
  return { origin, axis, ref };
}

export function refsIn(value: StepValue): StepId[] {
  if (isRef(value)) return [value.ref];
  if (Array.isArray(value)) return value.flatMap(refsIn);
  return [];
}

/** Vertex coordinates hanging off a face / loop / edge. */
export function walkPoints(
  map: Map<StepId, StepEntity>,
  start: StepId,
  scaleToMm = 1,
): Vec3[] {
  const seen = new Set<StepId>();
  const pts: Vec3[] = [];
  const stack = [start];
  while (stack.length) {
    const id = stack.pop();
    if (id == null || seen.has(id)) continue;
    seen.add(id);
    const entity = map.get(id);
    if (!entity) continue;
    if (entity.type === "CARTESIAN_POINT") {
      const p = cartPoint(map, { ref: id });
      if (p) pts.push(scale(p, scaleToMm));
      continue;
    }
    for (const arg of entity.args) stack.push(...refsIn(arg));
  }
  return pts;
}

export function pointsBySurface(
  map: Map<StepId, StepEntity>,
  scaleToMm: number,
): Map<StepId, Vec3[]> {
  const out = new Map<StepId, Vec3[]>();
  for (const entity of map.values()) {
    if (entity.type !== "ADVANCED_FACE") continue;
    const surface = entity.args.find(isRef);
    if (!surface) continue;
    const pts = walkPoints(map, entity.id, scaleToMm);
    const prev = out.get(surface.ref) ?? [];
    out.set(surface.ref, prev.concat(pts));
  }
  return out;
}

export function allPoints(map: Map<StepId, StepEntity>): Vec3[] {
  const pts: Vec3[] = [];
  for (const entity of map.values()) {
    if (entity.type !== "CARTESIAN_POINT") continue;
    const coords = entity.args.find((arg) => Array.isArray(arg));
    if (!Array.isArray(coords) || coords.length < 3) continue;
    if (coords.some((n) => typeof n !== "number")) continue;
    const x = coords[0] as number;
    const y = coords[1] as number;
    const z = coords[2] as number;
    if (coords.length === 3) pts.push([x, y, z]);
  }
  return pts;
}

export function stepLengthScale(map: Map<StepId, StepEntity>, text: string) {
  if (/CONVERSION_BASED_UNIT\s*\(\s*'INCH'/i.test(text)) return 25.4;
  if (/\.MILLI\.\s*,\s*\.METRE\./i.test(text)) return 1;
  if (/\.METRE\./i.test(text) && !/\.MILLI\./i.test(text)) return 1000;
  const radii: number[] = [];
  for (const entity of map.values()) {
    if (entity.type === "CYLINDRICAL_SURFACE") {
      const r = numberArg(entity.args, 2);
      if (r && r > 0) radii.push(r);
    }
  }
  const median = radii.sort((a, b) => a - b)[Math.floor(radii.length / 2)];
  if (median && median < 2) return 25.4;
  return 1;
}

export function add(a: Vec3, b: Vec3): Vec3 {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

export function sub(a: Vec3, b: Vec3): Vec3 {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

export function scale(a: Vec3, s: number): Vec3 {
  return [a[0] * s, a[1] * s, a[2] * s];
}

export function dot(a: Vec3, b: Vec3) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

export function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

export function len(a: Vec3) {
  return Math.hypot(a[0], a[1], a[2]);
}

export function normalize(a: Vec3): Vec3 {
  const n = len(a);
  if (n < 1e-12) return [0, 0, 1];
  return scale(a, 1 / n);
}

export function dist(a: Vec3, b: Vec3) {
  return len(sub(a, b));
}
