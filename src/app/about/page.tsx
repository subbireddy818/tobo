import type { Metadata } from 'next'
import Link from 'next/link'
import { Building2, Shield, Truck, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about American Leaf Co. — a demonstration tobacco e-commerce platform.',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <h1 className="heading-xl text-white">About American Leaf Co.</h1>
          <p className="text-white/50 mt-2">Demonstration tobacco e-commerce platform.</p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="demo-banner mb-8">
          ⚠ American Leaf Co. is a fictional demonstration business. All company details shown are illustrative.
        </div>

        <div className="max-w-3xl space-y-8">
          <section>
            <h2 className="heading-lg text-charcoal mb-4">Our Mission</h2>
            <p className="text-secondary leading-relaxed">
              American Leaf Co. is a demonstration e-commerce platform built to showcase compliant tobacco
              retail for the United States market. This platform features age verification, jurisdiction-aware
              compliance, product eligibility checks, and a catalogue-first architecture designed for
              responsible commerce.
            </p>
          </section>

          <section>
            <h2 className="heading-lg text-charcoal mb-4">Platform Features</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Shield, title: 'Age Verification', desc: 'Mandatory 21+ verification for all visitors as required by US federal law.' },
                { icon: Building2, title: 'Compliance Engine', desc: 'Jurisdiction-aware rules for product eligibility, shipping, and tax.' },
                { icon: Truck, title: 'Shipping Controls', desc: 'Configurable shipping zones and carrier restrictions.' },
                { icon: Phone, title: 'Customer Support', desc: 'Account management, order tracking, and contact support.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card p-5">
                  <Icon className="w-5 h-5 text-gold mb-3" aria-hidden="true" />
                  <h3 className="text-charcoal font-semibold text-sm mb-1">{title}</h3>
                  <p className="text-secondary text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <h2 className="text-amber-800 font-semibold mb-2">⚠ Important Notice</h2>
            <p className="text-amber-700 text-sm leading-relaxed">
              This is a demonstration application. No real products are available for purchase.
              All brand names, product details, and pricing are fictional. Checkout is disabled
              by default until proper business licensing, compliance review, payment processing
              approval, and legal counsel have been obtained.
            </p>
          </section>
        </div>

        <div className="mt-8">
          <Link href="/contact" className="btn-primary">Contact Us</Link>
        </div>
      </div>
    </div>
  )
}
