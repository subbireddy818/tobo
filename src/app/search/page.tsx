import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Search', description: 'Search products in our tobacco catalogue.' }

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12">
        <h1 className="heading-xl text-white">Search Results</h1>
        {q && <p className="text-white/50 mt-2">Results for &quot;{q}&quot;</p>}
      </div></div>
      <div className="container-xl py-10">
        {q ? (
          <div className="text-center py-12">
            <p className="text-secondary mb-4">Search is powered by our product catalogue.</p>
            <Link href={`/shop?q=${encodeURIComponent(q)}`} className="btn-primary">
              View results in Shop →
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-secondary mb-4">Enter a search term to find products.</p>
            <Link href="/shop" className="btn-primary">Browse All Products</Link>
          </div>
        )}
      </div>
    </div>
  )
}
