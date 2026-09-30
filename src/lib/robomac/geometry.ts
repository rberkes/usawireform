import type { WireFormGeometry, WireSegment } from "./types";

export function isBend(
  segment: WireSegment,
): segment is Extract<WireSegment, { kind: "bend" }> {
  return segment.kind === "bend";
}

export function isStraight(
  segment: WireSegment,
): segment is Extract<WireSegment, { kind: "straight" }> {
  return segment.kind === "straight";
}

export function isRotation(
  segment: WireSegment,
): segment is Extract<WireSegment, { kind: "rotation" }> {
  return segment.kind === "rotation";
}

export function bendsOf(geometry: WireFormGeometry) {
  return geometry.segments.filter(isBend);
}

export function straightsOf(geometry: WireFormGeometry) {
  return geometry.segments.filter(isStraight);
}

/** Centerline radius = inside radius + wire radius. */
export function centerlineRadiusMm(insideRadiusMm: number, diameterMm: number) {
  return insideRadiusMm + diameterMm / 2;
}

export function bendArcLengthMm(
  angleDeg: number,
  insideRadiusMm: number,
  diameterMm: number,
) {
  const r = centerlineRadiusMm(insideRadiusMm, diameterMm);
  return (Math.abs(angleDeg) / 360) * 2 * Math.PI * r;
}

export function computeDevelopedLengthMm(geometry: WireFormGeometry) {
  let mm = 0;
  for (const segment of geometry.segments) {
    if (segment.kind === "straight") mm += segment.lengthMm;
    else if (segment.kind === "bend") {
      mm += bendArcLengthMm(
        segment.angleDeg,
        segment.insideRadiusMm,
        geometry.diameterMm,
      );
    }
  }
  return Math.round(mm * 10) / 10;
}

export function developedLengthMm(geometry: WireFormGeometry) {
  return geometry.developedLengthMm ?? computeDevelopedLengthMm(geometry);
}

/** Straight immediately before a bend (rotations skipped). */
export function straightBeforeBend(
  geometry: WireFormGeometry,
  bendIndex: number,
) {
  const bendId = geometry.segments.find(
    (segment) => segment.kind === "bend" && segment.index === bendIndex,
  )?.id;
  if (!bendId) return undefined;
  const at = geometry.segments.findIndex((segment) => segment.id === bendId);
  for (let i = at - 1; i >= 0; i--) {
    const segment = geometry.segments[i];
    if (segment.kind === "straight") return segment;
    if (segment.kind === "bend") return undefined;
  }
  return undefined;
}

export function firstAndLastLegs(geometry: WireFormGeometry) {
  const first = geometry.segments.find(isStraight);
  const last = [...geometry.segments].reverse().find(isStraight);
  return { first, last };
}

/** Dump the brief-style S1 / B1 / ROT sequence. */
export function formatSequence(geometry: WireFormGeometry) {
  const lines = [
    `Wire diameter: ${geometry.diameterMm.toFixed(2)} mm`,
    `Developed length: ${developedLengthMm(geometry).toFixed(1)} mm`,
    "",
  ];
  let straights = 0;
  for (const segment of geometry.segments) {
    if (segment.kind === "straight") {
      straights += 1;
      lines.push(
        `S${straights}   straight  ${segment.lengthMm.toFixed(1)} mm`,
      );
    } else if (segment.kind === "bend") {
      lines.push(
        `B${segment.index}   ${segment.angleDeg}°       R${segment.insideRadiusMm}`,
      );
    } else {
      lines.push(`ROT  ${segment.angleDeg}°`);
    }
  }
  return lines.join("\n");
}

export function straight(
  id: string,
  lengthMm: number,
): Extract<WireSegment, { kind: "straight" }> {
  return { kind: "straight", id, lengthMm };
}

export function bend(
  index: number,
  angleDeg: number,
  insideRadiusMm: number,
): Extract<WireSegment, { kind: "bend" }> {
  return {
    kind: "bend",
    id: `B${index}`,
    index,
    angleDeg,
    insideRadiusMm,
  };
}

export function rot(
  id: string,
  angleDeg: number,
): Extract<WireSegment, { kind: "rotation" }> {
  return { kind: "rotation", id, angleDeg };
}
