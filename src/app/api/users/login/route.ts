/**
 * Intercepts POST /api/users/login before Payload's catch-all handler.
 *
 * - Users WITHOUT 2FA  → behaves exactly like the built-in Payload login
 *   (issues JWT + sets cookie).
 * - Users WITH 2FA     → verifies credentials, returns
 *   { requires2FA: true, pendingToken } WITHOUT setting any cookie.
 *   The client then calls POST /api/users/2fa/login-verify to complete login.
 *
 * Note: payload.login() fires Payload's afterLogin hooks unconditionally once
 * credentials pass.  For 2FA users this means the hook runs at step 1 even
 * though the session isn't yet established — document if you rely on that hook
 * for audit logging.
 */
import config from '@payload-config'
import { getPayload } from 'payload'

import { buildAuthCookieHeader, signPending2FAToken } from '@/lib/authTokens'

export const dynamic = 'force-dynamic'

type Credentials = { email?: string; password?: string }

/**
 * Read the login credentials from the request, supporting both formats the route
 * receives:
 *   - The Payload admin panel submits login as `multipart/form-data` with the JSON
 *     payload in a `_payload` field (see @payloadcms/ui Form#createFormData). The native
 *     Payload REST endpoints accept this convention; this custom route must too.
 *   - Programmatic API clients send a raw JSON body.
 */
async function readCredentials(request: Request): Promise<Credentials> {
  const contentType = request.headers.get('content-type') ?? ''

  if (
    contentType.includes('multipart/form-data') ||
    contentType.includes('application/x-www-form-urlencoded')
  ) {
    const form = await request.formData()
    const raw = form.get('_payload')
    if (typeof raw === 'string') return JSON.parse(raw) as Credentials
    return {
      email: form.get('email')?.toString(),
      password: form.get('password')?.toString(),
    }
  }

  return (await request.json()) as Credentials
}

export async function POST(request: Request) {
  let body: Credentials
  try {
    body = await readCredentials(request)
  } catch {
    return Response.json({ errors: [{ message: 'Invalid request body' }] }, { status: 400 })
  }

  if (!body.email || !body.password) {
    return Response.json(
      { errors: [{ message: 'Email and password are required' }] },
      { status: 400 },
    )
  }

  const payload = await getPayload({ config })

  // Verify credentials via Payload's local API.
  // On failure this throws (wrong password, locked account, etc.).
  let loginResult: Awaited<ReturnType<typeof payload.login<'users'>>>
  try {
    loginResult = await payload.login({
      collection: 'users',
      data: { email: body.email, password: body.password },
    })
  } catch {
    return Response.json(
      { errors: [{ message: 'Invalid email or password' }] },
      { status: 401 },
    )
  }

  const { user, token, exp } = loginResult

  if (!user || !token) {
    return Response.json({ errors: [{ message: 'Login failed' }] }, { status: 401 })
  }

  // Check 2FA status.  twoFactorEnabled has no read restriction so it's
  // present in the login result without overrideAccess.
  if ((user as any).twoFactorEnabled) {
    const pendingToken = await signPending2FAToken(String(user.id))
    return Response.json({ requires2FA: true, pendingToken })
  }

  // No 2FA — issue cookie and return the same response shape Payload would.
  const collectionConfig = payload.config.collections.find((c) => c.slug === 'users')
  const tokenExpiration = (collectionConfig?.auth as any)?.tokenExpiration ?? 7200

  const cookieHeader = buildAuthCookieHeader(
    token,
    payload.config.cookiePrefix,
    tokenExpiration,
    process.env.NODE_ENV === 'production',
  )

  const headers = new Headers({ 'Content-Type': 'application/json' })
  headers.append('Set-Cookie', cookieHeader)

  // payload.login() is a local-API call — access: { read: () => false } is NOT
  // applied automatically. Strip sensitive 2FA fields before sending to client.
  const { twoFactorSecret: _s, twoFactorRecoveryCodes: _rc, ...safeUser } = user as any

  return new Response(JSON.stringify({ message: 'Auth Passed', user: safeUser, token, exp }), { headers })
}
