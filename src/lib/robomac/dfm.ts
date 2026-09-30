import { COMMON_SIZES, WIRE } from "@/lib/range";
import { TOOLING } from "@/lib/price";
import {
  bendsOf,
  centerlineRadiusMm,
  developedLengthMm,
  firstAndLastLegs,
  isBend,
  isStraight,
  straightBeforeBend,
} from "./geometry";
import {
  CAPABILITIES,
  formingRatesFor,
  HEADS,
  MATERIALS,
  PUSH_RING_MAX_DIAMETER_MM,
  PUSH_RING_MIN_RADIUS_MM,
  PUSH_RING_WIRE_MM,
  ROBOMAC_214TF,
  ROBOMAC_MACHINE_ID,
  TOOLING_ROWS,
  WIPE_ANGLE_MIN_DEG,
} from "./tables";
import type {
  BendHeadAssignment,
  DfmCheckKind,
  DfmIssue,
  DfmResult,
  DfmStatus,
  MaterialFamilyRow,
  WireFormGeometry,
  WireSegment,
} from "./types";

const PHASE2_PENDING: DfmCheckKind[] = [
  "tool_clearance",
  "bend_head_collision",
  "formed_leg_collision",
  "feed_interference",
];

function capability(key: string) {
  return CAPABILITIES.find((row) => row.key === key);
}

function materialOf(id: string): MaterialFamilyRow | undefined {
  const want = id.trim().toLowerCase();
  return MATERIALS.find(
    (row) =>
      row.id === id ||
      row.alloys.some((alloy) => alloy.toLowerCase() === want),
  );
}

function stockToolFor(diameterMm: number) {
  return TOOLING_ROWS.find(
    (row) =>
      row.stock &&
      row.use === "general" &&
      row.wireDiameterMm > 0 &&
      Math.abs(row.wireDiameterMm - diameterMm) < 0.15,
  );
}

function issue(
  partial: Omit<DfmIssue, "id"> & { id?: string },
): DfmIssue {
  return {
    id:
      partial.id ??
      [partial.check, partial.bend ?? "part", partial.status.toLowerCase()].join(
        "-",
      ),
    ...partial,
  };
}

function rollup(checks: DfmIssue[]): DfmStatus {
  if (checks.some((row) => row.status === "FAIL")) return "FAIL";
  if (checks.some((row) => row.status === "REVIEW")) return "REVIEW";
  return "PASS";
}

function diameterCheck(geometry: WireFormGeometry): DfmIssue {
  const d = geometry.diameterMm;
  const inBand = d >= WIRE.minMm && d <= WIRE.maxMm;
  if (inBand) {
    return issue({
      check: "wire_diameter",
      status: "PASS",
      availableMm: d,
      requiredMm: WIRE.minMm,
      problem: "Wire diameter is in the Robomac 214TF band.",
      cause: `${WIRE.minMm}–${WIRE.maxMm} mm at 600 N/mm².`,
      customerExplanation: `${d} mm is inside the ${WIRE.short} production band on this cell.`,
    });
  }
  const side = d < WIRE.minMm ? "below" : "above";
  return issue({
    check: "wire_diameter",
    status: "FAIL",
    failure: "diameter_out_of_band",
    availableMm: d,
    requiredMm: d < WIRE.minMm ? WIRE.minMm : WIRE.maxMm,
    problem: `Wire diameter is ${side} the 214TF band.`,
    cause: `Plate and shop band are ${WIRE.short}.`,
    customerExplanation:
      d < WIRE.minMm
        ? `${d} mm is under ${WIRE.minMm} mm. This cell does not run that wire. A lighter CNC or a spring cell is the right match — not a fake quote from the 214TF.`
        : `${d} mm is over ${WIRE.maxMm} mm. The 214TF plate stops at 14 mm at 600 N/mm².`,
    recommendedChange:
      d < WIRE.minMm
        ? `Increase diameter to at least ${WIRE.minMm} mm, or source a different cell.`
        : `Reduce diameter to at most ${WIRE.maxMm} mm, or source a heavier cell.`,
  });
}

