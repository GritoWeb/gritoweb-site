import { NextRequest, NextResponse } from 'next/server'

const locales = ['pt', 'en'] as const
const defaultLocale = 'pt'
const cookieName = 'NEXT_LOCALE'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip Payload admin, API, and static assets
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Read locale from cookie, fall back to Accept-Language, then default
  const cookieLocale = request.cookies.get(cookieName)?.value
  const validCookieLocale = locales.includes(cookieLocale as (typeof locales)[number])
    ? (cookieLocale as (typeof locales)[number])
    : null

  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const browserLocale = acceptLanguage.toLowerCase().startsWith('pt') ? 'pt' : defaultLocale

  const locale = validCookieLocale ?? browserLocale

  // Forward locale as header so Server Components can read it
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-locale', locale)

  return NextResponse.next({ request: { headers: requestHeaders } })
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|block-previews|images).*)'],
}
