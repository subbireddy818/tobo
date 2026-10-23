'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="heading-xl text-charcoal mb-2">Reset Password</h1>
          <p className="text-secondary text-sm">Enter your email to receive a password reset link.</p>
        </div>
        <div className="card p-8">
          <div className="demo-banner mb-6">⚠ Demo mode — password reset requires email service setup.</div>
          {submitted ? (
            <div className="text-center py-4">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-xl">✓</span>
              </div>
              <p className="text-charcoal font-medium mb-2">Check your email</p>
              <p className="text-secondary text-sm mb-6">If an account exists for {email}, you&apos;ll receive a reset link.</p>
              <Link href="/account/login" className="text-gold text-sm font-medium hover:text-gold-dark">← Back to Sign In</Link>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }} className="space-y-4">
              <div>
                <label htmlFor="reset-email" className="label">Email Address</label>
                <input id="reset-email" type="email" className="input" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required />
              </div>
              <button type="submit" className="btn-primary w-full">Send Reset Link</button>
              <p className="text-center">
                <Link href="/account/login" className="text-gold text-sm hover:text-gold-dark">← Back to Sign In</Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
