import type { Metadata } from 'next'
import Link from 'next/link'
import { Filter, Search } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'

export const metadata: Metadata = {
  title: 'All Products | American Leaf Co.',
  description: 'Browse our complete tobacco product catalogue. Cigarettes, cigars, pipe tobacco, smokeless tobacco, and accessories.',
}

const ALL_PRODUCTS = [
  { slug: 'blue-ridge-classic-king', name: 'Blue Ridge Classic King Size', brand: 'Blue Ridge Smoke', type: 'Cigarettes', price: 1099, category: 'cigarettes', inStock: true },
  { slug: 'blue-ridge-menthol-100s', name: 'Blue Ridge Menthol 100s', brand: 'Blue Ridge Smoke', type: 'Cigarettes', price: 1149, category: 'cigarettes', inStock: true },
  { slug: 'blue-ridge-light-king', name: 'Blue Ridge Light King', brand: 'Blue Ridge Smoke', type: 'Cigarettes', price: 1099, category: 'cigarettes', inStock: true },
  { slug: 'coronado-reserve-robusto', name: 'Coronado Reserve Robusto', brand: 'Coronado Leaf', type: 'Cigars', price: 1895, category: 'cigars', inStock: true },
  { slug: 'coronado-churchill-natural', name: 'Coronado Churchill Natural', brand: 'Coronado Leaf', type: 'Cigars', price: 2495, category: 'cigars', inStock: true },
  { slug: 'coronado-toro-maduro', name: 'Coronado Toro Maduro', brand: 'Coronado Leaf', type: 'Cigars', price: 2195, category: 'cigars', inStock: true },
  { slug: 'coronado-belicoso-claro', name: 'Coronado Belicoso Claro', brand: 'Coronado Leaf', type: 'Cigars', price: 1995, category: 'cigars', inStock: true },
  { slug: 'coronado-perfecto-vintage', name: 'Coronado Perfecto Vintage', brand: 'Coronado Leaf', type: 'Cigars', price: 2295, category: 'cigars', inStock: true },
  { slug: 'coronado-mini-cigarillos', name: 'Coronado Mini Cigarillos', brand: 'Coronado Leaf', type: 'Cigarillos', price: 799, category: 'cigarillos', inStock: true },
  { slug: 'appalachian-english-no1', name: 'Appalachian English Blend No. 1', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 1895, category: 'pipe-tobacco', inStock: true },
  { slug: 'appalachian-virginia-flake', name: 'Appalachian Virginia Flake', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 2095, category: 'pipe-tobacco', inStock: true },
  { slug: 'appalachian-aromatic-cherry', name: 'Appalachian Aromatic Cherry', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 1695, category: 'pipe-tobacco', inStock: true },
  { slug: 'appalachian-balkan-blend', name: 'Appalachian Balkan Blend', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 2295, category: 'pipe-tobacco', inStock: true },
  { slug: 'appalachian-burley-dark', name: 'Appalachian Burley Dark', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: 1995, category: 'pipe-tobacco', inStock: true },
  { slug: 'old-harbor-english-no4', name: 'Old Harbor English No. 4', brand: 'Old Harbor Pipe Co.', type: 'Pipe Tobacco', price: 2495, category: 'pipe-tobacco', inStock: true },
  { slug: 'blue-ridge-ryo-blend', name: 'Blue Ridge RYO Blend', brand: 'Blue Ridge Smoke', type: 'Rolling Tobacco', price: 1495, category: 'rolling-tobacco', inStock: true },
  { slug: 'appalachian-ryo-premium', name: 'Appalachian RYO Premium', brand: 'Appalachian Reserve', type: 'Rolling Tobacco', price: 1895, category: 'rolling-tobacco', inStock: true },
  { slug: 'pacific-coast-double-apple', name: 'Pacific Coast Double Apple', brand: 'Pacific Coast Hookah', type: 'Hookah Tobacco', price: 1295, category: 'hookah-tobacco', inStock: true },
  { slug: 'pacific-coast-mint', name: 'Pacific Coast Mint', brand: 'Pacific Coast Hookah', type: 'Hookah Tobacco', price: 1195, category: 'hookah-tobacco', inStock: true },
  { slug: 'pacific-coast-watermelon', name: 'Pacific Coast Watermelon', brand: 'Pacific Coast Hookah', type: 'Hookah Tobacco', price: 1295, category: 'hookah-tobacco', inStock: true },
  { slug: 'canyon-creek-long-cut', name: 'Canyon Creek Long Cut', brand: 'Canyon Creek Tobacco', type: 'Chewing Tobacco', price: 595, category: 'smokeless-tobacco', inStock: true },
  { slug: 'canyon-creek-dip-fine-cut', name: 'Canyon Creek Dip Fine Cut', brand: 'Canyon Creek Tobacco', type: 'Dip', price: 495, category: 'smokeless-tobacco', inStock: true },
  { slug: 'canyon-creek-moist-snuff', name: 'Canyon Creek Moist Snuff', brand: 'Canyon Creek Tobacco', type: 'Snuff', price: 545, category: 'smokeless-tobacco', inStock: true },
  { slug: 'canyon-creek-wintergreen-dip', name: 'Canyon Creek Wintergreen Dip', brand: 'Canyon Creek Tobacco', type: 'Dip', price: 495, category: 'smokeless-tobacco', inStock: true },
  { slug: 'canyon-creek-straight-plug', name: 'Canyon Creek Straight Plug', brand: 'Canyon Creek Tobacco', type: 'Chewing Tobacco', price: 649, category: 'smokeless-tobacco', inStock: true },
  { slug: 'canyon-creek-snus', name: 'Canyon Creek Snus Pouches', brand: 'Canyon Creek Tobacco', type: 'Snus', price: 699, category: 'smokeless-tobacco', inStock: true },
  { slug: 'summit-pouches-original', name: 'Summit Pouches Original', brand: 'Summit Pouches', type: 'Nicotine Pouches', price: 499, category: 'nicotine-pouches', inStock: true },
  { slug: 'summit-pouches-mint', name: 'Summit Pouches Cool Mint', brand: 'Summit Pouches', type: 'Nicotine Pouches', price: 499, category: 'nicotine-pouches', inStock: true },
  { slug: 'old-harbor-briar-billiard', name: 'Old Harbor Briar Billiard Pipe', brand: 'Old Harbor Pipe Co.', type: 'Pipes', price: 6995, category: 'pipes', inStock: true },
  { slug: 'old-harbor-corn-cob', name: 'Old Harbor Corn Cob Pipe', brand: 'Old Harbor Pipe Co.', type: 'Pipes', price: 1495, category: 'pipes', inStock: true },
  { slug: 'old-harbor-meerschaum', name: 'Old Harbor Meerschaum Pipe', brand: 'Old Harbor Pipe Co.', type: 'Pipes', price: 12995, category: 'pipes', inStock: true },
  { slug: 'blue-ridge-rolling-papers', name: 'Blue Ridge Rolling Papers', brand: 'Blue Ridge Smoke', type: 'Rolling Papers', price: 299, category: 'papers-filters', inStock: true },
  { slug: 'blue-ridge-filter-tips', name: 'Blue Ridge Filter Tips', brand: 'Blue Ridge Smoke', type: 'Filters', price: 199, category: 'papers-filters', inStock: true },
  { slug: 'frontier-king-size-cones', name: 'Frontier King Size Cones', brand: 'Frontier Accessories', type: 'Pre-Rolled Cones', price: 399, category: 'papers-filters', inStock: true },
  { slug: 'frontier-torch-lighter', name: 'Frontier Torch Lighter', brand: 'Frontier Accessories', type: 'Lighter', price: 2995, category: 'lighters-matches', inStock: true },
  { slug: 'frontier-triple-jet-lighter', name: 'Frontier Triple Jet Lighter', brand: 'Frontier Accessories', type: 'Lighter', price: 4495, category: 'lighters-matches', inStock: true },
  { slug: 'frontier-long-matches', name: 'Frontier Long Matches', brand: 'Frontier Accessories', type: 'Matches', price: 895, category: 'lighters-matches', inStock: true },
  { slug: 'frontier-humidor-25', name: 'Frontier Desktop Humidor 25-Count', brand: 'Frontier Accessories', type: 'Humidor', price: 8995, category: 'humidors-accessories', inStock: true },
  { slug: 'frontier-travel-humidor', name: 'Frontier Travel Humidor', brand: 'Frontier Accessories', type: 'Humidor', price: 3995, category: 'humidors-accessories', inStock: true },
]

