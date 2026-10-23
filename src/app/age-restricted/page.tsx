import type { Metadata } from 'next'
import Link from 'next/link'
import { XCircle, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Access Denied',
  description: 'You are not eligible to access this website.',
  robots: { index: false, follow: false },
}

export default function AgeRestrictedPage() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full border border-red-500/30 bg-red-500/10 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-400" aria-hidden="true" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-white font-serif text-2xl font-bold mb-3">
          Access Denied
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8">
          You are not eligible to access this website.
          This website contains tobacco product information intended only
          for adults who meet applicable legal age requirements.
        </p>

        <div className="bg-white/[0.04] border border-white/10 rounded-lg p-6 mb-8 text-left">
          <h2 className="text-white/80 text-sm font-semibold mb-3">Resources for Help</h2>
          <ul className="space-y-2 text-sm text-white/50">
            <li>
              <a
                href="https://www.cdc.gov/tobacco/quit_smoking/"
                className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                CDC — Quit Smoking Resources
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href="https://smokefree.gov/"
                className="inline-flex items-center gap-1.5 hover:text-white/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                SmokeFree.gov
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>

        {/* Exit link */}
        <a
          href="https://www.google.com"
          className="inline-flex items-center gap-2 text-white/40 text-sm hover:text-white/70 transition-colors"
        >
          <ExternalLink className="w-4 h-4" aria-hidden="true" />
          Leave this website
        </a>
      </div>
    </div>
  )
}
