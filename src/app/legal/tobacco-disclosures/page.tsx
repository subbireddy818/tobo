import type { Metadata } from 'next'
import { AlertTriangle, Shield } from 'lucide-react'

export const metadata: Metadata = { title: 'Tobacco Disclosures', description: 'Legal disclosures and health warnings for tobacco products.' }

export default function TobaccoDisclosuresPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">Tobacco Disclosures</h1><p className="text-white/50 mt-2">Required legal notices and health warnings.</p></div></div>
      <div className="container-xl py-10">
        <div className="max-w-3xl space-y-8">
          {/* FDA Warning */}
          <div className="bg-charcoal rounded-lg p-6 text-white">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0" aria-hidden="true" />
              <div>
                <h2 className="font-bold text-lg mb-2">SURGEON GENERAL&apos;S WARNING</h2>
                <p className="text-white/80 leading-relaxed">Smoking Causes Lung Cancer, Heart Disease, Emphysema, And May Complicate Pregnancy.</p>
              </div>
            </div>
          </div>

          <div className="fda-warning">
            <p><strong>WARNING:</strong> This product contains nicotine. Nicotine is an addictive chemical.</p>
          </div>

          <div className="fda-warning">
            <p><strong>WARNING:</strong> Smokeless tobacco is not a safe alternative to cigarettes. This product can cause mouth cancer, gum disease, and tooth loss.</p>
          </div>

          <section>
            <h2 className="heading-md text-charcoal mb-4">Federal Age Requirement</h2>
            <div className="card p-5">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-secondary text-sm leading-relaxed">Under federal law (Tobacco 21), it is illegal to sell tobacco products to anyone under 21 years of age. All purchasers must be verified to be 21 or older.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="heading-md text-charcoal mb-4">Compliance Notice</h2>
            <p className="text-secondary text-sm leading-relaxed">This platform is designed to comply with applicable FDA tobacco product rules, PACT Act shipping requirements, and state-specific regulations. All compliance rules must be reviewed by qualified legal counsel before real transactions are enabled.</p>
          </section>

          <div className="demo-banner">⚠ This is a demonstration platform. All product information is fictional. Consult a qualified attorney for applicable legal requirements.</div>
        </div>
      </div>
    </div>
  )
}
