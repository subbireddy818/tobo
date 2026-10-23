import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AgeVerificationGuard } from '@/components/age/AgeVerificationGuard'

export const metadata: Metadata = {
  title: {
    default: 'American Leaf Co. — Premium Tobacco Catalogue',
    template: '%s | American Leaf Co.',
  },
  description: 'Browse our curated catalogue of premium tobacco products. Age verification required. Must be 21+ to access.',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    siteName: 'American Leaf Co.',
    title: 'American Leaf Co. — Premium Tobacco Catalogue',
    description: 'Curated catalogue of premium tobacco products. Must be 21+.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-ivory font-sans text-charcoal antialiased">
        <AgeVerificationGuard>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
        </AgeVerificationGuard>
      </body>
    </html>
  )
}
