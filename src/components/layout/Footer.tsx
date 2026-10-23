import Link from 'next/link'

const footerColumns = [
  {
    heading: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/faq' },
    ],
  },
  {
    heading: 'Shop',
    links: [
      { label: 'All Products', href: '/shop' },
      { label: 'Cigarettes', href: '/collections/cigarettes' },
      { label: 'Cigars', href: '/collections/cigars' },
      { label: 'Pipe Tobacco', href: '/collections/pipe-tobacco' },
      { label: 'Rolling Tobacco', href: '/collections/rolling-tobacco' },
      { label: 'Smokeless Tobacco', href: '/collections/smokeless-tobacco' },
      { label: 'Accessories', href: '/collections/pipes' },
      { label: 'Brands', href: '/brands' },
    ],
  },
  {
    heading: 'Customer Service',
    links: [
      { label: 'FAQs', href: '/faq' },
      { label: 'Shipping Policy', href: '/shipping-policy' },
      { label: 'Returns Policy', href: '/returns-policy' },
      { label: 'Contact Support', href: '/contact' },
      { label: 'Order Support', href: '/account/orders' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Terms of Use', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Cookie Policy', href: '/cookie-policy' },
      { label: 'Accessibility', href: '/accessibility' },
      { label: 'Tobacco Disclosures', href: '/legal/tobacco-disclosures' },
      { label: 'Age Restrictions', href: '/age-verification' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-charcoal text-white">

      {/* FDA Warning */}
      <div className="border-b border-white/10 bg-black/20">
        <div className="container-xl py-4">
          <p className="text-white/50 text-xs text-center leading-relaxed max-w-3xl mx-auto">
            <strong className="text-white/70">WARNING:</strong> This product contains nicotine. Nicotine is an addictive chemical.
            Tobacco products may cause cancer, heart disease, and other serious conditions.
            For help quitting, call 1-800-QUIT-NOW or visit <a href="https://smokefree.gov" className="underline">smokefree.gov</a>.
          </p>
        </div>
      </div>

      {/* Main columns */}
      <div className="container-xl py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {footerColumns.map((col) => (
            <div key={col.heading}>
              <h3 className="text-gold text-xs font-semibold uppercase tracking-widest mb-4">
                {col.heading}
              </h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/50 text-sm hover:text-[#4ADE80] transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-xl py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded border border-gold/30 flex items-center justify-center">
                <span className="text-gold font-serif font-bold text-xs">AL</span>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium">American Leaf Co.</p>
                <p className="text-white/30 text-xs">Premium Tobacco & Fine Accessories</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-white/30 text-xs">
                &copy; {new Date().getFullYear()} American Leaf Co. All rights reserved.
              </p>
              <p className="text-white/20 text-xs mt-0.5">
                Must be 21+ to access. Not available in all jurisdictions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
