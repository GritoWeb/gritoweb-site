/**
 * Auth-token helpers for the 2FA login flow.
 *
 * jose v5 is edge-compatible (uses crypto.subtle) and is already a transitive
 * dependency of Payload CMS, so no extra runtime cost.
 *
 * Two token types:
 *   pending_2fa  – short-lived (5 min), issued after credential check passes
 *                  but before TOTP is verified.  Contains only the user ID.
 *   auth         – full Payload-compatible HS256 JWT issued after TOTP passes.
 *                  Payload verifies its own tokens with jsonwebtoken using the
 *                  same PAYLOAD_SECRET and the same claim shape, so tokens we
 *                  generate here are accepted transparently.
 */

import { SignJWT, jwtVerify } from 'jose'

const PENDING_TYPE = 'pending_2fa'

function secret(): Uint8Array {
  const s = process.env.PAYLOAD_SECRET
  if (!s) throw new Error('PAYLOAD_SECRET env var is not set')
  return new TextEncoder().encode(s)
}

// ---------------------------------------------------------------------------
// Pending-2FA tokens (step 1 of two-phase login)
// ---------------------------------------------------------------------------

export async function signPending2FAToken(userId: string | number): Promise<string> {
  return new SignJWT({ sub: String(userId), type: PENDING_TYPE })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(secret())
}

/** Returns the user-id string encoded in the token, or throws on invalid/expired. */
export async function verifyPending2FAToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, secret())
  if (payload.type !== PENDING_TYPE || !payload.sub) {
    throw new Error('Not a pending-2FA token')
  }
  return payload.sub
}

// ---------------------------------------------------------------------------
// Full Payload auth tokens (step 2 — issued after TOTP passes)
// ---------------------------------------------------------------------------

/**
 * Generates a JWT that Payload CMS accepts as a valid auth token.
 *
 * Payload 3 signs tokens with PAYLOAD_SECRET + HS256 and expects the claims:
 *   { id, email, collection }
 *
 * tokenExpiration is in seconds (Payload default: 7 200 s = 2 h).
 */
export async function generatePayloadAuthToken(
  user: { id: number | string; email: string },
  tokenExpiration = 7200,
): Promise<{ token: string; exp: number }> {
  const now = Math.floor(Date.now() / 1000)
  const exp = now + tokenExpiration
  const token = await new SignJWT({ id: user.id, email: user.email, collection: 'users' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt(now)
    .setExpirationTime(exp)
    .sign(secret())
  return { token, exp }
}

// ---------------------------------------------------------------------------
// Cookie builder
// ---------------------------------------------------------------------------

/**
 * Returns a Set-Cookie header value for the Payload auth cookie.
 * cookiePrefix defaults to 'payload' (Payload's own default).
 */
export function buildAuthCookieHeader(
  token: string,
  cookiePrefix: string | undefined,
  tokenExpiration: number,
  secure: boolean,
): string {
  const name = `${cookiePrefix ?? 'payload'}-token`
  const parts = [`${name}=${token}`, 'Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${tokenExpiration}`]
  if (secure) parts.push('Secure')
  return parts.join('; ')
}
