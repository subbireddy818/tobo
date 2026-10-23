import type { Metadata } from 'next'
import Link from 'next/link'
import { MapPin } from 'lucide-react'

export const metadata: Metadata = { title: 'Saved Addresses' }

export default function AddressesPage() {
  return (
    <div className="min-h-screen bg-ivory">
      <div className="bg-charcoal"><div className="container-xl py-12">
        <h1 className="heading-xl text-white">Saved Addresses</h1>
        <p className="text-white/50 mt-2">Manage your shipping addresses.</p>
      </div></div>
      <div className="container-xl py-10">
        <div className="demo-banner mb-8">⚠ Account system is in demonstration mode.</div>
        <div className="max-w-2xl mx-auto">
          <div className="card p-12 text-center">
            <MapPin className="w-12 h-12 text-secondary/30 mx-auto mb-4" aria-hidden="true" />
            <h2 className="heading-md text-charcoal mb-2">No addresses saved</h2>
            <p className="text-secondary text-sm mb-6">Add a shipping address to speed up checkout.</p>
            <button className="btn-primary" disabled>Add Address</button>
            <p className="text-xs text-secondary mt-3">Address management will be available once the account system is configured.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
