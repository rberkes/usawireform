/**
 * Robomac 214TF digital twin — table-shaped records.
 *
 * These types are the schema. Rows live in tables.ts. A later Postgres /
 * Supabase migration can persist the same shapes; do not hard-code limits
 * in the DFM engine.
 */

export type ProvenanceKind =
  | "published_catalog"
  | "shop_practice"
  | "shop_measured"
  | "production_observed"
  | "estimated"
  | "unknown";

export type Provenance = {
  kind: ProvenanceKind;
  source: string;
  asOf: string;
  notes?: string;
};

export type Confidence = "high" | "medium" | "low" | "none";

export type DfmStatus = "PASS" | "FAIL" | "REVIEW";

export type DfmCheckKind =
  | "wire_diameter"
  | "material_compatibility"
  | "min_bend_radius"
  | "min_straight"
  | "tool_availability"
  | "tool_clearance"
  | "bend_head_collision"
  | "formed_leg_collision"
  | "feed_interference"
  | "rotation_constraint"
  | "cutoff_clearance"
  | "sequence_feasibility"
  | "machine_envelope"
  | "springback"
  | "closed_form"
  | "secondary_operations"
  | "bend_head";

export type DfmPhase = 1 | 2 | 3 | 4 | 5;

export type MachineRow = {
  id: string;
  oem: string;
  model: string;
  series: string;
  plateName: string;
  cellKind: "3D CNC";
  location: string;
  feedFrom: "coil" | "precut" | "coil_or_precut";
  headCount: number;
  tensileRatingNmm2: number;
  orbitHead: boolean;
  notes: string;
  provenance: Provenance;
};

export type MachineCapabilityRow = {
  id: string;
  machineId: string;
  key: string;
  label: string;
  unit: string;
  min?: number;
  max?: number;
  value?: number | string | boolean;
  tensileNmm2?: number;
  phase: DfmPhase;
  confidence: Confidence;
  provenance: Provenance;
};

export type BendHeadKind = "wipe" | "push";

export type MachineHeadRow = {
  id: string;
  machineId: string;
  kind: BendHeadKind;
  label: string;
  angleMinDeg?: number;
  angleMaxDeg?: number;
  pinDiameterMm?: number;
  pinDiameterIn?: number;
  /** Centerline ring radius. Only filled where the floor stated a number. */
  minRingRadiusMm?: number;
  minRingRadiusIn?: number;
  /** Shop said “30 in diameter rings.” Stored as centerline diameter. */
  maxRingDiameterMm?: number;
  maxRingDiameterIn?: number;
  maxRingRadiusMm?: number;
  maxRingRadiusIn?: number;
  minRingRadiusWireMm?: number;
  minRingRadiusWireIn?: number;
  notes: string;
  provenance: Provenance;
};

export type BendHeadAssignment = {
  bend: number;
  segmentId: string;
  head: BendHeadKind;
  angleDeg: number;
  insideRadiusMm: number;
  centerlineRadiusMm: number;
  note: string;
};

export type ToolingUse = "general" | "staple_crown";

export type MachineToolingRow = {
  id: string;
  machineId: string;
  label: string;
  wireDiameterMm: number;
  wireDiameterIn: number;
  stock: boolean;
  use: ToolingUse;
  pinDiameterMm?: number;
  pinDiameterIn?: number;
  insideRadiusMm?: number;
  insideRadiusIn?: number;
  newLeadDays?: { min: number; max: number };
  newCostUsd?: number;
  notes: string;
  provenance: Provenance;
};

export type MachineRuleRow = {
  id: string;
  machineId: string;
  check: DfmCheckKind;
  severity: "fail" | "review" | "info";
  title: string;
  expression: string;
  phase: DfmPhase;
  implemented: boolean;
  confidence: Confidence;
  provenance: Provenance;
};

export type MaterialFamilyRow = {
  id: string;
  label: string;
  alloys: string[];
  coilOk: boolean;
  /** This floor regularly runs this alloy on the 214TF. */
  shopRun?: boolean;
  minInsideRadiusXd: number;
  springbackDegAt1xD: { min: number; max: number };
  notes: string;
  provenance: Provenance;
};