function materialCheck(geometry: WireFormGeometry): DfmIssue {
  const family = materialOf(geometry.materialId);
  if (family?.coilOk) {
    return issue({
      check: "material_compatibility",
      status: "PASS",
      problem: "Named coil family.",
      cause: family.label,
      customerExplanation: family.shopRun
        ? `${family.label} is a shop-run coil on this 214TF.`
        : `${family.label} on coil is in. We form it on the 214TF.`,
    });
  }
  return issue({
    check: "material_compatibility",
    status: "FAIL",
    failure: "unknown_material",
    problem: "Material is not a named coil family.",
    cause: `Got "${geometry.materialId}".`,
    customerExplanation:
      "Name the alloy (1018, 304, 316, 330, 6061-T6, brass, copper, or a listed spring grade). “Spring steel or equivalent” is not a print.",
    recommendedChange: "Call out a coil alloy and temper.",
  });
}

function radiusChecks(
  geometry: WireFormGeometry,
  family: MaterialFamilyRow | undefined,
): DfmIssue[] {
  const required = (family?.minInsideRadiusXd ?? 1) * geometry.diameterMm;
  return bendsOf(geometry).map((segment) => {
    const available = segment.insideRadiusMm;
    if (available + 1e-6 >= required) {
      return issue({
        check: "min_bend_radius",
        status: "PASS",
        bend: segment.index,
        segmentId: segment.id,
        availableMm: available,
        requiredMm: required,
        problem: `Bend ${segment.index} inside radius meets ${family?.id ?? "default"} ×D.`,
        cause: `Required ${required.toFixed(2)} mm (${family?.minInsideRadiusXd ?? 1}×D).`,
        customerExplanation: `Bend ${segment.index} at R${available} mm is at or above the ${family?.label ?? "carbon"} floor.`,
      });
    }
    const delta = Math.round((required - available) * 10) / 10;
    return issue({
      check: "min_bend_radius",
      status: "FAIL",
      failure: "inside_radius_too_tight",
      bend: segment.index,
      segmentId: segment.id,
      availableMm: available,
      requiredMm: required,
      recommendedChangeMm: delta,
      recommendedChange: `Increase bend ${segment.index} inside radius by ${delta} mm (to ${required.toFixed(2)} mm).`,
      problem: `Bend ${segment.index} inside radius is below the material floor.`,
      cause: `Available ${available} mm. Required ${required.toFixed(2)} mm (${family?.minInsideRadiusXd ?? 1}×D).`,
      customerExplanation: `Bend ${segment.index} is too tight for ${family?.label ?? "this alloy"}. Increase the inside radius to about ${required.toFixed(1)} mm (${family?.minInsideRadiusXd ?? 1}× the ${geometry.diameterMm} mm wire), or pick a softer alloy. A sharper corner than the wire will take is a flatten, a weldment, or a different process.`,
    });
  });
}

function straightChecks(geometry: WireFormGeometry): DfmIssue[] {
  const failAt = 2 * geometry.diameterMm;
  const passAt = 3 * geometry.diameterMm;
  const out: DfmIssue[] = [];
  for (const segment of bendsOf(geometry)) {
    const before = straightBeforeBend(geometry, segment.index);
    if (!before) continue;
    const available = before.lengthMm;
    const required = passAt;
    if (available + 1e-6 >= passAt) {
      out.push(
        issue({
          check: "min_straight",
          status: "PASS",
          bend: segment.index,
          segmentId: before.id,
          availableMm: available,
          requiredMm: required,
          problem: `Straight before bend ${segment.index} is ≥ 3×D.`,
          cause: `${available} mm vs ${passAt.toFixed(1)} mm.`,
          customerExplanation: `The straight into bend ${segment.index} has enough grip length.`,
        }),
      );
      continue;
    }
    const delta = Math.round((passAt - available) * 10) / 10;
    const fail = available < failAt;
    out.push(
      issue({
        check: "min_straight",
        status: fail ? "FAIL" : "REVIEW",
        failure: fail ? "straight_below_2xd" : "straight_below_3xd",
        bend: segment.index,
        segmentId: before.id,
        availableMm: available,
        requiredMm: required,
        recommendedChangeMm: delta,
        recommendedChange: `Increase the straight before bend ${segment.index} by ${delta} mm.`,
        problem: fail
          ? `Straight before bend ${segment.index} is under 2× diameter.`
          : `Straight before bend ${segment.index} is under 3× diameter.`,
        cause: `Available ${available} mm. 2×D = ${failAt.toFixed(1)} mm. 3×D = ${passAt.toFixed(1)} mm.`,
        customerExplanation: fail
          ? `Bend ${segment.index} is starved. The 214TF needs about ${passAt.toFixed(0)} mm of straight before that bend to wrap without a special tool. Lengthen that section by about ${delta} mm.`
          : `Bend ${segment.index} is tight. Programs get slow or ugly between 2× and 3× diameter. Lengthen the straight by about ${delta} mm, or plan on a desk review.`,
      }),
    );
  }
  return out;
}

