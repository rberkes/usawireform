/**
 * Generate all URL combinations for programmatic SEO pages
 */

import { cities, type CityData } from "./cities";
import { products, type ProductData } from "./products";
import { seoIndustries, type IndustryData } from "./industries";
import { materials, type MaterialData } from "./materials";

export interface ProductLocationCombo {
  slug: string;
  product: ProductData;
  city: CityData;
}

export interface IndustryProductCombo {
  slug: string;
  industry: IndustryData;
  product: ProductData;
}

export interface MaterialProductCombo {
  slug: string;
  material: MaterialData;
  product: ProductData;
}

const topCities = [
  "chicago", "detroit", "cleveland", "columbus", "indianapolis",
  "milwaukee", "minneapolis", "st-louis", "kansas-city",
  "new-york", "philadelphia", "pittsburgh", "boston", "baltimore",
  "atlanta", "charlotte", "nashville", "miami", "tampa", "raleigh",
  "houston", "dallas", "austin", "phoenix", "denver",
  "los-angeles", "san-francisco", "san-diego", "seattle", "portland",
];

const topProducts = [
  "wire-baskets", "parts-washing-baskets", "dipping-baskets",
  "cable-trays", "machine-guards", "fan-guards",
  "wire-racks", "wire-shelving", "wire-frames",
  "s-hooks", "j-hooks",
];

export function getProductLocationCombos(): ProductLocationCombo[] {
  const combos: ProductLocationCombo[] = [];
  
  for (const productSlug of topProducts) {
    const product = products.find(p => p.slug === productSlug);
    if (!product) continue;
    
    for (const citySlug of topCities) {
      const city = cities.find(c => c.slug === citySlug);
      if (!city) continue;
      
      combos.push({
        slug: `${product.slug}-${city.slug}`,
        product,
        city,
      });
    }
  }
  
  return combos;
}

export function getProductLocationCombo(slug: string): ProductLocationCombo | undefined {
  const combos = getProductLocationCombos();
  return combos.find(c => c.slug === slug);
}

export function getIndustryProductCombos(): IndustryProductCombo[] {
  const combos: IndustryProductCombo[] = [];
  
  for (const industry of seoIndustries) {
    for (const product of products) {
      if (product.industries.some(ind => 
        industry.name.toLowerCase().includes(ind.toLowerCase()) ||
        ind.toLowerCase().includes(industry.name.toLowerCase())
      )) {
        combos.push({
          slug: `${product.slug}-for-${industry.slug}`,
          industry,
          product,
        });
      }
    }
  }
  
  return combos;
}

export function getIndustryProductCombo(slug: string): IndustryProductCombo | undefined {
  const combos = getIndustryProductCombos();
  return combos.find(c => c.slug === slug);
}

export function getMaterialProductCombos(): MaterialProductCombo[] {
  const combos: MaterialProductCombo[] = [];
  
  for (const material of materials) {
    for (const product of products) {
      if (product.materials.some(mat => 
        material.shortName.toLowerCase().includes(mat.toLowerCase()) ||
        mat.toLowerCase().includes(material.shortName.toLowerCase()) ||
        material.name.toLowerCase().includes(mat.toLowerCase())
      )) {
        combos.push({
          slug: `${material.slug.replace('-wire-forming', '')}-${product.slug}`,
          material,
          product,
        });
      }
    }
  }
  
  return combos;
}

export function getMaterialProductCombo(slug: string): MaterialProductCombo | undefined {
  const combos = getMaterialProductCombos();
  return combos.find(c => c.slug === slug);
}
