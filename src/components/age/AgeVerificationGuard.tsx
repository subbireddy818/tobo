'use client'

import { usePathname } from 'next/navigation'

// Layout wrapper — does not block rendering (middleware handles security)
// This component adds structural wrappers only
export function AgeVerificationGuard({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
