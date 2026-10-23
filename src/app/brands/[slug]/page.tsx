import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

const BRANDS: Record<string, {
  name: string; desc: string; fullDesc: string
  categories: string[]; products: { slug: string; name: string; type: string; price: number }[]
}> = {
  'appalachian-reserve': {
    name: 'Appalachian Reserve', desc: 'Pipe tobacco and rolling tobacco blends.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Appalachian Reserve is a fictional brand created for catalogue illustration. Inspired by Appalachian heritage, it represents pipe tobacco and rolling tobacco blends. No real manufacturer is represented.',
    categories: ['Pipe Tobacco', 'Rolling Tobacco'],
    products: [
      { slug: 'appalachian-english-no1', name: 'English Blend No. 1 (Demo)', type: 'Pipe Tobacco', price: 1895 },
      { slug: 'appalachian-virginia-flake', name: 'Virginia Flake (Demo)', type: 'Pipe Tobacco', price: 2095 },
      { slug: 'appalachian-aromatic-cherry', name: 'Aromatic Cherry (Demo)', type: 'Pipe Tobacco', price: 1695 },
      { slug: 'appalachian-balkan-blend', name: 'Balkan Blend (Demo)', type: 'Pipe Tobacco', price: 2295 },
      { slug: 'appalachian-burley-dark', name: 'Burley Dark (Demo)', type: 'Pipe Tobacco', price: 1995 },
      { slug: 'appalachian-ryo-premium', name: 'RYO Premium (Demo)', type: 'Rolling Tobacco', price: 1895 },
    ],
  },
  'coronado-leaf': {
    name: 'Coronado Leaf', desc: 'Premium cigars and cigarillos.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Coronado Leaf is a fictional premium cigar brand. All product specifications are illustrative.',
    categories: ['Cigars', 'Cigarillos'],
    products: [
      { slug: 'coronado-reserve-robusto', name: 'Reserve Robusto (Demo)', type: 'Cigar', price: 1895 },
      { slug: 'coronado-churchill-natural', name: 'Churchill Natural (Demo)', type: 'Cigar', price: 2495 },
      { slug: 'coronado-toro-maduro', name: 'Toro Maduro (Demo)', type: 'Cigar', price: 2195 },
      { slug: 'coronado-belicoso-claro', name: 'Belicoso Claro (Demo)', type: 'Cigar', price: 1995 },
      { slug: 'coronado-perfecto-vintage', name: 'Perfecto Vintage (Demo)', type: 'Cigar', price: 2295 },
      { slug: 'coronado-mini-cigarillos', name: 'Mini Cigarillos (Demo)', type: 'Cigarillo', price: 799 },
    ],
  },
  'blue-ridge-smoke': {
    name: 'Blue Ridge Smoke', desc: 'Cigarettes, rolling tobacco, and rolling papers.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Blue Ridge Smoke is a fictional American cigarette and rolling tobacco brand.',
    categories: ['Cigarettes', 'Rolling Tobacco', 'Papers & Filters'],
    products: [
      { slug: 'blue-ridge-classic-king', name: 'Classic King Size (Demo)', type: 'Cigarettes', price: 1099 },
      { slug: 'blue-ridge-menthol-100s', name: 'Menthol 100s (Demo)', type: 'Cigarettes', price: 1149 },
      { slug: 'blue-ridge-light-king', name: 'Light King (Demo)', type: 'Cigarettes', price: 1099 },
      { slug: 'blue-ridge-ryo-blend', name: 'RYO Blend (Demo)', type: 'Rolling Tobacco', price: 1495 },
      { slug: 'blue-ridge-rolling-papers', name: 'Rolling Papers (Demo)', type: 'Papers', price: 299 },
      { slug: 'blue-ridge-filter-tips', name: 'Filter Tips (Demo)', type: 'Filters', price: 199 },
    ],
  },
  'canyon-creek': {
    name: 'Canyon Creek Tobacco', desc: 'Smokeless tobacco — chew, dip, snuff, and snus.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Canyon Creek Tobacco is a fictional smokeless tobacco brand.',
    categories: ['Chewing Tobacco', 'Dip', 'Snuff', 'Snus'],
    products: [
      { slug: 'canyon-creek-long-cut', name: 'Long Cut (Demo)', type: 'Chewing Tobacco', price: 595 },
      { slug: 'canyon-creek-dip-fine-cut', name: 'Dip Fine Cut (Demo)', type: 'Dip', price: 495 },
      { slug: 'canyon-creek-moist-snuff', name: 'Moist Snuff (Demo)', type: 'Snuff', price: 545 },
      { slug: 'canyon-creek-wintergreen-dip', name: 'Wintergreen Dip (Demo)', type: 'Dip', price: 495 },
      { slug: 'canyon-creek-straight-plug', name: 'Straight Plug (Demo)', type: 'Chewing Tobacco', price: 649 },
      { slug: 'canyon-creek-snus', name: 'Snus Pouches (Demo)', type: 'Snus', price: 699 },
    ],
  },
  'old-harbor-pipe': {
    name: 'Old Harbor Pipe Co.', desc: 'Artisan pipes and pipe tobacco blends.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Old Harbor Pipe Co. is a fictional artisan pipe and pipe tobacco brand.',
    categories: ['Pipes', 'Pipe Tobacco'],
    products: [
      { slug: 'old-harbor-briar-billiard', name: 'Briar Billiard Pipe (Demo)', type: 'Pipe', price: 6995 },
      { slug: 'old-harbor-corn-cob', name: 'Corn Cob Pipe (Demo)', type: 'Pipe', price: 1495 },
      { slug: 'old-harbor-meerschaum', name: 'Meerschaum Pipe (Demo)', type: 'Pipe', price: 12995 },
      { slug: 'old-harbor-english-no4', name: 'English No. 4 (Demo)', type: 'Pipe Tobacco', price: 2495 },
    ],
  },
  'pacific-coast-hookah': {
    name: 'Pacific Coast Hookah', desc: 'Flavored hookah tobacco products.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Pacific Coast Hookah is a fictional hookah tobacco brand.',
    categories: ['Hookah Tobacco'],
    products: [
      { slug: 'pacific-coast-double-apple', name: 'Double Apple (Demo)', type: 'Hookah Tobacco', price: 1295 },
      { slug: 'pacific-coast-mint', name: 'Mint (Demo)', type: 'Hookah Tobacco', price: 1195 },
      { slug: 'pacific-coast-watermelon', name: 'Watermelon (Demo)', type: 'Hookah Tobacco', price: 1295 },
    ],
  },
  'summit-pouches': {
    name: 'Summit Pouches', desc: 'Tobacco-free nicotine pouches.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Summit Pouches is a fictional nicotine pouch brand.',
    categories: ['Nicotine Pouches'],
    products: [
      { slug: 'summit-pouches-original', name: 'Original (Demo)', type: 'Nicotine Pouch', price: 499 },
      { slug: 'summit-pouches-mint', name: 'Cool Mint (Demo)', type: 'Nicotine Pouch', price: 499 },
    ],
  },
  'frontier-accessories': {
    name: 'Frontier Accessories', desc: 'Lighters, papers, humidors, and tobacco accessories.',
    fullDesc: 'DEMONSTRATION BRAND ONLY. Frontier Accessories is a fictional accessories brand.',
    categories: ['Lighters', 'Papers', 'Humidors'],
    products: [
      { slug: 'frontier-king-size-cones', name: 'King Size Cones (Demo)', type: 'Pre-Rolled Cones', price: 399 },
      { slug: 'frontier-torch-lighter', name: 'Torch Lighter (Demo)', type: 'Lighter', price: 2995 },
      { slug: 'frontier-triple-jet-lighter', name: 'Triple Jet Lighter (Demo)', type: 'Lighter', price: 4495 },
      { slug: 'frontier-long-matches', name: 'Long Matches (Demo)', type: 'Matches', price: 895 },
      { slug: 'frontier-humidor-25', name: 'Desktop Humidor 25ct (Demo)', type: 'Humidor', price: 8995 },
      { slug: 'frontier-travel-humidor', name: 'Travel Humidor (Demo)', type: 'Humidor', price: 3995 },
    ],
  },
}

