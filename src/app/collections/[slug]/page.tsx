import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCard } from '@/components/product/ProductCard'

const collectionMeta: Record<string, { name: string; description: string; productType: string }> = {
  cigarettes: { name: 'Cigarettes', description: 'Premium domestic cigarettes — king size, menthol, and light varieties.', productType: 'Cigarettes' },
  cigars: { name: 'Cigars', description: 'Hand-rolled and machine-made cigars. Robusto, Churchill, Toro, Belicoso, Perfecto formats.', productType: 'Cigars' },
  cigarillos: { name: 'Cigarillos', description: 'Small-format cigars offering a refined, shorter smoke.', productType: 'Cigarillos' },
  'pipe-tobacco': { name: 'Pipe Tobacco', description: 'Aromatic, English, Balkan, Virginia, and Burley blends for discerning pipe smokers.', productType: 'Pipe Tobacco' },
  'rolling-tobacco': { name: 'Rolling Tobacco', description: 'Fine-cut and premium blends for hand-rolling.', productType: 'Rolling Tobacco' },
  'hookah-tobacco': { name: 'Hookah Tobacco', description: 'Moist, flavored tobacco designed for hookah and shisha use.', productType: 'Hookah Tobacco' },
  'smokeless-tobacco': { name: 'Smokeless Tobacco', description: 'Chewing tobacco, dip, moist snuff, and snus products.', productType: 'Smokeless' },
  'nicotine-pouches': { name: 'Nicotine Pouches', description: 'Tobacco-free nicotine pouches and dissolvable products.', productType: 'Nicotine Pouches' },
  pipes: { name: 'Pipes', description: 'Briar, meerschaum, and corn cob smoking pipes.', productType: 'Pipes' },
  'papers-filters': { name: 'Papers & Filters', description: 'Rolling papers, filter tips, and pre-rolled cones.', productType: 'Papers' },
  'lighters-matches': { name: 'Lighters & Matches', description: 'Torch lighters, soft-flame lighters, and premium long matches.', productType: 'Lighters' },
  'humidors-accessories': { name: 'Humidors & Accessories', description: 'Desktop and travel humidors, hygrometers, and cigar accessories.', productType: 'Humidors' },
}

