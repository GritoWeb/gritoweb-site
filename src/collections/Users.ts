import type { CollectionConfig } from 'payload'

import {
  createTOTPUri,
  generateRecoveryCode,
  generateTOTPSecret,
  hashRecoveryCode,
  verifyTOTP,
} from '../lib/totp'
import { buildAuthCookieHeader, generatePayloadAuthToken, verifyPending2FAToken } from '../lib/authTokens'

const ISSUER = 'Grito'
const RECOVERY_CODE_COUNT = 8

// Token expiration in seconds — must match payload.config or Payload's default (7 200 s = 2 h).
const TOKEN_EXPIRATION = 7200

type RecoveryCode = { hash: string; usedAt: string | null }

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      // Stores the base32-encoded TOTP secret.
      // read: () => false — never exposed through the REST API.
      name: 'twoFactorSecret',
      type: 'text',
      admin: { hidden: true },
      access: { read: () => false },
    },
    {
      name: 'twoFactorEnabled',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      // JSON array of { hash: string, usedAt: string | null }.
      // Hashes are SHA-256 of the plaintext recovery codes.
      // read: () => false — never exposed through the REST API.
      name: 'twoFactorRecoveryCodes',
      type: 'json',
      admin: { hidden: true },
      access: { read: () => false },
    },
    {
      // Custom UI rendered only on the logged-in user's own account page.
      // Handles setup, QR display, confirmation and disable flows.
      name: 'twoFactorAdmin',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/TwoFactorAdmin#default',
        },
      },
    },
  ],
  endpoints: [
    // -----------------------------------------------------------------------
    // POST /api/users/2fa/setup
    // Generates a TOTP secret + recovery codes and stores them.
    // Does NOT activate 2FA — call /confirm after the user scans the QR.
    // Requires: valid Payload auth token (req.user must be set).
    // Returns: { uri, recoveryCodes }
    // -----------------------------------------------------------------------
    {
      path: '/2fa/setup',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ errors: [{ message: 'Unauthorized' }] }, { status: 401 })
        }

        const secret = generateTOTPSecret()
        const uri = createTOTPUri(secret, req.user.email as string, ISSUER)

        // Generate plaintext codes for one-time display, store only hashes.
        const plainCodes: string[] = []
        const hashedCodes: RecoveryCode[] = []
        for (let i = 0; i < RECOVERY_CODE_COUNT; i++) {
          const code = generateRecoveryCode()
          plainCodes.push(code)
          hashedCodes.push({ hash: await hashRecoveryCode(code), usedAt: null })
        }

        await req.payload.update({
          collection: 'users',
          id: req.user.id as number,
          data: {
            twoFactorSecret: secret,
            twoFactorRecoveryCodes: hashedCodes as unknown as Record<string, unknown>[],
          } as any,
          overrideAccess: true,
        })

        return Response.json({ uri, recoveryCodes: plainCodes })
      },
    },

    // -----------------------------------------------------------------------
    // POST /api/users/2fa/confirm
    // Body: { code: string }
    // Activates 2FA after the user verifies the first TOTP code.
    // Requires: valid auth token + /setup must have been called first.
    // Returns: { success: true }
    // -----------------------------------------------------------------------
    {
      path: '/2fa/confirm',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ errors: [{ message: 'Unauthorized' }] }, { status: 401 })
        }

        const body = req.data as { code?: string } | undefined
        if (!body?.code) {
          return Response.json({ errors: [{ message: 'code is required' }] }, { status: 400 })
        }

        // overrideAccess to read the secret (access: read = () => false)
        const user = await req.payload.findByID({
          collection: 'users',
          id: req.user.id as number,
          overrideAccess: true,
        })

        if (!(user as any).twoFactorSecret) {
          return Response.json({ errors: [{ message: 'Call /setup first' }] }, { status: 400 })
        }

        const valid = await verifyTOTP((user as any).twoFactorSecret as string, body.code)
        if (!valid) {
          return Response.json({ errors: [{ message: 'Invalid TOTP code' }] }, { status: 400 })
        }

        await req.payload.update({
          collection: 'users',
          id: req.user.id as number,
          data: { twoFactorEnabled: true } as any,
          overrideAccess: true,
        })

        return Response.json({ success: true })
      },
    },

    // -----------------------------------------------------------------------
    // POST /api/users/2fa/login-verify
    // Body: { pendingToken: string, code: string } OR
    //       { pendingToken: string, recoveryCode: string }
    // Completes the second step of login for users with 2FA enabled.
    // Does NOT require an existing auth token (user is mid-login).
    // Returns: { token, exp, user } + sets Payload auth cookie.
    // -----------------------------------------------------------------------
    {
      path: '/2fa/login-verify',
      method: 'post',
      handler: async (req) => {
        const body = req.data as {
          pendingToken?: string
          code?: string
          recoveryCode?: string
        } | undefined

        if (!body?.pendingToken) {
          return Response.json({ errors: [{ message: 'pendingToken is required' }] }, { status: 400 })
        }
        if (!body.code && !body.recoveryCode) {
          return Response.json(
            { errors: [{ message: 'code or recoveryCode is required' }] },
            { status: 400 },
          )
        }

        let userId: string
        try {
          userId = await verifyPending2FAToken(body.pendingToken)
        } catch {
          return Response.json(
            { errors: [{ message: 'Invalid or expired pendingToken' }] },
            { status: 401 },
          )
        }

        const user = await req.payload.findByID({
          collection: 'users',
          id: Number(userId),
          overrideAccess: true,
        })

        if (!(user as any)?.twoFactorEnabled || !(user as any)?.twoFactorSecret) {
          return Response.json({ errors: [{ message: 'Invalid request' }] }, { status: 400 })
        }

        let verified = false

        if (body.code) {
          verified = await verifyTOTP((user as any).twoFactorSecret as string, body.code)
        } else if (body.recoveryCode) {
          const codes = ((user as any).twoFactorRecoveryCodes as RecoveryCode[]) ?? []
          const codeHash = await hashRecoveryCode(body.recoveryCode)
          const idx = codes.findIndex((c) => c.hash === codeHash && !c.usedAt)
          if (idx !== -1) {
            verified = true
            const updated = codes.map((c, i) =>
              i === idx ? { ...c, usedAt: new Date().toISOString() } : c,
            )
            await req.payload.update({
              collection: 'users',
              id: user.id as number,
              data: { twoFactorRecoveryCodes: updated as unknown as Record<string, unknown>[] } as any,
              overrideAccess: true,
            })
          }
        }

        if (!verified) {
          return Response.json({ errors: [{ message: 'Invalid code' }] }, { status: 401 })
        }

        const collectionConfig = req.payload.config.collections.find((c) => c.slug === 'users')
        const tokenExpiration = (collectionConfig?.auth as any)?.tokenExpiration ?? TOKEN_EXPIRATION

        const { token, exp } = await generatePayloadAuthToken(
          { id: user.id as number, email: user.email as string },
          tokenExpiration,
        )

        const cookieHeader = buildAuthCookieHeader(
          token,
          req.payload.config.cookiePrefix,
          tokenExpiration,
          process.env.NODE_ENV === 'production',
        )

        const sanitizedUser = {
          id: user.id,
          email: user.email,
          twoFactorEnabled: true,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          collection: 'users',
        }

        const headers = new Headers({ 'Content-Type': 'application/json' })
        headers.append('Set-Cookie', cookieHeader)
        return new Response(JSON.stringify({ token, exp, user: sanitizedUser }), { headers })
      },
    },

    // -----------------------------------------------------------------------
    // POST /api/users/2fa/disable
    // Body: { code: string } OR { recoveryCode: string }
    // Disables 2FA and removes secret + recovery codes.
    // Requires: valid auth token + a valid TOTP code or recovery code.
    // Returns: { success: true }
    // -----------------------------------------------------------------------
    {
      path: '/2fa/disable',
      method: 'post',
      handler: async (req) => {
        if (!req.user) {
          return Response.json({ errors: [{ message: 'Unauthorized' }] }, { status: 401 })
        }

        const body = req.data as { code?: string; recoveryCode?: string } | undefined
        if (!body?.code && !body?.recoveryCode) {
          return Response.json(
            { errors: [{ message: 'code or recoveryCode is required' }] },
            { status: 400 },
          )
        }

        const user = await req.payload.findByID({
          collection: 'users',
          id: req.user.id as number,
          overrideAccess: true,
        })

        if (!(user as any).twoFactorEnabled || !(user as any).twoFactorSecret) {
          return Response.json({ errors: [{ message: '2FA is not enabled' }] }, { status: 400 })
        }

        let verified = false

        if (body.code) {
          verified = await verifyTOTP((user as any).twoFactorSecret as string, body.code)
        } else if (body.recoveryCode) {
          const codes = ((user as any).twoFactorRecoveryCodes as RecoveryCode[]) ?? []
          const codeHash = await hashRecoveryCode(body.recoveryCode)
          verified = codes.some((c) => c.hash === codeHash && !c.usedAt)
        }

        if (!verified) {
          return Response.json({ errors: [{ message: 'Invalid code' }] }, { status: 401 })
        }

        await req.payload.update({
          collection: 'users',
          id: req.user.id as number,
          data: {
            twoFactorEnabled: false,
            twoFactorSecret: null,
            twoFactorRecoveryCodes: null,
          } as any,
          overrideAccess: true,
        })

        return Response.json({ success: true })
      },
    },
  ],
}
