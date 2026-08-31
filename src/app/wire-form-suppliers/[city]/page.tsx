import { notFound } from "next/navigation";
import { CitySuppliersPage } from "@/components/client/CitySuppliersPage";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { getMetroShops } from "@/lib/metro-shops";
import { pageMeta } from "@/lib/seo";
import {
  SUPPLIER_CITY_HUB,
  TOP_SUPPLIER_CITIES,
  getSupplierCity,
  supplierCityPath,
} from "@/lib/supplier-cities";

type Props = { params: Promise<{ city: string }> };

export function generateStaticParams() {
  return TOP_SUPPLIER_CITIES.map((city) => ({ city: city.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { city: slug } = await params;
  const city = getSupplierCity(slug);
  if (!city) return {};
  return pageMeta({
    title: `Wire Form Suppliers in ${city.city}, ${city.stateAbbr}`,
    description: `Wire form suppliers in ${city.city} (${city.metro}). Get quotes from shops that can run the print. List a machine free.`,
    path: supplierCityPath(city),
    keywords: [
      `wire form suppliers ${city.city}`,
      `wire forming companies ${city.city}`,
      `${city.city} ${city.stateAbbr} wire forming`,
    ],
  });
}

export default async function SupplierCityRoute({ params }: Props) {
  const { city: slug } = await params;
  const city = getSupplierCity(slug);
  if (!city) notFound();

  const shops = getMetroShops(city);
  const href = supplierCityPath(city);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Suppliers", url: SUPPLIER_CITY_HUB },
          { name: city.city, url: href },
        ]}
      />
      <CitySuppliersPage city={city} shops={shops} />
    </>
  );
}
