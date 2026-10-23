import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Returns Policy' }
export default function ReturnsPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">Returns Policy</h1></div></div>
      <div className="container-xl py-10">
        <div className="demo-banner mb-8">⚠ Placeholder — returns policy must be reviewed by qualified counsel before publication.</div>
        <div className="max-w-3xl space-y-6 text-secondary text-sm leading-relaxed">
          <p>Due to the nature of tobacco products, returns may be restricted. Applicable federal and state laws may impose limitations on the return, exchange, or resale of tobacco products.</p>
          <p>Damaged or incorrect orders should be reported within 48 hours of delivery. Contact customer support with your order number for assistance.</p>
          <p>Refunds, where permitted, will be processed through the original payment method.</p>
        </div>
      </div>
    </div>
  )
}
