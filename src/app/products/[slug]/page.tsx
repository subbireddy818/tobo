import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShieldCheck, Truck, RotateCcw, Award, CheckCircle } from 'lucide-react'
import { ProductActions } from '@/components/product/ProductActions'

const PRODUCTS: Record<string, {
  name: string; brand: string; brandSlug: string; category: string; categorySlug: string
  type: string; price: number; description: string; shortDesc: string
  specs: { label: string; value: string }[]
  variants: { name: string; price: number }[]
  featured: boolean
}> = {
  'blue-ridge-classic-king': {
    name: 'Blue Ridge Classic King Size',
    brand: 'Blue Ridge Smoke',
    brandSlug: 'blue-ridge-smoke',
    category: 'Cigarettes',
    categorySlug: 'cigarettes',
    type: 'Cigarettes',
    price: 1099,
    shortDesc: 'Full-flavor king size cigarettes — premium American blend.',
    description: 'Crafted with select flue-cured and burley tobaccos, Blue Ridge Classic King Size delivers a smooth, rich smoke with consistent burn and authentic flavor character.',
    specs: [{ label: 'Format', value: 'King Size' }, { label: 'Blend', value: 'American Blend' }, { label: 'Pack Count', value: '20 cigarettes' }],
    variants: [{ name: 'Single Pack', price: 1099 }, { name: 'Carton (10 packs)', price: 9999 }],
    featured: true,
  },
  'blue-ridge-menthol-100s': {
    name: 'Blue Ridge Menthol 100s',
    brand: 'Blue Ridge Smoke',
    brandSlug: 'blue-ridge-smoke',
    category: 'Cigarettes',
    categorySlug: 'cigarettes',
    type: 'Cigarettes',
    price: 1149,
    shortDesc: 'Crisp, refreshing menthol 100mm cigarettes.',
    description: 'An invigorating menthol infusion paired with mellow Virginia leaf provides a cool, clean finish with each draw.',
    specs: [{ label: 'Format', value: '100mm' }, { label: 'Style', value: 'Menthol' }],
    variants: [{ name: 'Single Pack', price: 1149 }, { name: 'Carton (10 packs)', price: 10499 }],
    featured: false,
  },
  'blue-ridge-light-king': {
    name: 'Blue Ridge Light King',
    brand: 'Blue Ridge Smoke',
    brandSlug: 'blue-ridge-smoke',
    category: 'Cigarettes',
    categorySlug: 'cigarettes',
    type: 'Cigarettes',
    price: 1099,
    shortDesc: 'Smooth and balanced lighter king size variant.',
    description: 'Carefully curated lighter leaf selection offering a mellow profile with pleasant aroma and mild finish.',
    specs: [{ label: 'Format', value: 'King Size' }, { label: 'Style', value: 'Light & Smooth' }],
    variants: [{ name: 'Single Pack', price: 1099 }, { name: 'Carton (10 packs)', price: 9799 }],
    featured: false,
  },
  'coronado-reserve-robusto': {
    name: 'Coronado Reserve Robusto',
    brand: 'Coronado Leaf',
    brandSlug: 'coronado-leaf',
    category: 'Cigars',
    categorySlug: 'cigars',
    type: 'Cigars',
    price: 1895,
    shortDesc: 'Hand-rolled robusto with rich cedar and spice notes.',
    description: 'A masterpiece of boutique cigar making, featuring aged Nicaraguan long-fillers bound in a rich Habano wrapper with notes of roasted cedar, leather, and dark cocoa.',
    specs: [{ label: 'Format', value: 'Robusto' }, { label: 'Size', value: '5 × 50' }, { label: 'Strength', value: 'Medium-Full' }],
    variants: [{ name: 'Single Cigar', price: 1895 }, { name: 'Box of 20', price: 33999 }, { name: 'Box of 5 (Sampler)', price: 8999 }],
    featured: true,
  },
  'coronado-churchill-natural': {
    name: 'Coronado Churchill Natural',
    brand: 'Coronado Leaf',
    brandSlug: 'coronado-leaf',
    category: 'Cigars',
    categorySlug: 'cigars',
    type: 'Cigars',
    price: 2495,
    shortDesc: 'Full-size Churchill format with Ecuadorian Connecticut wrapper.',
    description: 'Generous 7-inch vitola offering over 90 minutes of smooth, complex smoking pleasure with subtle sweet cream and nutty undertones.',
    specs: [{ label: 'Format', value: 'Churchill' }, { label: 'Size', value: '7 × 47' }, { label: 'Strength', value: 'Medium' }],
    variants: [{ name: 'Single Cigar', price: 2495 }, { name: 'Box of 25', price: 54999 }],
    featured: true,
  },
  'coronado-toro-maduro': {
    name: 'Coronado Toro Maduro',
    brand: 'Coronado Leaf',
    brandSlug: 'coronado-leaf',
    category: 'Cigars',
    categorySlug: 'cigars',
    type: 'Cigars',
    price: 2195,
    shortDesc: 'Toro format with dark San Andrés maduro wrapper.',
    description: 'Deeply fermented wrapper leaf imparts chocolatey richness, espresso warmth, and black pepper highlights.',
    specs: [{ label: 'Format', value: 'Toro' }, { label: 'Size', value: '6 × 52' }, { label: 'Wrapper', value: 'San Andrés Maduro' }],
    variants: [{ name: 'Single Cigar', price: 2195 }, { name: 'Box of 20', price: 38999 }],
    featured: false,
  },
  'coronado-belicoso-claro': {
    name: 'Coronado Belicoso Claro',
    brand: 'Coronado Leaf',
    brandSlug: 'coronado-leaf',
    category: 'Cigars',
    categorySlug: 'cigars',
    type: 'Cigars',
    price: 1995,
    shortDesc: 'Torpedo-style belicoso with concentrated draw and complexity.',
    description: 'Tapered head focuses aromas and smoke concentration on the palate for an intensely rewarding experience.',
    specs: [{ label: 'Format', value: 'Belicoso' }, { label: 'Size', value: '5.5 × 52' }],
    variants: [{ name: 'Single Cigar', price: 1995 }, { name: 'Box of 20', price: 35999 }],
    featured: false,
  },
  'coronado-perfecto-vintage': {
    name: 'Coronado Perfecto Vintage',
    brand: 'Coronado Leaf',
    brandSlug: 'coronado-leaf',
    category: 'Cigars',
    categorySlug: 'cigars',
    type: 'Cigars',
    price: 2295,
    shortDesc: 'Classic perfecto shape crafted by master torcedores.',
    description: 'Artisanal double-tapered shape showcasing progressive flavor evolution throughout the burn.',
    specs: [{ label: 'Format', value: 'Perfecto' }, { label: 'Strength', value: 'Medium' }],
    variants: [{ name: 'Single Cigar', price: 2295 }, { name: 'Box of 10', price: 19999 }],
    featured: false,
  },
  'coronado-mini-cigarillos': {
    name: 'Coronado Mini Cigarillos',
    brand: 'Coronado Leaf',
    brandSlug: 'coronado-leaf',
    category: 'Cigarillos',
    categorySlug: 'cigarillos',
    type: 'Cigarillos',
    price: 799,
    shortDesc: 'Small-format premium cigarillos, pack of 10.',
    description: 'Natural leaf wrapped mini cigarillos offering 15 minutes of pure cigar richness whenever time is short.',
    specs: [{ label: 'Count', value: '10 cigarillos' }],
    variants: [{ name: 'Pack of 10', price: 799 }, { name: 'Box of 20 packs', price: 13999 }],
    featured: false,
  },
  'appalachian-english-no1': {
    name: 'Appalachian English Blend No. 1',
    brand: 'Appalachian Reserve',
    brandSlug: 'appalachian-reserve',
    category: 'Pipe Tobacco',
    categorySlug: 'pipe-tobacco',
    type: 'Pipe Tobacco',
    price: 1895,
    shortDesc: 'Classic English-style pipe blend with smoky Cyprian Latakia.',
    description: 'A traditional mixture of mature Virginia, Turkish Orientals, and smoky Cyprian Latakia delivering cool-smoking depth and campfire aroma.',
    specs: [{ label: 'Blend Style', value: 'Traditional English' }, { label: 'Cut', value: 'Ribbon Cut' }, { label: 'Tin Weight', value: '50g' }],
    variants: [{ name: '50g Tin', price: 1895 }, { name: '100g Pouch', price: 3295 }, { name: '250g Bulk', price: 7295 }],
    featured: true,
  },
  'appalachian-virginia-flake': {
    name: 'Appalachian Virginia Flake',
    brand: 'Appalachian Reserve',
    brandSlug: 'appalachian-reserve',
    category: 'Pipe Tobacco',
    categorySlug: 'pipe-tobacco',
    type: 'Pipe Tobacco',
    price: 2095,
    shortDesc: 'Hot-pressed pure Virginia flake with natural citrus sweetness.',
    description: 'Aged red and bright Virginias pressed into dense slices. Delivers hay-like sweetness, dried stone fruits, and mild tanginess.',
    specs: [{ label: 'Blend Style', value: 'Pure Virginia Flake' }, { label: 'Tin Weight', value: '50g' }],
    variants: [{ name: '50g Tin', price: 2095 }, { name: '100g Pouch', price: 3695 }],
    featured: false,
  },
  'appalachian-aromatic-cherry': {
    name: 'Appalachian Aromatic Cherry',
    brand: 'Appalachian Reserve',
    brandSlug: 'appalachian-reserve',
    category: 'Pipe Tobacco',
    categorySlug: 'pipe-tobacco',
    type: 'Pipe Tobacco',
    price: 1695,
    shortDesc: 'Mild aromatic pipe tobacco with pleasant dark cherry notes.',
    description: 'Toasted Black Cavendish and gold Virginia infused with natural wild black cherry essences for an exceptionally pleasant room note.',
    specs: [{ label: 'Blend Style', value: 'Aromatic' }, { label: 'Flavor', value: 'Wild Black Cherry' }],
    variants: [{ name: '50g Tin', price: 1695 }, { name: '100g Pouch', price: 2995 }],
    featured: false,
  },
  'appalachian-balkan-blend': {
    name: 'Appalachian Balkan Blend',
    brand: 'Appalachian Reserve',
    brandSlug: 'appalachian-reserve',
    category: 'Pipe Tobacco',
    categorySlug: 'pipe-tobacco',
    type: 'Pipe Tobacco',
    price: 2295,
    shortDesc: 'Oriental-forward Balkan pipe tobacco blend with rich body.',
    description: 'Prized Macedonian Yenidje and Smyrna tobaccos take center stage with supporting Latakia and matured Virginias.',
    specs: [{ label: 'Blend Style', value: 'Balkan Oriental' }, { label: 'Tin Weight', value: '50g' }],
    variants: [{ name: '50g Tin', price: 2295 }, { name: '100g Tin', price: 4195 }],
    featured: false,
  },
  'appalachian-burley-dark': {
    name: 'Appalachian Burley Dark',
    brand: 'Appalachian Reserve',
    brandSlug: 'appalachian-reserve',
    category: 'Pipe Tobacco',
    categorySlug: 'pipe-tobacco',
    type: 'Pipe Tobacco',
    price: 1995,
    shortDesc: 'Dark-fired Kentucky and Tennessee Burley blend.',
    description: 'Deep, earthy, and robust with hickory smoke overtones and satisfying strength.',
    specs: [{ label: 'Blend Style', value: 'Dark-Fired Burley' }],
    variants: [{ name: '50g Tin', price: 1995 }, { name: '100g Pouch', price: 3495 }],
    featured: false,
  },
  'old-harbor-english-no4': {
    name: 'Old Harbor English No. 4',
    brand: 'Old Harbor Pipe Co.',
    brandSlug: 'old-harbor-pipe',
    category: 'Pipe Tobacco',
    categorySlug: 'pipe-tobacco',
    type: 'Pipe Tobacco',
    price: 2495,
    shortDesc: 'Signature maritime English blend aged in vintage oak casks.',
    description: 'A celebrated maritime blend boasting vintage Latakia and sweet matured Cavendish with subtle saline complexity.',
    specs: [{ label: 'Blend Style', value: 'Maritime English' }, { label: 'Tin Weight', value: '50g' }],
    variants: [{ name: '50g Tin', price: 2495 }, { name: '100g Tin', price: 4595 }],
    featured: true,
  },
  'blue-ridge-ryo-blend': {
    name: 'Blue Ridge RYO Blend',
    brand: 'Blue Ridge Smoke',
    brandSlug: 'blue-ridge-smoke',
    category: 'Rolling Tobacco',
    categorySlug: 'rolling-tobacco',
    type: 'Rolling Tobacco',
    price: 1495,
    shortDesc: 'Silky fine-cut roll-your-own tobacco blend.',
    description: 'Precision fine-shag cut optimized for hand rolling or tube injection, offering consistent density and flavor.',
    specs: [{ label: 'Cut', value: 'Fine Shag' }, { label: 'Weight', value: '30g' }],
    variants: [{ name: '30g Pouch', price: 1495 }, { name: '150g Bag', price: 6495 }],
    featured: false,
  },
  'appalachian-ryo-premium': {
    name: 'Appalachian RYO Premium',
    brand: 'Appalachian Reserve',
    brandSlug: 'appalachian-reserve',
    category: 'Rolling Tobacco',
    categorySlug: 'rolling-tobacco',
    type: 'Rolling Tobacco',
    price: 1895,
    shortDesc: 'Artisanal Virginia and Burley rolling tobacco.',
    description: 'Unadulterated, whole-leaf ribbon cut tobacco offering pure tobacco satisfaction without synthetic humectants.',
    specs: [{ label: 'Cut', value: 'Medium Ribbon' }, { label: 'Weight', value: '40g' }],
    variants: [{ name: '40g Pouch', price: 1895 }, { name: '200g Bag', price: 8495 }],
    featured: false,
  },
  'pacific-coast-double-apple': {
    name: 'Pacific Coast Double Apple',
    brand: 'Pacific Coast Hookah',
    brandSlug: 'pacific-coast-hookah',
    category: 'Hookah Tobacco',
    categorySlug: 'hookah-tobacco',
    type: 'Hookah Tobacco',
    price: 1295,
    shortDesc: 'Classic double apple shisha with anise undertones.',
    description: 'Premium French Virginia tobacco leaves soaked in honey, vegetable glycerin, and genuine double apple essence.',
    specs: [{ label: 'Flavor', value: 'Double Apple & Anise' }, { label: 'Weight', value: '100g' }],
    variants: [{ name: '100g Pack', price: 1295 }, { name: '250g Pack', price: 2795 }, { name: '1kg Pack', price: 9995 }],
    featured: false,
  },
  'pacific-coast-mint': {
    name: 'Pacific Coast Mint',
    brand: 'Pacific Coast Hookah',
    brandSlug: 'pacific-coast-hookah',
    category: 'Hookah Tobacco',
    categorySlug: 'hookah-tobacco',
    type: 'Hookah Tobacco',
    price: 1195,
    shortDesc: 'Crisp, cooling spearmint hookah shisha.',
    description: 'Pure, icy spearmint leaves blended into golden shisha leaf for thick, cooling clouds.',
    specs: [{ label: 'Flavor', value: 'Icy Spearmint' }],
    variants: [{ name: '100g Pack', price: 1195 }, { name: '250g Pack', price: 2595 }],
    featured: false,
  },
  'pacific-coast-watermelon': {
    name: 'Pacific Coast Watermelon',
    brand: 'Pacific Coast Hookah',
    brandSlug: 'pacific-coast-hookah',
    category: 'Hookah Tobacco',
    categorySlug: 'hookah-tobacco',
    type: 'Hookah Tobacco',
    price: 1295,
    shortDesc: 'Juicy summer watermelon shisha tobacco.',
    description: 'Refreshing sweet watermelon profile with dense cloud production and long-lasting session duration.',
    specs: [{ label: 'Flavor', value: 'Sweet Watermelon' }],
    variants: [{ name: '100g Pack', price: 1295 }, { name: '250g Pack', price: 2795 }],
    featured: false,
  },
  'canyon-creek-long-cut': {
    name: 'Canyon Creek Long Cut',
    brand: 'Canyon Creek Tobacco',
    brandSlug: 'canyon-creek',
    category: 'Smokeless Tobacco',
    categorySlug: 'smokeless-tobacco',
    type: 'Chewing Tobacco',
    price: 595,
    shortDesc: 'Heritage long-cut smokeless moist tobacco.',
    description: 'Aged American dark-fired tobacco seasoned with traditional molasses and natural curing spices.',
    specs: [{ label: 'Cut', value: 'Long Cut' }, { label: 'Weight', value: '1.2 oz' }],
    variants: [{ name: 'Single Can', price: 595 }, { name: 'Roll (5 cans)', price: 2699 }],
    featured: false,
  },
  'canyon-creek-dip-fine-cut': {
    name: 'Canyon Creek Dip Fine Cut',
    brand: 'Canyon Creek Tobacco',
    brandSlug: 'canyon-creek',
    category: 'Smokeless Tobacco',
    categorySlug: 'smokeless-tobacco',
    type: 'Dip',
    price: 495,
    shortDesc: 'Traditional fine-cut moist snuff dip.',
    description: 'Smooth, finely shredded smokeless tobacco with quick nicotine release and rich tobacco flavor.',
    specs: [{ label: 'Cut', value: 'Fine Cut' }],
    variants: [{ name: 'Single Can', price: 495 }, { name: 'Roll (5 cans)', price: 2299 }],
    featured: false,
  },
  'canyon-creek-moist-snuff': {
    name: 'Canyon Creek Moist Snuff',
    brand: 'Canyon Creek Tobacco',
    brandSlug: 'canyon-creek',
    category: 'Smokeless Tobacco',
    categorySlug: 'smokeless-tobacco',
    type: 'Snuff',
    price: 545,
    shortDesc: 'Authentic American moist snuff.',
    description: 'Rich dark fire-cured tobacco processed according to time-tested Appalachian standards.',
    specs: [{ label: 'Type', value: 'Moist Snuff' }],
    variants: [{ name: 'Long Cut', price: 545 }, { name: 'Fine Cut', price: 545 }],
    featured: false,
  },
  'canyon-creek-wintergreen-dip': {
    name: 'Canyon Creek Wintergreen Dip',
    brand: 'Canyon Creek Tobacco',
    brandSlug: 'canyon-creek',
    category: 'Smokeless Tobacco',
    categorySlug: 'smokeless-tobacco',
    type: 'Dip',
    price: 495,
    shortDesc: 'Cool, bold wintergreen flavored moist dip.',
    description: 'Bold wintergreen warmth balanced with robust smokeless tobacco character.',
    specs: [{ label: 'Flavor', value: 'Bold Wintergreen' }],
    variants: [{ name: 'Single Can', price: 495 }, { name: 'Roll (5 cans)', price: 2299 }],
    featured: false,
  },
  'canyon-creek-straight-plug': {
    name: 'Canyon Creek Straight Plug',
    brand: 'Canyon Creek Tobacco',
    brandSlug: 'canyon-creek',
    category: 'Smokeless Tobacco',
    categorySlug: 'smokeless-tobacco',
    type: 'Chewing Tobacco',
    price: 649,
    shortDesc: 'Traditional pressed plug chewing tobacco.',
    description: 'Heavily pressed whole tobacco leaves sweetened with cane syrup, built for the traditional chewer.',
    specs: [{ label: 'Form', value: 'Pressed Plug' }],
    variants: [{ name: 'Single Plug (3 oz)', price: 649 }],
    featured: false,
  },
  'canyon-creek-snus': {
    name: 'Canyon Creek Snus Pouches',
    brand: 'Canyon Creek Tobacco',
    brandSlug: 'canyon-creek',
    category: 'Smokeless Tobacco',
    categorySlug: 'smokeless-tobacco',
    type: 'Snus',
    price: 699,
    shortDesc: 'Steam-pasteurized portion snus pouches.',
    description: 'Discreet, smoke-free and spit-free portion pouches crafted with Swedish-style steam pasteurization.',
    specs: [{ label: 'Type', value: 'Portion Snus' }, { label: 'Count', value: '24 pouches' }],
    variants: [{ name: 'Mint — 24 ct', price: 699 }, { name: 'Original — 24 ct', price: 699 }],
    featured: false,
  },
  'summit-pouches-original': {
    name: 'Summit Pouches Original',
    brand: 'Summit Pouches',
    brandSlug: 'summit-pouches',
    category: 'Nicotine Pouches',
    categorySlug: 'nicotine-pouches',
    type: 'Nicotine Pouches',
    price: 499,
    shortDesc: 'Tobacco-free white nicotine pouches.',
    description: 'Clean, discreet, pharmaceutical-grade nicotine pouches designed for modern tobacco-free satisfaction.',
    specs: [{ label: 'Type', value: 'Tobacco-Free Pouch' }, { label: 'Count', value: '20 pouches' }],
    variants: [{ name: '3mg — 20 ct', price: 499 }, { name: '6mg — 20 ct', price: 499 }],
    featured: false,
  },
  'summit-pouches-mint': {
    name: 'Summit Pouches Cool Mint',
    brand: 'Summit Pouches',
    brandSlug: 'summit-pouches',
    category: 'Nicotine Pouches',
    categorySlug: 'nicotine-pouches',
    type: 'Nicotine Pouches',
    price: 499,
    shortDesc: 'Refreshing cool mint nicotine pouches.',
    description: 'Sharp peppermint burst with clean nicotine release in an ultra-discreet slim portion.',
    specs: [{ label: 'Flavor', value: 'Cool Mint' }],
    variants: [{ name: '3mg — 20 ct', price: 499 }, { name: '6mg — 20 ct', price: 499 }, { name: '9mg Strong — 20 ct', price: 549 }],
    featured: false,
  },
  'old-harbor-briar-billiard': {
    name: 'Old Harbor Briar Billiard Pipe',
    brand: 'Old Harbor Pipe Co.',
    brandSlug: 'old-harbor-pipe',
    category: 'Pipes',
    categorySlug: 'pipes',
    type: 'Pipes',
    price: 6995,
    shortDesc: 'Handcrafted Mediterranean briar billiard smoking pipe.',
    description: 'Turned from aged Mediterranean briar burl with vulcanite stem and acrylic tenon, providing decades of cool smoking.',
    specs: [{ label: 'Material', value: 'Italian Briar' }, { label: 'Shape', value: 'Classic Billiard' }, { label: 'Filter', value: '9mm Adaptable' }],
    variants: [{ name: 'Natural Polish', price: 6995 }, { name: 'Rustic Carved', price: 7495 }],
    featured: true,
  },
  'old-harbor-corn-cob': {
    name: 'Old Harbor Corn Cob Pipe',
    brand: 'Old Harbor Pipe Co.',
    brandSlug: 'old-harbor-pipe',
    category: 'Pipes',
    categorySlug: 'pipes',
    type: 'Pipes',
    price: 1495,
    shortDesc: 'Heritage Missouri corn cob smoking pipe.',
    description: 'Authentic cured corn cob with hardwood bottom insert, legendary for sweet, uncolored pipe tasting.',
    specs: [{ label: 'Material', value: 'Aged Corn Cob & Hardwood' }],
    variants: [{ name: 'Regular Bowl', price: 1495 }, { name: 'Large Bowl', price: 1795 }],
    featured: false,
  },
  'old-harbor-meerschaum': {
    name: 'Old Harbor Meerschaum Pipe',
    brand: 'Old Harbor Pipe Co.',
    brandSlug: 'old-harbor-pipe',
    category: 'Pipes',
    categorySlug: 'pipes',
    type: 'Pipes',
    price: 12995,
    shortDesc: 'Block meerschaum pipe hand-carved in Eskisehir.',
    description: 'Carved from single-block Turkish meerschaum that gradually patinas into golden amber as it is smoked.',
    specs: [{ label: 'Material', value: 'Solid Block Meerschaum' }],
    variants: [{ name: 'Standard Smooth', price: 12995 }, { name: 'Master Carve', price: 18995 }],
    featured: false,
  },
  'blue-ridge-rolling-papers': {
    name: 'Blue Ridge Rolling Papers',
    brand: 'Blue Ridge Smoke',
    brandSlug: 'blue-ridge-smoke',
    category: 'Papers & Filters',
    categorySlug: 'papers-filters',
    type: 'Rolling Papers',
    price: 299,
    shortDesc: 'Unbleached wood pulp and hemp rolling papers.',
    description: 'Ultra-thin, slow-burning unbleached papers with natural Arabic gumline for perfect roll integrity.',
    specs: [{ label: 'Size', value: '1¼ Standard' }, { label: 'Count', value: '50 leaves' }],
    variants: [{ name: 'Single Pack (50 ct)', price: 299 }, { name: 'Box of 25 packs', price: 5999 }],
    featured: false,
  },
  'blue-ridge-filter-tips': {
    name: 'Blue Ridge Filter Tips',
    brand: 'Blue Ridge Smoke',
    brandSlug: 'blue-ridge-smoke',
    category: 'Papers & Filters',
    categorySlug: 'papers-filters',
    type: 'Filters',
    price: 199,
    shortDesc: 'Slim cellulose acetate filter tips.',
    description: 'Natural filter tips providing pleasant draw resistance and particulate filtration.',
    specs: [{ label: 'Type', value: 'Slim Filter Tip (6mm)' }, { label: 'Count', value: '120 tips' }],
    variants: [{ name: 'Pack of 120', price: 199 }, { name: 'Bag of 600', price: 799 }],
    featured: false,
  },
  'frontier-king-size-cones': {
    name: 'Frontier King Size Cones',
    brand: 'Frontier Accessories',
    brandSlug: 'frontier-accessories',
    category: 'Papers & Filters',
    categorySlug: 'papers-filters',
    type: 'Pre-Rolled Cones',
    price: 399,
    shortDesc: 'Pre-rolled king size unrefined cones with built-in tip.',
    description: 'Ready-to-fill natural cones ensuring a smooth, even burn every time.',
    specs: [{ label: 'Size', value: 'King Size (109mm)' }, { label: 'Count', value: '6 cones' }],
    variants: [{ name: 'Pack of 6', price: 399 }, { name: 'Box of 50', price: 2499 }],
    featured: false,
  },
  'frontier-torch-lighter': {
    name: 'Frontier Torch Lighter',
    brand: 'Frontier Accessories',
    brandSlug: 'frontier-accessories',
    category: 'Lighters & Matches',
    categorySlug: 'lighters-matches',
    type: 'Lighter',
    price: 2995,
    shortDesc: 'Wind-resistant single jet torch lighter for cigars and pipes.',
    description: 'Durable anodized alloy lighter with precision flame adjuster and fuel viewing window.',
    specs: [{ label: 'Flame Type', value: 'Single Jet Torch' }, { label: 'Fuel', value: 'Refillable Butane' }, { label: 'Warranty', value: 'Lifetime Guarantee' }],
    variants: [{ name: 'Matte Black', price: 2995 }, { name: 'Chrome', price: 3295 }, { name: 'Gunmetal', price: 3295 }],
    featured: false,
  },
  'frontier-triple-jet-lighter': {
    name: 'Frontier Triple Jet Lighter',
    brand: 'Frontier Accessories',
    brandSlug: 'frontier-accessories',
    category: 'Lighters & Matches',
    categorySlug: 'lighters-matches',
    type: 'Lighter',
    price: 4495,
    shortDesc: 'Triple-flame high-altitude cigar torch lighter.',
    description: 'Triple windproof jet flames with fold-out cigar punch cutter built into the weighted metal base.',
    specs: [{ label: 'Flame Type', value: 'Triple Jet Torch' }],
    variants: [{ name: 'Brushed Steel', price: 4495 }, { name: 'Carbon Fiber', price: 5495 }],
    featured: false,
  },
  'frontier-long-matches': {
    name: 'Frontier Long Matches',
    brand: 'Frontier Accessories',
    brandSlug: 'frontier-accessories',
    category: 'Lighters & Matches',
    categorySlug: 'lighters-matches',
    type: 'Matches',
    price: 895,
    shortDesc: 'Extra-long 4-inch cedar matches for gentle lighting.',
    description: 'Slow-burning untreated white pine and cedar matchsticks designed to preserve delicate tobacco flavors.',
    specs: [{ label: 'Length', value: '4 Inches' }, { label: 'Count', value: '150 matches' }],
    variants: [{ name: 'Box of 150', price: 895 }, { name: 'Bundle of 3 Boxes', price: 2395 }],
    featured: false,
  },
  'frontier-humidor-25': {
    name: 'Frontier Desktop Humidor 25-Count',
    brand: 'Frontier Accessories',
    brandSlug: 'frontier-accessories',
    category: 'Humidors & Accessories',
    categorySlug: 'humidors-accessories',
    type: 'Humidor',
    price: 8995,
    shortDesc: 'Spanish cedar lined desktop humidor with digital hygrometer.',
    description: 'Kiln-dried Spanish cedar interior with magnetic seal closure, digital hygrometer, and humidifier disc.',
    specs: [{ label: 'Capacity', value: 'Up to 25 Cigars' }, { label: 'Interior', value: 'Spanish Cedar' }, { label: 'Hygrometer', value: 'Digital Precision' }],
    variants: [{ name: 'Mahogany Finish', price: 8995 }, { name: 'Walnut Finish', price: 9495 }],
    featured: false,
  },
  'frontier-travel-humidor': {
    name: 'Frontier Travel Humidor',
    brand: 'Frontier Accessories',
    brandSlug: 'frontier-accessories',
    category: 'Humidors & Accessories',
    categorySlug: 'humidors-accessories',
    type: 'Humidor',
    price: 3995,
    shortDesc: 'Airtight, crushproof travel humidor for 5 cigars.',
    description: 'Molded ABS polymer case with airtight silicone gasket and custom foam cushioning for secure transit.',
    specs: [{ label: 'Capacity', value: '5 Cigars' }],
    variants: [{ name: 'Matte Black', price: 3995 }, { name: 'Saddle Brown', price: 3995 }],
    featured: false,
  },
}

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const p = PRODUCTS[slug]
  if (!p) return { title: 'Product Not Found' }
  return {
    title: `${p.name} | American Leaf Co.`,
    description: p.shortDesc,
  }
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const p = PRODUCTS[slug]
  if (!p) notFound()

  return (
    <div className="min-h-screen bg-ivory">
      <div className="container-xl py-8">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-secondary">
            <li><Link href="/" className="hover:text-charcoal transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/shop" className="hover:text-charcoal transition-colors">Shop</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/collections/${p.categorySlug}`} className="hover:text-charcoal transition-colors">{p.category}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-charcoal font-medium" aria-current="page">{p.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image & Showcase */}
          <div>
            <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-black flex items-center justify-center border border-border/80 shadow-card overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/40 via-transparent to-transparent opacity-80" />
              <div className="text-center relative z-10 p-8 transform transition-transform duration-300 group-hover:scale-105">
                <div className="w-28 h-28 rounded-2xl border border-gold/40 bg-gold/10 flex items-center justify-center mx-auto mb-4 shadow-lg backdrop-blur-xs">
                  <span className="text-gold font-serif text-5xl font-bold">{p.name.charAt(0)}</span>
                </div>
                <p className="text-white font-serif text-xl tracking-wide font-semibold">{p.name}</p>
                <span className="inline-block mt-2 px-3 py-1 bg-white/10 rounded-full text-emerald-400 text-xs uppercase tracking-wider font-medium">
                  {p.type} &bull; {p.brand}
                </span>
              </div>
            </div>

            {/* Quality Seals */}
            <div className="grid grid-cols-2 gap-3 mt-4">
              <div className="bg-white border border-border/80 rounded-xl p-3 flex items-center gap-3 shadow-xs">
                <Award className="w-5 h-5 text-gold flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-charcoal">Authentic Guarantee</p>
                  <p className="text-[11px] text-secondary">Direct from licensed makers</p>
                </div>
              </div>
              <div className="bg-white border border-border/80 rounded-xl p-3 flex items-center gap-3 shadow-xs">
                <CheckCircle className="w-5 h-5 text-[#22C55E] flex-shrink-0" />
                <div>
                  <p className="text-xs font-semibold text-charcoal">Freshness Sealed</p>
                  <p className="text-[11px] text-secondary">Humidity-controlled storage</p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details & Actions */}
          <div className="bg-white border border-border/80 rounded-2xl p-6 sm:p-8 shadow-card">
            {/* Brand */}
            <div className="mb-2">
              <Link
                href={`/brands/${p.brandSlug}`}
                className="text-secondary text-xs uppercase tracking-widest font-semibold hover:text-[#22C55E] transition-colors"
              >
                {p.brand}
              </Link>
            </div>

            {/* Name */}
            <h1 className="heading-xl text-charcoal mb-3">{p.name}</h1>

            {/* Type + Category */}
            <div className="flex items-center gap-2 mb-6">
              <span className="badge-gray text-xs px-2.5 py-0.5 rounded-full">{p.type}</span>
              <Link href={`/collections/${p.categorySlug}`} className="badge-gold text-xs px-2.5 py-0.5 rounded-full hover:opacity-80 transition-opacity">
                {p.category}
              </Link>
            </div>

            {/* Short desc */}
            <p className="text-secondary leading-relaxed mb-6 text-sm">{p.shortDesc}</p>

            {/* Interactive Buy / Add to Cart Section */}
            <ProductActions
              slug={slug}
              name={p.name}
              brand={p.brand}
              category={p.category}
              variants={p.variants}
              basePrice={p.price}
            />

            {/* FDA Warning */}
            <div className="mt-8 pt-6 border-t border-border/80">
              <div className="flex items-start gap-2.5 p-3.5 bg-neutral-50 rounded-xl border border-neutral-200">
                <ShieldCheck className="w-4 h-4 text-secondary flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-secondary leading-relaxed">
                  <strong className="text-charcoal font-semibold">SURGEON GENERAL&apos;S WARNING:</strong> Tobacco products contain nicotine, an addictive chemical known to increase health risks. Sales restricted strictly to individuals aged 21 and older.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications & Description */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white border border-border/80 rounded-2xl p-6 sm:p-8 shadow-card">
            <h2 className="heading-md text-charcoal mb-4">About {p.name}</h2>
            <p className="text-secondary leading-relaxed text-sm mb-6">{p.description}</p>
            <div className="border-t border-border/80 pt-6">
              <h3 className="text-charcoal font-semibold text-sm mb-4">Product Specifications</h3>
              <dl className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {p.specs.map((spec) => (
                  <div key={spec.label} className="bg-neutral-50 border border-border/70 rounded-xl p-3.5">
                    <dt className="text-secondary text-xs uppercase tracking-wider mb-1">{spec.label}</dt>
                    <dd className="text-charcoal text-sm font-semibold">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="bg-white border border-border/80 rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="text-charcoal font-semibold text-sm">Customer Assurance</h3>
            <div className="space-y-3">
              {[
                { icon: Truck, title: 'Compliant Shipping', desc: 'Ships via certified carriers with required adult signature.', href: '/shipping-policy' },
                { icon: RotateCcw, title: 'Satisfaction Guarantee', desc: 'Hassle-free support on damaged or incorrect shipments.', href: '/returns-policy' },
                { icon: ShieldCheck, title: 'Regulatory Compliance', desc: '100% compliant with state and federal tobacco statutes.', href: '/legal/tobacco-disclosures' },
              ].map(({ icon: Icon, title, desc, href }) => (
                <Link key={title} href={href} className="flex items-start gap-3 p-3 rounded-xl border border-transparent hover:border-border hover:bg-neutral-50 transition-all">
                  <Icon className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-charcoal">{title}</h4>
                    <p className="text-[11px] text-secondary mt-0.5 leading-snug">{desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Back to shop */}
        <div className="mt-8">
          <Link href={`/shop?category=${p.categorySlug}`} className="btn-secondary">
            &larr; Back to {p.category}
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map(slug => ({ slug }))
}
