'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPassword: '', agreeTerms: false })

  const update = (field: string, value: string | boolean) => setForm(prev => ({ ...prev, [field]: value }))

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded border border-gold/40 flex items-center justify-center mx-auto mb-4">
            <span className="text-gold font-serif font-bold text-lg">AL</span>
          </div>
          <h1 className="heading-xl text-charcoal mb-2">Create Account</h1>
          <p className="text-secondary text-sm">Join American Leaf Co.</p>
        </div>

        <div className="card p-8">
          <div className="demo-banner mb-6">⚠ Demo mode — registration requires database setup.</div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="firstName" className="label">First Name</label>
                <input id="firstName" type="text" className="input" value={form.firstName} onChange={e => update('firstName', e.target.value)} placeholder="John" />
              </div>
              <div>
                <label htmlFor="lastName" className="label">Last Name</label>
                <input id="lastName" type="text" className="input" value={form.lastName} onChange={e => update('lastName', e.target.value)} placeholder="Doe" />
              </div>
            </div>
            <div>
              <label htmlFor="reg-email" className="label">Email</label>
              <input id="reg-email" type="email" className="input" value={form.email} onChange={e => update('email', e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="reg-password" className="label">Password</label>
              <input id="reg-password" type="password" className="input" value={form.password} onChange={e => update('password', e.target.value)} placeholder="••••••••" />
              <p className="text-xs text-secondary mt-1">Minimum 8 characters with a number and special character.</p>
            </div>
            <div>
              <label htmlFor="confirm-password" className="label">Confirm Password</label>
              <input id="confirm-password" type="password" className="input" value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} placeholder="••••••••" />
            </div>
            <label className="flex items-start gap-2 cursor-pointer">
              <input type="checkbox" checked={form.agreeTerms} onChange={e => update('agreeTerms', e.target.checked)} className="mt-1 accent-gold" />
              <span className="text-xs text-secondary">I confirm I am 21 years of age or older and agree to the <Link href="/terms" className="text-gold hover:text-gold-dark">Terms of Use</Link> and <Link href="/privacy-policy" className="text-gold hover:text-gold-dark">Privacy Policy</Link>.</span>
            </label>
            <button type="submit" className="btn-primary w-full">Create Account</button>
          </form>
          <p className="mt-6 text-center text-secondary text-sm">
            Already have an account? <Link href="/account/login" className="text-gold font-medium hover:text-gold-dark">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
