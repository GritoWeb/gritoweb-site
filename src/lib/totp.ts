/**
 * TOTP / recovery-code utilities — implemented with Web Crypto API only.
 * No external packages required. Works in Cloudflare Workers (workerd) and Node.js.
 *
 * TOTP spec: RFC 6238 (based on HOTP, RFC 4226).
 * Algorithm: HMAC-SHA1, 6 digits, 30-second period, ±1 window.
 */

// ---------------------------------------------------------------------------
// Base-32 (RFC 4648 alphabet, no padding) — used by authenticator apps
// ---------------------------------------------------------------------------

const B32_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'

function base32Decode(input: string): Uint8Array {
  const str = input.toUpperCase().replace(/=+$/, '')
  const output: number[] = []
  let buffer = 0
  let bitsLeft = 0

  for (const char of str) {
    const val = B32_ALPHABET.indexOf(char)
    if (val === -1) continue
    buffer = (buffer << 5) | val
    bitsLeft += 5
    if (bitsLeft >= 8) {
      output.push((buffer >> (bitsLeft - 8)) & 0xff)
      bitsLeft -= 8
    }
  }

  return new Uint8Array(output)
}

function base32Encode(data: Uint8Array): string {
  let output = ''
  let buffer = 0
  let bitsLeft = 0

  for (const byte of data) {
    buffer = (buffer << 8) | byte
    bitsLeft += 8
    while (bitsLeft >= 5) {
      output += B32_ALPHABET[(buffer >> (bitsLeft - 5)) & 0x1f]
      bitsLeft -= 5
    }
  }
  if (bitsLeft > 0) {
    output += B32_ALPHABET[(buffer << (5 - bitsLeft)) & 0x1f]
  }

  return output
}

// ---------------------------------------------------------------------------
// HOTP (RFC 4226) — one HMAC-SHA1 computation per counter value
// ---------------------------------------------------------------------------

async function generateHOTP(key: Uint8Array, counter: bigint, digits: number): Promise<string> {
  const buf = new ArrayBuffer(8)
  const view = new DataView(buf)
  // Big-endian uint64
  view.setUint32(0, Number(counter >> 32n), false)
  view.setUint32(4, Number(counter & 0xffffffffn), false)

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign'],
  )
  const sig = await crypto.subtle.sign('HMAC', cryptoKey, buf)
  const hmac = new Uint8Array(sig)

  const offset = hmac[hmac.length - 1] & 0x0f
  const code =
    (((hmac[offset] & 0x7f) << 24) |
      ((hmac[offset + 1] & 0xff) << 16) |
      ((hmac[offset + 2] & 0xff) << 8) |
      (hmac[offset + 3] & 0xff)) %
    10 ** digits

  return code.toString().padStart(digits, '0')
}

// ---------------------------------------------------------------------------
// Public TOTP API
// ---------------------------------------------------------------------------

/** Generates a new random TOTP secret (160 bits, base32-encoded). */
export function generateTOTPSecret(): string {
  return base32Encode(crypto.getRandomValues(new Uint8Array(20)))
}

/** Returns an otpauth:// URI for the authenticator QR code. */
export function createTOTPUri(secret: string, email: string, issuer: string): string {
  return (
    `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(email)}` +
    `?secret=${secret}&issuer=${encodeURIComponent(issuer)}&algorithm=SHA1&digits=6&period=30`
  )
}

/**
 * Verifies a 6-digit TOTP code.
 * Checks current time-step and ±window steps to tolerate clock drift.
 */
export async function verifyTOTP(
  secret: string,
  code: string,
  window = 1,
): Promise<boolean> {
  if (!/^\d{6}$/.test(code)) return false
  const key = base32Decode(secret)
  const step = BigInt(Math.floor(Date.now() / 1000 / 30))
  for (let i = -window; i <= window; i++) {
    if ((await generateHOTP(key, step + BigInt(i), 6)) === code) return true
  }
  return false
}

// ---------------------------------------------------------------------------
// Recovery codes
// ---------------------------------------------------------------------------

/** Returns a random 20-character hex string (80 bits of entropy). */
export function generateRecoveryCode(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(10)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** Returns a hex-encoded SHA-256 hash of the code. */
export async function hashRecoveryCode(code: string): Promise<string> {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code))
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}
