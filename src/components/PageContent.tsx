'use client'

import { useLivePreview } from '@payloadcms/live-preview-react'
import { useEffect, useState, type ReactNode } from 'react'

import type { Page } from '@/payload-types'
import { RenderHero } from '@/heros/RenderHero'
import { RenderBlocksLive } from '@/blocks/RenderBlocksLive'

type Props = {
  initialPage: Page
  asyncBlocks: Record<string, ReactNode>
}

/**
 * Live-preview-aware renderer used inside the admin preview iframe.
 *
 * `useLivePreview` listens for postMessage events from the Payload admin and
 * merges field changes into `data` in memory — per-keystroke, with no server
 * round-trip. Server-only blocks (BlogListing/PortfolioListing/LatestPosts/
 * LatestPortfolios) are pre-rendered on the server and passed in via
 * `asyncBlocks`; their content updates whenever the parent route refreshes
 * (e.g. after autosave, via LivePreviewListener).
 */
export function PageContent(props: Props) {
  // `serverURL` is the origin used by useLivePreview to filter incoming
  // postMessage events. Default to the inlined env var (set in production) and
  // fall back to window.location.origin on the client so dev works without
  // extra env configuration.
  const [serverURL, setServerURL] = useState<string>('')
  useEffect(() => {
    setServerURL(process.env.NEXT_PUBLIC_BASE_URL || window.location.origin)
  }, [])

  if (!serverURL) return <StaticPage {...props} />
  return <LivePage {...props} serverURL={serverURL} />
}

function StaticPage({ initialPage, asyncBlocks }: Props) {
  return (
    <>
      <RenderHero {...initialPage.hero} />
      <RenderBlocksLive blocks={initialPage.layout} asyncBlocks={asyncBlocks} />
    </>
  )
}

function LivePage({
  initialPage,
  asyncBlocks,
  serverURL,
}: Props & { serverURL: string }) {
  const { data } = useLivePreview<Page>({
    initialData: initialPage,
    serverURL,
    depth: 2,
  })

  return (
    <>
      <RenderHero {...data.hero} />
      <RenderBlocksLive blocks={data.layout} asyncBlocks={asyncBlocks} />
    </>
  )
}
