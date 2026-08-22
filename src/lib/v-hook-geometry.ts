export type Vec2 = { x: number; y: number };

/** 45° V-arms — powder-coating V-hook crotches are sharp, not radiused. */
const ARM_K = Math.SQRT1_2;

export function vExtents(legId: number) {
  const tip = Math.min(Math.max(legId * 0.2, 0.35), 1);
  return {
    run: legId * ARM_K,
    rise: legId * ARM_K,
    tip,
    tipRun: tip * ARM_K,
    tipRise: tip * ARM_K,
    minOverall: 2 * legId * ARM_K + 0.35,
  };
}

/** Dual-V centerline. Origin at the bottom of the overall envelope. Y up. */
export function vHookPoints(overall: number, legId: number, jog = 0): Vec2[] {
  const { run, rise, tipRun, tipRise } = vExtents(legId);
  const topJoin = overall - rise;
  const top: Vec2[] = [
    { x: run + tipRun, y: overall - tipRise },
    { x: run, y: overall },
    { x: 0, y: topJoin },
  ];
  const bottom: Vec2[] = [
    { x: jog, y: rise },
    { x: jog - run, y: 0 },
    { x: jog - run - tipRun, y: tipRise },
  ];
  if (!jog) return [...top, ...bottom];
  return [...top, { x: jog, y: topJoin }, ...bottom];
}