function toolCheck(geometry: WireFormGeometry): DfmIssue {
  const stock = stockToolFor(geometry.diameterMm);
  if (stock) {
    return issue({
      check: "tool_availability",
      status: "PASS",
      problem: "Stock pin for this diameter.",
      cause: stock.label,
      customerExplanation: `${geometry.diameterMm} mm matches stock tooling (${TOOLING.stock}).`,
    });
  }
  const stockList = COMMON_SIZES.map((row) => row.fraction).join(", ");
  return issue({
    check: "tool_availability",
    status: "REVIEW",
    failure: "non_stock_diameter",
    problem: "Diameter is in band but not a stock pin.",
    cause: `Stock is ${stockList}. New tooling ${TOOLING.newLead}, ${TOOLING.newCostLabel}.`,
    customerExplanation: `${geometry.diameterMm} mm runs on this cell, but it is not ${TOOLING.stock}. Expect new tooling in ${TOOLING.newLead} for ${TOOLING.newCostLabel}.`,
    recommendedChange: `Stay on ${stockList} to skip a tooling line, or accept the pin charge.`,
  });
}

function cutoffCheck(geometry: WireFormGeometry): DfmIssue {
  const min = (capability("min_end_leg_xd")?.min ?? 2) * geometry.diameterMm;
  const { first, last } = firstAndLastLegs(geometry);
  const short = [first, last].filter(
    (leg): leg is NonNullable<typeof first> =>
      leg != null && leg.lengthMm < min,
  );
  if (short.length === 0) {
    return issue({
      check: "cutoff_clearance",
      status: "PASS",
      requiredMm: min,
      problem: "End legs clear the cutoff tripwire.",
      cause: `≥ ${min.toFixed(1)} mm (2×D, estimated).`,
      customerExplanation: "First and last legs are long enough for an in-line cutoff on this estimate.",
    });
  }
  const worst = short.reduce((a, b) => (a.lengthMm < b.lengthMm ? a : b));
  const delta = Math.round((min - worst.lengthMm) * 10) / 10;
  return issue({
    check: "cutoff_clearance",
    status: "REVIEW",
    failure: "short_end_leg",
    segmentId: worst.id,
    availableMm: worst.lengthMm,
    requiredMm: min,
    recommendedChangeMm: delta,
    recommendedChange: `Lengthen end leg ${worst.id} by ${delta} mm.`,
    problem: "An end leg is shorter than the estimated cutoff clearance.",
    cause: `Available ${worst.lengthMm} mm. Tripwire ${min.toFixed(1)} mm. Cutoff tool is not measured.`,
    customerExplanation: `The cutoff needs room. ${worst.id} is ${worst.lengthMm} mm; we want about ${min.toFixed(0)} mm until the shear is measured. Lengthen it by about ${delta} mm or plan a separate cut.`,
  });
}

function closedCheck(geometry: WireFormGeometry): DfmIssue[] {
  if (!geometry.closed) {
    return [
      issue({
        check: "closed_form",
        status: "PASS",
        problem: "Open centerline.",
        cause: "Not a closed loop.",
        customerExplanation: "The path does not close on itself.",
      }),
    ];
  }
  const gap = geometry.gapMm ?? 0;
  if (gap >= geometry.diameterMm) {
    return [
      issue({
        check: "closed_form",
        status: "PASS",
        availableMm: gap,
        requiredMm: geometry.diameterMm,
        problem: "Closed form with a designed gap.",
        cause: `Gap ${gap} mm.`,
        customerExplanation: `A ${gap} mm gap should strip off the mandrel.`,
      }),
    ];
  }
  return [
    issue({
      check: "closed_form",
      status: "REVIEW",
      failure: "closed_centerline",
      availableMm: gap,
      requiredMm: geometry.diameterMm,
      recommendedChange: "Add a gap ≥ one diameter, or weld after forming.",
      problem: "Closed centerline can lock on the mandrel.",
      cause: "No designed gap (or gap smaller than the wire).",
      customerExplanation:
        "A closed rectangle or ring can trap on CNC tooling. Leave a gap, add a weld as a secondary, or accept a two-piece assembly.",
    }),
    issue({
      check: "secondary_operations",
      status: "REVIEW",
      failure: "weld_or_gap_required",
      problem: "Closed form needs a strip plan or a weld.",
      cause: "No gap on the print.",
      customerExplanation:
        "If the loop must be closed, that is a weld after form — not a drop-off from the 214TF.",
      recommendedChange: "Call out weld type, or leave a gap.",
    }),
  ];
}

