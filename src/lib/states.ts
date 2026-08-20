export type UsState = {
  slug: string;
  name: string;
  abbr: string;
};

/** 50 states + DC. URLs are `/{slug}` — e.g. /ohio */
export const US_STATES: UsState[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL" },
  { slug: "alaska", name: "Alaska", abbr: "AK" },
  { slug: "arizona", name: "Arizona", abbr: "AZ" },
  { slug: "arkansas", name: "Arkansas", abbr: "AR" },
  { slug: "california", name: "California", abbr: "CA" },
  { slug: "colorado", name: "Colorado", abbr: "CO" },
  { slug: "connecticut", name: "Connecticut", abbr: "CT" },
  { slug: "delaware", name: "Delaware", abbr: "DE" },
  { slug: "florida", name: "Florida", abbr: "FL" },
  { slug: "georgia", name: "Georgia", abbr: "GA" },
  { slug: "hawaii", name: "Hawaii", abbr: "HI" },
  { slug: "idaho", name: "Idaho", abbr: "ID" },
  { slug: "illinois", name: "Illinois", abbr: "IL" },
  { slug: "indiana", name: "Indiana", abbr: "IN" },
  { slug: "iowa", name: "Iowa", abbr: "IA" },
  { slug: "kansas", name: "Kansas", abbr: "KS" },
  { slug: "kentucky", name: "Kentucky", abbr: "KY" },
  { slug: "louisiana", name: "Louisiana", abbr: "LA" },
  { slug: "maine", name: "Maine", abbr: "ME" },
  { slug: "maryland", name: "Maryland", abbr: "MD" },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA" },
  { slug: "michigan", name: "Michigan", abbr: "MI" },
  { slug: "minnesota", name: "Minnesota", abbr: "MN" },
  { slug: "mississippi", name: "Mississippi", abbr: "MS" },
  { slug: "missouri", name: "Missouri", abbr: "MO" },
  { slug: "montana", name: "Montana", abbr: "MT" },
  { slug: "nebraska", name: "Nebraska", abbr: "NE" },
  { slug: "nevada", name: "Nevada", abbr: "NV" },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH" },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ" },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM" },
  { slug: "new-york", name: "New York", abbr: "NY" },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC" },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND" },
  { slug: "ohio", name: "Ohio", abbr: "OH" },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK" },
  { slug: "oregon", name: "Oregon", abbr: "OR" },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA" },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI" },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC" },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD" },
  { slug: "tennessee", name: "Tennessee", abbr: "TN" },
  { slug: "texas", name: "Texas", abbr: "TX" },
  { slug: "utah", name: "Utah", abbr: "UT" },
  { slug: "vermont", name: "Vermont", abbr: "VT" },
  { slug: "virginia", name: "Virginia", abbr: "VA" },
  { slug: "washington", name: "Washington", abbr: "WA" },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV" },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI" },
  { slug: "wyoming", name: "Wyoming", abbr: "WY" },
  { slug: "washington-dc", name: "Washington, D.C.", abbr: "DC" },
];

const bySlug = new Map(US_STATES.map((state) => [state.slug, state]));
const byAbbr = new Map(US_STATES.map((state) => [state.abbr, state]));

export function getState(slug: string) {
  return bySlug.get(slug);
}

export function getStateByAbbr(abbr: string) {
  return byAbbr.get(abbr.toUpperCase());
}

export function statePath(state: UsState) {
  return `/${state.slug}`;
}

/** First-3 ZIP prefixes → state abbr. Good enough to route a buyer to their state page. */
const ZIP3_RANGES: [number, number, string][] = [
  [5, 5, "NY"],
  [10, 27, "MA"],
  [28, 29, "RI"],
  [30, 38, "NH"],
  [39, 49, "ME"],
  [50, 54, "VT"],
  [55, 55, "MA"],
  [56, 59, "VT"],
  [60, 69, "CT"],
  [70, 89, "NJ"],
  [100, 149, "NY"],
  [150, 196, "PA"],
  [197, 199, "DE"],
  [200, 200, "DC"],
  [201, 201, "VA"],
  [202, 205, "DC"],
  [206, 219, "MD"],
  [220, 246, "VA"],
  [247, 268, "WV"],
  [270, 289, "NC"],
  [290, 299, "SC"],
  [300, 319, "GA"],
  [320, 349, "FL"],
  [350, 369, "AL"],
  [370, 385, "TN"],
  [386, 397, "MS"],
  [398, 399, "GA"],
  [400, 427, "KY"],
  [430, 459, "OH"],
  [460, 479, "IN"],
  [480, 499, "MI"],
  [500, 528, "IA"],
  [530, 549, "WI"],
  [550, 567, "MN"],
  [570, 577, "SD"],
  [580, 588, "ND"],
  [590, 599, "MT"],
  [600, 629, "IL"],
  [630, 658, "MO"],
  [660, 679, "KS"],
  [680, 693, "NE"],
  [700, 714, "LA"],
  [716, 729, "AR"],
  [730, 732, "OK"],
  [733, 733, "TX"],
  [734, 741, "OK"],
  [743, 749, "OK"],
  [750, 799, "TX"],
  [800, 816, "CO"],
  [820, 831, "WY"],
  [832, 838, "ID"],
  [840, 847, "UT"],
  [850, 865, "AZ"],
  [870, 884, "NM"],
  [885, 885, "TX"],
  [889, 898, "NV"],
  [900, 961, "CA"],
  [967, 968, "HI"],
  [970, 979, "OR"],
  [980, 994, "WA"],
  [995, 999, "AK"],
];

export function stateFromZip(raw: string): UsState | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 5) return null;
  const zip3 = Number(digits.slice(0, 3));
  if (!Number.isFinite(zip3)) return null;
  for (const [start, end, abbr] of ZIP3_RANGES) {
    if (zip3 >= start && zip3 <= end) return getStateByAbbr(abbr) ?? null;
  }
  return null;
}
