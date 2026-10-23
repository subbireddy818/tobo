import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Shipping Policy' }
export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">Shipping Policy</h1></div></div>
      <div className="container-xl py-10">
        <div className="demo-banner mb-8">⚠ Placeholder — shipping policies must be verified against applicable federal and state tobacco shipping laws before publication.</div>
        <div className="max-w-3xl space-y-6 text-secondary text-sm leading-relaxed">
          <h2 className="heading-md text-charcoal">Shipping Availability</h2>
          <p>Tobacco shipping eligibility varies by product type, destination state, and applicable law. Not all products can be shipped to all locations. The PACT Act and individual state laws impose specific requirements on tobacco shipments.</p>
          <h2 className="heading-md text-charcoal">Age Verification at Delivery</h2>
          <p>Where required by law, adult signature and/or identification may be required at the point of delivery. Orders cannot be delivered to minors.</p>
          <h2 className="heading-md text-charcoal">Restricted Destinations</h2>
          <p>Certain states prohibit or restrict the direct-to-consumer shipment of specific tobacco products. Orders to restricted destinations will not be processed.</p>
          <h2 className="heading-md text-charcoal">Carrier Restrictions</h2>
          <p>Not all carriers accept tobacco products. Shipping method availability is subject to carrier policy and will be confirmed during checkout once purchasing is enabled.</p>
        </div>
      </div>
    </div>
  )
}
