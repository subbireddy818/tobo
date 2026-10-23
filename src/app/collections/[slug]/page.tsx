import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

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

interface Params { slug: string }

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params
  const meta = collectionMeta[slug]
  if (!meta) return { title: 'Collection Not Found' }
  return {
    title: `${meta.name} — American Leaf Co.`,
    description: meta.description,
  }
}

export default async function CollectionPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params
  const meta = collectionMeta[slug]
  if (!meta) notFound()

  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/40">
              <li><Link href="/" className="hover:text-white/70">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/shop" className="hover:text-white/70">Shop</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">{meta.name}</li>
            </ol>
          </nav>
          <h1 className="heading-xl text-white">{meta.name}</h1>
          <p className="text-white/50 mt-2 max-w-2xl">{meta.description}</p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="demo-banner mb-8">
          ⚠ Demonstration catalogue — all products are fictional. Purchasing not available.
        </div>
        <div className="text-center py-8">
          <p className="text-secondary mb-4">Browse all {meta.name} products in the full shop.</p>
          <Link href={`/shop?category=${slug}`} className="btn-primary">
            View {meta.name} in Shop
          </Link>
        </div>
      </div>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(collectionMeta).map(slug => ({ slug }))
}
