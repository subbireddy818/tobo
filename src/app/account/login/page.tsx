'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded border border-gold/40 flex items-center justify-center mx-auto mb-4">
            <span className="text-gold font-serif font-bold text-lg">AL</span>
          </div>
          <h1 className="heading-xl text-charcoal mb-2">Sign In</h1>
          <p className="text-secondary text-sm">Access your account.</p>
        </div>

        <div className="card p-8">
          <div className="demo-banner mb-6">⚠ Demo mode — authentication requires database setup.</div>
          <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input id="email" type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input id="password" type="password" className="input" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
            <button type="submit" className="btn-primary w-full">Sign In</button>
          </form>
          <div className="mt-6 text-center space-y-2">
            <Link href="/account/forgot-password" className="text-gold text-sm hover:text-gold-dark block">Forgot your password?</Link>
            <p className="text-secondary text-sm">Don&apos;t have an account? <Link href="/account/register" className="text-gold font-medium hover:text-gold-dark">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
