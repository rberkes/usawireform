# USA Wire Form

A Next.js 16 marketing website for USA Wire Form, a custom CNC wire forming manufacturer based in Northeast Ohio.

## Overview

This website showcases wire forming capabilities, products, and services for industrial customers. Key features include:

- **Instant Quote Calculator** - Real-time pricing estimates based on wire diameter, bends, length, and material
- **Product Catalog** - 100+ wire form products across hooks, hangers, frames, and guards
- **Industry Pages** - Sector-specific content for automotive, data centers, construction, etc.
- **Process Documentation** - Detailed information on CNC forming, welding, and finishing processes
- **Contact Forms** - Quote request forms with file upload for CAD drawings

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Fonts**: IBM Plex Sans & IBM Plex Mono
- **Analytics**: Vercel Analytics
- **Search**: Fuse.js (client-side fuzzy search)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run production server
npm start

# Lint code
npm run lint
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── actions/            # Server Actions (form handling)
│   ├── industries/         # Industry-specific pages
│   ├── processes/          # Manufacturing process pages
│   ├── products/           # Product catalog pages
│   └── ...                 # Other pages (contact, quote, etc.)
├── components/             # React components
│   ├── Breadcrumbs.tsx     # Navigation breadcrumbs
│   ├── ContactForm.tsx     # Quote request form
│   ├── Header.tsx          # Site header with mega-menu
│   ├── InstantQuote.tsx    # Pricing calculator
│   ├── Search.tsx          # Site search dialog
│   ├── SocialProof.tsx     # Testimonials and stats
│   └── ui.tsx              # Core UI components
└── lib/                    # Utilities and data
    ├── catalog.ts          # Product catalog data
    ├── company.ts          # Company info constants
    ├── config.ts           # Central configuration
    ├── processes.ts        # Manufacturing processes
    ├── quoting.ts          # Pricing calculations
    └── seo/                # SEO utilities and metadata
```

## Key Features

### Instant Quote Calculator
Located at `/instant-quote`, provides real-time pricing estimates:
- Wire diameter selection (stock: 3/8", 7/16", 1/2")
- Bend count and part length inputs
- Material selection (carbon, stainless, brass, copper)
- Volume pricing comparison table

### Product Catalog
Dynamic product pages at `/products/[slug]` with:
- Detailed product descriptions
- Typical job applications
- Related products
- Quote request forms

### Search
Global search (`⌘K`) powered by Fuse.js, searching:
- All 100+ products
- 16 industry pages
- 14 process pages
- Static resource pages

### Forms with Server Actions
Contact and quote forms use Next.js Server Actions for:
- Server-side validation
- File upload handling (STEP, IGES, PDF, DXF)
- Form state management

## Configuration

Key configuration values are in `src/lib/config.ts`:
- Company information
- Wire capability ranges
- Pricing parameters
- File upload limits
- SEO defaults

## Environment Variables

Optional environment variables:
- `GOOGLE_SITE_VERIFICATION` - Google Search Console verification
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID (if using GA alongside Vercel Analytics)

## Deployment

Optimized for deployment on Vercel:

```bash
# Deploy to production
vercel --prod
```

The site uses:
- Static generation for product/industry pages
- Edge-optimized images via `next/image`
- Automatic font optimization
- 30-day cache headers for static assets

## Content Updates

### Adding Products
Edit `src/lib/catalog.ts` to add new products to the catalog.

### Adding Industries
1. Add entry to `src/lib/site.ts`
2. Create page at `src/app/industries/[slug]/page.tsx`

### Adding Processes
1. Add entry to `src/lib/processes.ts`
2. Create page at `src/app/processes/[slug]/page.tsx`

## License

Proprietary. Copyright © 2026 USA Wire Form. All rights reserved.

The source, page structure, original copy, catalogs, and compilations are not
licensed for reuse. See [LICENSE](./LICENSE), the
[User Agreement](https://usawireform.com/terms), and the
[Privacy Policy](https://usawireform.com/privacy).

USA Wire Form™ and USAWF™ are trademarks of USA Wire Form.
