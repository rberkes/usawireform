import type { DirectoryCompany } from "./directory-types";
import { OHIO_CITIES, type OhioCity } from "./ohio-cities";

export type Place = {
  city: string;
  state: string;
};

const OHIO_CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  cleveland: { lat: 41.4993, lng: -81.6944 },
  "brook-park": { lat: 41.3984, lng: -81.8046 },
  "north-royalton": { lat: 41.3139, lng: -81.7246 },
  elyria: { lat: 41.3684, lng: -82.1077 },
  medina: { lat: 41.1384, lng: -81.8637 },
  ashland: { lat: 40.8687, lng: -82.3182 },
  columbus: { lat: 39.9612, lng: -82.9988 },
  toledo: { lat: 41.6528, lng: -83.5379 },
  springfield: { lat: 39.9242, lng: -83.8088 },
  baltic: { lat: 40.4431, lng: -81.699 },
  gnadenhutten: { lat: 40.3612, lng: -81.4318 },
  xenia: { lat: 39.6848, lng: -83.9297 },
  dayton: { lat: 39.7589, lng: -84.1916 },
  cincinnati: { lat: 39.1031, lng: -84.512 },
  twinsburg: { lat: 41.3126, lng: -81.4401 },
  akron: { lat: 41.0814, lng: -81.519 },
  canton: { lat: 40.7989, lng: -81.3783 },
  youngstown: { lat: 41.0998, lng: -80.6495 },
  mansfield: { lat: 40.7584, lng: -82.5154 },
  lorain: { lat: 41.4528, lng: -82.1824 },
  mentor: { lat: 41.6662, lng: -81.3396 },
  hamilton: { lat: 39.3995, lng: -84.5613 },
  parma: { lat: 41.4048, lng: -81.7229 },
  lakewood: { lat: 41.482, lng: -81.7982 },
  warren: { lat: 41.2376, lng: -80.8184 },
  lima: { lat: 40.7426, lng: -84.1052 },
  findlay: { lat: 41.0442, lng: -83.6499 },
  newark: { lat: 40.0581, lng: -82.4013 },
  "cuyahoga-falls": { lat: 41.1339, lng: -81.4846 },
  middletown: { lat: 39.5151, lng: -84.3983 },
};

function norm(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

export function parseCompanyPlace(company: DirectoryCompany): Place {
  const suffix = `, ${company.state}`;
  if (company.location.toUpperCase().endsWith(suffix.toUpperCase())) {
    return {
      city: company.location.slice(0, -suffix.length).trim(),
      state: company.state,
    };
  }
  return { city: company.location.trim(), state: company.state };
}

export function ohioCityCoords(slug: string) {
  return OHIO_CITY_COORDS[slug];
}

export function haversineMiles(
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
) {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const r = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * r * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function companyMatchesCity(company: DirectoryCompany, city: OhioCity) {
  if (company.state !== "OH" && company.state !== "Ohio") return false;
  const place = parseCompanyPlace(company);
  return norm(place.city) === norm(city.name);
}

export function nearbyOhioCities(city: OhioCity, withinMiles = 40) {
  const origin = OHIO_CITY_COORDS[city.slug];
  if (!origin) return [];
  return OHIO_CITIES.map((item) => {
    const coords = OHIO_CITY_COORDS[item.slug];
    if (!coords || item.slug === city.slug) return null;
    const miles = haversineMiles(origin, coords);
    if (miles > withinMiles) return null;
    return { city: item, miles: Math.round(miles) };
  })
    .filter((row): row is { city: OhioCity; miles: number } => row !== null)
    .sort((a, b) => a.miles - b.miles);
}

export function companyDistanceToOhioCity(
  company: DirectoryCompany,
  city: OhioCity,
) {
  const origin = OHIO_CITY_COORDS[city.slug];
  if (!origin || company.state !== "OH") return undefined;
  const place = parseCompanyPlace(company);
  const match = OHIO_CITIES.find((item) => norm(item.name) === norm(place.city));
  if (!match) return undefined;
  const coords = OHIO_CITY_COORDS[match.slug];
  if (!coords) return undefined;
  return Math.round(haversineMiles(origin, coords));
}

/**
 * A city page is worth indexing when it has a named plant or at least
 * one directory shop in that city. Demand-only landers stay reachable
 * but stay out of the index.
 */
export function ohioCityHasLocalInventory(
  city: OhioCity,
  shops: DirectoryCompany[],
) {
  if (city.plant) return true;
  return shops.some((shop) => companyMatchesCity(shop, city));
}
