export type Vec2 = { x: number; y: number };

/**
 * Dual-V powder-coating hook: rack Λ on top, part V on the bottom,
 * both openings on the same side of a long shank. Each V is two equal
 * 45° arms (90° included). `legId` is the inside opening (tip to tip).
 * Catalog 12 in × 0.375 in hooks use ~1.5 in legs.
 *
 * Same-side, not 180° opposite — opposite Vs read as a Z.
 */
export function vExtents(legId: number) {
  const run = legId / 2;
  const rise = legId / 2;
  return {
    run,
    rise,
    minOverall: 2 * rise + 0.5,
  };
}

function vEnds(overall: number, legId: number, x0 = 0) {
  const { run, rise } = vExtents(legId);
  return {
    top: [
      { x: x0 + 2 * run, y: overall - rise },
      { x: x0 + run, y: overall },
      { x: x0, y: overall - rise },
    ] satisfies Vec2[],
    bottom: [
      { x: x0, y: rise },
      { x: x0 + run, y: 0 },
      { x: x0 + 2 * run, y: rise },
    ] satisfies Vec2[],
  };
}

/** Centerline. Origin at the bottom of the overall envelope. Y up. */
export function vHookPoints(overall: number, legId: number, jog = 0): Vec2[] {
  if (!jog) {
    const { top, bottom } = vEnds(overall, legId);
    return [...top, ...bottom];
  }
  const { top } = vEnds(overall, legId);
  const { bottom } = vEnds(overall, legId, jog);
  const mid = overall / 2;
  return [
    ...top,
    { x: 0, y: mid + 0.35 },
    { x: jog, y: mid + 0.35 },
    { x: jog, y: mid - 0.35 },
    ...bottom,
  ];
}
