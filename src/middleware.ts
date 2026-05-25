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

  // Check if URL already has a valid locale prefix
  const pathnameLocale = locales.find(
    (loc) => pathname.startsWith(`/${loc}/`) || pathname === `/${loc}`,
  )

  if (pathnameLocale) {
    // URL already has locale prefix — forward via header and keep cookie in sync
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', pathnameLocale)

    const response = NextResponse.next({ request: { headers: requestHeaders } })
    response.cookies.set(cookieName, pathnameLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
    return response
  }

  // No locale prefix — detect locale and redirect
  const cookieLocale = request.cookies.get(cookieName)?.value
  const validCookieLocale = locales.includes(cookieLocale as (typeof locales)[number])
    ? (cookieLocale as (typeof locales)[number])
    : null

  const acceptLanguage = request.headers.get('accept-language') ?? ''
  const browserLocale = acceptLanguage.toLowerCase().startsWith('pt') ? 'pt' : defaultLocale

  const locale = validCookieLocale ?? browserLocale

  const newUrl = new URL(`/${locale}${pathname}`, request.url)
  newUrl.search = request.nextUrl.search
  return NextResponse.redirect(newUrl, 307)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|block-previews|images).*)'],
}
