import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShieldCheck, AlertTriangle, Package, Truck, RotateCcw } from 'lucide-react'

const PRODUCTS: Record<string, {
  name: string; brand: string; brandSlug: string; category: string; categorySlug: string
  type: string; price: number; description: string; shortDesc: string
  specs: { label: string; value: string }[]
  variants: { name: string; price: number }[]
  featured: boolean
}> = {
  'blue-ridge-classic-king': { name: 'Blue Ridge Classic King Size (Demo)', brand: 'Blue Ridge Smoke', brandSlug: 'blue-ridge-smoke', category: 'Cigarettes', categorySlug: 'cigarettes', type: 'Cigarettes', price: 1099, shortDesc: 'Full-flavor king size cigarettes — American blend.', description: 'DEMONSTRATION DATA ONLY. This is a fictional product entry. Do not interpret as a real product available for purchase.', specs: [{ label: 'Format', value: 'King Size' }, { label: 'Blend', value: 'American (Demo)' }, { label: 'Pack Count', value: '20 cigarettes' }], variants: [{ name: 'Single Pack', price: 1099 }, { name: 'Carton (10 packs)', price: 9999 }], featured: true },
  'blue-ridge-menthol-100s': { name: 'Blue Ridge Menthol 100s (Demo)', brand: 'Blue Ridge Smoke', brandSlug: 'blue-ridge-smoke', category: 'Cigarettes', categorySlug: 'cigarettes', type: 'Cigarettes', price: 1149, shortDesc: 'Menthol 100mm cigarettes.', description: 'DEMONSTRATION DATA ONLY. Fictional product entry.', specs: [{ label: 'Format', value: '100mm' }, { label: 'Style', value: 'Menthol (Demo)' }], variants: [{ name: 'Single Pack', price: 1149 }, { name: 'Carton (10 packs)', price: 10499 }], featured: false },
  'blue-ridge-light-king': { name: 'Blue Ridge Light King (Demo)', brand: 'Blue Ridge Smoke', brandSlug: 'blue-ridge-smoke', category: 'Cigarettes', categorySlug: 'cigarettes', type: 'Cigarettes', price: 1099, shortDesc: 'Lower-tar king size variant.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Format', value: 'King Size' }, { label: 'Style', value: 'Light (Demo)' }], variants: [{ name: 'Single Pack', price: 1099 }, { name: 'Carton (10 packs)', price: 9799 }], featured: false },
  'coronado-reserve-robusto': { name: 'Coronado Reserve Robusto (Demo)', brand: 'Coronado Leaf', brandSlug: 'coronado-leaf', category: 'Cigars', categorySlug: 'cigars', type: 'Cigars', price: 1895, shortDesc: 'Hand-rolled robusto, fictional blend.', description: 'DEMONSTRATION DATA ONLY. All specifications are illustrative.', specs: [{ label: 'Format', value: 'Robusto' }, { label: 'Size', value: '5 × 50' }, { label: 'Strength', value: 'Medium (Demo)' }], variants: [{ name: 'Single Cigar', price: 1895 }, { name: 'Box of 20', price: 33999 }, { name: 'Box of 5 (Sampler)', price: 8999 }], featured: true },
  'coronado-churchill-natural': { name: 'Coronado Churchill Natural (Demo)', brand: 'Coronado Leaf', brandSlug: 'coronado-leaf', category: 'Cigars', categorySlug: 'cigars', type: 'Cigars', price: 2495, shortDesc: 'Full-size Churchill format.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Format', value: 'Churchill' }, { label: 'Size', value: '7 × 47' }, { label: 'Strength', value: 'Medium-Full (Demo)' }], variants: [{ name: 'Single Cigar', price: 2495 }, { name: 'Box of 25', price: 54999 }], featured: true },
  'coronado-toro-maduro': { name: 'Coronado Toro Maduro (Demo)', brand: 'Coronado Leaf', brandSlug: 'coronado-leaf', category: 'Cigars', categorySlug: 'cigars', type: 'Cigars', price: 2195, shortDesc: 'Toro format with dark maduro wrapper.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Format', value: 'Toro' }, { label: 'Size', value: '6 × 52' }, { label: 'Wrapper', value: 'Maduro (Demo)' }], variants: [{ name: 'Single Cigar', price: 2195 }, { name: 'Box of 20', price: 38999 }], featured: false },
  'coronado-belicoso-claro': { name: 'Coronado Belicoso Claro (Demo)', brand: 'Coronado Leaf', brandSlug: 'coronado-leaf', category: 'Cigars', categorySlug: 'cigars', type: 'Cigars', price: 1995, shortDesc: 'Torpedo-style belicoso.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Format', value: 'Belicoso' }, { label: 'Size', value: '5.5 × 52' }], variants: [{ name: 'Single Cigar', price: 1995 }, { name: 'Box of 20', price: 35999 }], featured: false },
  'coronado-perfecto-vintage': { name: 'Coronado Perfecto Vintage (Demo)', brand: 'Coronado Leaf', brandSlug: 'coronado-leaf', category: 'Cigars', categorySlug: 'cigars', type: 'Cigars', price: 2295, shortDesc: 'Classic perfecto shape.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Format', value: 'Perfecto' }, { label: 'Strength', value: 'Medium (Demo)' }], variants: [{ name: 'Single Cigar', price: 2295 }, { name: 'Box of 10', price: 19999 }], featured: false },
  'coronado-mini-cigarillos': { name: 'Coronado Mini Cigarillos (Demo)', brand: 'Coronado Leaf', brandSlug: 'coronado-leaf', category: 'Cigarillos', categorySlug: 'cigarillos', type: 'Cigarillos', price: 799, shortDesc: 'Small-format cigarillos, pack of 10.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Count', value: '10 cigarillos' }], variants: [{ name: 'Pack of 10', price: 799 }, { name: 'Box of 20 packs', price: 13999 }], featured: false },
  'appalachian-english-no1': { name: 'Appalachian English Blend No. 1 (Demo)', brand: 'Appalachian Reserve', brandSlug: 'appalachian-reserve', category: 'Pipe Tobacco', categorySlug: 'pipe-tobacco', type: 'Pipe Tobacco', price: 1895, shortDesc: 'Classic English-style pipe tobacco blend.', description: 'DEMONSTRATION DATA ONLY. Blend composition is illustrative only.', specs: [{ label: 'Blend Style', value: 'English (Demo)' }, { label: 'Cut', value: 'Ribbon (Demo)' }, { label: 'Tin Weight', value: '50g' }], variants: [{ name: '50g Tin', price: 1895 }, { name: '100g Pouch', price: 3295 }, { name: '250g Bulk', price: 7295 }], featured: true },
  'appalachian-virginia-flake': { name: 'Appalachian Virginia Flake (Demo)', brand: 'Appalachian Reserve', brandSlug: 'appalachian-reserve', category: 'Pipe Tobacco', categorySlug: 'pipe-tobacco', type: 'Pipe Tobacco', price: 2095, shortDesc: 'Pressed Virginia flake.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Blend Style', value: 'Virginia Flake (Demo)' }, { label: 'Tin Weight', value: '50g' }], variants: [{ name: '50g Tin', price: 2095 }, { name: '100g Pouch', price: 3695 }], featured: false },
  'appalachian-aromatic-cherry': { name: 'Appalachian Aromatic Cherry (Demo)', brand: 'Appalachian Reserve', brandSlug: 'appalachian-reserve', category: 'Pipe Tobacco', categorySlug: 'pipe-tobacco', type: 'Pipe Tobacco', price: 1695, shortDesc: 'Aromatic cherry-flavored pipe tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Blend Style', value: 'Aromatic (Demo)' }, { label: 'Flavor', value: 'Cherry (Demo)' }], variants: [{ name: '50g Tin', price: 1695 }, { name: '100g Pouch', price: 2995 }], featured: false },
  'appalachian-balkan-blend': { name: 'Appalachian Balkan Blend (Demo)', brand: 'Appalachian Reserve', brandSlug: 'appalachian-reserve', category: 'Pipe Tobacco', categorySlug: 'pipe-tobacco', type: 'Pipe Tobacco', price: 2295, shortDesc: 'Balkan-style pipe tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Blend Style', value: 'Balkan (Demo)' }, { label: 'Tin Weight', value: '50g' }], variants: [{ name: '50g Tin', price: 2295 }, { name: '100g Tin', price: 4195 }], featured: false },
  'appalachian-burley-dark': { name: 'Appalachian Burley Dark (Demo)', brand: 'Appalachian Reserve', brandSlug: 'appalachian-reserve', category: 'Pipe Tobacco', categorySlug: 'pipe-tobacco', type: 'Pipe Tobacco', price: 1995, shortDesc: 'Dark-fired Burley pipe tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Blend Style', value: 'Burley (Demo)' }], variants: [{ name: '50g Tin', price: 1995 }, { name: '100g Pouch', price: 3495 }], featured: false },
  'old-harbor-english-no4': { name: 'Old Harbor English No. 4 (Demo)', brand: 'Old Harbor Pipe Co.', brandSlug: 'old-harbor-pipe', category: 'Pipe Tobacco', categorySlug: 'pipe-tobacco', type: 'Pipe Tobacco', price: 2495, shortDesc: 'Signature English pipe tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Blend Style', value: 'English (Demo)' }, { label: 'Tin Weight', value: '50g' }], variants: [{ name: '50g Tin', price: 2495 }, { name: '100g Tin', price: 4595 }], featured: true },
  'blue-ridge-ryo-blend': { name: 'Blue Ridge RYO Blend (Demo)', brand: 'Blue Ridge Smoke', brandSlug: 'blue-ridge-smoke', category: 'Rolling Tobacco', categorySlug: 'rolling-tobacco', type: 'Rolling Tobacco', price: 1495, shortDesc: 'Fine-cut roll-your-own tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Cut', value: 'Fine Cut (Demo)' }, { label: 'Weight', value: '30g' }], variants: [{ name: '30g Pouch', price: 1495 }, { name: '150g Bag', price: 6495 }], featured: false },
  'appalachian-ryo-premium': { name: 'Appalachian RYO Premium (Demo)', brand: 'Appalachian Reserve', brandSlug: 'appalachian-reserve', category: 'Rolling Tobacco', categorySlug: 'rolling-tobacco', type: 'Rolling Tobacco', price: 1895, shortDesc: 'Premium cut rolling tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Cut', value: 'Medium Cut (Demo)' }, { label: 'Weight', value: '40g' }], variants: [{ name: '40g Pouch', price: 1895 }, { name: '200g Bag', price: 8495 }], featured: false },
  'pacific-coast-double-apple': { name: 'Pacific Coast Double Apple (Demo)', brand: 'Pacific Coast Hookah', brandSlug: 'pacific-coast-hookah', category: 'Hookah Tobacco', categorySlug: 'hookah-tobacco', type: 'Hookah Tobacco', price: 1295, shortDesc: 'Double apple flavored hookah tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Flavor', value: 'Double Apple (Demo)' }, { label: 'Weight', value: '100g' }], variants: [{ name: '100g Pack', price: 1295 }, { name: '250g Pack', price: 2795 }, { name: '1kg Pack', price: 9995 }], featured: false },
  'pacific-coast-mint': { name: 'Pacific Coast Mint (Demo)', brand: 'Pacific Coast Hookah', brandSlug: 'pacific-coast-hookah', category: 'Hookah Tobacco', categorySlug: 'hookah-tobacco', type: 'Hookah Tobacco', price: 1195, shortDesc: 'Fresh mint hookah tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Flavor', value: 'Mint (Demo)' }], variants: [{ name: '100g Pack', price: 1195 }, { name: '250g Pack', price: 2595 }], featured: false },
  'pacific-coast-watermelon': { name: 'Pacific Coast Watermelon (Demo)', brand: 'Pacific Coast Hookah', brandSlug: 'pacific-coast-hookah', category: 'Hookah Tobacco', categorySlug: 'hookah-tobacco', type: 'Hookah Tobacco', price: 1295, shortDesc: 'Watermelon flavored hookah tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Flavor', value: 'Watermelon (Demo)' }], variants: [{ name: '100g Pack', price: 1295 }, { name: '250g Pack', price: 2795 }], featured: false },
  'canyon-creek-long-cut': { name: 'Canyon Creek Long Cut (Demo)', brand: 'Canyon Creek Tobacco', brandSlug: 'canyon-creek', category: 'Smokeless Tobacco', categorySlug: 'smokeless-tobacco', type: 'Chewing Tobacco', price: 595, shortDesc: 'Long-cut chewing tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Cut', value: 'Long Cut (Demo)' }, { label: 'Weight', value: '1.2 oz' }], variants: [{ name: 'Single Can', price: 595 }, { name: 'Roll (5 cans)', price: 2699 }], featured: false },
  'canyon-creek-dip-fine-cut': { name: 'Canyon Creek Dip Fine Cut (Demo)', brand: 'Canyon Creek Tobacco', brandSlug: 'canyon-creek', category: 'Smokeless Tobacco', categorySlug: 'smokeless-tobacco', type: 'Dip', price: 495, shortDesc: 'Fine-cut dip tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Cut', value: 'Fine Cut (Demo)' }], variants: [{ name: 'Single Can', price: 495 }, { name: 'Roll (5 cans)', price: 2299 }], featured: false },
  'canyon-creek-moist-snuff': { name: 'Canyon Creek Moist Snuff (Demo)', brand: 'Canyon Creek Tobacco', brandSlug: 'canyon-creek', category: 'Smokeless Tobacco', categorySlug: 'smokeless-tobacco', type: 'Snuff', price: 545, shortDesc: 'Moist snuff.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Type', value: 'Moist Snuff (Demo)' }], variants: [{ name: 'Long Cut', price: 545 }, { name: 'Fine Cut', price: 545 }], featured: false },
  'canyon-creek-wintergreen-dip': { name: 'Canyon Creek Wintergreen Dip (Demo)', brand: 'Canyon Creek Tobacco', brandSlug: 'canyon-creek', category: 'Smokeless Tobacco', categorySlug: 'smokeless-tobacco', type: 'Dip', price: 495, shortDesc: 'Wintergreen-flavored dip.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Flavor', value: 'Wintergreen (Demo)' }], variants: [{ name: 'Single Can', price: 495 }, { name: 'Roll (5 cans)', price: 2299 }], featured: false },
  'canyon-creek-straight-plug': { name: 'Canyon Creek Straight Plug (Demo)', brand: 'Canyon Creek Tobacco', brandSlug: 'canyon-creek', category: 'Smokeless Tobacco', categorySlug: 'smokeless-tobacco', type: 'Chewing Tobacco', price: 649, shortDesc: 'Traditional plug chewing tobacco.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Form', value: 'Plug (Demo)' }], variants: [{ name: 'Single Plug (3 oz)', price: 649 }], featured: false },
  'canyon-creek-snus': { name: 'Canyon Creek Snus Pouches (Demo)', brand: 'Canyon Creek Tobacco', brandSlug: 'canyon-creek', category: 'Smokeless Tobacco', categorySlug: 'smokeless-tobacco', type: 'Snus', price: 699, shortDesc: 'Pasteurized snus pouches.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Type', value: 'Snus (Demo)' }, { label: 'Count', value: '24 pouches' }], variants: [{ name: 'Mint — 24 ct', price: 699 }, { name: 'Original — 24 ct', price: 699 }], featured: false },
  'summit-pouches-original': { name: 'Summit Pouches Original (Demo)', brand: 'Summit Pouches', brandSlug: 'summit-pouches', category: 'Nicotine Pouches', categorySlug: 'nicotine-pouches', type: 'Nicotine Pouches', price: 499, shortDesc: 'Tobacco-free nicotine pouches.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Type', value: 'Nicotine Pouch (Tobacco-Free) (Demo)' }, { label: 'Count', value: '20 pouches' }], variants: [{ name: '3mg — 20 ct', price: 499 }, { name: '6mg — 20 ct', price: 499 }], featured: false },
  'summit-pouches-mint': { name: 'Summit Pouches Cool Mint (Demo)', brand: 'Summit Pouches', brandSlug: 'summit-pouches', category: 'Nicotine Pouches', categorySlug: 'nicotine-pouches', type: 'Nicotine Pouches', price: 499, shortDesc: 'Cool mint nicotine pouches.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Flavor', value: 'Cool Mint (Demo)' }], variants: [{ name: '3mg — 20 ct', price: 499 }, { name: '6mg — 20 ct', price: 499 }, { name: '9mg Strong — 20 ct', price: 549 }], featured: false },
  'old-harbor-briar-billiard': { name: 'Old Harbor Briar Billiard Pipe (Demo)', brand: 'Old Harbor Pipe Co.', brandSlug: 'old-harbor-pipe', category: 'Pipes', categorySlug: 'pipes', type: 'Pipes', price: 6995, shortDesc: 'Handcrafted briar billiard smoking pipe.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Material', value: 'Briar (Demo)' }, { label: 'Shape', value: 'Billiard (Demo)' }, { label: 'Filter', value: '9mm (Demo)' }], variants: [{ name: 'Natural Finish', price: 6995 }, { name: 'Rustic Finish', price: 7495 }], featured: true },
  'old-harbor-corn-cob': { name: 'Old Harbor Corn Cob Pipe (Demo)', brand: 'Old Harbor Pipe Co.', brandSlug: 'old-harbor-pipe', category: 'Pipes', categorySlug: 'pipes', type: 'Pipes', price: 1495, shortDesc: 'Classic American corn cob pipe.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Material', value: 'Corn Cob (Demo)' }], variants: [{ name: 'Regular Bowl', price: 1495 }, { name: 'Large Bowl', price: 1795 }], featured: false },
  'old-harbor-meerschaum': { name: 'Old Harbor Meerschaum Pipe (Demo)', brand: 'Old Harbor Pipe Co.', brandSlug: 'old-harbor-pipe', category: 'Pipes', categorySlug: 'pipes', type: 'Pipes', price: 12995, shortDesc: 'Hand-carved meerschaum pipe.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Material', value: 'Meerschaum (Demo)' }], variants: [{ name: 'Standard Carve', price: 12995 }, { name: 'Premium Carve', price: 18995 }], featured: false },
  'blue-ridge-rolling-papers': { name: 'Blue Ridge Rolling Papers (Demo)', brand: 'Blue Ridge Smoke', brandSlug: 'blue-ridge-smoke', category: 'Papers & Filters', categorySlug: 'papers-filters', type: 'Rolling Papers', price: 299, shortDesc: 'Single-wide rolling papers.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Size', value: '1¼ Single Wide (Demo)' }, { label: 'Count', value: '50 leaves' }], variants: [{ name: 'Single Pack (50 ct)', price: 299 }, { name: 'Box of 25 packs', price: 5999 }], featured: false },
  'blue-ridge-filter-tips': { name: 'Blue Ridge Filter Tips (Demo)', brand: 'Blue Ridge Smoke', brandSlug: 'blue-ridge-smoke', category: 'Papers & Filters', categorySlug: 'papers-filters', type: 'Filters', price: 199, shortDesc: 'Slim filter tips for rolling.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Type', value: 'Slim Filter Tip (Demo)' }, { label: 'Count', value: '120 tips' }], variants: [{ name: 'Pack of 120', price: 199 }, { name: 'Bag of 600', price: 799 }], featured: false },
  'frontier-king-size-cones': { name: 'Frontier King Size Cones (Demo)', brand: 'Frontier Accessories', brandSlug: 'frontier-accessories', category: 'Papers & Filters', categorySlug: 'papers-filters', type: 'Pre-Rolled Cones', price: 399, shortDesc: 'Pre-rolled King Size cones.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Size', value: 'King Size (Demo)' }, { label: 'Count', value: '6 cones' }], variants: [{ name: 'Pack of 6', price: 399 }, { name: 'Box of 50', price: 2499 }], featured: false },
  'frontier-torch-lighter': { name: 'Frontier Torch Lighter (Demo)', brand: 'Frontier Accessories', brandSlug: 'frontier-accessories', category: 'Lighters & Matches', categorySlug: 'lighters-matches', type: 'Lighter', price: 2995, shortDesc: 'Single-flame torch lighter for cigars.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Flame Type', value: 'Single Torch (Demo)' }, { label: 'Fuel', value: 'Butane (Demo)' }, { label: 'Refillable', value: 'Yes (Demo)' }], variants: [{ name: 'Matte Black', price: 2995 }, { name: 'Chrome', price: 3295 }, { name: 'Gunmetal', price: 3295 }], featured: false },
  'frontier-triple-jet-lighter': { name: 'Frontier Triple Jet Lighter (Demo)', brand: 'Frontier Accessories', brandSlug: 'frontier-accessories', category: 'Lighters & Matches', categorySlug: 'lighters-matches', type: 'Lighter', price: 4495, shortDesc: 'Triple-jet torch lighter.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Flame Type', value: 'Triple Jet (Demo)' }], variants: [{ name: 'Brushed Steel', price: 4495 }, { name: 'Carbon Fiber', price: 5495 }], featured: false },
  'frontier-long-matches': { name: 'Frontier Long Matches (Demo)', brand: 'Frontier Accessories', brandSlug: 'frontier-accessories', category: 'Lighters & Matches', categorySlug: 'lighters-matches', type: 'Matches', price: 895, shortDesc: 'Extra-long wooden matches for pipes and cigars.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Length', value: '4 in (Demo)' }, { label: 'Count', value: '150 matches' }], variants: [{ name: 'Box of 150', price: 895 }, { name: 'Bundle of 3 Boxes', price: 2395 }], featured: false },
  'frontier-humidor-25': { name: 'Frontier Desktop Humidor 25-Count (Demo)', brand: 'Frontier Accessories', brandSlug: 'frontier-accessories', category: 'Humidors & Accessories', categorySlug: 'humidors-accessories', type: 'Humidor', price: 8995, shortDesc: 'Desktop humidor for up to 25 cigars.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Capacity', value: '25 cigars (Demo)' }, { label: 'Interior', value: 'Spanish Cedar (Demo)' }, { label: 'Hygrometer', value: 'Included (Demo)' }], variants: [{ name: 'Mahogany Finish', price: 8995 }, { name: 'Walnut Finish', price: 9495 }], featured: false },
  'frontier-travel-humidor': { name: 'Frontier Travel Humidor (Demo)', brand: 'Frontier Accessories', brandSlug: 'frontier-accessories', category: 'Humidors & Accessories', categorySlug: 'humidors-accessories', type: 'Humidor', price: 3995, shortDesc: 'Portable travel humidor for 5 cigars.', description: 'DEMONSTRATION DATA ONLY.', specs: [{ label: 'Capacity', value: '5 cigars (Demo)' }], variants: [{ name: 'Black', price: 3995 }, { name: 'Brown', price: 3995 }], featured: false },
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const p = PRODUCTS[slug]
  if (!p) return { title: 'Product Not Found' }
  return {
    title: p.name,
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
            <li><Link href="/" className="hover:text-charcoal">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href="/shop" className="hover:text-charcoal">Shop</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link href={`/collections/${p.categorySlug}`} className="hover:text-charcoal">{p.category}</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-charcoal font-medium" aria-current="page">{p.name}</li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div>
            <div className="aspect-square rounded-lg bg-gradient-to-br from-charcoal-800 to-charcoal flex items-center justify-center border border-border">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-gold font-serif text-4xl font-bold">{p.name.charAt(0)}</span>
                </div>
                <p className="text-white/40 text-sm">{p.type}</p>
                <p className="text-white/20 text-xs mt-1">Demo Image Placeholder</p>
              </div>
            </div>
            <p className="text-secondary text-xs text-center mt-3">Placeholder — no real product image</p>
          </div>

          {/* Info */}
          <div>
            {/* Demo badge */}
            <div className="demo-banner mb-4">
              ⚠ DEMONSTRATION DATA — This is a fictional product. Not available for purchase.
            </div>

            {/* Brand */}
            <Link
              href={`/brands/${p.brandSlug}`}
              className="text-secondary text-sm hover:text-gold transition-colors"
            >
              {p.brand}
            </Link>

            {/* Name */}
            <h1 className="heading-xl text-charcoal mt-1 mb-2">{p.name}</h1>

            {/* Type + Category */}
            <div className="flex items-center gap-2 mb-4">
              <span className="badge-gray">{p.type}</span>
              <Link href={`/collections/${p.categorySlug}`} className="badge-gold hover:opacity-80 transition-opacity">
                {p.category}
              </Link>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="text-3xl font-bold font-serif text-charcoal">
                {formatPrice(p.price)}
              </span>
              <span className="text-secondary text-sm ml-2">starting from</span>
            </div>

            {/* Short desc */}
            <p className="text-secondary leading-relaxed mb-6">{p.shortDesc}</p>

            {/* Variants */}
            <div className="mb-6">
              <h2 className="text-charcoal font-semibold text-sm mb-3">Available Options</h2>
              <div className="flex flex-wrap gap-2">
                {p.variants.map((v) => (
                  <div
                    key={v.name}
                    className="border border-border rounded px-3 py-2 bg-white text-sm"
                  >
                    <span className="text-charcoal font-medium">{v.name}</span>
                    <span className="text-secondary ml-2">{formatPrice(v.price)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Purchasing disabled */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 mb-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-amber-800 font-semibold text-sm mb-1">Purchasing Currently Unavailable</p>
                  <p className="text-amber-700 text-xs leading-relaxed">
                    This catalogue is in demonstration mode. Real transactions are not available
                    until business licensing, compliance review, and payment processing are configured.
                  </p>
                </div>
              </div>
            </div>

            {/* FDA Warning */}
            <div className="fda-warning mb-6">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs leading-relaxed">
                  <strong>WARNING:</strong> This product contains nicotine. Nicotine is an addictive chemical.
                  Tobacco products may cause cancer and other serious conditions.
                </p>
              </div>
            </div>

            {/* Specs */}
            <div className="border-t border-border pt-6">
              <h2 className="text-charcoal font-semibold text-sm mb-4">Specifications</h2>
              <dl className="grid grid-cols-2 gap-3">
                {p.specs.map((spec) => (
                  <div key={spec.label} className="bg-white border border-border rounded p-3">
                    <dt className="text-secondary text-xs mb-0.5">{spec.label}</dt>
                    <dd className="text-charcoal text-sm font-medium">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Policy links */}
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { icon: Truck, label: 'Shipping Info', href: '/shipping-policy' },
                { icon: RotateCcw, label: 'Returns', href: '/returns-policy' },
                { icon: ShieldCheck, label: 'Compliance', href: '/legal/tobacco-disclosures' },
              ].map(({ icon: Icon, label, href }) => (
                <Link key={href} href={href} className="flex flex-col items-center gap-1 p-3 bg-white border border-border rounded hover:border-gold/30 transition-colors text-center">
                  <Icon className="w-4 h-4 text-secondary" aria-hidden="true" />
                  <span className="text-xs text-secondary">{label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="heading-md text-charcoal mb-4">Product Description</h2>
          <div className="bg-amber-50 border border-amber-200 rounded p-4 mb-4">
            <p className="text-amber-800 text-sm font-medium">⚠ Demonstration Data</p>
            <p className="text-amber-700 text-xs mt-1">{p.description}</p>
          </div>
        </div>

        {/* Back to shop */}
        <div className="mt-8">
          <Link href={`/shop?category=${p.categorySlug}`} className="btn-secondary">
            ← Back to {p.category}
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(PRODUCTS).map(slug => ({ slug }))
}
