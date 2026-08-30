export type OhioCity = {
  slug: string;
  name: string;
  region: string;
  work: string;
  /** Named forming / fourslide / CNC plant in this city, if we have one. */
  plant?: string;
};

export const OHIO_CITY_HUB = "/ohio";

/** Forming / CNC / fourslide towns already named, plus 15 more buyer cities. */
export const OHIO_CITIES: OhioCity[] = [
  {
    slug: "cleveland",
    name: "Cleveland",
    region: "Northeast Ohio",
    work: "Steel, auto suppliers, food plants, and 4–14 mm frames. The mill-and-drawer cell sits in this region.",
    plant: "Wire Products Company — fourslide and CNC",
  },
  {
    slug: "brook-park",
    name: "Brook Park",
    region: "Cleveland west",
    work: "Airport-adjacent OEM, Ford Brook Park heritage, plant hardware and carts that roll the plant floor.",
    plant: "Ampex Metal — 4-slide and CNC wire",
  },
  {
    slug: "north-royalton",
    name: "North Royalton",
    region: "Cleveland south",
    work: "Bag cages, custom forms, and South-suburb OEM that freight I-71 and the Turnpike.",
    plant: "Royal Wire Products — CNC / fourslide",
  },
  {
    slug: "elyria",
    name: "Elyria",
    region: "Lorain County",
    work: "Fourslide clips and CNC forms next door to the coil. Short truck to the 214TF cell.",
    plant: "Elyria Spring & Stamping — CNC and fourslide",
  },
  {
    slug: "medina",
    name: "Medina",
    region: "Medina County",
    work: "I-71 OEM, springs, and fourslide parts. Cleveland–Akron freight, not a coast.",
    plant: "Supro Spring & Wire Forms — CNC to 12 mm and fourslide",
  },
  {
    slug: "ashland",
    name: "Ashland",
    region: "North-central",
    work: "Grids, baskets, fan guards, and fabricated wire. Neighbor to the Northeast Ohio cell.",
    plant: "Progress Wire Products — 2D/3D CNC",
  },
  {
    slug: "columbus",
    name: "Columbus",
    region: "Central Ohio",
    work: "Honda-adjacent OEM, logistics, food, and plant guards. We form in NE Ohio and truck I-71 south.",
    plant: "Ohio Wire Form & Spring — CNC and fourslide",
  },
  {
    slug: "toledo",
    name: "Toledo",
    region: "Northwest Ohio",
    work: "Jeep, glass, and Lake Erie plants. Frames, baskets, and hangers on a day’s truck from the cell.",
    plant: "Lockrey Manufacturing — wire-forming division",
  },
  {
    slug: "springfield",
    name: "Springfield",
    region: "West-central",
    work: "Truck, ag, and industrial hardware between Dayton and Columbus.",
    plant: "Yost Superior — springs and wire forms",
  },
  {
    slug: "baltic",
    name: "Baltic",
    region: "Tuscarawas / Holmes",
    work: "High-volume stamp-and-form and OEM wire for appliance and auto.",
    plant: "Crawford Wire Form Manufacturing",
  },
  {
    slug: "gnadenhutten",
    name: "Gnadenhutten",
    region: "Tuscarawas County",
    work: "Display, retail fixtures, and CNC 3D forms. We still quote 4–14 mm frames from NE Ohio.",
    plant: "Tusco — AIM CNC 3D wire forming",
  },
  {
    slug: "xenia",
    name: "Xenia",
    region: "Greene County",
    work: "Dayton-east springs and light-to-medium wire forms. Heavy 4–14 mm still ships from the cell.",
    plant: "Timac Spring — CNC springs and wire forms",
  },
  {
    slug: "dayton",
    name: "Dayton",
    region: "Miami Valley",
    work: "Aerospace, auto, and industrial carts. CNC and robotic wire in-town; 4–14 mm CNC from NE Ohio.",
    plant: "NCT / Dayton Wire Products — CNC and robotic wire",
  },
  {
    slug: "cincinnati",
    name: "Cincinnati",
    region: "Southwest Ohio",
    work: "Food, CPG, aerospace suppliers, and plant washdown. I-71 north to the forming cell.",
    plant: "General Wire Form LLC",
  },
  {
    slug: "twinsburg",
    name: "Twinsburg",
    region: "Summit County",
    work: "Fourslide stamp-and-form and OEM hardware on the Turnpike. Heavy frames from the NE Ohio CNC.",
    plant: "Wedge Products — four-slide / multi-slide",
  },
  {
    slug: "akron",
    name: "Akron",
    region: "Summit County",
    work: "Polymer, tire-heritage OEM, and plant guards. Short-haul from the Cleveland coil cell.",
  },
  {
    slug: "canton",
    name: "Canton",
    region: "Stark County",
    work: "Bearing, steel, and heavy equipment frames. 7/16 and 1/2 in when the line takes a hit.",
  },
  {
    slug: "youngstown",
    name: "Youngstown",
    region: "Mahoning Valley",
    work: "Steel-valley fab, auto suppliers, and mill-adjacent OEM. Coil economics stay in NE Ohio.",
  },
  {
    slug: "mansfield",
    name: "Mansfield",
    region: "Richland County",
    work: "Appliance, auto, and plant hardware on I-71 between Cleveland and Columbus.",
  },
  {
    slug: "lorain",
    name: "Lorain",
    region: "Lake Erie west",
    work: "Mill town, ship, and plant forms. Elyria and Cleveland are the next truck, not a coast mill.",
  },
  {
    slug: "mentor",
    name: "Mentor",
    region: "Lake County",
    work: "NE Ohio OEM, electrical, and industrial hangers. I-90 to the cell.",
  },
  {
    slug: "hamilton",
    name: "Hamilton",
    region: "Butler County",
    work: "Cincinnati-north paper, auto, and food plants. Stainless washdown baskets and carbon frames.",
  },
  {
    slug: "parma",
    name: "Parma",
    region: "Cuyahoga south",
    work: "Cleveland plant-floor carts, guards, and 3/8 in hardware. Local pickup is a metro hop.",
  },
  {
    slug: "lakewood",
    name: "Lakewood",
    region: "Cuyahoga west",
    work: "West-side plants and food. Same coil cell as Cleveland — mills and drawers next door.",
  },
  {
    slug: "warren",
    name: "Warren",
    region: "Trumbull County",
    work: "Steel, auto, and Lordstown-corridor suppliers. Heavy wire, short Ohio freight.",
  },
  {
    slug: "lima",
    name: "Lima",
    region: "Allen County",
    work: "Truck, energy, and tank-plant hardware. 4–14 mm from NE Ohio, not a local fourslide clip.",
  },
  {
    slug: "findlay",
    name: "Findlay",
    region: "Hancock County",
    work: "Energy HQ town, food, and industrial OEM. Carbon zinc or 304 — named on the print.",
  },
  {
    slug: "newark",
    name: "Newark",
    region: "Licking County",
    work: "Columbus-east logistics, glass, and Honda-adjacent forms. I-70 / I-71 truck from the cell.",
  },
  {
    slug: "cuyahoga-falls",
    name: "Cuyahoga Falls",
    region: "Summit County",
    work: "Akron-north OEM and plant guards. Same Northeast Ohio coil as Cleveland.",
  },
  {
    slug: "middletown",
    name: "Middletown",
    region: "Butler / Warren",
    work: "Steel mill town, Cincinnati–Dayton corridor. Frames and baskets, not construction mesh.",
  },
];

export function getOhioCity(slug: string) {
  return OHIO_CITIES.find((city) => city.slug === slug);
}

export function ohioCityPath(city: OhioCity | string) {
  const slug = typeof city === "string" ? city : city.slug;
  return `${OHIO_CITY_HUB}/${slug}`;
}

export function ohioPlantCities() {
  return OHIO_CITIES.filter((city) => city.plant);
}

export function ohioDemandCities() {
  return OHIO_CITIES.filter((city) => !city.plant);
}
