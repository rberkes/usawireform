export type MaterialRow = {
  grade: string;
  notes: string;
  uns?: string;
};

export const lowCarbon: MaterialRow[] = [
  { grade: "1010", notes: "Stock cold-roll forming wire. Soft, welds clean, 1× diameter inside radius on mild coil." },
  { grade: "1018", notes: "Stock cold-roll. Slightly stronger than 1010. Default carbon for frames, trays, and grids." },
  { grade: "1006 / 1008", notes: "Softer drawing grades. Used when the form is severe or the coating is picky." },
  { grade: "1008 / 1010 galvanized", notes: "Pre-coated coil. Expect mark in the straightener and burn-back at every weld." },
];

export const carbonAndSpring: MaterialRow[] = [
  { grade: "1030–1045", notes: "Medium carbon. More springback than 1018. Stress-relieve after a tight 3D path if the print cares." },
  { grade: "1050–1060 HD", notes: "Hard-drawn medium-high carbon. Industrial springs and clips at the light end of the band." },
  { grade: "1070–1095", notes: "High-carbon spring. Large radius, real tensile. Confirm the head at 3/8–1/2 in." },
  { grade: "A229 oil-tempered", notes: "MB spring wire, oil tempered. Common industrial spring coil; not a 1018 substitute." },
  { grade: "A228 music wire", notes: "Very high tensile. Usual diameters are well under 4 mm. We explain it; we do not pretend it is 1/2 in frame wire." },
  { grade: "6150 / 5160 / CrSi", notes: "Alloy spring. Chrome-silicon and 6150 show up on heavy springs and torsion parts. Radius and bake after plate matter." },
];

export const stainless300: MaterialRow[] = [
  { grade: "301", uns: "S30100", notes: "Work-hardens fast. Springier than 304. Watch min radius and tool galling." },
  { grade: "302", uns: "S30200", notes: "Classic stainless forming wire. A bit more carbon than 304, more snap. Common clip and form grade." },
  { grade: "304 / 304L", uns: "S30400 / S30403", notes: "General 300-series coil. Food, architectural, outdoor grids. 304L when weld carbide precipitation is a spec." },
  { grade: "305", uns: "S30500", notes: "Lower work-hardening. Used when a severe cold form would crack 304." },
  { grade: "316 / 316L", uns: "S31600 / S31603", notes: "Molybdenum, better chloride resistance. More expensive, more springback than 304. Marine and chemical." },
  { grade: "317 / 317L", uns: "S31700 / S31703", notes: "Higher Mo than 316. Spec-driven, not a default coil." },
  { grade: "309 / 310", uns: "S30900 / S31000", notes: "Higher Cr/Ni, heat and oxidation. Furnace-adjacent; still not 330." },
  { grade: "321 / 347", uns: "S32100 / S34700", notes: "Ti- or Nb-stabilized. Welded high-temp service when 304L is not the spec." },
  { grade: "330 (N08330)", uns: "N08330", notes: "Stock high-temp coil for heat-treat wire baskets and furnace fixtures. Ni-Cr, not “stainless 304 with a bigger number.”" },
  { grade: "201 / 202", uns: "S20100 / S20200", notes: "Mn austenitics. Sometimes substituted for 304. Call the real grade; do not accept “equiv.”" },
];

export const copperAlloys: MaterialRow[] = [
  { grade: "C110 ETP copper", notes: "Soft, marks, excellent conductivity. Tight radii possible. Keep tools clean." },
  { grade: "C102 OFHC", notes: "Oxygen-free. Electrical and vacuum-adjacent when C110 is not allowed." },
  { grade: "C260 / C270 brass", notes: "Cartridge / yellow brass. Common formed brass wire. Annealed coil forms; hard coil springs back." },
  { grade: "C230 red brass", notes: "Higher copper, redder color, a bit softer than C260." },
  { grade: "C510 phosphor bronze", notes: "Electrical spring. Different modulus than steel; do not copy a 1018 radius." },
];