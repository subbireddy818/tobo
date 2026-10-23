'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ShieldCheck, AlertTriangle } from 'lucide-react'

function AgeVerificationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/shop'
  const isExpired = searchParams.get('expired') === 'true'

  const [confirmed, setConfirmed] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    if (!confirmed) {
      setError('Please confirm that you meet the legal age requirement to continue.')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const res = await fetch('/api/age-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ confirmed: true, method: 'self_declaration' }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Verification failed. Please try again.')
      }

      router.push(redirect)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred.')
      setIsLoading(false)
    }
  }

  function handleExit() {
    router.push('/age-restricted')
  }

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            #B69A63,
            #B69A63 1px,
            transparent 1px,
            transparent 60px
          )`,
        }}
        aria-hidden="true"
      />

      {/* Glow effect */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #B69A63 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded border border-gold/40 flex items-center justify-center">
              <span className="text-gold font-serif font-bold text-lg">AL</span>
            </div>
            <span className="text-white font-serif text-xl font-semibold tracking-wide">
              American Leaf Co.
            </span>
          </div>
        </div>

        {/* Card */}
        <div className="bg-white/[0.04] border border-white/10 backdrop-blur-sm rounded-lg p-8 shadow-dialog">
          {/* Expired notice */}
          {isExpired && (
            <div className="mb-6 flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded p-4">
              <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-amber-200 text-sm">
                Your session has expired. Please verify your age again to continue.
              </p>
            </div>
          )}

          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-14 h-14 rounded-full border border-gold/30 bg-gold/10 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-gold" aria-hidden="true" />
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-white font-serif text-2xl font-bold text-center mb-2">
            Age Verification
          </h1>
          <p className="text-white/50 text-center text-sm mb-8 leading-relaxed">
            This website contains information about tobacco products and is intended only
            for individuals who meet the legal age requirements applicable to their location.
          </p>

          {/* Age badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded px-4 py-2">
              <span className="text-gold font-serif font-bold text-xl">21+</span>
              <span className="text-white/60 text-xs">Required by Federal Law</span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleVerify} noValidate>
            {/* Checkbox */}
            <label className="flex items-start gap-3 cursor-pointer group mb-6">
              <div className="relative flex-shrink-0 mt-0.5">
                <input
                  type="checkbox"
                  checked={confirmed}
                  onChange={(e) => {
                    setConfirmed(e.target.checked)
                    if (e.target.checked) setError('')
                  }}
                  className="sr-only"
                  aria-label="Age confirmation checkbox"
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-150 ${
                    confirmed
                      ? 'bg-gold border-gold'
                      : 'border-white/30 bg-transparent group-hover:border-gold/50'
                  }`}
                >
                  {confirmed && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-white/70 text-sm leading-relaxed">
                I confirm that I meet the applicable legal age requirement (21 years or older)
                and that the information I provide is accurate.
              </span>
            </label>

            {/* Error */}
            {error && (
              <div
                className="mb-4 flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded p-3"
                role="alert"
                aria-live="assertive"
              >
                <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            {/* CTA */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gold text-white font-semibold text-sm rounded tracking-wide transition-all duration-200 hover:bg-gold-dark disabled:opacity-60 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal mb-3"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Verifying…
                </span>
              ) : (
                'Continue'
              )}
            </button>

            {/* Exit */}
            <button
              type="button"
              onClick={handleExit}
              className="w-full py-2.5 text-white/40 text-sm hover:text-white/70 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal rounded"
            >
              I do not meet the legal age requirement
            </button>
          </form>

          {/* Security & compliance reassurance */}
          <p className="mt-6 text-center text-white/30 text-xs leading-relaxed">
            By confirming, you certify your age and agree to our{' '}
            <a href="/privacy-policy" className="text-white/50 underline hover:text-white/70">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="/terms" className="text-white/50 underline hover:text-white/70">
              Terms of Use
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AgeVerificationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-charcoal flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    }>
      <AgeVerificationContent />
    </Suspense>
  )
}
