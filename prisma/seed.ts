import { PrismaClient, ProductType, Role, OrderStatus, PaymentStatus, VerificationStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database with demonstration data...')
  console.log('⚠️  All product data is fictional and for demonstration purposes only.')

  // ─── SITE SETTINGS ────────────────────────────────────────────────────────
  await prisma.siteSetting.upsert({
    where: { key: 'checkout_enabled' },
    update: {},
    create: { key: 'checkout_enabled', value: 'false' },
  })
  await prisma.siteSetting.upsert({
    where: { key: 'site_name' },
    update: {},
    create: { key: 'site_name', value: 'American Leaf Co.' },
  })
  await prisma.siteSetting.upsert({
    where: { key: 'announcement_bar_text' },
    update: {},
    create: { key: 'announcement_bar_text', value: 'Catalogue Mode — Purchasing is not yet available. Must be 21+ to browse.' },
  })
  await prisma.siteSetting.upsert({
    where: { key: 'announcement_bar_enabled' },
    update: {},
    create: { key: 'announcement_bar_enabled', value: 'true' },
  })

  // ─── CATEGORIES ───────────────────────────────────────────────────────────
  const categories = [
    { name: 'Cigarettes', slug: 'cigarettes', description: 'Premium domestic and imported cigarettes.', sortOrder: 1 },
    { name: 'Cigars', slug: 'cigars', description: 'Hand-rolled and machine-made cigars from premium tobacco regions.', sortOrder: 2 },
    { name: 'Cigarillos', slug: 'cigarillos', description: 'Small cigars offering a refined, shorter smoke.', sortOrder: 3 },
    { name: 'Pipe Tobacco', slug: 'pipe-tobacco', description: 'Aromatic, English, Balkan, and Virginia blends for the discerning pipe smoker.', sortOrder: 4 },
    { name: 'Rolling Tobacco', slug: 'rolling-tobacco', description: 'Fine-cut and loose-leaf tobacco for hand-rolling.', sortOrder: 5 },
    { name: 'Hookah Tobacco', slug: 'hookah-tobacco', description: 'Moist, flavored tobacco designed for hookah/shisha use.', sortOrder: 6 },
    { name: 'Smokeless Tobacco', slug: 'smokeless-tobacco', description: 'Chewing tobacco, dip, snuff, and snus products.', sortOrder: 7 },
    { name: 'Dissolvables & Nicotine Pouches', slug: 'nicotine-pouches', description: 'Tobacco-free nicotine pouches and dissolvable products.', sortOrder: 8 },
    { name: 'Pipes', slug: 'pipes', description: 'Briar, meerschaum, corn cob, and novelty smoking pipes.', sortOrder: 9 },
    { name: 'Papers & Filters', slug: 'papers-filters', description: 'Rolling papers, filter tips, and pre-rolled cones.', sortOrder: 10 },
    { name: 'Lighters & Matches', slug: 'lighters-matches', description: 'Torch lighters, soft-flame lighters, and premium matches.', sortOrder: 11 },
    { name: 'Humidors & Accessories', slug: 'humidors-accessories', description: 'Desktop and travel humidors, hygrometers, and cigar accessories.', sortOrder: 12 },
  ]

  const createdCategories: Record<string, { id: string }> = {}
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: { ...cat, isActive: true },
    })
    createdCategories[cat.slug] = { id: created.id }
  }
  console.log(`✅ Created ${categories.length} categories`)

  // ─── BRANDS ───────────────────────────────────────────────────────────────
  // All fictional demonstration brands
  const brands = [
    { name: 'Appalachian Reserve', slug: 'appalachian-reserve', description: 'Fictional demonstration brand. Inspired by Appalachian heritage pipe and rolling tobacco blends.', countryOfOrigin: 'US', isFeatured: true },
    { name: 'Coronado Leaf', slug: 'coronado-leaf', description: 'Fictional demonstration brand. Premium hand-rolled cigars from fictional estates.', countryOfOrigin: 'US', isFeatured: true },
    { name: 'Blue Ridge Smoke', slug: 'blue-ridge-smoke', description: 'Fictional demonstration brand. American-style cigarettes and rolling tobacco.', countryOfOrigin: 'US', isFeatured: true },
    { name: 'Canyon Creek Tobacco', slug: 'canyon-creek', description: 'Fictional demonstration brand. Smokeless tobacco and chewing tobacco products.', countryOfOrigin: 'US', isFeatured: true },
    { name: 'Old Harbor Pipe Co.', slug: 'old-harbor-pipe', description: 'Fictional demonstration brand. Artisan briar pipes and English pipe tobacco blends.', countryOfOrigin: 'US', isFeatured: true },
    { name: 'Pacific Coast Hookah', slug: 'pacific-coast-hookah', description: 'Fictional demonstration brand. Flavored hookah tobacco products.', countryOfOrigin: 'US', isFeatured: false },
    { name: 'Summit Pouches', slug: 'summit-pouches', description: 'Fictional demonstration brand. Nicotine pouches and dissolvable products.', countryOfOrigin: 'US', isFeatured: false },
    { name: 'Frontier Accessories', slug: 'frontier-accessories', description: 'Fictional demonstration brand. Pipes, lighters, humidors, and tobacco accessories.', countryOfOrigin: 'US', isFeatured: false },
  ]

  const createdBrands: Record<string, { id: string }> = {}
  for (const brand of brands) {
    const created = await prisma.brand.upsert({
      where: { slug: brand.slug },
      update: {},
      create: { ...brand, isActive: true },
    })
    createdBrands[brand.slug] = { id: created.id }
  }
  console.log(`✅ Created ${brands.length} brands`)

  // ─── PRODUCTS ─────────────────────────────────────────────────────────────
  // All DEMONSTRATION DATA — not real products
  const products = [
    // ── CIGARETTES ──
    {
      name: 'Blue Ridge Classic King Size (Demo)',
      slug: 'blue-ridge-classic-king',
      brandSlug: 'blue-ridge-smoke',
      categorySlug: 'cigarettes',
      productType: ProductType.CIGARETTES,
      shortDescription: 'Demonstration record. Full-flavor king size cigarettes — American blend.',
      description: 'DEMONSTRATION DATA ONLY. This is a fictional product entry for catalogue demonstration purposes. Do not interpret as a real product available for purchase.',
      basePrice: 1099,
      isFeatured: true,
      specs: [
        { label: 'Format', value: 'King Size' },
        { label: 'Blend', value: 'American (Demo)' },
        { label: 'Pack Count', value: '20 cigarettes' },
      ],
      variants: [
        { name: 'Single Pack', price: 1099, quantity: 50 },
        { name: 'Carton (10 packs)', price: 9999, quantity: 15 },
      ],
    },
    {
      name: 'Blue Ridge Menthol 100s (Demo)',
      slug: 'blue-ridge-menthol-100s',
      brandSlug: 'blue-ridge-smoke',
      categorySlug: 'cigarettes',
      productType: ProductType.CIGARETTES,
      shortDescription: 'Demonstration record. Menthol 100mm cigarettes.',
      description: 'DEMONSTRATION DATA ONLY. Fictional product entry for catalogue purposes.',
      basePrice: 1149,
      isFeatured: false,
      specs: [
        { label: 'Format', value: '100mm' },
        { label: 'Style', value: 'Menthol (Demo)' },
        { label: 'Pack Count', value: '20 cigarettes' },
      ],
      variants: [
        { name: 'Single Pack', price: 1149, quantity: 40 },
        { name: 'Carton (10 packs)', price: 10499, quantity: 10 },
      ],
    },
    {
      name: 'Blue Ridge Light King (Demo)',
      slug: 'blue-ridge-light-king',
      brandSlug: 'blue-ridge-smoke',
      categorySlug: 'cigarettes',
      productType: ProductType.CIGARETTES,
      shortDescription: 'Demonstration record. Lower-tar king size variant.',
      description: 'DEMONSTRATION DATA ONLY. Fictional product entry.',
      basePrice: 1099,
      isFeatured: false,
      specs: [
        { label: 'Format', value: 'King Size' },
        { label: 'Style', value: 'Light (Demo)' },
      ],
      variants: [
        { name: 'Single Pack', price: 1099, quantity: 30 },
        { name: 'Carton (10 packs)', price: 9799, quantity: 8 },
      ],
    },

    // ── CIGARS ──
    {
      name: 'Coronado Reserve Robusto (Demo)',
      slug: 'coronado-reserve-robusto',
      brandSlug: 'coronado-leaf',
      categorySlug: 'cigars',
      productType: ProductType.CIGARS,
      shortDescription: 'Demonstration record. Hand-rolled robusto, fictional blend.',
      description: 'DEMONSTRATION DATA ONLY. Fictional premium cigar entry for catalogue illustration. All specifications are illustrative.',
      basePrice: 1895,
      isFeatured: true,
      specs: [
        { label: 'Format', value: 'Robusto' },
        { label: 'Size', value: '5 × 50' },
        { label: 'Wrapper Origin', value: 'Demo' },
        { label: 'Strength', value: 'Medium (Demo)' },
      ],
      variants: [
        { name: 'Single Cigar', price: 1895, quantity: 80 },
        { name: 'Box of 20', price: 33999, quantity: 20 },
        { name: 'Box of 5 (Sampler)', price: 8999, quantity: 35 },
      ],
    },
    {
      name: 'Coronado Churchill Natural (Demo)',
      slug: 'coronado-churchill-natural',
      brandSlug: 'coronado-leaf',
      categorySlug: 'cigars',
      productType: ProductType.CIGARS,
      shortDescription: 'Demonstration record. Full-size Churchill format.',
      description: 'DEMONSTRATION DATA ONLY. Fictional cigar product.',
      basePrice: 2495,
      isFeatured: true,
      specs: [
        { label: 'Format', value: 'Churchill' },
        { label: 'Size', value: '7 × 47' },
        { label: 'Strength', value: 'Medium-Full (Demo)' },
      ],
      variants: [
        { name: 'Single Cigar', price: 2495, quantity: 60 },
        { name: 'Box of 25', price: 54999, quantity: 12 },
      ],
    },
    {
      name: 'Coronado Toro Maduro (Demo)',
      slug: 'coronado-toro-maduro',
      brandSlug: 'coronado-leaf',
      categorySlug: 'cigars',
      productType: ProductType.CIGARS,
      shortDescription: 'Demonstration record. Toro format with dark maduro wrapper.',
      description: 'DEMONSTRATION DATA ONLY. Fictional cigar entry.',
      basePrice: 2195,
      isFeatured: false,
      specs: [
        { label: 'Format', value: 'Toro' },
        { label: 'Size', value: '6 × 52' },
        { label: 'Wrapper Style', value: 'Maduro (Demo)' },
        { label: 'Strength', value: 'Full (Demo)' },
      ],
      variants: [
        { name: 'Single Cigar', price: 2195, quantity: 70 },
        { name: 'Box of 20', price: 38999, quantity: 15 },
      ],
    },
    {
      name: 'Coronado Belicoso Claro (Demo)',
      slug: 'coronado-belicoso-claro',
      brandSlug: 'coronado-leaf',
      categorySlug: 'cigars',
      productType: ProductType.CIGARS,
      shortDescription: 'Demonstration record. Torpedo-style belicoso with light claro wrapper.',
      description: 'DEMONSTRATION DATA ONLY. Fictional cigar entry.',
      basePrice: 1995,
      isFeatured: false,
      specs: [
        { label: 'Format', value: 'Belicoso' },
        { label: 'Size', value: '5.5 × 52' },
        { label: 'Wrapper Style', value: 'Claro (Demo)' },
      ],
      variants: [
        { name: 'Single Cigar', price: 1995, quantity: 55 },
        { name: 'Box of 20', price: 35999, quantity: 10 },
      ],
    },
    {
      name: 'Coronado Perfecto Vintage (Demo)',
      slug: 'coronado-perfecto-vintage',
      brandSlug: 'coronado-leaf',
      categorySlug: 'cigars',
      productType: ProductType.CIGARS,
      shortDescription: 'Demonstration record. Classic perfecto shape, medium blend.',
      description: 'DEMONSTRATION DATA ONLY. Fictional cigar entry.',
      basePrice: 2295,
      isFeatured: false,
      specs: [
        { label: 'Format', value: 'Perfecto' },
        { label: 'Strength', value: 'Medium (Demo)' },
      ],
      variants: [
        { name: 'Single Cigar', price: 2295, quantity: 40 },
        { name: 'Box of 10', price: 19999, quantity: 8 },
      ],
    },

    // ── CIGARILLOS ──
    {
      name: 'Coronado Mini Cigarillos (Demo)',
      slug: 'coronado-mini-cigarillos',
      brandSlug: 'coronado-leaf',
      categorySlug: 'cigarillos',
      productType: ProductType.CIGARILLOS,
      shortDescription: 'Demonstration record. Small-format cigarillos, pack of 10.',
      description: 'DEMONSTRATION DATA ONLY. Fictional cigarillo entry.',
      basePrice: 799,
      isFeatured: false,
      specs: [
        { label: 'Count', value: '10 cigarillos' },
        { label: 'Format', value: 'Cigarillo' },
      ],
      variants: [
        { name: 'Pack of 10', price: 799, quantity: 60 },
        { name: 'Box of 20 packs', price: 13999, quantity: 20 },
      ],
    },

    // ── PIPE TOBACCO ──
    {
      name: 'Appalachian Reserve English Blend No. 1 (Demo)',
      slug: 'appalachian-english-no1',
      brandSlug: 'appalachian-reserve',
      categorySlug: 'pipe-tobacco',
      productType: ProductType.PIPE_TOBACCO,
      shortDescription: 'Demonstration record. Classic English-style pipe tobacco blend.',
      description: 'DEMONSTRATION DATA ONLY. Fictional pipe tobacco blend for catalogue illustration. Blend composition and characteristics are illustrative only.',
      basePrice: 1895,
      isFeatured: true,
      specs: [
        { label: 'Blend Style', value: 'English (Demo)' },
        { label: 'Cut', value: 'Ribbon (Demo)' },
        { label: 'Tin Weight', value: '1.75 oz (50g)' },
        { label: 'Strength', value: 'Medium (Demo)' },
      ],
      variants: [
        { name: '50g Tin', price: 1895, quantity: 60 },
        { name: '100g Pouch', price: 3295, quantity: 40 },
        { name: '250g Bulk', price: 7295, quantity: 20 },
      ],
    },
    {
      name: 'Appalachian Reserve Virginia Flake (Demo)',
      slug: 'appalachian-virginia-flake',
      brandSlug: 'appalachian-reserve',
      categorySlug: 'pipe-tobacco',
      productType: ProductType.PIPE_TOBACCO,
      shortDescription: 'Demonstration record. Pressed Virginia flake pipe tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional pipe tobacco.',
      basePrice: 2095,
      isFeatured: false,
      specs: [
        { label: 'Blend Style', value: 'Virginia Flake (Demo)' },
        { label: 'Cut', value: 'Flake (Demo)' },
        { label: 'Tin Weight', value: '1.75 oz (50g)' },
      ],
      variants: [
        { name: '50g Tin', price: 2095, quantity: 45 },
        { name: '100g Pouch', price: 3695, quantity: 25 },
      ],
    },
    {
      name: 'Appalachian Reserve Aromatic Cherry (Demo)',
      slug: 'appalachian-aromatic-cherry',
      brandSlug: 'appalachian-reserve',
      categorySlug: 'pipe-tobacco',
      productType: ProductType.PIPE_TOBACCO,
      shortDescription: 'Demonstration record. Aromatic cherry-flavored pipe tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional aromatic pipe tobacco blend.',
      basePrice: 1695,
      isFeatured: false,
      specs: [
        { label: 'Blend Style', value: 'Aromatic (Demo)' },
        { label: 'Flavor Note', value: 'Cherry (Demo)' },
        { label: 'Tin Weight', value: '1.75 oz (50g)' },
      ],
      variants: [
        { name: '50g Tin', price: 1695, quantity: 55 },
        { name: '100g Pouch', price: 2995, quantity: 30 },
      ],
    },
    {
      name: 'Appalachian Reserve Balkan Blend (Demo)',
      slug: 'appalachian-balkan-blend',
      brandSlug: 'appalachian-reserve',
      categorySlug: 'pipe-tobacco',
      productType: ProductType.PIPE_TOBACCO,
      shortDescription: 'Demonstration record. Balkan-style pipe tobacco with Latakia.',
      description: 'DEMONSTRATION DATA ONLY. Fictional Balkan-style pipe tobacco blend.',
      basePrice: 2295,
      isFeatured: false,
      specs: [
        { label: 'Blend Style', value: 'Balkan (Demo)' },
        { label: 'Tin Weight', value: '1.75 oz (50g)' },
        { label: 'Strength', value: 'Medium-Full (Demo)' },
      ],
      variants: [
        { name: '50g Tin', price: 2295, quantity: 35 },
        { name: '100g Tin', price: 4195, quantity: 20 },
      ],
    },
    {
      name: 'Appalachian Reserve Burley Dark (Demo)',
      slug: 'appalachian-burley-dark',
      brandSlug: 'appalachian-reserve',
      categorySlug: 'pipe-tobacco',
      productType: ProductType.PIPE_TOBACCO,
      shortDescription: 'Demonstration record. Dark-fired Burley pipe tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional pipe tobacco.',
      basePrice: 1995,
      isFeatured: false,
      specs: [
        { label: 'Blend Style', value: 'Burley (Demo)' },
        { label: 'Cut', value: 'Ready-Rubbed (Demo)' },
      ],
      variants: [
        { name: '50g Tin', price: 1995, quantity: 40 },
        { name: '100g Pouch', price: 3495, quantity: 20 },
      ],
    },

    // ── ROLLING TOBACCO ──
    {
      name: 'Blue Ridge Roll-Your-Own Blend (Demo)',
      slug: 'blue-ridge-ryo-blend',
      brandSlug: 'blue-ridge-smoke',
      categorySlug: 'rolling-tobacco',
      productType: ProductType.ROLLING_TOBACCO,
      shortDescription: 'Demonstration record. Fine-cut roll-your-own tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional rolling tobacco product.',
      basePrice: 1495,
      isFeatured: false,
      specs: [
        { label: 'Cut', value: 'Fine Cut (Demo)' },
        { label: 'Weight', value: '30g pouch' },
      ],
      variants: [
        { name: '30g Pouch', price: 1495, quantity: 50 },
        { name: '150g Bag', price: 6495, quantity: 20 },
      ],
    },
    {
      name: 'Appalachian Reserve RYO Premium (Demo)',
      slug: 'appalachian-ryo-premium',
      brandSlug: 'appalachian-reserve',
      categorySlug: 'rolling-tobacco',
      productType: ProductType.ROLLING_TOBACCO,
      shortDescription: 'Demonstration record. Premium cut rolling tobacco blend.',
      description: 'DEMONSTRATION DATA ONLY. Fictional rolling tobacco.',
      basePrice: 1895,
      isFeatured: false,
      specs: [
        { label: 'Cut', value: 'Medium Cut (Demo)' },
        { label: 'Weight', value: '40g pouch' },
      ],
      variants: [
        { name: '40g Pouch', price: 1895, quantity: 40 },
        { name: '200g Bag', price: 8495, quantity: 15 },
      ],
    },

    // ── HOOKAH TOBACCO ──
    {
      name: 'Pacific Coast Double Apple Hookah (Demo)',
      slug: 'pacific-coast-double-apple',
      brandSlug: 'pacific-coast-hookah',
      categorySlug: 'hookah-tobacco',
      productType: ProductType.HOOKAH_TOBACCO,
      shortDescription: 'Demonstration record. Double apple flavored hookah tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional hookah tobacco product.',
      basePrice: 1295,
      isFeatured: false,
      specs: [
        { label: 'Flavor', value: 'Double Apple (Demo)' },
        { label: 'Weight', value: '100g' },
        { label: 'Moisture', value: 'High (Demo)' },
      ],
      variants: [
        { name: '100g Pack', price: 1295, quantity: 45 },
        { name: '250g Pack', price: 2795, quantity: 25 },
        { name: '1kg Pack', price: 9995, quantity: 10 },
      ],
    },
    {
      name: 'Pacific Coast Mint Hookah (Demo)',
      slug: 'pacific-coast-mint',
      brandSlug: 'pacific-coast-hookah',
      categorySlug: 'hookah-tobacco',
      productType: ProductType.HOOKAH_TOBACCO,
      shortDescription: 'Demonstration record. Fresh mint hookah tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional hookah tobacco.',
      basePrice: 1195,
      isFeatured: false,
      specs: [
        { label: 'Flavor', value: 'Mint (Demo)' },
        { label: 'Weight', value: '100g' },
      ],
      variants: [
        { name: '100g Pack', price: 1195, quantity: 50 },
        { name: '250g Pack', price: 2595, quantity: 20 },
      ],
    },
    {
      name: 'Pacific Coast Watermelon Hookah (Demo)',
      slug: 'pacific-coast-watermelon',
      brandSlug: 'pacific-coast-hookah',
      categorySlug: 'hookah-tobacco',
      productType: ProductType.HOOKAH_TOBACCO,
      shortDescription: 'Demonstration record. Watermelon flavored hookah tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional hookah tobacco.',
      basePrice: 1295,
      isFeatured: false,
      specs: [
        { label: 'Flavor', value: 'Watermelon (Demo)' },
        { label: 'Weight', value: '100g' },
      ],
      variants: [
        { name: '100g Pack', price: 1295, quantity: 40 },
        { name: '250g Pack', price: 2795, quantity: 18 },
      ],
    },

    // ── SMOKELESS TOBACCO ──
    {
      name: 'Canyon Creek Chewing Tobacco Long Cut (Demo)',
      slug: 'canyon-creek-long-cut',
      brandSlug: 'canyon-creek',
      categorySlug: 'smokeless-tobacco',
      productType: ProductType.SMOKELESS_TOBACCO_CHEW,
      shortDescription: 'Demonstration record. Long-cut chewing tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional smokeless tobacco product. For demonstration only.',
      basePrice: 595,
      isFeatured: false,
      specs: [
        { label: 'Cut', value: 'Long Cut (Demo)' },
        { label: 'Weight', value: '1.2 oz' },
        { label: 'Style', value: 'Chewing Tobacco (Demo)' },
      ],
      variants: [
        { name: 'Single Can', price: 595, quantity: 80 },
        { name: 'Roll (5 cans)', price: 2699, quantity: 30 },
      ],
    },
    {
      name: 'Canyon Creek Dip Fine Cut Natural (Demo)',
      slug: 'canyon-creek-dip-fine-cut',
      brandSlug: 'canyon-creek',
      categorySlug: 'smokeless-tobacco',
      productType: ProductType.SMOKELESS_TOBACCO_DIP,
      shortDescription: 'Demonstration record. Fine-cut dip tobacco, natural flavor.',
      description: 'DEMONSTRATION DATA ONLY. Fictional dip tobacco.',
      basePrice: 495,
      isFeatured: false,
      specs: [
        { label: 'Cut', value: 'Fine Cut (Demo)' },
        { label: 'Flavor', value: 'Natural (Demo)' },
        { label: 'Weight', value: '1.2 oz' },
      ],
      variants: [
        { name: 'Single Can', price: 495, quantity: 100 },
        { name: 'Roll (5 cans)', price: 2299, quantity: 40 },
      ],
    },
    {
      name: 'Canyon Creek Moist Snuff (Demo)',
      slug: 'canyon-creek-moist-snuff',
      brandSlug: 'canyon-creek',
      categorySlug: 'smokeless-tobacco',
      productType: ProductType.SMOKELESS_TOBACCO_SNUFF,
      shortDescription: 'Demonstration record. Moist snuff in a variety of cuts.',
      description: 'DEMONSTRATION DATA ONLY. Fictional moist snuff product.',
      basePrice: 545,
      isFeatured: false,
      specs: [
        { label: 'Type', value: 'Moist Snuff (Demo)' },
        { label: 'Weight', value: '1.2 oz' },
      ],
      variants: [
        { name: 'Long Cut - Single', price: 545, quantity: 70 },
        { name: 'Fine Cut - Single', price: 545, quantity: 70 },
        { name: 'Roll of 5 - Long Cut', price: 2499, quantity: 25 },
      ],
    },
    {
      name: 'Canyon Creek Wintergreen Dip (Demo)',
      slug: 'canyon-creek-wintergreen-dip',
      brandSlug: 'canyon-creek',
      categorySlug: 'smokeless-tobacco',
      productType: ProductType.SMOKELESS_TOBACCO_DIP,
      shortDescription: 'Demonstration record. Wintergreen-flavored dip tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional dip tobacco.',
      basePrice: 495,
      isFeatured: false,
      specs: [
        { label: 'Flavor', value: 'Wintergreen (Demo)' },
        { label: 'Cut', value: 'Long Cut (Demo)' },
      ],
      variants: [
        { name: 'Single Can', price: 495, quantity: 90 },
        { name: 'Roll (5 cans)', price: 2299, quantity: 35 },
      ],
    },
    {
      name: 'Canyon Creek Straight Plug (Demo)',
      slug: 'canyon-creek-straight-plug',
      brandSlug: 'canyon-creek',
      categorySlug: 'smokeless-tobacco',
      productType: ProductType.SMOKELESS_TOBACCO_CHEW,
      shortDescription: 'Demonstration record. Traditional plug chewing tobacco.',
      description: 'DEMONSTRATION DATA ONLY. Fictional plug tobacco.',
      basePrice: 649,
      isFeatured: false,
      specs: [
        { label: 'Form', value: 'Plug (Demo)' },
        { label: 'Flavor', value: 'Straight (Demo)' },
      ],
      variants: [
        { name: 'Single Plug (3 oz)', price: 649, quantity: 60 },
      ],
    },
    {
      name: 'Canyon Creek Snus Pouches (Demo)',
      slug: 'canyon-creek-snus',
      brandSlug: 'canyon-creek',
      categorySlug: 'smokeless-tobacco',
      productType: ProductType.SNUS,
      shortDescription: 'Demonstration record. Pasteurized snus pouches.',
      description: 'DEMONSTRATION DATA ONLY. Fictional snus product.',
      basePrice: 699,
      isFeatured: false,
      specs: [
        { label: 'Type', value: 'Snus (Demo)' },
        { label: 'Count', value: '24 pouches' },
      ],
      variants: [
        { name: 'Mint — 24 ct', price: 699, quantity: 55 },
        { name: 'Original — 24 ct', price: 699, quantity: 55 },
      ],
    },

    // ── NICOTINE POUCHES ──
    {
      name: 'Summit Pouches Original (Demo)',
      slug: 'summit-pouches-original',
      brandSlug: 'summit-pouches',
      categorySlug: 'nicotine-pouches',
      productType: ProductType.NICOTINE_POUCHES,
      shortDescription: 'Demonstration record. Tobacco-free nicotine pouches.',
      description: 'DEMONSTRATION DATA ONLY. Fictional nicotine pouch product entry for catalogue display.',
      basePrice: 499,
      isFeatured: false,
      specs: [
        { label: 'Type', value: 'Nicotine Pouch (Tobacco-Free) (Demo)' },
        { label: 'Count', value: '20 pouches' },
        { label: 'Strength', value: 'Regular (Demo)' },
      ],
      variants: [
        { name: '3mg — 20 ct', price: 499, quantity: 100 },
        { name: '6mg — 20 ct', price: 499, quantity: 80 },
      ],
    },
    {
      name: 'Summit Pouches Cool Mint (Demo)',
      slug: 'summit-pouches-mint',
      brandSlug: 'summit-pouches',
      categorySlug: 'nicotine-pouches',
      productType: ProductType.NICOTINE_POUCHES,
      shortDescription: 'Demonstration record. Cool mint nicotine pouches.',
      description: 'DEMONSTRATION DATA ONLY. Fictional nicotine pouch.',
      basePrice: 499,
      isFeatured: false,
      specs: [
        { label: 'Flavor', value: 'Cool Mint (Demo)' },
        { label: 'Count', value: '20 pouches' },
      ],
      variants: [
        { name: '3mg — 20 ct', price: 499, quantity: 90 },
        { name: '6mg — 20 ct', price: 499, quantity: 70 },
        { name: '9mg Strong — 20 ct', price: 549, quantity: 50 },
      ],
    },

    // ── PIPES ──
    {
      name: 'Old Harbor Briar Billiard Pipe (Demo)',
      slug: 'old-harbor-briar-billiard',
      brandSlug: 'old-harbor-pipe',
      categorySlug: 'pipes',
      productType: ProductType.PIPES,
      shortDescription: 'Demonstration record. Handcrafted briar billiard smoking pipe.',
      description: 'DEMONSTRATION DATA ONLY. Fictional handcrafted pipe product.',
      basePrice: 6995,
      isFeatured: true,
      specs: [
        { label: 'Material', value: 'Briar (Demo)' },
        { label: 'Shape', value: 'Billiard (Demo)' },
        { label: 'Bowl Depth', value: '1.5 in (Demo)' },
        { label: 'Filter', value: '9mm (Demo)' },
      ],
      variants: [
        { name: 'Natural Finish', price: 6995, quantity: 25 },
        { name: 'Rustic Finish', price: 7495, quantity: 20 },
      ],
    },
    {
      name: 'Old Harbor Corn Cob Pipe (Demo)',
      slug: 'old-harbor-corn-cob',
      brandSlug: 'old-harbor-pipe',
      categorySlug: 'pipes',
      productType: ProductType.PIPES,
      shortDescription: 'Demonstration record. Classic American corn cob pipe.',
      description: 'DEMONSTRATION DATA ONLY. Fictional corn cob pipe.',
      basePrice: 1495,
      isFeatured: false,
      specs: [
        { label: 'Material', value: 'Corn Cob (Demo)' },
        { label: 'Shape', value: 'Classic (Demo)' },
      ],
      variants: [
        { name: 'Regular Bowl', price: 1495, quantity: 50 },
        { name: 'Large Bowl', price: 1795, quantity: 35 },
      ],
    },
    {
      name: 'Old Harbor Meerschaum Pipe (Demo)',
      slug: 'old-harbor-meerschaum',
      brandSlug: 'old-harbor-pipe',
      categorySlug: 'pipes',
      productType: ProductType.PIPES,
      shortDescription: 'Demonstration record. Hand-carved meerschaum pipe.',
      description: 'DEMONSTRATION DATA ONLY. Fictional meerschaum pipe.',
      basePrice: 12995,
      isFeatured: false,
      specs: [
        { label: 'Material', value: 'Meerschaum (Demo)' },
        { label: 'Shape', value: 'Carved (Demo)' },
      ],
      variants: [
        { name: 'Standard Carve', price: 12995, quantity: 10 },
        { name: 'Premium Carve', price: 18995, quantity: 5 },
      ],
    },

    // ── PAPERS & FILTERS ──
    {
      name: 'Blue Ridge Rolling Papers (Demo)',
      slug: 'blue-ridge-rolling-papers',
      brandSlug: 'blue-ridge-smoke',
      categorySlug: 'papers-filters',
      productType: ProductType.PAPERS,
      shortDescription: 'Demonstration record. Single-wide rolling papers.',
      description: 'DEMONSTRATION DATA ONLY. Fictional rolling papers.',
      basePrice: 299,
      isFeatured: false,
      specs: [
        { label: 'Size', value: '1¼ (Single Wide) (Demo)' },
        { label: 'Count', value: '50 leaves' },
        { label: 'Material', value: 'Rice Paper (Demo)' },
      ],
      variants: [
        { name: 'Single Pack (50 ct)', price: 299, quantity: 150 },
        { name: 'Box of 25 packs', price: 5999, quantity: 30 },
      ],
    },
    {
      name: 'Blue Ridge Filter Tips (Demo)',
      slug: 'blue-ridge-filter-tips',
      brandSlug: 'blue-ridge-smoke',
      categorySlug: 'papers-filters',
      productType: ProductType.FILTERS,
      shortDescription: 'Demonstration record. Slim filter tips for rolling.',
      description: 'DEMONSTRATION DATA ONLY. Fictional filter tips.',
      basePrice: 199,
      isFeatured: false,
      specs: [
        { label: 'Type', value: 'Slim Filter Tip (Demo)' },
        { label: 'Count', value: '120 tips' },
      ],
      variants: [
        { name: 'Pack of 120', price: 199, quantity: 200 },
        { name: 'Bag of 600', price: 799, quantity: 80 },
      ],
    },
    {
      name: 'Frontier King Size Pre-Rolled Cones (Demo)',
      slug: 'frontier-king-size-cones',
      brandSlug: 'frontier-accessories',
      categorySlug: 'papers-filters',
      productType: ProductType.PAPERS,
      shortDescription: 'Demonstration record. Pre-rolled King Size cones.',
      description: 'DEMONSTRATION DATA ONLY. Fictional pre-rolled cones.',
      basePrice: 399,
      isFeatured: false,
      specs: [
        { label: 'Size', value: 'King Size (Demo)' },
        { label: 'Count', value: '6 cones' },
        { label: 'Material', value: 'Unbleached (Demo)' },
      ],
      variants: [
        { name: 'Pack of 6', price: 399, quantity: 120 },
        { name: 'Box of 50', price: 2499, quantity: 40 },
      ],
    },

    // ── LIGHTERS & MATCHES ──
    {
      name: 'Frontier Torch Lighter (Demo)',
      slug: 'frontier-torch-lighter',
      brandSlug: 'frontier-accessories',
      categorySlug: 'lighters-matches',
      productType: ProductType.LIGHTERS,
      shortDescription: 'Demonstration record. Single-flame torch lighter for cigars.',
      description: 'DEMONSTRATION DATA ONLY. Fictional cigar torch lighter.',
      basePrice: 2995,
      isFeatured: false,
      specs: [
        { label: 'Flame Type', value: 'Single Torch (Demo)' },
        { label: 'Fuel', value: 'Butane (Demo)' },
        { label: 'Refillable', value: 'Yes (Demo)' },
      ],
      variants: [
        { name: 'Matte Black', price: 2995, quantity: 40 },
        { name: 'Chrome', price: 3295, quantity: 30 },
        { name: 'Gunmetal', price: 3295, quantity: 25 },
      ],
    },
    {
      name: 'Frontier Triple Jet Lighter (Demo)',
      slug: 'frontier-triple-jet-lighter',
      brandSlug: 'frontier-accessories',
      categorySlug: 'lighters-matches',
      productType: ProductType.LIGHTERS,
      shortDescription: 'Demonstration record. Triple-jet torch lighter.',
      description: 'DEMONSTRATION DATA ONLY. Fictional triple-jet cigar lighter.',
      basePrice: 4495,
      isFeatured: false,
      specs: [
        { label: 'Flame Type', value: 'Triple Jet Torch (Demo)' },
        { label: 'Fuel', value: 'Butane (Demo)' },
        { label: 'Refillable', value: 'Yes (Demo)' },
      ],
      variants: [
        { name: 'Brushed Steel', price: 4495, quantity: 20 },
        { name: 'Carbon Fiber', price: 5495, quantity: 15 },
      ],
    },
    {
      name: 'Frontier Long Matches (Demo)',
      slug: 'frontier-long-matches',
      brandSlug: 'frontier-accessories',
      categorySlug: 'lighters-matches',
      productType: ProductType.LIGHTERS,
      shortDescription: 'Demonstration record. Extra-long wooden matches for pipes and cigars.',
      description: 'DEMONSTRATION DATA ONLY. Fictional premium matches.',
      basePrice: 895,
      isFeatured: false,
      specs: [
        { label: 'Length', value: '4 in (Demo)' },
        { label: 'Count', value: '150 matches' },
      ],
      variants: [
        { name: 'Box of 150', price: 895, quantity: 80 },
        { name: 'Bundle of 3 Boxes', price: 2395, quantity: 30 },
      ],
    },

    // ── HUMIDORS & ACCESSORIES ──
    {
      name: 'Frontier Desktop Humidor 25-Count (Demo)',
      slug: 'frontier-humidor-25',
      brandSlug: 'frontier-accessories',
      categorySlug: 'humidors-accessories',
      productType: ProductType.HUMIDORS,
      shortDescription: 'Demonstration record. Desktop humidor for up to 25 cigars.',
      description: 'DEMONSTRATION DATA ONLY. Fictional desktop humidor product.',
      basePrice: 8995,
      isFeatured: false,
      specs: [
        { label: 'Capacity', value: '25 cigars (Demo)' },
        { label: 'Interior', value: 'Spanish Cedar (Demo)' },
        { label: 'Hygrometer', value: 'Analog Included (Demo)' },
        { label: 'Humidifier', value: 'Included (Demo)' },
      ],
      variants: [
        { name: 'Mahogany Finish', price: 8995, quantity: 15 },
        { name: 'Walnut Finish', price: 9495, quantity: 12 },
      ],
    },
    {
      name: 'Frontier Travel Humidor (Demo)',
      slug: 'frontier-travel-humidor',
      brandSlug: 'frontier-accessories',
      categorySlug: 'humidors-accessories',
      productType: ProductType.HUMIDORS,
      shortDescription: 'Demonstration record. Portable travel humidor for 5 cigars.',
      description: 'DEMONSTRATION DATA ONLY. Fictional travel humidor.',
      basePrice: 3995,
      isFeatured: false,
      specs: [
        { label: 'Capacity', value: '5 cigars (Demo)' },
        { label: 'Material', value: 'ABS Shell with Cedar Lining (Demo)' },
        { label: 'Seal', value: 'Airtight (Demo)' },
      ],
      variants: [
        { name: 'Black', price: 3995, quantity: 25 },
        { name: 'Brown', price: 3995, quantity: 20 },
      ],
    },
    {
      name: 'Old Harbor English Blend No. 4 (Demo)',
      slug: 'old-harbor-english-no4',
      brandSlug: 'old-harbor-pipe',
      categorySlug: 'pipe-tobacco',
      productType: ProductType.PIPE_TOBACCO,
      shortDescription: 'Demonstration record. Signature English pipe tobacco by Old Harbor.',
      description: 'DEMONSTRATION DATA ONLY. Fictional English pipe tobacco from the Old Harbor line.',
      basePrice: 2495,
      isFeatured: true,
      specs: [
        { label: 'Blend Style', value: 'English (Demo)' },
        { label: 'Tin Weight', value: '1.75 oz (50g)' },
        { label: 'Strength', value: 'Medium-Full (Demo)' },
      ],
      variants: [
        { name: '50g Tin', price: 2495, quantity: 30 },
        { name: '100g Tin', price: 4595, quantity: 15 },
      ],
    },
  ]

  const FDA_WARNING = 'WARNING: This product contains nicotine. Nicotine is an addictive chemical.'

  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } })
    if (existing) {
      console.log(`  ⏭  Skipping existing product: ${p.name}`)
      continue
    }

    const product = await prisma.product.create({
      data: {
        name: p.name,
        slug: p.slug,
        brandId: createdBrands[p.brandSlug].id,
        categoryId: createdCategories[p.categorySlug].id,
        productType: p.productType,
        shortDescription: p.shortDescription,
        description: p.description,
        basePrice: p.basePrice,
        isFeatured: p.isFeatured,
        isPublished: true,
        requiresAgeVerification: true,
        warnings: {
          create: [{ code: 'FDA_NICOTINE', text: FDA_WARNING }],
        },
        specifications: {
          create: p.specs.map((s, i) => ({ ...s, sortOrder: i })),
        },
      },
    })

    // Variants & Inventory
    for (let i = 0; i < p.variants.length; i++) {
      const v = p.variants[i]
      const variant = await prisma.productVariant.create({
        data: {
          productId: product.id,
          name: v.name,
          price: v.price,
          isAvailable: v.quantity > 0,
          sortOrder: i,
        },
      })
      await prisma.inventory.create({
        data: {
          variantId: variant.id,
          quantityOnHand: v.quantity,
          quantityReserved: 0,
          reorderPoint: 5,
        },
      })
    }
  }
  console.log(`✅ Created ${products.length} demonstration products`)

  // ─── TAX CONFIGURATION (sample rates — NOT legal tax advice) ──────────────
  const taxRates = [
    { stateCode: 'AL', stateName: 'Alabama', salesTaxRate: 400 },
    { stateCode: 'AK', stateName: 'Alaska', salesTaxRate: 0 },
    { stateCode: 'AZ', stateName: 'Arizona', salesTaxRate: 560 },
    { stateCode: 'AR', stateName: 'Arkansas', salesTaxRate: 650 },
    { stateCode: 'CA', stateName: 'California', salesTaxRate: 725 },
    { stateCode: 'CO', stateName: 'Colorado', salesTaxRate: 290 },
    { stateCode: 'CT', stateName: 'Connecticut', salesTaxRate: 635 },
    { stateCode: 'DE', stateName: 'Delaware', salesTaxRate: 0 },
    { stateCode: 'FL', stateName: 'Florida', salesTaxRate: 600 },
    { stateCode: 'GA', stateName: 'Georgia', salesTaxRate: 400 },
    { stateCode: 'HI', stateName: 'Hawaii', salesTaxRate: 400 },
    { stateCode: 'ID', stateName: 'Idaho', salesTaxRate: 600 },
    { stateCode: 'IL', stateName: 'Illinois', salesTaxRate: 625 },
    { stateCode: 'IN', stateName: 'Indiana', salesTaxRate: 700 },
    { stateCode: 'IA', stateName: 'Iowa', salesTaxRate: 600 },
    { stateCode: 'KS', stateName: 'Kansas', salesTaxRate: 650 },
    { stateCode: 'KY', stateName: 'Kentucky', salesTaxRate: 600 },
    { stateCode: 'LA', stateName: 'Louisiana', salesTaxRate: 445 },
    { stateCode: 'ME', stateName: 'Maine', salesTaxRate: 550 },
    { stateCode: 'MD', stateName: 'Maryland', salesTaxRate: 600 },
    { stateCode: 'MA', stateName: 'Massachusetts', salesTaxRate: 625 },
    { stateCode: 'MI', stateName: 'Michigan', salesTaxRate: 600 },
    { stateCode: 'MN', stateName: 'Minnesota', salesTaxRate: 688 },
    { stateCode: 'MS', stateName: 'Mississippi', salesTaxRate: 700 },
    { stateCode: 'MO', stateName: 'Missouri', salesTaxRate: 423 },
    { stateCode: 'MT', stateName: 'Montana', salesTaxRate: 0 },
    { stateCode: 'NE', stateName: 'Nebraska', salesTaxRate: 550 },
    { stateCode: 'NV', stateName: 'Nevada', salesTaxRate: 685 },
    { stateCode: 'NH', stateName: 'New Hampshire', salesTaxRate: 0 },
    { stateCode: 'NJ', stateName: 'New Jersey', salesTaxRate: 663 },
    { stateCode: 'NM', stateName: 'New Mexico', salesTaxRate: 513 },
    { stateCode: 'NY', stateName: 'New York', salesTaxRate: 400 },
    { stateCode: 'NC', stateName: 'North Carolina', salesTaxRate: 475 },
    { stateCode: 'ND', stateName: 'North Dakota', salesTaxRate: 500 },
    { stateCode: 'OH', stateName: 'Ohio', salesTaxRate: 575 },
    { stateCode: 'OK', stateName: 'Oklahoma', salesTaxRate: 450 },
    { stateCode: 'OR', stateName: 'Oregon', salesTaxRate: 0 },
    { stateCode: 'PA', stateName: 'Pennsylvania', salesTaxRate: 600 },
    { stateCode: 'RI', stateName: 'Rhode Island', salesTaxRate: 700 },
    { stateCode: 'SC', stateName: 'South Carolina', salesTaxRate: 600 },
    { stateCode: 'SD', stateName: 'South Dakota', salesTaxRate: 450 },
    { stateCode: 'TN', stateName: 'Tennessee', salesTaxRate: 700 },
    { stateCode: 'TX', stateName: 'Texas', salesTaxRate: 625 },
    { stateCode: 'UT', stateName: 'Utah', salesTaxRate: 485 },
    { stateCode: 'VT', stateName: 'Vermont', salesTaxRate: 600 },
    { stateCode: 'VA', stateName: 'Virginia', salesTaxRate: 530 },
    { stateCode: 'WA', stateName: 'Washington', salesTaxRate: 65 },
    { stateCode: 'WV', stateName: 'West Virginia', salesTaxRate: 600 },
    { stateCode: 'WI', stateName: 'Wisconsin', salesTaxRate: 500 },
    { stateCode: 'WY', stateName: 'Wyoming', salesTaxRate: 400 },
    { stateCode: 'DC', stateName: 'District of Columbia', salesTaxRate: 600 },
  ]

  for (const t of taxRates) {
    await prisma.taxConfiguration.upsert({
      where: { stateCode: t.stateCode },
      update: {},
      create: {
        ...t,
        exciseTaxNote: 'DEMO: Consult a qualified tax professional for applicable tobacco excise tax rates before conducting real transactions.',
      },
    })
  }
  console.log(`✅ Created ${taxRates.length} state tax configurations (demo rates)`)

  // ─── ADMIN USER ───────────────────────────────────────────────────────────
  const { createHash } = await import('crypto')
  const adminPasswordHash = createHash('sha256').update('change-this-password-immediately').digest('hex')
  
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Demo Administrator',
      role: Role.ADMIN,
      passwordHash: adminPasswordHash,
      emailVerified: new Date(),
    },
  })
  console.log('✅ Created demo admin user (admin@example.com) — CHANGE PASSWORD IMMEDIATELY')

  console.log('\n✅ Seed complete!')
  console.log('⚠️  All product data is FICTIONAL and for DEMONSTRATION PURPOSES ONLY.')
  console.log('⚠️  Tax rates are ILLUSTRATIVE and not legal tax advice.')
  console.log('⚠️  Checkout is DISABLED by default — configure compliance before enabling.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
