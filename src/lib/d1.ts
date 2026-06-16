import { getCloudflareContext } from '@opennextjs/cloudflare'
import type { GetPlatformProxyOptions } from 'wrangler'

type D1 = CloudflareEnv['D1']

let proxyD1Promise: Promise<D1> | undefined

/**
 * Resolves the D1 binding from the wrangler dev proxy (local miniflare). Memoized so we
 * only spin up one proxy per process. `remoteBindings: false` guarantees we hit the LOCAL
 * database — never the remote/production D1 — matching how `pnpm payload migrate` / `pnpm dev`
 * already work via src/payload.config.ts.
 */
async function getD1FromWranglerProxy(): Promise<D1> {
  if (!proxyD1Promise) {
    // Hide the 'wrangler' specifier from the bundler so it is never pulled into the
    // Workers bundle (same trick as src/payload.config.ts). Only reached in dev/CLI/tests.
    proxyD1Promise = import(/* webpackIgnore: true */ `${'__wrangler'.replaceAll('_', '')}`).then(
      async ({ getPlatformProxy }) => {
        const proxy = await getPlatformProxy({
          environment: process.env.CLOUDFLARE_ENV,
          remoteBindings: false,
        } satisfies GetPlatformProxyOptions)
        return proxy.env.D1 as D1
      },
    )
  }
  return proxyD1Promise
}

/**
 * Returns the Cloudflare D1 binding, working in every context this app runs in:
 *   - Production Worker runtime → getCloudflareContext() (per-request, never cached)
 *   - `next dev`, Payload CLI, `pnpm tsx` scripts, Vitest → wrangler getPlatformProxy against
 *     the LOCAL miniflare D1 (never touches remote/production)
 *
 * Mirrors the dual logic in src/payload.config.ts.
 */
export async function getD1(): Promise<D1> {
  const isProduction = process.env.NODE_ENV === 'production'
  const isBuild = process.env.NEXT_PHASE === 'phase-production-build'

  if (isProduction && !isBuild) {
    const { env } = await getCloudflareContext({ async: true })
    return env.D1
  }
  return getD1FromWranglerProxy()
}
