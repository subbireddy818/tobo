import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { confirmed, method = 'self_declaration' } = body

    if (!confirmed) {
      return NextResponse.json({ error: 'Age confirmation required.' }, { status: 400 })
    }

    const response = NextResponse.json({ success: true, method })

    // Set HTTP-only, SameSite=Strict cookie
    const now = Date.now()
    const maxAge = 60 * 60 * 24 // 24 hours

    response.cookies.set('age_verified', 'true', {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      path: '/',
    })

    response.cookies.set('age_verified_at', String(now), {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      path: '/',
    })

    response.cookies.set('age_verify_method', method, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge,
      path: '/',
    })

    return response
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }
}
