import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Star, Shield, Truck, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'American Leaf Co. — Premium Tobacco Catalogue',
  description: 'Browse our curated catalogue of premium tobacco products including cigars, cigarettes, pipe tobacco, rolling tobacco, smokeless tobacco, and accessories. Must be 21+.',
}

const categories = [
  {
    slug: 'cigarettes',
    name: 'Cigarettes',
    desc: 'American blend, menthol, and light varieties.',
    color: 'from-slate-800 to-slate-900',
    count: '3 items',
  },
  {
    slug: 'cigars',
    name: 'Cigars',
    desc: 'Robusto, Churchill, Toro, and more formats.',
    color: 'from-amber-900 to-amber-950',
    count: '5 items',
  },
  {
    slug: 'cigarillos',
    name: 'Cigarillos',
    desc: 'Small-format cigars for a refined smoke.',
    color: 'from-yellow-900 to-yellow-950',
    count: '1 item',
  },
  {
    slug: 'pipe-tobacco',
    name: 'Pipe Tobacco',
    desc: 'English, Aromatic, Virginia, Balkan blends.',
    color: 'from-stone-700 to-stone-900',
    count: '6 items',
  },
  {
    slug: 'rolling-tobacco',
    name: 'Rolling Tobacco',
    desc: 'Fine-cut and premium rolling blends.',
    color: 'from-zinc-700 to-zinc-900',
    count: '2 items',
  },
  {
    slug: 'hookah-tobacco',
    name: 'Hookah Tobacco',
    desc: 'Flavored shisha for the hookah enthusiast.',
    color: 'from-indigo-900 to-indigo-950',
    count: '3 items',
  },
  {
    slug: 'smokeless-tobacco',
    name: 'Smokeless Tobacco',
    desc: 'Chew, dip, snuff, snus varieties.',
    color: 'from-green-900 to-green-950',
    count: '6 items',
  },
  {
    slug: 'nicotine-pouches',
    name: 'Nicotine Pouches',
    desc: 'Tobacco-free nicotine pouch products.',
    color: 'from-blue-900 to-blue-950',
    count: '2 items',
  },
  {
    slug: 'pipes',
    name: 'Pipes',
    desc: 'Briar, corn cob, and meerschaum pipes.',
    color: 'from-rose-900 to-rose-950',
    count: '3 items',
  },
  {
    slug: 'papers-filters',
    name: 'Papers & Filters',
    desc: 'Rolling papers, filter tips, pre-rolled cones.',
    color: 'from-neutral-700 to-neutral-900',
    count: '3 items',
  },
  {
    slug: 'lighters-matches',
    name: 'Lighters & Matches',
    desc: 'Torch lighters and premium matches.',
    color: 'from-orange-900 to-orange-950',
    count: '3 items',
  },
  {
    slug: 'humidors-accessories',
    name: 'Humidors',
    desc: 'Desktop and travel humidors for cigars.',
    color: 'from-emerald-900 to-emerald-950',
    count: '2 items',
  },
]

const brands = [
  { name: 'Appalachian Reserve', slug: 'appalachian-reserve', desc: 'Pipe & rolling tobacco' },
  { name: 'Coronado Leaf', slug: 'coronado-leaf', desc: 'Cigars & cigarillos' },
  { name: 'Blue Ridge Smoke', slug: 'blue-ridge-smoke', desc: 'Cigarettes & RYO' },
  { name: 'Canyon Creek Tobacco', slug: 'canyon-creek', desc: 'Smokeless tobacco' },
  { name: 'Old Harbor Pipe Co.', slug: 'old-harbor-pipe', desc: 'Pipes & pipe tobacco' },
  { name: 'Pacific Coast Hookah', slug: 'pacific-coast-hookah', desc: 'Hookah tobacco' },
  { name: 'Summit Pouches', slug: 'summit-pouches', desc: 'Nicotine pouches' },
  { name: 'Frontier Accessories', slug: 'frontier-accessories', desc: 'Lighters, papers, humidors' },
]

const trustItems = [
  { icon: Shield, title: 'Age Verified', desc: 'Strict 21+ verification on every visit.' },
  { icon: Star, title: 'Curated Catalogue', desc: 'Hand-selected premium products.' },
  { icon: Truck, title: 'Compliance-First', desc: 'Built for legal, jurisdiction-aware commerce.' },
  { icon: Phone, title: 'Support Ready', desc: 'Dedicated customer support ready to assist you.' },
]

