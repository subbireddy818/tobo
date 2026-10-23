import type { Metadata } from 'next'
import Link from 'next/link'
import { Package } from 'lucide-react'

export const metadata: Metadata = { title: 'Order History' }

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12">
        <h1 className="heading-xl text-white">Order History</h1>
        <p className="text-white/50 mt-2">View and track your orders.</p>
      </div></div>
      <div className="container-xl py-10">
        <div className="demo-banner mb-8">⚠ Account system is in demonstration mode.</div>
        <div className="max-w-2xl mx-auto">
          <div className="card p-12 text-center">
            <Package className="w-12 h-12 text-secondary/30 mx-auto mb-4" aria-hidden="true" />
            <h2 className="heading-md text-charcoal mb-2">No orders yet</h2>
            <p className="text-secondary text-sm mb-6">When you place orders, they will appear here.</p>
            <Link href="/shop" className="btn-primary">Browse Products</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