function envelopeCheck(geometry: WireFormGeometry): DfmIssue {
  const length = developedLengthMm(geometry);
  const failAt = capability("developed_fail_mm")?.max ?? 6000;
  const reviewAt = capability("developed_review_mm")?.max ?? 2000;
  if (length > failAt) {
    return issue({
      check: "machine_envelope",
      status: "FAIL",
      failure: "developed_too_long",
      availableMm: length,
      requiredMm: failAt,
      problem: "Developed length exceeds the conservative hard stop.",
      cause: `${length} mm > ${failAt} mm. Decoiler / fence not measured.`,
      customerExplanation: `${length} mm developed is past the ${failAt} mm tripwire on this twin. Walk the cell before quoting.`,
    });
  }
  if (length > reviewAt) {
    return issue({
      check: "machine_envelope",
      status: "REVIEW",
      failure: "developed_review",
      availableMm: length,
      requiredMm: reviewAt,
      problem: "Developed length needs a workspace look.",
      cause: `${length} mm > ${reviewAt} mm estimated review line.`,
      customerExplanation: `${length} mm developed can run from coil, but the fence and payoff need a desk look.`,
    });
  }
  return issue({
    check: "machine_envelope",
    status: "PASS",
    availableMm: length,
    requiredMm: reviewAt,
    problem: "Developed length under the review tripwire.",
    cause: `${length} mm ≤ ${reviewAt} mm.`,
    customerExplanation: `${length} mm developed is inside the conservative workspace estimate.`,
  });
}

function isHalfInch(diameterMm: number) {
  return Math.abs(diameterMm - PUSH_RING_WIRE_MM) < 0.15;
}

const WIPE_ANGLE_MAX_FOR_PASS = 180;

/** Wipe = pin / angle head. Push = rings and large-radius sweeps. */
export function assignBendHead(
  geometry: WireFormGeometry,
  segment: Extract<WireSegment, { kind: "bend" }>,
): BendHeadAssignment {
  const angleDeg = Math.abs(segment.angleDeg);
  const cl = centerlineRadiusMm(segment.insideRadiusMm, geometry.diameterMm);
  const pushMin = HEADS.find((row) => row.kind === "push")?.minRingRadiusMm
    ?? PUSH_RING_MIN_RADIUS_MM;
  const sweep = angleDeg >= 180 && cl >= 6 * geometry.diameterMm;
  const ring =
    cl >= pushMin - 0.5 ||
    angleDeg >= 300 ||
    sweep ||
    Boolean(geometry.closed && angleDeg >= 180);
  if (ring) {
    return {
      bend: segment.index,
      segmentId: segment.id,
      head: "push",
      angleDeg: segment.angleDeg,
      insideRadiusMm: segment.insideRadiusMm,
      centerlineRadiusMm: Math.round(cl * 10) / 10,
      note: "Push head — ring / large radius",
    };
  }
  return {
    bend: segment.index,
    segmentId: segment.id,
    head: "wipe",
    angleDeg: segment.angleDeg,
    insideRadiusMm: segment.insideRadiusMm,
    centerlineRadiusMm: Math.round(cl * 10) / 10,
    note: "Wipe / pin head — regular angle bend",
  };
}