const featuredProducts = [
  { slug: 'coronado-reserve-robusto', name: 'Coronado Reserve Robusto', brand: 'Coronado Leaf', type: 'Cigar', price: '$18.95' },
  { slug: 'appalachian-english-no1', name: 'Appalachian English No. 1', brand: 'Appalachian Reserve', type: 'Pipe Tobacco', price: '$18.95' },
  { slug: 'old-harbor-briar-billiard', name: 'Briar Billiard Pipe', brand: 'Old Harbor Pipe Co.', type: 'Pipe', price: '$69.95' },
  { slug: 'coronado-churchill-natural', name: 'Coronado Churchill', brand: 'Coronado Leaf', type: 'Cigar', price: '$24.95' },
  { slug: 'blue-ridge-classic-king', name: 'Blue Ridge Classic King', brand: 'Blue Ridge Smoke', type: 'Cigarettes', price: '$10.99' },
  { slug: 'canyon-creek-long-cut', name: 'Canyon Creek Long Cut', brand: 'Canyon Creek', type: 'Chewing Tobacco', price: '$5.95' },
  { slug: 'pacific-coast-double-apple', name: 'Double Apple Hookah', brand: 'Pacific Coast Hookah', type: 'Hookah Tobacco', price: '$12.95' },
  { slug: 'old-harbor-english-no4', name: 'Old Harbor English No. 4', brand: 'Old Harbor Pipe Co.', type: 'Pipe Tobacco', price: '$24.95' },
]

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section
        className="relative bg-charcoal overflow-hidden"
        aria-labelledby="hero-heading"
      >
        {/* Background texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              -45deg, #B69A63, #B69A63 1px,
              transparent 1px, transparent 50px
            )`,
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal/20 to-charcoal/80" aria-hidden="true" />

        <div className="relative container-xl py-28 lg:py-40">
          <div className="max-w-2xl">
            <p className="subheading text-gold/70 mb-4">Premium Tobacco Catalogue</p>
            <h1
              id="hero-heading"
              className="heading-display text-white mb-6 leading-tight"
            >
              Explore Our
              <span className="block text-gold">Collection</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
              Discover our curated product catalogue — cigars, cigarettes, pipe tobacco,
              smokeless products, and fine accessories.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-primary px-8 py-4 text-base">
                Shop All Products
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link href="/collections/cigars" className="btn-outline-light px-8 py-4 text-base">
                Explore Cigars
              </Link>
            </div>

            {/* Age notice */}
            <div className="mt-10 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded px-4 py-2">
              <Shield className="w-4 h-4 text-gold flex-shrink-0" aria-hidden="true" />
              <span className="text-white/50 text-xs">Must be 21 or older to browse • US Federal Law</span>
            </div>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden="true" />
      </section>


      {/* ── CATEGORIES ── */}
      <section className="section-white" aria-labelledby="categories-heading">
        <div className="container-xl">
          <div className="text-center mb-12">
            <p className="subheading text-gold mb-3">Browse By Category</p>
            <h2 id="categories-heading" className="heading-xl text-charcoal">
              All Tobacco Types
            </h2>
            <p className="text-secondary mt-3 max-w-xl mx-auto">
              From premium cigars to smokeless tobacco — every category in our catalogue.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="group relative overflow-hidden rounded-lg aspect-square flex flex-col justify-end p-5 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.color}`} aria-hidden="true" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" aria-hidden="true" />
                <div className="relative z-10">
                  <p className="text-white/50 text-xs mb-0.5">{cat.count}</p>
                  <h3 className="text-white font-serif font-semibold text-base leading-tight mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-white/60 text-xs leading-snug hidden sm:block">
                    {cat.desc}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-gold text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View Category
                    <ArrowRight className="w-3 h-3" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section-ivory" aria-labelledby="featured-heading">
        <div className="container-xl">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="subheading text-gold mb-2">Featured Catalogue</p>
              <h2 id="featured-heading" className="heading-xl text-charcoal">
                Selected Products
              </h2>
            </div>
            <Link href="/shop" className="hidden sm:flex items-center gap-1.5 text-gold text-sm font-medium hover:text-gold-dark transition-colors">
              View All
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="group relative bg-white rounded-xl border border-border/80 shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Product image placeholder with hover zoom & subtle green gradient */}
                <div className="relative aspect-square bg-gradient-to-br from-charcoal-800 via-charcoal to-charcoal-900 flex items-center justify-center overflow-hidden">
                  {/* Subtle green gradient overlay on hover */}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-emerald-950/60 via-emerald-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10"
                    aria-hidden="true"
                  />

                  {/* Icon container with smooth scale transform on hover */}
                  <div className="relative z-0 text-center px-4 transform transition-transform duration-300 ease-out group-hover:scale-105">
                    <div className="w-14 h-14 rounded-full border border-gold/40 bg-gold/10 flex items-center justify-center mx-auto mb-2.5 shadow-inner transition-colors duration-300 group-hover:border-gold group-hover:bg-gold/20">
                      <span className="text-gold font-serif text-xl font-bold">
                        {product.name.charAt(0)}
                      </span>
                    </div>
                    <span className="text-white/40 text-[11px] uppercase tracking-wider font-medium">{product.type}</span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex flex-col flex-1 justify-between">
                  <div>
                    <p className="text-secondary text-xs uppercase tracking-wider font-medium mb-1.5">{product.brand}</p>
                    <h3 className="text-charcoal text-base font-serif font-semibold leading-snug mb-3 line-clamp-2 group-hover:text-gold-dark transition-colors">
                      {product.name}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-border/60">
                    <span className="text-charcoal font-bold text-base">{product.price}</span>
                    <span className="badge-gray text-xs px-2.5 py-0.5 rounded-full">{product.type}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/shop" className="btn-secondary">
              View Full Catalogue
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── BRANDS ── */}
      <section className="section-white" aria-labelledby="brands-heading">
        <div className="container-xl">
          <div className="text-center mb-10">
            <p className="subheading text-gold mb-2">Our Brands</p>
            <h2 id="brands-heading" className="heading-xl">Brand Directory</h2>
            <p className="text-secondary text-sm mt-2">Explore our trusted portfolio of heritage tobacco and fine accessory makers.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brands/${brand.slug}`}
                className="group card card-hover p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full border border-gold/20 bg-ivory flex items-center justify-center mx-auto mb-3">
                  <span className="text-gold font-serif font-bold text-lg">
                    {brand.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-charcoal text-sm font-semibold mb-1 group-hover:text-gold transition-colors">
                  {brand.name}
                </h3>
                <p className="text-secondary text-xs">{brand.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/brands" className="btn-ghost text-base">
              View All Brands
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="section-dark" aria-labelledby="trust-heading">
        <div className="container-xl">
          <div className="text-center mb-12">
            <h2 id="trust-heading" className="heading-xl text-white">Built for Compliant Commerce</h2>
            <p className="text-white/50 mt-3 max-w-lg mx-auto text-sm">
              Designed from the ground up for legal US tobacco retail — age verification,
              jurisdiction compliance, and transparent catalogue management.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustItems.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-12 h-12 rounded-full border border-gold/20 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-gold" aria-hidden="true" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-2">{title}</h3>
                <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section-ivory" aria-labelledby="about-heading">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="subheading text-gold mb-3">About Us</p>
              <h2 id="about-heading" className="heading-xl text-charcoal mb-6">
                American Leaf Co.
              </h2>
              <div className="space-y-4 text-secondary leading-relaxed">
                <p>
                  American Leaf Co. is a premier purveyor of fine tobacco products, premium cigars,
                  and artisanal smoking accessories. We source exclusively from distinguished makers
                  committed to craftsmanship and heritage.
                </p>
                <p>
                  Our operations are built on a strict compliance-first foundation — featuring rigorous
                  age verification, state-by-state regulatory adherence, and secure, responsible fulfillment.
                </p>
              </div>
              <div className="mt-8">
                <Link href="/about" className="btn-secondary">
                  Learn More
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Product Types', value: '12+' },
                { label: 'Products', value: '40+' },
                { label: 'Brands', value: '8' },
                { label: 'States Configured', value: '51' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white rounded-lg border border-border p-6 text-center">
                  <p className="font-serif text-3xl font-bold text-gold mb-1">{value}</p>
                  <p className="text-secondary text-sm">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── HELP ── */}
      <section className="section-white" aria-labelledby="help-heading">
        <div className="container-xl">
          <div className="text-center mb-10">
            <h2 id="help-heading" className="heading-lg text-charcoal">Help &amp; Information</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Contact Us', href: '/contact', desc: 'Get in touch with our team.' },
              { label: 'Shipping Info', href: '/shipping-policy', desc: 'Delivery zones and restrictions.' },
              { label: 'FAQs', href: '/faq', desc: 'Answers to common questions.' },
              { label: 'Legal Notices', href: '/legal/tobacco-disclosures', desc: 'Tobacco regulations and disclosures.' },
            ].map(({ label, href, desc }) => (
              <Link
                key={href}
                href={href}
                className="group card card-hover p-6"
              >
                <h3 className="text-charcoal font-semibold mb-2 group-hover:text-gold transition-colors">
                  {label}
                </h3>
                <p className="text-secondary text-sm">{desc}</p>
                <div className="mt-4 flex items-center gap-1 text-gold text-xs font-medium">
                  Learn More <ArrowRight className="w-3 h-3" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
