import type { Metadata } from 'next'
import Link from 'next/link'
import { User, Package, MapPin, Settings } from 'lucide-react'

export const metadata: Metadata = { title: 'My Account' }

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12"><h1 className="heading-xl text-white">My Account</h1></div></div>
      <div className="container-xl py-10">
        <div className="demo-banner mb-8">⚠ Account system is in demonstration mode. Authentication requires database setup.</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: User, title: 'Profile', desc: 'Manage your account details.', href: '/account/login' },
            { icon: Package, title: 'Orders', desc: 'View your order history.', href: '/account/orders' },
            { icon: MapPin, title: 'Addresses', desc: 'Manage shipping addresses.', href: '/account/addresses' },
            { icon: Settings, title: 'Settings', desc: 'Account preferences.', href: '/account/login' },
          ].map(({ icon: Icon, title, desc, href }) => (
            <Link key={title} href={href} className="group card card-hover p-6">
              <Icon className="w-6 h-6 text-gold mb-3" aria-hidden="true" />
              <h2 className="text-charcoal font-semibold mb-1 group-hover:text-gold transition-colors">{title}</h2>
              <p className="text-secondary text-sm">{desc}</p>
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/account/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    </div>
  )
}
