import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <div className="text-center">
        <p className="text-7xl font-serif font-bold text-gold mb-4">404</p>
        <h1 className="heading-xl text-charcoal mb-3">Page Not Found</h1>
        <p className="text-secondary mb-8 max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/" className="btn-primary">Go Home</Link>
          <Link href="/shop" className="btn-secondary">Browse Shop</Link>
        </div>
      </div>
    </div>
  )
}