function headChecks(geometry: WireFormGeometry): DfmIssue[] {
  const push = HEADS.find((row) => row.kind === "push");
  const minCl = push?.minRingRadiusMm ?? PUSH_RING_MIN_RADIUS_MM;
  const maxDia = push?.maxRingDiameterMm ?? PUSH_RING_MAX_DIAMETER_MM;
  return bendsOf(geometry).map((segment) => {
    const assigned = assignBendHead(geometry, segment);
    const wrap = Math.abs(segment.angleDeg);
    const clDia = Math.round(assigned.centerlineRadiusMm * 2 * 10) / 10;
    if (assigned.head === "push") {
      if (isHalfInch(geometry.diameterMm) && assigned.centerlineRadiusMm < minCl) {
        const delta = Math.round((minCl - assigned.centerlineRadiusMm) * 10) / 10;
        return issue({
          check: "bend_head",
          status: "FAIL",
          failure: "push_ring_too_tight",
          bend: segment.index,
          segmentId: segment.id,
          availableMm: assigned.centerlineRadiusMm,
          requiredMm: minCl,
          recommendedChangeMm: delta,
          recommendedChange: `Open the ring to at least 6 in centerline (R${minCl} mm) or form it on a different process.`,
          problem: `Bend ${segment.index} is a push-head ring tighter than 6 in on 1/2 in.`,
          cause: `Centerline R ${assigned.centerlineRadiusMm} mm < ${minCl} mm (6 in) on ${geometry.diameterMm} mm.`,
          customerExplanation: `The push head on this Robomac needs a 6 in minimum ring radius in 1/2 in wire. Bend ${segment.index} is about ${(assigned.centerlineRadiusMm / 25.4).toFixed(2)} in centerline. Open it to 6 in or talk to the desk — that size does not push-bend here.`,
        });
      }
      if (isHalfInch(geometry.diameterMm) && clDia > maxDia) {
        const delta = Math.round((clDia - maxDia) * 10) / 10;
        return issue({
          check: "bend_head",
          status: "FAIL",
          failure: "push_ring_too_large",
          bend: segment.index,
          segmentId: segment.id,
          availableMm: clDia,
          requiredMm: maxDia,
          recommendedChangeMm: delta,
          recommendedChange: `Bring the ring down to 30 in centerline diameter (${maxDia} mm) or less.`,
          problem: `Bend ${segment.index} is a push-head ring larger than 30 in on 1/2 in.`,
          cause: `Centerline Ø ${clDia} mm > ${maxDia} mm (30 in) on ${geometry.diameterMm} mm.`,
          customerExplanation: `The push head on this Robomac maxes out at a 30 in ring in 1/2 in wire. Bend ${segment.index} is about ${(clDia / 25.4).toFixed(1)} in centerline. That is past what this cell push-bends.`,
        });
      }
      if (!isHalfInch(geometry.diameterMm)) {
        return issue({
          check: "bend_head",
          status: "REVIEW",
          failure: "push_ring_unmeasured",
          bend: segment.index,
          segmentId: segment.id,
          availableMm: assigned.centerlineRadiusMm,
          requiredMm: minCl,
          problem: `Bend ${segment.index} looks like a push-head ring. Min radius is only stated for 1/2 in.`,
          cause: `${geometry.diameterMm} mm wire. 6 in floor is for 12.7 mm only.`,
          customerExplanation: `This looks like a push-head ring. We have a 6 in minimum on 1/2 in. ${geometry.diameterMm} mm is not on that card — the desk has to say if it pushes.`,
        });
      }
      return issue({
        check: "bend_head",
        status: "PASS",
        bend: segment.index,
        segmentId: segment.id,
        availableMm: assigned.centerlineRadiusMm,
        requiredMm: minCl,
        problem: `Bend ${segment.index} is on the push head.`,
        cause: `Centerline R ${assigned.centerlineRadiusMm} mm ≥ ${minCl} mm and Ø ${clDia} mm ≤ ${maxDia} mm on 1/2 in.`,
        customerExplanation: `Bend ${segment.index} is a push-head ring in the 6 in radius to 30 in diameter window on 1/2 in.`,
      });
    }
    if (wrap > 0 && wrap < WIPE_ANGLE_MIN_DEG) {
      return issue({
        check: "bend_head",
        status: "REVIEW",
        failure: "wipe_angle_shallow",
        bend: segment.index,
        segmentId: segment.id,
        availableMm: wrap,
        requiredMm: WIPE_ANGLE_MIN_DEG,
        problem: `Bend ${segment.index} is a shallow wipe-head corner.`,
        cause: `${wrap}° < ${WIPE_ANGLE_MIN_DEG}° typical wipe range.`,
        customerExplanation: `The wipe head on this Robomac is for regular corners, about 20–180°. Bend ${segment.index} is ${wrap}°. That can run, but it is a desk look — shallow kinks mark and spring differently.`,
      });
    }
    return issue({
      check: "bend_head",
      status: "PASS",
      bend: segment.index,
      segmentId: segment.id,
      availableMm: wrap,
      requiredMm: WIPE_ANGLE_MAX_FOR_PASS,
      problem: `Bend ${segment.index} is on the wipe / pin head.`,
      cause: `${wrap}° on the regular angle-bend head.`,
      customerExplanation:
        wrap <= 180
          ? `Bend ${segment.index} at ${wrap}° is a regular wipe-head corner.`
          : `Bend ${segment.index} at ${wrap}° is a wrap on the wipe head (eyes / S-hooks), not a push ring.`,
    });
  });
}

