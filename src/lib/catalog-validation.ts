/**
 * Build-time validation for catalog data
 * Run with: npx tsx src/lib/catalog-validation.ts
 */

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { catalog } from "./catalog";

type ValidationError = {
  slug: string;
  field: string;
  message: string;
};

export function validateCatalog(): ValidationError[] {
  const errors: ValidationError[] = [];
  const allSlugs = new Set(catalog.map((item) => item.slug));

  for (const item of catalog) {
    // Validate related slugs exist
    for (const relatedSlug of item.related) {
      if (!allSlugs.has(relatedSlug)) {
        errors.push({
          slug: item.slug,
          field: "related",
          message: `Related slug "${relatedSlug}" does not exist in catalog`,
        });
      }
    }

    // Validate no self-reference
    if (item.related.includes(item.slug)) {
      errors.push({
        slug: item.slug,
        field: "related",
        message: "Product cannot reference itself in related items",
      });
    }

    // Validate processHref format
    if (!item.processHref.startsWith("/processes/")) {
      errors.push({
        slug: item.slug,
        field: "processHref",
        message: `Process href "${item.processHref}" should start with /processes/`,
      });
    }

    // Validate required fields are non-empty
    if (!item.title.trim()) {
      errors.push({
        slug: item.slug,
        field: "title",
        message: "Title cannot be empty",
      });
    }

    if (!item.summary.trim()) {
      errors.push({
        slug: item.slug,
        field: "summary",
        message: "Summary cannot be empty",
      });
    }

    if (item.body.length === 0) {
      errors.push({
        slug: item.slug,
        field: "body",
        message: "Body must have at least one paragraph",
      });
    }

    if (item.jobs.length === 0) {
      errors.push({
        slug: item.slug,
        field: "jobs",
        message: "Jobs must have at least one entry",
      });
    }
  }

  // Check for duplicate slugs
  const slugCounts = new Map<string, number>();
  for (const item of catalog) {
    slugCounts.set(item.slug, (slugCounts.get(item.slug) ?? 0) + 1);
  }
  for (const [slug, count] of slugCounts) {
    if (count > 1) {
      errors.push({
        slug,
        field: "slug",
        message: `Duplicate slug found (${count} occurrences)`,
      });
    }
  }

  return errors;
}

/** Site-wide JSON-LD must not emit Product nodes; Google flags them as product snippets. */
export function validateSiteJsonLd(): ValidationError[] {
  const errors: ValidationError[] = [];
  const source = readFileSync(
    join(process.cwd(), "src/components/JsonLd.tsx"),
    "utf8",
  );
  if (/"@type": "Product"/.test(source)) {
    errors.push({
      slug: "site-jsonld",
      field: "@type",
      message:
        'JsonLd.tsx must not emit @type "Product". Google Search Console treats those as product snippets and requires price, review, or aggregateRating. Use Service for quote-to-order catalog items.',
    });
  }
  return errors;
}

// Extract all valid slugs as a type (for development reference)
export type CatalogSlug = (typeof catalog)[number]["slug"];

// Helper to get all slugs
export function getAllCatalogSlugs(): string[] {
  return catalog.map((item) => item.slug);
}

// Run validation if this file is executed directly
if (require.main === module || process.argv[1]?.includes("catalog-validation")) {
  const errors = [...validateCatalog(), ...validateSiteJsonLd()];
  
  if (errors.length === 0) {
    console.log("✓ Catalog validation passed");
    console.log(`  ${catalog.length} products validated`);
    process.exit(0);
  } else {
    console.error("✗ Catalog validation failed:");
    for (const error of errors) {
      console.error(`  [${error.slug}] ${error.field}: ${error.message}`);
    }
    process.exit(1);
  }
}