function formatPrice(cents: number) {
  return `$${(cents / 100).toFixed(2)}`
}

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const b = BRANDS[slug]
  if (!b) return { title: 'Brand Not Found' }
  return { title: `${b.name} — Brands`, description: b.desc }
}

export default async function BrandPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const b = BRANDS[slug]
  if (!b) notFound()

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/40">
              <li><Link href="/" className="hover:text-white/70">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/brands" className="hover:text-white/70">Brands</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">{b.name}</li>
            </ol>
          </nav>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center flex-shrink-0">
              <span className="text-gold font-serif text-2xl font-bold">{b.name.charAt(0)}</span>
            </div>
            <div>
              <h1 className="heading-xl text-white">{b.name}</h1>
              <p className="text-white/50 mt-1">{b.desc}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {b.categories.map(cat => (
              <span key={cat} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gold/10 text-gold">{cat}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="demo-banner mb-6">
          ⚠ This is a fictional demonstration brand. {b.fullDesc}
        </div>

        <h2 className="heading-lg text-charcoal mb-6">Products ({b.products.length})</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {b.products.map((p) => (
            <Link
              key={p.slug}
              href={`/products/${p.slug}`}
              className="group bg-white rounded-lg border border-border shadow-card overflow-hidden hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="aspect-square bg-gradient-to-br from-charcoal-800 to-charcoal flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center mx-auto mb-2">
                    <span className="text-gold font-serif text-lg font-bold">{p.name.charAt(0)}</span>
                  </div>
                  <span className="text-white/40 text-xs">{p.type}</span>
                </div>
              </div>
              <div className="p-4">
                <p className="text-secondary text-xs mb-1">{b.name}</p>
                <h3 className="text-charcoal text-sm font-semibold leading-snug mb-2 group-hover:text-gold transition-colors">{p.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal font-bold">{formatPrice(p.price)}</span>
                  <span className="badge-gray text-xs">{p.type}</span>
                </div>
                <div className="mt-2 text-xs text-amber-700 bg-amber-50 rounded px-2 py-1">Demo Only</div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/brands" className="btn-ghost">
            ← Back to All Brands
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(BRANDS).map(slug => ({ slug }))
}