function wrapChecks(geometry: WireFormGeometry): DfmIssue[] {
  const reviewAt = capability("max_bend_angle_deg")?.max ?? 270;
  return bendsOf(geometry).map((segment) => {
    const assigned = assignBendHead(geometry, segment);
    const wrap = Math.abs(segment.angleDeg);
    if (assigned.head === "push") {
      if (wrap > 360) {
        return issue({
          check: "rotation_constraint",
          status: "FAIL",
          failure: "wrap_over_360",
          bend: segment.index,
          segmentId: segment.id,
          availableMm: wrap,
          requiredMm: 360,
          problem: `Bend ${segment.index} wraps more than a full turn.`,
          cause: `${wrap}°.`,
          customerExplanation: `Bend ${segment.index} is ${wrap}°. That is a coil, not a ring on the push head.`,
        });
      }
      return issue({
        check: "rotation_constraint",
        status: "PASS",
        bend: segment.index,
        segmentId: segment.id,
        availableMm: wrap,
        requiredMm: 360,
        problem: `Bend ${segment.index} is a push-head ring, not a wipe-head wrap.`,
        cause: `${wrap}° on the push head. The 270° eye ceiling does not apply.`,
        customerExplanation: `Bend ${segment.index} at ${wrap}° is formed on the push head. Eye-wrap limits are for the wipe head.`,
      });
    }
    if (wrap > 360) {
      return issue({
        check: "rotation_constraint",
        status: "FAIL",
        failure: "wrap_over_360",
        bend: segment.index,
        segmentId: segment.id,
        availableMm: wrap,
        requiredMm: 360,
        problem: `Bend ${segment.index} wraps more than a full turn.`,
        cause: `${wrap}°.`,
        customerExplanation: `Bend ${segment.index} is ${wrap}°. That is a coil, not a wrap on this head.`,
      });
    }
    if (wrap > reviewAt) {
      return issue({
        check: "rotation_constraint",
        status: "REVIEW",
        failure: "wrap_over_270",
        bend: segment.index,
        segmentId: segment.id,
        availableMm: wrap,
        requiredMm: reviewAt,
        problem: `Bend ${segment.index} wrap is above the shop eye ceiling.`,
        cause: `${wrap}° > ${reviewAt}°. Shop eyes run ~240°.`,
        customerExplanation: `Bend ${segment.index} is a ${wrap}° wrap. This floor forms ~240° eyes. Above ${reviewAt}° needs a desk look.`,
      });
    }
    return issue({
      check: "rotation_constraint",
      status: "PASS",
      bend: segment.index,
      segmentId: segment.id,
      availableMm: wrap,
      requiredMm: reviewAt,
      problem: `Bend ${segment.index} wrap is within the eye ceiling.`,
      cause: `${wrap}° ≤ ${reviewAt}°.`,
      customerExplanation: `Bend ${segment.index} at ${wrap}° is a wrap this cell already runs.`,
    });
  });
}

