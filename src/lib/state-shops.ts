export type StateShop = {
  name: string;
  city: string;
  state: string;
  website: string;
  /** One-line capacity note. Honest about mesh vs CNC vs mill. */
  capacity: string;
};

/**
 * Peer shops shown on /{state} pages. Real companies, real URLs.
 * At least two per state + D.C. Not affiliates of USA Wire Form.
 */
export const STATE_SHOPS: StateShop[] = [
  // Alabama
  {
    name: "Alabama Wire, LLC",
    city: "Pelham",
    state: "AL",
    website: "https://alabamawire.com/",
    capacity: "CNC 2D/3D from coil, straighten and cut, large-diameter forms (they publish 0.375 in work), finishes including galv and powder. ~50,000 sq ft.",
  },
  {
    name: "Nashville Wire Products",
    city: "Serves Alabama from TN/KY/AL plants",
    state: "AL",
    website: "https://www.nashvillewire.com/",
    capacity: "CNC wire forming to 0.375 in, welded baskets, decks, and material-handling structures. Million-plus sq ft across TN, KY, and AL.",
  },
  // Alaska
  {
    name: "Alaska Alloy",
    city: "Sterling",
    state: "AK",
    website: "https://alaskaalloy.com/",
    capacity: "CNC tube and sheet forming, TIG/MIG, powder. Not a coil-fed CNC wire cell — local alloy fab for the Kenai and Anchorage jobs.",
  },
  {
    name: "Alaska Steel Company",
    city: "Anchorage",
    state: "AK",
    website: "https://www.alaskasteel.com/",
    capacity: "Steel service center: plate, bar, and processing for Alaska construction. Buy formed wire parts from the Lower 48; they supply the mill steel.",
  },
  // Arizona
  {
    name: "Arizona Wire Products",
    city: "Fort Mohave",
    state: "AZ",
    website: "https://arizonawireproducts.com/",
    capacity: "Welded wire mesh from domestic coil, construction and ag gauges. Family plant between Phoenix, Southern California, and Las Vegas.",
  },
  {
    name: "Insteel Wire Products",
    city: "Kingman",
    state: "AZ",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Welded wire reinforcement, engineered structural mesh, concrete pipe reinforcement, drawn wire. Construction mesh — not 4–14 mm CNC forms.",
  },
  // Arkansas
  {
    name: "Bekaert",
    city: "Van Buren",
    state: "AR",
    website: "https://www.bekaert.com/",
    capacity: "Steel wire and cord mill. They draw and coat; they do not CNC-form your print. Coil source, not a former.",
  },
  {
    name: "Mid-South Wire",
    city: "Serves Arkansas from Memphis",
    state: "AR",
    website: "https://www.mid-southwire.com/",
    capacity: "Industrial wire drawer: bright, galv, and specialty coil. Former shops buy here; this is the mill PO.",
  },
  // California
  {
    name: "Newcomb Spring of California",
    city: "Stanton",
    state: "CA",
    website: "https://www.newcombspring.com/locations/california",
    capacity: "Custom springs and wire forms, ISO 9001. CNC and conventional. Serves CA, NV, HI. Lighter band than 4–14 mm frames.",
  },
  {
    name: "RFC Wire Forms",
    city: "Ontario",
    state: "CA",
    website: "https://www.rfcwireforms.com/",
    capacity: "Custom wire forms since 1946. CNC and fourslide-style work for OEM clips, displays, and assemblies.",
  },
  {
    name: "California Wire Products",
    city: "Corona",
    state: "CA",
    website: "https://cawire.com/",
    capacity: "Woven and welded wire mesh partitions, cages, lockers since 1948. Security mesh — not coil-fed 3D CNC frames.",
  },
  {
    name: "Precision Coil Spring",
    city: "El Monte",
    state: "CA",
    website: "https://pcspring.com/",
    capacity: "Aerospace and defense springs, wire forms, and rings since 1951. AS / NADCAP band. Specialty small-to-medium wire, not 1/2 in baskets.",
  },
  {
    name: "Peninsula Spring",
    city: "San Jose area",
    state: "CA",
    website: "https://peninsulaspring.com/",
    capacity: "ISO 9001 flat springs, wire clips, and contacts since 1976. Bay Area precision — not heavy industrial 4–14 mm.",
  },
  {
    name: "Betts Spring Manufacturing",
    city: "Fresno",
    state: "CA",
    website: "https://bettsspring.com/",
    capacity: "Hot-wound coil ~0.500–1.750 in, cold-wound ~0.095–0.640 in, leaf springs and sway bars since 1868. Heavy spring mill, not CNC baskets.",
  },
  {
    name: "Argo Spring Manufacturing",
    city: "Norwalk",
    state: "CA",
    website: "https://argospringmfg.com/",
    capacity: "Springs, wire forms, fourslide stampings, screw machine. ~45,000 sq ft. Aerospace through medical.",
  },
  {
    name: "C & J Spring",
    city: "Lake Elsinore",
    state: "CA",
    website: "https://www.candjspring.com/",
    capacity: "CNC wire bending plus compression, extension, torsion, and flat springs since 1985. Inland Empire OEM.",
  },
  {
    name: "American Precision Spring",
    city: "Santa Clara",
    state: "CA",
    website: "https://americanprecspring.com/",
    capacity: "Precision springs, wire forms, fourslide, and stampings since 1979. Medical, aerospace, electronics. Silicon Valley job shop.",
  },
  {
    name: "Century Spring Corp.",
    city: "Commerce",
    state: "CA",
    website: "https://www.centuryspring.com/",
    capacity: "Stock and custom springs, MW Components family. Catalog springs and light wire forms — not heavy 1/2 in structures.",
  },
  // Colorado
  {
    name: "Newcomb Spring of Colorado",
    city: "Denver",
    state: "CO",
    website: "https://www.newcombspring.com/locations/colorado",
    capacity: "Springs and wire forms, ISO 9001, ag-to-aerospace OEM. Regional plant with corporate CNC capacity up to ~0.625 in on heavy work.",
  },
  {
    name: "AAAA Specialties",
    city: "Denver",
    state: "CO",
    website: "https://aaaaspecialties.com/",
    capacity: "Custom compression, extension, torsion, and wire forms from ~0.008–0.562 in. Front Range job shop — not a 4–14 mm basket cell.",
  },
  // Connecticut
  {
    name: "Acme Wire Products",
    city: "Mystic",
    state: "CT",
    website: "https://www.acmewire.com/",
    capacity: "CNC and fabricated wire, 0.050–0.500 in, steel and stainless. ISO 9001. Displays, guards, lawn-and-garden, cable management.",
  },
  {
    name: "Newcomb Spring of Connecticut",
    city: "Southington",
    state: "CT",
    website: "https://www.newcombspring.com/locations",
    capacity: "Springs and CNC wire forms, ISO 9001. Prototype through production. Lighter OEM components than industrial 1/2 in frames.",
  },
  {
    name: "Tollman Spring",
    city: "Bristol",
    state: "CT",
    website: "https://www.tollmanspring.com/",
    capacity: "Multi-axis CNC wire forms, about 0.004–0.156 in. Tight angular work. Not a 4–14 mm basket shop.",
  },
  {
    name: "GEMCO Manufacturing",
    city: "Southington",
    state: "CT",
    website: "https://gemcomfg.com/",
    capacity: "Fourslide, multi-slide, and power-press stampings plus in-house wire forms. ~40,000 sq ft, 60+ fourslides. High-volume OEM, not heavy 1/2 in frames.",
  },
  {
    name: "Rowley Spring and Stamping",
    city: "Bristol",
    state: "CT",
    website: "https://rowleyspring.com/",
    capacity: "AS9100 / ISO 9001 springs, fourslide stampings, CNC and fourslide wire forms since 1954. Aerospace and medical. Fine-to-medium wire.",
  },
  {
    name: "Novo Precision",
    city: "Bristol",
    state: "CT",
    website: "https://novoprecision.com/",
    capacity: "Precision wire forming, medical staples/clips, straighten and cut. Contract production and wire-processing machines. Not 4–14 mm frames.",
  },
  // Delaware
  {
    name: "Marlin Steel Wire Products",
    city: "Baltimore, MD (Delmarva freight)",
    state: "DE",
    website: "https://www.marlinwire.com/",
    capacity: "Stainless baskets, racks, and custom wire forms. Robotic weld. Serves DE chemical and food plants from Baltimore.",
  },
  {
    name: "Ace Wire Spring & Form",
    city: "McKees Rocks, PA (serves DE)",
    state: "DE",
    website: "https://www.acewirespring.com/",
    capacity: "Custom springs and wire forms since 1939. Mid-Atlantic LTL into Wilmington and Dover.",
  },
  // Florida
  {
    name: "Insteel Wire Products",
    city: "Jacksonville",
    state: "FL",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Welded wire reinforcement, structural mesh, pipe reinforcement, drawn wire. Construction mesh plant.",
  },
  {
    name: "Gilco Spring",
    city: "Oldsmar",
    state: "FL",
    website: "https://gilcospring.com/",
    capacity: "Custom springs and wire forms: latches, hooks, brackets, clamps. Light-to-medium OEM — not 4–14 mm industrial frames.",
  },
  {
    name: "Cook Spring Company",
    city: "Sarasota",
    state: "FL",
    website: "https://cookspring.com/",
    capacity: "Medical-industry springs on in-house coilers. Precision small-diameter work, not CNC 1/2 in structures.",
  },
  // Georgia
  {
    name: "Newcomb Spring of Georgia",
    city: "Stonecrest",
    state: "GA",
    website: "https://www.newcombspring.com/locations",
    capacity: "Springs and wire forms, ISO 9001. Corporate HQ network. Auto, electronics, appliance components.",
  },
  {
    name: "Bekaert",
    city: "Rome",
    state: "GA",
    website: "https://www.bekaert.com/",
    capacity: "Steel wire drawing and coatings. Mill, not a CNC former. Coil for the Southeast.",
  },
  // Hawaii
  {
    name: "Kila Manufacturing",
    city: "Kapolei",
    state: "HI",
    website: "http://kilaman.com/",
    capacity: "Welded wire mesh in 6-gauge and 10-gauge galv, ASTM A1064. Rebar and tie wire. Island mesh plant — not 3D CNC from 1/2 in coil.",
  },
  {
    name: "Newcomb Spring of California",
    city: "Stanton, CA (serves HI)",
    state: "HI",
    website: "https://www.newcombspring.com/locations/california",
    capacity: "Newcomb’s CA plant lists Hawaii in its West Coast coverage. Springs and light wire forms, ocean freight after the mainland truck.",
  },
  // Idaho
  {
    name: "Mountain West Welding and Fence",
    city: "Heyburn",
    state: "ID",
    website: "https://mtnwestweldingandfence.com/",
    capacity: "Custom fence, corrals, and welding fab. Not CNC wire from coil. Local steel work for southern Idaho.",
  },
  {
    name: "J&J Wire (Kinney Mfg)",
    city: "Beatrice, NE (serves ID freight)",
    state: "ID",
    website: "https://www.jjwirecustom.com/about/",
    capacity: "Kinney-owned Beatrice plant: CNC and hard-tool forming, ~12 ga to 1 in+, in-house powder. Plains plant that ships West.",
  },
  // Illinois
  {
    name: "Apex Wire Products",
    city: "Franklin Park",
    state: "IL",
    website: "https://www.apexwireproducts.com/",
    capacity: "CNC wire forming ~0.015–0.472 in, straighten and cut, brazing, threading. Stainless, carbon, copper alloys. Since 1940.",
  },
  {
    name: "Master Spring & Wire Form Co.",
    city: "Roselle",
    state: "IL",
    website: "https://www.masterspring.com/",
    capacity: "Springs and custom wire forms. Fourslide and CNC. OEM clips and light-to-medium wire.",
  },
  {
    name: "Active Wireworks",
    city: "Bartlett",
    state: "IL",
    website: "https://www.activewireworks.com/",
    capacity: "Fourslide, CNC, straighten, cut, stamp. Publishes 3/16 in and larger. Auto and lawn-and-garden.",
  },
  {
    name: "Illini Wire Works",
    city: "Olney",
    state: "IL",
    website: "https://illiniwire.com/",
    capacity: "Custom wire forms and industrial fan guards. Veteran-owned. Southern Illinois plant.",
  },
  {
    name: "Rockford Specialties",
    city: "Rockford",
    state: "IL",
    website: "https://rswire.com/",
    capacity: "Custom wire forming, weld, and laser since 1979. POP, food-service, medical, work-cell baskets.",
  },
  // Indiana
  {
    name: "Angola Wire",
    city: "Angola",
    state: "IN",
    website: "https://www.angolawire.com/",
    capacity: "Custom wire forms and fabricated wire products for industrial OEM. Midwest plant, short hop from Ohio.",
  },
  {
    name: "Tomlinson Manufacturing",
    city: "Franklin",
    state: "IN",
    website: "https://tomlinsonmfg.com/",
    capacity: "Wire forming, CNC machining, and electrical/trucking hardware south of Indianapolis. Product-line shop that also forms wire.",
  },
  {
    name: "Keats Manufacturing",
    city: "Wheeling, IL (serves IN)",
    state: "IN",
    website: "https://www.keatsmfg.com/",
    capacity: "High-volume wire forms and fourslide, ISO/IATF. Fine wire up through small rod. Auto and industrial.",
  },
  // Iowa
  {
    name: "Iowa Metal Products",
    city: "Cedar Rapids area",
    state: "IA",
    website: "https://www.iowametalproducts.com/wireforming.html",
    capacity: "2D/3D hydraulic and CNC-style forming, ring forming to 40 in, roll thread to 1 in, spot/MIG/TIG, presses to 250 ton.",
  },
  {
    name: "J&J Wire (Kinney Mfg)",
    city: "Beatrice, NE (Iowa freight)",
    state: "IA",
    website: "https://www.jjwirecustom.com/about/",
    capacity: "CNC and tooled forming, 12 ga to over 1 in, powder in-house. Ag and OEM — natural lane into Iowa.",
  },
  // Kansas
  {
    name: "Quality Steel and Wire",
    city: "Lenexa",
    state: "KS",
    website: "https://qswmfg.com/",
    capacity: "Precision wire and metal forming since 1987. OEM parts, on-time culture. Kansas City metro.",
  },
  {
    name: "Newcomb Spring of Texas",
    city: "Dallas (serves KS)",
    state: "KS",
    website: "https://www.newcombspring.com/locations",
    capacity: "Springs and wire forms from the Dallas plant into Wichita and KC. ISO 9001 network.",
  },
  // Kentucky
  {
    name: "WireCrafters",
    city: "Louisville",
    state: "KY",
    website: "https://www.wirecrafters.com/",
    capacity: "Woven and welded wire partitions, machine guarding, storage cages. Panel systems — not CNC 3D from coil.",
  },
  {
    name: "Insteel Wire Products",
    city: "Hickman",
    state: "KY",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Standard welded wire reinforcement and drawn wire. Construction mesh mill on the Mississippi.",
  },
  {
    name: "Nashville Wire Products",
    city: "Kentucky plants",
    state: "KY",
    website: "https://www.nashvillewire.com/",
    capacity: "CNC to 0.375 in, welded material-handling wire. Lists Kentucky in the plant footprint.",
  },
  // Louisiana
  {
    name: "Insteel Wire Products",
    city: "Houston, TX (Gulf freight)",
    state: "LA",
    website: "https://insteel.com/about-us/locations/",
    capacity: "WWR and drawn wire. Closest heavy mesh mill for Louisiana petrochem and marine concrete.",
  },
  {
    name: "Draco Spring Mfg.",
    city: "Houston, TX (serves LA)",
    state: "LA",
    website: "https://www.dracospring.com/",
    capacity: "Hot and cold coiled springs, wire forms, stampings. Oilfield and industrial. Gulf LTL into Baton Rouge and Lafayette.",
  },
  // Maine
  {
    name: "Wirefab, Inc.",
    city: "Westfield, MA (serves ME)",
    state: "ME",
    website: "https://www.wirefab.com/",
    capacity: "Custom wire fabrication, displays, and forms. New England plant; extra day north of Boston into Maine.",
  },
  {
    name: "Acme Wire Products",
    city: "Mystic, CT (serves ME)",
    state: "ME",
    website: "https://www.acmewire.com/",
    capacity: "0.050–0.500 in fabricated wire. Northeast LTL. Few coil-fed CNC cells sit inside Maine.",
  },
  // Maryland
  {
    name: "Marlin Steel Wire Products",
    city: "Baltimore",
    state: "MD",
    website: "https://www.marlinwire.com/",
    capacity: "Custom stainless baskets, racks, and robotic-welded wire forms. Food, pharma, aerospace. Baltimore plant.",
  },
  {
    name: "Ace Wire Spring & Form",
    city: "McKees Rocks, PA (serves MD)",
    state: "MD",
    website: "https://www.acewirespring.com/",
    capacity: "Springs and wire forms since 1939. Mid-Atlantic coverage into Baltimore and Hagerstown.",
  },
  // Massachusetts
  {
    name: "Wirefab, Inc.",
    city: "Westfield",
    state: "MA",
    website: "https://www.wirefab.com/",
    capacity: "Custom wire fabrication and forms for OEM and display. Western Mass plant.",
  },
  {
    name: "Springfield Spring & Stamping",
    city: "East Longmeadow",
    state: "MA",
    website: "https://www.springfieldspring.com/",
    capacity: "Springs, stampings, and wire forms. New England OEM. Lighter than 4–14 mm industrial frames.",
  },
  // Michigan
  {
    name: "Motion Dynamics",
    city: "Fruitport",
    state: "MI",
    website: "https://motiondc.com/",
    capacity: "Medical and precision wire components, micro-coiling and forming from a ~73,000 sq ft plant. Not heavy 1/2 in structures.",
  },
  {
    name: "West Michigan Tube and Wire",
    city: "West Michigan",
    state: "MI",
    website: "https://wmtubewire.com/",
    capacity: "2D/3D CNC wire ~0.062–0.312 in plus tube bending, stamp, and weld. Furniture and industrial — below the 4–14 mm frame band.",
  },
  {
    name: "Salco Engineering & Manufacturing",
    city: "Jackson",
    state: "MI",
    website: "https://salcoeng.com/",
    capacity: "CNC wire forming (Numalliance 3D), industrial baskets, carts, and dunnage. Plant-floor structures and formed wire.",
  },
  {
    name: "Rives Manufacturing",
    city: "Rives Junction",
    state: "MI",
    website: "https://rivesmfg.com/",
    capacity: "CNC wire forming, cold heading, tube forming, thread rolling since 1992. Auto, lawn-and-garden, ag. ISO.",
  },
  // Minnesota
  {
    name: "Western Spring Manufacturing",
    city: "Hugo",
    state: "MN",
    website: "https://www.westernspring.com/",
    capacity: "Custom coil springs and wire forms since 1909. Family plant north of the Twin Cities. Lighter OEM band than 4–14 mm frames.",
  },
  {
    name: "Iowa Metal Products",
    city: "Iowa (Minnesota freight)",
    state: "MN",
    website: "https://www.iowametalproducts.com/wireforming.html",
    capacity: "Heavy forming, rings, threading, weld. Natural lane into the Twin Cities.",
  },
  // Mississippi
  {
    name: "Nashville Wire Products",
    city: "Tennessee plants (serves MS)",
    state: "MS",
    website: "https://www.nashvillewire.com/",
    capacity: "CNC to 0.375 in and welded wire structures. Auto-supplier freight into Mississippi.",
  },
  {
    name: "Insteel Wire Products",
    city: "Gallatin, TN (serves MS)",
    state: "MS",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Welded wire reinforcement. Closest Insteel mill for Mississippi concrete work.",
  },
  // Missouri
  {
    name: "Insteel Wire Products",
    city: "St. Joseph",
    state: "MO",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Engineered structural mesh, pipe reinforcement, drawn wire. Construction mill.",
  },
  {
    name: "Wermke Spring",
    city: "St. Louis area",
    state: "MO",
    website: "https://www.wermkespring.com/",
    capacity: "Custom springs and wire forms. St. Louis OEM. Lighter band than heavy frames.",
  },
  // Montana
  {
    name: "Reeverts Fencing",
    city: "Scobey",
    state: "MT",
    website: "https://reevertsfencingllc.com/",
    capacity: "Field fence, steel corrals, welded and woven farm mesh. Installation shop — not CNC wire forms.",
  },
  {
    name: "Newcomb Spring of Colorado",
    city: "Denver (serves MT)",
    state: "MT",
    website: "https://www.newcombspring.com/locations/colorado",
    capacity: "Springs and wire forms. Closest Newcomb plant for Montana OEM freight.",
  },
  // Nebraska
  {
    name: "J&J Wire (Kinney Mfg)",
    city: "Beatrice",
    state: "NE",
    website: "https://www.jjwirecustom.com/about/",
    capacity: "Kinney-owned Beatrice plant: CNC and hard tooling, ~12 ga to over 1 in, in-house powder. Ag and OEM. Real former in Nebraska.",
  },
  {
    name: "Quality Steel and Wire",
    city: "Lenexa, KS (Omaha freight)",
    state: "NE",
    website: "https://qswmfg.com/",
    capacity: "Precision wire forming. Kansas City metro — short hop to Omaha and Lincoln.",
  },
  // Nevada
  {
    name: "Arizona Wire Products",
    city: "Fort Mohave, AZ (Las Vegas lane)",
    state: "NV",
    website: "https://arizonawireproducts.com/",
    capacity: "Welded mesh. They market Las Vegas coverage from Fort Mohave.",
  },
  {
    name: "Newcomb Spring of California",
    city: "Stanton, CA (serves NV)",
    state: "NV",
    website: "https://www.newcombspring.com/locations/california",
    capacity: "Newcomb CA lists Nevada in West Coast coverage. Springs and light wire forms into Reno and Vegas.",
  },
  // New Hampshire
  {
    name: "Wire Belt Company of America",
    city: "Londonderry",
    state: "NH",
    website: "https://www.wirebelt.com/",
    capacity: "Stainless conveyor belting woven and assembled from wire. Process belts — not 4–14 mm CNC structures.",
  },
  {
    name: "Acme Wire Products",
    city: "Mystic, CT (serves NH)",
    state: "NH",
    website: "https://www.acmewire.com/",
    capacity: "Fabricated wire 0.050–0.500 in. New England LTL into Manchester and Nashua.",
  },
  // New Jersey
  {
    name: "Wytech",
    city: "Rahway",
    state: "NJ",
    website: "https://www.wytech.com/",
    capacity: "Medical wire grinding, forming, and hypotube. Precision, not industrial 1/2 in frames.",
  },
  {
    name: "Lee Spring",
    city: "Brooklyn, NY (serves NJ)",
    state: "NJ",
    website: "https://leespring.com/",
    capacity: "Stock and custom springs, light wire forms. Dense NJ docks; catalog plus custom.",
  },
  // New Mexico
  {
    name: "Insteel Wire Products",
    city: "Kingman, AZ (NM freight)",
    state: "NM",
    website: "https://insteel.com/about-us/locations/",
    capacity: "WWR mill. Closest Insteel plant for New Mexico concrete mesh.",
  },
  {
    name: "Newcomb Spring of Colorado",
    city: "Denver (serves NM)",
    state: "NM",
    website: "https://www.newcombspring.com/locations/colorado",
    capacity: "Springs and wire forms into Albuquerque and Las Cruces. Few CNC wire cells sit inside NM.",
  },
  // New York
  {
    name: "Lee Spring",
    city: "Brooklyn",
    state: "NY",
    website: "https://leespring.com/",
    capacity: "Headquarters, stock springs, custom springs and wire forms. Light-to-medium wire. Not 4–14 mm baskets.",
  },
  {
    name: "Ace Wire Spring & Form",
    city: "McKees Rocks, PA (serves NY)",
    state: "NY",
    website: "https://www.acewirespring.com/",
    capacity: "Custom springs and forms. Western NY is a short hop; five boroughs are a dock problem.",
  },
  {
    name: "Newcomb Spring of Connecticut",
    city: "Southington, CT (serves NY)",
    state: "NY",
    website: "https://www.newcombspring.com/locations",
    capacity: "ISO 9001 springs and CNC wire forms. Downstate and upstate LTL.",
  },
  // North Carolina
  {
    name: "Insteel Wire Products",
    city: "Mount Airy",
    state: "NC",
    website: "https://insteel.com/",
    capacity: "HQ and mill: engineered structural mesh, WWR, pipe reinforcement, drawn wire.",
  },
  {
    name: "Newcomb Spring of North Carolina",
    city: "Gastonia",
    state: "NC",
    website: "https://www.newcombspring.com/locations",
    capacity: "Springs and wire forms, ISO 9001. Auto and industrial OEM in the Carolinas.",
  },
  {
    name: "MW Components",
    city: "North Carolina operations",
    state: "NC",
    website: "https://www.mwcomponents.com/",
    capacity: "Multi-plant springs, fasteners, and wire forms. Catalog plus custom. Confirm the NC site on the quote.",
  },
  // North Dakota
  {
    name: "Western Spring Manufacturing",
    city: "Hugo, MN (serves ND)",
    state: "ND",
    website: "https://www.westernspring.com/",
    capacity: "Custom springs and wire forms. Upper Plains freight from Minnesota.",
  },
  {
    name: "J&J Wire (Kinney Mfg)",
    city: "Beatrice, NE (serves ND)",
    state: "ND",
    website: "https://www.jjwirecustom.com/about/",
    capacity: "Heavy wire forming and powder. Ag equipment lane into the Dakotas.",
  },
  // Ohio
  {
    name: "Elyria Spring & Stamping",
    city: "Elyria",
    state: "OH",
    website: "https://www.elyriaspring.com/",
    capacity: "Custom wire forms, simple to complex, tight-tolerance round wire. Northeast Ohio neighbor.",
  },
  {
    name: "Insteel Wire Products",
    city: "Upper Sandusky",
    state: "OH",
    website: "https://insteel.com/about-us/locations/",
    capacity: "WWR, structural mesh, pipe reinforcement, drawn wire. Construction mill in-state.",
  },
  {
    name: "Lockrey Manufacturing",
    city: "Toledo",
    state: "OH",
    website: "https://lockreymanufacturing.com/",
    capacity: "ISO machining and sheet fab with a wire-forming division. Toledo OEM — confirm diameter; not the same cell as 4–14 mm CNC frames.",
  },
  {
    name: "The Yost Superior Co.",
    city: "Springfield",
    state: "OH",
    website: "https://yostsuperior.com/",
    capacity: "Springs and custom wire forms since 1902. ISO 9001. Compression, extension, torsion, stampings. Family plant in western Ohio.",
  },
  {
    name: "Progress Wire Products",
    city: "Ashland",
    state: "OH",
    website: "https://progresswire.com/",
    capacity: "Wire grids, mesh, displays, fan guards, and fabricated assemblies since 1953. CNC and weld. Neighbor to the Northeast Ohio cell.",
  },
  {
    name: "Ohio Wire Form & Spring",
    city: "Columbus",
    state: "OH",
    website: "https://ohiowireform.com/",
    capacity: "Custom wire forms, springs, hooks, and racks since 1947. CNC and fourslide. Columbus plant — different band than 4–14 mm frames.",
  },
  {
    name: "Wire Products Company",
    city: "Cleveland",
    state: "OH",
    website: "https://wire-products.com/",
    capacity: "Stampings, wire forms, springs, and welded assemblies since 1951. AS9100 / ISO 9001 / ITAR. Cleveland plant — same metro as our cell, different diameter mix.",
  },
  // Oklahoma
  {
    name: "Action Spring Company",
    city: "Tulsa",
    state: "OK",
    website: "https://actionspringco.com/",
    capacity: "Compression, extension, torsion, flat springs, wire forms, and stampings. In-house EDM tooling. 50+ years in Tulsa.",
  },
  {
    name: "Newcomb Spring of Texas",
    city: "Dallas (serves OK)",
    state: "OK",
    website: "https://www.newcombspring.com/locations",
    capacity: "Springs and CNC wire forms. Short hop from Dallas into OKC and Tulsa.",
  },
  // Oregon
  {
    name: "Oregon Wire",
    city: "Portland",
    state: "OR",
    website: "https://www.oregonwire.co/",
    capacity: "2D/3D CNC forming, Schlatter robotic weld, straighten and cut. Baskets, POP, guards, ag trellis. Portland plant since 1973.",
  },
  {
    name: "Newcomb Spring of California",
    city: "Stanton, CA (serves OR)",
    state: "OR",
    website: "https://www.newcombspring.com/locations/california",
    capacity: "West Coast springs and light wire forms. Transcon alternative: Ohio 4–14 mm from this shop.",
  },
  // Pennsylvania
  {
    name: "Ace Wire Spring & Form",
    city: "McKees Rocks",
    state: "PA",
    website: "https://www.acewirespring.com/",
    capacity: "Custom springs and wire forms since 1939. Woman-owned. Pittsburgh side of the Ohio corridor.",
  },
  {
    name: "Insteel Wire Products",
    city: "Hazle Township",
    state: "PA",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Engineered structural mesh, standard WWR, drawn wire. Eastern PA mill.",
  },
  {
    name: "Marlin Steel",
    city: "Baltimore, MD (serves eastern PA)",
    state: "PA",
    website: "https://www.marlinwire.com/",
    capacity: "Stainless baskets and robotic wire forms. Philly and Lehigh freight.",
  },
  {
    name: "Diamond Wire Spring",
    city: "Pittsburgh / Glenshaw",
    state: "PA",
    website: "https://diamondwire.com/",
    capacity: "Custom springs and CNC wire forms ~0.010–0.625 in. Northeast plant plus catalog warehouse. Family-owned since 1939.",
  },
  {
    name: "James Spring & Wire",
    city: "Frazer",
    state: "PA",
    website: "https://jamesspring.com/",
    capacity: "Custom springs and wire forms since 1960. Fourslide and CNC, ~0.015–0.250 in published. Eastern PA OEM — not 1/2 in frames.",
  },
  // Rhode Island
  {
    name: "Acme Wire Products",
    city: "Mystic, CT (serves RI)",
    state: "RI",
    website: "https://www.acmewire.com/",
    capacity: "0.050–0.500 in fabricated wire. Next-door Connecticut plant into Providence.",
  },
  {
    name: "Tollman Spring",
    city: "Bristol, CT (serves RI)",
    state: "RI",
    website: "https://www.tollmanspring.com/",
    capacity: "Fine CNC wire forms 0.004–0.156 in. Jewelry-to-OEM band, not heavy frames.",
  },
  // South Carolina
  {
    name: "Newcomb Spring of North Carolina",
    city: "Gastonia, NC (Upstate SC)",
    state: "SC",
    website: "https://www.newcombspring.com/locations",
    capacity: "Springs and wire forms. Gastonia is the Upstate auto lane into Greenville–Spartanburg.",
  },
  {
    name: "Nashville Wire Products",
    city: "Serves the Southeast",
    state: "SC",
    website: "https://www.nashvillewire.com/",
    capacity: "CNC to 0.375 in, welded baskets and decks. Auto OEM freight into South Carolina.",
  },
  {
    name: "Diamond Wire Spring",
    city: "Taylors",
    state: "SC",
    website: "https://diamondwire.com/",
    capacity: "Southeast ISO plant: custom springs and CNC wire forms to ~0.625 in. Upstate auto and industrial.",
  },
  // South Dakota
  {
    name: "J&J Wire (Kinney Mfg)",
    city: "Beatrice, NE (serves SD)",
    state: "SD",
    website: "https://www.jjwirecustom.com/about/",
    capacity: "Heavy forming and powder. Ag equipment into Sioux Falls and the plains.",
  },
  {
    name: "Iowa Metal Products",
    city: "Iowa (serves SD)",
    state: "SD",
    website: "https://www.iowametalproducts.com/wireforming.html",
    capacity: "Rings, heavy bends, weld. Upper Midwest lane into South Dakota.",
  },
  // Tennessee
  {
    name: "Nashville Wire Products",
    city: "Nashville / Gallatin",
    state: "TN",
    website: "https://www.nashvillewire.com/",
    capacity: "CNC wire forming to 0.375 in, coil-feed and magazine-feed, welded material-handling, baskets, decks. Large multi-plant footprint.",
  },
  {
    name: "Newcomb Spring of Tennessee",
    city: "Ooltewah",
    state: "TN",
    website: "https://www.newcombspring.com/locations/tennessee",
    capacity: "~65,000 sq ft, ISO 9001. Torsion springs and wire forms for auto, appliance, outdoor power.",
  },
  {
    name: "Insteel Wire Products",
    city: "Gallatin",
    state: "TN",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Welded wire reinforcement mill. Construction mesh, not CNC 3D frames.",
  },
  // Texas
  {
    name: "Newcomb Spring of Texas",
    city: "Dallas",
    state: "TX",
    website: "https://www.newcombspring.com/locations",
    capacity: "Springs and CNC wire forms, ISO 9001. DFW plant for Texas OEM.",
  },
  {
    name: "Draco Spring Mfg.",
    city: "Houston",
    state: "TX",
    website: "https://www.dracospring.com/",
    capacity: "Hot/cold coiling, wire forms, stampings. Oilfield, medical, military, auto.",
  },
  {
    name: "Katy Spring",
    city: "Katy",
    state: "TX",
    website: "https://www.katyspring.com/",
    capacity: "Custom springs and wire forms. Houston metro. Energy and industrial.",
  },
  {
    name: "Insteel Wire Products",
    city: "Dayton / Houston",
    state: "TX",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Two Texas mills: structural mesh, WWR, pipe reinforcement, drawn wire.",
  },
  {
    name: "Coiling Technologies",
    city: "Houston",
    state: "TX",
    website: "https://www.coilingtech.com/",
    capacity: "Custom coiling and wire forms. Gulf industrial.",
  },
  {
    name: "Houston Wire Works",
    city: "South Houston",
    state: "TX",
    website: "https://houstonwirework.com/home",
    capacity: "Wire racks and display/storage for beverage and bottling. Product-line fab, not 4–14 mm CNC from coil.",
  },
  {
    name: "Leeco Spring International",
    city: "Houston",
    state: "TX",
    website: "https://leecospring.com/",
    capacity: "Stock and custom springs since 1959, plus wire forms and stampings. Catalog plus job-shop. Energy and industrial.",
  },
  {
    name: "Diamond Wire Spring",
    city: "Tyler",
    state: "TX",
    website: "https://diamondwire.com/",
    capacity: "Southwest ISO plant: custom springs and CNC wire forms ~0.010–0.625 in. East Texas freight.",
  },
  // Utah
  {
    name: "Newcomb Spring of Colorado",
    city: "Denver (serves UT)",
    state: "UT",
    website: "https://www.newcombspring.com/locations/colorado",
    capacity: "Springs and wire forms into Salt Lake. Mountain West LTL.",
  },
  {
    name: "AAAA Specialties",
    city: "Denver, CO (serves UT)",
    state: "UT",
    website: "https://aaaaspecialties.com/",
    capacity: "Custom springs and wire forms to ~0.562 in. Mountain West LTL from Denver into Salt Lake.",
  },
  // Vermont
  {
    name: "Wirefab, Inc.",
    city: "Westfield, MA (serves VT)",
    state: "VT",
    website: "https://www.wirefab.com/",
    capacity: "Custom wire fab. Extra day vs southern New England into Vermont.",
  },
  {
    name: "Acme Wire Products",
    city: "Mystic, CT (serves VT)",
    state: "VT",
    website: "https://www.acmewire.com/",
    capacity: "Fabricated wire 0.050–0.500 in. Northeast LTL via Albany or Boston.",
  },
  // Virginia
  {
    name: "Marlin Steel",
    city: "Baltimore, MD (serves VA)",
    state: "VA",
    website: "https://www.marlinwire.com/",
    capacity: "Stainless baskets and robotic forms. NoVA and Richmond freight. Appointments on DC-area docks.",
  },
  {
    name: "Insteel Wire Products",
    city: "Mount Airy, NC (serves VA)",
    state: "VA",
    website: "https://insteel.com/",
    capacity: "WWR HQ mill. Virginia concrete and precast mesh.",
  },
  // Washington
  {
    name: "Newcomb Spring of California",
    city: "Stanton, CA (serves WA)",
    state: "WA",
    website: "https://www.newcombspring.com/locations/california",
    capacity: "West Coast springs and light wire forms. Transcon 4–14 mm still ships from Ohio.",
  },
  {
    name: "Oregon Wire",
    city: "Portland, OR (serves WA)",
    state: "WA",
    website: "https://www.oregonwire.co/",
    capacity: "CNC forming and robotic weld. I-5 lane into Seattle and Tacoma from Portland.",
  },
  {
    name: "Evans Manufacturing",
    city: "Seattle area",
    state: "WA",
    website: "https://evansmfgco.com/metal-fabrication-services/wire-bending/seattle/",
    capacity: "Wafios CNC wire bending plus sheet fab and weld. Puget Sound job shop — confirm diameter vs 4–14 mm frames.",
  },
  // West Virginia
  {
    name: "Ace Wire Spring & Form",
    city: "McKees Rocks, PA (Ohio Valley)",
    state: "WV",
    website: "https://www.acewirespring.com/",
    capacity: "Springs and wire forms. Wheeling and the Ohio Valley are next door.",
  },
  {
    name: "Insteel Wire Products",
    city: "Upper Sandusky, OH (serves WV)",
    state: "WV",
    website: "https://insteel.com/about-us/locations/",
    capacity: "Ohio WWR mill. Short-haul mesh into West Virginia construction.",
  },
  // Wisconsin
  {
    name: "R & L Spring Company",
    city: "Lake Geneva",
    state: "WI",
    website: "https://rlspring.com/",
    capacity: "CNC and fourslide springs and wire forms since 1972. Powersports, auto, medical, consumer. Wide diameter spread including light medical.",
  },
  {
    name: "Spiros Industries",
    city: "West Bend",
    state: "WI",
    website: "https://spirosind.com/",
    capacity: "High-volume precision springs and wire forms, prototyping into production. D-rings, S-hooks, coils.",
  },
  {
    name: "Midwest Wire Products",
    city: "Sturgeon Bay",
    state: "WI",
    website: "https://wireforming.com/",
    capacity: "Custom wireforms and stampings, ISO 9001, in-house tooling. Door County plant.",
  },
  {
    name: "Wald Wire",
    city: "Oshkosh",
    state: "WI",
    website: "https://waldwire.com/",
    capacity: "Robotic wire forming plus sheet and tube fab since 1951. Shelves, racks, baskets, fan guards. Short runs, no published minimum.",
  },
  // Wyoming
  {
    name: "Brenton Manufacturing & Supply",
    city: "Casper",
    state: "WY",
    website: "https://brentonmfg.com/",
    capacity: "Fence and wire-made products for the Rockies. Not a CNC 4–14 mm cell.",
  },
  {
    name: "Newcomb Spring of Colorado",
    city: "Denver (serves WY)",
    state: "WY",
    website: "https://www.newcombspring.com/locations/colorado",
    capacity: "Springs and wire forms. Closest Newcomb plant for Cheyenne and Casper freight.",
  },
  // Washington, D.C.
  {
    name: "Marlin Steel Wire Products",
    city: "Baltimore, MD (D.C. docks)",
    state: "DC",
    website: "https://www.marlinwire.com/",
    capacity: "Stainless baskets and custom wire forms. The District is a receiving appointment, not a plant.",
  },
  {
    name: "Lee Spring",
    city: "Brooklyn, NY (serves D.C.)",
    state: "DC",
    website: "https://leespring.com/",
    capacity: "Stock and custom springs. Federal and contractor work via Mid-Atlantic freight.",
  },
];

const byState = new Map<string, StateShop[]>();
for (const shop of STATE_SHOPS) {
  const list = byState.get(shop.state) ?? [];
  list.push(shop);
  byState.set(shop.state, list);
}

export function getStateShops(abbr: string): StateShop[] {
  return byState.get(abbr.toUpperCase()) ?? [];
}

export function stateShopCount() {
  return STATE_SHOPS.length;
}

export function uniqueStateShopUrlCount() {
  return new Set(STATE_SHOPS.map((shop) => shop.website.replace(/\/$/, ""))).size;
}
