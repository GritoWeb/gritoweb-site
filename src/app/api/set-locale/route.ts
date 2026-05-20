import { NextRequest, NextResponse } from 'next/server'

const locales = ['pt', 'en'] as const

export function POST(request: NextRequest) {
  const locale = request.nextUrl.searchParams.get('locale')

  if (!locale || !locales.includes(locale as (typeof locales)[number])) {
    return NextResponse.json({ error: 'Invalid locale' }, { status: 400 })
  }

  const response = NextResponse.json({ locale })
  response.cookies.set('NEXT_LOCALE', locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: 'lax',
  })

  return response
}
