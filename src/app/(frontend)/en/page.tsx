import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React, { cache } from 'react'

import type { Metadata } from 'next'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { buildAsyncBlocks } from '@/blocks/buildAsyncBlocks'
import { generateMeta } from '@/utilities/generateMeta'
import { PageContent } from '@/components/PageContent'
import type { Page } from '@/payload-types'

export const dynamic = 'force-dynamic'

const locale = 'en' as const

export async function generateMetadata(): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const page = await queryHomePage({ draft })
  return generateMeta({ doc: page, locale, path: '/en' })
}

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()

  const page = await queryHomePage({ draft })

  if (!page) notFound()

  if (draft) {
    const asyncBlocks = buildAsyncBlocks(page.layout)
    return (
      <article>
        <PageContent initialPage={page as Page} asyncBlocks={asyncBlocks} />
      </article>
    )
  }

  return (
    <article>
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.layout} />
    </article>
  )
}

const queryHomePage = cache(async ({ draft }: { draft: boolean }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    locale,
    where: { slug: { equals: 'home' } },
  })

  return result.docs?.[0] ?? null
})
