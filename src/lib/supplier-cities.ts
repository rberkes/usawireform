import {
  WIRE_FORMING_METROS,
  type WireFormingMetro,
} from "@/lib/metros";

export const SUPPLIER_CITY_HUB = "/wire-form-suppliers";

/** First ten ranked forming metros — LA, Chicago, Cleveland, then the rest of the list. */
export const TOP_SUPPLIER_CITIES = WIRE_FORMING_METROS.slice(0, 10);

export function getSupplierCity(slug: string) {
  return TOP_SUPPLIER_CITIES.find((city) => city.slug === slug);
}

export function supplierCityPath(city: WireFormingMetro) {
  return `${SUPPLIER_CITY_HUB}/${city.slug}`;
}
