import type { Metadata } from 'next'
export const metadata: Metadata = { title: 'Accessibility' }
export default function AccessibilityPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">Accessibility Statement</h1></div></div>
      <div className="container-xl py-10">
        <div className="max-w-3xl space-y-6 text-secondary text-sm leading-relaxed">
          <p>American Leaf Co. is committed to ensuring digital accessibility for people with disabilities. We target WCAG 2.2 AA compliance across our platform.</p>
          <h2 className="heading-md text-charcoal">What We Do</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Semantic HTML and proper heading hierarchy</li>
            <li>Accessible form labels and error messages</li>
            <li>Keyboard navigation support</li>
            <li>Visible focus indicators</li>
            <li>Sufficient color contrast ratios</li>
            <li>Screen reader compatibility</li>
            <li>Reduced motion support via <code>prefers-reduced-motion</code></li>
            <li>Accessible dialog and modal interactions</li>
          </ul>
          <h2 className="heading-md text-charcoal">Feedback</h2>
          <p>If you encounter accessibility barriers, please contact us. We welcome feedback to help improve the experience for all users.</p>
        </div>
      </div>
    </div>
  )
}