const categoryLabels: Record<string, string> = {
  cigarettes: 'Cigarettes',
  cigars: 'Cigars',
  cigarillos: 'Cigarillos',
  'pipe-tobacco': 'Pipe Tobacco',
  'rolling-tobacco': 'Rolling Tobacco',
  'hookah-tobacco': 'Hookah Tobacco',
  'smokeless-tobacco': 'Smokeless Tobacco',
  'nicotine-pouches': 'Nicotine Pouches',
  pipes: 'Pipes',
  'papers-filters': 'Papers & Filters',
  'lighters-matches': 'Lighters & Matches',
  'humidors-accessories': 'Humidors & Accessories',
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

interface PageProps {
  searchParams: Promise<{ category?: string; brand?: string; sort?: string; q?: string }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const { category, brand, sort, q } = params

  let products = [...ALL_PRODUCTS]

  if (category) products = products.filter(p => p.category === category)
  if (brand) products = products.filter(p => p.brand.toLowerCase().replace(/\s+/g, '-').includes(brand))
  if (q) {
    const query = q.toLowerCase()
    products = products.filter(p =>
      p.name.toLowerCase().includes(query) ||
      p.brand.toLowerCase().includes(query) ||
      p.type.toLowerCase().includes(query)
    )
  }
  if (sort === 'price-asc') products.sort((a, b) => a.price - b.price)
  else if (sort === 'price-desc') products.sort((a, b) => b.price - a.price)
  else if (sort === 'alpha') products.sort((a, b) => a.name.localeCompare(b.name))

  const categories = Object.entries(categoryLabels)

  return (
    <div className="min-h-screen bg-ivory">
      {/* Page header */}
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/40">
              <li><Link href="/" className="hover:text-white/70">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">Products</li>
            </ol>
          </nav>
          <h1 className="heading-xl text-white">All Products</h1>
          <p className="text-white/50 mt-2 text-sm">
            {products.length} {products.length === 1 ? 'product' : 'products'}
            {category ? ` in ${categoryLabels[category] ?? category}` : ''}
            {q ? ` matching "${q}"` : ''}
          </p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 flex-shrink-0" aria-label="Filter products">
            <div className="bg-white border border-border rounded-lg p-5 sticky top-24">
              <h2 className="text-charcoal font-semibold text-sm mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" aria-hidden="true" />
                Filters
              </h2>

              {/* Search */}
              <div className="mb-5">
                <form>
                  <label htmlFor="shop-search" className="label">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" aria-hidden="true" />
                    <input
                      id="shop-search"
                      name="q"
                      type="search"
                      defaultValue={q ?? ''}
                      placeholder="Search products…"
                      className="input pl-9 text-sm py-2"
                    />
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="mb-5">
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-widest mb-3">Category</h3>
                <div className="space-y-1.5">
                  <Link
                    href="/products"
                    className={`block text-sm px-2 py-1.5 rounded transition-colors ${
                      !category ? 'text-gold font-medium bg-gold/5' : 'text-secondary hover:text-charcoal'
                    }`}
                  >
                    All Products ({ALL_PRODUCTS.length})
                  </Link>
                  {categories.map(([slug, label]) => {
                    const count = ALL_PRODUCTS.filter(p => p.category === slug).length
                    return (
                      <Link
                        key={slug}
                        href={`/products?category=${slug}`}
                        className={`block text-sm px-2 py-1.5 rounded transition-colors ${
                          category === slug ? 'text-gold font-medium bg-gold/5' : 'text-secondary hover:text-charcoal'
                        }`}
                      >
                        {label} ({count})
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="text-xs font-semibold text-secondary uppercase tracking-widest mb-3">Sort By</h3>
                <div className="space-y-1.5">
                  {[
                    { value: '', label: 'Featured' },
                    { value: 'alpha', label: 'A — Z' },
                    { value: 'price-asc', label: 'Price: Low to High' },
                    { value: 'price-desc', label: 'Price: High to Low' },
                  ].map(opt => (
                    <Link
                      key={opt.value}
                      href={`/products?${new URLSearchParams({ ...(category ? { category } : {}), ...(opt.value ? { sort: opt.value } : {}) }).toString()}`}
                      className={`block text-sm px-2 py-1.5 rounded transition-colors ${
                        sort === opt.value || (!sort && opt.value === '')
                          ? 'text-gold font-medium bg-gold/5'
                          : 'text-secondary hover:text-charcoal'
                      }`}
                    >
                      {opt.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <main className="flex-1" id="main-content">
            {products.length === 0 ? (
              <div className="bg-white border border-border rounded-lg p-12 text-center">
                <p className="text-secondary text-lg mb-2">No products found</p>
                <p className="text-secondary text-sm mb-6">Try adjusting your filters or search query.</p>
                <Link href="/products" className="btn-primary">Clear Filters</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {products.map((p) => (
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
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
