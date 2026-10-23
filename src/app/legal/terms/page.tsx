import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Use | American Leaf Co.',
  description: 'Terms and conditions governing the use of American Leaf Co. website and services.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal">
        <div className="container-xl py-12">
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-xs text-white/40">
              <li><Link href="/" className="hover:text-white/70">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li className="text-white/70" aria-current="page">Terms of Use</li>
            </ol>
          </nav>
          <h1 className="heading-xl text-white">Terms of Use</h1>
          <p className="text-white/50 mt-2 text-sm">Last updated: October 2026</p>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="max-w-3xl space-y-8 text-secondary text-sm leading-relaxed">
          <section className="space-y-3">
            <h2 className="heading-md text-charcoal">1. Eligibility & Age Verification</h2>
            <p>
              You must be at least twenty-one (21) years of age or older to access tobacco product information,
              browse our catalogue, or conduct transactions on this website in accordance with federal and applicable
              state laws. By accessing this site, you certify and warrant that you are at least 21 years of age.
              Age verification is strictly enforced.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="heading-md text-charcoal">2. Product Availability & Ordering</h2>
            <p>
              All product descriptions, specifications, pricing, and availability displayed on this website are subject
              to change without prior notice. Product availability may vary depending on state and local regulations.
              American Leaf Co. reserves the right to limit sales quantities and to refuse service or orders in compliance
              with applicable statutory requirements.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="heading-md text-charcoal">3. No Health or Cessation Claims</h2>
            <p>
              American Leaf Co. does not make any health, therapeutic, or cessation claims regarding tobacco or nicotine
              products. All tobacco products sold or displayed contain nicotine, an addictive chemical known to the State
              of California and federal health authorities to cause cancer, birth defects, or other reproductive harm.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="heading-md text-charcoal">4. Intellectual Property</h2>
            <p>
              All trademarks, service marks, logos, trade names, graphics, text, images, and other materials on this
              website are the property of American Leaf Co. or their respective brand owners and are protected by
              applicable copyright, trademark, and intellectual property laws. Unauthorized reproduction, distribution,
              or modification is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="heading-md text-charcoal">5. Limitation of Liability</h2>
            <p>
              This website and all related services, products, and content are provided on an &quot;as is&quot; and
              &quot;as available&quot; basis without warranties of any kind, whether express or implied. To the fullest
              extent permissible under applicable law, American Leaf Co. disclaims all warranties, including merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="heading-md text-charcoal">6. Compliance with Federal & State Regulations</h2>
            <p>
              Customers agree to comply with all applicable local, state, and federal laws, including the Prevent All
              Cigarette Trafficking (PACT) Act, Jenkins Act, and state excise tax mandates. Orders may only be shipped to
              jurisdictions where direct-to-consumer delivery of tobacco products is permitted by law.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="heading-md text-charcoal">7. Contact & Inquiries</h2>
            <p>
              If you have questions regarding these Terms of Use, please reach out to our legal department via our{' '}
              <Link href="/contact" className="text-gold underline hover:text-gold-dark">
                Contact Page
              </Link>{' '}
              or by writing to American Leaf Co., Richmond, Virginia.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
