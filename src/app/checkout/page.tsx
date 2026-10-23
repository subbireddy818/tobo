import type { Metadata } from 'next'
import Link from 'next/link'
import { Clock, ArrowLeft, ShieldCheck, Truck, CreditCard } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Checkout — Coming Soon | American Leaf Co.',
  description: 'Online ordering and checkout are coming soon to American Leaf Co.',
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-16">
      <div className="max-w-lg text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-gold" aria-hidden="true" />
        </div>
        <span className="badge-gold text-xs uppercase tracking-wider mb-3 inline-block">Online Ordering</span>
        <h1 className="heading-xl text-charcoal mb-3">Online Checkout Coming Soon</h1>
        <p className="text-secondary leading-relaxed mb-8 text-sm">
          We are currently preparing our online ordering platform. Secure checkout, compliant delivery,
          and automated age verification are being finalized to bring you a seamless shopping experience.
        </p>

        <div className="card p-6 mb-8 text-left bg-white border border-border rounded-lg shadow-sm">
          <h2 className="text-sm font-semibold text-charcoal mb-4">What to expect when online checkout launches:</h2>
          <ul className="text-xs text-secondary space-y-3">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong>Strict 21+ Age Verification:</strong> Seamless digital identity verification at checkout adhering to federal regulations.</span>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong>Compliant Shipping:</strong> Direct-to-door adult signature required delivery in eligible jurisdictions.</span>
            </li>
            <li className="flex items-start gap-3">
              <CreditCard className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
              <span><strong>Encrypted & Secure Payments:</strong> Fully compliant payment processing with robust fraud prevention.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link href="/products" className="btn-primary inline-flex items-center gap-2 w-full sm:w-auto justify-center">
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Browse Products
          </Link>
          <Link href="/contact" className="btn-secondary w-full sm:w-auto justify-center">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  )
}
