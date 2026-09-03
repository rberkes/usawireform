export type UsState = {
  slug: string;
  name: string;
  abbr: string;
  /** Industrial metros we name on the state page. */
  metros: string;
  /** Typical 4–14 mm work that ships into this state. */
  work: string;
  /** Honest freight note from Northeast Ohio. */
  freight: string;
};

/** 50 states + DC. URLs are `/{slug}` — e.g. /ohio */
export const US_STATES: UsState[] = [
  {
    slug: "alabama",
    name: "Alabama",
    abbr: "AL",
    metros: "Birmingham, Huntsville, Tuscaloosa, Montgomery, Mobile",
    work: "Auto OEM and supplier frames, plant guards, and 304 washdown baskets for chemical and food plants. Heavy 7/16 and 1/2 in when the line takes a hit.",
    freight: "LTL and truckload south from Ohio through Kentucky. Named on the quote — not folded into the piece price.",
  },
  {
    slug: "alaska",
    name: "Alaska",
    abbr: "AK",
    metros: "Anchorage, Fairbanks, Juneau",
    work: "Outdoor galvanized and 304/316 forms: hangers, guards, and frames that sit in wet cold. Diameter stays in 4–14 mm.",
    freight: "Ocean or air after the Lower 48 truck. Lead time is the lane, not the CNC. Call it out on the PO.",
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbr: "AZ",
    metros: "Phoenix, Tucson, Mesa, Chandler",
    work: "Semiconductor and data-center trays, solar tracker hardware, and plant guards. 304 for wet process; carbon zinc for the yard.",
    freight: "Transcon from Ohio. Skid freight on 4–14 mm is real — the quote names weight and class.",
  },
  {
    slug: "arkansas",
    name: "Arkansas",
    abbr: "AR",
    metros: "Northwest Arkansas, Little Rock, Fort Smith, Jonesboro",
    work: "OEM contract forms, food-plant washdown baskets, and trailer / material-handling hardware in stock 3/8 to 1/2 in.",
    freight: "Direct LTL west of the Mississippi. Same cell as every other state — Northeast Ohio.",
  },
  {
    slug: "california",
    name: "California",
    abbr: "CA",
    metros: "Los Angeles, Inland Empire, Bay Area, San Diego, Central Valley",
    work: "Aerospace and food 304/316, ag harvest baskets, data-center trays, and architectural screens in 4–14 mm — not 9-gauge closet wire.",
    freight: "Transcon truck from Ohio. A skid of 1/2 in forms is a freight line, not a parcel. Named on the quote.",
  },
  {
    slug: "colorado",
    name: "Colorado",
    abbr: "CO",
    metros: "Denver, Colorado Springs, Fort Collins, Pueblo",
    work: "Mining and industrial guards, outdoor galv, and 304 for brewery / food washdown. Stock diameters on rims.",
    freight: "Mountain LTL from the Midwest. Weight and class on the quote.",
  },
  {
    slug: "connecticut",
    name: "Connecticut",
    abbr: "CT",
    metros: "Hartford, Bridgeport, New Haven, Stamford",
    work: "Aerospace and OEM frames, 300-series fixtures, and plant hardware in 4–14 mm. Short hop from Ohio vs a coast mill.",
    freight: "Northeast LTL. Overnight and two-day lanes are normal on a skid when the print is released.",
  },
  {
    slug: "delaware",
    name: "Delaware",
    abbr: "DE",
    metros: "Wilmington, Dover, Newark",
    work: "Chemical and food 304/316 baskets, plant guards, and OEM forms. Same cell as Pennsylvania and Maryland jobs.",
    freight: "Mid-Atlantic LTL from Ohio. Named freight, 100-piece production minimum.",
  },
  {
    slug: "florida",
    name: "Florida",
    abbr: "FL",
    metros: "Tampa, Orlando, Jacksonville, Miami, Panhandle",
    work: "Marine 316, ag harvest baskets, construction hangers, and outdoor galv. Furnace 330 is still Ohio production, then south.",
    freight: "Southbound LTL/TL. Humidity and salt belong on the alloy line, not on a carbon quote.",
  },
  {
    slug: "georgia",
    name: "Georgia",
    abbr: "GA",
    metros: "Atlanta, Savannah, Augusta, Columbus, Macon",
    work: "Auto and OEM frames, data-center trays, food 304 baskets, and construction hardware in 3/8 to 1/2 in.",
    freight: "Southeast LTL from Ohio. Atlanta is a hub — the skid still starts in Northeast Ohio.",
  },
  {
    slug: "hawaii",
    name: "Hawaii",
    abbr: "HI",
    metros: "Honolulu, Maui, Hilo",
    work: "316 marine and outdoor 304 frames, baskets, and guards. Diameter still 4–14 mm from coil.",
    freight: "Ocean after the mainland truck. Pack and corrosion spec matter more than the bend.",
  },
  {
    slug: "idaho",
    name: "Idaho",
    abbr: "ID",
    metros: "Boise, Idaho Falls, Coeur d’Alene, Twin Falls",
    work: "Ag, food processing, and outdoor galv. Heavy rims when the span is a deck or a guard.",
    freight: "Westbound LTL. Same Ohio cell — no satellite in the Snake River valley.",
  },
  {
    slug: "illinois",
    name: "Illinois",
    abbr: "IL",
    metros: "Chicago, Rockford, Peoria, Quad Cities, Metro East",
    work: "OEM and plant-floor guards, food 304, trailer hardware, and mesh decks. Chicago is a buyer, not a second plant.",
    freight: "Same-day to two-day LTL from Ohio on a released skid. Short Midwest hop.",
  },
  {
    slug: "indiana",
    name: "Indiana",
    abbr: "IN",
    metros: "Indianapolis, Fort Wayne, Elkhart, Evansville, South Bend",
    work: "Auto, RV, and trailer frames, plant guards, and 3/8–1/2 in hardware. Neighboring state, same coil corridor.",
    freight: "Next-day LTL is routine. We are still quoting from Northeast Ohio, not a Fort Wayne cell.",
  },
  {
    slug: "iowa",
    name: "Iowa",
    abbr: "IA",
    metros: "Des Moines, Cedar Rapids, Quad Cities, Waterloo, Sioux City",
    work: "Ag equipment guards, harvest baskets, OEM frames, and outdoor galv in stock diameters.",
    freight: "West Midwest LTL. Weight on 1/2 in is the freight driver.",
  },
  {
    slug: "kansas",
    name: "Kansas",
    abbr: "KS",
    metros: "Wichita, Kansas City metro, Topeka, Salina",
    work: "Aerospace (Wichita) fixtures, ag, and plant hardware. 330 heat-treat baskets ship the same as carbon — from Ohio.",
    freight: "Plains LTL. Named on the quote with class and weight.",
  },
  {
    slug: "kentucky",
    name: "Kentucky",
    abbr: "KY",
    metros: "Louisville, Lexington, Bowling Green, Northern Kentucky",
    work: "Auto OEM and supplier forms, food-plant 304, and plant guards. One state south of the cell.",
    freight: "Short-haul LTL. Often the cheapest lane we run besides in-state Ohio.",
  },
  {
    slug: "louisiana",
    name: "Louisiana",
    abbr: "LA",
    metros: "Baton Rouge, New Orleans, Lafayette, Shreveport, Lake Charles",
    work: "Petrochem and marine 316, plant guards, and washdown baskets. Alloy on the print — not “stainless.”",
    freight: "Gulf LTL/TL from Ohio. Corrosion spec lives on the material line.",
  },
  {
    slug: "maine",
    name: "Maine",
    abbr: "ME",
    metros: "Portland, Lewiston, Bangor, Augusta",
    work: "Marine 316, mill and plant guards, outdoor galv. 4–14 mm from coil, not lobster-trap wire.",
    freight: "Northeast LTL plus the extra day north of Boston. Named freight.",
  },
  {
    slug: "maryland",
    name: "Maryland",
    abbr: "MD",
    metros: "Baltimore, DC suburbs, Frederick, Hagerstown",
    work: "Federal / OEM frames, food 304, plant guards, and data-center trays.",
    freight: "Mid-Atlantic LTL from Ohio. Same lane family as Virginia and Delaware.",
  },
  {
    slug: "massachusetts",
    name: "Massachusetts",
    abbr: "MA",
    metros: "Boston, Worcester, Springfield, Lowell",
    work: "OEM, life-science washdown 304/316, and plant hardware in 4–14 mm.",
    freight: "Northeast LTL. Two-day is typical on a released skid.",
  },
  {
    slug: "michigan",
    name: "Michigan",
    abbr: "MI",
    metros: "Detroit, Grand Rapids, Flint, Kalamazoo, Saginaw",
    work: "Auto seat frames, plant guards, trailer latches, and OEM hardware in 3/8, 7/16, and 1/2 in — not music-wire clips.",
    freight: "Short Midwest hop. We form in Ohio; we do not pretend to be a Detroit stamping house.",
  },
  {
    slug: "minnesota",
    name: "Minnesota",
    abbr: "MN",
    metros: "Minneapolis–St. Paul, Duluth, Rochester, St. Cloud",
    work: "Medical and food 304, OEM frames, outdoor ag. Stock coil on production diameters.",
    freight: "Upper Midwest LTL. Winter does not change the CNC — it can change the dock.",
  },
  {
    slug: "mississippi",
    name: "Mississippi",
    abbr: "MS",
    metros: "Jackson, Gulfport, Tupelo, Hattiesburg, Columbus",
    work: "Auto supplier forms, shipyard and plant 316, furniture OEM frames in 4–14 mm.",
    freight: "Southbound LTL through Alabama or Tennessee. Named on the quote.",
  },
  {
    slug: "missouri",
    name: "Missouri",
    abbr: "MO",
    metros: "St. Louis, Kansas City, Springfield, Columbia, Joplin",
    work: "OEM, food, auto supplier, and plant-floor grids. Same Midwest coil story as Illinois.",
    freight: "Central LTL. St. Louis and KC are one- to two-day on a released skid.",
  },
  {
    slug: "montana",
    name: "Montana",
    abbr: "MT",
    metros: "Billings, Missoula, Great Falls, Bozeman",
    work: "Mining guards, ag, outdoor galv. Heavy 7/16 and 1/2 in when the span is structural.",
    freight: "Long LTL west. Freight can outrun the form — we still name both.",
  },
  {
    slug: "nebraska",
    name: "Nebraska",
    abbr: "NE",
    metros: "Omaha, Lincoln, Grand Island, Kearney",
    work: "Ag equipment, food processing baskets, and OEM frames in stock diameters.",
    freight: "Plains LTL from Ohio. Weight of 1/2 in coil parts is the line item.",
  },
  {
    slug: "nevada",
    name: "Nevada",
    abbr: "NV",
    metros: "Las Vegas, Reno, Sparks, Henderson",
    work: "Data-center trays, mining, warehouse mesh, outdoor galv. 304 when the spec is wet.",
    freight: "Transcon from Ohio. No Vegas cell — one skid from Northeast Ohio.",
  },
  {
    slug: "new-hampshire",
    name: "New Hampshire",
    abbr: "NH",
    metros: "Manchester, Nashua, Concord, Portsmouth",
    work: "OEM and plant hardware, 304 washdown, outdoor galv. 4–14 mm from coil.",
    freight: "Northeast LTL. Often rides the same lane as Massachusetts jobs.",
  },
  {
    slug: "new-jersey",
    name: "New Jersey",
    abbr: "NJ",
    metros: "Newark, Jersey City, Trenton, Camden, Central Jersey",
    work: "Pharma and food 304/316, port and plant guards, OEM frames. Not a 9-gauge display shop.",
    freight: "Northeast / Mid-Atlantic LTL. Dense docks — pack for a busy receiving door.",
  },
  {
    slug: "new-mexico",
    name: "New Mexico",
    abbr: "NM",
    metros: "Albuquerque, Las Cruces, Santa Fe, Farmington",
    work: "Labs, energy, and outdoor galv. 304/316 when the print is wet or chemical.",
    freight: "Southwest LTL from Ohio. Long lane, named freight.",
  },
  {
    slug: "new-york",
    name: "New York",
    abbr: "NY",
    metros: "New York City metro, Buffalo, Rochester, Syracuse, Albany",
    work: "Upstate OEM and plant, food 304, architectural screens, data-center trays. City jobs still ship from Ohio.",
    freight: "Northeast LTL. Buffalo is a short hop; the five boroughs are a dock problem, not a forming problem.",
  },
  {
    slug: "north-carolina",
    name: "North Carolina",
    abbr: "NC",
    metros: "Charlotte, Raleigh–Durham, Greensboro, Winston-Salem, Wilmington",
    work: "Auto, furniture OEM, food, and data-center trays in 3/8 to 1/2 in.",
    freight: "Southeast LTL. Charlotte and the Triangle are two-day on a released skid.",
  },
  {
    slug: "north-dakota",
    name: "North Dakota",
    abbr: "ND",
    metros: "Fargo, Bismarck, Grand Forks, Minot",
    work: "Energy, ag, and outdoor galv. Heavy diameters when the guard is structural.",
    freight: "Upper Plains LTL. Winter dock windows belong on the ship date.",
  },
  {
    slug: "ohio",
    name: "Ohio",
    abbr: "OH",
    metros: "Cleveland, Akron, Youngstown, Toledo, Columbus, Cincinnati, Dayton",
    work: "This is the cell. Auto, steel-adjacent OEM, food, plant guards, 330 furnace baskets, and every stock diameter we run — 3/8, 7/16, 1/2 in.",
    freight: "Local pickup and short-haul. Mills and drawers are next door — that is why the shop sits here.",
  },
  {
    slug: "oklahoma",
    name: "Oklahoma",
    abbr: "OK",
    metros: "Oklahoma City, Tulsa, Norman, Lawton",
    work: "Energy, aerospace (Tulsa), and plant hardware. Carbon zinc or 304 — named on the print.",
    freight: "South-central LTL. Same Ohio origin as Texas jobs, shorter than Houston.",
  },
  {
    slug: "oregon",
    name: "Oregon",
    abbr: "OR",
    metros: "Portland, Eugene, Salem, Bend, Medford",
    work: "Food and beverage 304, outdoor ag, mill guards. 316 when chlorides sit on the part.",
    freight: "West Coast LTL/TL from Ohio. Transcon weight on 1/2 in is the freight driver.",
  },
  {
    slug: "pennsylvania",
    name: "Pennsylvania",
    abbr: "PA",
    metros: "Pittsburgh, Philadelphia, Allentown, Erie, Harrisburg, York",
    work: "Steel-adjacent OEM, plant guards, food 304, and 330 fixtures. Next door to the Ohio cell.",
    freight: "Same-day to next-day LTL on a released skid. Pittsburgh is a neighbor, not a second plant.",
  },
  {
    slug: "rhode-island",
    name: "Rhode Island",
    abbr: "RI",
    metros: "Providence, Warwick, Newport, Woonsocket",
    work: "OEM, marine 316, and plant hardware in 4–14 mm.",
    freight: "Northeast LTL, usually on the Massachusetts lane.",
  },
  {
    slug: "south-carolina",
    name: "South Carolina",
    abbr: "SC",
    metros: "Greenville–Spartanburg, Charleston, Columbia, Myrtle Beach",
    work: "Auto OEM and supplier frames, port and plant 316, food 304. Stock diameters on production.",
    freight: "Southeast LTL. Upstate auto plants are a two-day skid from Ohio.",
  },
  {
    slug: "south-dakota",
    name: "South Dakota",
    abbr: "SD",
    metros: "Sioux Falls, Rapid City, Aberdeen",
    work: "Ag, outdoor galv, and OEM frames. Heavy rims when the span carries load.",
    freight: "Plains LTL. Named freight on 4–14 mm.",
  },
  {
    slug: "tennessee",
    name: "Tennessee",
    abbr: "TN",
    metros: "Nashville, Memphis, Knoxville, Chattanooga, Tri-Cities",
    work: "Auto, appliance OEM, food 304, and plant guards in 3/8 to 1/2 in.",
    freight: "South LTL. Nashville and Chattanooga are short-to-medium hops from Ohio.",
  },
  {
    slug: "texas",
    name: "Texas",
    abbr: "TX",
    metros: "Houston, Dallas–Fort Worth, Austin, San Antonio, El Paso",
    work: "Petrochem 316, energy, data-center trays, auto supplier, and plant-floor grids. 330 furnace baskets ship the same origin as carbon.",
    freight: "Long LTL/TL. Houston and DFW are regular lanes. Freight is a line, not a surprise.",
  },
  {
    slug: "utah",
    name: "Utah",
    abbr: "UT",
    metros: "Salt Lake City, Provo, Ogden, St. George",
    work: "Data-center, outdoor galv, and OEM frames. 304 for washdown process.",
    freight: "Mountain West LTL from Ohio. Transcon class and weight on the quote.",
  },
  {
    slug: "vermont",
    name: "Vermont",
    abbr: "VT",
    metros: "Burlington, Rutland, White River Junction",
    work: "OEM, food 304, outdoor galv. 4–14 mm from coil.",
    freight: "Northeast LTL, often via Albany or Boston. Extra day vs southern New England.",
  },
  {
    slug: "virginia",
    name: "Virginia",
    abbr: "VA",
    metros: "Northern Virginia, Richmond, Norfolk, Roanoke, Lynchburg",
    work: "Data-center trays, shipyard 316, OEM, and plant guards.",
    freight: "Mid-Atlantic LTL. NoVA docks are busy — pack for a receiving appointment.",
  },
  {
    slug: "washington",
    name: "Washington",
    abbr: "WA",
    metros: "Seattle, Tacoma, Spokane, Vancouver, Everett",
    work: "Aerospace fixtures, marine 316, food 304, data-center trays. Not a 9-gauge West Coast clip shop.",
    freight: "Transcon from Ohio. A skid of 1/2 in is freight-first. Named on the quote.",
  },
  {
    slug: "west-virginia",
    name: "West Virginia",
    abbr: "WV",
    metros: "Charleston, Huntington, Morgantown, Parkersburg, Wheeling",
    work: "Chemical, energy, and plant guards. Neighbor state — same coil corridor as Ohio.",
    freight: "Short-haul LTL. Wheeling and the Ohio Valley are local-adjacent, not a second cell.",
  },
  {
    slug: "wisconsin",
    name: "Wisconsin",
    abbr: "WI",
    metros: "Milwaukee, Madison, Green Bay, Fox Valley, Eau Claire",
    work: "OEM, food 304, paper-mill guards, ag. Stock 3/8 to 1/2 in on production.",
    freight: "Upper Midwest LTL. Milwaukee is a one- to two-day skid from Ohio.",
  },
  {
    slug: "wyoming",
    name: "Wyoming",
    abbr: "WY",
    metros: "Cheyenne, Casper, Gillette, Jackson",
    work: "Energy, mining guards, outdoor galv. Heavy diameters when the print is structural.",
    freight: "Mountain / plains LTL. Long lane, named freight.",
  },
  {
    slug: "washington-dc",
    name: "Washington, D.C.",
    abbr: "DC",
    metros: "District of Columbia, federal and downtown docks",
    work: "Architectural screens, security mesh, and specified 304 frames. Production is still Ohio — the District is a dock.",
    freight: "Mid-Atlantic LTL into DC-area receiving. Appointments matter more than the CNC hour.",
  },
];