function sequenceCheck(geometry: WireFormGeometry): DfmIssue[] {
  const passAt = 3 * geometry.diameterMm;
  const out: DfmIssue[] = [];
  const segs = geometry.segments;
  for (let i = 0; i < segs.length; i++) {
    const current = segs[i];
    if (!isBend(current)) continue;
    let nextBend = undefined;
    let straightMm = 0;
    for (let j = i + 1; j < segs.length; j++) {
      const next = segs[j];
      if (isStraight(next)) straightMm += next.lengthMm;
      if (isBend(next)) {
        nextBend = next;
        break;
      }
    }
    if (!nextBend || !isBend(nextBend)) continue;
    const reversal = current.angleDeg * nextBend.angleDeg < 0;
    if (!reversal || straightMm >= passAt) continue;
    const delta = Math.round((passAt - straightMm) * 10) / 10;
    out.push(
      issue({
        check: "sequence_feasibility",
        status: "REVIEW",
        failure: "reversing_short_straight",
        bend: nextBend.index,
        availableMm: straightMm,
        requiredMm: passAt,
        recommendedChangeMm: delta,
        recommendedChange: `Increase the straight between bends ${current.index} and ${nextBend.index} by ${delta} mm.`,
        problem: `Reversing bends ${current.index} and ${nextBend.index} on a short straight.`,
        cause: `Opposite-sign wraps with ${straightMm} mm between them.`,
        customerExplanation: `Bends ${current.index} and ${nextBend.index} reverse direction with only ${straightMm} mm between them. That is where 3D programs get ugly. Lengthen that straight by about ${delta} mm.`,
      }),
    );
  }
  if (out.length === 0) {
    out.push(
      issue({
        check: "sequence_feasibility",
        status: "PASS",
        problem: "No starved reversing pair.",
        cause: "Opposite-sign bends have ≥ 3×D, or there is no reversal.",
        customerExplanation: "The bend sequence does not show a tight reversing zigzag.",
      }),
    );
  }
  return out;
}

function springbackInfo(
  geometry: WireFormGeometry,
  family: MaterialFamilyRow | undefined,
): DfmIssue {
  if (!family) {
    return issue({
      check: "springback",
      status: "REVIEW",
      failure: "no_alloy_for_springback",
      problem: "No alloy, so no overbend.",
      cause: "Springback is empirical per alloy, diameter, and pin.",
      customerExplanation:
        "Name the alloy. Compensation lives in the program, but the print has to name the coil.",
    });
  }
  return issue({
    check: "springback",
    status: "PASS",
    problem: "Starting overbend table only.",
    cause: `${family.springbackDegAt1xD.min}–${family.springbackDegAt1xD.max}° at 1×D. Not a measured job table.`,
    customerExplanation: `${family.label} will spring back. The CNC overbends. These ${family.springbackDegAt1xD.min}–${family.springbackDegAt1xD.max}° figures are a starting guess — replace them from first article.`,
  });
}

/**
 * Deterministic Phase 1 DFM. Geometry and machine tables are truth.
 * AI must not decide manufacturability — it may only explain this result.
 */
export function evaluateWireForm(
  geometry: WireFormGeometry,
  machineId = ROBOMAC_MACHINE_ID,
): DfmResult {
  if (machineId !== ROBOMAC_MACHINE_ID) {
    throw new Error(`Unknown machine ${machineId}`);
  }
  const family = materialOf(geometry.materialId);
  const checks: DfmIssue[] = [
    diameterCheck(geometry),
    materialCheck(geometry),
    ...radiusChecks(geometry, family),
    ...straightChecks(geometry),
    toolCheck(geometry),
    cutoffCheck(geometry),
    ...closedCheck(geometry),
    envelopeCheck(geometry),
    ...wrapChecks(geometry),
    ...headChecks(geometry),
    ...sequenceCheck(geometry),
    springbackInfo(geometry, family),
  ];
  const heads = bendsOf(geometry).map((segment) =>
    assignBendHead(geometry, segment),
  );

  const stock = stockToolFor(geometry.diameterMm);
  const status = rollup(checks);
  return {
    machineId: ROBOMAC_214TF.id,
    status,
    developedLengthMm: developedLengthMm(geometry),
    bendCount: bendsOf(geometry).length,
    rotationCount: geometry.segments.filter((row) => row.kind === "rotation")
      .length,
    issues: checks.filter((row) => row.status !== "PASS"),
    checks,
    tooling: stock
      ? { stock: true, toolId: stock.id, note: stock.label }
      : {
          stock: false,
          toolId: "tool-new-size",
          note: `New tooling — ${TOOLING.newLead}, ${TOOLING.newCostLabel}`,
        },
    springback: family
      ? {
          materialId: family.id,
          estimateDeg: family.springbackDegAt1xD,
          note: "Starting table. Not production-observed.",
        }
      : undefined,
    pendingPhase2: PHASE2_PENDING,
    heads,
    price: formingRatesFor(geometry.materialId),
  };
}
