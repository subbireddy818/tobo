import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Routes that require age verification
const RESTRICTED_PATHS = [
  '/',
  '/shop',
  '/products',
  '/collections',
  '/brands',
  '/cart',
  '/checkout',
  '/account',
  '/search',
]

// Routes always accessible (public)
const PUBLIC_PATHS = [
  '/age-verification',
  '/age-restricted',
  '/privacy-policy',
  '/terms',
  '/cookie-policy',
  '/accessibility',
  '/about',
  '/contact',
  '/faq',
  '/shipping-policy',
  '/returns-policy',
  '/legal',
  '/_next',
  '/api',
  '/favicon',
  '/robots.txt',
  '/sitemap',
]

function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some(p => pathname.startsWith(p))
}

function isRestrictedPath(pathname: string): boolean {
  return RESTRICTED_PATHS.some(p => pathname === p || pathname.startsWith(p + '/'))
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Skip public paths
  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  // Check admin routes — additional auth check in page components
  if (pathname.startsWith('/admin')) {
    const sessionToken = request.cookies.get('next-auth.session-token')?.value
      || request.cookies.get('__Secure-next-auth.session-token')?.value
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/account/login?redirect=/admin', request.url))
    }
    return NextResponse.next()
  }

  // Check age verification for restricted paths
  if (isRestrictedPath(pathname)) {
    const ageVerified = request.cookies.get('age_verified')?.value
    const verifiedAt = request.cookies.get('age_verified_at')?.value

    if (!ageVerified || ageVerified !== 'true') {
      const url = new URL('/age-verification', request.url)
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }

    // Check session expiry (24 hours)
    if (verifiedAt) {
      const verifiedAtMs = parseInt(verifiedAt, 10)
      const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000
      if (Date.now() - verifiedAtMs > TWENTY_FOUR_HOURS) {
        const response = NextResponse.redirect(
          new URL('/age-verification?expired=true', request.url)
        )
        response.cookies.delete('age_verified')
        response.cookies.delete('age_verified_at')
        return response
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}
