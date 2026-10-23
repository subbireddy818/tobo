import type { Metadata } from 'next'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = { title: 'Your Cart', description: 'View items in your shopping cart.' }

export default function CartPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">Your Cart</h1></div></div>
      <div className="container-xl py-10">
        <div className="max-w-2xl mx-auto text-center">
          {/* Purchasing disabled banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-3 text-left">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-amber-800 font-semibold text-sm mb-1">Purchasing Currently Unavailable</p>
                <p className="text-amber-700 text-xs leading-relaxed">
                  This catalogue is in demonstration mode. Cart and checkout functionality will be available
                  once business licensing, compliance review, and payment processing have been configured.
                </p>
              </div>
            </div>
          </div>

          {/* Empty cart */}
          <div className="card p-12">
            <ShoppingCart className="w-12 h-12 text-secondary/30 mx-auto mb-4" aria-hidden="true" />
            <h2 className="heading-md text-charcoal mb-2">Your cart is empty</h2>
            <p className="text-secondary text-sm mb-6">Browse our catalogue to explore products.</p>
            <Link href="/shop" className="btn-primary">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