const bySlug = new Map(US_STATES.map((state) => [state.slug, state]));
const byAbbr = new Map(US_STATES.map((state) => [state.abbr, state]));
const byName = new Map(US_STATES.map((state) => [state.name.toLowerCase(), state]));

export function getState(slug: string) {
  return bySlug.get(slug);
}

export function getStateByAbbr(abbr: string) {
  return byAbbr.get(abbr.toUpperCase());
}

/** OH, Ohio, and ohio all resolve. Used to rank same-state shops. */
export function parseUsState(raw?: string | null) {
  const text = String(raw ?? "").trim();
  if (!text) return null;
  if (text.length === 2) return getStateByAbbr(text) ?? null;
  const lower = text.toLowerCase();
  return byName.get(lower) ?? bySlug.get(lower) ?? null;
}

export function sameUsState(a?: string | null, b?: string | null) {
  const left = parseUsState(a);
  const right = parseUsState(b);
  if (left && right) return left.abbr === right.abbr;
  const x = String(a ?? "").trim().toLowerCase();
  const y = String(b ?? "").trim().toLowerCase();
  return Boolean(x && y && x === y);
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

/** 5-digit US ZIP. ZIP+4 is accepted; we keep the first five. */
export function parseUsZip(raw?: string | null) {
  const digits = String(raw ?? "").replace(/\D/g, "");
  if (digits.length < 5) return null;
  return digits.slice(0, 5);
}

export function stateFromZip(raw: string): UsState | null {
  const zip = parseUsZip(raw);
  if (!zip) return null;
  const zip3 = Number(zip.slice(0, 3));
  if (!Number.isFinite(zip3)) return null;
  for (const [start, end, abbr] of ZIP3_RANGES) {
    if (zip3 >= start && zip3 <= end) return getStateByAbbr(abbr) ?? null;
  }
  return null;
}
