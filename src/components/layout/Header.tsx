'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Search, User, Menu, X, ChevronDown } from 'lucide-react'

const navigation = [
  { label: 'Home', href: '/' },
  {
    label: 'Shop All',
    href: '/shop',
    children: [
      { label: 'All Products', href: '/shop' },
      { label: 'Featured', href: '/shop?featured=true' },
      { label: 'New Arrivals', href: '/shop?sort=newest' },
    ],
  },
  {
    label: 'Cigarettes',
    href: '/collections/cigarettes',
    children: [
      { label: 'All Cigarettes', href: '/collections/cigarettes' },
      { label: 'King Size', href: '/collections/cigarettes?size=king' },
      { label: 'Menthol', href: '/collections/cigarettes?style=menthol' },
      { label: 'Full Flavor', href: '/collections/cigarettes?style=full-flavor' },
    ],
  },
  {
    label: 'Cigars',
    href: '/collections/cigars',
    children: [
      { label: 'All Cigars', href: '/collections/cigars' },
      { label: 'Robusto', href: '/collections/cigars?format=robusto' },
      { label: 'Churchill', href: '/collections/cigars?format=churchill' },
      { label: 'Toro', href: '/collections/cigars?format=toro' },
      { label: 'Cigarillos', href: '/collections/cigarillos' },
    ],
  },
  {
    label: 'Pipe Tobacco',
    href: '/collections/pipe-tobacco',
    children: [
      { label: 'All Pipe Tobacco', href: '/collections/pipe-tobacco' },
      { label: 'English Blends', href: '/collections/pipe-tobacco?style=english' },
      { label: 'Aromatic', href: '/collections/pipe-tobacco?style=aromatic' },
      { label: 'Virginia', href: '/collections/pipe-tobacco?style=virginia' },
      { label: 'Balkan', href: '/collections/pipe-tobacco?style=balkan' },
    ],
  },
  {
    label: 'Rolling',
    href: '/collections/rolling-tobacco',
    children: [
      { label: 'Rolling Tobacco', href: '/collections/rolling-tobacco' },
      { label: 'Papers & Filters', href: '/collections/papers-filters' },
      { label: 'Pre-Rolled Cones', href: '/collections/papers-filters?type=cones' },
    ],
  },
  {
    label: 'Smokeless',
    href: '/collections/smokeless-tobacco',
    children: [
      { label: 'All Smokeless', href: '/collections/smokeless-tobacco' },
      { label: 'Chewing Tobacco', href: '/collections/smokeless-tobacco?type=chew' },
      { label: 'Dip', href: '/collections/smokeless-tobacco?type=dip' },
      { label: 'Snuff', href: '/collections/smokeless-tobacco?type=snuff' },
      { label: 'Snus', href: '/collections/smokeless-tobacco?type=snus' },
      { label: 'Hookah Tobacco', href: '/collections/hookah-tobacco' },
      { label: 'Nicotine Pouches', href: '/collections/nicotine-pouches' },
    ],
  },
  {
    label: 'Accessories',
    href: '/collections/pipes',
    children: [
      { label: 'Pipes', href: '/collections/pipes' },
      { label: 'Lighters & Matches', href: '/collections/lighters-matches' },
      { label: 'Humidors', href: '/collections/humidors-accessories' },
    ],
  },
  { label: 'Brands', href: '/brands' },
  { label: 'About', href: '/about' },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setActiveMenu(null)
  }, [pathname])

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus()
  }, [searchOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveMenu(null)
        setMobileOpen(false)
        setSearchOpen(false)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-charcoal-950 border-b border-white/5">
        <div className="container-xl">
          <p className="text-center text-white/50 text-xs py-2 tracking-wide">
            Must Be 21+ To Browse &nbsp;·&nbsp; Free Shipping on Orders $100+ &nbsp;·&nbsp;
            <Link href="/legal/tobacco-disclosures" className="underline hover:text-white/70">Legal Notices</Link>
          </p>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 bg-charcoal transition-shadow duration-200 ${
          scrolled ? 'shadow-lg shadow-black/30' : ''
        }`}
      >
        <div className="container-xl">
          <div className="flex items-center justify-between h-16 lg:h-20" ref={menuRef}>
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 flex-shrink-0 focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded"
            >
              <div className="w-8 h-8 rounded border border-gold/40 flex items-center justify-center">
                <span className="text-gold font-serif font-bold text-sm">AL</span>
              </div>
              <span className="text-white font-serif text-lg font-semibold tracking-wide hidden sm:block">
                American Leaf Co.
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav
              className="hidden lg:flex items-center gap-0.5 flex-1 justify-center"
              aria-label="Main navigation"
            >
              {navigation.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => item.children && setActiveMenu(item.href)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-[#4ADE80]'
                        : 'text-white/70 hover:text-[#4ADE80]'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-150 ${
                        activeMenu === item.href ? 'rotate-180' : ''
                      }`} aria-hidden="true" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && activeMenu === item.href && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-border rounded-lg shadow-dialog min-w-[200px] py-1.5 animate-fade-in">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={`block px-4 py-2.5 text-sm transition-colors duration-200 ${
                            isActive(child.href)
                              ? 'text-[#22C55E] font-medium'
                              : 'text-charcoal hover:text-[#22C55E] hover:bg-[#F0FDF4]'
                          }`}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white/70 hover:text-white rounded transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="p-2 text-white/70 hover:text-white rounded transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                aria-label="My account"
              >
                <User className="w-5 h-5" />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="p-2 text-white/70 hover:text-white rounded transition-colors relative focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="w-5 h-5" />
              </Link>

              {/* Mobile menu toggle */}
              <button
                className="lg:hidden p-2 text-white/70 hover:text-white rounded transition-colors focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal ml-1"
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {searchOpen && (
          <div className="border-t border-white/10">
            <div className="container-xl py-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (searchQuery.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
                  }
                }}
                className="flex gap-2"
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" aria-hidden="true" />
                  <input
                    ref={searchRef}
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands, categories…"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded text-white placeholder-white/40 text-sm focus:outline-none focus:border-gold/60 transition-colors"
                    aria-label="Search query"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-gold text-white text-sm font-medium rounded hover:bg-gold-dark transition-colors"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setSearchOpen(false)}
                  className="p-2.5 text-white/50 hover:text-white rounded transition-colors"
                  aria-label="Close search"
                >
                  <X className="w-5 h-5" />
                </button>
              </form>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed top-0 left-0 bottom-0 w-80 max-w-full bg-charcoal z-50 overflow-y-auto animate-slide-in-left"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded border border-gold/40 flex items-center justify-center">
                  <span className="text-gold font-serif font-bold text-sm">AL</span>
                </div>
                <span className="text-white font-serif text-base font-semibold">American Leaf Co.</span>
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 text-white/60 hover:text-white"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              {navigation.map((item) => (
                <div key={item.href} className="mb-1">
                  <Link
                    href={item.href}
                    className={`block px-3 py-2.5 rounded text-sm font-medium transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'text-[#4ADE80] bg-[#4ADE80]/10'
                        : 'text-white/80 hover:text-[#4ADE80] hover:bg-[#4ADE80]/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 mt-0.5 space-y-0.5 mb-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 text-xs text-white/50 hover:text-[#4ADE80] rounded transition-colors duration-200"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                <Link
                  href="/account"
                  className="flex items-center gap-2 px-3 py-2.5 text-white/70 hover:text-white text-sm rounded transition-colors"
                >
                  <User className="w-4 h-4" />
                  My Account
                </Link>
                <Link
                  href="/cart"
                  className="flex items-center gap-2 px-3 py-2.5 text-white/70 hover:text-white text-sm rounded transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Cart
                </Link>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  )
}
