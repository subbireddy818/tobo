import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Privacy Policy for American Leaf Co.' }

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">Privacy Policy</h1></div></div>
      <div className="container-xl py-10">
        <div className="demo-banner mb-8">⚠ This is placeholder legal text for demonstration purposes only. A qualified attorney must review and approve all policies before publication.</div>
        <div className="max-w-3xl prose prose-sm text-secondary space-y-6">
          <h2 className="heading-md text-charcoal">1. Information We Collect</h2>
          <p>We collect information you provide directly, such as your name, email address, shipping address, and age verification data. We collect the minimum information necessary for the applicable business process.</p>
          <h2 className="heading-md text-charcoal">2. How We Use Information</h2>
          <p>Information is used for order processing, age verification, account management, legal compliance, and customer support. We do not sell personal information to third parties.</p>
          <h2 className="heading-md text-charcoal">3. Age Verification Data</h2>
          <p>Age verification data is collected to comply with federal and state tobacco sales laws. We retain the minimum data necessary and do not store identity documents unless required by an approved verification provider.</p>
          <h2 className="heading-md text-charcoal">4. Cookies</h2>
          <p>We use essential cookies for age verification, session management, and cart functionality. See our Cookie Policy for details.</p>
          <h2 className="heading-md text-charcoal">5. Data Retention and Deletion</h2>
          <p>Personal data is retained only as long as necessary for business and legal purposes. You may request account deletion subject to applicable retention requirements.</p>
          <h2 className="heading-md text-charcoal">6. Contact</h2>
          <p>For privacy inquiries, contact us at the details provided on our Contact page.</p>
        </div>
      </div>
    </div>
  )
}
