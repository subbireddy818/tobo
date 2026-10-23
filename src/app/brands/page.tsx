import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Brands',
  description: 'Browse all demonstration tobacco brands in our catalogue.',
}

const brands = [
  { slug: 'appalachian-reserve', name: 'Appalachian Reserve', desc: 'Pipe tobacco and rolling tobacco blends.', categories: ['Pipe Tobacco', 'Rolling Tobacco'], productCount: 7 },
  { slug: 'coronado-leaf', name: 'Coronado Leaf', desc: 'Premium cigars and cigarillos.', categories: ['Cigars', 'Cigarillos'], productCount: 6 },
  { slug: 'blue-ridge-smoke', name: 'Blue Ridge Smoke', desc: 'Cigarettes and rolling tobacco.', categories: ['Cigarettes', 'Rolling Tobacco', 'Papers'], productCount: 7 },
  { slug: 'canyon-creek', name: 'Canyon Creek Tobacco', desc: 'Smokeless tobacco products.', categories: ['Chewing Tobacco', 'Dip', 'Snuff', 'Snus'], productCount: 6 },
  { slug: 'old-harbor-pipe', name: 'Old Harbor Pipe Co.', desc: 'Artisan pipes and pipe tobacco.', categories: ['Pipes', 'Pipe Tobacco'], productCount: 4 },
  { slug: 'pacific-coast-hookah', name: 'Pacific Coast Hookah', desc: 'Hookah and shisha tobacco.', categories: ['Hookah Tobacco'], productCount: 3 },
  { slug: 'summit-pouches', name: 'Summit Pouches', desc: 'Nicotine pouches.', categories: ['Nicotine Pouches'], productCount: 2 },
  { slug: 'frontier-accessories', name: 'Frontier Accessories', desc: 'Lighters, papers, humidors.', categories: ['Lighters', 'Papers', 'Humidors'], productCount: 6 },
]

export default function BrandsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <h1 className="heading-xl text-white">Brand Directory</h1>
          <p className="text-white/50 mt-2">All brands are fictional — for demonstration purposes only.</p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="demo-banner mb-8">
          ⚠ All brands listed are fictional demonstration brands. No real manufacturer is represented.
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {brands.map(brand => (
            <Link
              key={brand.slug}
              href={`/brands/${brand.slug}`}
              className="group card card-hover p-6"
            >
              <div className="w-14 h-14 rounded-full border border-gold/20 bg-ivory flex items-center justify-center mb-4">
                <span className="text-gold font-serif text-xl font-bold">{brand.name.charAt(0)}</span>
              </div>
              <h2 className="heading-md text-charcoal mb-2 group-hover:text-gold transition-colors">
                {brand.name}
              </h2>
              <p className="text-secondary text-sm mb-3">{brand.desc}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {brand.categories.map(cat => (
                  <span key={cat} className="badge-gray">{cat}</span>
                ))}
              </div>
              <p className="text-secondary text-xs">{brand.productCount} demo products</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