const PRODUCTS_BY_COLLECTION = [
  { slug: 'blue-ridge-classic-king', name: 'Blue Ridge Classic King Size', brand: 'Blue Ridge Smoke', type: 'Cigarettes', price: 1099, category: 'cigarettes' },
  { slug: 'blue-ridge-menthol-100s', name: 'Blue Ridge Menthol 100s', brand: 'Blue Ridge Smoke', type: 'Cigarettes', price: 1149, category: 'cigarettes' },
  { slug: 'blue-ridge-light-king', name: 'Blue Ridge Light King', brand: 'Blue Ridge Smoke', type: 'Cigarettes', price: 1099, category: 'cigarettes' },
  { slug: 'coronado-reserve-robusto', name: 'Coronado Reserve Robusto', brand: 'Coronado Leaf', type: 'Cigars', price: 1895, category: 'cigars' },
  { slug: 'coronado-churchill-natural', name: 'Coronado Churchill Natural', brand: 'Coronado Leaf', type: 'Cigars', price: 2495, category: 'cigars' },
  { slug: 'coronado-toro-maduro', name: 'Coronado Toro Maduro', brand: 'Coronado Leaf', type: 'Cigars', price: 2195, category: 'cigars' },
  { slug: 'coronado-belicoso-claro', name: 'Coronado Belicoso Claro', brand: 'Coronado Leaf', type: 'Cigars', price: 1995, category: 'cigars' },
  { slug: 'coronado-perfecto-vintage', name: 'Coronado Perfecto Vintage', brand: 'Coronado Leaf', type: 'Cigars', price: 2295, category: 'cigars' },
  { slug: 'coronado-mini-cigarillos', name: 'Coronado Mini Cigarillos', brand: 'Coronado Leaf', type: 'Cigarillos', price: 799, category: 'cigarillos' },
  { slug: 'appalachian-english-no1', name: 'Appalachian English Blend No. 1', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 1895, category: 'pipe-tobacco' },
  { slug: 'appalachian-virginia-flake', name: 'Appalachian Virginia Flake', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 2095, category: 'pipe-tobacco' },
  { slug: 'appalachian-aromatic-cherry', name: 'Appalachian Aromatic Cherry', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 1695, category: 'pipe-tobacco' },
  { slug: 'appalachian-balkan-blend', name: 'Appalachian Balkan Blend', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 2295, category: 'pipe-tobacco' },
  { slug: 'appalachian-burley-dark', name: 'Appalachian Burley Dark', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 1995, category: 'pipe-tobacco' },
  { slug: 'old-harbor-english-no4', name: 'Old Harbor English No. 4', brand: 'Old Harbor Pipe Co.', type: 'Pipe Tobacco', price: 2495, category: 'pipe-tobacco' },
  { slug: 'blue-ridge-ryo-blend', name: 'Blue Ridge RYO Blend', brand: 'Blue Ridge Smoke', type: 'Rolling Tobacco', price: 1495, category: 'rolling-tobacco' },
  { slug: 'appalachian-ryo-premium', name: 'Appalachian RYO Premium', brand: 'Appalachian Reserve', type: 'Rolling Tobacco', price: 1895, category: 'rolling-tobacco' },
  { slug: 'pacific-coast-double-apple', name: 'Pacific Coast Double Apple', brand: 'Pacific Coast Hookah', type: 'Hookah Tobacco', price: 1295, category: 'hookah-tobacco' },
  { slug: 'pacific-coast-mint', name: 'Pacific Coast Mint', brand: 'Pacific Coast Hookah', type: 'Hookah Tobacco', price: 1195, category: 'hookah-tobacco' },
  { slug: 'pacific-coast-watermelon', name: 'Pacific Coast Watermelon', brand: 'Pacific Coast Hookah', type: 'Hookah Tobacco', price: 1295, category: 'hookah-tobacco' },
  { slug: 'canyon-creek-long-cut', name: 'Canyon Creek Long Cut', brand: 'Canyon Creek Tobacco', type: 'Chewing Tobacco', price: 595, category: 'smokeless-tobacco' },
  { slug: 'canyon-creek-dip-fine-cut', name: 'Canyon Creek Dip Fine Cut', brand: 'Canyon Creek Tobacco', type: 'Dip', price: 495, category: 'smokeless-tobacco' },
  { slug: 'canyon-creek-moist-snuff', name: 'Canyon Creek Moist Snuff', brand: 'Canyon Creek Tobacco', type: 'Snuff', price: 545, category: 'smokeless-tobacco' },
  { slug: 'canyon-creek-wintergreen-dip', name: 'Canyon Creek Wintergreen Dip', brand: 'Canyon Creek Tobacco', type: 'Dip', price: 495, category: 'smokeless-tobacco' },
  { slug: 'canyon-creek-straight-plug', name: 'Canyon Creek Straight Plug', brand: 'Canyon Creek Tobacco', type: 'Chewing Tobacco', price: 649, category: 'smokeless-tobacco' },
  { slug: 'canyon-creek-snus', name: 'Canyon Creek Snus Pouches', brand: 'Canyon Creek Tobacco', type: 'Snus', price: 699, category: 'smokeless-tobacco' },
  { slug: 'summit-pouches-original', name: 'Summit Pouches Original', brand: 'Summit Pouches', type: 'Nicotine Pouches', price: 499, category: 'nicotine-pouches' },
  { slug: 'summit-pouches-mint', name: 'Summit Pouches Cool Mint', brand: 'Summit Pouches', type: 'Nicotine Pouches', price: 499, category: 'nicotine-pouches' },
  { slug: 'old-harbor-briar-billiard', name: 'Old Harbor Briar Billiard Pipe', brand: 'Old Harbor Pipe Co.', type: 'Pipes', price: 6995, category: 'pipes' },
  { slug: 'old-harbor-corn-cob', name: 'Old Harbor Corn Cob Pipe', brand: 'Old Harbor Pipe Co.', type: 'Pipes', price: 1495, category: 'pipes' },
  { slug: 'old-harbor-meerschaum', name: 'Old Harbor Meerschaum Pipe', brand: 'Old Harbor Pipe Co.', type: 'Pipes', price: 12995, category: 'pipes' },
  { slug: 'blue-ridge-rolling-papers', name: 'Blue Ridge Rolling Papers', brand: 'Blue Ridge Smoke', type: 'Rolling Papers', price: 299, category: 'papers-filters' },
  { slug: 'blue-ridge-filter-tips', name: 'Blue Ridge Filter Tips', brand: 'Blue Ridge Smoke', type: 'Filters', price: 199, category: 'papers-filters' },
  { slug: 'frontier-king-size-cones', name: 'Frontier King Size Cones', brand: 'Frontier Accessories', type: 'Pre-Rolled Cones', price: 399, category: 'papers-filters' },
  { slug: 'frontier-torch-lighter', name: 'Frontier Torch Lighter', brand: 'Frontier Accessories', type: 'Lighter', price: 2995, category: 'lighters-matches' },
  { slug: 'frontier-triple-jet-lighter', name: 'Frontier Triple Jet Lighter', brand: 'Frontier Accessories', type: 'Lighter', price: 4495, category: 'lighters-matches' },
  { slug: 'frontier-long-matches', name: 'Frontier Long Matches', brand: 'Frontier Accessories', type: 'Matches', price: 895, category: 'lighters-matches' },
  { slug: 'frontier-humidor-25', name: 'Frontier Desktop Humidor 25-Count', brand: 'Frontier Accessories', type: 'Humidor', price: 8995, category: 'humidors-accessories' },
  { slug: 'frontier-travel-humidor', name: 'Frontier Travel Humidor', brand: 'Frontier Accessories', type: 'Humidor', price: 3995, category: 'humidors-accessories' },
]

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const meta = collectionMeta[slug]
  if (!meta) return { title: 'Collection Not Found' }
  return {
    title: `${meta.name} | American Leaf Co.`,
    description: meta.description,
  }
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const meta = collectionMeta[slug]
  if (!meta) notFound()

  const matchingProducts = PRODUCTS_BY_COLLECTION.filter(p => p.category === slug)

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/40">
              <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/shop" className="hover:text-white/70 transition-colors">Shop</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-emerald-400 font-medium" aria-current="page">{meta.name}</li>
            </ol>
          </nav>
          <h1 className="heading-xl text-white">{meta.name}</h1>
          <p className="text-white/60 mt-2 max-w-2xl text-sm leading-relaxed">{meta.description}</p>
        </div>
      </div>

      <div className="container-xl py-10">
        {matchingProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-border/80 p-8 shadow-card max-w-md mx-auto">
            <p className="text-secondary mb-4 text-sm">Explore our full selection in the main shop.</p>
            <Link href="/shop" className="btn-primary">
              View All Products
            </Link>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <span className="text-secondary text-xs uppercase tracking-wider font-semibold">
                Showing {matchingProducts.length} {matchingProducts.length === 1 ? 'Product' : 'Products'}
              </span>
              <Link href="/shop" className="text-xs text-[#22C55E] hover:underline font-semibold">
                Browse All Categories &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {matchingProducts.map((p) => (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  name={p.name}
                  brand={p.brand}
                  type={p.type}
                  price={p.price}
                  category={p.category}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(collectionMeta).map(slug => ({ slug }))
}
