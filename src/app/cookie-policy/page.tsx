import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Cookie Policy' }
export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">Cookie Policy</h1></div></div>
      <div className="container-xl py-10">
        <div className="demo-banner mb-8">⚠ Placeholder — requires legal review.</div>
        <div className="max-w-3xl space-y-6 text-secondary text-sm leading-relaxed">
          <h2 className="heading-md text-charcoal">Essential Cookies</h2>
          <p>We use essential cookies for: age verification status, session management, cart functionality, and authentication. These cookies are necessary for the site to function and cannot be disabled.</p>
          <div className="card p-4">
            <table className="w-full text-xs">
              <thead><tr className="text-left border-b border-border"><th className="pb-2">Cookie</th><th className="pb-2">Purpose</th><th className="pb-2">Duration</th></tr></thead>
              <tbody className="divide-y divide-border">
                <tr><td className="py-2 font-mono">age_verified</td><td className="py-2">Stores age verification status</td><td className="py-2">24 hours</td></tr>
                <tr><td className="py-2 font-mono">age_verified_at</td><td className="py-2">Verification timestamp</td><td className="py-2">24 hours</td></tr>
                <tr><td className="py-2 font-mono">session-token</td><td className="py-2">Authentication session</td><td className="py-2">Session</td></tr>
              </tbody>
            </table>
          </div>
          <h2 className="heading-md text-charcoal">No Tracking Cookies</h2>
          <p>We do not use advertising, analytics, or tracking cookies in this demonstration platform.</p>
        </div>
      </div>
    </div>
  )
}