export type MaterialPriceRow = {
  id: string;
  machineId: string;
  materialId: string;
  shopRun: boolean;
  /** Published Ask card only — not in the shop piece formula. */
  cutUsd?: number;
  bendUsd?: number;
  inchUsd?: number;
  /** Coil / stock dollars. Empty until the desk files it. */
  materialUsdPerLb?: number;
  notes: string;
  provenance: Provenance;
};

export type MaterialPriceQuote = {
  materialId: string;
  shopRun: boolean;
  formingFiled: boolean;
  materialFiled: boolean;
  /** Inch rate is filed. Material $/lb is a separate later input. */
  filed: boolean;
  /** Published Ask card only — not in the shop piece formula. */
  cutUsd?: number;
  bendUsd?: number;
  inchUsd?: number;
  materialUsdPerLb?: number;
  note: string;
};

export type RobomacPieceQuote = {
  materialId: string;
  formula: string;
  lengthIn: number;
  weightLb?: number;
  inchUsd?: number;
  materialUsdPerLb?: number;
  materialMarkupRate: number;
  formingUsd?: number;
  materialCostUsd?: number;
  materialMarkupUsd?: number;
  materialUsd?: number;
  pieceUsd?: number;
  formingFiled: boolean;
  materialFiled: boolean;
  materialPending: boolean;
  note: string;
};

export type CollisionScenarioRow = {
  id: string;
  machineId: string;
  title: string;
  check: DfmCheckKind;
  phase: DfmPhase;
  implemented: boolean;
  notes: string;
  provenance: Provenance;
};

export type ProductionObservationRow = {
  id: string;
  machineId: string;
  kind: "cycle_s" | "setup_min" | "scrap_pct" | "springback_deg";
  quoted?: number;
  actual?: number;
  materialId?: string;
  diameterMm?: number;
  toolId?: string;
  notes: string;
  provenance: Provenance;
};

export type WireSegment =
  | { kind: "straight"; id: string; lengthMm: number }
  | {
      kind: "bend";
      id: string;
      index: number;
      angleDeg: number;
      insideRadiusMm: number;
    }
  | { kind: "rotation"; id: string; angleDeg: number };

export type WireFormGeometry = {
  diameterMm: number;
  materialId: string;
  developedLengthMm?: number;
  closed?: boolean;
  gapMm?: number;
  secondaries?: string[];
  bboxMm?: { x: number; y: number; z: number };
  segments: WireSegment[];
};

export type DfmIssue = {
  id: string;
  check: DfmCheckKind;
  status: DfmStatus;
  bend?: number;
  segmentId?: string;
  failure?: string;
  availableMm?: number;
  requiredMm?: number;
  recommendedChangeMm?: number;
  recommendedChange?: string;
  problem: string;
  cause: string;
  customerExplanation: string;
};

export type DfmResult = {
  machineId: string;
  status: DfmStatus;
  developedLengthMm: number;
  bendCount: number;
  rotationCount: number;
  issues: DfmIssue[];
  checks: DfmIssue[];
  tooling: { stock: boolean; toolId?: string; note: string };
  springback?: {
    materialId: string;
    estimateDeg: { min: number; max: number };
    note: string;
  };
  pendingPhase2: DfmCheckKind[];
  heads: BendHeadAssignment[];
  price: MaterialPriceQuote;
};

export type TwinTables = {
  machines: MachineRow[];
  machine_heads: MachineHeadRow[];
  machine_capabilities: MachineCapabilityRow[];
  machine_tooling: MachineToolingRow[];
  machine_rules: MachineRuleRow[];
  materials: MaterialFamilyRow[];
  material_prices: MaterialPriceRow[];
  collision_scenarios: CollisionScenarioRow[];
  actual_cycle_times: ProductionObservationRow[];
  actual_setup_times: ProductionObservationRow[];
  scrap_results: ProductionObservationRow[];
};
