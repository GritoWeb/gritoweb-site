import { type ReactNode } from 'react'

import type { Page } from '@/payload-types'

import { BlogListingComponent } from '@/blocks/BlogListing/Component'
import { LatestPortfoliosComponent } from '@/blocks/LatestPortfolios/Component'
import { LatestPostsComponent } from '@/blocks/LatestPosts/Component'
import { PortfolioListingComponent } from '@/blocks/PortfolioListing/Component'

// Async/server-only blocks. They fetch data via Payload on render, so they
// can't live inside a client tree. We pre-render them on the server and pass
// the resulting nodes to the live-preview client wrapper, keyed by block id.
const asyncBlockComponents = {
  blogListing: BlogListingComponent,
  latestPortfolios: LatestPortfoliosComponent,
  latestPosts: LatestPostsComponent,
  portfolioListing: PortfolioListingComponent,
}

type LayoutBlock = NonNullable<Page['layout']>[number]

const getBlockKey = (block: LayoutBlock, index: number) =>
  block.id ?? `${block.blockType}-${index}`

export function buildAsyncBlocks(layout: Page['layout']): Record<string, ReactNode> {
  const result: Record<string, ReactNode> = {}
  if (!Array.isArray(layout)) return result

  layout.forEach((block, index) => {
    const Block = asyncBlockComponents[block.blockType as keyof typeof asyncBlockComponents]
    if (!Block) return
    const key = getBlockKey(block, index)
    result[key] = (
      <div>
        <Block {...(block as any)} />
      </div>
    )
  })

  return result
}
